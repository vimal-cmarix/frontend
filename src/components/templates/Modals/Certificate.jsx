import React, { useContext, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import CertificateService from '@api/services/certificate';

import TextInput from '@components/molecules/TextInput';
import { useToast } from '@components/molecules/Notification';
import Btn from '@components/molecules/Btn';

import FormBlock from '@components/organisms/FormBlock';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import CustomDatePicker from '@components/molecules/CustomDatePicker';
import BtnGroup from '@components/organisms/BtnGroup';

import errorHandle from '@src/utils/error';
import { formatZonedTimeToUtc } from '@utils/general';

import ModalBody from './ModalBody';

import {
  Row,
  Actions,
  LeftButtonWrapper,
  FormBlockWrapper,
  HideMobile,
} from './style';

/**
 * Certificate Modal
 */
const Certificate = ({ currentData }) => {
  const { t } = useTranslation('modals');
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const [saveLoading, setSaveLoading] = useState(false);
  const [saveAndAddNewLoading, setSaveAndAddNewLoading] = useState(false);

  const [isSaveAndAddNew, setIsSaveAndAddNew] = useState(false);
  const [isSecondSave, setIsSecondSave] = useState(false);

  const [certificateDate, setCertificateDate] = useState(null);
  const [datepickerError, setDatepickerError] = useState(null);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const formRef = useRef(null);

  function closeModal() {
    formRef.current.setErrors({});
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
  }

  function resetForm() {
    formRef.current.setData({ title: '' });
    formRef.current.setData({ institution: '' });
    setCertificateDate(null);
  }

  const parseDate = selectedDate => {
    return format(new Date(selectedDate), 'yyyy-MM-dd');
  };

  async function save(data) {
    if (isSaveAndAddNew) setSaveAndAddNewLoading(true);
    else setSaveLoading(true);

    try {
      const profileId = profileState.id;
      const certificateId = currentData ? currentData.id : null;

      const dataSend = {
        ...data,
        date: parseDate(certificateDate),
      };

      let res;

      if (currentData && !isSecondSave)
        res = await CertificateService.editCertificate(
          profileId,
          certificateId,
          dataSend,
        );
      else res = await CertificateService.addCertificate(profileId, dataSend);

      const dataState = res.data.data.certificates;

      profileDispatch({
        type: 'SET_CERTIFICATES',
        certificates: dataState,
      });

      if (currentData && isSaveAndAddNew) setIsSecondSave(true);
      if (!isSaveAndAddNew) closeModal();
      else resetForm();
      setIsSaveAndAddNew(false);
      if (!currentData) showSuccess(t('certificate.success'));
      else showSuccess(t('certificate.certificate_success'));
    } catch (e) {
      showToast(errorHandle(e));
    } finally {
      setSaveAndAddNewLoading(false);
      setSaveLoading(false);
    }
  }

  function fillCurrents() {
    formRef.current.setData({ title: currentData.title });
    formRef.current.setData({ institution: currentData.institution });

    setCertificateDate(formatZonedTimeToUtc(currentData.date) || null);
  }

  useEffect(() => {
    if (appState.modal.isOpened) {
      setIsSecondSave(false);
      resetForm();
      if (currentData) fillCurrents();
    }
  }, [appState.modal.isOpened]);

  const handleSubmit = async formData => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required(),
        institution: Yup.string().required(),
      });

      setDatepickerError(
        certificateDate ? null : errorMessage('period_date.required'),
      );

      await schema.validate(formData, {
        abortEarly: false,
      });

      if (!certificateDate) {
        return;
      }

      await save(formData);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  function handleChange(e) {
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
  }

  return (
    <ModalBody headerTitle={t('certificate.title')} onCancel={closeModal}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <FormBlock className="reqlabel" label={t('certificate.labels.title')}>
            <TextInput
              name="title"
              placeholder={t('certificate.placeholders.title')}
              size="medium"
              value={currentData ? currentData.title : ''}
              onChange={handleChange}
              maxLength="50"
            />
          </FormBlock>
        </Row>
        <Row>
          <FormBlock
            className="reqlabel"
            label={t('certificate.labels.institution')}
          >
            <TextInput
              name="institution"
              placeholder={t('certificate.placeholders.institution')}
              size="medium"
              value={currentData ? currentData.institution : ''}
              onChange={handleChange}
              maxLength="50"
            />
          </FormBlock>
        </Row>

        <Row>
          <FormBlockWrapper>
            <FormBlock
              className="reqlabel"
              label={t('certificate.labels.date')}
            >
              <CustomDatePicker
                error={datepickerError}
                selected={certificateDate}
                onChange={setCertificateDate}
                showMonthYearPicker
                dateFormat="MM/yyyy"
                calendarClassName="date-picker-month-year"
                popperPlacement="right-start"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: '0px, 7px',
                  },
                }}
              />
            </FormBlock>
          </FormBlockWrapper>
        </Row>

        <Actions>
          <div>
            <HideMobile>
              <LeftButtonWrapper>
                <Btn
                  startIcon="leftArrow"
                  iconSize={12}
                  label={buttonsT('back')}
                  handleClick={closeModal}
                />
              </LeftButtonWrapper>
            </HideMobile>
          </div>

          <BtnGroup>
            <Btn
              label={buttonsT('save_and_add_new')}
              variant="outlinePrimary"
              type="submit"
              loading={saveAndAddNewLoading}
              handleClick={() => setIsSaveAndAddNew(true)}
            />
            <Btn
              label={buttonsT('save')}
              variant="outlinePrimary"
              type="submit"
              loading={saveLoading}
            />
          </BtnGroup>
        </Actions>
      </Form>
    </ModalBody>
  );
};

Certificate.propTypes = {
  currentData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    institution: PropTypes.string,
    date: PropTypes.string,
  }),
};

Certificate.defaultProps = {
  currentData: undefined,
};

export default Certificate;

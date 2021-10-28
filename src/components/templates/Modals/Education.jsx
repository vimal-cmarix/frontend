import React, { useContext, useState, useRef, useEffect } from 'react';
import { format, isBefore } from 'date-fns';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import EducationService from '@api/services/education';

import { useToast } from '@components/molecules/Notification';
import TextInput from '@components/molecules/TextInput';
import CustomCheckbox from '@components/molecules/CustomCheckbox';
import Btn from '@components/molecules/Btn';

import FormBlock from '@components/organisms/FormBlock';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import BtnGroup from '@components/organisms/BtnGroup';

import errorHandle from '@src/utils/error';
import { formatZonedTimeToUtc, validateDatePicker } from '@utils/general';
import CustomDatePicker from '@components/molecules/CustomDatePicker';
import ModalBody from './ModalBody';

import {
  Row,
  Actions,
  LeftButtonWrapper,
  FormBlockWrapper,
  HideMobile,
} from './style';

const ModalEducation = ({ EducationIndex }) => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t } = useTranslation('modals');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const [editData, setEditData] = useState(false);

  const [saveLoading, setSaveLoading] = useState(false);
  const [saveAndAddNewLoading, setSaveAndAddNewLoading] = useState(false);

  const [isSaveAndAddNew, setIsSaveAndAddNew] = useState(false);
  const [isSecondSave, setIsSecondSave] = useState(false);

  const [currentEducation, setCurrentEducation] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePickerError, setDatePickerError] = useState({
    startDate: null,
    endDate: null,
  });

  const toast = useToast();
  const formRef = useRef(null);

  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const initialData = profileState.education[EducationIndex];

  function clearErrors() {
    formRef.current.setErrors({});
  }

  function setDataToEdit() {
    const data = {
      degree: editData.degree,
      fieldOfStudy: editData.fieldOfStudy,
      institution: editData.institution,
    };
    formRef.current.setData(data);
    setStartDate(formatZonedTimeToUtc(editData.periodFrom) || null);

    if (editData.periodTo) {
      setEndDate(formatZonedTimeToUtc(initialData.periodTo) || null);
    } else {
      setCurrentEducation(true);
    }
  }

  function resetForm() {
    formRef.current.setData({
      degree: '',
      fieldOfStudy: '',
      institution: '',
    });

    setCurrentEducation(false);
  }

  useEffect(() => {
    if (appState.modal.isOpened) {
      setIsSecondSave(false);

      if (EducationIndex !== undefined && !!profileState.education?.length)
        setEditData(profileState.education[EducationIndex]);
      else setEditData(false);

      clearErrors();
      resetForm();
    }
  }, [appState.modal.isOpened]);

  useEffect(() => {
    if (editData) {
      setDataToEdit();
    }
  }, [editData, editData.degree]);

  function setProfileEducation(education) {
    return profileDispatch({
      type: 'SET_EDUCATION',
      education,
    });
  }

  function updateProfileEducation(education) {
    return profileDispatch({
      type: 'EDIT_EDUCATION',
      education,
    });
  }

  const parseDate = selectedDate => {
    return format(new Date(selectedDate), 'yyyy-MM-dd');
  };

  function closeModal() {
    setEditData(false);
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
  }

  async function addEducation(profileID, addFormData) {
    if (isSaveAndAddNew) setSaveAndAddNewLoading(true);
    else setSaveLoading(true);

    try {
      const res = await EducationService.addEducation(profileID, addFormData);
      showSuccess(t('education.success'));
      setProfileEducation(res.data.data.education);
      if (!isSaveAndAddNew) closeModal();
      else resetForm();
      setIsSaveAndAddNew(false);
    } catch (err) {
      showError(errorHandle(err));
    } finally {
      setSaveAndAddNewLoading(false);
      setSaveLoading(false);
    }
  }

  async function editEducation(profileID, editFormData) {
    if (isSaveAndAddNew) setSaveAndAddNewLoading(true);
    else setSaveLoading(true);

    try {
      const response = await EducationService.editEducation(
        profileID,
        editData.id,
        editFormData,
      );
      showSuccess(t('education.education_success'));
      updateProfileEducation(response.data.data.education);
      if (!isSaveAndAddNew) closeModal();
      else resetForm();
      setIsSaveAndAddNew(false);
    } catch (err) {
      showError(errorHandle(err));
    } finally {
      setSaveAndAddNewLoading(false);
      setSaveLoading(false);
    }
  }

  const handleSubmit = async formData => {
    try {
      clearErrors();
      setDatePickerError({
        startDate: null,
        endDate: null,
      });
      const profileID = profileState.id;

      const schema = Yup.object().shape({
        degree: Yup.string().required(),
        fieldOfStudy: Yup.string().required(),
        institution: Yup.string().required(),
      });

      const datePickerErrors = validateDatePicker(
        startDate,
        endDate,
        currentEducation,
        {
          startDate: { required: errorMessage('period_start.required') },
          endDate: { required: errorMessage('period_end.required') },
          greaterThan: errorMessage('period_to_year.greaterThan'),
        },
      );

      setDatePickerError({
        startDate: datePickerErrors.startDate,
        endDate: datePickerErrors.endDate,
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      if (datePickerErrors.startDate || datePickerErrors.endDate) {
        return;
      }

      const serverSchema = {
        degree: formData.degree,
        fieldOfStudy: formData.fieldOfStudy,
        institution: formData.institution,
        periodFrom: parseDate(startDate),
        periodTo: currentEducation ? null : parseDate(endDate),
      };

      if (editData && !isSecondSave) {
        await editEducation(profileID, serverSchema);
      } else {
        await addEducation(profileID, serverSchema);
      }

      if (editData && isSaveAndAddNew) setIsSecondSave(true);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });

        formRef.current.setErrors(validationErrors);

        setSaveAndAddNewLoading(false);
        setSaveLoading(false);
      }
    }
  };

  function handleChange(e) {
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
  }

  return (
    <ModalBody headerTitle={t('education.title')} onCancel={closeModal}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <FormBlockWrapper>
            <FormBlock className="reqlabel" label={t('education.labels.title')}>
              <TextInput
                name="degree"
                size="medium"
                placeholder={t('education.placeholders.title')}
                value={initialData?.degree || ''}
                onChange={handleChange}
                maxLength="50"
              />
            </FormBlock>
          </FormBlockWrapper>
        </Row>
        <Row>
          <FormBlockWrapper>
            <FormBlock
              className="reqlabel"
              label={t('education.labels.education_field')}
            >
              <TextInput
                name="fieldOfStudy"
                size="medium"
                placeholder={t('education.placeholders.education_field')}
                value={initialData?.fieldOfStudy || ''}
                onChange={handleChange}
                maxLength="50"
              />
            </FormBlock>
          </FormBlockWrapper>
        </Row>
        <Row>
          <FormBlockWrapper>
            <FormBlock
              className="reqlabel"
              label={t('education.labels.institution')}
            >
              <TextInput
                name="institution"
                size="medium"
                placeholder={t('education.placeholders.institution')}
                value={initialData?.institution || ''}
                onChange={handleChange}
                maxLength="50"
              />
            </FormBlock>
          </FormBlockWrapper>
        </Row>
        <Row>
          <FormBlockWrapper>
            <FormBlock
              className="reqlabel"
              label={t('education.labels.graduation_start')}
            >
              <CustomDatePicker
                error={datePickerError.startDate}
                selected={startDate}
                onChange={setStartDate}
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
        <Row className="checkhere">
          <CustomCheckbox
            label={t('education.labels.checkbox')}
            name="current_education"
            checked={currentEducation}
            onChange={e => setCurrentEducation(e.target.checked)}
            changeColourFocused
          />
        </Row>
        <Row hide={currentEducation}>
          <FormBlockWrapper>
            <FormBlock
              className="reqlabel"
              label={t('education.labels.graduation_date')}
            >
              <CustomDatePicker
                error={datePickerError.endDate}
                selected={endDate}
                onChange={setEndDate}
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

ModalEducation.propTypes = {
  EducationIndex: PropTypes.number,
};

ModalEducation.defaultProps = {
  EducationIndex: undefined,
};

export default ModalEducation;

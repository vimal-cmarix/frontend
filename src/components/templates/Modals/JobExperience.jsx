import React, { useContext, useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { format } from 'date-fns';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import JobExperienceService from '@api/services/jobExperience';

import { useToast } from '@components/molecules/Notification';
import TextInput from '@components/molecules/TextInput';
import CustomCheckBox from '@components/molecules/CustomCheckbox';
import Btn from '@components/molecules/Btn';

import FormBlock from '@components/organisms/FormBlock';
import BtnGroup from '@components/organisms/BtnGroup';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';

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

const ModalJobExperience = ({ JobExperienceIndex }) => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t } = useTranslation('modals');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const initialData = profileState.experiences[JobExperienceIndex];

  const [editData, setEditData] = useState(false);

  const [saveLoading, setSaveLoading] = useState(false);
  const [saveAndAddNewLoading, setSaveAndAddNewLoading] = useState(false);

  const [isSaveAndAddNew, setIsSaveAndAddNew] = useState(false);
  const [isSecondSave, setIsSecondSave] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePickerError, setDatePickerError] = useState({
    startDate: null,
    endDate: null,
  });

  const [currentJob, setCurrentJob] = useState(false);

  const toast = useToast();
  const formRef = useRef(null);

  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  useEffect(() => {
    if (initialData) {
      setCurrentJob(!initialData?.periodTo || false);
      setStartDate(formatZonedTimeToUtc(initialData?.periodFrom) || null);
      setEndDate(formatZonedTimeToUtc(initialData?.periodTo) || null);
    }
  }, [initialData]);

  useEffect(() => {
    if (currentJob) {
      setEndDate(null);
    }
  }, [currentJob]);

  function clearErrors() {
    return formRef.current.setErrors({});
  }

  function resetForm() {
    formRef.current.setData({
      company: '',
      occupation: '',
    });

    setCurrentJob(false);
    setStartDate(null);
    setEndDate(null);
  }

  useEffect(() => {
    if (appState.modal.isOpened) {
      setIsSecondSave(false);

      if (
        JobExperienceIndex !== undefined &&
        !!profileState.experiences?.length
      ) {
        setEditData(profileState.experiences[JobExperienceIndex]);
      } else {
        setEditData(false);
      }

      clearErrors();
    }
  }, [appState.modal.isOpened]);

  function setProfileExperience(experiences) {
    return profileDispatch({
      type: 'SET_EXPERIENCE',
      experiences,
    });
  }

  function updateProfileExperience(experiences) {
    return profileDispatch({
      type: 'EDIT_EXPERIENCE',
      experiences,
    });
  }

  function closeModal() {
    setEditData(false);
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
  }

  async function addExperience(profileID, addFormData) {
    if (isSaveAndAddNew) setSaveAndAddNewLoading(true);
    else setSaveLoading(true);

    try {
      const res = await JobExperienceService.addJobExperience(
        profileID,
        addFormData,
      );
      const { experiences } = res.data.data;

      showSuccess(t('job_experience.success'));
      setProfileExperience(experiences);
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

  async function editExperience(profileID, editFormData) {
    if (isSaveAndAddNew) setSaveAndAddNewLoading(true);
    else setSaveLoading(true);

    try {
      const response = await JobExperienceService.editJobExperience(
        profileID,
        editData.id,
        editFormData,
      );
      const { experiences } = response.data.data;
      showSuccess(t('job_experience.jobchange'));
      updateProfileExperience(experiences);
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

  const parseDate = selectedDate => {
    return format(new Date(selectedDate), 'yyyy-MM-dd');
  };

  const handleSubmit = async formData => {
    try {
      clearErrors();
      setDatePickerError({
        startDate: null,
        endDate: null,
      });
      const profileID = profileState.id;

      const schema = Yup.object().shape({
        company: Yup.string().required(),
        occupation: Yup.string().required(),
      });

      const datePickerErrors = validateDatePicker(
        startDate,
        endDate,
        currentJob,
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

      if (datePickerErrors.startDate || datePickerErrors.endDate) return;

      const serverSchema = {
        imageId: null,
        countryId: '0213cdfe-5d46-4005-9a34-96be11709adb',
        company: formData.company,
        occupation: formData.occupation,
        periodFrom: parseDate(startDate),
        periodTo: currentJob ? null : parseDate(endDate),
      };

      if (editData && !isSecondSave) {
        await editExperience(profileID, serverSchema);
      } else {
        await addExperience(profileID, serverSchema);
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
    <ModalBody headerTitle={t('job_experience.title')} onCancel={closeModal}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <FormBlockWrapper>
            <FormBlock
              className="reqlabel"
              label={t('job_experience.labels.company')}
            >
              <TextInput
                name="company"
                size="medium"
                placeholder={t('job_experience.placeholders.company')}
                value={initialData?.company || ''}
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
              label={t('job_experience.labels.role')}
            >
              <TextInput
                name="occupation"
                placeholder={t('job_experience.placeholders.role')}
                size="medium"
                value={initialData?.occupation || ''}
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
              label={t('job_experience.labels.period_from')}
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
          <CustomCheckBox
            label={t('job_experience.labels.checkbox')}
            name="current_job"
            checked={currentJob}
            changeColourFocused
            onChange={() => setCurrentJob(currState => !currState)}
          />
        </Row>
        {!currentJob && (
          <Row>
            <FormBlockWrapper>
              <FormBlock
                className="reqlabel"
                label={t('job_experience.labels.period_to')}
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
        )}
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

ModalJobExperience.propTypes = {
  JobExperienceIndex: PropTypes.number,
};

ModalJobExperience.defaultProps = {
  JobExperienceIndex: undefined,
};

export default ModalJobExperience;

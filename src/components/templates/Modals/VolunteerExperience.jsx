import React, { useContext, useState, useRef, useMemo, useEffect } from 'react';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { format } from 'date-fns';

import CultureFitService from '@api/services/cultureFit';
import { Typography } from '@assets/styles/typo';
import { sizes as breakpoint } from '@assets/styles/medias';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import { useToast } from '@components/molecules/Notification';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import Btn from '@components/molecules/Btn';
import errorHandle from '@src/utils/error';
import CustomDatePicker from '@components/molecules/CustomDatePicker';
import CustomCheckbox from '@components/molecules/CustomCheckbox';
import DeleteDialog from '@components/molecules/DeleteDialog';
import BtnGroup from '@components/organisms/BtnGroup';
import useMedia from '@hooks/useMedia';
import IconSVG from '@components/atoms/IconSVG';
import { formatZonedTimeToUtc, validateDatePicker } from '@utils/general';

import ModalBody from './ModalBody';

import {
  Row,
  Actions,
  FormBlockWrapper,
  FormBlockRow,
  TrashButton,
} from './style';

const VolunteerExperience = ({
  volunteerExperienceData,
  selectedItemIndex,
  cultureFitId,
}) => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePickerError, setDatePickerError] = useState({
    startDate: null,
    endDate: null,
  });
  const [currentVolunteering, setCurrentVolunteering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: modalT } = useTranslation('modals');

  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const initialData = useMemo(() => {
    return volunteerExperienceData[selectedItemIndex];
  }, [volunteerExperienceData]);

  useEffect(() => {
    setCurrentVolunteering(initialData?.currentVolunteering || false);
    setStartDate(formatZonedTimeToUtc(initialData?.startDate) || null);
    setEndDate(formatZonedTimeToUtc(initialData?.endDate) || null);
  }, [initialData]);

  const closeModal = () => {
    formRef.current.setErrors({});
    formRef.current.reset();
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
  };

  const parseDate = selectedDate => {
    return format(new Date(selectedDate), 'yyyy-MM-dd');
  };

  const saveModal = async (data, addAnother = false) => {
    const profileId = profileState.id;
    const reqBody = {
      startDate: parseDate(startDate),
      endDate: currentVolunteering ? null : parseDate(endDate),
      name: data.name,
      url: data.url,
      location: data.location,
      description: data.description,
      currentVolunteering,
    };

    try {
      setLoading(true);

      if (selectedItemIndex === null) {
        await CultureFitService.createVolunteerExperience(
          profileId,
          cultureFitId,
          reqBody,
        );
      } else {
        await CultureFitService.updateVolunteerExperience(
          profileId,
          cultureFitId,
          initialData.id,
          reqBody,
        );
      }
      profileDispatch({
        type: 'SET_VOLUNTEER_EXPERIENCE',
        volunteerExperience: reqBody,
      });
      showSuccess(modalT('volunteer_experience.success'));
      if (addAnother) {
        formRef.current.reset();
        setStartDate(null);
        setEndDate(null);
        setLoading(false);
      } else {
        closeModal();
      }
    } catch (err) {
      showToast(errorHandle(err));
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const profileId = profileState.id;
    try {
      setLoading(true);

      await CultureFitService.deleteVolunteerExperience(
        profileId,
        cultureFitId,
        initialData.id,
      );
      profileDispatch({
        type: 'SET_VOLUNTEER_EXPERIENCE',
        volunteerExperience: volunteerExperienceData?.filter(
          item => item.id !== initialData.id,
        ),
      });
      showSuccess(modalT('volunteer_experience.success'));
      closeModal();
      setLoading(false);
    } catch (err) {
      showToast(errorHandle(err));
      setLoading(false);
    }
  };

  const handleSubmit = async (data, addAnother) => {
    try {
      formRef.current.setErrors({});
      setDatePickerError({
        startDate: null,
        endDate: null,
      });

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        url: Yup.string().url(),
        location: Yup.string().required(),
        description: Yup.string().required(),
      });

      const datePickerErrors = validateDatePicker(
        startDate,
        endDate,
        currentVolunteering,
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

      await schema.validate(data, {
        abortEarly: false,
      });

      if (datePickerErrors.startDate || datePickerErrors.endDate) return;

      // Validation passed
      await saveModal(data, addAnother);
    } catch (err) {
      console.log(err);
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

  const saveAndAddAnother = () => {
    handleSubmit(formRef.current.getData(), true);
  };

  function handleChange(e) {
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
  }

  return (
    <>
      {showDelete && (
        <DeleteDialog
          type="warning"
          title={modalT('volunteer_experience.delete_title')}
          description={modalT('volunteer_experience.delete_description')}
          warnDescription={modalT('volunteer_experience.delete_warn')}
          onCancel={() => setShowDelete(false)}
          onConfirm={handleDelete}
          isLoading={loading}
          isCentered
        />
      )}
      <ModalBody onCancel={closeModal} headerTitle="What I stand for">
        <Form onSubmit={data => handleSubmit(data, false)} ref={formRef}>
          <Row>
            <Typography color="grey61" size="base" style={{ marginBottom: 15 }}>
              Volunteer Experience
            </Typography>
            <FormBlockWrapper>
              <FormBlockRow>
                <FormBlock className="reqlabel" label="Name" isLabelStrong>
                  <TextInput
                    value={initialData?.name || ''}
                    placeholder={modalT('volunteer_experience.name_label')}
                    name="name"
                    size="medium"
                    onChange={handleChange}
                  />
                </FormBlock>

                <FormBlock label="URL" isLabelStrong>
                  <TextInput
                    name="url"
                    size="medium"
                    value={initialData?.url || ''}
                    onChange={handleChange}
                  />
                </FormBlock>
                {initialData && (
                  <TrashButton onClick={() => setShowDelete(true)}>
                    <IconSVG name="trash" size={20} />
                  </TrashButton>
                )}
              </FormBlockRow>
            </FormBlockWrapper>
          </Row>

          <Row>
            <FormBlock className="reqlabel" label="Start Date">
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
            <CustomCheckbox
              style={{ marginTop: 8 }}
              changeColourFocused
              checked={currentVolunteering}
              label="Currently Volunteering"
              onChange={() => {
                setCurrentVolunteering(!currentVolunteering);
              }}
              name="currentlyVolunteeringCheckbox"
            />
          </Row>

          {!currentVolunteering && (
            <Row>
              <FormBlock className="reqlabel" label="End Date">
                <CustomDatePicker
                  error={datePickerError.endDate}
                  selected={endDate || null}
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
            </Row>
          )}

          <Row>
            <FormBlock className="reqlabel" label="Location">
              <TextInput
                placeholder={modalT('volunteer_experience.location_label')}
                name="location"
                size="medium"
                value={initialData?.location || ''}
                onChange={handleChange}
              />
            </FormBlock>
          </Row>

          <Row>
            <FormBlock className="reqlabel" label="Description">
              <TextInput
                value={initialData?.description || ''}
                placeholder={modalT('volunteer_experience.description_label')}
                name="description"
                size="medium"
                multiline
                maxLength="1000"
                className="volunteerDes"
                onChange={handleChange}
              />
            </FormBlock>
          </Row>

          <Actions style={{ marginTop: 32 }}>
            <BtnGroup>
              {!isMobile && (
                <Btn
                  label={buttonsT('back')}
                  size="md"
                  handleClick={closeModal}
                  variant="text"
                  startIcon="leftArrow"
                  iconSize={8}
                />
              )}
            </BtnGroup>

            <BtnGroup>
              {initialData && (
                <Btn
                  label="Remove"
                  type="button"
                  size="md"
                  variant="danger"
                  handleClick={() => setShowDelete(true)}
                />
              )}
              {!initialData && (
                <Btn
                  label={buttonsT('save_and_add_new')}
                  type="button"
                  size="md"
                  variant="outlinePrimary"
                  handleClick={saveAndAddAnother}
                  loading={loading}
                />
              )}
              <Btn
                label={buttonsT('save')}
                type="submit"
                size="md"
                variant="outlinePrimary"
                loading={loading}
              />
            </BtnGroup>
          </Actions>
        </Form>
      </ModalBody>
    </>
  );
};

VolunteerExperience.propTypes = {
  volunteerExperienceData: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedItemIndex: PropTypes.number,
  cultureFitId: PropTypes.string.isRequired,
};

VolunteerExperience.defaultProps = {
  selectedItemIndex: null,
};

export default VolunteerExperience;

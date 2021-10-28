import React, { useState, useContext, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import AppContext from '@context/appContext';
import { Cell, Grid } from 'styled-css-grid';
import { useTranslation } from 'react-i18next';
import IconSVG from '@components/atoms/IconSVG';
import { Form } from '@unform/web';
import { sizes } from '@assets/styles/medias';
import BoardService from '@api/services/board';
import LocationService from '@api/services/location';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';

import TooltipWrapper from '@components/molecules/TooltipWrapper';
import ReactSelect from '@components/molecules/CustomSelect/ReactSelect';
import { Row, HideMobile } from '../../style';

import DiscrepancyModal from '../DiscrepancyModal';

import {
  TrackedJobFormTextInput,
  TrackedJobFormBlock,
  TrackedJobFormItemWrapper,
  TrackedJobTextareaWrapper,
  TrackedJobTextareaAutosize,
  TrackedJobFormTextInputIconWrapper,
  TrackedJobCustomDatePicker,
  TrackedJobFormWrapper,
  TrackedJobModalFooterRightButtonWrapper,
  TrackedJobModalActions,
  TrackedJobModalActionButton,
  TrackedJobForDateWrapper,
  TrackedJobFormBlockLocation,
} from './style';

const JobInfoForm = ({
  isShowing,
  setInternalModal,
  setInternalModalShow,
  boardId,
  swimlaneId,
  jobCardId,
  jobCardData,
  addButtonAction,
  handleGetBoard,
}) => {
  const stateId = '0213cdfe-5d46-4005-9a34-96be11709adb';
  const { t: modalsT } = useTranslation('modals');

  const { state: appState, dispatch } = useContext(AppContext);

  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const [targetDate, setTargetDate] = useState(new Date());
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState({});
  const [location, setLocation] = useState('');
  const [screenWidth, setScreenWidth] = useState(null);
  const [allowlocationIsOpen, setAllowLocationIsOpen] = useState(false);
  const { t: errorMessage } = useTranslation('errorMessages');

  useEffect(() => {
    async function getFormData() {
      formRef.current.setData({
        companyName: jobCardData.company?.name,
        jobTitle: jobCardData.jobTitle,
        url: jobCardData.url,
        location: jobCardData.location,
        salary: jobCardData.salary,
      });

      setJobTitle(jobCardData.jobTitle);
      setDescription(jobCardData.description || {});
      if (jobCardData.location) setLocation(jobCardData.location);
      if (jobCardData.targetDate)
        setTargetDate(new Date(jobCardData.targetDate));
    }
    if (jobCardData) getFormData();
  }, [jobCardData]);

  const [listCities, setCities] = useState([]);

  const [loadingCity, setLoadingCity] = useState(false);

  async function handleGetCities(name) {
    let nameCity = name;

    if (nameCity.includes(',')) nameCity = name?.slice(0, name.indexOf(','));
    const query = {
      limit: 500,
      countryId: stateId,
      name: nameCity,
    };
    setLoadingCity(true);

    const res = await LocationService.getCitiesName(query);
    const formatedCities = res.data.data.map(city => {
      return {
        value: city.id,
        label: `${city.name}, ${city.stateCode}`,
        name: city.name,
      };
    });
    setLoadingCity(false);

    setCities(formatedCities);
    return formatedCities;
  }

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  const verifyJobTitleDiscrepancy = () => {
    if (jobTitle !== currentJobTitle) {
      setInternalModal(
        <DiscrepancyModal
          setInternalModalShow={setInternalModalShow}
          originalJobTitle={currentJobTitle}
          updatedJobTitle={jobTitle}
          onOptionPicked={selectedOption =>
            formRef.current.setData({
              jobTitle: selectedOption.selectedJobTitle,
            })
          }
          onClose={() => {
            setInternalModalShow(false);
          }}
        />,
      );
      setInternalModalShow(true);
    }
  };

  async function handleChangeLocation(value, { action }) {
    if (
      action === 'menu-close' ||
      action === 'input-blur' ||
      action === 'set-value'
    )
      return;
    if (value.length <= 100) {
      setAllowLocationIsOpen(true);
      setLocation(value);
    }
  }

  function closeModal() {
    dispatch({ type: 'SET_MODAL_CLOSED' });
  }

  const handleSubmitForm = async data => {
    const values = data;
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        companyName: Yup.string().required(),
        jobTitle: Yup.string().required(),
        // location: Yup.string().required(),
      });

      await schema.validate(values, {
        abortEarly: false,
      });
      // remove fields that don't have value
      // eslint-disable-next-line no-param-reassign
      Object.keys(values).forEach(
        key => values[key] === '' && delete values[key],
      );
      if (targetDate) values.targetDate = targetDate;
      if (description.blocks) values.description = description;
      values.location = location;
      await BoardService.updateJobCard(boardId, swimlaneId, jobCardId, values);

      closeModal();
      if (handleGetBoard) handleGetBoard();
    } catch (err) {
      console.log('errr', err);
      const validationErrors = {};
      //showToast(errorHandle(err));
      // formRef.current.setErrors(err.data.message[0]);
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

  async function handleOpenNewJobCard() {
    await handleSubmitForm(formRef.current.getData());
    setTimeout(addButtonAction, 200);
  }

  function handleChangeTextArea(event) {
    setDescription(event);
  }

  let menuLocationIsOpen;
  if (location && (!allowlocationIsOpen || listCities.length === 0))
    menuLocationIsOpen = false;
  else if (!location) menuLocationIsOpen = false;
  function handleChange(e) {
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
  }
  function handleChangeJobTitle(e) {
    if (e.target.value && e.target.value.trim() !== '') {
      setCurrentJobTitle(e.target.value);
    } else {
      e.target.value = '';
    }
  }
  return (
    <TrackedJobFormWrapper isShowing={isShowing}>
      <Form onSubmit={handleSubmitForm} ref={formRef}>
        <Row>
          <Grid
            columns={screenWidth > parseInt(sizes.tablet, 10) ? 2 : 1}
            gap={screenWidth > parseInt(sizes.tablet, 10) && '2.5rem'}
          >
            <Cell>
              <TrackedJobFormItemWrapper>
                <TrackedJobFormBlock
                  className="trackedJobFormBlock"
                  label="Company Name"
                >
                  <TrackedJobFormTextInput
                    className="trackedJobFormTextInput"
                    placeholder={modalsT('job_form.placeholder.company')}
                    name="companyName"
                    size="medium"
                    maxLength="130"
                    onChange={handleChange}
                  />
                </TrackedJobFormBlock>
              </TrackedJobFormItemWrapper>

              <TrackedJobFormItemWrapper>
                <TrackedJobFormBlock
                  className="trackedJobFormBlock"
                  label="Job Title"
                >
                  <TrackedJobFormTextInput
                    className="trackedJobFormTextInput"
                    placeholder={modalsT('job_form.placeholder.jobTitle')}
                    name="jobTitle"
                    size="medium"
                    onChange={handleChangeJobTitle}
                    maxLength="130"
                    // onBlur={verifyJobTitleDiscrepancy}
                  />
                </TrackedJobFormBlock>
              </TrackedJobFormItemWrapper>

              <TrackedJobFormItemWrapper>
                <TrackedJobFormBlock
                  className="trackedJobFormBlock"
                  label="Job Posting URL"
                >
                  <TrackedJobFormTextInput
                    className="trackedJobFormTextInput"
                    placeholder={modalsT('job_form.placeholder.url')}
                    name="url"
                    size="medium"
                  />
                </TrackedJobFormBlock>
              </TrackedJobFormItemWrapper>

              <Grid
                columns={screenWidth > parseInt(sizes.tablet, 10) ? 2 : 1}
                gap={screenWidth > parseInt(sizes.tablet, 10) && '1.5rem'}
                style={{
                  width: screenWidth < parseInt(sizes.tablet, 10) && '60%',
                }}
              >
                <TrackedJobFormItemWrapper>
                  <TrackedJobFormBlockLocation
                    className="trackedJobFormBlock"
                    label="Location"
                  >
                    <TooltipWrapper
                      className="tooltip"
                      text={location}
                      disable={location.length < 25}
                      position="bottom"
                    >
                      <ReactSelect
                        name="location"
                        inputValue={location}
                        loading={loadingCity}
                        options={listCities}
                        onInputChange={handleChangeLocation}
                        loadOptions={handleGetCities}
                        onOptionSelected={e => {
                          setLocation(e.label);
                          formRef.current.setFieldValue('location', e.label);
                        }}
                        onMenuClose={() => setAllowLocationIsOpen(false)}
                        menuIsOpen={menuLocationIsOpen}
                        type="async"
                        menuPlacement={
                          screenWidth > parseInt(sizes.tablet, 10)
                            ? 'top'
                            : 'bottom'
                        }
                        placeholder={modalsT('job_form.placeholder.location')}
                        noDropdown
                      />
                    </TooltipWrapper>
                  </TrackedJobFormBlockLocation>
                </TrackedJobFormItemWrapper>
                <TrackedJobFormItemWrapper>
                  <TrackedJobFormBlock
                    className="trackedJobFormBlock doller-sign-icon"
                    label="Salary"
                  >
                    <TrackedJobFormTextInput
                      className="trackedJobFormTextInput"
                      placeholder={modalsT('job_form.placeholder.salary')}
                      name="salary"
                      size="medium"
                      maxLength="15"
                      onChange={handleChange}
                    />
                  </TrackedJobFormBlock>
                </TrackedJobFormItemWrapper>
              </Grid>
            </Cell>
            <Cell>
              <TrackedJobFormItemWrapper>
                <TrackedJobFormBlock
                  className="trackedJobFormBlock"
                  label="Target Date"
                >
                  <TrackedJobForDateWrapper>
                    <TrackedJobCustomDatePicker
                      selected={targetDate}
                      onChange={setTargetDate}
                      calendarClassName="calendar"
                      className="trackedJobFormTextInput"
                      name="targetDate"
                      placeholderText="MMMM/DD/YYYY"
                      dateFormat="MMMM dd, yyyy"
                      minDate={new Date()}
                      defaultInput
                    />
                    <TrackedJobFormTextInputIconWrapper>
                      <IconSVG name="calendar" />
                    </TrackedJobFormTextInputIconWrapper>
                  </TrackedJobForDateWrapper>
                </TrackedJobFormBlock>
              </TrackedJobFormItemWrapper>
              <TrackedJobFormItemWrapper>
                <TrackedJobFormBlock
                  className="trackedJobFormBlock"
                  label="Description"
                >
                  <TrackedJobTextareaWrapper>
                    <TrackedJobTextareaAutosize
                      className="trackedJobFormTextInput"
                      placeholder={modalsT('job_form.placeholder.description')}
                      name="description"
                      maxLength="7000"
                      position="auto"
                      minHeight="268px"
                      value={description}
                      onChange={handleChangeTextArea}
                      editor
                    />
                  </TrackedJobTextareaWrapper>
                </TrackedJobFormBlock>
              </TrackedJobFormItemWrapper>
            </Cell>
          </Grid>
        </Row>

        <TrackedJobModalActions>
          <TrackedJobModalActionButton
            className="trackedJobModalActionButton"
            label="Cancel"
            type="button"
            size="md"
            colorSchema="secondary"
            handleClick={closeModal}
            variant="outlineSecondary"
          />
          <TrackedJobModalFooterRightButtonWrapper>
            <TrackedJobModalActionButton
              className="trackedJobModalActionButton"
              label="Save and add another"
              size="md"
              variant="outlinePrimary"
              type="button"
              handleClick={handleOpenNewJobCard}
            />
            <TrackedJobModalActionButton
              className="trackedJobModalButtonSave"
              label="Save"
              type="submit"
              size="md"
              variant="outlinePrimary"
            />
          </TrackedJobModalFooterRightButtonWrapper>
        </TrackedJobModalActions>
      </Form>
    </TrackedJobFormWrapper>
  );
};

JobInfoForm.propTypes = {
  jobCardId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  swimlaneId: PropTypes.string.isRequired,
  setInternalModal: PropTypes.func.isRequired,
  setInternalModalShow: PropTypes.func.isRequired,
  isShowing: PropTypes.bool.isRequired,
  jobCardData: PropTypes.shape(PropTypes.object),
  addButtonAction: PropTypes.func.isRequired,
  handleGetBoard: PropTypes.func.isRequired,
};

JobInfoForm.defaultProps = {
  jobCardData: {},
};

export default JobInfoForm;

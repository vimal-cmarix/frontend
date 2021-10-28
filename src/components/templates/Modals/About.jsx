import React, { useContext, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import ProfileService from '@api/services/profile';
import LocationService from '@api/services/location';

import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import ReactSelect from '@components/molecules/CustomSelect/ReactSelect';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import BtnGroup from '@components/organisms/BtnGroup';
import Btn from '@components/molecules/Btn';

import ModalBody from './ModalBody';

import { Body, Row, Actions } from './style';
import { BoxSticky } from './ModalBody/styles';

/**
 * About Modal
 */
const About = () => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: modalT } = useTranslation('modals');
  const { t: buttonsT } = useTranslation('buttons');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const { personalInfo, about } = profileState;
  const userName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  const [initialCountry] = useState({
    label: modalT('about.default_country'),
    value: '0213cdfe-5d46-4005-9a34-96be11709adb',
  });
  const [filledCurrent, setFilledCurrent] = useState(false);

  const [countrySelected, setCountrySelected] = useState({});
  const [stateSelected, setStateSelected] = useState({});
  const [citySelected, setCitySelected] = useState({});
  const [timezoneSelected, setTimezoneSelected] = useState({});

  const [countryLoading, setCountryLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [timezoneLoading, setTimezoneLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [timezones, setTimezones] = useState([]);

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const formRef = useRef(null);

  const scrollToBottom = query => {
    const el = document.querySelector(query);
    setTimeout(() => {
      el.scrollTo(0, 300);
    }, 800);
  };

  function closeModal() {
    formRef.current.setErrors({});
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
  }

  async function save(data) {
    setLoading(true);

    try {
      const profileId = profileState.id;

      const [firstName, ...rest] = data.name.split(' ');
      const personalInfoData = {
        firstName,
        lastName: rest.join(' '),
      };

      const payload = { ...data, personalInfo: personalInfoData };

      delete payload.name;

      const res = await ProfileService.setAbout(profileId, payload);

      profileDispatch({
        type: 'SET_ABOUT',
        about: res.data.data.about,
      });

      profileDispatch({
        type: 'SET_PERSONAL',
        personalInfo: personalInfoData,
      });

      closeModal();
      showSuccess(modalT('about.success'));
      setLoading(false);
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        personalIntroduction: Yup.string().required(),
        countryId: Yup.string().required(),
        stateId: Yup.string().required(),
        cityId: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      await save(data);
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
  }
  function handleChange(e) {
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
  }
  async function fillTimezones() {
    setTimezoneLoading(true);
    try {
      const query = { limit: 1000 };
      const res = await LocationService.getTimezones(query);
      const formatedTimezones = res.data.data.map(item => {
        return {
          value: item.canonical,
          label: item.name,
        };
      });

      setTimezones([
        { value: '', label: 'Select option...' },
        ...formatedTimezones,
      ]);
    } catch (err) {
      showToast(errorHandle(err));
    } finally {
      setTimezoneLoading(false);
    }
  }

  async function fillCountries() {
    setCountryLoading(true);

    try {
      const query = { limit: 1000 };
      const res = await LocationService.getCountries(query);
      const formatedCountries = res.data.data.map(country => {
        return {
          value: country.id,
          label: country.name,
        };
      });

      formatedCountries.sort((a, b) => {
        if (a.label > b.label) return 1;
        return b.label > a.label ? -1 : 0;
      });

      setCountries(formatedCountries);
    } catch (err) {
      showToast(errorHandle(err));
    } finally {
      setCountryLoading(false);
    }
  }

  async function fillStates() {
    const profileStateState = profileState.about.state;
    setStateSelected({});
    setCitySelected({});

    setStateLoading(true);

    try {
      const query = { limit: 1000, countryId: countrySelected.value };

      const res = await LocationService.getStates(query);

      const formatedStates = res.data.data.map(state => {
        return {
          value: state.id,
          label: state.name,
        };
      });

      formatedStates.sort((a, b) => {
        if (a.label > b.label) return 1;
        return b.label > a.label ? -1 : 0;
      });

      setStates(formatedStates);

      if (profileStateState && !filledCurrent) {
        setStateSelected({
          label: profileStateState.name,
          value: profileStateState.id,
        });
      }
    } catch (err) {
      showToast(errorHandle(err));
    } finally {
      setStateLoading(false);
    }
  }

  async function fillCities() {
    const profileStateCity = profileState.about.city;
    setCitySelected({});

    setCityLoading(true);

    try {
      const query = {
        limit: 10000,
        countryId: countrySelected.value,
        stateId: stateSelected.value,
      };

      const res = await LocationService.getCities(query);
      const formatedCities = res.data.data.map(city => {
        return {
          value: city.id,
          label: city.name,
        };
      });

      formatedCities.sort((a, b) => {
        if (a.label > b.label) return 1;
        return b.label > a.label ? -1 : 0;
      });

      setCities(formatedCities);
      if (profileStateCity && !filledCurrent) {
        setCitySelected({
          label: profileStateCity.name,
          value: profileStateCity.id,
        });
        setFilledCurrent(true);
      }
    } catch (err) {
      showToast(errorHandle(err));
    } finally {
      setCityLoading(false);
    }
  }

  async function fillCurrentsSelects() {
    const profileStateTimezone = profileState.about.timezone;
    const profileStateCountry = profileState.about.country;

    if (profileStateTimezone) {
      const res = await LocationService.getTimezones({
        limit: 1,
        query: profileStateTimezone,
      });
      const { name } = res.data.data[0] || {};
      if (name) {
        setTimezoneSelected({
          label: name,
          value: profileStateTimezone,
        });
      }
    }

    if (profileStateCountry) {
      setCountrySelected({
        label: profileStateCountry.name,
        value: profileStateCountry.id,
      });
    } else {
      setCountrySelected(initialCountry);
    }
  }

  function fillForm() {
    formRef.current.setData({
      name: userName,
      personalIntroduction: about.personalIntroduction || '',
    });
  }

  useEffect(() => {
    async function handleState() {
      await fillStates();
    }

    if (countrySelected.value) handleState();
  }, [countrySelected]);

  useEffect(() => {
    async function handleCity() {
      await fillCities();
    }

    if (stateSelected.value) handleCity();
  }, [stateSelected]);

  function cleanForm() {
    formRef.current.setData({
      name: '',
      personalIntroduction: '',
    });
    setCountrySelected({});
    setStateSelected({});
    setCitySelected({});
    setTimezoneSelected({});
  }

  useEffect(() => {
    async function fetchData() {
      cleanForm();
      fillForm();
      await fillCountries();
      await fillTimezones();
      await fillCurrentsSelects();
    }

    if (appState.modal.isOpened) fetchData();
    else setFilledCurrent(false);
  }, [appState.modal.isOpened]);

  return (
    <ModalBody
      elementID="modal-content-about"
      headerTitle={modalT('about.title')}
      onCancel={closeModal}
      contentUnGutterBottom
    >
      <Body>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Row>
            <FormBlock label={modalT('about.fields.name.label')}>
              <TextInput
                name="name"
                placeholder={modalT('about.fields.name.placeholder')}
                size="medium"
                value={userName}
                maxLength="30"
                onChange={handleChange}
              />
            </FormBlock>
          </Row>

          <Row>
            <FormBlock label={modalT('about.fields.country.label')}>
              <ReactSelect
                className="countryAbout"
                options={countries}
                value={countrySelected}
                name="countryId"
                loading={countryLoading}
                onOptionSelected={value => {
                  setCountrySelected(value);
                }}
              />
            </FormBlock>
          </Row>

          <Row>
            <FormBlock
              className="reqlabel"
              label={modalT('about.fields.state.label')}
              disabled={!countrySelected.value}
            >
              <ReactSelect
                className="countryAbout"
                options={states}
                value={stateSelected}
                disabled={!countrySelected.value}
                loading={stateLoading}
                name="stateId"
                onOptionSelected={value => {
                  setStateSelected(value);
                }}
                onFocus={() => scrollToBottom('#modal-content-about')}
              />
            </FormBlock>
          </Row>

          <Row>
            <FormBlock
              className="reqlabel"
              label={modalT('about.fields.city.label')}
              disabled={!stateSelected.value}
            >
              <ReactSelect
                className="countryAbout"
                options={cities}
                value={citySelected}
                disabled={!stateSelected.value}
                loading={cityLoading}
                name="cityId"
                onOptionSelected={value => {
                  setCitySelected(value);
                }}
                onFocus={() => scrollToBottom('#modal-content-about')}
              />
            </FormBlock>
          </Row>

          <Row>
            <FormBlock label={modalT('about.fields.timezone.label')}>
              <ReactSelect
                className="countryAbout"
                options={timezones}
                value={timezoneSelected}
                loading={timezoneLoading}
                name="timezone"
                onOptionSelected={value => {
                  setTimezoneSelected(value);
                }}
                onFocus={() => scrollToBottom('#modal-content-about')}
              />
            </FormBlock>
          </Row>

          <Row>
            <FormBlock
              className="reqlabel"
              label={modalT('about.fields.personalIntroduction.label')}
              helperText={modalT(
                'about.fields.personalIntroduction.helperText',
              )}
            >
              <TextInput
                className="aboutBlurb"
                name="personalIntroduction"
                placeholder={modalT(
                  'about.fields.personalIntroduction.placeholder',
                )}
                size="medium"
                multiline
                value={about.personalIntroduction}
                maxLength="130"
              />
            </FormBlock>
          </Row>

          <BoxSticky>
            <Actions>
              <BtnGroup>
                <Btn
                  startIcon="leftArrow"
                  iconSize={12}
                  label={buttonsT('back')}
                  handleClick={closeModal}
                />
              </BtnGroup>

              <BtnGroup>
                <Btn
                  type="submit"
                  variant="outlinePrimary"
                  label={buttonsT('save')}
                  loading={loading}
                />
              </BtnGroup>
            </Actions>
          </BoxSticky>
        </Form>
      </Body>
    </ModalBody>
  );
};

export default About;

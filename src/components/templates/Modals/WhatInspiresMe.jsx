import React, { useContext, useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import CultureFitService from '@api/services/cultureFit';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import { useToast } from '@components/molecules/Notification';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import Btn from '@components/molecules/Btn';
import errorHandle from '@src/utils/error';
import { Typography } from '@assets/styles/typo';
import IconSVG from '@components/atoms/IconSVG';
import { Scope } from '@unform/core';
import ModalBody from './ModalBody';

import {
  Row,
  Actions,
  FormBlockWrapper,
  FormBlockRow,
  TrashButton,
} from './style';

const VolunteerExperience = ({ list, cultureFitId }) => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    if (!list) return;
    const listKeys = Object.keys(list);

    const initialDataFormated = {};

    listKeys.forEach(eachKey => {
      if (list[eachKey]?.length > 0) {
        initialDataFormated[eachKey] = list[eachKey];
      } else {
        initialDataFormated[eachKey] = [{ name: '', link: '', id: uuidv4() }];
      }
    });

    setInitialData(initialDataFormated);
  }, [list]);

  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: modalT } = useTranslation('modals');

  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const closeModal = () => {
    formRef.current.setErrors({});
    formRef.current.reset();
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
    profileDispatch({
      type: 'SET_NON_PROFITS',
      nonProfits: [],
    });
  };

  const saveModal = async formData => {
    const profileId = profileState.id;
    const reqBody = formData;

    try {
      await CultureFitService.updateWhatInspiresMe(
        profileId,
        cultureFitId,
        reqBody,
      );
      profileDispatch({
        type: 'SET_NON_PROFITS',
        nonProfits: [],
      });
      showSuccess(modalT('what_inspires_me.success'));
      setLoading(false);
      closeModal();
    } catch (err) {
      showToast(errorHandle(err));
      setLoading(false);
    }
  };

  const initialDataKeys = Object.keys(initialData || []);

  const parseHeaderTitle = text => {
    if (text === 'tiktok') return 'TikTok';

    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const getInputLabels = platform => {
    const platformLabels = {
      instagram: {
        label: 'Username',
        placeholder: 'Please enter username here',
        urlPlaceholder: 'instagram.com/yourusername/',
      },
      twitter: {
        label: 'Username',
        placeholder: 'Please enter username here',
        urlPlaceholder: 'twitter.com/yourusername/',
      },
      tiktok: {
        label: 'Username',
        placeholder: 'Please enter username here',
        urlPlaceholder: 'https://vm.tiktok.com/',
      },
      podcasts: {
        label: 'Name',
        placeholder: 'How I Built That',
        urlPlaceholder: '',
      },
      books: {
        label: 'Name',
        placeholder: '',
        urlPlaceholder: '',
      },
      other: {
        label: 'Name',
        placeholder: '',
        urlPlaceholder: '',
      },
    };

    return platformLabels[platform];
  };

  const handleAddMoreButton = platform => {
    setInitialData(currState => ({
      ...currState,
      [platform]: [
        ...currState[platform],
        { name: '', link: '', id: uuidv4() },
      ],
    }));
  };

  const updateInputValues = (e, inputName, platform, index) => {
    const inputValue = e.target.value;
    if (e.target.value && e.target.value.trim() !== '') {
      setInitialData(currState => {
        const currStateCopy = currState;
        currStateCopy[platform][index][inputName] = inputValue;
        return { ...currStateCopy };
      });
    } else {
      e.target.value = '';
    }
  };

  const handleDelete = (platform, item) => {
    if (initialData[platform]?.length === 1) {
      setInitialData(currState => ({
        ...currState,
        [platform]: [{ name: '', link: '', id: uuidv4() }],
      }));
      return;
    }

    const dataFiltered = initialData[platform]?.filter(
      eachItem => eachItem.id !== item.id,
    );

    setInitialData(currState => ({
      ...currState,
      [platform]: dataFiltered,
    }));
  };

  const handleSubmit = async formData => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object({
        podcasts: Yup.array().of(
          Yup.object().shape({
            link: Yup.string().url(),
            name: Yup.string().when('link', {
              is: link => link.length > 0,
              then: Yup.string().required(),
            }),
          }),
        ),
        instagram: Yup.array().of(
          Yup.object().shape({
            link: Yup.string().url(),
            name: Yup.string().when('link', {
              is: link => link.length > 0,
              then: Yup.string().required(),
            }),
          }),
        ),
        twitter: Yup.array().of(
          Yup.object().shape({
            link: Yup.string().url(),
            name: Yup.string().when('link', {
              is: link => link.length > 0,
              then: Yup.string().required(),
            }),
          }),
        ),
        tiktok: Yup.array().of(
          Yup.object().shape({
            link: Yup.string().url(),
            name: Yup.string().when('link', {
              is: link => link.length > 0,
              then: Yup.string().required(),
            }),
          }),
        ),
        books: Yup.array().of(
          Yup.object().shape({
            link: Yup.string().url(),
            name: Yup.string().when('link', {
              is: link => link.length > 0,
              then: Yup.string().required(),
            }),
          }),
        ),
        other: Yup.array().of(
          Yup.object().shape({
            link: Yup.string().url(),
            name: Yup.string().when('link', {
              is: link => link.length > 0,
              then: Yup.string().required(),
            }),
          }),
        ),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      const payload = Object.entries(formData)
        .map(([key, values]) => {
          return values.map(item => ({
            name: item.name,
            link: item.link,
            type: key,
          }));
        })
        .reduce((prev, curr) => [...curr, ...prev], [])
        .filter(item => item.name || item.link);

      await saveModal({ whatInspires: payload });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          const [, fieldName] = error.path?.split('.');
          validationErrors[error.path] = errorMessage(
            `${fieldName}.${error.type}`,
          );
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <ModalBody onCancel={closeModal} headerTitle="What Inspires Me">
      <Form onSubmit={handleSubmit} ref={formRef}>
        {initialDataKeys.map((eachPlatform, index) => {
          const labels = getInputLabels(eachPlatform);

          if (!labels) return <></>;

          return (
            <Row hasBorderTop={index > 0}>
              <Typography
                size="base"
                color="grey61"
                fontWeight={700}
                style={{ marginBottom: 15 }}
              >
                {parseHeaderTitle(eachPlatform)}
              </Typography>
              {initialData[eachPlatform].map((eachItem, indexEachItem) => {
                return (
                  <FormBlockWrapper key={eachItem.id}>
                    <FormBlockRow>
                      <Scope path={`${eachPlatform}[${indexEachItem}]`}>
                        <FormBlock label={labels?.label} isLabelStrong>
                          <TextInput
                            placeholder={labels?.placeholder}
                            name="name"
                            size="medium"
                            maxLength="30"
                            onChange={e =>
                              updateInputValues(
                                e,
                                'name',
                                eachPlatform,
                                indexEachItem,
                              )
                            }
                            value={
                              initialData[eachPlatform][indexEachItem].name
                            }
                          />
                        </FormBlock>

                        <FormBlock label="URL" isLabelStrong>
                          <TextInput
                            placeholder={labels?.urlPlaceholder}
                            name="link"
                            onChange={e =>
                              updateInputValues(
                                e,
                                'link',
                                eachPlatform,
                                indexEachItem,
                              )
                            }
                            value={
                              initialData[eachPlatform][indexEachItem].link
                            }
                            size="medium"
                          />
                        </FormBlock>
                        {(initialData[eachPlatform]?.length > 1 ||
                          initialData[eachPlatform][indexEachItem].name) && (
                          <TrashButton
                            onClick={() => handleDelete(eachPlatform, eachItem)}
                          >
                            <IconSVG name="trash" size={20} />
                          </TrashButton>
                        )}
                      </Scope>
                    </FormBlockRow>
                  </FormBlockWrapper>
                );
              })}
              <Btn
                type="button"
                label="Add more"
                size="sm"
                handleClick={() => handleAddMoreButton(eachPlatform)}
                variant="textPrimary"
                startIcon="plus"
                iconSize={8}
                style={{
                  margin: '10px 0 0 auto',
                  display: 'flex',
                }}
              />
            </Row>
          );
        })}
        <Actions style={{ marginTop: 32 }} isFixedBottom>
          <Btn
            label={buttonsT('back')}
            size="md"
            handleClick={closeModal}
            variant="text"
            startIcon="leftArrow"
            iconSize={8}
          />

          <Btn
            label={buttonsT('save')}
            type="submit"
            size="md"
            variant="outlinePrimary"
            loading={loading}
          />
        </Actions>
      </Form>
    </ModalBody>
  );
};

export default VolunteerExperience;

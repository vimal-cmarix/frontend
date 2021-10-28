import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';

import { Form } from '@unform/web';
import cookie from 'js-cookie';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import PresentationService from '@api/services/presentation';
import AppContext from '@context/appContext';

import Page from '@components/templates/Page';
import FormBlock from '@components/organisms/FormBlock';
import LinkBack from '@components/molecules/Link';
import PopOver from '@components/molecules/PopOver';
import TextInput from '@components/molecules/TextInput';
import RadioList from '@components/molecules/RadioList';
import Steps from '@components/molecules/Steps';
import { useToast, Action } from '@components/molecules/Notification';
import { sizes } from '@assets/styles/medias';

import errorHandle from '@src/utils/error';
import {
  IS_ADDING_PITCH_TO_JOBCARD,
  PRIVATE,
  PUBLIC,
  PUBLISHED,
} from '@modules/consts';
import Brand from '@components/atoms/Brand';
import Link from 'next/link';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import Btn from '@components/molecules/Btn';

import useMedia from '@src/hooks/useMedia';

import Storage from '@utils/storage';

import {
  ButtonsWrapper,
  ButtonWrapper,
  ButtonWrapperWithSpace,
  ButtonWrapperWithSpaceLarge,
  FormBlockWrapper,
  StepTitle,
  PopOverWrapper,
  StepDescription,
} from './style';

const Step1 = ({ action, presentationId }) => {
  const { state: appState } = useContext(AppContext);
  let submitType = 'NEXT';

  const isMobile = useMedia(`(max-width: ${sizes.tabletPortrait})`);

  const router = useRouter();

  const [bigLoading, setBigLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [presentationData, setPresentationData] = useState(null);
  const [actionVisibility, setActionVisibility] = useState(false);

  const [type, setType] = useState(PRIVATE);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const [jobTrackerData, setJobTrackerData] = useState({});

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const { t: presentationT } = useTranslation('pitch_steps');
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');

  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const btnNewRef = useRef(null);

  const listOptionRadio = [
    {
      value: PRIVATE,
      label: presentationT('step1.fields.private'),
    },
    {
      value: PUBLIC,
      label: presentationT('step1.fields.public'),
    },
  ];

  useEffect(() => {
    const storagedJobTrackerData = Storage.get(IS_ADDING_PITCH_TO_JOBCARD);

    if (storagedJobTrackerData) {
      setJobTrackerData(JSON.parse(storagedJobTrackerData));
    }
  }, []);

  async function handleData() {
    try {
      const response = await PresentationService.getById(presentationId);
      const { data } = response.data;
      setPresentationData(data);
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setTimeout(() => {
        setBigLoading(false);
      }, 700);
    }
  }

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => {
    if (presentationId) handleData();
  }, [presentationId]);

  useEffect(() => {
    if (presentationData && presentationData.id) {
      setTitle(presentationData.title);
      setDescription(presentationData.description);
      setType(presentationData.type);
    }

    setTimeout(() => {
      setBigLoading(false);
    }, 700);
  }, [presentationData]);

  // Form
  const formRef = useRef(null);

  function togglePopOver() {
    setPopOverVisibility(!popOverVisibility);
  }

  async function create(data) {
    try {
      setLoading(true);

      // Validation passed
      const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);

      if (profileId) {
        const response = await PresentationService.create(profileId, {
          type: data.type,
          title: data.title,
          description: data.description,
        });

        if (response) {
          // showSuccess(presentationT(`success.save`));
          setTimeout(() => {
            if (submitType === 'NEXT') {
              Router.push(
                `/presentation/${action}/step-2?id=${response.data.data.id}`,
              );
            } else {
              Router.push(`/presentation`);
            }
          }, 1000);
        }
      }

      setLoading(false);
    } catch (e) {
      showError(errorHandle(e));
      setLoading(false);
    }
  }

  async function edit(data) {
    try {
      setLoading(true);

      if (presentationId) {
        const dataEdit = {
          type: data.type,
          title: data.title,
          description: data.description,
        };

        if (presentationData.cover) {
          dataEdit.cover = {
            title: presentationData.cover.title,
            description: presentationData.cover.description,
            videoId:
              presentationData.cover.video && presentationData.cover.video.id,
          };
        }

        if (presentationData.portfolio?.length) {
          dataEdit.portfolioIds = presentationData.portfolio.map(e => e.id);
        }

        const response = await PresentationService.edit(
          presentationId,
          dataEdit,
        );

        if (response) {
          // showSuccess(presentationT(`success.save`));

          setTimeout(() => {
            if (submitType === 'NEXT') {
              Router.push(
                `/presentation/${action}/step-2?id=${presentationId}`,
              );
            } else {
              Router.push(`/presentation`);
            }
          }, process.env.TIMEOUT_GONEXT);
        }
      }

      setLoading(false);
    } catch (e) {
      showError(errorHandle(e));
      setLoading(false);
    }
  }

  async function save(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        type: Yup.string().required(),
        title: Yup.string().required(),
        description: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (presentationId === undefined) create(data);
      else edit(data);
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

  function submitsFormDraft() {
    submitType = 'DRAFT';
    formRef.current.submitForm();
    // const data = formRef.current.getData();
    // if (action === 'create') create(data);
    // else edit(data);
  }

  function submitsFormNext() {
    submitType = 'NEXT';
    formRef.current.submitForm();
  }

  const popOverItems = [
    {
      label:
        presentationData && presentationData.status === PUBLISHED
          ? buttonsT('save_continue')
          : buttonsT('next'),
      onClick: submitsFormNext,
    },
  ];

  if (action === 'edit') {
    popOverItems.push({
      label: buttonsT('save_draft'),
      onClick: () => setActionVisibility(true),
    });
  }

  function handleCancel() {
    if (Object.keys(jobTrackerData).length) {
      const { boardId, jobCardId } = jobTrackerData;

      router.push(`/job-tracker/${boardId}?jobcard=${jobCardId}`);

      return;
    }
    Router.push('/presentation');
    //router.back();
  }

  const BtnsWrapper = (
    <ButtonsWrapper>
      {(presentationData && presentationData.status !== PUBLISHED) ||
      action === 'edit' ? (
        <ButtonWrapperWithSpaceLarge>
          <Btn
            label={buttonsT('save_draft')}
            loading={loading}
            handleClick={() => setActionVisibility(true)}
            full
          />
        </ButtonWrapperWithSpaceLarge>
      ) : (
        ''
      )}
      <ButtonWrapperWithSpace>
        <Btn
          label={buttonsT('cancel')}
          variant={
            screenWidth >= parseInt(sizes.laptop, 10)
              ? 'outlineSecondary'
              : 'text'
          }
          handleClick={handleCancel}
          full
        />
      </ButtonWrapperWithSpace>
      {screenWidth <= parseInt(sizes.laptop, 10) && (
        <Link href="/home">
          <a href="/home">
            <Brand size="small" />
          </a>
        </Link>
      )}
      {screenWidth >= parseInt(sizes.laptop, 10) ? (
        <ButtonWrapper
          larger={presentationData && presentationData.status === PUBLISHED}
        >
          <Btn
            label={
              presentationData && presentationData.status === PUBLISHED
                ? buttonsT('save_continue')
                : buttonsT('next')
            }
            type="button"
            variant="solidPrimary"
            loading={loading}
            handleClick={submitsFormNext}
            full
          />
        </ButtonWrapper>
      ) : (
        <ButtonWrapper ref={btnNewRef}>
          <LinkBack
            label={buttonsT('options')}
            handleClick={togglePopOver}
            size="medium"
            arrow="right"
            arrowDirection="down"
          />
          <PopOverWrapper>
            <PopOver
              isVisible={popOverVisibility}
              btnRef={btnNewRef}
              onClickOutside={() => setPopOverVisibility(false)}
              items={popOverItems}
            />
          </PopOverWrapper>
        </ButtonWrapper>
      )}
    </ButtonsWrapper>
  );

  useEffect(() => {
    formRef.current.setData({
      title,
      type,
      description,
    });
  });

  function getCellSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 4;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 6;
    return 0;
  }

  function getGridSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 10;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 12;
    return 1;
  }

  function getLeftSize() {
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 4;
    return 0;
  }

  function getGapSize() {
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return '24px';
    return '0';
  }

  const cellSize = getCellSize();
  const gridSize = getGridSize();
  const leftSize = getLeftSize();
  const gapSize = getGapSize();

  function handleChange(e, inputType) {
    if (e.target.value && e.target.value.trim() !== '') {
      if (inputType === 'title') {
        setTitle(e.target.value);
      } else if (inputType === 'description') {
        setDescription(e.target.value);
      }
    } else {
      e.target.value = '';
    }
  }

  return (
    <Page
      title={presentationT(`step1.title`)}
      description={presentationT(`step1.description`)}
      className="blog-navbar"
      pageLoader={bigLoading}
      nav={{
        show: true,
        colorSchema: 'light',
        component: BtnsWrapper,
      }}
      isVerified
    >
      <SafeArea>
        {actionVisibility && (
          <Action
            type="warning"
            title={presentationT('draft_action.title')}
            description={presentationT('draft_action.description')}
            onCancel={() => setActionVisibility(false)}
            onConfirm={() => submitsFormDraft()}
            labelCancel={presentationT('draft_action.cancel')}
            labelConfirm={presentationT('draft_action.confirm')}
          />
        )}
        <Steps
          active="step-1"
          list={presentationT('steps.list', { returnObjects: true })}
        />
        <Grid columns={gridSize} gap={gapSize}>
          <Cell left={leftSize} width={cellSize}>
            <ContentWrapper className="blog-wrapper">
              <StepTitle>{presentationT(`step1.title`)}</StepTitle>
              <StepDescription>
                {presentationT(`step1.description`)}
              </StepDescription>
              <Form onSubmit={save} ref={formRef}>
                <FormBlockWrapper>
                  <FormBlock label={presentationT('step1.fields.presentation')}>
                    <RadioList
                      name="type"
                      list={listOptionRadio}
                      value={type}
                      onChange={e => setType(e)}
                    />
                  </FormBlock>
                </FormBlockWrapper>
                <FormBlockWrapper>
                  <FormBlock
                    className="reqlabel"
                    label={presentationT('step1.fields.title.label')}
                    helperText={presentationT('step1.fields.title.hint')}
                    helperTextPos={isMobile ? 'right' : 'top'}
                  >
                    <TextInput
                      name="title"
                      placeholder={presentationT(
                        'step1.fields.title.placeholder',
                      )}
                      size="medium"
                      onChange={e => handleChange(e, 'title')}
                      value=""
                      maxLength="250"
                    />
                  </FormBlock>
                </FormBlockWrapper>
                <FormBlockWrapper>
                  <FormBlock
                    className="descriptionArea"
                    label={presentationT(
                      'step1.fields.description_input.label',
                    )}
                    helperText={presentationT(
                      'step1.fields.description_input.hint',
                    )}
                    helperTextPos={isMobile ? 'right' : 'top'}
                  >
                    <TextInput
                      name="description"
                      placeholder={presentationT(
                        'step1.fields.description_input.placeholder',
                      )}
                      size="medium"
                      onChange={e => handleChange(e, 'description')}
                      value=""
                      maxLength="1000"
                      hint={`${description ? description?.length : 0}/1000`}
                      multiline
                      rows="5"
                    />
                  </FormBlock>
                </FormBlockWrapper>
              </Form>
            </ContentWrapper>
          </Cell>
        </Grid>
      </SafeArea>
    </Page>
  );
};

Step1.propTypes = {
  action: PropTypes.string.isRequired,
  presentationId: PropTypes.string,
};

Step1.defaultProps = {
  presentationId: undefined,
};

export default Step1;

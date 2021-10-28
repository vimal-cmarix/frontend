import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import AssetService from '@api/services/asset';
import PresentationService from '@api/services/presentation';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import IconSVG from '@components/atoms/IconSVG';
import Page from '@components/templates/Page';
import FormBlock from '@components/organisms/FormBlock';
import LinkBack from '@components/molecules/Link';
import PopOver from '@components/molecules/PopOver';
import TextInput from '@components/molecules/TextInput';
import Steps from '@components/molecules/Steps';
import Video from '@components/molecules/Video';
import FileUpload from '@components/molecules/FileUpload';
import CustomCheckBox from '@components/molecules/CustomCheckbox';
import { useToast, Action } from '@components/molecules/Notification';
import { sizes } from '@assets/styles/medias';

import { convertToMb } from '@utils/general';
import errorHandle from '@src/utils/error';
import Brand from '@components/atoms/Brand';
import Link from 'next/link';
import { Hint } from '@components/molecules/TextInput/style';
import { PUBLISHED } from '@modules/consts';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import ThumbUploadAndPreview from '@components/organisms/ThumbUploadAndPreview';
import Btn from '@components/molecules/Btn';
import {
  ButtonsWrapper,
  ButtonWrapper,
  ButtonWrapperWithSpace,
  ButtonWrapperWithSpaceLarge,
  FormBlockWrapper,
  StepTitle,
  PopOverWrapper,
  StepDescription,
  FileUploadWrapper,
  VideoWrapper,
  VideoIconsWrapper,
  IconDeleteButton,
} from './style';

const Step2 = ({ action, presentationId }) => {
  const { state: appState } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);
  let submitType = 'NEXT';

  const router = useRouter();

  const uploadOptions = {
    fromSources: [
      'local_file_system',
      'facebook',
      'instagram',
      'googledrive',
      'dropbox',
      'video',
    ],
    accept: 'video/*',
    maxFiles: 1,
    maxSize: convertToMb(500),
  };

  const [screenWidth, setScreenWidth] = useState(null);

  const [actionVisibility, setActionVisibility] = useState(false);
  const [bigLoading, setBigLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [presentationData, setPresentationData] = useState(null);
  const [useSummaryVideo, setUseSummaryVideo] = useState(false);

  const [videoUrl, setVideoUrl] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [videoUrlSummary, setVideoUrlSummary] = useState(null);
  const [videoDataSummary, setVideoDataSummary] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [errorVideo, setErrorVideo] = useState(false);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [summary, setSummary] = useState(null);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const { t: presentationT } = useTranslation('pitch_steps');
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');

  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const btnNewRef = useRef(null);

  function setEditData(data) {
    if (data.cover) {
      setTitle(data.cover.title);
      setDescription(data.cover.description);
      setVideoUrl(data.cover.video && data.cover.video.url);
      setVideoData({
        ...data.cover.video,
        originalThumbId: data.cover.video && data.cover.video.thumbId,
      });
      //setUseSummaryVideo(false);
    }
  }

  async function handleData() {
    try {
      const response = await PresentationService.getById(presentationId);
      const { data } = response.data;
      setPresentationData(data);
      setEditData(data);
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setTimeout(() => {
        setBigLoading(false);
      }, 700);
    }
  }

  async function videoUploadSuccess(res) {
    const { filesUploaded } = res;
    setErrorVideo(false);

    if (filesUploaded?.length) {
      setVideoLoading(true);

      const { url } = filesUploaded[0];
      const response = await AssetService.createAsset(url);
      const { data } = response;
      console.log('data---', data.data);
      setVideoData(data.data);
      setVideoUrl(data.data.url);
      setVideoLoading(false);
    } else {
      setVideoData(null);
      setVideoUrl(null);
    }
  }

  function clearFileUpload() {
    setVideoData(null);
    setVideoUrl(null);
    setErrorVideo(false);
  }

  // Form
  const formRef = useRef(null);

  function togglePopOver() {
    setPopOverVisibility(!popOverVisibility);
  }

  function goBack() {
    router.push(`/presentation/${action}/step-1?id=${presentationId}`);
  }

  async function saveDraft(data) {
    try {
      setLoading(true);

      if (presentationId) {
        const dataEdit = {
          type: presentationData.type,
          title: presentationData.title || '',
          description: presentationData.description || '',
        };

        if (presentationData.portfolio?.length) {
          dataEdit.portfolioIds = presentationData.portfolio.map(e => e.id);
        }

        dataEdit.cover = {
          title: data.title || '',
          description: data.description || '',
        };

        if (useSummaryVideo) {
          dataEdit.cover.videoId = videoDataSummary.id;
        } else if (videoData && videoData.id) {
          dataEdit.cover.videoId = videoData.id;
        } else {
          dataEdit.cover.videoId = null;
        }

        const response = await PresentationService.edit(
          presentationId,
          dataEdit,
        );

        if (response) {
          // showSuccess(presentationT(`success.save`));
          if (submitType === 'NEXT') {
            Router.push(
              `/presentation/${action}/step-3?id=${response.data.data.id}`,
            );
          } else {
            router.push('/presentation?tab=drafts');
          }
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
        if (videoData) {
          await AssetService.uploadVideoThumbnail(videoData);
        }

        const { id } = useSummaryVideo ? videoDataSummary : videoData;

        if (id) {
          const dataEdit = {
            cover: {
              title: data.title,
              description: data.description,
              videoId: id,
            },
            type: presentationData.type,
            title: presentationData.title,
            description: presentationData.description,
            job: presentationData.job,
            hiringName: presentationData.hiringName,
          };

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
                  `/presentation/${action}/step-3?id=${response.data.data.id}`,
                );
              } else {
                router.push('/presentation?tab=drafts');
              }
            }, process.env.TIMEOUT_GONEXT);
          }
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
      setErrorVideo(false);

      const schema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
      });

      if (!videoData || !useSummaryVideo) {
        setErrorVideo(true);
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      if (videoData || useSummaryVideo) edit(data);
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

  function saveAsDraft() {
    submitType = 'DRAFT';
    // formRef.current.submitForm();
    saveDraft(formRef.current.getData());
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
    { label: buttonsT('save_draft'), onClick: () => setActionVisibility(true) },
  ];

  const BtnsWrapper = (
    <ButtonsWrapper>
      {(presentationData && presentationData.status !== PUBLISHED) ||
      action === 'create' ? (
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
          label={buttonsT('back')}
          variant={
            screenWidth >= parseInt(sizes.laptop, 10)
              ? 'outlineSecondary'
              : 'text'
          }
          handleClick={goBack}
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

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => {
    if (profileState.id) {
      setSummary(profileState.summary);
    }
  }, [profileState]);

  useEffect(() => {
    if (presentationId) handleData();
  }, [presentationId]);

  useEffect(() => {
    if (presentationData && presentationData.id && summary && summary.asset) {
      setTitle(presentationData.cover && presentationData.cover.title);
      setDescription(
        presentationData.cover && presentationData.cover.description,
      );

      setVideoDataSummary(summary.asset);
      setVideoUrlSummary(summary.asset.url);

      if (presentationData.cover && presentationData.cover.video) {
        if (summary.asset.id === presentationData.cover.video.id)
          setUseSummaryVideo(true);
        else {
          setVideoUrl(presentationData.cover.video.url);
          setVideoData(presentationData.cover.video);
          setUseSummaryVideo(false);
        }
      }
    }

    setTimeout(() => {
      setBigLoading(false);
    }, 700);
  }, [summary, presentationData]);

  useEffect(() => {
    formRef.current.setData({
      title,
      description,
    });
  });

  useEffect(() => {
    if (useSummaryVideo && title === null && description === null) {
      setTitle(summary.title);
      setDescription(summary.description);
    }
  }, [useSummaryVideo]);

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

  function getVideWrapper() {
    if (!profileState.id) return null;

    if (videoUrl) {
      return (
        <>
          <VideoWrapper aspectRatio16x9>
            {!videoPlaying && (
              <VideoIconsWrapper className="video-trash">
                <IconDeleteButton onClick={clearFileUpload}>
                  <IconSVG name="trash" />
                </IconDeleteButton>
              </VideoIconsWrapper>
            )}
            <Video
              data={videoData}
              thumb={videoData && videoData.thumbnail}
              setPlaying={setVideoPlaying}
              className="video-box"
            >
              <source src={videoUrl} />
              <span>{presentationT('step2.fields.video.support')}</span>
            </Video>
          </VideoWrapper>
          <ThumbUploadAndPreview
            contentData={videoData}
            videoData={videoData}
            generatedThumb={videoData && videoData.thumbnail}
            onChange={setVideoData}
            type="video"
          />
        </>
      );
    }

    return (
      <>
        <FileUpload
          options={uploadOptions}
          description={presentationT('step2.fields.video.upload_description')}
          onSuccess={videoUploadSuccess}
          loading={videoLoading}
          error={errorVideo}
          isVideo
        />
        {errorVideo && <Hint error>{errorMessage('video.required')}</Hint>}
      </>
    );
  }

  function handleChange(e, inputname) {
    if (e.target.value && e.target.value.trim() !== '') {
      if (inputname === 'title') {
        setTitle(e.target.value);
      } else if (inputname === 'description') {
        setDescription(e.target.value);
      }
    } else {
      e.target.value = '';
    }
  }

  return (
    <Page
      title={presentationT(`step2.title`)}
      description={presentationT(`step2.description`)}
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
            onConfirm={() => saveAsDraft()}
            labelCancel={presentationT('draft_action.cancel')}
            labelConfirm={presentationT('draft_action.confirm')}
          />
        )}
        <Steps
          active="step-2"
          list={presentationT('steps.list', { returnObjects: true })}
        />
        <Grid columns={gridSize} gap={gapSize}>
          <Cell left={leftSize} width={cellSize}>
            <ContentWrapper className="blog-wrapper">
              <StepTitle>{presentationT(`step2.title`)}</StepTitle>
              <StepDescription>
                {presentationT(`step2.description`)}
              </StepDescription>
              <Form onSubmit={save} ref={formRef}>
                {!useSummaryVideo && (
                  <FormBlock
                    className="reqlabel"
                    label={presentationT('step2.fields.video.label')}
                  >
                    <FileUploadWrapper>{getVideWrapper()}</FileUploadWrapper>
                  </FormBlock>
                )}

                {videoUrlSummary && useSummaryVideo && (
                  <FormBlockWrapper>
                    <FormBlock
                      className="reqlabel"
                      label={presentationT('step2.fields.video.label')}
                    >
                      <VideoWrapper>
                        <Video
                          data={videoDataSummary}
                          thumb={videoDataSummary.thumbnail}
                        >
                          <source src={videoUrlSummary} />
                          <span>
                            {presentationT('step2.fields.video.support')}
                          </span>
                        </Video>
                      </VideoWrapper>
                    </FormBlock>
                  </FormBlockWrapper>
                )}

                <FormBlockWrapper>
                  {summary && summary.asset && (
                    <CustomCheckBox
                      className="checkboxVideo"
                      label={presentationT('step2.fields.video.checkbox')}
                      name="current_job"
                      checked={useSummaryVideo}
                      onChange={e => setUseSummaryVideo(e.target.checked)}
                    />
                  )}
                </FormBlockWrapper>

                <FormBlockWrapper>
                  <FormBlock
                    className="reqlabel"
                    label={presentationT('step2.fields.title.label')}
                  >
                    <TextInput
                      name="title"
                      placeholder={presentationT(
                        'step2.fields.title.placeholder',
                      )}
                      size="medium"
                      onChange={e => handleChange(e, 'title')}
                      value={title}
                      maxLength="250"
                    />
                  </FormBlock>
                </FormBlockWrapper>
                <FormBlockWrapper>
                  <FormBlock
                    className="reqlabel"
                    label={presentationT('step2.fields.description.label')}
                  >
                    <TextInput
                      className="pitchDes"
                      name="description"
                      placeholder={presentationT(
                        'step2.fields.description.placeholder',
                      )}
                      size="medium"
                      onChange={e => handleChange(e, 'description')}
                      value={description}
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

Step2.propTypes = {
  action: PropTypes.string.isRequired,
  presentationId: PropTypes.string,
};

Step2.defaultProps = {
  presentationId: undefined,
};

export default Step2;

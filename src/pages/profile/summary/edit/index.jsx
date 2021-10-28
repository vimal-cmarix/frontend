import React, { useState, useRef, useEffect, useContext } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import ProfileContext from '@context/profileContext';
import { Form } from '@unform/web';
import cookie from 'js-cookie';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';
import DropArea from '@components/atoms/DropArea';
import AssetService from '@api/services/asset';
import ProfileService from '@api/services/profile';

import Page from '@components/templates/Page';
import Noembed from '@components/atoms/Noembed';
import Video from '@components/molecules/Video';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
// import FileUpload from '@components/molecules/FileUpload';
import BtnGroup from '@components/organisms/BtnGroup';
import { useToast, Action } from '@components/molecules/Notification';
import { sizes } from '@assets/styles/medias';
// import NdEditor from '@components/organisms/NdEditor';
import CustomLink from '@components/molecules/Link';
import PopOver from '@components/molecules/PopOver';
import Brand from '@components/atoms/Brand';
import RadioList from '@components/molecules/RadioList';
import Btn from '@components/molecules/Btn';
import IconSVG from '@components/atoms/IconSVG';

import { withAuthSync } from '@src/utils/auth';
import { convertToMb } from '@utils/general';
import errorHandle from '@src/utils/error';
import Storage from '@utils/storage';
import AppContext from '@context/appContext';
import { UPLOAD, URL } from '@modules/consts';

import { Hint } from '@components/molecules/TextInput/style';
import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import ThumbUploadAndPreview from '@components/organisms/ThumbUploadAndPreview';
import { VideoWrapper } from '../../style';

import {
  ButtonsWrapper,
  ButtonWrapper,
  ButtonWrapperWithSpace,
  FileUploadWrapper,
  FormRow,
  VideoIconsWrapper,
  PopOverWrapper,
  IconDeleteButton,
} from './style';

const SummaryPage = () => {
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

  const { state: appState } = useContext(AppContext);

  const [bigLoading, setBigLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const [videoUrl, setVideoUrl] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [errorVideo, setErrorVideo] = useState(false);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState(null);
  // const [editorFocused, setEditorFocused] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);
  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const [videoType, setVideoType] = useState(UPLOAD);
  const [linkData, setLinkData] = useState(null);
  const [link, setLink] = useState('');
  const [formCache, setFormCache] = useState({});

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const { t: toastT } = useTranslation('summary');
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: summaryT } = useTranslation('summary_page');
  const { t: buttonsT } = useTranslation('buttons');

  const btnNewRef = useRef(null);
  // Form
  const formRef = useRef(null);

  // Context
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  function handleData() {
    const { summary } = profileState;
    console.log('summary', summary);
    formRef.current.setData({
      title: summary.title,
      description: summary.description,
    });

    setDescription(summary.description);
    setVideoData(summary.asset);
    setVideoUrl((summary.asset && summary.asset.mediaUrl) || null);
  }

  useEffect(() => {
    if (videoType === UPLOAD) {
      formRef.current.setData({
        title: formCache.title || '',
        description: formCache.description || '',
      });
    } else {
      setFormCache({
        title: formRef.current.getFieldValue('title'),
        description: formRef.current.getFieldValue('description'),
      });
      formRef.current.setData({
        title: '',
        description: '',
      });
    }
  }, [videoType]);

  // Uploaded Success
  async function videoUploadSuccess(res) {
    // console.log('res', res);
    // const { filesUploaded } = res;
    const filesUploaded = res;
    setErrorVideo(false);
    if (filesUploaded?.length) {
      // console.log('suceess');
      setVideoLoading(true);
      // const { url } = filesUploaded[0];
      console.log('url__', res);
      const response = await AssetService.createAsset(res);
      const { data } = response;
      data.data.thumbCache = {};
      setVideoData(data.data);
      console.log('data.data', data.data);
      setVideoUrl(data.data.mediaUrl);
      setVideoLoading(false);
    } else {
      setVideoData(null);
      setVideoUrl(null);
    }
  }

  useEffect(() => {
    if (linkData && linkData.title) {
      formRef.current.setData({
        title: (linkData.title || '').trim(),
        description: (linkData.description || '').trim(),
      });
    }
  }, [linkData]);

  function clearFileUpload() {
    setVideoData(null);
    setVideoUrl(null);
    setErrorVideo(false);
  }

  function submitsForm() {
    formRef.current.submitForm();
  }

  function goBackProfile() {
    Router.back();
  }

  const [clearContentShow, setClearContentShow] = useState(false);
  const [clearContentLoading, setClearContentLoading] = useState(false);
  const clearContent = () => setClearContentShow(true);

  const confirmClearContent = async () => {
    try {
      setClearContentLoading(true);

      // Validation passed
      const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);
      const response = await ProfileService.setSummary(profileId, {
        assetId: null,
        title: null,
        description: null,
        text: null,
        link: null,
      });

      if (response) {
        const { summary } = response.data.data;

        profileDispatch({
          type: 'SET_SUMMARY',
          summary,
        });

        // Router.push('/profile');
        setClearContentShow(false);
        showSuccess(toastT('success'));
      }
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setClearContentLoading(false);
    }
  };

  async function updateSummary(data) {
    console.log('data', data);
    try {
      setLoading(true);
      const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);
      if (profileId) {
        let assetId = null;
        let videoLink = null;

        if (data.type === UPLOAD) {
          assetId = videoData.id;
          await AssetService.uploadVideoThumbnail(videoData);
        } else {
          videoLink = {
            url: data.link,
            imageUrl: linkData ? linkData.thumbnail || linkData.images : null,
          };
        }

        const response = await ProfileService.setSummary(profileId, {
          assetId,
          title: data.title,
          description: data.description,
          text: data.content,
          link: videoLink,
        });

        if (response) {
          const { summary } = response.data.data;

          profileDispatch({
            type: 'SET_SUMMARY',
            summary,
          });
          Storage.add('updateProfile', 'true');
          Router.back();
          showSuccess(toastT('success'));
        }
      }

      setLoading(false);
    } catch (e) {
      console.log('error - update summary', e);
      showError(errorHandle(e));
      setLoading(false);
    }
  }

  async function save(params) {
    // alert('hello');
    const data = {
      ...params,
      content,
    };
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      setErrorVideo(false);

      const schema = Yup.object().shape({
        type: Yup.string().oneOf([URL, UPLOAD]),
        link: Yup.string().when('type', {
          is: URL,
          then: Yup.string().required(),
        }),
        title: Yup.string().required(),
        description: Yup.string()
          .max(1000)
          .required(),
        content: Yup.object().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (data.type === UPLOAD && !videoData) {
        setErrorVideo(true);
        return;
      }

      updateSummary(data);
    } catch (err) {
      console.log('update summary error', err);
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

  function getVideoWrapper() {
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
              className="video-box"
              data={videoData}
              thumb={videoData.thumbnail}
              setPlaying={setVideoPlaying}
            >
              <source src={videoUrl} />
              <span>{summaryT('video_support')}</span>
            </Video>
          </VideoWrapper>
          <ThumbUploadAndPreview
            contentData={videoData}
            onChange={setVideoData}
            type="video"
          />
        </>
      );
    }
    return (
      <>
        <DropArea
          // onPick={onPick}
          // description={description}
          maxSize={uploadOptions}
          error={errorVideo}
          loading={videoLoading}
          onVideoUpload={videoUploadSuccess}
          isVideo
        />
        {errorVideo && <Hint error>{errorMessage('video.required')}</Hint>}
      </>
    );
  }

  const popOverItems = [
    { label: buttonsT('clear_content'), onClick: clearContent },
    { label: buttonsT('save'), onClick: submitsForm },
  ];

  function togglePopOver() {
    setPopOverVisibility(!popOverVisibility);
  }

  const BtnsWrapper = (
    <ButtonsWrapper>
      <ButtonWrapperWithSpace>
        <Btn label={buttonsT('cancel')} handleClick={goBackProfile} full />
      </ButtonWrapperWithSpace>
      {screenWidth >= parseInt(sizes.laptop, 10) ? (
        <BtnGroup spaceY={0}>
          <Btn
            variant="outlineSecondary"
            label={buttonsT('clear_content')}
            handleClick={clearContent}
          />
          <Btn
            variant="outlinePrimary"
            label={buttonsT('save')}
            handleClick={submitsForm}
            loading={loading}
          />
        </BtnGroup>
      ) : (
        <>
          <Link href="/home">
            <a href="/home">
              <Brand size="small" />
            </a>
          </Link>
          <ButtonWrapper ref={btnNewRef}>
            <CustomLink
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
        </>
      )}
    </ButtonsWrapper>
  );

  function fillContent(summary) {
    const { text } = summary;
    const fallback = {
      blocks: [
        {
          key: '16d0k',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };

    setContent(Object.keys(text || {})?.length ? text : fallback);
  }

  useEffect(() => {
    if (profileState.id) {
      const { id, summary } = profileState;
      if (id) handleData();
      if (summary && summary.link) {
        setLink(profileState.summary.link.url);
        setVideoType(URL);
      }

      fillContent(summary);
    }

    setTimeout(() => {
      setBigLoading(false);
    }, 700);
  }, [profileState]);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function getGridSize() {
    if (screenWidth >= parseInt(sizes.desktop, 10)) return 10;
    return 12;
  }

  function getCellSize() {
    if (screenWidth >= parseInt(sizes.desktop, 10)) return 4;
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 12;
    return 6;
  }

  function getLeftValue() {
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 0;
    return 4;
  }

  const gridSize = getGridSize();
  const cellSize = getCellSize();
  const leftValue = getLeftValue();

  const listOptionRadio = [
    {
      value: URL,
      label: summaryT('video_type.url_video'),
    },
    {
      value: UPLOAD,
      label: summaryT('video_type.upload_video'),
    },
  ];

  return (
    <Page
      title={summaryT('title')}
      description={summaryT('description')}
      className="summary-navbar"
      pageLoader={bigLoading}
      nav={{
        show: true,
        colorSchema: 'light',
        component: BtnsWrapper,
      }}
      isVerified
    >
      <SafeArea>
        {clearContentShow && (
          <Action
            type="warning"
            title={summaryT('clear_content')}
            description={summaryT('remove_message')}
            onCancel={() => setClearContentShow(false)}
            onConfirm={confirmClearContent}
            loading={clearContentLoading}
          />
        )}
        <ContentWrapper>
          <Grid columns={gridSize} gap="24px">
            <Cell left={leftValue} width={cellSize}>
              <Form onSubmit={save} ref={formRef}>
                <FormRow>
                  <FormBlock label={summaryT('video_type.label')}>
                    <RadioList
                      name="type"
                      list={listOptionRadio}
                      value={videoType}
                      onChange={e => setVideoType(e)}
                    />
                  </FormBlock>
                </FormRow>
                {videoType === UPLOAD ? (
                  <FileUploadWrapper>{getVideoWrapper()}</FileUploadWrapper>
                ) : (
                  <>
                    <FormRow>
                      <FormBlock label={summaryT('video_url_label')}>
                        <TextInput
                          name="link"
                          placeholder={summaryT('video_url_placeholder')}
                          size="medium"
                          maxLength="255"
                          onChange={e => setLink(e.target.value)}
                          value={link}
                        />
                      </FormBlock>
                    </FormRow>
                    <FormBlock>
                      {link && (
                        <Noembed
                          url={link}
                          setData={setLinkData}
                          style={{ marginBottom: '32px' }}
                        />
                      )}
                    </FormBlock>
                    {linkData && (
                      <ThumbUploadAndPreview
                        contentData={linkData}
                        onChange={setLinkData}
                        type="link"
                        generatedThumb={{
                          url: linkData.images,
                          id: 'generatedThumb',
                        }}
                      />
                    )}
                  </>
                )}
                <FormRow>
                  <FormBlock label={summaryT('video_title_label')}>
                    <TextInput
                      name="title"
                      placeholder={summaryT('video_title_placeholder')}
                      size="medium"
                      maxLength="255"
                    />
                  </FormBlock>
                </FormRow>
                <FormRow>
                  <FormBlock label={summaryT('video_description_label hello')}>
                    <TextInput
                      name="description"
                      placeholder={summaryT('video_description_placeholder')}
                      size="medium"
                      multiline
                      onChange={e => setDescription(e.target.value)}
                      hint={`${description ? description?.length : 0}/1000`}
                      maxLength="1000"
                    />
                  </FormBlock>
                </FormRow>
              </Form>
            </Cell>
          </Grid>
        </ContentWrapper>
        {/* <ContainerEditor>
          {content && (
            <FormRow className={editorFocused && 'editor-focus-active'}>
              <NdEditor
                onChange={setContent}
                onFocus={() => setEditorFocused(true)}
                onBlur={() => setEditorFocused(false)}
                content={content}
              />
            </FormRow>
          )}
        </ContainerEditor> */}
      </SafeArea>
    </Page>
  );
};

export default withAuthSync(SummaryPage);

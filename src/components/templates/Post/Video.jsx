import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';

import { Form } from '@unform/web';
import cookie from 'js-cookie';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import AssetService from '@api/services/asset';
import PortfolioService from '@api/services/portfolio';
import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';

import Page from '@components/templates/Page';
import Video from '@components/molecules/Video';
import FormBlock from '@components/organisms/FormBlock';
import LinkBack from '@components/molecules/Link';
import PopOver from '@components/molecules/PopOver';
import TextInput from '@components/molecules/TextInput';
import FileUpload from '@components/molecules/FileUpload';
import { Button, IconButton } from '@components/molecules/Button';
import { useToast } from '@components/molecules/Notification';
import TagList from '@components/molecules/TagList';
import { sizes } from '@assets/styles/medias';

import generateUEID, { cdn, convertToMb } from '@utils/general';
import errorHandle from '@src/utils/error';
import { PUBLISHED, UNPUBLISHED } from '@modules/consts';
import Brand from '@components/atoms/Brand';
import Link from 'next/link';
import Storage from '@utils/storage';

import { Hint } from '@components/molecules/TextInput/style';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import {
  VideoWrapper,
  ButtonsWrapper,
  ButtonWrapper,
  ButtonWrapperWithSpace,
  ButtonWrapperWithSpaceLarge,
  ButtonWrapperWithSpaceLeftLarge,
  FileUploadWrapper,
  VideoIconsWrapper,
  FormBlockWrapper,
  PostTitle,
  PopOverWrapper,
  ButtonAddContent,
  ButtonAddContentWrapper,
  Tags,
  MockWrapper,
  IconDeleteButton,
} from '@components/templates/Post/style';
import ThumbUploadAndPreview from '@components/organisms/ThumbUploadAndPreview';
import ThumbUploadAndPreviewMocked from '@components/organisms/ThumbUploadAndPreview/mock';
import Btn from '@components/molecules/Btn';
import IconSVG from '@components/atoms/IconSVG';

const PostVideo = ({ action, postId }) => {
  const { state: profileState } = useContext(ProfileContext);
  const { state: appState, dispatch } = useContext(AppContext);

  const [tourIsInitialized, settourIsInitialized] = useState(false);

  const TourInitialize = () => {
    if (tourIsInitialized) return;

    settourIsInitialized(true);

    if (typeof window !== 'undefined') {
      const currentStep = Storage.get(`ePortfolioTourStep`);
      const enable =
        Storage.get(`ePortfolioTourShow_${profileState.id}`) === 'true';

      if (enable) {
        const next = parseInt(currentStep, 10);
        Storage.add(`tourEnable`, 'true');
        Storage.add(`ePortfolioTourStep`, next);
        dispatch({
          type: 'CHANGE_EPORTFOLIO_TOUR_STEP',
          currentStep: next,
        });
        dispatch({ type: 'SHOW_EPORTFOLIO_TOUR' });
      }
    }
  };

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

  let submitType = PUBLISHED;
  let editType = 'SAVE';

  const router = useRouter();

  const [bigLoading, setBigLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [postData, setPostData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);

  const [errorVideo, setErrorVideo] = useState(false);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [tag, setTag] = useState(null);
  const [tagListData, setTagListData] = useState([]);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const { t: postT } = useTranslation('post');
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: modalT } = useTranslation('modals');

  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const btnNewRef = useRef(null);

  async function handleData() {
    try {
      const response = await PortfolioService.getById(postId);
      const { data } = response.data;
      setPostData(data);
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setTimeout(() => {
        setBigLoading(false);
      }, 700);
    }
  }

  const [mockThumb, setMockThumb] = useState(
    cdn('/static/img/mock_video1.png'),
  );

  const [from, setFrom] = useState(null);
  const [idFrom, setIdFrom] = useState(null);

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => {
    if (profileState.id) {
      setTimeout(() => {
        TourInitialize();
      }, 1000);
    }
  }, [profileState]);

  useEffect(() => {
    if (postId) handleData();
  }, [postId]);

  useEffect(() => {
    if (postData && postData.id) {
      setTitle(postData.title);
      setDescription(postData.description);
      const tagData = postData.tags.map(tagItem => ({
        id: generateUEID(),
        label: tagItem,
      }));
      setTagListData(tagData);

      if (postData.asset) {
        setVideoUrl(postData.asset.url);
        setVideoData(postData.asset);
      }
    }

    setTimeout(() => {
      setBigLoading(false);
    }, 700);
  }, [postData]);

  useEffect(() => {
    if (router.query.from) {
      setFrom(router.query.from);
      setIdFrom(router.query.id);
    }
  }, [router.query]);

  // Form
  const formRef = useRef(null);

  // Uploaded Success
  async function videoUploadSuccess(res) {
    const { filesUploaded } = res;
    setErrorVideo(false);

    if (filesUploaded?.length) {
      setVideoLoading(true);

      const { url } = filesUploaded[0];
      const response = await AssetService.createAsset(url);
      const { data } = response;
      setVideoData(data.data);
      setVideoUrl(data.data.url);
      setVideoLoading(false);
    } else {
      setVideoData(null);
      setVideoUrl(null);
    }
  }

  const removeTag = id => setTagListData(tagListData.filter(t => t.id !== id));

  async function addTag() {
    try {
      // // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.string().required();

      await schema.validate(tag, {
        abortEarly: false,
      });

      // Validation passed
      if (tagListData.find(t => t.label === tag)) {
        formRef.current.setErrors({ tag: errorMessage('tags.duplicated') });
        return;
      }

      setTagListData([...tagListData, { id: generateUEID(), label: tag }]);
      setTag('');
      formRef.current.reset();
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

  function togglePopOver() {
    setPopOverVisibility(!popOverVisibility);
  }

  function clearFileUpload() {
    setVideoData(null);
    setVideoUrl(null);
    setErrorVideo(false);
    // setImageData(null);
    // setErrorImage(false);
  }

  function submitsForm() {
    submitType = PUBLISHED;
    formRef.current.submitForm();
  }

  function submitsFormPublish() {
    editType = 'SAVE_PUBLISH';
    formRef.current.submitForm();
  }

  function submitsFormDraft() {
    submitType = UNPUBLISHED;
    formRef.current.submitForm();
  }

  function goBack() {
    router.back();
  }

  async function create(data, status) {
    try {
      setLoading(true);

      // Validation passed
      const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);

      if (profileId && videoData) {
        await AssetService.uploadVideoThumbnail(videoData);
        const response = await PortfolioService.create(profileId, {
          title: data.title,
          description: data.description,
          tags: tagListData.map(tab => tab.label.toString()),
          status,
          type: 'media',
          assetId: videoData.id,
        });

        if (response) {
          const isUnpublish = submitType === UNPUBLISHED;
          if (from && idFrom) {
            router.push(
              `/${from}/edit/step-3?id=${idFrom}${
                !isUnpublish ? `&created=${response.data.data.id}` : ''
              }`,
            );
          } else {
            router.push('/library');
            showSuccess(
              postT(
                `success.create.${
                  submitType === PUBLISHED ? 'published' : 'draft'
                }`,
              ),
            );
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

      if (postId && videoData) {
        await AssetService.uploadVideoThumbnail(videoData);
        const { id } = videoData;
        const response = await PortfolioService.edit(postId, {
          title: data.title,
          description: data.description,
          tags: tagListData.map(tab => tab.label.toString()),
          status: editType === 'SAVE' ? postData.status : PUBLISHED,
          type: 'media',
          assetId: id,
        });

        if (response) {
          router.push('/library');
          showSuccess(
            postT(
              `success.edit.${
                submitType === PUBLISHED ? 'published' : 'draft'
              }`,
            ),
          );
        }
      }

      setLoading(false);
    } catch (e) {
      showError(errorHandle(e));
      setLoading(false);
    }
  }

  async function addInterest(event) {
    if (event.charCode === 13 || event.key === 'Enter') {
      addTag();
    }
  }

  async function save(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      setErrorVideo(false);
      // setErrorImage(false);

      if (!videoData) {
        setErrorVideo(true);
        // setErrorImage(true);
      }

      const schema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (action === 'create') create(data, submitType);
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

  function handleChange(e, inputType) {
    if (e.target.value && e.target.value.trim() !== '') {
      if (inputType === 'title') {
        setTitle(e.target.value);
      } else if (inputType === 'description') {
        setDescription(e.target.value);
      } else if (inputType === 'tag') {
        setTag(e.target.value);
      }
    } else {
      e.target.value = '';
    }
  }

  // const [customThumb, setCustomThumb] = useState(null);

  function getVideoWrapper() {
    if (!profileState.id) return null;

    if (appState.eportfolio_tour.isOpened)
      return (
        <>
          <MockWrapper
            data-tut="reactour__file_only"
            className="mock-file-wrapper"
          >
            <FileUpload
              options={uploadOptions}
              description={postT('create.video.upload_description')}
              onSuccess={videoUploadSuccess}
              loading={videoLoading}
              error={errorVideo}
            />
          </MockWrapper>

          <div
            data-tut="reactour__video_with_thumbs"
            className="mock-video-wrapper"
          >
            <VideoWrapper aspectRatio16x9>
              <Video thumb={mockThumb} className="video-box">
                <source src="" />
                <span>{postT('video_support')}</span>
              </Video>
            </VideoWrapper>
            <ThumbUploadAndPreviewMocked
              videoUrl=""
              onPreviewChanged={preview => setMockThumb(preview)}
            />
          </div>
        </>
      );

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
              thumb={videoData.thumbnail}
              setPlaying={setVideoPlaying}
              className="video-box"
            >
              <source src={videoUrl} />
              <span>{postT('video_support')}</span>
            </Video>
          </VideoWrapper>
          <ThumbUploadAndPreview
            contentData={videoData}
            onChange={d => setVideoData(d)}
            type="video"
          />
        </>
      );
    }
    return (
      <>
        <FileUpload
          options={uploadOptions}
          description={postT('create.video.upload_description')}
          onSuccess={videoUploadSuccess}
          loading={videoLoading}
          error={errorVideo}
          isVideo
        />
        {errorVideo && <Hint error>{errorMessage('video.required')}</Hint>}
      </>
    );
  }

  const popOverItems = [
    { label: buttonsT('save'), onClick: submitsForm },
    // { label: buttonsT('save_draft'), onClick: submitsFormDraft },
  ];

  const popOverItemsDraft = [
    { label: buttonsT('save'), onClick: submitsForm },
    { label: buttonsT('save_publish'), onClick: submitsFormPublish },
  ];

  if (from && idFrom) {
    popOverItems.pop();
  }

  const BtnsWrapper = (
    <ButtonsWrapper>
      {action === 'create' && !from && !idFrom && (
        <ButtonWrapperWithSpaceLarge>
          <Btn
            label={buttonsT('save_draft')}
            loading={loading}
            handleClick={submitsFormDraft}
            full
          />
        </ButtonWrapperWithSpaceLarge>
      )}
      <ButtonWrapperWithSpace>
        <Btn
          variant={
            screenWidth >= parseInt(sizes.laptop, 10)
              ? 'outlineSecondary'
              : 'text'
          }
          label={buttonsT('cancel')}
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
        <ButtonWrapper data-tut="reactour__video_publish">
          <Btn
            label={buttonsT(action === 'create' ? 'publish' : 'save')}
            type="button"
            variant="solidPrimary"
            loading={loading}
            handleClick={submitsForm}
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
              items={
                action === 'edit' && postData && postData.status === UNPUBLISHED
                  ? popOverItemsDraft
                  : popOverItems
              }
            />
          </PopOverWrapper>
        </ButtonWrapper>
      )}
      {action === 'edit' &&
        postData &&
        postData.status === UNPUBLISHED &&
        screenWidth >= parseInt(sizes.laptop, 10) && (
          <ButtonWrapperWithSpaceLeftLarge>
            <Btn
              label={buttonsT('save_publish')}
              variant="solidPrimary"
              loading={loading}
              handleClick={submitsFormPublish}
              full
            />
          </ButtonWrapperWithSpaceLeftLarge>
        )}
    </ButtonsWrapper>
  );

  useEffect(() => {
    formRef.current.setData({
      title,
      description,
      tagListData,
    });
  });

  const cellSize = screenWidth >= parseInt(sizes.laptop, 10) ? 4 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 10 : 1;
  const leftSize = screenWidth >= parseInt(sizes.laptop, 10) ? 4 : 0;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '0';

  return (
    <Page
      title={postT(`${action}.video.title`)}
      description={postT(`${action}.video.description`)}
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
        <Grid columns={gridSize} gap={gapSize}>
          <Cell left={leftSize} width={cellSize}>
            <ContentWrapper className="blog-wrapper">
              <PostTitle>{postT(`${action}.video.title`)}</PostTitle>
              <div data-tut="reactour__video_page">
                <FormBlock
                  className="reqlabel"
                  label={postT('fields.video.label')}
                >
                  <FileUploadWrapper>{getVideoWrapper()}</FileUploadWrapper>
                </FormBlock>
              </div>
              <Form onSubmit={save} ref={formRef}>
                <div data-tut="reactour__video_title">
                  <FormBlockWrapper>
                    <FormBlock
                      className="reqlabel"
                      label={postT('fields.title.label')}
                    >
                      <TextInput
                        name="title"
                        placeholder={postT('fields.title.placeholder')}
                        size="medium"
                        onChange={e => handleChange(e, 'title')}
                        value=""
                        maxLength="250"
                      />
                    </FormBlock>
                  </FormBlockWrapper>
                  <FormBlockWrapper>
                    <FormBlock label={postT('fields.description.label')}>
                      <TextInput
                        name="description"
                        placeholder={postT('fields.description.placeholder')}
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
                </div>
                <FormBlockWrapper data-tut="reactour__video_hashtags">
                  <FormBlock
                    label={postT('fields.tags.label')}
                    helperText={postT('fields.tags.hint')}
                  >
                    <ButtonAddContentWrapper>
                      <TextInput
                        name="tag"
                        size="medium"
                        className="taginput"
                        onChange={e => handleChange(e, 'tag')}
                        onKeyPress={event => addInterest(event)}
                      />
                      <ButtonAddContent type="button" onClick={addTag}>
                        {tag && `${modalT('interests.add')}`}
                      </ButtonAddContent>
                    </ButtonAddContentWrapper>
                  </FormBlock>

                  <Tags>
                    <TagList list={tagListData} onRemove={removeTag} />
                  </Tags>
                </FormBlockWrapper>
              </Form>
            </ContentWrapper>
          </Cell>
        </Grid>
      </SafeArea>
    </Page>
  );
};

PostVideo.propTypes = {
  action: PropTypes.string.isRequired,
  postId: PropTypes.string,
};

PostVideo.defaultProps = {
  postId: undefined,
};

export default PostVideo;

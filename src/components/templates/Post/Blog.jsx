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

import Icon from '@components/atoms/Icon';
import Page from '@components/templates/Page';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import FileUpload from '@components/molecules/FileUpload';
import LinkBack from '@components/molecules/Link';
import PopOver from '@components/molecules/PopOver';
import { IconButton } from '@components/molecules/Button';
import { useToast } from '@components/molecules/Notification';
import TagList from '@components/molecules/TagList';
import Btn from '@components/molecules/Btn';
import { sizes } from '@assets/styles/medias';

import generateUEID, { cdn, convertToMb } from '@utils/general';
import Storage from '@utils/storage';
import errorHandle from '@src/utils/error';
import { PUBLISHED, UNPUBLISHED } from '@modules/consts';

import { Hint } from '@components/molecules/TextInput/style';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import NdEditor from '@components/organisms/NdEditor';
import Brand from '@components/atoms/Brand';
import Link from 'next/link';

import {
  VideoWrapper,
  ButtonsWrapper,
  ButtonWrapper,
  ButtonWrapperWithSpace,
  ButtonWrapperWithSpaceLarge,
  FileUploadWrapper,
  VideoIconsWrapper,
  FormBlockWrapper,
  PostTitle,
  Cover,
  ContentEdition,
  ContentEditionTitle,
  ContentEditionDesc,
  ContentEditionClose,
  ButtonWrapperWithSpaceLeftLarge,
  PopOverWrapper,
  ButtonAddContent,
  ButtonAddContentWrapper,
  Tags,
  MockEditor,
  GridWrapper,
} from './style';

const PostBlog = ({ action, postId }) => {
  const { state: appState, dispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

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
    accept: 'image/*',
    maxFiles: 1,
    maxSize: convertToMb(5),
    transformations: {
      crop: {
        aspectRatio: 16 / 9,
        force: true,
      },
    },
  };

  const router = useRouter();

  let submitType = PUBLISHED;
  let editType = 'SAVE';

  const [showContentEdition, setShowContentEdition] = useState(false);

  if (process.browser) {
    useEffect(
      () =>
        setShowContentEdition(Storage.get('showed-content-edition') === 'true'),
      [window],
    );
  }
  const [bigLoading, setBigLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(null);

  const [coverUrl, setCoverUrl] = useState(null);
  const [coverData, setCoverData] = useState(null);
  const [coverLoading, setCoverLoading] = useState(false);
  const [errorCover, setErrorCover] = useState(false);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [content, setContent] = useState(null);

  const [tag, setTag] = useState(null);
  const [tagListData, setTagListData] = useState([]);
  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const [editorFocused, setEditorFocused] = useState(false);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const { t: postT } = useTranslation('post');
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: editorT } = useTranslation('text_editor');
  const { t: modalT } = useTranslation('modals');

  // Form
  const formRef = useRef(null);

  const btnNewRef = useRef(null);

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => {
    if (profileState.id) {
      setTimeout(() => {
        TourInitialize();
      }, 1000);
    }
  }, [profileState]);

  const [from, setFrom] = useState(null);
  const [idFrom, setIdFrom] = useState(null);

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

  useEffect(() => {
    if (postId) handleData();
  }, [postId]);

  useEffect(() => {
    if (router.query.from) {
      setFrom(router.query.from);
      setIdFrom(router.query.id);
    }
  }, [router.query]);

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
        setCoverUrl(postData.asset.url);
        setCoverData(postData.asset);
      }

      if (postData.text) {
        setContent(postData.text);
      }
    }

    if (action === 'create') {
      setContent({
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
      });
    }

    setTimeout(() => {
      setBigLoading(false);
    }, 700);
  }, [postData]);

  function closeContentEdition() {
    setShowContentEdition(true);
    Storage.add('showed-content-edition', 'true');
  }

  // Uploaded Success
  async function videoUploadSuccess(res) {
    const { filesUploaded } = res;
    setErrorCover(false);

    if (filesUploaded?.length) {
      setCoverLoading(true);

      const { url } = filesUploaded[0];
      const response = await AssetService.createAsset(url);
      const { data } = response;
      setCoverData(data.data);
      setCoverUrl(data.data.url);
      setCoverLoading(false);
    } else {
      setCoverData(null);
      setCoverUrl(null);
    }
  }

  const removeTag = id => setTagListData(tagListData.filter(t => t.id !== id));

  async function addTag() {
    if (tag) {
      if (tagListData.find(t => t.label === tag)) {
        formRef.current.setErrors({ tag: errorMessage('tags.duplicated') });
        return;
      }

      setTagListData([...tagListData, { id: generateUEID(), label: tag }]);
      formRef.current.setData({ tag: '' });
      setTag('');
    }
  }

  function togglePopOver() {
    setPopOverVisibility(!popOverVisibility);
  }

  function clearFileUpload() {
    setCoverData(null);
    setCoverUrl(null);
    setErrorCover(false);
  }

  function submitsForm() {
    submitType = PUBLISHED;
    formRef.current.submitForm();
  }

  function submitsFormDraft() {
    submitType = UNPUBLISHED;
    formRef.current.submitForm();
  }

  function submitsFormPublish() {
    editType = 'SAVE_PUBLISH';
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

      if (profileId && coverData) {
        const { id } = coverData;

        const response = await PortfolioService.create(profileId, {
          title: data.title,
          description: data.description,
          tags: tagListData.map(tab => tab.label.toString()),
          status,
          type: 'blog',
          assetId: id,
          text: data.content,
        });

        if (response) {
          const isUnpublish = submitType === UNPUBLISHED;

          if (from && idFrom) {
            const url = `/${from}/edit/step-3?id=${idFrom}${
              !isUnpublish ? `&created=${response.data.data.id}` : ''
            }`;
            router.push(url);
          } else {
            router.push('/library');
            showSuccess(
              postT(
                `success.create.${
                  submitType === PUBLISHED || submitType === 'SAVE_PUBLISH'
                    ? 'published'
                    : 'draft'
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

      if (postId && coverData) {
        const { id } = coverData;

        const response = await PortfolioService.edit(postId, {
          title: data.title,
          description: data.description,
          tags: tagListData.map(tab => tab.label.toString()),
          status: editType === 'SAVE' ? postData.status : PUBLISHED,
          type: 'blog',
          assetId: id,
          text: data.content,
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
      event.preventDefault();
      addTag();
    }
  }

  async function save(params) {
    const data = {
      ...params,
      content,
    };

    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      setErrorCover(false);

      if (!coverData) {
        setErrorCover(true);
      }

      const schema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string(),
        content: Yup.object().required(),
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

  function getVideWrapper() {
    if (!profileState.id) return null;

    if (appState.eportfolio_tour.isOpened === true) {
      return (
        <VideoWrapper>
          <VideoIconsWrapper>
            <IconButton
              handleClick={clearFileUpload}
              colorSchema="secondary"
              icon="delete_solid"
            />
          </VideoIconsWrapper>
          <Cover src={cdn('/static/img/mock_blog.jpeg')} alt="cover image" />
        </VideoWrapper>
      );
    }

    if (coverData) {
      return (
        <VideoWrapper>
          <VideoIconsWrapper>
            <IconButton
              handleClick={clearFileUpload}
              colorSchema="secondary"
              icon="delete_solid"
            />
          </VideoIconsWrapper>
          <Cover src={coverUrl} alt="cover image" />
        </VideoWrapper>
      );
    }

    return (
      <>
        <FileUpload
          options={uploadOptions}
          description={postT('create.blog.upload_description')}
          onSuccess={videoUploadSuccess}
          loading={coverLoading}
          error={errorCover}
        />
        {errorCover && <Hint error>{errorMessage('cover.required')}</Hint>}
      </>
    );
  }

  function getEditorWrapper() {
    if (!profileState.id) return null;

    if (!appState.eportfolio_tour.isOpened) return null;

    return (
      <>
        <MockEditor data-tut="reactour__fun_part" className="mock-text-wrapper">
          <span>Click here to start typing in the editor...</span>
        </MockEditor>

        <div
          className="mock-editor-wrapper"
          data-tut="reactour__editor_highlight"
        >
          <NdEditor
            onChange={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
            content={{
              blocks: [
                {
                  key: 'mock_tour',
                  text:
                    'Starting my new Sizigi’s blog post by sharing my experiences.',
                  type: 'unstyled',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
              ],
              entityMap: {},
            }}
          />
        </div>
      </>
    );
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
          label={buttonsT('cancel')}
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
        <div data-tut="reactour__end_publish">
          <ButtonWrapper>
            <Btn
              label={buttonsT(action === 'create' ? 'publish' : 'save')}
              type="button"
              variant="solidPrimary"
              loading={loading}
              handleClick={submitsForm}
              full
            />
          </ButtonWrapper>
        </div>
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
              className="mobile-publish-highlight"
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
            />
          </ButtonWrapperWithSpaceLeftLarge>
        )}
    </ButtonsWrapper>
  );

  useEffect(() => {
    formRef.current.setData({
      title,
      description,
      content,
      tagListData,
    });
  });

  const cellSize = screenWidth >= parseInt(sizes.laptop, 10) ? 4 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 10 : 1;
  const leftSize = screenWidth >= parseInt(sizes.laptop, 10) ? 4 : 0;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '0';

  return (
    <Page
      title={postT(`${action}.blog.title`)}
      description={postT(`${action}.blog.description`)}
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
        <Form onSubmit={save} ref={formRef}>
          <GridWrapper>
            <Grid columns={gridSize} gap={gapSize}>
              <Cell left={leftSize} width={cellSize}>
                <ContentWrapper className="blog-wrapper">
                  <PostTitle>{postT(`${action}.blog.title`)}</PostTitle>
                  <div data-tut="reactour__cover_image">
                    <FormBlock
                      className="reqlabel"
                      label={postT('fields.cover.label')}
                    >
                      <FileUploadWrapper>{getVideWrapper()}</FileUploadWrapper>
                    </FormBlock>
                  </div>
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
                        className="editBlogDec"
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

                  <FormBlockWrapper>
                    <FormBlock
                      label={postT('fields.tags.label')}
                      helperText={postT('fields.tags.hint')}
                    >
                      <ButtonAddContentWrapper>
                        <TextInput
                          name="tag"
                          size="medium"
                          onChange={e => handleChange(e, 'tag')}
                          className="taginput"
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
                </ContentWrapper>
              </Cell>
            </Grid>
            <Grid columns={gridSize} gap={gapSize}>
              <Cell left={leftSize} width={cellSize}>
                {!showContentEdition && (
                  <ContentEdition>
                    <div>
                      <ContentEditionTitle>
                        {editorT('title')}
                      </ContentEditionTitle>
                      <ContentEditionDesc>
                        {editorT('resume')}
                      </ContentEditionDesc>
                    </div>
                    <ContentEditionClose onClick={closeContentEdition}>
                      <Icon name="close" />
                    </ContentEditionClose>
                  </ContentEdition>
                )}

                {appState.eportfolio_tour.isOpened && (
                  <div data-tut="reactour__highlight">
                    <FormBlockWrapper className="editor-focus-active reactour-fun-part">
                      {getEditorWrapper()}
                    </FormBlockWrapper>
                  </div>
                )}

                {content && !appState.eportfolio_tour.isOpened && (
                  <div className="editBlogWrap">
                    <FormBlockWrapper
                      className={editorFocused && 'editor-focus-active'}
                    >
                      <NdEditor
                        onChange={e => setContent(e)}
                        onFocus={() => setEditorFocused(true)}
                        onBlur={() => setEditorFocused(false)}
                        content={content}
                      />
                    </FormBlockWrapper>
                  </div>
                )}
              </Cell>
            </Grid>
          </GridWrapper>
        </Form>
      </SafeArea>
    </Page>
  );
};

PostBlog.propTypes = {
  action: PropTypes.string.isRequired,
  postId: PropTypes.string,
};

PostBlog.defaultProps = {
  postId: undefined,
};

export default PostBlog;

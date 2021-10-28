import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';

import { Form } from '@unform/web';
import cookie from 'js-cookie';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import { IconButton } from '@components/molecules/Button';

import AssetService from '@api/services/asset';
import PortfolioService from '@api/services/portfolio';
import ProfileContext from '@context/profileContext';
import DropArea from '@components/atoms/DropArea';

import IconSVG from '@components/atoms/IconSVG';
import Page from '@components/templates/Page';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import FormBlock from '@components/organisms/FormBlock';
import LinkBack from '@components/molecules/Link';
import PopOver from '@components/molecules/PopOver';
import TextInput from '@components/molecules/TextInput';
import PreviewPDF from '@components/templates/Modals/PreviewPDF';
import { useToast, Action } from '@components/molecules/Notification';
import TagList from '@components/molecules/TagList';
import { sizes } from '@assets/styles/medias';

import generateUEID, { convertToMb } from '@utils/general';
import errorHandle from '@src/utils/error';
import { PUBLISHED, UNPUBLISHED } from '@modules/consts';
import Brand from '@components/atoms/Brand';
import Link from 'next/link';
import AppContext from '@context/appContext';

import Loader from '@components/atoms/Loader';
import ThumbUploadAndPreview from '@components/organisms/ThumbUploadAndPreview';

import { Hint } from '@components/molecules/TextInput/style';
import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import Btn from '@components/molecules/Btn';
import { DropAreaContainer, DocumentWrapper } from '../Editables/style';

import {
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
  VideoWrapper,
  Cover,
  ButtonAddContent,
  ButtonAddContentWrapper,
  Tags,
  IconDeleteButton,
} from './style';

const ReactFilestack = loadable(() => import('filestack-react'), {
  ssr: false,
});

const PostDocument = ({ action, postId }) => {
  const { dispatch: profileDispatch } = useContext(ProfileContext);
  const { dispatch: appDispatch } = useContext(AppContext);

  let submitType = PUBLISHED;
  let editType = 'SAVE';

  const router = useRouter();

  const [FSKey, setFSKey] = useState(null);
  const [FSPolicy, setFSPolicy] = useState(null);
  const [FSSignature, setFSSignature] = useState(null);
  const [FSPath, setFSPath] = useState(null);

  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(null);
  const [loadingUploadFile, setLoadingUploadFile] = useState(false);

  const [bigLoading, setBigLoading] = useState(true);
  const [errorDocument, setErrorDocument] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [coverData, setCoverData] = useState(null);

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

  const [from, setFrom] = useState(null);
  const [idFrom, setIdFrom] = useState(null);

  async function handleData() {
    const response = await PortfolioService.getById(postId);
    const { data } = response.data;
    setCoverImage(data.asset.path.thumbnail);
    setCoverData(data.asset);
    setPostData(data);
  }

  const [screenWidth, setScreenWidth] = useState(null);

  if (process.browser) {
    useEffect(() => setScreenWidth(document.children[0].clientWidth), [
      document.children[0].clientWidth,
    ]);
  }

  const [actionVisibility, setActionVisibility] = useState(false);

  function toggleModalFileDownload() {
    setActionVisibility(true);
  }

  function downloadFile() {
    window.open(coverData.url);
    setActionVisibility(false);
  }

  // eslint-disable-next-line no-unused-vars
  function previewDocument(path) {
    if (coverData.subtype === 'csv') {
      return toggleModalFileDownload();
    }
    return appDispatch({
      type: 'SET_MODAL_OPENED',
      component: PreviewPDF,
      props: { path, fullScreen: true },
    });
  }

  useEffect(() => {
    if (postId) handleData();
    setTimeout(() => {
      setBigLoading(false);
    }, 700);
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
      setCoverImage(postData.asset.path.thumbnail);
      setCoverData(postData.asset);
    }
  }, [postData]);

  const assetAuthData = async () => {
    const { data } = await AssetService.getAuth();
    const { key, policy, signature, path } = data.data.params;

    setFSKey(key);
    setFSPolicy(policy);
    setFSSignature(signature);
    setFSPath(path);
  };

  useEffect(() => {
    assetAuthData();
  }, []);

  // Form
  const formRef = useRef(null);

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
    setCoverImage(null);
    setCoverData(null);
    setErrorDocument(false);
    profileDispatch({
      type: 'SET_DOCUMENT',
      document: null,
    });
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
    setLoading(true);
    try {
      // Validation passed
      const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);

      if (profileId && coverData) {
        const { id } = coverData;

        if (postData.thumbHandle)
          await AssetService.setAssetThumbnail(
            id,
            postData.thumbHandle,
            postData.thumbId,
          );
        const response = await PortfolioService.create(profileId, {
          title: data.title,
          description: data.description,
          tags: tagListData.map(tab => tab.label.toString()),
          status,
          type: 'document',
          assetId: id,
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
                  submitType === PUBLISHED ? 'published' : 'draft'
                }`,
              ),
            );
          }
        }
      }
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setLoading(false);
    }
  }

  async function edit(data) {
    try {
      setLoading(true);
      if (postId && postData && coverData) {
        const { id } = coverData;

        if (postData.thumbHandle)
          await AssetService.setAssetThumbnail(
            id,
            postData.thumbHandle,
            postData.thumbId,
          );
        const response = await PortfolioService.edit(postId, {
          title: data.title,
          description: data.description,
          tags: tagListData.map(tab => tab.label.toString()),
          status: editType === 'SAVE' ? postData.status : PUBLISHED,
          type: 'document',
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

  const saveDocument = async fileData => {
    const { filesUploaded, filesFailed } = fileData;
    setLoadingUploadFile(true);
    setErrorDocument(false);

    try {
      if (filesUploaded?.length) {
        const { url } = filesUploaded[0];
        const response = await AssetService.createAsset(url);
        const { data } = response;

        setCoverImage(data.data.path.thumbnail);
        setCoverData(data.data);
        showSuccess('Your file was uploaded successfully');

        profileDispatch({
          type: 'SET_DOCUMENT',
          document: data.data,
        });
      } else if (filesFailed?.length) {
        const [{ filename }] = filesFailed;
        showError(`Your file ${filename} upload was failed`);
      } else {
        setCoverData(null);
      }
    } catch (err) {
      showError(errorHandle(err));
    } finally {
      setLoadingUploadFile(false);
    }
  };

  async function addInterest(event) {
    if (event.charCode === 13 || event.key === 'Enter') {
      addTag();
    }
  }

  async function save(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      setErrorDocument(false);

      if (!coverData) {
        setErrorDocument(true);
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

  function preview() {
    const { path, subtype } = coverData;

    if (subtype === 'csv') {
      return toggleModalFileDownload();
    }
    // if (filename.includes('doc') || filename.includes('docx')) { }
    // return previewDocument(path.preview);

    return window.open(path.preview);
  }

  const options = {
    accept: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.csv', 'image/*'],
    maxSize: convertToMb(10),
    storeTo: {
      path: FSPath,
    },
    onOpen: () => {
      appDispatch({ type: 'HIDE_TOUR' });
    },
    onClose: () => {
      goToNextStepAndShow(appDispatch);
    },
    onCancel: () => {
      goToNextStepAndShow(appDispatch);
    },
  };

  function getDocumentWrapper() {
    if (coverData) {
      return (
        <DocumentWrapper
          loading={loadingUploadFile ? 1 : 0}
          heightAuto
          overlay
          // onClick={preview}
        >
          {loadingUploadFile ? (
            <Loader size="medium" theme="dark" />
          ) : (
            <VideoWrapper isDocument>
              <VideoIconsWrapper>
                <IconButton
                  handleClick={clearFileUpload}
                  colorSchema="secondary"
                  icon="delete_solid"
                />
                {/* <IconDeleteButton handleClick={clearFileUpload}>
                  <IconSVG name="trash" />
                </IconDeleteButton> */}
              </VideoIconsWrapper>
              <VideoIconsWrapper viewDocument>
                <Btn
                  variant="grey"
                  handleClick={preview}
                  label={buttonsT('click_view')}
                  full
                />
              </VideoIconsWrapper>
              <Cover src={coverImage} alt="cover image" />
            </VideoWrapper>
          )}
        </DocumentWrapper>
      );
    }

    return (
      <>
        {FSKey && FSPolicy && FSSignature ? (
          <ReactFilestack
            apikey={FSKey}
            clientOptions={{
              security: {
                policy: FSPolicy,
                signature: FSSignature,
              },
            }}
            actionOptions={options}
            componentDisplayMode={{
              type: 'immediate',
            }}
            customRender={({ onPick }) => (
              <DropArea
                onPick={onPick}
                description="Accepts all major image and document file types"
                maxSize={options.maxSize}
                loading={loadingUploadFile}
                colorSchema="secondary"
                error={errorDocument}
              />
            )}
            onSuccess={saveDocument}
          />
        ) : (
          <DropAreaContainer type="button">
            <Loader size="medium" theme="dark" />
          </DropAreaContainer>
        )}
        {errorDocument && (
          <Hint error>{errorMessage('document.required')}</Hint>
        )}
      </>
    );
  }

  const popOverItems = [
    { label: buttonsT('publish'), onClick: submitsForm },
    { label: buttonsT('save_draft'), onClick: submitsFormDraft },
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
      title={postT(`${action}.doc.title`)}
      description={postT(`${action}.doc.description`)}
      pageLoader={bigLoading}
      className="blog-navbar"
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
            title={postT('download_action.title')}
            description={postT('download_action.description')}
            onCancel={() => setActionVisibility(false)}
            onConfirm={() => downloadFile()}
          />
        )}
        <Grid columns={gridSize} gap={gapSize}>
          <Cell left={leftSize} width={cellSize}>
            <ContentWrapper className="blog-wrapper">
              <PostTitle>{postT(`${action}.doc.title`)}</PostTitle>
              <FormBlock
                className="reqlabel"
                label={postT('fields.document.label')}
              >
                <FileUploadWrapper>{getDocumentWrapper()}</FileUploadWrapper>
              </FormBlock>
              {coverData && (
                <FormBlockWrapper>
                  <ThumbUploadAndPreview
                    contentData={postData}
                    onChange={setPostData}
                    type="document"
                    generatedThumb={{ url: coverImage, id: 'generatedThumb' }}
                  />
                </FormBlockWrapper>
              )}
              <Form onSubmit={save} ref={formRef}>
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
                <FormBlockWrapper>
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

PostDocument.propTypes = {
  action: PropTypes.string.isRequired,
  postId: PropTypes.string,
};

PostDocument.defaultProps = {
  postId: undefined,
};

export default PostDocument;

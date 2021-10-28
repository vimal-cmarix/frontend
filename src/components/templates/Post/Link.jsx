import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';

import { Form } from '@unform/web';
import cookie from 'js-cookie';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import PortfolioService from '@api/services/portfolio';
import { PUBLISHED, UNPUBLISHED } from '@modules/consts';

import generateUEID from '@utils/general';
import Noembed from '@components/atoms/Noembed';
import Page from '@components/templates/Page';
import FormBlock from '@components/organisms/FormBlock';
import LinkBack from '@components/molecules/Link';
import PopOver from '@components/molecules/PopOver';
import TextInput from '@components/molecules/TextInput';
import { useToast } from '@components/molecules/Notification';
import TagList from '@components/molecules/TagList';
import { sizes } from '@assets/styles/medias';
import Brand from '@components/atoms/Brand';
import Link from 'next/link';
import ThumbUploadAndPreview from '@components/organisms/ThumbUploadAndPreview';

import errorHandle from '@src/utils/error';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import Btn from '@components/molecules/Btn';
import {
  ButtonsWrapper,
  ButtonWrapper,
  ButtonWrapperWithSpaceLeftLarge,
  ButtonWrapperWithSpaceLarge,
  ButtonWrapperWithSpace,
  FormBlockWrapper,
  PostTitle,
  PopOverWrapper,
  ButtonAddContent,
  ButtonAddContentWrapper,
  Tags,
} from './style';

const PostLink = ({ action, postId }) => {
  const { state: appState } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [linkData, setLinkData] = useState(null);
  const [postData, setPostData] = useState({});

  const [bigLoading, setBigLoading] = useState(true);
  const [link, setLink] = useState(null);
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

  let submitType = PUBLISHED;
  let editType = 'SAVE';

  const btnNewRef = useRef(null);

  const [popOverVisibility, setPopOverVisibility] = useState(false);

  const [from, setFrom] = useState(null);
  const [idFrom, setIdFrom] = useState(null);

  // Refs
  const formRef = useRef(null);

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

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
    if (linkData && linkData.title && (title === '' || title === null))
      setTitle(linkData.title.trim());
  }, [linkData]);

  useEffect(() => {
    if (postData && postData.id) {
      setTitle(postData.title);
      setDescription(postData.description);
      const tagData = postData.tags.map(tagItem => ({
        id: generateUEID(),
        label: tagItem,
      }));
      setTagListData(tagData);

      if (postData.link) setLink(postData.link.url);
    }

    setTimeout(() => {
      setBigLoading(false);
    }, 700);
  }, [postData]);

  useEffect(() => {
    formRef.current.setErrors({});

    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);

    if (link && !link.match(regex)) {
      formRef.current.setErrors({
        link: errorMessage(`link.invalid`),
      });
    } else {
      formRef.current.setErrors({});
    }
  }, [link]);

  useEffect(() => {
    if (router.query.from) {
      setFrom(router.query.from);
      setIdFrom(router.query.id);
    }
  }, [router.query]);

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

      if (profileId) {
        const response = await PortfolioService.create(profileId, {
          title: data.title,
          description: data.description,
          tags: tagListData.map(tab => tab.label.toString()),
          status,
          type: 'link',
          link: {
            url: data.link,
            imageUrl: linkData ? linkData.images : null,
          },
          assetId:
            postData.thumbId !== 'generatedThumb'
              ? postData.thumbId
              : undefined,
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
      if (postId) {
        const { images } = linkData;

        const response = await PortfolioService.edit(postId, {
          title: data.title,
          description: data.description,
          tags: tagListData.map(tab => tab.label.toString()),
          status: editType === 'SAVE' ? postData.status : PUBLISHED,
          type: 'link',
          link: {
            url: data.link,
            imageUrl: images || null,
          },
          assetId:
            postData.thumbId !== 'generatedThumb'
              ? postData.thumbId
              : undefined,
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

      const schema = Yup.object().shape({
        link: Yup.string().required(),
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

  function handleChange(e, type) {
    const ChangeValue = e.target.value;
    console.log('event', ChangeValue);
    console.log('title', title);
    if (ChangeValue && ChangeValue.trim() !== '') {
      if (type === 'title') {
        setTitle(ChangeValue);
      } else if (type === 'link') {
        setLink(ChangeValue);
      } else if (type === 'description') {
        setDescription(ChangeValue);
      } else if (type === 'tag') {
        setTag(ChangeValue);
      }
    } else {
      e.target.value = '';
    }
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
        <ButtonWrapper>
          <Btn
            label={buttonsT(action === 'create' ? 'publish' : 'save')}
            type="button"
            variant="solidPrimary"
            loading={loading}
            handleClick={submitsForm}
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
      link,
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
      title={postT('create.link.title')}
      description={postT('create.link.description')}
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
              <PostTitle>{postT('create.link.title')}</PostTitle>
              <Form onSubmit={save} ref={formRef}>
                <FormBlockWrapper>
                  <FormBlock
                    className="reqlabel"
                    label={postT('fields.link.label')}
                  >
                    <>
                      <TextInput
                        name="link"
                        placeholder={postT('fields.link.placeholder')}
                        size="medium"
                        onChange={e => handleChange(e, 'link')}
                        value=""
                        maxLength="250"
                      />
                    </>
                  </FormBlock>
                </FormBlockWrapper>
                <FormBlockWrapper>
                  <Noembed
                    url={link || null}
                    setData={setLinkData}
                    style={{ marginTop: '32px' }}
                  />
                </FormBlockWrapper>
                {linkData && (
                  <FormBlockWrapper>
                    <ThumbUploadAndPreview
                      contentData={postData}
                      onChange={d => setPostData(d)}
                      type="link"
                      generatedThumb={{
                        url: linkData.images,
                        id: 'generatedThumb',
                      }}
                    />
                  </FormBlockWrapper>
                )}
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

PostLink.propTypes = {
  action: PropTypes.string.isRequired,
  postId: PropTypes.string,
};

PostLink.defaultProps = {
  postId: undefined,
};

export default PostLink;

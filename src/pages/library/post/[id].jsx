import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';

import PortfolioService from '@api/services/portfolio';

import Page from '@components/templates/Page';
import Video from '@components/molecules/Video';
import Tag from '@components/atoms/Tag';
import Loader from '@components/atoms/Loader';
import NdEditor from '@components/organisms/NdEditor';

import { sizes } from '@assets/styles/medias';
import { useToast, Action } from '@components/molecules/Notification';
import { Button } from '@components/molecules/Button';
import errorHandle from '@src/utils/error';
import { withAuthSync } from '@src/utils/auth';
import { formatDate, serverRedirect } from '@src/utils/general';
import getThumbPortfolio from '@src/utils/portfolio';
import Noembed from '@components/atoms/Noembed';
import { UNPUBLISHED } from '@modules/consts';
import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import PreviewPDF from '@components/templates/Modals/PreviewPDF';
import Btn from '@components/molecules/Btn';

import PortfolioLinkModal from '@components/templates/Modals/PortfolioLink';
import cookie from 'js-cookie';
import ShareService from '@api/services/share';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';

import BtnGroup from '@components/organisms/BtnGroup';
import {
  VideoWrapper,
  PostTitle,
  PostDescription,
  PostDate,
  PostTags,
  LoaderWrapper,
  Cover,
  Image,
  ExternalLink,
  TopContainer,
  EmbeedWrapper,
  WrapperPdfButton,
  VideoIconsWrapper,
  DateUpdate,
  Dot,
} from './style';

const ShowPost = ({ isPrivateLink, signUpBar }) => {
  const router = useRouter();
  const { id } = router.query;
  const { t: monthsT } = useTranslation('months');
  const { t: dateFormatesT } = useTranslation('dateFormates');
  const { t: postT } = useTranslation('post');
  const { t: buttonsT } = useTranslation('buttons');
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const [postData, setDataPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [screenWidth, setScreenWidth] = useState(null);

  const [profileId] = useState(
    cookie.get(`${process.env.PROJECT_NAME}-profileId`),
  );
  const [privateData, setPrivateData] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  async function getPrivateLink() {
    if (profileId) {
      try {
        const privateResponse = await ShareService.createShare(profileId);
        const { data: privData } = privateResponse.data;
        setPrivateData(privData);
      } catch (error) {
        showToast(errorHandle(error));
      }
    }
  }

  const fecthData = async () => {
    try {
      setLoading(true);
      let accessToken = null;
      if (isPrivateLink) {
        accessToken = profileState.accessToken;
      }
      const response = await PortfolioService.getById(id, accessToken);
      setDataPost(response.data.data);

      getPrivateLink();
      setLoading(false);
    } catch (e) {
      showToast(errorHandle(e));
    }
  };

  useEffect(() => {
    if (isPrivateLink) {
      if (profileState && profileState.accessToken) fecthData();
      else {
        Router.back();
      }
    }
    fecthData();
  }, []);

  const isDraft = postData.status === UNPUBLISHED;

  function goToEdit() {
    const { type } = postData;
    Router.push(
      `/library/post/edit/${type === 'media' ? 'video' : type}/${id}`,
    );
  }

  async function publishDraft() {
    if (postData.status !== UNPUBLISHED) return;
    setBtnLoading(true);
    try {
      const response = await PortfolioService.publish(id);
      if (response.status === 200) {
        toast.add(postT('success.publish.draft'), 'success');
        Router.push('/library');
      }
    } catch (e) {
      showToast(errorHandle(e));
    }
    setBtnLoading(false);
  }

  // eslint-disable-next-line no-unused-vars
  function previewDocument(path) {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: PreviewPDF,
      props: { path, fullScreen: true },
    });
  }

  function onShare() {
    const newData = postData;
    newData.description = postData.description || postData.defaultDescription;
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: PortfolioLinkModal,
      props: {
        data: newData,
        privateData: profileState.share || privateData,
        showClose: true,
      },
    });
  }

  const ButtonsAction = () => {
    if (isDraft) {
      return (
        <BtnGroup>
          <Btn
            variant="outlinePrimary"
            label={buttonsT('edit')}
            type="button"
            handleClick={goToEdit}
            loading={btnLoading}
          />
          <Btn
            variant="solidPrimary"
            label={buttonsT('publish')}
            type="button"
            handleClick={publishDraft}
            loading={btnLoading}
          />
        </BtnGroup>
      );
    }

    return (
      <BtnGroup>
        <Btn
          variant="outlinePrimary"
          label={buttonsT('share')}
          type="button"
          handleClick={onShare}
          loading={btnLoading}
          startIcon="share"
        />
        <Btn
          variant="solidPrimary"
          label={buttonsT('edit')}
          type="button"
          handleClick={goToEdit}
          loading={btnLoading}
        />
      </BtnGroup>
    );
  };

  const [actionVisibility, setActionVisibility] = useState(false);

  function toggleModalFileDownload() {
    setActionVisibility(true);
  }

  function downloadFile() {
    window.open(postData.asset.url);
    setActionVisibility(false);
  }

  function preview() {
    const { subtype, path } = postData.asset;

    if (subtype === 'csv') {
      return toggleModalFileDownload();
    }
    // return previewDocument(path.preview);
    // if (filename.includes('doc') || filename.includes('docx')) { }

    return window.open(path.preview);
  }

  const cellSize = screenWidth >= parseInt(sizes.laptop, 10) ? 4 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 10 : 1;
  const leftSize = screenWidth >= parseInt(sizes.laptop, 10) ? 4 : 0;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '0';

  const customProps = isPrivateLink
    ? {
        loadProfile: false,
        nav: {
          show: true,
          component: [],
        },
        className: 'view-profile',
        topbar: {
          show: true,
        },
      }
    : {};

  return (
    <Page
      title={postData.title || postT('title')}
      description={postData.description || postT('description')}
      {...customProps}
      isVerified
      signUp={signUpBar}
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
        <ContentWrapper className="post-wrapper">
          <Grid columns={gridSize} gap={gapSize}>
            <Cell left={leftSize} width={cellSize}>
              {loading ? (
                <LoaderWrapper>
                  <Loader size="large" />
                </LoaderWrapper>
              ) : (
                <>
                  <TopContainer>
                    <Btn
                      startIcon="leftArrow"
                      iconSize={12}
                      label={postT('back')}
                      handleClick={() => router.back()}
                    />
                    {!isPrivateLink && <ButtonsAction />}
                  </TopContainer>
                  {postData.type === 'media' && (
                    <VideoWrapper>
                      <Video
                        data={postData && postData.asset}
                        thumb={getThumbPortfolio(postData)}
                        className="full-width"
                      >
                        <source src={postData.asset && postData.asset.url} />
                        <span>{postT('video_support')}</span>
                      </Video>
                    </VideoWrapper>
                  )}
                  {postData.type === 'blog' && (
                    <Cover
                      size={
                        screenWidth >= parseInt(sizes.laptop, 10)
                          ? cellSize / gridSize
                          : gridSize
                      }
                    >
                      <Image
                        src={postData.asset && postData.asset.url}
                        alt="Cover"
                      />
                    </Cover>
                  )}
                  {postData.type === 'document' && (
                    <Cover
                      size={
                        screenWidth >= parseInt(sizes.laptop, 10)
                          ? cellSize / gridSize
                          : gridSize
                      }
                    >
                      {postData.asset.type === 'image' ? (
                        <WrapperPdfButton overlay>
                          <Image
                            src={postData.asset.path.thumbnail}
                            alt={postData.type}
                          />
                          <VideoIconsWrapper viewDocument>
                            <Button
                              colorSchema="secondary"
                              handleClick={preview}
                              label={buttonsT('click_view')}
                              size="medium"
                            />
                          </VideoIconsWrapper>
                        </WrapperPdfButton>
                      ) : (
                        <WrapperPdfButton overlay>
                          <VideoIconsWrapper viewDocument>
                            <Button
                              colorSchema="secondary"
                              handleClick={preview}
                              label={buttonsT('click_view')}
                              size="medium"
                            />
                          </VideoIconsWrapper>
                          {/* eslint-disable-next-line react/jsx-no-target-blank */}
                          <a href={postData.asset.path.preview} target="_blank">
                            <Image
                              src={postData.asset.path.thumbnail}
                              alt={postData.type}
                            />
                          </a>
                        </WrapperPdfButton>
                      )}
                    </Cover>
                  )}
                  <PostTitle>{postData.title}</PostTitle>
                  <PostDescription>{postData.description}</PostDescription>
                  <PostDate>
                    {`Created on ${formatDate(
                      postData.createdAt,
                      monthsT,
                      dateFormatesT('simple'),
                    )}`}
                    {postData.createdAt !== postData.updatedAt && (
                      <>
                        <Dot />
                        <DateUpdate>
                          {`Updated on ${formatDate(
                            postData.updatedAt,
                            monthsT,
                            dateFormatesT('simple'),
                          )}`}
                        </DateUpdate>
                      </>
                    )}
                  </PostDate>

                  <PostTags>
                    {postData.tags !== null &&
                      postData.tags?.length > 0 &&
                      postData.tags.map(tab => <Tag label={tab} />)}
                  </PostTags>

                  {postData.type === 'blog' && (
                    <NdEditor
                      onChange={() => {}}
                      content={postData.text}
                      readOnly
                    />
                  )}
                  {postData.type === 'link' && (
                    <>
                      <EmbeedWrapper>
                        <Noembed
                          url={postData.link.url}
                          accessToken={
                            profileState.accessToken
                              ? profileState.accessToken
                              : null
                          }
                        />
                      </EmbeedWrapper>
                      <ExternalLink href={postData.link.url} target="_blank">
                        {postData.link.url}
                      </ExternalLink>
                    </>
                  )}
                </>
              )}
            </Cell>
          </Grid>
        </ContentWrapper>
      </SafeArea>
    </Page>
  );
};

ShowPost.propTypes = {
  isPrivateLink: PropTypes.bool,
};

ShowPost.defaultProps = {
  isPrivateLink: false,
};

ShowPost.getInitialProps = async ctx => {
  const { query } = ctx;
  const { id } = query;

  if (!id) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/library');
    } else {
      Router.push('/library');
    }
  }

  return {};
};

export default withAuthSync(ShowPost);

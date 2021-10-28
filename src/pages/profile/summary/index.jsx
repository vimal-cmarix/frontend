import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';

import Page from '@components/templates/Page';
import Video from '@components/molecules/Video';
import { sizes } from '@assets/styles/medias';
import NdEditor from '@components/organisms/NdEditor';
import Noembed from '@components/atoms/Noembed';

import { intlFormatDate } from '@utils/general';
import { withAuthSync } from '@src/utils/auth';
import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import Btn from '@components/molecules/Btn';
import BtnGroup from '@components/organisms/BtnGroup';
import { Typography } from '@assets/styles/typo';
import { VideoWrapper } from '../style';

import { FileUploadWrapper, TopContainer, VideoSummaryDivider } from './style';

const SummaryPage = ({ isPrivateLink }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [linkData, setLinkData] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState('');
  const [updatedAt, setUpdatedAt] = useState(null);
  const [content, setContent] = useState(null);

  const { t: summaryT } = useTranslation('summary_page');
  const { t: buttonsT } = useTranslation('buttons');

  // Context
  const { state: profileState } = useContext(ProfileContext);
  const { state: appState } = useContext(AppContext);

  function handleData() {
    const { summary } = profileState;

    setVideoData(summary.asset);
    setVideoUrl((summary.asset && summary.asset.mediaUrl) || null);
    setLinkData(summary.link);
  }

  function getVideWrapper() {
    if (!profileState.id) return null;

    if (videoUrl) {
      return (
        <VideoWrapper fullWidth aspectRatio16x9>
          <Video
            thumb={videoData.thumbnail}
            data={videoData}
            noRadius
            className="video-box"
          >
            <source src={videoUrl} />
            <span>{summaryT('video_support')}</span>
          </Video>
        </VideoWrapper>
      );
    }
    if (linkData) {
      return (
        <Noembed
          url={linkData.url || null}
          style={{ marginBottom: '32px' }}
          accessToken={profileState.accessToken || null}
        />
      );
    }

    if (isPrivateLink) return null;

    return '';
  }

  function fillContent(summary) {
    if (summary && summary.text) {
      const isValid = summary.text.blocks.filter(line => !!line.text);
      if (isValid?.length) setContent(summary.text);
      else setContent('');
    }
  }

  useEffect(() => {
    const { id, summary } = profileState;
    if (id) handleData();
    if (summary && summary.title) setTitle(profileState.summary.title);
    if (summary && summary.description)
      setDescription(profileState.summary.description);
    if (summary && summary.updatedAt)
      setUpdatedAt(profileState.summary.updatedAt);

    fillContent(summary);
  }, [profileState]);

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function getGridSize() {
    if (screenWidth >= parseInt(sizes.desktop, 10)) return 10;
    return 12;
  }

  function getCellSize() {
    if (screenWidth >= parseInt(sizes.desktop, 10)) return 4;
    if (screenWidth <= parseInt(sizes.tabletPortrait, 10)) return 12;
    return 6;
  }

  function getLeftValue() {
    if (screenWidth <= parseInt(sizes.tabletPortrait, 10)) return 0;
    return 4;
  }

  const gridSize = getGridSize();
  const cellSize = getCellSize();
  const leftValue = getLeftValue();

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
      title={summaryT('title')}
      description={summaryT('description')}
      {...customProps}
      isVerified
    >
      <SafeArea>
        <ContentWrapper>
          <Grid columns={gridSize} gap="24px">
            <Cell left={leftValue} width={cellSize}>
              <TopContainer>
                <BtnGroup>
                  <Btn
                    startIcon="leftArrow"
                    iconSize={12}
                    label={buttonsT('back')}
                    handleClick={() => Router.back()}
                  />
                </BtnGroup>
                <BtnGroup>
                  {!isPrivateLink && (
                    <Btn
                      label={buttonsT('edit')}
                      type="button"
                      variant="solidPrimary"
                      handleClick={() => Router.push('/profile/summary/edit')}
                    />
                  )}
                </BtnGroup>
              </TopContainer>
              <FileUploadWrapper>{getVideWrapper()}</FileUploadWrapper>
              <Typography display="block" size="headline2" color="grey29">
                {title}
              </Typography>
              <Typography display="block" size="caption" color="grey61">
                {updatedAt && intlFormatDate(Date.parse(updatedAt))}
              </Typography>
              <VideoSummaryDivider />
              <Typography size="body1" color="grey29">
                {description}
              </Typography>

              {content && (
                <NdEditor onChange={() => {}} content={content} readOnly />
              )}
            </Cell>
          </Grid>
        </ContentWrapper>
      </SafeArea>
    </Page>
  );
};

SummaryPage.propTypes = {
  isPrivateLink: PropTypes.bool,
};

SummaryPage.defaultProps = {
  isPrivateLink: false,
};

export default withAuthSync(SummaryPage);

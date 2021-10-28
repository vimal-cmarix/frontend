import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Router from 'next/router';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import Noembed from '@components/atoms/Noembed';
import Video from '@components/molecules/Video';

import IconSVG from '@components/atoms/IconSVG';

import { Typography } from '@assets/styles/typo';
import { intlFormatDate } from '@utils/general';

import ModalBody from './ModalBody';

import {
  Body,
  VideoIconsWrapper,
  VideoWrapper,
  Row,
  VideoSummaryDivider,
  VideoEditCircle,
} from './style';

/**
 * About Modal
 */
const ViewSummary = () => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);
  const { t: modalT } = useTranslation('modals');

  const { previewMode } = profileState;

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [linkData, setLinkData] = useState(null);
  const [currentTitle, setTitle] = useState('');
  const [currentDescription, setDescription] = useState('');
  const [currentDate, setDate] = useState('');
  const [summary, setSummary] = useState(false);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function handleData() {
    const {
      asset,
      text,
      title,
      description,
      link,
      updatedAt,
    } = profileState.summary;
    const isValid =
      text && text.blocks ? text.blocks.filter(line => !!line.text) : [];

    if (!isValid?.length) {
      setSummary(true);
    }

    setVideoData(asset);
    setLinkData(link);
    setTitle(title);
    setDescription(description);
    setDate(updatedAt);
  }

  const goToSummary = () => {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    Router.push('/profile/summary');
  };

  useEffect(() => {
    if (profileState.id) handleData();
  }, [profileState]);

  return (
    <ModalBody
      onCancel={closeModal}
      headerTitle={modalT('preview_summary.title')}
    >
      <Body>
        {videoData && (
          <VideoWrapper aspectRatio16x9>
            {!videoPlaying && !previewMode && (
              <VideoEditCircle onClick={goToSummary}>
                <IconSVG name="edit" size={18} />
              </VideoEditCircle>
            )}
            <Video
              data={videoData}
              thumb={(videoData && videoData.thumbnail) || ''}
              setPlaying={setVideoPlaying}
              className="video-box"
            >
              <source src={videoData && videoData.mediaUrl} />
              <span>{modalT('preview_summary.video_support')}</span>
            </Video>
          </VideoWrapper>
        )}
        {linkData && !videoData && (
          <VideoWrapper>
            {!previewMode && (
              <VideoIconsWrapper>
                <VideoEditCircle onClick={goToSummary}>
                  <IconSVG name="edit" size={18} />
                </VideoEditCircle>
              </VideoIconsWrapper>
            )}
            <Noembed
              url={linkData.url || null}
              style={{ marginBottom: '32px' }}
            />
          </VideoWrapper>
        )}
        {/* <Row>
          <Typography display="block" size="headline2" color="grey29">
            {currentTitle}
          </Typography>
          <Typography display="block" size="caption" color="grey61">
            {currentDate && intlFormatDate(Date.parse(currentDate))}
          </Typography>
          <VideoSummaryDivider />
          <Typography size="body1" color="grey29">
            {currentDescription}
          </Typography>
        </Row> */}
      </Body>
    </ModalBody>
  );
};

export default ViewSummary;

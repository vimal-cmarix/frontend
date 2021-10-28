import React, { useRef, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import Icon from '@components/atoms/Icon';
import { IMAGECOMING, IMAGESOON } from '@modules/consts';

import AppContext from '@context/appContext';
import { Container, Thumb, Overlay, PlayIconWrapper, VideoEl } from './style';

/**
 * Video is used do show any videos types
 */
const Video = ({ children, thumb, setPlaying, className, noRadius, data }) => {
  const { state: appState } = useContext(AppContext);
  const { isOpened } = appState.eportfolio_tour;
  const [videoIsRunning, setVideoIsRunning] = useState(false);
  const videoRef = useRef();
  // const name = data && data.filename.split('.');
  const filename = 'video.mp4';
  const name = filename.split('.');
  const isAVI = name && name[name?.length - 1] === 'avi';

  function handlePlayVideo() {
    if (!videoIsRunning && !isAVI && !isOpened) {
      setPlaying(true);
      setVideoIsRunning(true);
      videoRef.current.play();
    }
  }

  useEffect(() => {
    if (!appState.modal.isOpened) videoRef.current.pause();
  }, [appState.modal.isOpened]);

  return (
    <Container
      onClick={handlePlayVideo}
      className={className}
      noRadius={noRadius}
    >
      <Thumb src={isAVI ? IMAGESOON : thumb || IMAGECOMING} />

      {!isOpened && <Overlay />}

      {!isAVI && (
        <PlayIconWrapper>
          <Icon name="play_solid" />
        </PlayIconWrapper>
      )}

      <VideoEl
        controls
        ref={videoRef}
        videoIsRunning={videoIsRunning}
        onPlay={() => {
          setVideoIsRunning(true);
          setPlaying(true);
        }}
        onEnded={() => {
          setVideoIsRunning(false);
          setPlaying(false);
        }}
        onPause={() => {
          setVideoIsRunning(false);
          setPlaying(false);
        }}
      >
        {!isAVI && children}
      </VideoEl>
    </Container>
  );
};

Video.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  thumb: PropTypes.string.isRequired,
  setPlaying: PropTypes.func,
  className: PropTypes.string,
  noRadius: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.string),
};

Video.defaultProps = {
  setPlaying: () => {},
  className: '',
  noRadius: false,
  data: null,
};

export default Video;

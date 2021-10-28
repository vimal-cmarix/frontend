import React, { useRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { VideoThumbnailRendererPreview } from '@components/molecules/VideoThumbnailRenderer/style';
import Loader from '@components/atoms/Loader';
import ThumbItem from '@components/molecules/ThumbItem';

export default function VideoThumbnailRenderer({
  url,
  time,
  onReady,
  onClick,
  maxWidth,
  maxHeight,
  selected,
}) {
  const thumbRatio = useMemo(() => maxWidth / maxHeight, []);
  const canvas = useRef(null);
  const video = useRef(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  function onTimeUpdate() {
    setTimeout(() => {
      const ctx = canvas.current.getContext('2d');
      ctx.drawImage(
        video.current,
        0,
        0,
        canvas.current.width,
        canvas.current.height,
      );
      try {
        const newPreviewURL = canvas.current.toDataURL();
        setPreview(newPreviewURL);
        setLoading(false);
        onReady(newPreviewURL);
      } catch (e) {
        console.error(e);
      }
    }, 2000);
  }

  function onVideoLoaded() {
    let cw;
    let ch;
    const videoRatio = video.current.videoWidth / video.current.videoHeight;
    if (videoRatio >= thumbRatio) {
      cw = Math.min(maxWidth, video.current.videoWidth);
      ch = cw / videoRatio;
    } else {
      ch = Math.min(maxHeight, video.current.videoHeight);
      cw = ch * videoRatio;
    }
    canvas.current.width = cw;
    canvas.current.height = ch;
    video.current.currentTime = time * video.current.duration;
  }

  useEffect(() => {
    if (video && video.current) {
      video.current.addEventListener('loadedmetadata', onVideoLoaded);
      video.current.addEventListener('timeupdate', onTimeUpdate);
    }
    return () => {
      if (video && video.current) {
        video.current.removeEventListener('loadedmetadata', onVideoLoaded);
        video.current.removeEventListener('timeupdate', onTimeUpdate);
      }
    };
  }, [video, canvas, url]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={video}
        style={{ display: 'none', margin: '30px' }}
        height={112.5}
        preload="metadata"
        crossOrigin="anonymous"
        src={url}
      />
      <canvas ref={canvas} style={{ display: 'none' }} />
      <ThumbItem
        imageUrl={preview}
        onClick={() => !loading && onClick(preview)}
        checked={!loading && selected}
      >
        {loading && <Loader size="medium" />}
      </ThumbItem>
    </>
  );
}

VideoThumbnailRenderer.propTypes = {
  url: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  onReady: PropTypes.func,
  onClick: PropTypes.func,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  selected: PropTypes.bool,
};

VideoThumbnailRenderer.defaultProps = {
  maxWidth: 1920,
  maxHeight: 1080,
  selected: false,
  onReady: () => null,
  onClick: () => null,
};

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import AssetService from '@api/services/asset';
import { sizes } from '@assets/styles/medias';

import { URLEmbeded, Wrapper, Container, LoaderWrapper } from './style';
import Loader from '../Loader';

const Noembed = ({ url, setLoading, setData, style, accessToken }) => {
  const ref = useRef(null);
  const [loading, setLoadingInt] = useState(false);
  const [html, setHtml] = useState(null);
  const [urlData, setUrlData] = useState(null);
  const [width, setWidth] = useState(0);
  const [timer, setTimer] = useState(null);

  function createNoembedMarkup() {
    return { __html: html };
  }

  async function loadData() {
    try {
      setLoading(true);
      setLoadingInt(true);
      let screenPart = 0;
      // const height = parseInt((width * 9) / 16, 10);
      if (width === 0) {
        const screenWidth = window.innerWidth;
        const cellSize = screenWidth >= parseInt(sizes.desktop, 10) ? 4 : 6;
        const gridSize = screenWidth >= parseInt(sizes.desktop, 10) ? 10 : 12;
        screenPart = parseInt(screenWidth * (cellSize / gridSize), 10);
      }
      const response = await AssetService.parserLink({
        url: url.trim(),
        width: width > 0 ? width : screenPart,
        accessToken,
      });

      setLoading(false);
      setLoadingInt(false);

      const { data } = response;
      console.log('data__External:', data);
      if (data.url.includes('twitter.com')) {
        if (data.title.includes('JavaScript')) {
          data.title = 'Description not available.';
        }
      }
      if (data.title || data.description) {
        setHtml(data.media ? data.media : null);
        setUrlData(data);
        setData(data);
      } else {
        setLoading(false);
        setLoadingInt(false);
        setUrlData(null);
        setData(null);
        setHtml(null);
      }
    } catch (err) {
      setLoading(false);
      setLoadingInt(false);
      setUrlData(null);
      setData(null);
      setHtml(null);
    }
  }

  useEffect(() => {
    if (url !== null) {
      const expression = /(https?:\/\/[^\s]+)/g;
      const regex = new RegExp(expression);

      if (url.match(regex)) {
        if (timer) clearTimeout(timer);
        const newTimer = setTimeout(() => {
          loadData();
        }, 600);
        setTimer(newTimer);
      } else {
        setHtml(null);
        setData(null);
        setUrlData(null);
      }
    }
  }, [url]);

  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  return (
    <Container className="JUST_A_TEST" ref={ref}>
      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {html !== null ? (
        <Wrapper
          style={style}
          dangerouslySetInnerHTML={createNoembedMarkup()}
        />
      ) : (
        <>
          {urlData && (
            <URLEmbeded style={style}>
              {urlData && urlData.images && (
                <img src={urlData.images} alt={urlData.title} />
              )}
              <span>{urlData && urlData.title}</span>
              <p>{urlData && urlData.description}</p>
            </URLEmbeded>
          )}
        </>
      )}
    </Container>
  );
};

Noembed.propTypes = {
  url: PropTypes.string.isRequired,
  setLoading: PropTypes.func,
  setData: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.string),
  accessToken: PropTypes.string,
};

Noembed.defaultProps = {
  setLoading: () => {},
  setData: () => {},
  style: null,
  accessToken: null,
};

export default Noembed;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Script from 'react-load-script';

import Loader from '@components/atoms/Loader';
import { ButtonsWrapper, Container } from './style';

/**
 * Styled share content buttons
 */
const ShareButtons = ({ layout, url, title, media }) => {
  const [, /*loading*/ setLoading] = useState(true);

  function addthisReady() {
    setLoading(false);
    if (window.addthis) {
      window.addthis.removeEventListener('addthis.ready', addthisReady);
    }
  }

  function handleAddthisLoaded() {
    window.addthis.init();
    window.addthis.addEventListener('addthis.ready', addthisReady, {});
  }

  useEffect(() => {
    if (window.addthis) {
      if (typeof window.addthis.layers.refresh === 'function')
        window.addthis.layers.refresh();
      window.addthis.update('share', 'url', url);
      window.addthis.update('share', 'title', title);
      window.addthis.update('share', 'media', media);
    }
    return addthisReady;
  }, []);

  return (
    <Container>
      <ButtonsWrapper
        layout={layout}
        className="addthis_inline_share_toolbox"
        data-url={url}
        data-title={title}
        data-media={media}
      >
        <Loader absolute />
      </ButtonsWrapper>
      <Script
        url="https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5fdbb7f704332a46"
        onLoad={handleAddthisLoaded}
      />
    </Container>
  );
};

ShareButtons.propTypes = {
  layout: PropTypes.oneOf(['block', 'row']),
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  media: PropTypes.string,
};

ShareButtons.defaultProps = {
  layout: 'row',
  media: 'Media example',
};

export default ShareButtons;

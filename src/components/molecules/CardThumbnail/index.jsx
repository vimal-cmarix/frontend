import React from 'react';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';

import { IMAGECOMING, YOUTUBE_REGEX } from '@modules/consts';

import {
  BlurImage,
  FeaturedImage,
  FeaturedImageWrapper,
  PlayWrapper,
} from './style';

export default function CardThumbnail({ type, link, image, forceCover }) {
  return (
    <FeaturedImageWrapper type={type}>
      {type === 'media' && (
        <PlayWrapper>
          <IconSVG name="play" size={34} />
        </PlayWrapper>
      )}
      {type === 'media' ? <BlurImage src={image} /> : null}
      <FeaturedImage
        src={image || IMAGECOMING}
        alt="Post thumbnail"
        cover={forceCover || (type === 'link' && YOUTUBE_REGEX.test(link.url))}
      />
    </FeaturedImageWrapper>
  );
}

CardThumbnail.propTypes = {
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.objectOf(PropTypes.any),
  forceCover: PropTypes.bool,
};

CardThumbnail.defaultProps = {
  link: {},
  forceCover: false,
};

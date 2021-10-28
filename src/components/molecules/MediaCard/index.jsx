import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@components/atoms/Icon';
import { IMAGECOMING } from '@modules/consts';

import {
  Container,
  ImageWrapper,
  Thumb,
  Overlay,
  Text,
  IconWrapper,
} from './style';

/**
 * This is the Media Card, used to show thumbnails and text. It trigger a click event.
 */
const MediaCard = ({ thumb, text, handleClick }) => {
  return (
    <Container onClick={handleClick}>
      <ImageWrapper>
        {Thumb && <Thumb src={thumb || IMAGECOMING} />}
        {thumb && <Overlay />}
        <IconWrapper>
          <Icon name="play_solid" />
        </IconWrapper>
      </ImageWrapper>
      <Text>{text}</Text>
    </Container>
  );
};

MediaCard.propTypes = {
  thumb: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

MediaCard.defaultProps = {
  thumb: undefined,
};

export default MediaCard;

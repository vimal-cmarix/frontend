import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  ColImage,
  ColText,
  Title,
  Desc,
  ImageWrapper,
  Image,
} from './style';

/**
 * The summary card is used to show image and some info
 */
const SummaryCard = ({ image, title, lines, hasBorder, last }) => {
  return (
    <Container hasBorder={hasBorder} last={last}>
      {image && (
        <ColImage>
          <ImageWrapper>
            <Image src={image} alt="media" />
          </ImageWrapper>
        </ColImage>
      )}
      <ColText>
        <Title>{title}</Title>
        {lines.map(line => (
          <Desc key={line}>{line}</Desc>
        ))}
      </ColText>
    </Container>
  );
};

SummaryCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf(PropTypes.string),
  hasBorder: PropTypes.bool,
  last: PropTypes.bool,
};

SummaryCard.defaultProps = {
  image: undefined,
  lines: [],
  hasBorder: true,
  last: false,
};

export default SummaryCard;

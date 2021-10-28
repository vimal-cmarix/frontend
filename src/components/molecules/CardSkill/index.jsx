import React from 'react';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';

import {
  Container,
  Title,
  LevelText,
  RelatedText,
  IconMoveContainer,
  ArrowContainer,
} from './style';

const CardSkill = ({ level, title, levelText, relatedText, showIcon }) => {
  return (
    <Container level={level}>
      {showIcon && (
        <IconMoveContainer>
          <IconSVG name="move" size={12} />
        </IconMoveContainer>
      )}
      <Title>{title}</Title>
      <LevelText>{levelText}</LevelText>
      <RelatedText>
        {relatedText}
        <ArrowContainer>
          <IconSVG name="rightArrow" size={12} />
        </ArrowContainer>
      </RelatedText>
    </Container>
  );
};

CardSkill.propTypes = {
  level: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  levelText: PropTypes.string.isRequired,
  relatedText: PropTypes.string,
  showIcon: PropTypes.bool,
};

CardSkill.defaultProps = {
  relatedText: '',
  showIcon: false,
};

export default CardSkill;

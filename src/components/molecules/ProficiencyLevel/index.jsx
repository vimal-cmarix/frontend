import React from 'react';
import PropTypes from 'prop-types';

import { Container, LevelBox, Text } from './style';

const ProficiencyLevel = ({ level, text, isActive, action }) => {
  return (
    <Container isActive={isActive} level={level} onClick={action}>
      <LevelBox>{level}</LevelBox>
      <Text>{text}</Text>
    </Container>
  );
};

ProficiencyLevel.propTypes = {
  level: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  action: PropTypes.func,
};

ProficiencyLevel.defaultProps = {
  isActive: false,
  action: () => null,
};

export default ProficiencyLevel;

import React from 'react';
import PropTypes from 'prop-types';

import { Container, Circle } from './style';

const PlusButton = ({ area, action }) => {
  return (
    <Container area={area} onClick={action}>
      <Circle />
    </Container>
  );
};

PlusButton.propTypes = {
  area: PropTypes.number,
  action: PropTypes.func.isRequired,
};

PlusButton.defaultProps = {
  area: 40,
};

export default PlusButton;

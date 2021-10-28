import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label } from './style';

function Flag({ label, color }) {
  return (
    <Container schema={color}>
      <Label>{label}</Label>
    </Container>
  );
}

Flag.propTypes = {
  color: PropTypes.oneOf(['yellow', 'red']),
  label: PropTypes.string.isRequired,
};

Flag.defaultProps = {
  color: 'yellow',
};

export default Flag;

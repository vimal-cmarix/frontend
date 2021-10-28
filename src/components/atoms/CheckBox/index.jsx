import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@components/atoms/Icon';

import { Container, CheckboxWrapper, Label } from './style';

const Checkbox = ({ label, onChange, checked }) => {
  return (
    <Container onClick={onChange}>
      <CheckboxWrapper checked={checked}>
        {checked && <Icon name="check" size="10" />}
      </CheckboxWrapper>
      {label && <Label>{label}</Label>}
    </Container>
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  label: '',
  checked: false,
};

export default Checkbox;

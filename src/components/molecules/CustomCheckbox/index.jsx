import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import Icon from '@components/atoms/Icon';

import {
  Container,
  Input,
  CustomIconContainer,
  IconWrapper,
  Label,
  Hint,
  IconQuestWrapper,
  HintContainer,
} from './style';

/**
 * Styled html checkbox
 */
const CustomCheckbox = ({
  disabled,
  name,
  label,
  onChange,
  checked,
  hint,
  changeColourFocused,
  ...rest
}) => {
  const checkboxRef = useRef(null);
  const { fieldName, defaultValue = checked, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkboxRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <Container {...rest}>
      <Input
        changeColourFocused={changeColourFocused}
        type="checkbox"
        disabled={disabled}
        name={name}
        ref={checkboxRef}
        checked={defaultValue}
        onChange={onChange}
      />
      <CustomIconContainer label={label}>
        <IconWrapper>
          <Icon name="check" />
        </IconWrapper>
      </CustomIconContainer>
      {label && (
        <Label changeColourFocused={changeColourFocused && checked}>
          {label}
        </Label>
      )}
      {hint && (
        <HintContainer>
          <IconQuestWrapper>
            <Icon name="question-circle_outline" />
          </IconQuestWrapper>
          <Hint disabled={disabled}>{hint}</Hint>
        </HintContainer>
      )}
    </Container>
  );
};

CustomCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  hint: PropTypes.string,
  changeColourFocused: PropTypes.bool,
};

CustomCheckbox.defaultProps = {
  disabled: false,
  label: undefined,
  onChange: undefined,
  checked: false,
  hint: '',
  changeColourFocused: false,
};

export default CustomCheckbox;

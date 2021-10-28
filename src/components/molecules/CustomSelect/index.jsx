import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { IconDownArrow } from '@assets/svgs/IconDownArrow';

import {
  Container,
  SmallSelectBox,
  MediumSelectBox,
  Label,
  IconWrapper,
  Hint,
} from './style';

import Dropdown from './Dropdown';

/**
 * The CustomSelect emits its value to the parent component
 * by 'onOptionSelected' event, which returns the value.
 * On other hand the same event is used to get and print its value.
 * You can customize your placeholder with prop 'placeholder'.
 * Integrate with unform.
 */
const CustomSelect = ({
  placeholder,
  size,
  hint,
  options,
  onOptionSelected,
  value,
  name,
  disabled,
  toTop,
  position,
}) => {
  const { t: selectT } = useTranslation('select');

  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(null);

  const selectRef = useRef();
  const { fieldName, defaultValue = value, registerField, error } = useField(
    name,
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'dataset.value',
      getValue: ref => {
        if (!ref.dataset.value) {
          return '';
        }

        return ref.dataset.value;
      },
    });
  }, [fieldName, registerField]);

  function handleClick(e) {
    // outside click
    if (!selectRef.current.contains(e.target)) {
      setIsActive(false);
    }
    return document.removeEventListener('mousedown', handleClick);
  }

  function handleToggle() {
    if (!isActive) {
      setIsActive(true);
      return document.addEventListener('mousedown', handleClick);
    }

    setIsActive(false);
    return document.removeEventListener('mousedown', handleClick);
  }

  function onSelectChange(optionSelected) {
    setSelected(optionSelected);
    onOptionSelected(optionSelected);
  }

  useEffect(() => {
    if (value.value !== undefined) onSelectChange(value);
  }, [value]);

  const components = {
    small: SmallSelectBox,
    medium: MediumSelectBox,
  };

  const SelectBox = components[size];

  return (
    <Container
      ref={selectRef}
      onClick={handleToggle}
      data-value={selected && selected.value}
      disabled={disabled}
    >
      <SelectBox isActive={isActive} disabled={disabled} error={error}>
        <Label
          disabled={disabled}
          isActive={isActive}
          hasValue={defaultValue.label}
        >
          {defaultValue.label || placeholder || selectT('default_placeholder')}
        </Label>
        <IconWrapper>
          <IconDownArrow />
        </IconWrapper>
      </SelectBox>

      {(error || hint) && (
        <Hint disabled={disabled} error={error}>
          {error || hint}
        </Hint>
      )}

      <Dropdown
        position={position}
        toTop={toTop}
        options={options}
        size={size}
        isActive={isActive}
        onOptionSelected={onSelectChange}
      />
    </Container>
  );
};

CustomSelect.propTypes = {
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  onOptionSelected: PropTypes.func.isRequired,

  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),

  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  toTop: PropTypes.bool,
  hint: PropTypes.string,
  position: PropTypes.oneOf(['absolute', 'relative', 'fixed']),
};

CustomSelect.defaultProps = {
  placeholder: undefined,
  hint: undefined,
  size: 'small',
  options: [],
  value: {},
  disabled: false,
  toTop: false,
  position: 'absolute',
};

export default CustomSelect;

import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { useTranslation } from 'react-i18next';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';

import { customStyles, customTheme } from './customStyles';
import { Hint } from './style';

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <IconSVG name="downArrow" size={20} color="#B1ADB7" />
    </components.DropdownIndicator>
  );
};
const Input = props => <components.Input {...props} isHidden={false} />;

/**
 * React Select integrated with unform
 */
const ReactSelect = ({
  className,
  isMulti,
  value,
  options,
  placeholder,
  name,
  disabled,
  onOptionSelected,
  loading,
  onFocus,
  onInputChange,
  loadOptions,
  noDropdown,
  type,
  inputValue,
  menuPlacement,
  menuIsOpen,
  onMenuOpen,
  onMenuClose,
}) => {
  const { t: selectT } = useTranslation('select');
  const selectRef = useRef(null);

  const { fieldName, defaultValue = value, registerField, error } = useField(
    name,
  );
  useEffect(() => {
    if (value?.value) selectRef.current.state.value = value;
    else selectRef.current.state.value = undefined;
  }, [value]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: ref => {
        if (isMulti) {
          if (!ref.state.value) {
            return [];
          }

          return ref.state.value.map(option => option.value);
        }

        if (!ref.state.value) {
          return '';
        }

        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, isMulti]);

  const componentsSelect = {
    select: Select,
    async: AsyncSelect,
  };

  const SelectComponent = componentsSelect[type];

  return (
    <div className={className}>
      <SelectComponent
        className={className}
        ref={selectRef}
        styles={customStyles}
        classNamePrefix="select"
        defaultValue={defaultValue}
        placeholder={placeholder || selectT('default_placeholder')}
        isDisabled={disabled}
        loadOptions={loadOptions}
        value={type === 'async' ? null : undefined}
        menuIsOpen={menuIsOpen}
        error={error}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        onChange={onOptionSelected}
        onInputChange={onInputChange}
        menuPlacement={menuPlacement}
        isLoading={loading}
        theme={customTheme}
        inputValue={inputValue}
        options={options}
        onFocus={onFocus}
        components={{
          DropdownIndicator: noDropdown ? () => <div /> : DropdownIndicator,
          Input,
        }}
      />

      {error && (
        <Hint disabled={disabled} error={error}>
          {error}
        </Hint>
      )}
    </div>
  );
};

ReactSelect.propTypes = {
  className: PropTypes.string,
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onOptionSelected: PropTypes.func,
  loading: PropTypes.bool,
  onFocus: PropTypes.func,
  onInputChange: PropTypes.func,
  loadOptions: PropTypes.func,
  noDropdown: PropTypes.bool,
  type: PropTypes.oneOfType(['select', 'async']),
  inputValue: PropTypes.string,
  menuPlacement: PropTypes.string,
  menuIsOpen: PropTypes.bool,
  onMenuOpen: PropTypes.func,
  onMenuClose: PropTypes.func,
};

ReactSelect.defaultProps = {
  className: undefined,
  isMulti: false,
  placeholder: undefined,
  options: [],
  value: undefined,
  disabled: false,
  onOptionSelected: undefined,
  loading: false,
  onFocus: () => null,
  onInputChange: undefined,
  loadOptions: () => null,
  noDropdown: false,
  type: 'select',
  inputValue: undefined,
  menuIsOpen: undefined,
  menuPlacement: undefined,
  onMenuOpen: undefined,
  onMenuClose: undefined,
};

export default ReactSelect;

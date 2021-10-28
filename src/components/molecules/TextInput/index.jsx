import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import TextareaAutosize from 'react-autosize-textarea';

import Icon from '@components/atoms/Icon';

import NdEditor from '@components/organisms/NdEditor';
import {
  Container,
  SmallInput,
  MediumInput,
  TextAreaWrapper,
  Hint,
  ArrowContainer,
  ArrowWrapper,
} from './style';

/**
 * The TextInput Molecule receive sizes and status (if it is disabled).
 * You can get input value with the method 'onChange'.
 * You need pass the name to input reference.
 * This input is integrated with '@unform';
 * You can get input error if using 'yup' validation.
 * 'hint' will display a hint message if the error does'nt exist.
 * You can used prop 'mask' for add masking value: https://github.com/sanniassin/react-input-mask
 */
const TextInput = ({
  noBorder,
  className,
  value,
  placeholder,
  disabled,
  size,
  onChange,
  onBlur,
  type,
  name,
  hint,
  mask,
  autocomplete,
  maxLength,
  multiline,
  rows,
  style,
  maskPlaceholder,
  onClickArrowUp,
  onClickArrowDown,
  disabledArrowDown,
  onKeyPress,
  id,
  resize,
  onFocus,
  editor,
  minHeight,
  position,
}) => {
  const components = {
    small: SmallInput,
    medium: MediumInput,
  };

  const inputRef = useRef(null);
  const {
    fieldName,
    defaultValue = value,
    registerField,
    error,
    clearError,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  function handleBlur() {
    if (value && error && error.includes('required')) clearError();
    onBlur();
  }

  const inputProps = {
    placeholder:
      maxLength === '1000'
        ? `${placeholder}\n(${maxLength} character max)`
        : placeholder,
    onBlur: handleBlur,
    onChange,
    onKeyPress,
    defaultValue,
    type: type === 'number' ? 'tel' : type,
    ref: inputRef,
    error,
    autoComplete: autocomplete,
    maxLength,
    rows,
    id: id || undefined,
    style,
    noBorder,
  };

  const Input = components[size];

  let TextInputComponent = (
    <InputMask
      mask={mask}
      disabled={disabled}
      onBlur={inputProps.onBlur}
      onChange={inputProps.onChange}
      onKeyPress={inputProps.onKeyPress}
      maskPlaceholder={maskPlaceholder}
      onFocus={onFocus}
    >
      <Input {...inputProps} className={className} />
    </InputMask>
  );

  if (multiline)
    TextInputComponent = (
      <TextAreaWrapper
        resize={resize}
        error={error}
        noBorder={noBorder}
        className={className}
        onFocus={onFocus}
      >
        <TextareaAutosize {...inputProps} className={className} />
      </TextAreaWrapper>
    );
  if (editor)
    TextInputComponent = (
      <NdEditor
        minHeight={minHeight}
        onlyInlineEditor
        {...inputProps}
        content={value}
      />
    );

  return (
    <Container position={position}>
      {TextInputComponent}
      {type === 'number' && (
        <ArrowContainer>
          <ArrowWrapper up onClick={onClickArrowUp}>
            <Icon name="arrow_down" />
          </ArrowWrapper>
          <ArrowWrapper onClick={onClickArrowDown} disabled={disabledArrowDown}>
            <Icon name="arrow_down" />
          </ArrowWrapper>
        </ArrowContainer>
      )}

      {(error || hint) && (
        <Hint disabled={disabled} error={error}>
          {error || hint}
        </Hint>
      )}
    </Container>
  );
};

TextInput.propTypes = {
  noBorder: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  disabled: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  mask: PropTypes.string,
  autocomplete: PropTypes.string,
  maxLength: PropTypes.string,
  rows: PropTypes.string,
  multiline: PropTypes.bool,
  resize: PropTypes.oneOf(['none', 'horizontal', 'vertical', 'inherit']),
  maskPlaceholder: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  onClickArrowUp: PropTypes.func,
  onClickArrowDown: PropTypes.func,
  disabledArrowDown: PropTypes.bool,
  id: PropTypes.string,
  editor: PropTypes.bool,
  minHeight: PropTypes.string,
  position: PropTypes.string,
};

TextInput.defaultProps = {
  editor: false,
  noBorder: false,
  className: undefined,
  minHeight: undefined,
  value: '',
  placeholder: '',
  size: 'small',
  position: 'relative',
  disabled: false,
  type: 'text',
  hint: undefined,
  mask: undefined,
  maxLength: undefined,
  rows: undefined,
  autocomplete: '',
  maskPlaceholder: '_',
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {},
  onKeyPress: () => {},
  multiline: false,
  style: undefined,
  onClickArrowUp: () => {},
  onClickArrowDown: () => {},
  disabledArrowDown: false,
  id: '',
  resize: 'none',
};

export default TextInput;

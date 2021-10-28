import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@components/atoms/Icon';
import Loader from '@components/atoms/Loader';

import { DefaultButton, Label, IconsWrapper, DefaultIconButton } from './style';

const setTheme = colorSchema => {
  switch (colorSchema) {
    case 'primary':
      return 'light';
    case 'secondary':
      return 'dark';
    case 'white':
      return 'white';
    case 'ghost':
      return 'dark';
    case 'grey':
      return 'grey';
    case 'purple':
      return 'dark';
    default:
      return 'dark';
  }
};

/**
 * The Button Molecule has sizes and color schemes.
 * You can use icon inside.
 */
const Button = ({
  label,
  handleClick,
  size,
  iconSize,
  colorSchema,
  type,
  icon,
  iconLeft,
  loading,
  disabled,
  active,
  className,
}) => (
  <DefaultButton
    className={className}
    colorSchema={colorSchema}
    size={size}
    onClick={handleClick}
    type={type}
    loading={loading ? 1 : 0}
    disabled={disabled}
    active={active}
  >
    {iconLeft && (
      <IconsWrapper icon={iconLeft}>
        <Icon name={iconLeft} size={iconSize} />
      </IconsWrapper>
    )}
    <Label loading={loading ? 1 : 0}>{label}</Label>
    {icon && (
      <IconsWrapper icon={icon}>
        <Icon name={icon} size={iconSize} />
      </IconsWrapper>
    )}
    {loading && <Loader size="medium" theme={setTheme(colorSchema)} />}
  </DefaultButton>
);

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  iconSize: PropTypes.number,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xsmall-side']),
  colorSchema: PropTypes.oneOf([
    'primary',
    'secondary',
    'ghost',
    'clean',
    'linkedin',
    'copy',
    'outline',
    'white',
    'grey',
    'purple',
  ]),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  icon: PropTypes.string,
  iconLeft: PropTypes.string,
  loading: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: undefined,
  iconSize: 18,
  size: 'small',
  colorSchema: 'primary',
  handleClick: undefined,
  type: 'button',
  icon: undefined,
  iconLeft: undefined,
  loading: false,
  active: false,
  disabled: false,
};

const IconButton = ({
  handleClick,
  size,
  colorSchema,
  icon,
  loading,
  ...rest
}) => (
  <DefaultIconButton
    colorSchema={colorSchema}
    size={size}
    onClick={handleClick}
    loading={loading ? 1 : 0}
    {...rest}
  >
    {loading ? (
      <Loader size="medium" theme={setTheme(colorSchema)} />
    ) : (
      <Icon name={icon} />
    )}
  </DefaultIconButton>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  colorSchema: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  loading: PropTypes.bool,
};

IconButton.defaultProps = {
  size: 'small',
  colorSchema: 'primary',
  loading: false,
  handleClick: undefined,
};

export { Button, IconButton };

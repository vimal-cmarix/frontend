import React from 'react';
import PropTypes from 'prop-types';

import { SPACING } from '@assets/styles/theme';

import IconSVG from '@components/atoms/IconSVG';

import { Container, Spinner } from './style';

const Btn = ({
  variant,
  spaceElements,
  size,
  rounded,
  label,
  startIcon,
  endIcon,
  iconSize,
  full,
  handleClick,
  loading,
  ...rest
}) => {
  return (
    <Container
      {...rest}
      variant={variant}
      size={size}
      rounded={rounded}
      spaceElements={spaceElements}
      full={full}
      onClick={handleClick}
      showLoading={loading}
    >
      {startIcon && <IconSVG name={startIcon} size={iconSize} />}
      {label && <span>{label}</span>}
      {endIcon && <IconSVG name={endIcon} size={iconSize} />}
      {loading && <Spinner />}
    </Container>
  );
};

Btn.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.string,
  full: PropTypes.bool,
  spaceElements: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.oneOf(['sm', 'md', 'lg']),
  iconSize: PropTypes.number,
  startIcon: PropTypes.string,
  endIcon: PropTypes.string,
  loading: PropTypes.bool,
  variant: PropTypes.oneOf([
    'text',
    'textPrimary',
    'delete',
    'solidPrimary',
    'solidSecondary',
    'outlineLight',
    'outlinePrimary',
    'outlineSecondary',
    'danger',
    'grey',
    'addBoard',
  ]),
};

Btn.defaultProps = {
  handleClick: () => null,
  label: null,
  variant: 'text',
  size: 'md',
  rounded: 'sm',
  iconSize: 16,
  startIcon: null,
  endIcon: null,
  full: false,
  loading: false,
  spaceElements: SPACING + SPACING / 2,
};

export default Btn;

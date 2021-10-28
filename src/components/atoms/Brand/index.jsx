import React from 'react';
import PropTypes from 'prop-types';
import Logo from './styles';

const projectName = process.env.PROJECT_NAME;

/**
 * This is the brand/logo component.
 */
const Brand = ({ size, colorSchema }) => (
  <Logo size={size} colorSchema={colorSchema}>
    {projectName}
  </Logo>
);

Brand.propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small', 'nav', 'navDark']),
  colorSchema: PropTypes.oneOf(['dark', 'light', 'black', 'gray']),
};

Brand.defaultProps = {
  size: 'medium',
  colorSchema: 'dark',
};

export default Brand;

import React from 'react';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import {
  BlueHoverSolid,
  Grey,
  Primary,
  PrimaryClean,
} from '@assets/styles/colors';
import WrapperLoader from './style';

const colors = {
  dark: {
    bg: BlueHoverSolid,
    fg: Primary,
  },
  light: {
    bg: darken(0.15, Primary),
    fg: BlueHoverSolid,
  },
  purple: {
    bg: PrimaryClean,
    fg: Primary,
  },
  grey: {
    bg: PrimaryClean,
    fg: Grey,
  },
};

const Loader = ({ size, theme, absolute }) => (
  <WrapperLoader absolute={absolute} className="loader" size={size}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      stroke={colors[theme].fg}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(2 2)" strokeWidth="3">
          <circle stroke={colors[theme].bg} cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  </WrapperLoader>
);

Loader.propTypes = {
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  theme: PropTypes.oneOf(['light', 'dark']),
  absolute: PropTypes.bool,
};

Loader.defaultProps = {
  size: 'medium',
  theme: 'dark',
  absolute: false,
};

export default Loader;

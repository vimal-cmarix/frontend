import React from 'react';
import PropTypes from 'prop-types';
import { White, Haiti } from '@assets/styles/colors';

const types = {
  light: {
    fill: White,
  },
  dark: {
    fill: Haiti,
  },
};

const Ilustra = ({ colorSchema }) => (
  <svg
    width="268"
    height="344"
    viewBox="0 0 268 344"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M177.806 290.891L217.473 221.83L173.685 160.628L124.163 161.384L82.4052 227.138L126.639 290.141L177.806 290.891Z"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M173.685 160.628L131.926 226.381"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M177.806 290.891L131.926 226.382"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M82.3978 227.134L131.919 226.379"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M92.8694 49.383L27.777 64.2154L14.9757 125.985L43.5974 156.058L107.842 144.395L121.5 81.3267L92.8694 49.383Z"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M14.9757 125.985L79.2199 114.321"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M92.8694 49.3828L79.2198 114.321"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M107.844 144.401L79.222 114.327"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M-11.953 240.047L31.9732 251.634L59.1749 218.428L51.403 191.267L8.98757 178.036L-19.1404 211.755L-11.953 240.047Z"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M59.1747 218.429L16.7593 205.198"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M-11.9534 240.048L16.7592 205.199"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
    <path
      d="M8.98792 178.033L16.7599 205.194"
      stroke={types[colorSchema].fill}
      strokeMiterlimit="10"
    />
  </svg>
);

Ilustra.propTypes = {
  colorSchema: PropTypes.oneOf(['dark', 'light']),
};

Ilustra.defaultProps = {
  colorSchema: 'light',
};

export default Ilustra;

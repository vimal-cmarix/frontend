import React from 'react';
import PropTypes from 'prop-types';

import { Code, Number } from './style';

const CodeInput = ({ value, error, focus }) => (
  <Code error={error} focus={focus}>
    <Number value={value}>{value || 0}</Number>
  </Code>
);

CodeInput.propTypes = {
  value: PropTypes.string,
  focus: PropTypes.bool,
  error: PropTypes.bool,
};

CodeInput.defaultProps = {
  value: null,
  focus: false,
  error: false,
};

export default CodeInput;

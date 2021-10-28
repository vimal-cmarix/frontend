import React from 'react';
import PropTypes from 'prop-types';

import { SPACING } from '@assets/styles/theme';

import { Container } from './style';

function TextIconInfo({ children, spaceElements, spaceY }) {
  return (
    <Container spaceElements={spaceElements} spaceY={spaceY}>
      {children}
    </Container>
  );
}

TextIconInfo.propTypes = {
  children: PropTypes.node.isRequired,
  spaceElements: PropTypes.number,
  spaceY: PropTypes.number,
};

TextIconInfo.defaultProps = {
  spaceElements: 10,
  spaceY: SPACING * 4,
};

export default TextIconInfo;

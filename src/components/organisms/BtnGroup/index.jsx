import React from 'react';
import PropTypes from 'prop-types';

import { SPACING } from '@assets/styles/theme';

import { Container } from './style';

const BtnGroup = ({ children, spaceX, spaceY, ...rest }) => {
  return (
    <Container spaceX={spaceX} spaceY={spaceY} {...rest}>
      {children}
    </Container>
  );
};

BtnGroup.propTypes = {
  children: PropTypes.node.isRequired,
  spaceX: PropTypes.number,
  spaceY: PropTypes.number,
};

BtnGroup.defaultProps = {
  spaceX: SPACING * 4,
  spaceY: 0,
};

export default BtnGroup;

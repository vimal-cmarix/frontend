import React from 'react';
import PropTypes from 'prop-types';

import { Container, WrapperProgress, Bar, TextValue } from './style';

/**
 * Styled html checkbox
 */
const ProgressBar = ({ currentValue, totalValue }) => {
  const percent = currentValue === 0 ? 0 : (currentValue / totalValue) * 100;
  return (
    <Container>
      <WrapperProgress>
        <Bar percent={percent} />
        <TextValue percent={percent}>
          {currentValue}/{totalValue}
        </TextValue>
      </WrapperProgress>
    </Container>
  );
};

ProgressBar.propTypes = {
  currentValue: PropTypes.number.isRequired,
  totalValue: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {};

export default ProgressBar;

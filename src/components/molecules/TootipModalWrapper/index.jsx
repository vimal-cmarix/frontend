import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@components/atoms/Icon';

import { Container, RightTooltip, IconContainer } from './style';

/**
 * By default behaviour tooltip component will approach to its children element
 * using right position.
 * This is a container component, you must put it around the component you wanna show a information.
 * You must pass element to display on tooltip.
 */
const TootipModalWrapper = ({
  children,
  style,
  disable,
  className,
  visibled,
  setVisible,
}) => {
  return (
    <Container
      visibled={visibled}
      disable={disable}
      style={style}
      className={className}
    >
      {!disable && <RightTooltip>{children}</RightTooltip>}
      <IconContainer onClick={() => setVisible(!visibled)} visibled={visibled}>
        <Icon name="question_outline" size="20" />
      </IconContainer>
    </Container>
  );
};

TootipModalWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  disable: PropTypes.bool,
  className: PropTypes.string,
  visibled: PropTypes.bool,
  setVisible: PropTypes.func,
};

TootipModalWrapper.defaultProps = {
  style: {},
  disable: false,
  className: '',
  visibled: false,
  setVisible: () => {},
};

export default TootipModalWrapper;

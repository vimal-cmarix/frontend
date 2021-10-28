import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  TopTooltip,
  RightTooltip,
  BottomTooltip,
  LeftTooltip,
  Text,
} from './style';

/**
 * By default behaviour tooltip component will approach to its children element
 * using position parameter.
 * This is a container component, you must put it around the component you wanna show a tooltip.
 * You must pass text to display on tooltip.
 */
const TooltipWrapper = ({
  position,
  children,
  text,
  style,
  disable,
  fromRight,
  className,
}) => {
  const components = {
    top: TopTooltip,
    right: RightTooltip,
    bottom: BottomTooltip,
    left: LeftTooltip,
  };

  const SelectedTooltip = components[position];

  return (
    <Container
      disable={disable}
      style={style}
      fromRight={fromRight}
      className={className}
    >
      {!disable && (
        <SelectedTooltip>
          <Text>{text}</Text>
        </SelectedTooltip>
      )}
      {children}
    </Container>
  );
};

TooltipWrapper.propTypes = {
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: PropTypes.element.isRequired,
  text: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  disable: PropTypes.bool,
  fromRight: PropTypes.bool,
  className: PropTypes.string,
};

TooltipWrapper.defaultProps = {
  position: 'top',
  style: {},
  disable: false,
  fromRight: false,
  className: '',
  text: null,
};

export default TooltipWrapper;

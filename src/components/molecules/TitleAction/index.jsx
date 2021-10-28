import React from 'react';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';

import { Container, ActionArea } from './style';

function TitleAction({
  children,
  iconName,
  iconSize,
  onClick,
  hideActionButton,
}) {
  return (
    <Container>
      {children}
      {!hideActionButton && (
        <ActionArea onClick={onClick}>
          <IconSVG name={iconName} size={iconSize} />
        </ActionArea>
      )}
    </Container>
  );
}

TitleAction.propTypes = {
  children: PropTypes.node.isRequired,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  onClick: PropTypes.func,
  hideActionButton: PropTypes.bool,
};

TitleAction.defaultProps = {
  iconName: null,
  iconSize: 16,
  hideActionButton: false,
  onClick: () => null,
};

export default TitleAction;

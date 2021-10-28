import React from 'react';

import IconSVG, { iconNames } from '@components/atoms/IconSVG';
import { Container, IconWrapper, Text } from './styles';
/*
 * Icon View
 */

const Icons = () => {
  const keysIcons = Object.keys(iconNames);
  return (
    <Container>
      {keysIcons.map(name => (
        <IconWrapper>
          <IconSVG name={name} size="24" />
          <Text>{name}</Text>
        </IconWrapper>
      ))}
    </Container>
  );
};

export default Icons;

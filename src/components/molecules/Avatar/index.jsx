import React from 'react';
import PropTypes from 'prop-types';
import { Grey200 } from '@assets/styles/colors';

import {
  Initial,
  ImageContent,
  XXXSmallContainer,
  XXSmallContainer,
  XSmallContainer,
  SmallContainer,
  MediumContainer,
  LargeContainer,
  XLargeContainer,
  XXLargeContainer,
  ResponsiveContainer,
} from './style';

/**
 * The Avatar Molecule receive a name and takes only its first letter to use as a profile,
 * it also receive an image to use, if it receives only the image, it doesn't use the name
 */
const Avatar = ({ name, image, size, background, objectFit }) => {
  const components = {
    xxxsmall: XXXSmallContainer,
    xxsmall: XXSmallContainer,
    xsmall: XSmallContainer,
    small: SmallContainer,
    medium: MediumContainer,
    large: LargeContainer,
    xlarge: XLargeContainer,
    xxlarge: XXLargeContainer,
    responsive: ResponsiveContainer,
  };

  const Container = components[size];

  function getInitials() {
    const names = name.toUpperCase().split(' ');

    if (names?.length === 1) return names[0].charAt(0);

    return `${names[0].charAt(0) + names[names?.length - 1].charAt(0)}`;
  }

  return (
    <Container image={image} background={background}>
      <ImageContent
        objectFit={objectFit}
        src={image}
        image={image}
        alt="Avatar Picture"
      />
      <Initial image={image}>{getInitials()}</Initial>
    </Container>
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  size: PropTypes.oneOf([
    'xxxsmall',
    'xxsmall',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
    'xxlarge',
    'responsive',
  ]),
  background: PropTypes.string,
  objectFit: PropTypes.string,
};

Avatar.defaultProps = {
  name: 'U',
  image: undefined,
  size: 'xxlarge',
  background: Grey200,
  objectFit: 'cover',
};

export default Avatar;

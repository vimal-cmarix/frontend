import React from 'react';
import PropTypes from 'prop-types';

import StyledIcon from './style';
import IconSVG from '../IconSVG';

/**
 * The Icon Atom receives the icon name as a parameter and returns the icon with display block
 */
const Icon = ({ name, size, svg }) => {
  const specialIcons = [
    'presentation_clicked',
    'tutorial_videos',
    'notifications_clicked',
    'library_clicked',
    'library_tour',
    'inspo_videos',
    'password_change',
    'account_billing',
  ];

  const isSpecialIcon = specialIcons.find(item => item === name);

  if (svg) return <IconSVG name={name} size={size} />;
  if (isSpecialIcon) {
    return (
      <StyledIcon size={size} className={`icon-${name}`}>
        <span className="path1" />
        <span className="path2" />
        <span className="path3" />
        <span className="path4" />
        <span className="path5" />
        <span className="path6" />
        <span className="path7" />
      </StyledIcon>
    );
  }

  return <StyledIcon size={size} className={`icon-${name}`} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  svg: PropTypes.bool,
};

Icon.defaultProps = {
  size: '',
  svg: false,
};

export default Icon;

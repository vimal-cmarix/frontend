import React from 'react';
import PropTypes from 'prop-types';

import { Container, FillBox } from './style';

function ProfileTabs({ isTimeline, children }) {
  return (
    <Container isTimeline={isTimeline}>
      <FillBox />
      {children}
      <FillBox />
    </Container>
  );
}

ProfileTabs.propTypes = {
  children: PropTypes.node.isRequired,
  isTimeline: PropTypes.bool,
};

ProfileTabs.defaultProps = {
  isTimeline: false,
};

export default ProfileTabs;

import React from 'react';
import PropTypes from 'prop-types';

import SideBar from './SideBar';
import Header from './Header';

import { Container, HeaderContainer, SideBarContainer, Body } from './style';

const JobTrackerLayout = ({ children, mobileTitle }) => {
  return (
    <Container>
      <SideBarContainer>
        <SideBar />
      </SideBarContainer>
      <HeaderContainer>
        <Header mobileTitle={mobileTitle} />
      </HeaderContainer>
      <Body>{children}</Body>
    </Container>
  );
};

JobTrackerLayout.propTypes = {
  children: PropTypes.node.isRequired,
  mobileTitle: PropTypes.string,
};

JobTrackerLayout.defaultProps = {
  mobileTitle: null,
};

export default JobTrackerLayout;

import React from 'react';
import PropTypes from 'prop-types';

import InfoCard from '@components/molecules/InfoCard';
import Btn from '@components/molecules/Btn';

import SideBar from '../JobTracker/SideBar';
import Header from '../JobTracker/Header';

import {
  Container,
  HeaderContainer,
  SideBarContainer,
  Body,
  MobileOnly,
  SectionTitle,
  AddButtonContainer,
  Divider,
} from './style';

const JobTrackerHomeLayout = ({ children, mobileTitle, showCreateButton }) => {
  return (
    <Container>
      <SideBarContainer>
        <SideBar />
      </SideBarContainer>
      <HeaderContainer>
        <Header mobileTitle={mobileTitle} showCreateButton={showCreateButton} />
      </HeaderContainer>
      <Body>
        <MobileOnly>
          <SectionTitle>My Board</SectionTitle>
          <AddButtonContainer>
            <Btn variant="addBoard" startIcon="plus" full />
          </AddButtonContainer>

          <InfoCard
            title="Board Name"
            subTitle="XX Job cards"
            date="Created: Created Date"
          />
          <InfoCard
            title="Board Name"
            subTitle="XX Job cards"
            date="Created: Created Date"
          />

          <Divider />

          <SectionTitle gutterMb={10}>Contacts</SectionTitle>
          <InfoCard
            title="Contact list"
            subTitle="XX Contacts"
            date="Last updated: last updated date"
          />
        </MobileOnly>
        {children}
      </Body>
    </Container>
  );
};

JobTrackerHomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
  mobileTitle: PropTypes.string,
  showCreateButton: PropTypes.bool,
};

JobTrackerHomeLayout.defaultProps = {
  mobileTitle: null,
  showCreateButton: false,
};

export default JobTrackerHomeLayout;

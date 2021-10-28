import React, { useEffect } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';

import SideBar from '../JobTracker/SideBar';
import Header from '../JobTracker/Header';

import { Container, HeaderContainer, SideBarContainer } from './style';

const JobTrackerDetailLayout = ({
  children,
  mobileTitle,
  handleCreate,
  handleChangeBoard,
  boards,
  showCreateButton,
}) => {
  function setBoardHeight() {
    const doc = document.documentElement;

    doc.style.setProperty('--height-full', rem(window.innerHeight));
  }

  useEffect(() => {
    if (!process.browser) return null;

    window.addEventListener('resize', setBoardHeight);
    setBoardHeight();

    return () => window.removeEventListener('resize', setBoardHeight);
  }, []);

  return (
    <Container className="applicationMain">
      <SideBarContainer>
        <SideBar boards={boards} handleChangeBoard={handleChangeBoard} />
      </SideBarContainer>
      <HeaderContainer>
        <Header
          showCreateButton={showCreateButton}
          handleCreate={handleCreate}
          mobileTitle={mobileTitle}
        />
      </HeaderContainer>
      {children}
    </Container>
  );
};

JobTrackerDetailLayout.propTypes = {
  children: PropTypes.node.isRequired,
  mobileTitle: PropTypes.string,
  handleCreate: PropTypes.func,
  handleChangeBoard: PropTypes.func,
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  showCreateButton: PropTypes.bool,
};

JobTrackerDetailLayout.defaultProps = {
  mobileTitle: null,
  handleCreate: () => {},
  handleChangeBoard: () => {},
  showCreateButton: true,
};

export default JobTrackerDetailLayout;

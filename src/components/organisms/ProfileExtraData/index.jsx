import React, { useContext, useState } from 'react';

import ProfileTab from '@components/molecules/ProfileTab';

import ProfileTabs from '@components/organisms/ProfileTabs';

import ProfileContext from '@context/profileContext';
import All from './All';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import Certificates from './Certificates';

import { Container, Content } from './style';

function ProfileExtraData() {
  const { state: profileState } = useContext(ProfileContext);
  const {
    education,
    certificates,
    experiences,
    skills,
    previewMode,
  } = profileState;

  const tabs = {
    All: {
      component: <All />,
      hide:
        previewMode &&
        !education?.length &&
        !experiences?.length &&
        !certificates?.length &&
        !skills?.length,
    },
    Education: {
      component: <Education />,
      hide: previewMode && !education?.length,
    },
    Experience: {
      component: <Experience />,
      hide: previewMode && !experiences?.length,
    },
    Certificates: {
      component: <Certificates />,
      hide: previewMode && !certificates?.length,
    },
    Skills: {
      component: <Skills />,
      hide: previewMode && !skills?.length,
    },
  };
  const [tab, setTab] = useState('All');

  if (tabs.All.hide) {
    return null;
  }

  return (
    <Container data-tut="reactour__timeline">
      <ProfileTabs isTimeline>
        {Object.keys(tabs)
          .filter(tabText => !tabs[tabText].hide)
          .map((tabText, index) => (
            <ProfileTab
              key={String(index)}
              isTimeline
              text={tabText}
              isActive={tab === tabText}
              onClick={() => setTab(tabText)}
            />
          ))}
      </ProfileTabs>

      <Content>{tabs[tab]?.component}</Content>
    </Container>
  );
}

export default ProfileExtraData;

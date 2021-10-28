import React from 'react';
import { useTranslation } from 'react-i18next';

import EditableExperience from '@components/templates/Editables/Experience';

import { SectionTitle, Section, SectionWrapper } from '../style';

function ProfileExtraDataExperience() {
  const { t: profileT } = useTranslation('profile');

  return (
    <Section>
      <SectionTitle largeMobile>{profileT('job_experience')}</SectionTitle>
      <SectionWrapper>
        <EditableExperience />
      </SectionWrapper>
    </Section>
  );
}

export default ProfileExtraDataExperience;

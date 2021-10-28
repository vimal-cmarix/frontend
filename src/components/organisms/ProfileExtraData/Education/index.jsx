import React from 'react';
import { useTranslation } from 'react-i18next';

import EditableEducation from '@components/templates/Editables/Education';

import { SectionTitle, Section, SectionWrapper } from '../style';

function ProfileExtraDataEducation() {
  const { t: profileT } = useTranslation('profile');

  return (
    <Section>
      <SectionTitle largeMobile>{profileT('education')}</SectionTitle>
      <SectionWrapper>
        <EditableEducation />
      </SectionWrapper>
    </Section>
  );
}

export default ProfileExtraDataEducation;

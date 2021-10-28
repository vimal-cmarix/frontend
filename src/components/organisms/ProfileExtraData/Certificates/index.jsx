import React from 'react';
import { useTranslation } from 'react-i18next';

import EditableCertificates from '@components/templates/Editables/Certificates';

import { SectionTitle, Section, SectionWrapper } from '../style';

function ProfileExtraDataCertificates() {
  const { t: profileT } = useTranslation('profile');

  return (
    <Section>
      <SectionTitle largeMobile>{profileT('certificates')}</SectionTitle>
      <SectionWrapper>
        <EditableCertificates />
      </SectionWrapper>
    </Section>
  );
}

export default ProfileExtraDataCertificates;

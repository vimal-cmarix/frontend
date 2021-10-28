import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import Icon from '@components/atoms/Icon';

import UnorderedList from '@components/molecules/UnorderedList';

import ModalSkills from '@components/templates/Modals/Skills';

import {
  TextHelp,
  SectionTitle,
  Section,
  SectionWrapper,
  AddButton,
  EditArea,
  EditIconWrapper,
} from '../style';

function ProfileExtraDataSkills() {
  const { t: profileT } = useTranslation('profile');

  const { dispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  return (
    <Section>
      <SectionTitle largeMobile>{profileT('skills')}</SectionTitle>
      <SectionWrapper>
        {profileState && profileState.skills?.length ? (
          <UnorderedList list={profileState.skills} />
        ) : (
          !profileState.previewMode && (
            <TextHelp>
              Adding your skills is a list, this is a guide that lets people
              know a bit about you to begin.
            </TextHelp>
          )
        )}
        {profileState && !profileState.previewMode && (
          <EditArea>
            {profileState.skills?.length ? (
              <EditIconWrapper
                onClick={() => {
                  dispatch({
                    type: 'SET_MODAL_OPENED',
                    component: ModalSkills,
                    props: { skillsList: profileState.skills },
                  });
                }}
              >
                <Icon name="edit_outline" />
              </EditIconWrapper>
            ) : (
              <AddButton
                onClick={() => {
                  dispatch({
                    type: 'SET_MODAL_OPENED',
                    component: ModalSkills,
                    props: { skillsList: profileState.skills },
                  });
                }}
              >
                {profileT('add')}
              </AddButton>
            )}
          </EditArea>
        )}
      </SectionWrapper>
    </Section>
  );
}

export default ProfileExtraDataSkills;

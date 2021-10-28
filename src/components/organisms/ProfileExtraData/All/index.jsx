import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import Icon from '@components/atoms/Icon';

import UnorderedList from '@components/molecules/UnorderedList';

import EditableCertificates from '@components/templates/Editables/Certificates';
import EditableEducation from '@components/templates/Editables/Education';
import EditableExperience from '@components/templates/Editables/Experience';
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

function ProfileExtraDataAll() {
  const { t: profileT } = useTranslation('profile');

  const { dispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const {
    education,
    certificates,
    experiences,
    skills,
    previewMode,
  } = profileState;

  return (
    <>
      {(!previewMode || experiences?.length > 0) && (
        <Section data-tut="reactour__job_experience">
          <SectionTitle largeMobile>{profileT('job_experience')}</SectionTitle>
          <SectionWrapper>
            <EditableExperience />
          </SectionWrapper>
        </Section>
      )}

      {(!previewMode || education?.length > 0) && (
        <Section data-tut="reactour__education">
          <SectionTitle largeMobile>{profileT('education')}</SectionTitle>
          <SectionWrapper>
            <EditableEducation />
          </SectionWrapper>
        </Section>
      )}

      {(!previewMode || certificates?.length > 0) && (
        <Section data-tut="reactour__certificates">
          <SectionTitle largeMobile>{profileT('certificates')}</SectionTitle>
          <SectionWrapper>
            <EditableCertificates />
          </SectionWrapper>
        </Section>
      )}

      {(!previewMode || skills?.length > 0) && (
        <Section data-tut="reactour__skills">
          <SectionTitle largeMobile>{profileT('skills')}</SectionTitle>
          <SectionWrapper>
            {skills?.length > 0 ? (
              <UnorderedList list={skills} />
            ) : (
              !previewMode && (
                <TextHelp>
                  Adding your skills is a list, this is a guide that lets people
                  know a bit about you to begin.
                </TextHelp>
              )
            )}
            {profileState && !previewMode && (
              <EditArea>
                {skills?.length ? (
                  <EditIconWrapper
                    onClick={() => {
                      dispatch({
                        type: 'SET_MODAL_OPENED',
                        component: ModalSkills,
                        props: { skillsList: skills },
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
                        props: { skillsList: skills },
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
      )}
    </>
  );
}

export default ProfileExtraDataAll;

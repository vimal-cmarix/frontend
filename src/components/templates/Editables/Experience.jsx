import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import JobExperienceService from '@api/services/jobExperience';

import ModalJobExperience from '@components/templates/Modals/JobExperience';
import SummaryCard from '@components/molecules/SummaryCard';
import Icon from '@components/atoms/Icon';
import { useToast } from '@components/molecules/Notification';
import errorHandle from '@src/utils/error';

import DeleteDialog from '@components/molecules/DeleteDialog';

import { monthYearToString } from '@src/utils/general';

import {
  SummaryCardWrapper,
  EditArea,
  EditIconWrapper,
  AddButton,
  TextHelp,
} from './style';

/**
 * Group Job Experience with Actions
 */
const EditableExperience = () => {
  const { t: modalsT } = useTranslation('modals');
  const { t: monthsT } = useTranslation('months');
  const { t: profileT } = useTranslation('profile');

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const { experiences, previewMode } = profileState;

  const [deleteExperienceShow, setDeleteExperienceShowed] = useState(false);
  const [deleteExperienceLoading, setDeleteExperienceLoading] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);

  function openJobExperienceModal(index) {
    return appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalJobExperience,
      props: { JobExperienceIndex: index },
    });
  }

  function removeExperienceFromState() {
    return profileDispatch({
      type: 'REMOVE_EXPERIENCE',
      experience: experienceToDelete,
    });
  }

  const deleteExperienceAction = id => {
    setExperienceToDelete(id);
    return setDeleteExperienceShowed(true);
  };

  async function deleteExperience() {
    const profileId = profileState.id;
    const experienceId = experienceToDelete;

    const closeAction = () => {
      setDeleteExperienceShowed(false);
      setDeleteExperienceLoading(false);
      setExperienceToDelete(null);
    };

    try {
      setDeleteExperienceLoading(true);
      await JobExperienceService.deleteJobExperience(profileId, experienceId);
      removeExperienceFromState();
      showSuccess(modalsT('job_experience.delete_success'));
      closeAction();
    } catch (err) {
      showError(errorHandle(err));
      closeAction();
    }
  }

  if (!previewMode && (!experiences || experiences?.length === 0)) {
    return (
      <>
        <TextHelp>
          This is a snapshot of where you&apos;ve worked. Add as many as you
          like.
        </TextHelp>
        <AddButton onClick={() => openJobExperienceModal()}>
          {profileT('add')}
        </AddButton>
      </>
    );
  }

  return (
    <>
      {deleteExperienceShow && (
        <DeleteDialog
          type="warning"
          title={modalsT('volunteer_experience.delete_title')}
          description={modalsT('volunteer_experience.delete_description')}
          warnDescription={modalsT('volunteer_experience.delete_warn')}
          onCancel={() => setDeleteExperienceShowed(false)}
          onConfirm={deleteExperience}
          loading={deleteExperienceLoading}
          isCentered
        />
      )}
      {experiences?.length &&
        experiences.map((item, index) => (
          <SummaryCardWrapper key={item.id}>
            <SummaryCard
              title={item.company}
              lines={[
                item.occupation,
                `${monthYearToString(item.periodFrom, monthsT)} - ${
                  item.periodTo
                    ? monthYearToString(item.periodTo, monthsT)
                    : modalsT('job_experience.current_job')
                }`,
              ]}
              hasBorder={false}
              last={experiences?.length === index + 1}
            />
            {!previewMode && (
              <EditArea>
                <EditIconWrapper
                  onClick={() => deleteExperienceAction(item.id)}
                >
                  <Icon name="delete_outline" />
                </EditIconWrapper>
                <EditIconWrapper onClick={() => openJobExperienceModal(index)}>
                  <Icon name="edit_outline" />
                </EditIconWrapper>
              </EditArea>
            )}
          </SummaryCardWrapper>
        ))}

      {!previewMode && (
        <AddButton onClick={() => openJobExperienceModal()}>
          {profileT('add')}
        </AddButton>
      )}
    </>
  );
};

export default EditableExperience;

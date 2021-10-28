import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import EducationService from '@api/services/education';

import ModalEducation from '@components/templates/Modals/Education';
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
 * Group Education with Actions
 */
const EditableEducation = () => {
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

  const { education, previewMode } = profileState;

  const [deleteEducationShow, setDeleteEducationShowed] = useState(false);
  const [deleteEducationLoading, setDeleteEducationLoading] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState(null);

  function openEducationModal(index) {
    return appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalEducation,
      props: { EducationIndex: index },
    });
  }

  function removeEducationFromState() {
    return profileDispatch({
      type: 'REMOVE_EDUCATION',
      education: educationToDelete,
    });
  }

  const deleteEducationAction = id => {
    setEducationToDelete(id);
    return setDeleteEducationShowed(true);
  };

  async function deleteEducation() {
    const profileId = profileState.id;
    const educationId = educationToDelete;

    const closeAction = () => {
      setDeleteEducationShowed(false);
      setDeleteEducationLoading(false);
      setEducationToDelete(null);
    };

    try {
      setDeleteEducationLoading(true);
      await EducationService.deleteEducation(profileId, educationId);
      removeEducationFromState();
      showSuccess(modalsT('education.delete_success'));
      closeAction();
    } catch (err) {
      showError(errorHandle(err));
      closeAction();
    }
  }

  if (!previewMode && (!education || education?.length === 0)) {
    return (
      <>
        <TextHelp>
          Education is important, but so are life experiences and telling your
          story.
        </TextHelp>
        <AddButton onClick={() => openEducationModal()}>
          {profileT('add')}
        </AddButton>
      </>
    );
  }

  return (
    <>
      {deleteEducationShow && (
        <DeleteDialog
          type="warning"
          title={modalsT('volunteer_experience.delete_title')}
          description={modalsT('volunteer_experience.delete_description')}
          warnDescription={modalsT('volunteer_experience.delete_warn')}
          onCancel={() => setDeleteEducationShowed(false)}
          onConfirm={deleteEducation}
          loading={deleteEducationLoading}
          isCentered
        />
      )}
      {education?.length &&
        education.map((item, index) => (
          <SummaryCardWrapper key={item.id}>
            <SummaryCard
              title={item.degree}
              lines={[
                item.fieldOfStudy,
                item.institution,
                item.periodFrom === item.periodTo
                  ? `${monthYearToString(item.periodFrom, monthsT)}`
                  : `${monthYearToString(item.periodFrom, monthsT)} - ${
                      item.periodTo
                        ? monthYearToString(item.periodTo, monthsT)
                        : modalsT('education.current_education')
                    }`,
              ]}
              hasBorder={false}
              last={education?.length === index + 1}
            />

            {!previewMode && (
              <EditArea>
                <EditIconWrapper onClick={() => deleteEducationAction(item.id)}>
                  <Icon name="delete_outline" />
                </EditIconWrapper>
                <EditIconWrapper onClick={() => openEducationModal(index)}>
                  <Icon name="edit_outline" />
                </EditIconWrapper>
              </EditArea>
            )}
          </SummaryCardWrapper>
        ))}

      {!previewMode && (
        <AddButton onClick={() => openEducationModal()}>
          {profileT('add')}
        </AddButton>
      )}
    </>
  );
};

export default EditableEducation;

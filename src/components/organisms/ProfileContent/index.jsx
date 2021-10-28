import React, { useContext, useState } from 'react';
import arrayMove from 'array-move';

import ProfileService from '@api/services/profile';

import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';

import { useToast } from '@components/molecules/Notification';
import DeleteDialog from '@components/molecules/DeleteDialog';
import Btn from '@components/molecules/Btn';

import errorHandle from '@src/utils/error';

// MODALS
import ConfigContentModal from '@components/templates/Modals/ConfigContent';

import { Container, DividerContent } from './style';

import BtnGroup from '../BtnGroup';
import ContentCardList from '../ContentCardList';

function ProfileContent() {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const { id: profileId, previewMode, contents } = profileState;

  const [actionVisibility, setActionVisibility] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isOrganize, setIsOrganize] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  function handleOpenConfigContentModal() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ConfigContentModal,
    });
  }

  function showDeleteAction(id, type) {
    setSelectedContent({ id, type });
    setActionVisibility(true);
  }

  function handleDeleteContent({ id, type }) {
    showDeleteAction(id, type);
  }

  async function deleteContentFromProfile() {
    if (!selectedContent) return;

    const { id: contentId } = selectedContent;

    setSelectedContent(null);

    try {
      const response = await ProfileService.deleteContentFromProfile(
        profileId,
        contentId,
      );

      setActionVisibility(false);

      if (response.status === 200) {
        toast.add('Content removed from your profile', 'success');

        profileDispatch({
          type: 'SET_CONTENTS',
          contents: response.data.data,
        });
      }
    } catch (err) {
      setActionVisibility(false);
      showToast(errorHandle(err));
    }
  }

  function toggleOrganize() {
    setIsOrganize(state => !state);
  }

  function handleOnSortEndCb({ oldIndex, newIndex }) {
    profileDispatch({
      type: 'SET_CONTENTS',
      contents: arrayMove(contents, oldIndex, newIndex),
    });
  }

  async function orderContents() {
    setLoading(true);

    const contentIds = contents.map(content => content.id);
    const payload = {
      contents: contentIds,
    };

    try {
      const response = await ProfileService.orderContents(profileId, payload);

      profileDispatch({
        type: 'SET_CONTENTS',
        contents: response.data.data,
      });
      showSuccess('The contents were organized');
    } catch (err) {
      showToast(errorHandle(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleClickOrganize() {
    if (!loading) {
      toggleOrganize();
    }

    if (isOrganize) {
      await orderContents();
    }
  }

  return (
    <Container data-tut="reactour__content" className="contentTabWrap">
      {actionVisibility && (
        <DeleteDialog
          type="warning"
          title="Oops?"
          description="Are you sure you want to delete this content from your profile?"
          warnDescription="You can add it again if you want"
          onCancel={() => setActionVisibility(false)}
          onConfirm={() => deleteContentFromProfile()}
          isLoading={false}
        />
      )}

      {!previewMode && (
        <>
          <BtnGroup>
            <Btn
              label="Select Your Library"
              startIcon="plus"
              rounded="lg"
              variant="outlinePrimary"
              handleClick={handleOpenConfigContentModal}
              disabled={isOrganize}
            />
            <Btn
              label={isOrganize ? 'Done' : 'Organize'}
              startIcon={isOrganize ? 'checkStroke' : 'widget'}
              rounded="lg"
              variant={isOrganize ? 'solidPrimary' : 'outlinePrimary'}
              handleClick={handleClickOrganize}
              loading={loading}
              disabled={contents?.length <= 1}
            />
          </BtnGroup>
          <DividerContent />
        </>
      )}

      {!!contents?.length && (
        <ContentCardList
          list={contents}
          onDeleteContent={handleDeleteContent}
          isOrganize={isOrganize}
          onSortEndCb={handleOnSortEndCb}
        />
      )}
    </Container>
  );
}

export default ProfileContent;

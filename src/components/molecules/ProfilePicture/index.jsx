import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import cookie from 'js-cookie';

import { CircleIconButton } from '@assets/styles/helpers';
import IconSVG from '@components/atoms/IconSVG';
import ProfileContext from '@context/profileContext';
import AssetService from '@api/services/asset';
import AppContext from '@context/appContext';
import { sizes } from '@assets/styles/medias';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import loadable from '@loadable/component';
import { convertToMb } from '@utils/general';
import ProfileService from '@api/services/profile';
import errorHandle from '@src/utils/error';
import FileUploadModal from '@components/molecules/FileUploadModal';
import useMedia from '@src/hooks/useMedia';

import DeleteDialog from '@components/molecules/DeleteDialog';

import Avatar from '../Avatar';
import { useToast } from '../Notification';
import {
  ImageContent,
  ImageWrapper,
  EditLayer,
  TakePhotoWrapper,
} from './style';

const ReactFilestack = loadable(() => import('filestack-react'), {
  ssr: false,
});

export const ProfilePicture = () => {
  const [FSKey, setFSKey] = useState(null);
  const [FSPolicy, setFSPolicy] = useState(null);
  const [FSSignature, setFSSignature] = useState(null);
  const [FSPath, setFSPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const isMobile = useMedia(`(max-width: ${sizes.mediumphone})`);

  const { t: toastT } = useTranslation('profile_picture');
  const { t: profileT } = useTranslation('profile');

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const { personalInfo, photo, previewMode } = profileState || {};

  const avatarUrl = (photo && photo.mediaUrl) || null;
  //const avatarUrl = (photo && photo.url) || null;
  const userName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  const optionsUpload = {
    accept: 'image/*',
    // imageDim: [800, 800],
    transformations: {
      circle: true,
      rotate: true,
      force: true,
      crop: false,
    },
    maxFiles: 1,
    maxSize: convertToMb(10),
    storeTo: {
      path: FSPath,
    },
    onOpen: () => {
      appDispatch({ type: 'HIDE_TOUR' });
    },
    onClose: () => {
      goToNextStepAndShow(appDispatch);
    },
    onCancel: () => {
      goToNextStepAndShow(appDispatch);
    },
  };

  const assetAuthData = async () => {
    if (!previewMode) {
      const { data } = await AssetService.getAuth();
      const { key, policy, signature, path } = data.data.params;

      setFSKey(key);
      setFSPolicy(policy);
      setFSSignature(signature);
      setFSPath(path);
    }
  };

  useEffect(() => {
    assetAuthData();
  }, []);

  function closeModal() {
    setShowUploadModal(false);
    const body = document.querySelector('body');
    body.className -= 'overflow_hide';
  }
  const savePhotoProfile = async data => {
    const { id } = data.data;
    const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);

    try {
      if (profileId && id) {
        const response = await ProfileService.setPhoto(profileId, {
          photoId: id,
        });

        if (response) {
          const { photo: photoResponse } = response.data.data;

          profileDispatch({
            type: 'SET_PHOTO',
            photo: photoResponse,
          });
          showSuccess(toastT('success'));
        }
      }
      setIsLoading(false);
      closeModal();
    } catch (e) {
      showError(errorHandle(e));
      setIsLoading(false);
    }
  };

  const onUploadSuccess = async res => {
    console.log('hellovasent', res);
    setIsLoading(true);
    try {
      if (res) {
        const response = await AssetService.createAsset(res);
        const { data } = response;
        savePhotoProfile(data);
      } else {
        profileDispatch({
          type: 'SET_PHOTO',
          photo: null,
        });
        setIsLoading(false);
      }
      // const { filesUploaded } = res;

      // if (filesUploaded) {
      //   const { url } = filesUploaded[0];
      //   const response = await AssetService.createAsset(url);
      //   const { data } = response;
      //   savePhotoProfile(data);
      // } else {
      //   profileDispatch({
      //     type: 'SET_PHOTO',
      //     photo: null,
      //   });
      //   setIsLoading(false);
      // }
    } catch (e) {
      showError(errorHandle(e));
      setIsLoading(false);
    }
  };

  const deletePhotoProfile = async () => {
    try {
      setDeleteLoading(true);
      const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);

      await ProfileService.setPhoto(profileId, {
        photoId: null,
      });

      profileDispatch({
        type: 'SET_PHOTO',
        photo: null,
      });

      showSuccess(toastT('delete_success'));
      setDeleteAlert(false);

      setDeleteLoading(false);
    } catch (e) {
      showError(errorHandle(e));
      setDeleteLoading(false);
    }
  };

  const bodyhidden = () => {
    const body = document.querySelector('body');
    body.className += ' overflow_hide';
  };

  return (
    <ImageContent data-tut="reactour__avatar">
      {deleteAlert && (
        <DeleteDialog
          type="warning"
          title="Oops?"
          href="/profile"
          description={profileT('sidebar.avatar.remove.description')}
          onCancel={() => setDeleteAlert(false)}
          onConfirm={() => deletePhotoProfile()}
          isLoading={deleteLoading}
          isCentered
        />
      )}
      {showUploadModal && (
        <FileUploadModal closeModal={closeModal} onSuccess={onUploadSuccess} />
      )}
      <ImageWrapper>
        <Avatar image={avatarUrl} size="responsive" name={userName} />
        {!previewMode && (
          <EditLayer>
            {/* {FSKey && FSPolicy && FSSignature && FSPath && (
              <ReactFilestack
                apikey={FSKey}
                clientOptions={{
                  security: {
                    policy: FSPolicy,
                    signature: FSSignature,
                  },
                  sessionCache: true,
                }}
                actionOptions={optionsUpload}
                componentDisplayMode={{
                  type: 'immediate',
                }}
                customRender={({ onPick }) => (
                  <CircleIconButton onClick={onPick}>
                    <IconSVG name="photo" loading={isLoading} size={16} />
                  </CircleIconButton>
                )}
                onSuccess={onUploadSuccess}
              />
            )} */}
            {!avatarUrl && (
              <TakePhotoWrapper onClick={bodyhidden} noCover={!avatarUrl}>
                <CircleIconButton
                  onClick={setShowUploadModal}
                  size={!avatarUrl && !isMobile ? 'sm' : 'sm'}
                >
                  <IconSVG
                    name="photo"
                    loading={isLoading}
                    size={!avatarUrl && !isMobile ? 32 : 16}
                  />
                </CircleIconButton>
              </TakePhotoWrapper>
            )}
            {avatarUrl && (
              <TakePhotoWrapper
                className="profileImageAction"
                noCover={avatarUrl}
              >
                <CircleIconButton
                  onClick={setShowUploadModal}
                  size={!avatarUrl && !isMobile ? 'sm' : 'sm'}
                >
                  <IconSVG
                    name="photo"
                    loading={isLoading}
                    size={!avatarUrl && !isMobile ? 32 : 16}
                  />
                </CircleIconButton>
                <CircleIconButton onClick={() => setDeleteAlert(true)}>
                  <IconSVG name="trash" size={16} />
                </CircleIconButton>
              </TakePhotoWrapper>
            )}
          </EditLayer>
        )}
      </ImageWrapper>
    </ImageContent>
  );
};

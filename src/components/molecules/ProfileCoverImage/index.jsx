import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cookie from 'js-cookie';

import AssetService from '@api/services/asset';
import ProfileService from '@api/services/profile';
import { CircleIconButton } from '@assets/styles/helpers';
import { sizes } from '@assets/styles/medias';
import IconSVG from '@components/atoms/IconSVG';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import loadable from '@loadable/component';
import errorHandle from '@src/utils/error';
import { convertToMb } from '@utils/general';
import DeleteDialog from '@components/molecules/DeleteDialog';
import FileUploadModal from '@components/molecules/FileUploadModal';

import useMedia from '@src/hooks/useMedia';
import { useToast } from '../Notification';
import { CoverImage, EditLayer, ImageContent, TakePhotoWrapper } from './style';

const ReactFilestack = loadable(() => import('filestack-react'), {
  ssr: false,
});

export const ProfileCoverImage = () => {
  const [FSKey, setFSKey] = useState(null);
  const [FSPolicy, setFSPolicy] = useState(null);
  const [FSSignature, setFSSignature] = useState(null);
  const [FSPath, setFSPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { dispatch: appDispatch } = useContext(AppContext);

  const isMobile = useMedia(`(max-width: ${sizes.mediumphone})`);

  const { t: toastT } = useTranslation('cover_image');
  const { t: profileT } = useTranslation('profile');

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const { state: appState } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );
  const { coverAsset, previewMode } = profileState || {};
  const coverUrl = coverAsset?.mediaUrl;
  // const coverUrl =
  //   (coverAsset?.path &&
  //     coverAsset?.path[
  //       appState.screenWidth <= parseInt(sizes.mediumphone, 10)
  //         ? 'smallThumbnail'
  //         : 'thumbnail'
  //     ]) ||
  //   null;

  const optionsUpload = {
    accept: 'image/*',
    transformations: {
      crop: {
        aspectRatio: 1130 / 283,
        force: true,
      },
    },
    maxFiles: 1,
    maxSize: convertToMb(10),
    storeTo: {
      path: FSPath,
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
  const saveCoverImage = async data => {
    const { id } = data.data;
    const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);

    try {
      if (profileId && id) {
        const response = await ProfileService.setCoverImage(profileId, {
          coverAsset: id,
        });

        if (response) {
          const { coverAsset: coverResponse } = response.data.data;

          profileDispatch({
            type: 'SET_COVER_IMAGE',
            coverAsset: coverResponse,
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
    setIsLoading(true);
    try {
      if (res) {
        const response = await AssetService.createAsset(res);
        const { data } = response;
        saveCoverImage(data);
      } else {
        profileDispatch({
          type: 'SET_COVER_IMAGE',
          coverAsset: null,
        });
        setIsLoading(false);
      }
      // const { filesUploaded } = res;

      // if (filesUploaded?.length) {
      //   const { url } = filesUploaded[0];
      //   const response = await AssetService.createAsset(url);
      //   const { data } = response;
      //   saveCoverImage(data);
      // } else {
      //   profileDispatch({
      //     type: 'SET_COVER_IMAGE',
      //     coverAsset: null,
      //   });
      //   setIsLoading(false);
      // }
    } catch (e) {
      showError(errorHandle(e));
      setIsLoading(false);
    }
  };

  const bodyhidden = () => {
    const body = document.querySelector('body');
    body.className += ' overflow_hide';
  };

  const deleteCoverImage = async () => {
    try {
      setDeleteLoading(true);
      const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);

      await ProfileService.setCoverImage(profileId, {
        photoId: null,
      });

      profileDispatch({
        type: 'SET_COVER_IMAGE',
        coverAsset: null,
      });

      showSuccess(toastT('delete_success'));
      setDeleteAlert(false);

      setDeleteLoading(false);
    } catch (e) {
      showError(errorHandle(e));
      setDeleteLoading(false);
    }
  };
  return (
    <ImageContent>
      {deleteAlert && (
        <DeleteDialog
          type="warning"
          title="Oops?"
          description={profileT('sidebar.avatar.remove.description')}
          onCancel={() => setDeleteAlert(false)}
          onConfirm={() => deleteCoverImage()}
          isLoading={deleteLoading}
          isCentered
        />
      )}
      {showUploadModal && (
        <FileUploadModal closeModal={closeModal} onSuccess={onUploadSuccess} />
      )}
      <CoverImage>
        {coverUrl && <img src={coverUrl} alt="Cover" />}

        {!previewMode && (
          <EditLayer fullSize={!coverUrl}>
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
                // customRender={({ onPick }) => (
                //   <TakePhotoWrapper noCover={!coverUrl}>
                //     <CircleIconButton
                //       onClick={onPick}
                //       size={!coverUrl && !isMobile ? 'md' : 'sm'}
                //     >
                //       <IconSVG
                //         name="photo"
                //         loading={isLoading}
                //         size={!coverUrl && !isMobile ? 32 : 16}
                //       />
                //     </CircleIconButton>
                //   </TakePhotoWrapper>
                // )}
                onSuccess={onUploadSuccess}
              />
            )} */}
            {!coverUrl && (
              <TakePhotoWrapper onClick={bodyhidden} noCover={!coverUrl}>
                <CircleIconButton
                  onClick={setShowUploadModal}
                  size={!coverUrl && !isMobile ? 'md' : 'sm'}
                >
                  <IconSVG
                    name="photo"
                    loading={isLoading}
                    size={!coverUrl && !isMobile ? 32 : 16}
                  />
                </CircleIconButton>
              </TakePhotoWrapper>
            )}
            {coverUrl && (
              <TakePhotoWrapper className="profileImageAction">
                <CircleIconButton
                  onClick={setShowUploadModal}
                  size={!coverUrl && !isMobile ? 'md' : 'sm'}
                >
                  <IconSVG
                    name="photo"
                    loading={isLoading}
                    size={!coverUrl && !isMobile ? 32 : 16}
                  />
                </CircleIconButton>
                <CircleIconButton onClick={() => setDeleteAlert(true)}>
                  <IconSVG name="trash" size={16} />
                </CircleIconButton>
              </TakePhotoWrapper>
            )}
          </EditLayer>
        )}
      </CoverImage>
    </ImageContent>
  );
};

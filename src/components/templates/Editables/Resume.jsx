import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import styled from 'styled-components';

import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';

import ProfileService from '@api/services/profile';
import AssetService from '@api/services/asset';

import PreviewPDF from '@components/templates/Modals/PreviewPDF';

import DropArea from '@components/atoms/DropArea';
import Icon from '@components/atoms/Icon';
import Loader from '@components/atoms/Loader';

import { useToast, Action } from '@components/molecules/Notification';
import errorHandle from '@src/utils/error';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import { Primary } from '@assets/styles/colors';
import { convertToMb, handleIconName } from '@utils/general';

import {
  EditArea,
  EditIconWrapper,
  DropAreaContainer,
  DocumentWrapper,
  DocumentIcon,
  DocumentName,
} from './style';

const EditIconWrapperMod = styled(EditIconWrapper)`
  color: ${Primary};
`;

const ReactFilestack = loadable(() => import('filestack-react'), {
  ssr: false,
});

/**
 * Group Resume with Actions
 */
const EditableResume = () => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const { t: resumeT } = useTranslation('resume');
  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const [FSKey, setFSKey] = useState(null);
  const [FSPolicy, setFSPolicy] = useState(null);
  const [FSSignature, setFSSignature] = useState(null);
  const [FSPath, setFSPath] = useState(null);

  const [loadingUploadFile, setLoadingUploadFile] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastLoading, setToastLoading] = useState(false);

  const { resume } = profileState;

  const options = {
    accept: ['.pdf', '.doc', '.docx'],
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

  function previewResume(path) {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: PreviewPDF,
      props: { path, title: 'Resume' },
    });
  }

  const deleteResume = async () => {
    const profileId = profileState.id;

    try {
      setToastLoading(true);
      const responseResume = await ProfileService.setResume(profileId, {
        resumeId: null,
      });
      const resumeDataProfile = responseResume.data.data.resume;

      profileDispatch({
        type: 'SET_RESUME',
        resume: resumeDataProfile,
      });

      showSuccess(resumeT('success'));
      setToastLoading(false);
      setShowToast(false);
    } catch (err) {
      setToastLoading(false);
      showError(errorHandle(err));
    }
  };

  const saveResume = async fileData => {
    const profileId = profileState.id;
    const { filesUploaded, filesFailed } = fileData;

    try {
      if (filesUploaded?.length) {
        setLoadingUploadFile(true);

        const { url } = filesUploaded[0];
        const response = await AssetService.createAsset(url);
        const { data } = response;
        const { id } = data.data;
        const responseResume = await ProfileService.setResume(profileId, {
          resumeId: id,
        });
        const resumeDataProfile = responseResume.data.data.resume;

        profileDispatch({
          type: 'SET_RESUME',
          resume: resumeDataProfile,
        });

        showSuccess(resumeT('success'));
        setLoadingUploadFile(false);
      } else if (filesFailed?.length) {
        const [{ filename }] = filesFailed;
        showError(`${filename} file upload failed`);
      } else {
        setLoadingUploadFile(false);
      }
    } catch (err) {
      setLoadingUploadFile(false);
      showError(errorHandle(err));
    }
  };

  const assetAuthData = async () => {
    const { data } = await AssetService.getAuth();
    const { key, policy, signature, path } = data.data.params;

    setFSKey(key);
    setFSPolicy(policy);
    setFSSignature(signature);
    setFSPath(path);
  };

  useEffect(() => {
    assetAuthData();
  }, []);

  if (!resume) {
    return (
      <>
        {FSKey && FSPolicy && FSSignature ? (
          <ReactFilestack
            apikey={FSKey}
            clientOptions={{
              security: {
                policy: FSPolicy,
                signature: FSSignature,
              },
              sessionCache: true,
            }}
            actionOptions={options}
            componentDisplayMode={{
              type: 'immediate',
            }}
            customRender={({ onPick }) => (
              <DropArea
                onPick={onPick}
                description={resumeT('upload_description')}
                maxSize={options.maxSize}
                loading={loadingUploadFile}
                colorSchema="secondary"
              />
            )}
            onSuccess={saveResume}
          />
        ) : (
          <DropAreaContainer type="button">
            <Loader size="medium" theme="dark" />
          </DropAreaContainer>
        )}
      </>
    );
  }

  return (
    <>
      {showToast && (
        <Action
          type="warning"
          title={resumeT('delete.title')}
          description={resumeT('delete.description')}
          onCancel={() => setShowToast(false)}
          onConfirm={deleteResume}
          loading={toastLoading}
        />
      )}
      {resume && (
        <DocumentWrapper
          loading={loadingUploadFile ? 1 : 0}
          onClick={() => {
            previewResume(resume.path && resume.path.preview);
          }}
        >
          {loadingUploadFile ? (
            <Loader size="medium" theme="dark" />
          ) : (
            <>
              <DocumentIcon>
                <Icon name={handleIconName(resume)} />
              </DocumentIcon>
              <DocumentName>{resume.filename}</DocumentName>
            </>
          )}
        </DocumentWrapper>
      )}
      <EditArea>
        <EditIconWrapperMod onClick={() => setShowToast(true)}>
          <Icon name="delete_outline" />
        </EditIconWrapperMod>
        <>
          {FSKey && FSPolicy && FSSignature ? (
            <ReactFilestack
              apikey={FSKey}
              clientOptions={{
                security: {
                  policy: FSPolicy,
                  signature: FSSignature,
                },
                sessionCache: true,
              }}
              actionOptions={options}
              componentDisplayMode={{
                type: 'immediate',
              }}
              customRender={({ onPick }) => (
                <EditIconWrapperMod onClick={onPick}>
                  <Icon name="edit_outline" />
                </EditIconWrapperMod>
              )}
              onSuccess={saveResume}
            />
          ) : (
            <EditIconWrapperMod>
              <Icon name="edit_outline" />
            </EditIconWrapperMod>
          )}
        </>
      </EditArea>
    </>
  );
};

export default EditableResume;

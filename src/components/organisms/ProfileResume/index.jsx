import Btn from '@components/molecules/Btn';
import { Action, useToast } from '@components/molecules/Notification';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import loadable from '@loadable/component';
import { convertToMb } from '@utils/general';
import AssetService from '@api/services/asset';
import React, { useContext, useState, useEffect } from 'react';
import FileUploadModal from '@components/molecules/FileUploadModal';
import { useTranslation } from 'react-i18next';
import ProfileService from '@api/services/profile';
import errorHandle from '@src/utils/error';
import IconSVG from '@components/atoms/IconSVG';
import { sizes } from '@assets/styles/medias';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  Container,
  PreviewDoc,
  LeftArea,
  RightArea,
  PreviewActions,
  DeleteButton,
  IframeContainer,
} from './style';

const ReactFilestack = loadable(() => import('filestack-react'), {
  ssr: false,
});

function ProfileResume() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const { t: resumeT } = useTranslation('resume');
  const { t: buttonsT } = useTranslation('buttons');

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const [FSKey, setFSKey] = useState(null);
  const [FSPolicy, setFSPolicy] = useState(null);
  const [FSSignature, setFSSignature] = useState(null);
  const [FSPath, setFSPath] = useState(null);

  const [loadingUploadFile, setLoadingUploadFile] = useState(false);

  const [showDeletAlert, setShowDelectAlert] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { resume, previewMode } = profileState;
  const resumeThumbnail =
    resume?.path &&
    resume?.path[
      appState.screenWidth <= parseInt(sizes.mediumphone, 10)
        ? 'smallThumbnail'
        : 'thumbnail'
    ];

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
      // goToNextStepAndShow(appDispatch);
    },
    onCancel: () => {
      // goToNextStepAndShow(appDispatch);
    },
  };

  // For PDF thumbnail function
  function onDocumentLoadSuccess({ numPage }) {
    setNumPages(numPage);
    setPageNumber(1);
  }

  function closeFileModal() {
    setShowUploadModal(false);
  }

  const deleteResume = async () => {
    const profileId = profileState.id;

    try {
      setDeleteLoading(true);
      await ProfileService.setResume(profileId, {
        resumeId: null,
      });

      profileDispatch({
        type: 'SET_RESUME',
        resume: null,
      });

      showSuccess(resumeT('resumedelete'));
      setDeleteLoading(false);
      setShowDelectAlert(false);
    } catch (err) {
      setDeleteLoading(false);
      showError(errorHandle(err));
    }
  };

  const saveResume = async fileData => {
    const profileId = profileState.id;
    console.log('selected files', fileData);
    // const { filesUploaded, filesFailed } = fileData;
    try {
      if (fileData) {
        setLoadingUploadFile(true);

        // const { url } = filesUploaded[0];
        const response = await AssetService.createAsset(fileData);
        const { data } = response;
        console.log('data_Summary', data);
        const { id } = data.data;
        const responseResume = await ProfileService.setResume(profileId, {
          resumeId: id,
        });
        // console.log('responseResume____', responseResume);
        const resumeDataProfile = responseResume.data.data.resume;
        console.log('object', resumeDataProfile);
        profileDispatch({
          type: 'SET_RESUME',
          resume: resumeDataProfile,
        });

        showSuccess(resumeT('addresume'));
        setLoadingUploadFile(false);
        setShowUploadModal(false);
        console.log('success');
      } else {
        setLoadingUploadFile(false);
      }
    } catch (err) {
      setLoadingUploadFile(false);
      showError(errorHandle(err));
    }
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

  if (previewMode) {
    return (
      <IframeContainer>
        <iframe
          width="100%"
          height="100%"
          title="Preview Resume"
          // src={resume.path?.preview}
          src={resume?.resume.mediaUrl}
          frameBorder="0"
        />
      </IframeContainer>
    );
  }

  return (
    <Container data-tut="reactour__resume" className="resumetabwrap">
      {showDeletAlert && (
        <Action
          type="warning"
          title={resumeT('delete.title')}
          description={resumeT('delete.description')}
          onCancel={() => setShowDelectAlert(false)}
          onConfirm={deleteResume}
          loading={deleteLoading}
        />
      )}
      {resume && resume.path && (
        <LeftArea>
          <PreviewDoc>
            {/* <img src={resume.mediaUrl} alt="Profile Resume" /> */}
            <Document
              file={resume.mediaUrl}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>

            <PreviewActions>
              <DeleteButton
                size="md"
                variant="dark"
                onClick={() => setShowDelectAlert(true)}
              >
                <IconSVG name="trash" size={24} />
              </DeleteButton>

              <a
                /*href={resume.path.preview}*/ href={resume.mediaUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Btn variant="grey" label={buttonsT('click_view')} size="lg" />
              </a>
            </PreviewActions>
          </PreviewDoc>
        </LeftArea>
      )}

      {!previewMode && (
        <RightArea>
          {FSKey && FSPolicy && FSSignature && (
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
                <Btn
                  variant="outlinePrimary"
                  label={resumeT('upload_button')}
                  size="lg"
                  rounded="lg"
                  // handleClick={onPick}
                  handleClick={setShowUploadModal}
                  loading={loadingUploadFile}
                />
              )}
              onSuccess={saveResume}
            />
          )}
        </RightArea>
      )}
      {showUploadModal && (
        <FileUploadModal
          closeModal={closeFileModal}
          isDocument
          isVideo
          onSuccess={saveResume}
        />
      )}
    </Container>
  );
}

export default ProfileResume;

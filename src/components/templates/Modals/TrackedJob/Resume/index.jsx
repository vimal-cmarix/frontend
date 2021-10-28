import Btn from '@components/molecules/Btn';
import { Action, useToast } from '@components/molecules/Notification';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import PropTypes from 'prop-types';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import loadable from '@loadable/component';
import { convertToMb } from '@utils/general';
import AssetService from '@api/services/asset';
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileService from '@api/services/profile';
import errorHandle from '@src/utils/error';
import IconSVG from '@components/atoms/IconSVG';
import { sizes } from '@assets/styles/medias';
import { getCoverImage } from '@src/utils/presentation';
import cookie from 'js-cookie';
import useKeypress from '@src/hooks/useKeypress';

// Added package for PDF Thumbnail
import { Document, Page, pdfjs } from 'react-pdf';

import PresentationCard from '@components/molecules/PresentationCard';
import PrivateProfileJobModal from '@components/templates/Modals/PrivateProfileJob';
import ConfigPitch from '@components/templates/Modals/ConfigPitch';
import PrivatePitchJobModal from '@components/templates/Modals/PrivatePitchJob';
import PresentationService from '@api/services/presentation';
import BoardService from '@api/services/board';
import useOuterClick from '@hooks/useOuterClick';
import FileUploadModal from '@components/molecules/FileUploadModal';
import ModalBody from '../../ModalBody';
import {
  ContainerResume,
  PreviewDoc,
  LeftArea,
  RightArea,
  PreviewActions,
  DeleteButton,
  IframeContainer,
  UploadBtn,
  AddApplicationButton,
  AddApplicationWrapper,
  AddApplicationActionsWrapper,
  AddApplicationActionsTitle,
  AddApplicationActionsButtonWrapper,
  AddApplicationDropdownWrapper,
  AddApplicationHeader,
  ApplicationCardsWrapper,
  ApplicationCard,
  DropDownOption,
  ButtonDeleteProfile,
  ChangeApplicationTypeButton,
  DropDownContainer,
  ShareButton,
  ResumeTabBtn,
  PopupResumeWaper,
  PopupResumeInner,
  Container,
  ContainerApplication,
} from './style';

const ReactFilestack = loadable(() => import('filestack-react'), {
  ssr: false,
});

const Resume = ({
  isShowing,
  jobCardId,
  boardId,
  swimlaneId,
  jobCard,
  handleGetBoard,
  isDocument,
}) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );
  // PDF Thumbnail Worker
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);
  const { t: resumeT } = useTranslation('resume');
  const { t: buttonsT } = useTranslation('buttons');
  // const [isEditPitch, setIsEditPitch] = useState(true);
  const [cardDialogDelete, setCardDialogDelete] = useState(false);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  // const [loading, setLoading] = useState(false);
  const [FSKey, setFSKey] = useState(null);
  const [FSPolicy, setFSPolicy] = useState(null);
  const [FSSignature, setFSSignature] = useState(null);
  const [FSPath, setFSPath] = useState(null);

  const [resume, setResume] = useState(null);

  const [loadingUploadFile, setLoadingUploadFile] = useState(false);
  const [jobCardData, setJobCardData] = useState(jobCard);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [pitch, setPitch] = useState(null);
  const [showDeletAlert, setShowDelectAlert] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [revalidate, setRevalidate] = useState(false);
  const [isResume, setIsResume] = useState(true);
  const [applicationType, setApplicationType] = useState('');
  const [isDropdownDisplaying, setIsDropdownDisplaying] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [internalModal, setInternalModal] = useState(false);
  const [internalModalShow, setInternalModalShow] = useState(false);

  const { previewMode } = profileState;
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
      goToNextStepAndShow(appDispatch);
    },
    onCancel: () => {
      goToNextStepAndShow(appDispatch);
    },
  };

  // For PDF thumbnail function
  function onDocumentLoadSuccess({ numPage }) {
    setNumPages(numPage);
    setPageNumber(1);
  }

  const deleteResume = async () => {
    try {
      setDeleteLoading(true);
      await BoardService.setResume(jobCardId, {
        resumeId: null,
      });

      setResume(null);

      showSuccess(resumeT('success'));
      setDeleteLoading(false);
      setShowDelectAlert(false);
    } catch (err) {
      setDeleteLoading(false);
      showError(errorHandle(err));
    }
  };

  function downloadFile() {
    console.log('*********', resume);
    window.open(resume.url);
  }

  const saveResume = async fileData => {
    // const profileId = profileState.id;
    // const { filesUploaded, filesFailed } = fileData;
    try {
      if (fileData) {
        setLoadingUploadFile(true);

        // const { url } = filesUploaded[0];
        const response = await AssetService.createAsset(fileData);
        const { data } = response;
        const { id } = data.data;
        const responseResume = await BoardService.setResume(jobCardId, {
          resumeId: id,
        });
        setResume(responseResume.data.data.resume);
        // const resumeDataProfile = responseResume.data.data.resume;

        // profileDispatch({
        //   type: 'SET_RESUME',
        //   resume: resumeDataProfile,
        // });
        showSuccess(resumeT('success'));
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
    if (!resume) {
      const { data } = await AssetService.getAuth();
      const { key, policy, signature, path } = data.data.params;
      setFSKey(key);
      setFSPolicy(policy);
      setFSSignature(signature);
      setFSPath(path);
    }
  };

  async function handleGetResume() {
    const { data } = await BoardService.getResume(jobCardId);
    // const { resume } = data;
    setResume(data.resume);
    // console.log('----', data.resume);
    // setNotes(
    //   data.data.map(a => ({
    //     ...a,
    //     createdDate: formatDate(new Date(a.createdAt)),
    //   })),
    // );
  }

  useEffect(() => {
    if (isShowing) {
      assetAuthData();
      handleGetResume();
    }
  }, [isShowing]);

  useEffect(() => {
    async function getJobCardData() {
      // setLoading(true);
      const { data } = await BoardService.showJobCard(
        boardId,
        swimlaneId,
        jobCardId,
      );

      // setLoading(false);
      // console.log('------->', data.data);
      setJobCardData(data.data);
      setPitch(data.data.presentation);
      setCurrentProfile(data.data.profile);

      data.data.profile && setApplicationType('profile');
      data.data.presentation && setApplicationType('pitch');
    }
    getJobCardData();
  }, [revalidate]);

  const handleRemove = async () => {
    if (currentProfile) {
      await BoardService.deleteApplication(jobCardId);
      setCurrentProfile(null);
      setApplicationType('');
      setIsDropdownDisplaying(false);
      setCardDialogDelete(false);
    } else {
      await BoardService.deleteApplication(jobCardId);
      setPitch(null);
      setCurrentProfile(null);
      setApplicationType('');
      setIsDropdownDisplaying(false);
      setCardDialogDelete(false);
    }
  };

  const changeToTracked = async () => {
    await BoardService.changeJobCardType(boardId, swimlaneId, jobCardId, {
      tracked: true,
    });
    if (handleGetBoard) handleGetBoard();
    setRevalidate(true);
  };

  const handleRemovePitch = async () => {
    setCardDialogDelete(true);
  };

  const handleSwitchToProfileApplicationType = async () => {
    const response = await BoardService.updateApplication(jobCardId, {
      profileId,
      presentationId: null,
    });

    setCurrentProfile(response.data.data.profile);
    setPitch(null);
    setApplicationType('profile');
    setIsDropdownDisplaying(false);
  };

  function handleShare() {
    const props = {
      data: {
        shortUrl: jobCardData.shortUrl,
        secret: jobCardData.secret,
        type: pitch?.type,
      },
      privateData: true,
      showClose: true,
      onClose: () => setInternalModalShow(false),
    };
    if (applicationType === 'pitch')
      setInternalModal(<PrivatePitchJobModal {...props} />);
    else setInternalModal(<PrivateProfileJobModal {...props} />);
    setInternalModalShow(true);
  }

  const dropMenuRef = useOuterClick(() => {
    if (isDropdownDisplaying) {
      setIsDropdownDisplaying(false);
    }
  });

  const handleDropdownTriggerClicked = () => {
    setIsDropdownDisplaying(!isDropdownDisplaying);
  };

  const handleSelectPitch = async () => {
    setInternalModal(
      <ConfigPitch
        setInternalModalShow={setInternalModalShow}
        isMultiply={false}
        jobCardId={jobCardId}
        boardId={boardId}
        // isEditPitch
        onSave={async dataPitch => {
          const currentPitch = await PresentationService.getById(
            dataPitch.pitches[0],
          );
          setPitch(currentPitch.data.data);
          setCurrentProfile(null);
          setApplicationType('pitch');
          if (jobCardData?.presentation) {
            await BoardService.updateApplication(jobCardId, {
              presentationId: dataPitch.pitches[0],
              profileId: null,
            });
          } else {
            await BoardService.createApplication(jobCardId, {
              presentationId: dataPitch.pitches[0],
              profileId: null,
            });
          }
        }}
        onClose={() => setInternalModalShow(false)}
      />,
    );
    setIsDropdownDisplaying(false);
    setInternalModalShow(true);
    // if (pitch) {
    //   setApplicationType('pitch');
    // }
    // setApplicationType('pitch');
  };

  const handleSelectProfile = async () => {
    const { data } = await ProfileService.getProfile(profileId);
    setPitch(null);
    setCurrentProfile(data.data);

    if (jobCardData?.profile) {
      await BoardService.updateApplication(jobCardId, {
        profileId: data.data.id,
      });
    } else {
      await BoardService.createApplication(jobCardId, {
        profileId: data.data.id,
      });
    }

    setIsDropdownDisplaying(false);
  };

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function toggleInternalModal(state) {
    setInternalModalShow(state);
  }

  useKeypress(
    'Escape',
    () => {
      if (internalModalShow) setInternalModalShow(false);
      else closeModal();
    },
    [internalModalShow],
  );

  if (previewMode) {
    return (
      <IframeContainer isShowing={isShowing}>
        <iframe
          width="100%"
          height="100%"
          title="Preview Resume"
          src={resume.path?.preview}
          frameBorder="0"
        />
      </IframeContainer>
    );
  }

  function closeFileModal() {
    setShowUploadModal(false);
  }

  return (
    // <Container disabled={disabledPage}>
    <>
      <ResumeTabBtn isShowing={isShowing}>
        <Btn
          isShowing={isShowing}
          variant={`${isResume ? 'solidPrimary' : 'outlinePrimary'}`}
          label={buttonsT('resume')}
          handleClick={() => setIsResume(true)}
          loading={loadingUploadFile}
          className="resume_btn"
        />
        <Btn
          isShowing={isShowing}
          variant={`${!isResume ? 'solidPrimary' : 'outlinePrimary'}`}
          label={buttonsT('application')}
          handleClick={() => setIsResume(false)}
          loading={loadingUploadFile}
        />
      </ResumeTabBtn>
      {isResume && (
        <PopupResumeWaper>
          <ContainerResume isShowing={isShowing} data-tut="reactour__resume">
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
            <PopupResumeInner>
              {/* {resume && resume.path && ( */}
              <LeftArea>
                <PreviewDoc className={`${resume ? 'resumePreview' : ''}`}>
                  {resume && resume.path && (
                    <div
                      style={{
                        height: '425px',
                      }}
                    >
                      <Document
                        file={resume.mediaUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} />
                      </Document>
                    </div>
                    // <img src={resumeThumbnail} alt="Resume" />
                  )}
                  <PreviewActions
                    className={`${resume ? 'resumePreview' : ''}`}
                  >
                    {resume && resume.path && (
                      <>
                        <DeleteButton
                          size="sm"
                          variant="dark"
                          onClick={() => setShowDelectAlert(true)}
                        >
                          <IconSVG name="trash" size={14} />
                        </DeleteButton>
                        <a
                          href={resume.mediaUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Btn
                            variant="grey"
                            label={buttonsT('click_view')}
                            size="lg"
                          />
                        </a>
                      </>
                    )}
                    {!resume && FSKey && FSPolicy && FSSignature && (
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
                          <>
                            <UploadBtn className="resumeUploadBtn">
                              <IconSVG name="upload" />
                              <Btn
                                // variant="outlinePrimary"
                                label={resumeT('upload_button')}
                                handleClick={setShowUploadModal}
                                // handleClick={onPick}
                                // size="lg"
                                // rounded="lg"
                                loading={loadingUploadFile}
                              />
                            </UploadBtn>
                          </>
                        )}
                        onSuccess={saveResume}
                      />
                    )}

                    {/* <a href={resume.path.preview} target="_blank" rel="noreferrer">
                  <Btn variant="grey" label={buttonsT('click_view')} size="lg" />
                </a> */}
                  </PreviewActions>
                </PreviewDoc>
              </LeftArea>
              {/* )} */}

              {!previewMode && (
                <RightArea>
                  {resume && FSKey && FSPolicy && FSSignature && (
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
                          variant="solidPrimary"
                          label={resumeT('change_button')}
                          size="sm"
                          rounded="sm"
                          handleClick={setShowUploadModal}
                          // handleClick={onPick}
                          loading={loadingUploadFile}
                        />
                      )}
                      onSuccess={saveResume}
                    />
                  )}
                </RightArea>
              )}
            </PopupResumeInner>
          </ContainerResume>
        </PopupResumeWaper>
      )}
      {showUploadModal && (
        <FileUploadModal
          closeModal={closeFileModal}
          isDocument
          isVideo
          onSuccess={saveResume}
        />
      )}
      {!isResume && (
        <>
          {cardDialogDelete && (
            <Action
              type="warning"
              title={resumeT('deleteApplication.title')}
              description={resumeT('deleteApplication.description')}
              onCancel={() => setCardDialogDelete(false)}
              onConfirm={handleRemove}
            />
          )}
          <ModalBody
            className="pitch-class"
            fitContent
            isUnPadding
            onCancel={closeModal}
            internalModal={internalModal}
            showInternalModal={internalModalShow}
            onCancelInternalModal={() => toggleInternalModal(false)}
          >
            <AddApplicationWrapper
              className="addPitchAppWrapper"
              isShowing={isShowing}
              setInternalModal={setInternalModal}
              setInternalModalShow={setInternalModalShow}
            >
              <AddApplicationHeader className="addPitchHeadBtn">
                <AddApplicationDropdownWrapper
                  isShowing={applicationType !== '' || currentProfile || pitch}
                >
                  <ChangeApplicationTypeButton
                    isShowing={
                      applicationType !== '' || currentProfile || pitch
                    }
                    className="changeApplicationTypeButton"
                    label="Change"
                    handleClick={handleDropdownTriggerClicked}
                  />
                  <ShareButton
                    isShowing={
                      applicationType !== '' || currentProfile || pitch
                    }
                    label="Share"
                    handleClick={handleShare}
                  />
                  {isDropdownDisplaying && (
                    <DropDownContainer ref={dropMenuRef}>
                      <DropDownOption
                        onClick={
                          applicationType === 'pitch'
                            ? handleSelectPitch
                            : handleSelectPitch
                        }
                      >
                        {applicationType === 'pitch'
                          ? 'Change Pitch'
                          : 'Switch to pitch'}
                        <IconSVG name="pitch" size={18} />
                      </DropDownOption>
                      <DropDownOption
                        onClick={
                          applicationType === 'pitch'
                            ? handleSwitchToProfileApplicationType
                            : handleRemove
                        }
                      >
                        {applicationType === 'pitch'
                          ? 'Switch to profile'
                          : 'Remove profile'}
                        <IconSVG name="profile" size={18} />
                      </DropDownOption>
                    </DropDownContainer>
                  )}
                </AddApplicationDropdownWrapper>
              </AddApplicationHeader>
              <ApplicationCardsWrapper
                isShowing={applicationType !== '' || currentProfile || pitch}
              >
                <ApplicationCard className="addPitchAppCard">
                  {pitch && (
                    <PresentationCard
                      showingInJobTracker
                      handleRemovePitch={handleRemovePitch}
                      image={getCoverImage(pitch)}
                      title={pitch.title}
                      created={pitch.createdAt}
                      type={pitch.type}
                      recipient={pitch.hiringName}
                      views={pitch.views}
                      showOptions
                      isDraft
                      data={pitch}
                      stylesPopOver="position: fixed;margin-top: 120px;margin-right: 20%;top:auto;right:auto;"
                    />
                  )}
                  {currentProfile && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <ButtonDeleteProfile
                        onClick={() => setCardDialogDelete(true)}
                      >
                        <IconSVG name="trash" />
                      </ButtonDeleteProfile>
                      {currentProfile.personalInfo.firstName}
                    </div>
                  )}
                </ApplicationCard>
              </ApplicationCardsWrapper>
              <AddApplicationActionsWrapper
                isShowing={applicationType === '' && !currentProfile && !pitch}
              >
                <AddApplicationActionsTitle>
                  Attach a profile or pitch!
                </AddApplicationActionsTitle>
                <AddApplicationActionsButtonWrapper>
                  <AddApplicationButton
                    className="addApplicationButton"
                    label="Add profile"
                    iconLeft="add"
                    handleClick={() => {
                      setApplicationType('profile');
                      handleSelectProfile();
                    }}
                  />

                  <AddApplicationButton
                    className="addApplicationButton"
                    label="Add pitch"
                    iconLeft="add"
                    handleClick={() => {
                      handleSelectPitch();
                    }}
                  />
                </AddApplicationActionsButtonWrapper>
              </AddApplicationActionsWrapper>
            </AddApplicationWrapper>
            {/* <AddApplicationWrapper
            isUntracked
            isShowing={!jobCardData.tracked && isShowing}
          >
            <AddApplicationActionsTitle>
              Change your mind?
            </AddApplicationActionsTitle>
            <AddApplicationActionsButtonWrapper>
              <AddApplicationButton
                className="addApplicationButton"
                label="Click here to attach your profile or a pitch and make this a tracked job card!"
                handleClick={changeToTracked}
              />
            </AddApplicationActionsButtonWrapper>
          </AddApplicationWrapper> */}
          </ModalBody>
        </>
      )}
    </>
    // </Container>
  );
};

Resume.propTypes = {
  isShowing: PropTypes.bool,
  jobCardId: PropTypes.bool.isRequired,
  boardId: PropTypes.string.isRequired,
  swimlaneId: PropTypes.string.isRequired,
  jobCard: PropTypes.shape({}),
  handleGetBoard: PropTypes.func.isRequired,
};

Resume.defaultProps = {
  isShowing: false,
  jobCard: {},
};

export default Resume;

import React, { useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import AppContext from '@context/appContext';

import IconSVG from '@components/atoms/IconSVG';
import PrivatePitchJobModal from '@components/templates/Modals/PrivatePitchJob';
import PrivateProfileJobModal from '@components/templates/Modals/PrivateProfileJob';
import ConfigPitch from '@components/templates/Modals/ConfigPitch';

import PresentationCard from '@components/molecules/PresentationCard';
import { getCoverImage } from '@src/utils/presentation';

import cookie from 'js-cookie';

import PresentationService from '@api/services/presentation';
import ProfileService from '@api/services/profile';
import BoardService from '@api/services/board';

import Loader from '@components/atoms/Loader';
import useKeypress from '@src/hooks/useKeypress';
import useOuterClick from '@hooks/useOuterClick';

import ModalBody from '../ModalBody';
import {
  TrackedJobHeader,
  TrackedJobTitleWrapper,
  TrackedJobTitle,
  TrackedJobCompanyName,
  TrackedJobNavbar,
  NavbarItem,
  AddApplicationButton,
  AddApplicationWrapper,
  AddApplicationTitle,
  NavbarLink,
  AddApplicationActionsWrapper,
  AddApplicationActionsTitle,
  AddApplicationActionsButtonWrapper,
  ChangeApplicationTypeButton,
  AddApplicationDropdownWrapper,
  AddApplicationHeader,
  DropDownContainer,
  DropDownOption,
  ApplicationCardsWrapper,
  ApplicationCard,
  CloseIconButtonWrapper,
  CloseIconButton,
  ContainerJobTracker,
  ShareButton,
  LoaderWrapper,
  Container,
  ButtonDeleteProfile,
} from './style';
import JobInfoForm from './JobInfoForm';
import Tasks from './Tasks';
import Resume from './Resume';
import Notes from './Notes';

/**
 * Tracked Job Modal
 */
const TrackedJob = ({
  jobCardId,
  boardId,
  swimlaneId,
  jobCard,
  addButtonAction,
  handleGetBoard,
}) => {
  const { dispatch } = useContext(AppContext);
  const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);

  const [jobCardData, setJobCardData] = useState(jobCard);
  const [loading, setLoading] = useState(false);
  const [pitch, setPitch] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentTab, setCurrentTab] = useState('job-info');
  const [applicationType, setApplicationType] = useState('');
  const [isDropdownDisplaying, setIsDropdownDisplaying] = useState(false);
  const [internalModal, setInternalModal] = useState(false);
  const [internalModalShow, setInternalModalShow] = useState(false);
  const [revalidate, setRevalidate] = useState(false);
  const [disabledPage, setDisabledPage] = useState(false);

  useEffect(() => {
    async function getJobCardData() {
      setLoading(true);
      const { data } = await BoardService.showJobCard(
        boardId,
        swimlaneId,
        jobCardId,
      );

      setLoading(false);

      setJobCardData(data.data);
      setPitch(data.data.presentation);
      setCurrentProfile(data.data.profile);

      data.data.profile && setApplicationType('profile');
      data.data.presentation && setApplicationType('pitch');
    }
    getJobCardData();
  }, [revalidate]);

  const tabs = useMemo(
    () => [
      { label: 'Job Info', link: 'job-info' },
      { label: 'Tasks', link: 'tasks' },
      { label: 'Notes', link: 'notes' },
      { label: 'Resume', link: 'resume' },
    ],
    [],
  );

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
        onSave={async dataPitch => {
          const currentPitch = await PresentationService.getById(
            dataPitch.pitches[0],
          );
          setPitch(currentPitch.data.data);
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
    setApplicationType('pitch');
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

  const changeToTracked = async () => {
    await BoardService.changeJobCardType(boardId, swimlaneId, jobCardId, {
      tracked: true,
    });
    if (handleGetBoard) handleGetBoard();
    setRevalidate(true);
  };

  const handleRemoveProfile = async () => {
    await BoardService.deleteApplication(jobCardId);
    setCurrentProfile(null);
    setApplicationType('');
    setIsDropdownDisplaying(false);
  };

  const handleRemovePitch = async () => {
    await BoardService.deleteApplication(jobCardId);
    setPitch(null);
    setCurrentProfile(null);
    setApplicationType('');
    setIsDropdownDisplaying(false);
  };

  const handleTabChanged = selectedTab => {
    setCurrentTab(selectedTab);
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

  function closeModal() {
    dispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function toggleInternalModal(state) {
    setInternalModalShow(state);
  }

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

  useKeypress(
    'Escape',
    () => {
      if (internalModalShow) setInternalModalShow(false);
      else closeModal();
    },
    [internalModalShow],
  );

  return (
    <Container disabled={disabledPage}>
      <ModalBody
        fitContent
        isUnPadding
        onCancel={closeModal}
        internalModal={internalModal}
        showInternalModal={internalModalShow}
        onCancelInternalModal={() => toggleInternalModal(false)}
      >
        <ContainerJobTracker>
          <CloseIconButtonWrapper>
            <CloseIconButton onClick={closeModal}>
              <IconSVG name="close" size={44} />
            </CloseIconButton>
          </CloseIconButtonWrapper>

          <TrackedJobHeader>
            <TrackedJobTitleWrapper>
              <TrackedJobTitle>
                {jobCardData?.jobTitle || 'Job title'}
              </TrackedJobTitle>
              <TrackedJobCompanyName>
                {(jobCardData?.company?.name
                  ? jobCardData?.company?.name
                  : jobCardData?.company) || 'Company name'}
              </TrackedJobCompanyName>
            </TrackedJobTitleWrapper>
          </TrackedJobHeader>

          <TrackedJobNavbar>
            {tabs.map(tab => (
              <NavbarItem
                key={tab.link}
                onClick={() => handleTabChanged(tab.link)}
                isCurrentTab={currentTab === tab.link}
              >
                <NavbarLink>{tab.label}</NavbarLink>
              </NavbarItem>
            ))}
          </TrackedJobNavbar>

          <JobInfoForm
            jobCardId={jobCardId}
            boardId={boardId}
            swimlaneId={swimlaneId}
            setInternalModal={setInternalModal}
            setInternalModalShow={setInternalModalShow}
            isShowing={currentTab === 'job-info'}
            jobCardData={jobCardData}
            addButtonAction={addButtonAction}
            handleGetBoard={handleGetBoard}
          />
          <Tasks jobCardId={jobCardId} isShowing={currentTab === 'tasks'} />
          <Notes
            setInternalModal={setInternalModal}
            toogleInternalModal={toggleInternalModal}
            isShowing={currentTab === 'notes'}
            jobCardId={jobCardId}
            internalModalShow={internalModalShow}
            setDisabledPage={setDisabledPage}
          />
          <Resume
            jobCardId={jobCardId}
            boardId={boardId}
            swimlaneId={swimlaneId}
            jobCard={jobCard}
            handleGetBoard={handleGetBoard}
            isShowing={currentTab === 'resume'}
          />
        </ContainerJobTracker>
      </ModalBody>
    </Container>
  );
};

TrackedJob.propTypes = {
  jobCardId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  swimlaneId: PropTypes.string.isRequired,
  jobCard: PropTypes.shape({}),
  addButtonAction: PropTypes.func.isRequired,
  handleGetBoard: PropTypes.func.isRequired,
};

TrackedJob.defaultProps = {
  jobCard: {},
};

export default TrackedJob;

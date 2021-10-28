import React, { useContext, useState } from 'react';

import AppContext from '@context/appContext';

import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import TootipModalWrapper from '@components/molecules/TootipModalWrapper';
import Icon from '@components/atoms/Icon';
import CardJobTracked from '@components/molecules/CardJobTracked';

import { IconTracked } from '@assets/svgs/IconTracked';
import { IconUnTracked } from '@assets/svgs/IconUnTracked';
import ProfileContext from '@context/profileContext';

import {
  TitleJobTracked,
  TextJobInfo,
  ContainerCardsGrid,
  ShowDesktopMedium,
  CloseButtomMobile,
  Body,
} from './style';
import ModalBody from '../ModalBody';
import ModalNewJobTracker from '../NewJobTracker';

/**
 * Create job pre-modal
 */
const NewPreJob = ({ data }) => {
  const { state: profileState } = useContext(ProfileContext);
  const { dispatch: appDispatch } = useContext(AppContext);
  const [isModalInfo, setIsModalInfo] = useState(false);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
  }

  function closeInfo() {
    setIsModalInfo(false);
  }

  function handleCreate(tracked) {
    closeModal();
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalNewJobTracker,
      props: {
        data: { tracked, ...data },
      },
    });
  }

  return (
    <ModalBody
      isMobileFull={false}
      isCancelBackClick
      fitContent
      isUnPadding
      onCancel={closeModal}
    >
      <TootipModalWrapper visibled={isModalInfo} setVisible={setIsModalInfo}>
        <CloseButtomMobile onClick={closeInfo}>
          <Icon name="close" size="35" />
        </CloseButtomMobile>
        <TextJobInfo>
          1. What is a <span>Sizigi link</span>?
          <p>
            A Sizigi link refers to your profile or a customized job pitch with
            a unique URL
          </p>
        </TextJobInfo>
        <TextJobInfo>
          2. What is a <span>tracked job card</span>?
          <p>
            A tracked job card enables you to attach your profile or a
            customized job pitch so we can provide analytics and offer services
            like automated movement between lanes!
          </p>
        </TextJobInfo>
      </TootipModalWrapper>
      <Body>
        <TitleJobTracked>
          <p>
            Hey <span>{profileState.personalInfo?.firstName}</span>,
          </p>
          will you be using a Sizigi link for this job application?
        </TitleJobTracked>
        <ContainerCardsGrid columns={2} gap="0px">
          <CardJobTracked
            title="No."
            subTitle="Use an untracked job card"
            content="This option will create a job card with no option to attach a profile or custom job pitch link that is tracked."
            TrackedIcon={IconUnTracked}
            handleCreate={handleCreate}
          />
          <CardJobTracked
            title="Yes!"
            subTitle="Use a tracked job card"
            content="This option will create a job card with the option to attach a profile or custom job pitch link that is tracked!"
            TrackedIcon={IconTracked}
            tracked
            handleCreate={handleCreate}
          />
        </ContainerCardsGrid>
      </Body>
    </ModalBody>
  );
};

NewPreJob.propTypes = {};

NewPreJob.defaultProps = {};

export default NewPreJob;

import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import AppContext from '@context/appContext';
import Icon from '@components/atoms/Icon';

import {
  StudentsDesc2,
  DefaultModalContent,
  Title,
  CloseButton,
  Body,
  StudentsWrapper,
  StudentsTitle,
  StudentsEffect,
  StudentsDesc1,
  StudentsButtonWrapper,
} from '@components/templates/Modals/style';
import Btn from '@components/molecules/Btn';

/**
 * Over Presentations Modal
 */
const PrivateLinkModal = () => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const router = useRouter();

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function goToPresentations() {
    closeModal();
    router.push('/pricing');
  }

  return (
    <DefaultModalContent fitContent isOpened={appState.modal.isOpened}>
      <CloseButton onClick={closeModal}>
        <Icon name="close" />
      </CloseButton>
      <Body>
        <StudentsWrapper>
          <StudentsTitle>
            <Title>Upgrade your account</Title>
            <StudentsEffect />
          </StudentsTitle>
          <StudentsDesc1>
            Sorry, you cannot create any more presentations with your current
            plan...
          </StudentsDesc1>
          <StudentsDesc2>
            Receive additional presentations and intelligence on who is viewing
            your content by subscribing to one of our plans!
          </StudentsDesc2>
          <StudentsButtonWrapper onClick={goToPresentations}>
            <Btn label="Check it out!" variant="solidPrimary" />
          </StudentsButtonWrapper>
        </StudentsWrapper>
      </Body>
    </DefaultModalContent>
  );
};

export default PrivateLinkModal;

import React, { useContext } from 'react';

import AppContext from '@context/appContext';

import Icon from '@components/atoms/Icon';
import { Button } from '@components/molecules/Button';

import {
  DefaultModalContent,
  Body,
  CloseButton,
  StudentsWrapper,
  StudentsTitle,
  StudentsEffect,
  StudentsDesc1,
  StudentsDesc2,
  StudentsButtonWrapper,
} from './style';

const Students = () => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened}>
      <CloseButton onClick={closeModal}>
        <Icon name="close" />
      </CloseButton>
      <Body>
        <StudentsWrapper>
          <StudentsTitle>
            Special Discount
            <StudentsEffect />
          </StudentsTitle>
          <StudentsDesc1>
            Nice! You&#39;re eligible for a 2 month free Premium Plan provided
            by your University!
          </StudentsDesc1>
          <StudentsDesc2>
            After 2 months you can continue on this plan with a 50% off discount
          </StudentsDesc2>
          <StudentsButtonWrapper onClick={closeModal}>
            <Button label="Get Started" />
          </StudentsButtonWrapper>
        </StudentsWrapper>
      </Body>
    </DefaultModalContent>
  );
};

export default Students;

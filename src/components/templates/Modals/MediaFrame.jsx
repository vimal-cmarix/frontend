import React, { useContext, useRef } from 'react';
import AppContext from '@context/appContext';

import Icon from '@components/atoms/Icon';

import { Body, CloseButton, DefaultModalContent } from './style';

export default function MediaFrame({ html }) {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const frameRef = useRef(null);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  return (
    <DefaultModalContent fitContent isOpened={appState.modal.isOpened}>
      <CloseButton onClick={closeModal}>
        <Icon name="close" />
      </CloseButton>
      <Body>
        <div
          ref={frameRef}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </Body>
    </DefaultModalContent>
  );
}

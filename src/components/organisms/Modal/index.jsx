import React, { useState, useContext, useEffect, useCallback } from 'react';

import AppContext from '@context/appContext';

import { Container, RemoveBodyScroll } from './style';

/**
 * Modal will show a modal passed to state
 */
const Modal = () => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const [eventListener, setEventListener] = useState(false);

  const { component, isOpened, activeEscapeButton = true } = appState.modal;
  const isFullScreen = component && component.props.fullScreen;
  const isCancelBackClick = component && component.props.cancelBackClick;

  const handleKeyUp = useCallback(
    event => {
      switch (event.key) {
        case 'Escape':
          appDispatch({ type: 'SET_MODAL_CLOSED' });
          appDispatch({ type: 'RESET_TOUR' });
          appDispatch({ type: 'HIDE_TOUR' });
          appDispatch({
            type: 'SET_PAYMENT_SUCCESS',
            props: {
              show: false,
              type: '',
            },
          });
          break;

        default:
          break;
      }
    },
    [setEventListener],
  );

  useEffect(() => {
    if (activeEscapeButton) window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [eventListener, activeEscapeButton]);

  return (
    <>
      <Container
        onClick={() => {
          if (isCancelBackClick) appDispatch({ type: 'SET_MODAL_CLOSED' });
        }}
        isOpened={isOpened}
        isFullScreen={isFullScreen}
      >
        {component}
      </Container>

      {isOpened && <RemoveBodyScroll />}
    </>
  );
};

export default Modal;

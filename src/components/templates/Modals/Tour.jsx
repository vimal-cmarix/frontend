import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import Storage from '@utils/storage';

import ModalStudents from '@components/templates/Modals/StudentsDiscount';
import BtnGroup from '@components/organisms/BtnGroup';
import Btn from '@components/molecules/Btn';
import {
  DefaultModalContent,
  Subtitle,
  Body,
  Actions,
  Description,
} from './style';

const Tour = () => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);
  const { t: modalT } = useTranslation('modals');

  const startTour = () => {
    Storage.add(`tourStep`, 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    appDispatch({
      type: 'CHANGE_TOUR_STEP',
      currentStep: 0,
    });
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    appDispatch({ type: 'SHOW_TOUR' });
  };

  const skipOrFinish = () => {
    Storage.rm(`tourShow_${profileState.id}`);
    Storage.rm(`tourEnable`);
    appDispatch({ type: 'ENABLE_TOUR_TOOLTIP' });
    appDispatch({ type: 'HIDE_TOUR' });
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    const hasUniversity = Storage.get('hasUniversity');
    if (hasUniversity) {
      appDispatch({
        type: 'SET_MODAL_OPENED',
        component: ModalStudents,
      });
    }
  };

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened}>
      <Body>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ paddingRight: '24px' }}>
            <Subtitle>{modalT('tour.title')}</Subtitle>
            <Description>{modalT('tour.description')}</Description>
          </div>
        </div>
        <Actions left>
          <BtnGroup>
            <Btn
              label={modalT('tour.skip')}
              type="submit"
              size="sm"
              variant="outlinePrimary"
              handleClick={skipOrFinish}
            />
            <Btn
              label={modalT('tour.start')}
              type="submit"
              size="sm"
              variant="solidPrimary"
              handleClick={startTour}
            />
          </BtnGroup>
        </Actions>
      </Body>
    </DefaultModalContent>
  );
};

export default Tour;

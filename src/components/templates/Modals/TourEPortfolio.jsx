import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
// import ProfileContext from '@context/profileContext';
import Storage from '@utils/storage';

import { Button } from '@components/molecules/Button';
// import ModalStudents from '@components/templates/Modals/StudentsDiscount';
import {
  DefaultModalContent,
  Subtitle,
  Body,
  Actions,
  Description,
  LeftButtonWrapper,
} from './style';

/**
 * About Modal
 */
const TourEPortfolio = () => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  // const { state: profileState } = useContext(ProfileContext);
  const { t: modalT } = useTranslation('modals');

  const startTour = () => {
    Storage.add(`ePortfolioTourStep`, 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    appDispatch({
      type: 'CHANGE_EPORTFOLIO_TOUR_STEP',
      currentStep: 0,
    });
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    appDispatch({ type: 'SHOW_EPORTFOLIO_TOUR' });
  };

  // const skipOrFinish = () => {
  //   Storage.rm(`ePortfolioTourShow_${profileState.id}`);
  //   Storage.rm(`tourEnable`);
  //   appDispatch({ type: 'ENABLE_EPORTFOLIO_TOUR_TOOLTIP' });
  //   appDispatch({ type: 'HIDE_EPORTFOLIO_TOUR' });
  //   appDispatch({ type: 'SET_MODAL_CLOSED' });
  //   const hasUniversity = Storage.get('hasUniversity');
  //   if (hasUniversity) {
  //     appDispatch({
  //       type: 'SET_MODAL_OPENED',
  //       component: ModalStudents,
  //     });
  //   }
  // };

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened}>
      <Body>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ paddingRight: '24px' }}>
            <Subtitle>{modalT('eportfolio_tour.title')}</Subtitle>
            <Description>{modalT('eportfolio_tour.description')}</Description>
          </div>
          {/* <img src="/static/img/cubes.svg" width="96px" alt="Cubes" /> */}
        </div>
        <Actions left>
          <LeftButtonWrapper>
            <Button
              label={modalT('eportfolio_tour.start')}
              type="submit"
              size="small"
              handleClick={startTour}
            />
          </LeftButtonWrapper>
        </Actions>
      </Body>
    </DefaultModalContent>
  );
};

export default TourEPortfolio;

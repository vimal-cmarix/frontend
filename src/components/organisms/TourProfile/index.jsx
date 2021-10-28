import React, { useContext } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { sizes } from '@assets/styles/medias';
import loadable from '@loadable/component';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import Storage from '@utils/storage';

import { Typography } from '@assets/styles/typo';
import useMedia from '@src/hooks/useMedia';
import { Container, Content, Footer, LinkFooter } from './style';

const Tour = loadable(() => import('reactour'), { ssr: false });

/**
 * Tour will show a modal with the steps to filling the profile
 */
const TourProfile = () => {
  const { t: tourT } = useTranslation('tour');
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);
  const { isOpened, currentStep } = appState.tour;

  const disableBody = target => disableBodyScroll(target);
  const enableBody = target => enableBodyScroll(target);

  const { screenWidth } = appState;
  const isMobile = useMedia(`(max-width: ${sizes.tabletPortrait})`);

  const Helper = props => {
    const { content, current, gotoStep, totalSteps } = props;

    const proceedToNext = next => {
      Storage.add(`tourStep`, next);
      appDispatch({
        type: 'CHANGE_TOUR_STEP',
        currentStep: next,
      });
      gotoStep(next);
    };

    const nextStep = () => {
      const next = current + 1;

      if (content?.nextTab) {
        const tab = document.querySelector(content.nextTab);
        if (tab) tab.click();

        setTimeout(() => proceedToNext(next), 800);
      } else {
        proceedToNext(next);
      }
    };

    const skipOrFinish = () => {
      Storage.rm(`tourShow_${profileState.id}`);
      Storage.rm(`tourEnable`);
      appDispatch({ type: 'ENABLE_TOUR_TOOLTIP' });
      appDispatch({ type: 'HIDE_TOUR' });
    };

    return (
      <Container data-tut="reactour__start">
        <Content>
          <Typography
            size="headline2"
            color="black"
            fontWeight={900}
            display="block"
            style={{ paddingBottom: '12px' }}
          >
            {content.title}
          </Typography>
          <Typography size="headline1" color="black">
            {content.text}
          </Typography>
        </Content>
        <Footer>
          {current + 1 !== totalSteps && (
            <LinkFooter onClick={skipOrFinish}>Skip tour</LinkFooter>
          )}
          {current + 1 < totalSteps && (
            <LinkFooter onClick={nextStep}>Next step</LinkFooter>
          )}
          {current + 1 === totalSteps && (
            <LinkFooter onClick={skipOrFinish}>Close tour</LinkFooter>
          )}
        </Footer>
      </Container>
    );
  };

  Helper.propTypes = {
    current: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    gotoStep: PropTypes.func.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.element,
      PropTypes.func,
    ]).isRequired,
  };

  const stepsConfig = [
    {
      selector: '[data-tut="reactour__summary"]',
      content: {
        title: tourT('summary.title'),
        text: tourT('summary.text'),
      },
      position: isMobile ? 'top' : [650, 250],
    },
    {
      selector: '[data-tut="reactour__timeline"]',
      content: {
        title: tourT('timeline.title'),
        text: tourT('timeline.text'),
        nextTab: '.profile-tab-culture_fit',
      },
      position: isMobile ? 'top' : [screenWidth - 650, 70],
    },
    {
      selector: '[data-tut="reactour__culture_fit"]',
      content: {
        title: tourT('culture_fit.title'),
        text: tourT('culture_fit.text'),
        nextTab: '.profile-tab-content',
      },
      position: isMobile ? 'top' : [657, 100],
    },
    {
      selector: '[data-tut="reactour__content"]',
      content: {
        title: tourT('content.title'),
        text: tourT('content.text'),
        nextTab: '.profile-tab-resume',
      },
      position: isMobile ? 'top' : [657, 100],
    },
    {
      selector: '[data-tut="reactour__resume"]',
      content: {
        title: tourT('resume.title'),
        text: tourT('resume.text'),
      },
      position: isMobile ? 'top' : [680, 420],
    },
  ];

  function handleOnRequestClose(target) {
    appDispatch({ type: 'HIDE_TOUR' });
    enableBody(target);
  }

  return (
    <Tour
      onAfterOpen={disableBody}
      onBeforeClose={enableBody}
      onRequestClose={handleOnRequestClose}
      steps={stepsConfig}
      isOpen={isOpened}
      rounded={8}
      startAt={currentStep}
      showNavigation={false}
      showButtons={false}
      disableKeyboardNavigation={['esc']}
      closeWithMask={false}
      CustomHelper={Helper}
      maskClassName="mask"
    />
  );
};

export default TourProfile;

export const goToNextStepAndShow = dispatch => {
  const currentStep = Storage.get(`tourStep`);
  const enable = Storage.get(`tourEnable`) === 'true';

  if (enable) {
    const next = parseInt(currentStep, 10) + 1;
    Storage.add(`tourEnable`, 'true');
    Storage.add(`tourStep`, next);

    dispatch({
      type: 'CHANGE_TOUR_STEP',
      currentStep: next,
    });
    dispatch({ type: 'SHOW_TOUR' });
  }
};

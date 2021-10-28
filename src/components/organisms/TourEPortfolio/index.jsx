import React, { useContext, useState, useMemo } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import { useRouter } from 'next/router';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import Storage from '@utils/storage';

import {
  Container,
  Header,
  Content,
  Footer,
  LinkFooter,
  Progress,
} from './style';

const Tour = loadable(() => import('reactour'), { ssr: false });

/**
 * Tour will show a modal with the steps to filling the profile
 */
const TourEPortfolio = () => {
  const { t: modalT } = useTranslation('eportfolio_tour');
  const { state, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);
  const { isOpened, currentStep } = state.eportfolio_tour;
  const router = useRouter();

  const disableBody = target => disableBodyScroll(target);
  const enableBody = target => enableBodyScroll(target);

  const [forceTourUpdate, setForceTourUpdate] = useState('');

  function scrollToElement(el, position) {
    if (el) {
      el.scrollIntoView({ block: position, inline: position });
      setTimeout(() => {
        // setForceTourUpdate(el.scrollTop.toString());
      }, 500);
    }
  }

  const nextStep = value => {
    const next = value;
    Storage.add(`ePortfolioTourStep`, next);

    switch (next) {
      case 0:
      case 1:
        if (router.asPath !== '/library') {
          appDispatch({ type: 'HIDE_EPORTFOLIO_TOUR' });
          appDispatch({
            type: 'CHANGE_EPORTFOLIO_TOUR_STEP',
            currentStep: next,
          });
          router.push('/library');
        }
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        if (router.asPath !== '/library/post/create/video') {
          appDispatch({ type: 'HIDE_EPORTFOLIO_TOUR' });
          appDispatch({
            type: 'CHANGE_EPORTFOLIO_TOUR_STEP',
            currentStep: next,
          });
          router.push('/library/post/create/video');
        }
        break;
      case 7:
        if (router.asPath !== '/library') {
          appDispatch({ type: 'HIDE_EPORTFOLIO_TOUR' });
          appDispatch({
            type: 'CHANGE_EPORTFOLIO_TOUR_STEP',
            currentStep: next,
          });
          router.push('/library');
        }
        break;
      case 8:
        appDispatch({
          type: 'CHANGE_EPORTFOLIO_TOUR_STEP',
          currentStep: next,
        });
        if (router.asPath !== '/library/post/create/blog') {
          appDispatch({ type: 'HIDE_EPORTFOLIO_TOUR' });
          router.push('/library/post/create/blog');
        }
        break;
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
        if (router.asPath !== '/library/post/create/blog') {
          appDispatch({ type: 'HIDE_EPORTFOLIO_TOUR' });
          router.push('/library/post/create/blog');
        }
        break;
      case 14:
        if (router.asPath !== '/library') {
          appDispatch({ type: 'HIDE_EPORTFOLIO_TOUR' });
          appDispatch({
            type: 'CHANGE_EPORTFOLIO_TOUR_STEP',
            currentStep: next,
          });
          router.push('/library');
        }
        break;
      default:
    }
  };

  const Helper = props => {
    const { content, current, gotoStep, totalSteps } = props;

    const skipOrFinish = () => {
      console.log('skip');
      Storage.rm(`ePortfolioTourShow_${profileState.id}`);
      Storage.rm(`tourEnable`);
      appDispatch({ type: 'ENABLE_EPORTFOLIO_TOUR_TOOLTIP' });
      appDispatch({ type: 'HIDE_EPORTFOLIO_TOUR' });
      // document.querySelector('[data-tut="reactour__summary"]').classList.remove('active-step');
    };

    const changeStep = () => {
      // nextStep(current + 1);
      gotoStep(current + 1);
    };

    return (
      <Container data-tut="reactour__start">
        <Header>
          <Progress>{`${current + 1} of ${totalSteps}`}</Progress>
        </Header>
        <Content>{content}</Content>
        <Footer>
          {current + 1 !== totalSteps && (
            <LinkFooter onClick={skipOrFinish}>Skip tour</LinkFooter>
          )}
          {current + 1 < totalSteps && (
            <LinkFooter onClick={changeStep}>Next step</LinkFooter>
          )}
          {current + 1 === totalSteps && (
            <LinkFooter onClick={skipOrFinish}>Close tour</LinkFooter>
          )}
        </Footer>
      </Container>
    );
  };

  const hightlightElement = (element, addedClass) => {
    if (document.querySelector(element) !== null)
      document.querySelector(element).classList.add(addedClass);
  };

  const hideElement = (element, removedClass) => {
    if (document.querySelector(element) !== null)
      document.querySelector(element).classList.remove(removedClass);
  };

  const highlightEditorRange = () => {
    if (
      document.querySelector('[data-offset-key="mock_tour-0-0"] span') !== null
    ) {
      setTimeout(() => {
        const elem = document.querySelector(
          '[data-offset-key="mock_tour-0-0"] span',
        );
        const range = document.createRange();
        if (elem) {
          range.selectNode(elem);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);

          const evt = document.createEvent('MouseEvents');
          evt.initEvent('mouseup', true, true);
          elem.dispatchEvent(evt);
        }
      }, 100);
    }
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

  const stepsConfig = useMemo(
    () => [
      {
        selector: '[data-tut="reactour__add_content"]',
        content: modalT('add_content'),
        action: () => {
          hightlightElement(
            '[data-tut="reactour__button_wrapper"]',
            'active-step',
          );
          hideElement('[data-tut="reactour__button_wrapper"]', 'active-step');
        },
      },
      {
        selector: '[data-tut="reactour__video_button"]',
        content: modalT('video_button'),
        action: node => {
          if (node) node.classList.add('active-step');
        },
        stepInteraction: false,
      },
      {
        selector: '[data-tut="reactour__file_only"]',
        highlightedSelectors: ['[data-tut="reactour__video_page"]'],
        content: modalT('video_page'),
        position: 'bottom',
        action: () => {
          hightlightElement('.blog-navbar', 'mock-tour-opened');
          hightlightElement(
            '[data-tut="reactour__video_title"]',
            'active-tour',
          );
          hightlightElement('[data-tut="reactour__file_only"]', 'active-mock');
          hideElement(
            '[data-tut="reactour__video_with_thumbs"]',
            'active-mock',
          );
          scrollToElement(
            document.querySelector('[data-tut="reactour__file_only"]'),
            'center',
          );
        },
        resizeObservables: [
          '[data-tut="reactour__file_only"]',
          '[data-tut="reactour__video_with_thumbs"]',
        ],
        mutationObservables: [
          '[data-tut="reactour__file_only"]',
          '[data-tut="reactour__video_with_thumbs"]',
        ],
      },
      {
        selector: '[data-tut="reactour__video_with_thumbs"]',
        highlightedSelectors: ['[data-tut="reactour__video_page"]'],
        content: modalT('page'),
        position: 'bottom',
        action: () => {
          hightlightElement('.blog-navbar', 'mock-tour-opened');
          hightlightElement(
            '[data-tut="reactour__video_title"]',
            'active-tour',
          );

          hideElement('[data-tut="reactour__file_only"]', 'active-mock');

          hightlightElement(
            '[data-tut="reactour__video_with_thumbs"]',
            'active-mock',
          );

          scrollToElement(
            document.querySelector('[data-tut="reactour__video_with_thumbs"]'),
            'center',
          );
        },
        resizeObservables: [
          '[data-tut="reactour__file_only"]',
          '[data-tut="reactour__video_with_thumbs"]',
        ],
        mutationObservables: [
          '[data-tut="reactour__file_only"]',
          '[data-tut="reactour__video_with_thumbs"]',
        ],
      },
      {
        selector: '[data-tut="reactour__video_title"]',
        content: modalT('title'),
        position: 'bottom',
        action: () => {
          hideElement('.blog-navbar', 'mock-tour-opened');
          const el = document.querySelector(
            '[data-tut="reactour__video_title"]',
          );
          scrollToElement(el, 'center');
        },
        resizeObservables: ['[data-tut="reactour__video_title"]'],
        mutationObservables: ['[data-tut="reactour__video_title"]'],
      },
      {
        selector: '[data-tut="reactour__video_hashtags"]',
        content: modalT('hashtags'),
        resizeObservables: ['[data-tut="reactour__video_hashtags"]'],
        mutationObservables: ['[data-tut="reactour__video_hashtags"]'],
      },
      {
        selector: '[data-tut="reactour__video_publish"]',
        content: modalT('publish'),
        position: 'bottom',
        stepInteraction: false,
        action: () => {
          hightlightElement(
            '[data-tut="reactour__video_with_thumbs"]',
            'active-mock',
          );
        },
      },
      {
        selector: '[data-tut="reactour__create_blog"]',
        content: modalT('create_blog'),
        stepInteraction: false,
        action: () => {
          hightlightElement(
            '[data-tut="reactour__create_blog"]',
            'active-step',
          );
          hideElement('[data-tut="reactour__button_wrapper"]', 'active-step');
        },
      },
      {
        selector: '[data-tut="reactour__cover_image"]',
        content: modalT('cover_image'),
        action: () => {
          hightlightElement('.blog-navbar', 'mock-tour-opened');
          hightlightElement(
            '[data-tut="reactour__cover_image"]',
            'active-tour',
          );
        },
      },
      {
        selector: '[data-tut="reactour__fun_part"]',
        content: modalT('fun_part'),
        action: () => {
          hideElement('.blog-navbar', 'mock-tour-opened');
          hightlightElement('[data-tut="reactour__fun_part"]', 'active-mock');
          hideElement('[data-tut="reactour__editor_highlight"]', 'active-mock');
        },
        resizeObservables: ['[data-tut="reactour__fun_part"]'],
        mutationObservables: ['[data-tut="reactour__fun_part"]'],
      },
      {
        selector: '[data-tut="reactour__highlight"]',
        highlightedSelectors: ['[data-tut="reactour__inline_toolbar"]'],
        content: modalT('highlight'),
        action: () => {
          hideElement('[data-tut="reactour__fun_part"]', 'active-mock');
          hightlightElement(
            '[data-tut="reactour__editor_highlight"]',
            'active-mock',
          );
          highlightEditorRange();
        },
        position: 'bottom',
        resizeObservables: [
          '[data-tut="reactour__highlight"]',
          '[data-tut="reactour__fun_part"]',
          '[data-tut="reactour__editor_highlight"]',
          '[data-tut="reactour__inline_toolbar"]',
        ],
        mutationObservables: [
          '[data-tut="reactour__highlight"]',
          '[data-tut="reactour__fun_part"]',
          '[data-tut="reactour__editor_highlight"]',
          '[data-tut="reactour__inline_toolbar"]',
        ],
      },
      {
        selector: '[data-tut="reactour__plus_step"]',
        highlightedSelectors: ['[data-tut="reactour__plus_button"]'],
        content: modalT('plus_button'),
        position: 'top',
        action: () => {
          hightlightElement(
            '[data-tut="reactour__plus_button"]',
            'active-step',
          );
          if (
            document.querySelector('[data-tut="reactour__plus_button"]') !==
            null
          ) {
            setTimeout(() => {
              setForceTourUpdate('plus-step');
            }, 100);
          }
        },
        resizeObservables: ['[data-tut="reactour__plus_step"]'],
        mutationObservables: ['[data-tut="reactour__plus_step"]'],
      },
      {
        selector: '[data-tut="reactour__plus_step"]',
        content: modalT('plus_step'),
      },
      {
        selector: '[data-tut="reactour__end_publish"]',
        content: modalT('end_publish'),
        stepInteraction: false,
        action: () => {
          hideElement('[data-tut="reactour__fun_part"]', 'active-mock');
          hightlightElement(
            '[data-tut="reactour__editor_highlight"]',
            'active-mock',
          );
        },
        resizeObservables: [
          '[data-tut="reactour__highlight"]',
          '[data-tut="reactour__fun_part"]',
          '[data-tut="reactour__editor_highlight"]',
          '[data-tut="reactour__inline_toolbar"]',
        ],
        mutationObservables: [
          '[data-tut="reactour__highlight"]',
          '[data-tut="reactour__fun_part"]',
          '[data-tut="reactour__editor_highlight"]',
          '[data-tut="reactour__inline_toolbar"]',
        ],
      },
      {
        content: modalT('link_doc'),
        action: () => {
          hightlightElement(
            '[data-tut="reactour__button_wrapper"]',
            'active-step',
          );
          hideElement('[data-tut="reactour__button_wrapper"]', 'active-step');
        },
        stepInteraction: false,
        highlightedSelectors: ['[data-tut="reactour__create_link"]'],
        selector: '[data-tut="reactour__create_doc"]',
      },
      {
        selector: '[data-tut="reactour__presentation_icon"]',
        content: modalT('pitch_icon'),
        action: () => {
          hightlightElement(
            '[data-tut="reactour__presentation_icon"]',
            'active-step',
          );
          hideElement('[data-tut="reactour__button_wrapper"]', 'active-step');
        },
      },
    ],
    [],
  );

  return (
    <Tour
      onAfterOpen={disableBody}
      onBeforeClose={enableBody}
      onRequestClose={() => appDispatch({ type: 'HIDE_EPORTFOLIO_TOUR' })}
      getCurrentStep={step => nextStep(step)}
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
      inViewThreshold={0}
      scrollOffset={0}
      update={forceTourUpdate}
    />
  );
};

export default TourEPortfolio;

export const goToNextStepAndShow = dispatch => {
  const currentStep = Storage.get(`ePortfolioTourStep`);
  const enable = Storage.get(`tourEnable`) === 'true';

  if (enable) {
    const next = parseInt(currentStep, 10) + 1;
    Storage.add(`tourEnable`, 'true');
    Storage.add(`ePortfolioTourStep`, next);
    dispatch({
      type: 'CHANGE_EPORTFOLIO_TOUR_STEP',
      currentStep: next,
    });
    dispatch({ type: 'SHOW_EPORTFOLIO_TOUR' });
  }
};

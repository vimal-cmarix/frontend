import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { rem } from 'polished';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import ChangePasswordModal from '@components/templates/Modals/ChangePassword';
import ModalTour from '@components/templates/Modals/Tour';
import ModalTourEPortfolio from '@components/templates/Modals/TourEPortfolio';
import { logout } from '@src/utils/auth';
import Storage from '@utils/storage';
import Icon from '@components/atoms/Icon';
import PrivateLinkModal from '@components/templates/Modals/PrivateLink';

import Btn from '@components/molecules/Btn';
import IconSVG from '@components/atoms/IconSVG';
import {
  Container,
  Header,
  HeaderContent,
  ActionList,
  Action,
  Text,
  IconWrapper,
  ActionTitle,
} from './style';
import ScrollLock from '../../molecules/ScrollLock';

/*
 * Profile popOver
 */

const ProfilePopOver = () => {
  const { t } = useTranslation('navbar');
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );
  const extoleGlobalHeaderRef = useRef(null);

  function userLogout() {
    logout();

    appDispatch({
      type: 'RESET_TOUR',
    });

    profileDispatch({
      type: 'CLEAR_PROFILE',
    });
  }

  function openChangePasswordModal() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ChangePasswordModal,
    });
  }

  function showTour() {
    Storage.add(`tourStep`, 0);
    appDispatch({
      type: 'CHANGE_TOUR_STEP',
      currentStep: 0,
    });

    if (Router.pathname !== '/profile') {
      Storage.add(`tourShow_${profileState.id}`, 'true');
      Router.push('/profile');
    } else {
      Storage.add(`tourEnable`, 'true');
      appDispatch({
        type: 'SET_MODAL_OPENED',
        component: ModalTour,
      });
    }
  }

  function openShareModal() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: PrivateLinkModal,
    });
  }

  function showEPortfolioTour() {
    Storage.add(`ePortfolioTourStep`, 0);
    appDispatch({
      type: 'CHANGE_EPORTFOLIO_TOUR_STEP',
      currentStep: 0,
    });

    if (Router.pathname !== '/library') {
      Storage.add(`ePortfolioTourShow_${profileState.id}`, 'true');
      Router.push('/library');
    } else {
      Storage.add(`ePortfolioTourShow_${profileState.id}`, 'true');
      appDispatch({
        type: 'SET_MODAL_OPENED',
        component: ModalTourEPortfolio,
      });
    }
  }

  useEffect(() => {
    if (
      process.browser &&
      profileState &&
      profileState.id &&
      extoleGlobalHeaderRef.current
    ) {
      /* eslint-disable */
      (function(c, b, f, k, a) {
        c[b] = c[b] || {};
        for (c[b].q = c[b].q || []; a < k?.length; ) f(k[a++], c[b]);
      })(
        window,
        'extole',
        function(c, b) {
          b[c] =
            b[c] ||
            function() {
              b.q.push([c, arguments]);
            };
        },
        ['createZone'],
        0,
      );
      /* eslint-enable */
      window.extole.createZone({
        name: 'global_header',
        element: extoleGlobalHeaderRef.current,
        data: {
          partner_user_id: profileState.user.id,
          email: profileState.contactInfo.email,
          first_name: profileState.personalInfo.firstName,
          last_name: profileState.personalInfo.lastName,
        },
      });
    }
  }, [profileState, extoleGlobalHeaderRef]);

  function setBoardFull() {
    const doc = document.documentElement;

    doc.style.setProperty('--height-full', rem(window.innerHeight));
  }

  useEffect(() => {
    if (!process.browser) return null;

    window.addEventListener('resize', setBoardFull);
    setBoardFull();

    return () => window.removeEventListener('resize', setBoardFull);
  }, []);

  return (
    <Container>
      <ScrollLock>
        <Header>
          <HeaderContent>
            <Btn
              label={t('popover.profile')}
              variant="solidPrimary"
              handleClick={() => {
                Router.push('/profile');
              }}
              rounded="lg"
              full
            />
          </HeaderContent>
        </Header>
        <ActionList>
          <Action
            onClick={() => openShareModal()}
            title={t('popover.share_profile')}
          >
            <IconWrapper>
              <IconSVG name="share" size="23" />
            </IconWrapper>
            <Text>{t('popover.share_profile')}</Text>
          </Action>
        </ActionList>

        <ActionList>
          <ActionTitle>{t('popover.account_title')}</ActionTitle>
          <Action
            onClick={() => Router.push('/pricing')}
            title={t('popover.pricing')}
          >
            <IconWrapper>
              <IconSVG name="list" size="24" />
            </IconWrapper>
            <Text>{t('popover.pricing')}</Text>
          </Action>

          <Action
            onClick={() => Router.push('/billing')}
            title={t('popover.billing')}
          >
            <IconWrapper>
              <IconSVG name="card" size="24" />
            </IconWrapper>
            <Text>{t('popover.billing')}</Text>
          </Action>

          <Action
            onClick={openChangePasswordModal}
            title={t('popover.change_password')}
          >
            <IconWrapper>
              <IconSVG name="lock" size="24" />
            </IconWrapper>
            <Text>{t('popover.change_password')}</Text>
          </Action>
        </ActionList>

        <ActionList>
          <ActionTitle>{t('popover.resource_center_title')}</ActionTitle>
          <Action onClick={showTour} title={t('popover.tour')}>
            <IconWrapper>
              <IconSVG name="profile" size="23" />
            </IconWrapper>
            <Text>{t('popover.tour')}</Text>
          </Action>

          <Action
            onClick={showEPortfolioTour}
            title={t('popover.eportfolio_tour')}
          >
            <IconWrapper>
              <IconSVG name="libraryOutline2" size="24" />
            </IconWrapper>
            <Text>{t('popover.eportfolio_tour')}</Text>
          </Action>

          <Action
            onClick={() => Router.push('/learning-center/tutorials')}
            title={t('popover.tutorials')}
          >
            <IconWrapper>
              <IconSVG name="videoPlayOutline" size="24" />
            </IconWrapper>
            <Text>{t('popover.tutorials')}</Text>
          </Action>

          <Action
            onClick={() => Router.push('/learning-center/inspirational')}
            title={t('popover.inspirational')}
          >
            <IconWrapper>
              <IconSVG name="star" size="24" />
            </IconWrapper>
            <Text>{t('popover.inspirational')}</Text>
          </Action>
        </ActionList>

        <ActionList>
          <ActionTitle>{t('popover.misc_title')}</ActionTitle>

          <Action title={t('popover.refer_friend')}>
            <IconWrapper>
              <Icon name="user_plus" size="24" />
            </IconWrapper>
            <Text>
              <span>{t('popover.refer_friend')}</span>
            </Text>
            {/* Click handler is managed by the Extole API. Only works on previous configured URLs */}
            <div ref={extoleGlobalHeaderRef} id="extole_zone_global_header" />
          </Action>

          <Action title={t('popover.faq')}>
            <IconWrapper>
              <IconSVG name="helpCircle" size="24" />
            </IconWrapper>
            <Text>
              <a
                href="https://joinsizigi.com/faq/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('popover.faq')}
              </a>
            </Text>
          </Action>

          {/* <Action */}
          {/*  onClick={() => Router.push('/learning-center/tutorials')} */}
          {/*  title={t('popover.settings')} */}
          {/* > */}
          {/*  <IconWrapper> */}
          {/*    <Icon name="settings_gear" size="32" /> */}
          {/*  </IconWrapper> */}
          {/*  <Text>{t('popover.settings')}</Text> */}
          {/* </Action> */}

          <Action onClick={userLogout} title={t('popover.logout')}>
            <IconWrapper>
              <IconSVG name="logout" size="24" />
            </IconWrapper>
            <Text>{t('popover.logout')}</Text>
          </Action>
        </ActionList>
      </ScrollLock>
    </Container>
  );
};

ProfilePopOver.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    about: PropTypes.shape({
      city: PropTypes.shape({
        name: PropTypes.string,
      }),
      state: PropTypes.shape({
        name: PropTypes.string,
        iso2: PropTypes.string,
      }),
      occupation: PropTypes.string,
    }),
    photo: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }).isRequired,
};

export default ProfilePopOver;

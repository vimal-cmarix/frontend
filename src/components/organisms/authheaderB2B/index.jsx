import React, { useState, useContext, useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import BoardService from '@api/services/board';

import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import { Container as Overlay } from '@components/organisms/Modal/style';
import { sizes } from '@assets/styles/medias';
import Brand from '@components/atoms/Brand';
import Icon from '@components/atoms/Icon';
import Avatar from '@components/molecules/Avatar';
import ProfilePopOver from '@components/organisms/ProfilePopOver';
import Storage from '@utils/storage';

import AlertBar from '@components/molecules/AlertBar';

import useMedia from '@src/hooks/useMedia';

import Btn from '@components/molecules/Btn';
import IconSVG from '@components/atoms/IconSVG';
import { Typography } from '@assets/styles/typo';
import { SPACING } from '@assets/styles/theme';
import { cdn } from '@utils/general';
import { logout } from '@utils/auth';
import { Accordion, Dropdown } from 'react-bootstrap';
// import notificationBell from '@src/assets/images/notification.png';
import { PageHeader } from './style';

/**
 * The nav bar has two color schemas and some states.
 */
const AuthHeaderB2B = () => {
  // const { state: profileState } = useContext(ProfileContext);
  // const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  // const [popOverVisibility, setPopOverVisibility] = useState(false);
  // const [avatarInfo, setAvatarInfo] = useState({});
  // const [boardId, setBoardId] = useState('');
  // const popOverRef = useRef(null);
  // const avatarWrapperRef = useRef(null);
  // const { t } = useTranslation('navbar');

  // const isMobile = useMedia(`(max-width: ${sizes.tabletPortrait})`);

  // const [activePath, setActivePath] = useState(null);

  // const { isOpened, showTooltip } = appState.tour;
  // const [internalShowTooltip, setInternalShowTooltip] = useState(false);

  // const [screenWidth, setScreenWidth] = useState(null);
  // const [tooltipPosition, setTooltipPosition] = useState('top');
  // useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  // useEffect(() => {
  //   if (screenWidth < 1024) {
  //     setTooltipPosition('top');
  //   } else {
  //     setTooltipPosition('bottom');
  //   }
  // }, [screenWidth]);

  // useEffect(() => {
  //   const tourToolTipShowed =
  //     Storage.get(`tourToolTipShowed_${profileState && profileState.id}`) ===
  //     'true';
  //   const tourEnable = Storage.get(`tourEnable`) === 'true';

  //   if (!tourToolTipShowed && !tourEnable && showTooltip) {
  //     setInternalShowTooltip(true);
  //     setTimeout(() => {
  //       setInternalShowTooltip(false);
  //       appDispatch({ type: 'DISABLE_TOUR_TOOLTIP' });
  //       Storage.add(
  //         `tourToolTipShowed_${profileState && profileState.id}`,
  //         'true',
  //       );
  //     }, 10000);
  //   }
  // }, [isOpened]);

  // function useClickOutside(ref) {
  //   useEffect(() => {
  //     function handleClickOutside(event) {
  //       // TODO: fix: listen event click only when avatar exist
  //       if (!avatarWrapperRef.current) return false;
  //       if (avatarWrapperRef.current.contains(event.target)) return false;

  //       if (ref.current && !ref.current.contains(event.target)) {
  //         return setPopOverVisibility(false);
  //       }
  //       return false;
  //     }

  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutside);
  //     };
  //   }, [ref]);
  // }

  // useClickOutside(popOverRef);

  // function togglePopOver() {
  //   setInternalShowTooltip(false);
  //   appDispatch({ type: 'DISABLE_TOUR_TOOLTIP' });
  //   Storage.add(`tourToolTipShowed_${profileState && profileState.id}`, 'true');
  //   setPopOverVisibility(!popOverVisibility);
  // }

  // useEffect(() => {
  //   const bodyElement = document.querySelector('#body-id');

  //   if (isMobile && popOverVisibility) {
  //     disableBodyScroll(bodyElement);
  //   } else {
  //     enableBodyScroll(bodyElement);
  //   }
  // }, [popOverVisibility, isMobile]);

  // function handleData() {
  //   const { personalInfo, about, photo } = profileState;

  //   setAvatarInfo({
  //     name: `${personalInfo.firstName} ${personalInfo.lastName}`,
  //     about,
  //     photo,
  //   });
  // }

  // useEffect(() => {
  //   if (profileState && profileState.id) handleData();
  // }, [profileState]);

  // useEffect(() => {
  //   const path = Router.router.asPath;
  //   const arrPath = path.split('/');
  //   let initialPath = arrPath[1];
  //   if (initialPath.includes('?'))
  //     initialPath = initialPath.slice(0, initialPath.indexOf('?'));
  //   setActivePath(initialPath);
  //   const load = async () => {
  //     const { data } = await BoardService.getBoards();
  //     if (data.data.length > 0) setBoardId(data.data[0].id);
  //   };
  //   load();
  // }, []);

  if (typeof window !== 'undefined') {
    const ActiveLink = document.querySelectorAll('.sizigi-header-nav a');

    const windowPathname = window.location.pathname;

    ActiveLink.forEach(onelink => {
      if (onelink.getAttribute('href') === windowPathname) {
        onelink.classList.add('active');
      }
    });
  }

  return (
    <>
      <PageHeader>
        <div className="sizigi-header-logo">
          <Link href="/">
            <img src={cdn('/static/img/sizigi-full-logo.svg')} alt="logo" />
          </Link>
        </div>
        <div className="sizigi-header-nav">
          <Link href="/search-jobs">Search Jobs</Link>
          <Link href="/signin">For Job Seekers</Link>
          <Link href="/company/signin">Log In</Link>
          <Link href="/company/signup">Sign up</Link>
        </div>
      </PageHeader>
    </>
  );
};

AuthHeaderB2B.propTypes = {
  // colorSchema: PropTypes.oneOf(['dark', 'light']),
  // component: PropTypes.oneOfType([
  //   PropTypes.arrayOf(PropTypes.element),
  //   PropTypes.element,
  // ]),
  // isAccountVerify: PropTypes.func,
  // // onPortfolio: PropTypes.func,
  // className: PropTypes.string,
  // privateView: PropTypes.bool,
  // isVerified: PropTypes.bool,
  // signUpBar: PropTypes.bool,
  // isViewerMode: PropTypes.bool,
};

AuthHeaderB2B.defaultProps = {
  // colorSchema: 'light',
  // component: undefined,
  // isAccountVerify: () => null,
  // // onPortfolio: () => null,
  // className: '',
  // privateView: false,
  // isVerified: false,
  // signUpBar: false,
  // isViewerMode: false,
};

export default AuthHeaderB2B;

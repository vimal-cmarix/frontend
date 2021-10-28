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
import {
  Container,
  NavWrapper,
  IconsWrapper,
  // Overlay,
  AvatarWrapper,
  NavIconsAndAvatar,
  MarginTop,
  PopOverContainer,
  TourIndicator,
  BrandWrapper,
  NavText,
  IconWrapper,
  InfoWrapper,
  AvatarInfoWrapper,
  SignUpWrapper,
  SignUpText,
  SignUpButtonWrapper,
} from './style';

/**
 * The nav bar has two color schemas and some states.
 */
const NavBar = ({
  colorSchema,
  component,
  isAccountVerify,
  className,
  privateView,
  isVerified,
  signUpBar,
  isViewerMode,
}) => {
  const { state: profileState } = useContext(ProfileContext);
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const [avatarInfo, setAvatarInfo] = useState({});
  const [boardId, setBoardId] = useState('');
  const popOverRef = useRef(null);
  const avatarWrapperRef = useRef(null);
  const { t } = useTranslation('navbar');

  const isMobile = useMedia(`(max-width: ${sizes.tabletPortrait})`);

  const [activePath, setActivePath] = useState(null);

  const { isOpened, showTooltip } = appState.tour;
  const [internalShowTooltip, setInternalShowTooltip] = useState(false);

  const [screenWidth, setScreenWidth] = useState(null);
  // const [tooltipPosition, setTooltipPosition] = useState('top');
  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  // useEffect(() => {
  //   if (screenWidth < 1024) {
  //     setTooltipPosition('top');
  //   } else {
  //     setTooltipPosition('bottom');
  //   }
  // }, [screenWidth]);

  useEffect(() => {
    const tourToolTipShowed =
      Storage.get(`tourToolTipShowed_${profileState && profileState.id}`) ===
      'true';
    const tourEnable = Storage.get(`tourEnable`) === 'true';

    if (!tourToolTipShowed && !tourEnable && showTooltip) {
      setInternalShowTooltip(true);
      setTimeout(() => {
        setInternalShowTooltip(false);
        appDispatch({ type: 'DISABLE_TOUR_TOOLTIP' });
        Storage.add(
          `tourToolTipShowed_${profileState && profileState.id}`,
          'true',
        );
      }, 10000);
    }
  }, [isOpened]);

  function useClickOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        // TODO: fix: listen event click only when avatar exist
        if (!avatarWrapperRef.current) return false;
        if (avatarWrapperRef.current.contains(event.target)) return false;

        if (ref.current && !ref.current.contains(event.target)) {
          return setPopOverVisibility(false);
        }
        return false;
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useClickOutside(popOverRef);

  function togglePopOver() {
    setInternalShowTooltip(false);
    appDispatch({ type: 'DISABLE_TOUR_TOOLTIP' });
    Storage.add(`tourToolTipShowed_${profileState && profileState.id}`, 'true');
    setPopOverVisibility(!popOverVisibility);
  }

  useEffect(() => {
    const bodyElement = document.querySelector('#body-id');

    if (isMobile && popOverVisibility) {
      disableBodyScroll(bodyElement);
    } else {
      enableBodyScroll(bodyElement);
    }
  }, [popOverVisibility, isMobile]);

  function handleData() {
    const { personalInfo, about, photo } = profileState;

    setAvatarInfo({
      name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      about,
      photo,
    });
  }

  useEffect(() => {
    if (profileState && profileState.id) handleData();
  }, [profileState]);

  useEffect(() => {
    const path = Router.router.asPath;
    const arrPath = path.split('/');
    let initialPath = arrPath[1];
    if (initialPath.includes('?'))
      initialPath = initialPath.slice(0, initialPath.indexOf('?'));
    setActivePath(initialPath);
    const load = async () => {
      const { data } = await BoardService.getBoards();
      if (data.data.length > 0) setBoardId(data.data[0].id);
    };
    load();
  }, []);

  const navIcons = [
    // {
    //   title: t('home'),
    //   name: 'homeOutline',
    //   clicked: 'homeSolid',
    //   routeActive: 'home',
    //   link: '/home',
    //   tooltipText: t('home'),
    // },
    {
      title: t('job_tracker'),
      name: 'aplicationOutline',
      clicked: 'aplicationSolid',
      routeActive: 'job-tracker',
      link: `/job-tracker/${boardId}`,
      tooltipText: t('job_tracker'),
      onClick: isAccountVerify,
    },
    {
      title: t('my_library'),
      name: 'libraryOutline',
      clicked: 'librarySolid',
      routeActive: 'library',
      link: '/library?tab=published',
      tooltipText: t('my_library'),
      onClick: isAccountVerify,
    },
    {
      title: t('my_pitches'),
      name: 'pitchOutline',
      clicked: 'pitchSolid',
      routeActive: 'presentation',
      link: '/presentation?tab=published',
      tooltipText: t('my_pitches'),
      onClick: isAccountVerify,
    },
    // {
    //   title: t('analytics'),
    //   name: 'analytics_unclicked',
    //   clicked: 'analytics_clicked',
    //   routeActive: 'pricing',
    //   link: '/pricing',
    //   tooltipText: t('analytics'),
    //   onClick: isAccountVerify,
    // },
    // {
    //   title: t('notifications'),
    //   name: 'notifications_unclicked',
    //   clicked: 'notifications_clicked',
    //   routeActive: 'profile',
    //   link: '/profile',
    //   tooltipText: t('notifications'),
    //   onClick: isAccountVerify,
    // },
  ];

  return (
    <>
      {screenWidth <= parseInt(sizes.tablet, 10) && (
        <Overlay isOpened={popOverVisibility} profile={1} />
      )}
      <Container colorSchema={colorSchema} className={className}>
        <MarginTop />
        <NavWrapper>
          <BrandWrapper isViewerMode={isViewerMode}>
            <Link href={privateView ? `/signin` : '/profile'}>
              <a href={privateView ? `/signin` : '/profile'}>
                <Brand
                  colorSchema={colorSchema === 'light' ? 'dark' : 'light'}
                  size="nav"
                />
              </a>
            </Link>
          </BrandWrapper>

          {component || (
            <NavIconsAndAvatar>
              <IconsWrapper>
                {navIcons.map((icon, index) => (
                  <Link key={String(index)} href={icon.link}>
                    <IconWrapper
                      href={icon.link}
                      data-tut={
                        icon.link === '/presentation'
                          ? 'reactour__presentation_icon'
                          : ''
                      }
                      colorSchema={colorSchema}
                      key={icon.name}
                      onClick={e =>
                        icon.onClick && icon.onClick(e, icon.routeActive)
                      }
                      active={activePath === icon.routeActive}
                    >
                      <InfoWrapper active={activePath === icon.routeActive}>
                        <IconSVG
                          name={
                            activePath === icon.routeActive
                              ? icon.clicked
                              : icon.name
                          }
                          size={20}
                        />

                        {screenWidth > 320 && (
                          <Typography
                            className="menuItemName"
                            style={{ marginTop: SPACING * 2 }}
                          >
                            {icon.tooltipText}
                          </Typography>
                        )}
                      </InfoWrapper>
                    </IconWrapper>
                  </Link>
                ))}
              </IconsWrapper>

              <AvatarWrapper
                onClick={togglePopOver}
                ref={avatarWrapperRef}
                colorSchema={colorSchema}
                title="Account"
              >
                <Avatar
                  size="xxsmall"
                  name={avatarInfo.name}
                  image={avatarInfo.photo && avatarInfo.photo.url}
                />
                {screenWidth > 320 && (
                  <AvatarInfoWrapper
                    active={popOverVisibility}
                    colorSchema={colorSchema}
                    style={{ marginTop: SPACING }}
                  >
                    <Typography
                      className="menuUserName"
                      style={{ marginRight: SPACING }}
                    >
                      Me
                    </Typography>
                    <IconSVG name="downArrow" size={12} />
                  </AvatarInfoWrapper>
                )}
                {popOverVisibility && (
                  <PopOverContainer
                    visible={popOverVisibility}
                    ref={popOverRef}
                  >
                    <ProfilePopOver profile={avatarInfo} />
                  </PopOverContainer>
                )}
              </AvatarWrapper>
              {internalShowTooltip && (
                <TourIndicator>{t('tour_indicator')}</TourIndicator>
              )}
            </NavIconsAndAvatar>
          )}

          {signUpBar && (
            <SignUpWrapper>
              <SignUpText>Don&apos;t have an account yet?</SignUpText>
              <SignUpButtonWrapper>
                <Btn
                  label="Sign up"
                  variant="outlineSecondary"
                  rounded="lg"
                  handleClick={() => Router.router.push('/signup')}
                  full
                />
              </SignUpButtonWrapper>
            </SignUpWrapper>
          )}
        </NavWrapper>
      </Container>
      {process.window && !window.location.pathname.endsWith('/home') && (
        <AlertBar isVerified={isVerified} />
      )}
    </>
  );
};

NavBar.propTypes = {
  colorSchema: PropTypes.oneOf(['dark', 'light']),
  component: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  isAccountVerify: PropTypes.func,
  // onPortfolio: PropTypes.func,
  className: PropTypes.string,
  privateView: PropTypes.bool,
  isVerified: PropTypes.bool,
  signUpBar: PropTypes.bool,
  isViewerMode: PropTypes.bool,
};

NavBar.defaultProps = {
  colorSchema: 'light',
  component: undefined,
  isAccountVerify: () => null,
  // onPortfolio: () => null,
  className: '',
  privateView: false,
  isVerified: false,
  signUpBar: false,
  isViewerMode: false,
};

export default NavBar;

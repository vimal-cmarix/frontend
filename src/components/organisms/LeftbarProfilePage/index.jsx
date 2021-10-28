import React, { useState, useContext, useEffect, useRef } from 'react';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
// import BoardService from '@api/services/board';

import Link from 'next/link';
// import Router from 'next/router';
// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';

// import ProfileContext from '@context/profileContext';
// import AppContext from '@context/appContext';
// import { Container as Overlay } from '@components/organisms/Modal/style';
// import { sizes } from '@assets/styles/medias';
// import Brand from '@components/atoms/Brand';
// import Icon from '@components/atoms/Icon';
// import Avatar from '@components/molecules/Avatar';
// import ProfilePopOver from '@components/organisms/ProfilePopOver';
// import Storage from '@utils/storage';

// import AlertBar from '@components/molecules/AlertBar';

// import useMedia from '@src/hooks/useMedia';

// import Btn from '@components/molecules/Btn';
// import IconSVG from '@components/atoms/IconSVG';
// import { Typography } from '@assets/styles/typo';
// import { SPACING } from '@assets/styles/theme';
import { cdn } from '@utils/general';
import { logout } from '@utils/auth';
import { Dropdown } from 'react-bootstrap';
import notificationBell from '@src/assets/images/notification.png';
import {
  LeftbarTitle,
  ProfileLeftsideMenu,
  MenuList,
  LeftSubMenu,
} from './style';

const LeftbarB2B = () => {
  if (typeof window !== 'undefined') {
    const ActiveLink = document.querySelectorAll('a');

    const windowPathname = window.location.pathname;

    ActiveLink.forEach(onelink => {
      if (onelink.getAttribute('href') === windowPathname) {
        onelink.classList.add('active');
      }
    });
  }

  const openSubmenu = () => {
    document.querySelector('.has-submenu').classList.toggle('opened');
  };

  return (
    <>
      <ProfileLeftsideMenu>
        <LeftbarTitle>Profile</LeftbarTitle>
        <MenuList>
          <li className="active">
            <Link href="/company/profile-personal-info">
              <a href="/company/profile-personal-info">
                Personal Info
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13L7 7L1 1"
                    stroke="#1D242F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/company/profile-access-setting">
              <a href="/company/profile-access-setting">
                Access Settings
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13L7 7L1 1"
                    stroke="#1D242F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/company/profile-change-password">
              <a href="/company/profile-change-password">
                Security
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13L7 7L1 1"
                    stroke="#1D242F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Link>
          </li>
        </MenuList>
      </ProfileLeftsideMenu>
    </>
  );
};

export default LeftbarB2B;

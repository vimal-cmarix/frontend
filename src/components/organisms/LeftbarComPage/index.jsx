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

  // if (typeof window !== 'undefined') {
  //   window.addEventListener('scroll', () => {
  //     if (window.scrollY >= 130) {
  //       document
  //         .querySelector('.profile-leftside-menu')
  //         .classList.add('sticky-left-panel');
  //     } else {
  //       document
  //         .querySelector('.profile-leftside-menu')
  //         .classList.remove('sticky-left-panel');
  //     }
  //   });
  // }

  return (
    <>
      <ProfileLeftsideMenu className="profile-leftside-menu">
        <LeftbarTitle>Company page</LeftbarTitle>
        <MenuList>
          <li className="active">
            <Link href="/company/company-page">
              <a href="/company/company-page">
                General Info
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
          <li className="has-submenu">
            <a href="javascrip:void(0)" onClick={openSubmenu}>
              Advanced
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
            <LeftSubMenu className="sub-menus">
              <ul>
                <li>
                  <Link
                    className="active"
                    href="/company/advance-setting#brandColors"
                  >
                    Brand Colors
                  </Link>
                </li>
                <li>
                  <Link href="/company/advance-setting#meetEmployees">
                    Meet company employees
                  </Link>
                </li>
                <li>
                  <Link href="/company/advance-setting#CompanyCulture">
                    Company culture
                  </Link>
                  {/* <a href="/BrandColors">Company culture</a> */}
                </li>
                <li>
                  <Link href="/company/advance-setting#BlogFeatured">
                    Blog/Featured article
                  </Link>
                  {/* <a href="/BrandColors">Blog/Featured article</a> */}
                </li>
                <li>
                  <Link href="/company/advance-setting#SocialFeed">
                    Social feed
                  </Link>
                  {/* <a href="/BrandColors">Social feed</a> */}
                </li>
              </ul>
            </LeftSubMenu>
          </li>
          <li>
            <Link href="/company/preview">
              <a href="/company/preview">
                Preview
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

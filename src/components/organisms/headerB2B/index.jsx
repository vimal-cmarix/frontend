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
// import notificationBell from '@src/assets/images/notification.png';
import { SecondaryHeader, SecondaryWrapper, MiddalWrap } from './style';

/**
 * The nav bar has two color schemas and some states.
 */
const HeaderB2B = () => {
  const [companyProfile, setCompanyProfile] = useState('');
  const [companyUser, setCompanyUser] = useState('');
  useEffect(() => {
    const companyProfileData =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('companyProfile'))
        : null;
    const userData =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    setCompanyProfile(companyProfileData);
    setCompanyUser(userData);
  }, []);

  if (typeof window !== 'undefined') {
    const ActiveLink = document.querySelectorAll('a');

    const windowPathname = window.location.pathname;

    ActiveLink.forEach(onelink => {
      if (onelink.getAttribute('href') === windowPathname) {
        onelink.classList.add('active');
      }
    });
  }

  return (
    <>
      <SecondaryHeader>
        <SecondaryWrapper>
          <div className="secondary_wrapper">
            <div className="logo">
              <Link href="/company/dashboard">
                <span>
                  <img src={cdn('/static/img/logo-black.svg')} alt="logo" />
                </span>
              </Link>
            </div>
            <div className="header-menus">
              <ul className="menu-list d-flex">
                <li>
                  <Link href="/company/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/company/ats">ATS</Link>
                </li>
                <li>
                  <Link href="/company/coming-soon">Messages</Link>
                </li>
                <li>
                  <Link href="/company/coming-soon">Calendar</Link>
                </li>
                <li>
                  <Link href="/company/coming-soon">Applicant Database</Link>
                </li>
              </ul>
              <div className="profile-drop-down">
                <ul className="top">
                  <li>
                    {/* <Dropdown.Item> */}
                    <Link href="/company/company-page">Company Page</Link>
                    {/* </Dropdown.Item> */}
                  </li>
                  <li>
                    {/* <Dropdown.Item> */}
                    <Link href="/company/profile-personal-info">Profile</Link>
                    {/* </Dropdown.Item> */}
                  </li>
                  <li>
                    <Link href="/company/coming-soon">Pricing &amp; Plans</Link>

                    {/* <Dropdown.Item>Pricing &amp; Plans</Dropdown.Item> */}
                  </li>
                  <li>
                    {/* <Dropdown.Item> */}
                    <Link href="/company/help">Help</Link>
                    {/* </Dropdown.Item> */}
                  </li>
                </ul>
                <ul className="middle">
                  <li>
                    {/* <Dropdown.Item> */}
                    <Link href="/company/general-info">
                      <MiddalWrap
                        href="/company/general-info"
                        onClick={e => {
                          localStorage.removeItem('profileuserInformation');
                        }}
                      >
                        <img
                          src={cdn('/static/img/menu-plus-circle.svg')}
                          alt="plus-icon"
                        />
                        Add new job posting
                      </MiddalWrap>
                    </Link>
                    {/* </Dropdown.Item> */}
                  </li>
                  <li>
                    {/* <Dropdown.Item> */}
                    <Link href="/company/coming-soon">
                      <MiddalWrap href="/company/configure-job-rejection-letter">
                        <img
                          src={cdn('/static/img/menu-configure.svg')}
                          alt="configue"
                        />
                        Configure job posting
                      </MiddalWrap>
                    </Link>
                    {/* </Dropdown.Item> */}
                  </li>
                </ul>
                <Dropdown.Item onClick={logout} className="logout">
                  Log Out
                </Dropdown.Item>
              </div>
            </div>
            <div className="right-menus">
              <Link href="/company/coming-soon">
                <Dropdown className="notification_wrapper">
                  <Dropdown.Toggle
                    variant="success2"
                    id="dropdown-basic2"
                    className="has-notification"
                  >
                    <img
                      src={cdn('/static/img/notification.png')}
                      alt="notification"
                    />
                    {/* <img src={notificationBell} alt="notification" /> */}
                  </Dropdown.Toggle>

                  {/* <Dropdown.Menu>
                    <div className="notification-popup">
                      <div className="heading d-flex justify-content-between">
                        <h3>Notification</h3>
                        <Dropdown.Item href="#" className="close-popup">
                          <img
                            src={cdn('/static/img/close-icon.svg')}
                            alt="close"
                          />
                        </Dropdown.Item>
                      </div>
                      <div className="all-notifications">
                        <div className="notification_one">
                          <h4>Lorem Ipsum</h4>
                          <p>
                            is simply dummy text of the printing and typesetting
                          </p>
                        </div>
                        <div className="notification_one">
                          <h4>Lorem Ipsum</h4>
                          <p>
                            is simply dummy text of the printing and typesetting
                          </p>
                        </div>
                        <div className="notification_one">
                          <h4>Lorem Ipsum</h4>
                          <p>
                            is simply dummy text of the printing and typesetting
                          </p>
                        </div>
                        <Link href="/company/coming-soon">
                          <a href="/company/coming-soon" className="seeall">
                            See all
                          </a>
                        </Link>
                      </div>
                    </div>
                  </Dropdown.Menu>
                 */}
                </Dropdown>
              </Link>
              <div className="drop-down-menu">
                <div className="login-user">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="bg-white">
                      {/* <a href="/all-notification-new"> */}
                      <img
                        // src={cdn('/static/img/loggedinuser.svg')}
                        src={
                          companyUser && companyUser.photoUrl
                            ? companyUser.photoUrl
                            : cdn('/static/img/default-profile.png')
                        }
                        alt="userimg"
                      />
                      {/* </a> */}
                      {companyUser.firstName} {companyUser.lastName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="profile-drop-down">
                        <ul className="top">
                          <li>
                            {/* <Dropdown.Item> */}
                            <Link href="/company/company-page">
                              Company Page
                            </Link>
                            {/* </Dropdown.Item> */}
                          </li>
                          <li>
                            {/* <Dropdown.Item> */}
                            <Link href="/company/profile-personal-info">
                              Profile
                            </Link>
                            {/* </Dropdown.Item> */}
                          </li>
                          <li>
                            <Link href="/company/coming-soon">
                              Pricing &amp; Plans
                            </Link>

                            {/* <Dropdown.Item>Pricing &amp; Plans</Dropdown.Item> */}
                          </li>
                          <li>
                            {/* <Dropdown.Item> */}
                            <Link href="/company/help">Help</Link>
                            {/* </Dropdown.Item> */}
                          </li>
                        </ul>
                        <ul className="middle">
                          <li>
                            {/* <Dropdown.Item> */}
                            <Link href="/company/general-info">
                              <MiddalWrap
                                href="/company/general-info"
                                onClick={e => {
                                  localStorage.removeItem(
                                    'profileuserInformation',
                                  );
                                }}
                              >
                                <img
                                  src={cdn('/static/img/menu-plus-circle.svg')}
                                  alt="plus-icon"
                                />
                                Add new job posting
                              </MiddalWrap>
                            </Link>
                            {/* </Dropdown.Item> */}
                          </li>
                          <li>
                            {/* <Dropdown.Item> */}
                            <Link href="/company/coming-soon">
                              <MiddalWrap href="/company/configure-job-rejection-letter">
                                <img
                                  src={cdn('/static/img/menu-configure.svg')}
                                  alt="configue"
                                />
                                Configure job posting
                              </MiddalWrap>
                            </Link>
                            {/* </Dropdown.Item> */}
                          </li>
                        </ul>
                        <Dropdown.Item onClick={logout} className="logout">
                          Log Out
                        </Dropdown.Item>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </SecondaryWrapper>
      </SecondaryHeader>
    </>
  );
};

HeaderB2B.propTypes = {
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

HeaderB2B.defaultProps = {
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

export default HeaderB2B;

import React from 'react';
import Link from 'next/link';
import logoMain from '@src/assets/images/logo-black.svg';
import notificationBell from '@src/assets/images/notification.png';
import loggedinuser from '@src/assets/images/loggedinuser.svg';
import configure from '@src/assets/images/configure-2.png';
import PlusiCon from '@src/assets/images/plus-circle.svg';
// import uploadIcon from '@src/assets/images/upload-cloud.svg';
// import trashIcon from '@src/assets/images/trash-white-icon.svg';
import closeIcon from '@src/assets/images/close-icon.svg';
// import eyeOff from '@src/assets/images/eye-off.svg';
// import Page from '@components/templates/Page';
import {
  OuterMostWrapper,
  SecondaryHeader,
  SecondaryWrapper,
  NotificationPopup,
  AllNotifications,
  NotificationOne,
  LoginUser,
  ProfileDropDown,
} from './style';

const ProfileTopBar = () => {
  function showNotificationPop() {
    document.querySelector('.notification-popup').classList.toggle('showed');
  }
  function showProfileMenus() {
    document.querySelector('.profile-drop-down').classList.toggle('showed');
  }
  const rightContent = () => (
    <SecondaryHeader>
      <SecondaryWrapper className="secondary_wrapper d-flex flex-wrap align-items-center">
        <div className="logo">
          <img src={logoMain} alt="logomain" />
        </div>
        <div className="header-menus">
          <ul className="menu-list d-flex">
            <li>
              <a href="/dashboard-new">Dashboard</a>
            </li>
            <li>
              <a href="/">ATS</a>
            </li>
            <li>
              <a href="/" className="active">
                Messages
              </a>
            </li>
            <li>
              <Link href="/calendar">Calendar</Link>
            </li>
            <li>
              <a href="/">Applicant Database</a>
            </li>
          </ul>
        </div>
        <div className="right-menus d-flex align-items-center">
          <div className="notification_wrapper">
            <a
              href="/"
              onClick={showNotificationPop}
              className="notification-toggle has-notification"
            >
              <img src={notificationBell} alt="notificationbell" />
            </a>
            <NotificationPopup>
              <div className="heading d-flex justify-content-between">
                <h3>Notification</h3>
                <a className="close-popup" href="/">
                  <img src={closeIcon} alt="closeicon" />
                </a>
              </div>
              <AllNotifications>
                <NotificationOne>
                  <h4>Lorem Ipsum</h4>
                  <p>is simply dummy text of the printing and typesetting</p>
                </NotificationOne>
                <NotificationOne>
                  <h4>Lorem Ipsum</h4>
                  <p>is simply dummy text of the printing and typesetting</p>
                </NotificationOne>
                <NotificationOne>
                  <h4>Lorem Ipsum</h4>
                  <p>is simply dummy text of the printing and typesetting</p>
                </NotificationOne>
                <a href="/" className="seeall">
                  See all
                </a>
              </AllNotifications>
            </NotificationPopup>
          </div>
          <div className="drop-down-menu">
            <LoginUser>
              <a href="/">
                <img src={loggedinuser} alt="loggeduser" /> Audrey James
              </a>
              <ProfileDropDown>
                <ul className="top">
                  <li>
                    <a href="/">Company Page</a>
                  </li>
                  <li>
                    <a href="/">Profile</a>
                  </li>
                  <li>
                    <a className="active" href="/company/coming-soon">
                      Pricing &amp; Plans
                    </a>
                  </li>
                  <li>
                    <a href="/">Help</a>
                  </li>
                </ul>
                <ul className="middle">
                  <li>
                    <a href="/">
                      <img src={PlusiCon} alt="plusicon" />
                      Add new job posting
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <img src={configure} alt="configure" />
                      Configure job posting
                    </a>
                  </li>
                </ul>
                <a href="/" className="logout">
                  Log Out
                </a>
              </ProfileDropDown>
            </LoginUser>
          </div>
        </div>
      </SecondaryWrapper>
    </SecondaryHeader>
  );

  const content = rightContent();
  return <>{content}</>;
};

export default ProfileTopBar;

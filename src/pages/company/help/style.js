import styled from 'styled-components';
import { darken } from 'polished';
import { cdn } from '@utils/general';
import { smscreen, sizes as breakpoint } from '@src/assets/styles/medias';

export const OuterMostWrapper = styled.div`
  background: #f8fbff;
  letter-spacing: 0;
  min-height: 100vh;
  img {
    max-width: 100%;
    vertical-align: middle;
  }
  .modal-dialog {
    max-width: 330px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%) !important;
  }
`;

export const SecondaryHeader = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  background: #fff;
  padding: 13px 30px 13px 24px;
  position: relative;
  z-index: 99;
  letter-spacing: 0;
  img {
    vertical-align: middle;
  }

  .secondary_wrapper {
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    .logo {
      a {
        display: block;
        img {
          max-height: 36px;
        }
      }
    }

    .header-menus {
      ul {
        padding-left: 0;
        margin-left: 0;
        list-style: none;
        margin-left: 43px;
        margin-bottom: 0;
        li {
          margin-right: 64px;
          &:last-child {
            margin-right: 0;
          }
          a {
            padding: 20px 0;
            font-family: Mulish;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 153%;
            text-align: center;
            color: #485768;
            text-decoration: none;
            outline: none;
            transition: all 0.5s ease 0s;
            &:hover {
              color: #005e8b;
            }
            &.active {
              border-bottom: 2px solid #005e8b;
              color: #005e8b;
            }
          }
        }
      }
    }

    .right-menus {
      margin-left: auto;
      align-items: center;
      display: flex;
      a {
        text-decoration: none;
      }
      .login-user {
        font-size: 16px;
        font-weight: 700;
        padding-right: 0;
        position: relative;

        .dropdown-menu {
          background: #fff;
          border: 1px solid #dbe1e8;
          box-sizing: border-box;
          box-shadow: 0 3px 4px -3px #9ea0a3;
          border-radius: 10px 0 10px 10px;
          -webkit-transform: none !important;
          transform: none !important;
          right: 0 !important;
          left: auto !important;
          top: 57px !important;
          padding: 0;
          margin: 0;
          min-width: 285px;
        }
        a {
          color: #1d242f;
        }
        .dropdown {
          padding-right: 0;
        }
        &.dropdown {
          &::after {
            display: none;
          }
        }
        .dropdown-toggle {
          display: block;
          font-family: Mulish;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 153%;
          color: #1d242f;

          &::after {
            display: none;
          }
          svg {
            margin-left: 9px;
          }
        }
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 8px;
        }
      }
      .drop-down-menu {
        margin-left: 32px;
      }
    }
  }

  .notification_wrapper {
    position: relative;
    .dropdown-toggle {
      position: relative;
      :after {
        display: none;
      }
      &.has-notification {
        :before {
          content: '';
          position: absolute;
          top: -1px;
          right: -1px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fb6d3a;
        }
      }
    }
    .dropdown-menu {
      right: -20px !important;
      top: 55px !important;
      left: auto !important;
      float: none;
      min-width: 375px;
      padding: 0;
      margin: 0;
      background: #ffffff;
      border: 1px solid #dbe1e8;
      box-sizing: border-box;
      box-shadow: 0px 3px 4px -3px #9ea0a3;
      border-radius: 10px 0px 10px 10px;
      transform: none !important;
      &.show {
        display: block;
      }
      .notification-popup {
        box-shadow: none;
        position: relative;
        top: auto;
        right: auto;
        width: 100%;
        opacity: 1;
        visibility: visible;
        padding: 16px 16px 26px;
        background: #fff;
        border-radius: 10px;
        transition: all 0.1s ease-in-out;
        z-index: 99;
        .heading {
          justify-content: space-between;
          display: flex;
          h3 {
            font-family: Mulish;
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 153%;
            color: #1d242f;
            margin-bottom: 0;
          }
          .close-popup {
            width: max-content;
            padding: 0;
            background: transparent !important;
            img {
              width: 20px;
            }
          }
        }
        .all-notifications {
          margin-top: 16px;
          .notification_one {
            border-radius: 8px;
            padding: 8px;
            margin-bottom: 16px;
            position: relative;
            background: rgba(219, 225, 232, 0.25);
            font-family: Mulish;
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 153%;
            color: #1d242f;
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: -11px;
              bottom: 0;
              width: 8px;
              height: 8px;
              border-radius: 20px;
              background: #ed4a2a;
              margin: auto;
            }
            h4 {
              font-family: Mulish;
              font-style: normal;
              font-weight: 600;
              font-size: 13px;
              line-height: 153%;
              color: #0287c8;
              margin-bottom: 0;
            }
            p {
              margin-bottom: 0;
            }
          }
          .seeall {
            font-family: Mulish;
            font-style: normal;
            font-weight: bold;
            font-size: 13px;
            line-height: 153%;
            text-align: center;
            color: #005e8b !important;
            width: max-content;
            margin: auto;
            display: block;
            text-decoration: none;
            outline: none;
            transition: all 0.35s ease 0s;
            :hover {
              color: #1d242f !important;
            }
          }
        }
      }
    }
  }
`;

export const SecondaryWrapper = styled.div`
  #dropdown-basic2{
    box-shadow: none !important;
    padding: 0;
  }
  #dropdown-basic{
    border: none;
    color: #212529;
    font-weight: 500;
    padding-right: 22px !important;
    box-shadow: none !important;
    padding: 0;
    position: relative;

    &::after{
      content: '';
      position: absolute;
      right: 8px;
      left: auto;
      width: 10px;
      height: 10px;
      border: none;
      border-right: 2px solid #212529;
      border-bottom: 2px solid #212529;
      transform: rotate(45deg) translateY(-100%);
      top: 50%;
      display: block
    }

    img{
      margin-right: 6px
    }
  }
  .profile-drop-down{
    right: auto;
    position: relative;
    top: auto;
    width: 100%;
    border-radius: 10px;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    padding: 15px 0 24px;

    ul{
      padding-bottom: 15px;
      margin-bottom: 15px;
      position: relative;

      &.middle{
        li{
          &:not(:last-child){
            margin-bottom: 15px
          }
          a{
            padding: 12px 20px;
            display: flex;
            align-items: center;

            img{
              height: 27px !important;
              width: 27px !important;
              margin-right: 7px
            }
          }
        }
      }

      &::after{
        content: "";
        height: 1px;
        background: #dbe1e8;
        bottom: 0;
        position: absolute;
        left: 24px;
        right: 24px;
      }

      li{
        a{
          padding: 8px 21px 9px;
          display: block;
          position: relative;
          font-family: Mulish;
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 152%;
          color: #485768;
          border-left: 3px solid transparent;

          &:hover{
            background: rgba(219,225,232,.25);
          }
          
          &.active{
            border-left-color: #009de9;
            background: rgba(219,225,232,.25);
          }
        }
      }
    }
    .logout{
      display: block;
      text-align: center;
      font-family: Mulish;
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 152%;
      color: #d92f0e;
      width: -webkit-max-content;
      width: max-content;
      margin: 24px auto auto;
      background: transparent!important;
      outline: none;
    }
  }
  .notification-popup{
    .heading{
      d
    }
  }
`;

export const DashboardSection = styled.div`
  margin: 0 0 64px;
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
    margin: 0 0 16px;
  }
  h2 a {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 152%;
    color: #485768;
    float: right;
    transition: all 0.35s ease 0s;
    outline: none;
    text-decoration: none;
  }
  h2 a svg {
    margin-right: 8px;
    float: left;
  }
  h2 a svg path {
    vertical-align: middle;
    transition: all 0.35s ease 0s;
  }
  h2 a:hover svg path {
    stroke: #4fbbef;
  }
  h2 a:hover {
    color: #4fbbef;
  }
`;

export const FaqsWrap = styled.div`
  background: #f8fbff;
  padding: 24px 24px 48px;
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
    margin: 0 0 16px;
  }
`;

export const FaqsInner = styled.div`
  margin: auto;
  width: 920px;
  max-width: 100%;
  .accordion-item {
    margin: 0px 0px 24px;
    border: none;
    border-radius: 10px;
    box-shadow: rgb(207 216 226) 0px 8px 13px -3px;
    background: rgb(255, 255, 255);

    .accordion-body {
      font-family: Mulish;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 153%;
      color: rgb(29, 36, 47);
      padding: 16px 24px;
      background: rgb(255, 255, 255);
      border-radius: 0px 0px 10px 10px;
      p {
        margin: 0 0 16px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .accordion-header {
    margin-bottom: 0;
    margin-top: 20px;
    & > button {
      border: none;
      background: #005e8b;
      border-radius: 10px !important;
      display: block;
      width: 100%;
      text-align: left;
      padding: 16px 46px 16px 24px;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 153%;
      color: #fff;
      position: relative;
      text-decoration: none;
      box-shadow: none;

      &.collapsed {
        .toggle-icon {
          transform: rotate(180deg);
        }
      }

      svg {
        position: absolute;
        left: 16px;
        top: 18px;
      }
      h3 {
        button {
          padding: 0;
          display: flex;
          align-items: center;
          font-family: Mulish;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          width: 100%;
          color: #fff;
          text-decoration: none;
          box-shadow: none !important;

          .toggle-icon {
            position: absolute;
            right: 16px;
            top: 18px;
            line-height: 20px;
            -webkit-transition: 0.2s all ease-in-out;
            transition: 0.2s all ease-in-out;
          }
        }
      }
    }
  }
`;

export const Card = styled.div`
  margin: 0 0 24px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  background: #fff;
  card:last-child {
    margin-bottom: 0;
  }
`;

export const CardHeader = styled.div`
  padding: 0;
  box-shadow: none;
  border: none;
  background: #005e8b;
  border-radius: 10px;
  h3 {
    margin: 0;
    border-radius: 10px;
  }
  .btn-link {
    border: none;
    background: #005e8b;
    border-radius: 10px;
    display: block;
    width: 100%;
    text-align: left;
    padding: 16px 46px 16px 24px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #ffffff;
    position: relative;
    text-decoration: none;
    box-shadow: none;
  }
  .btn-link svg {
    position: absolute;
    left: 16px;
    top: 18px;
  }
`;

export const ToggleIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 18px;
  line-height: 20px;
  transition: all 0.35s ease 0s;
  img {
    vertical-align: middle;
    width: 24px;
  }
`;

export const FaqsBody = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 153%;
  color: #1d242f;
  padding: 16px 24px;
  background: #fff;
  border-radius: 0 0 10px 10px;
  p {
    margin: 0 0 16px;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

export const FaqsAction = styled.div`
  margin-top: 96px;
  .action-btn {
    box-sizing: border-box;
    box-shadow: none;
    text-align: center;
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 153%;
    color: #fff;
    padding: 7px 47px;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(237, 74, 42);
    border-image: initial;
    transition: all 0.35s ease 0s;
    background: rgb(237, 74, 42);
    border-radius: 10px;
    width: 920px;
    height: auto;
    &:hover {
      border-color: #ed4a2a;
      color: #ed4a2a;
      background: #fff;
    }
  }
`;

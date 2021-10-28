import styled from 'styled-components';
import { darken } from 'polished';
import { cdn } from '@utils/general';
import {
  Primary,
  White,
  Black,
  Blueberry,
  Haiti,
  GreyC4,
  PrimaryClean,
  Red,
  GreyCF,
  Grey61,
  Grey50,
} from '@src/assets/styles/colors';
import {
  DisplayXSmall,
  LabelLarge,
  DisplayXMedium,
  HeadingMedium,
  HeadingLarge,
  ParagraphLarge,
  LabelMedium,
  LabelXXXSmall,
  LabelXSmall,
} from '@assets/styles/typography';

import { RadiusSmall } from '@assets/styles/radius';
import { typoTheme } from '@assets/styles/typo';
import { DEFAULT_FONT } from '@assets/styles/theme';
import { smscreen, sizes as breakpoint } from '@assets/styles/medias';

const getBackgroundColor = ({ disabled, error }) => {
  if (error) return tint(0.95, Red);
  if (disabled) return Grey50;
  return White;
};

const getBorderColor = ({ disabled, error, focus }) => {
  if (error) return Red;
  if (disabled) return Grey50;
  if (focus) return Grey61;
  return GreyCF;
};

export const OuterMostWrapper = styled.div`
  letter-spacing: 0;
  background: #f8fbff;
  min-height: 100vh;
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

export const Label = styled.label`
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #1d242f;
  display: inline-block;
  margin: 0 0 5px;
  &.border-group-label {
    display: inline-block;
    margin-bottom: 0;
    background-color: #fff;
    margin-left: 20px;
    padding: 0 2px;
    position: relative;
  }
  .req-star {
    color: #ea0000;
  }
`;

export const ProfileSectionWrap = styled.div`
  background: #f8fbff;
  padding: 24px;
  // overflow-x: hidden;
  position: relative;
  display: flex;
  letter-spacing: 0;
  img {
    vertical-align: middle;
  }
`;

export const ProfileLeftsideMenu = styled.div`
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  border-radius: 10px;
  background: #fff;
  width: 375px;
  min-height: 300px;
  max-width: 100%;
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 153%;
    color: #1d242f;
    padding: 24px 24px 25px;
    position: relative;
    margin-bottom: 24px;
    &:before {
      content: '';
      position: absolute;
      left: 24px;
      right: 24px;
      bottom: 0;
      border-bottom: 1px solid #dbe1e8;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    position: sticky;
    top: 62px;
    li {
      a {
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 153%;
        color: #1d242f;
        padding: 8px 50px 8px 21px;
        border-left: 3px solid transparent;
        display: block;
        position: relative;
        text-decoration: none;
        transition: all 0.35s ease 0s;
        &:hover {
          background: rgba(219, 225, 232, 0.25);
        }
        svg {
          position: absolute;
          right: 33px;
          top: 15px;
        }
      }
      &.active {
        a {
          color: #009de9;
          font-weight: bold;
          border-color: #009de9;
          background: rgba(219, 225, 232, 0.25);
          svg {
            path {
              stroke: #009de9;
            }
          }
        }
      }
    }
  }
`;

export const ProfileRightPanel = styled.div`
  width: calc(100% - 375px);
  padding-left: 23px;
  position: relative;
`;

export const ProfileBoxForm = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 30px #cfd8e2;
  border-radius: 10px;
  &.mt-32 {
    margin-top: 32px;
  }
`;

export const ProfileBoxHead = styled.div`
  background: #005e8b;
  border-radius: 10px 10px 0px 0px;
  padding: 16px 24px;
  color: #fff;
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #ffffff;
    margin: 0;
  }
`;

export const BoxFormWrap = styled.div`
  width: 100%;
  padding: 24px;
  background: transparent;
  box-shadow: none;
  border-radius: 0 0 10px 10px;
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 152%;
    color: #1d242f;
    margin: 0 0 8px;
  }
  &.profile-change-password {
    padding-top: 40px;
  }
  .row {
    margin-left: -25px;
    margin-right: -25px;
    [class^='col-'] {
      padding-left: 25px;
      padding-right: 25px;
    }
  }
`;

export const UploadPicture = styled.div`
  border: 1px solid #dbe1e8;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 16px 18px;
  position: relative;
  margin: 0 0 32px;
  box-shadow: 0px 2px 5px #cfd8e2;
`;

export const UploadPictureField = styled.div`
  background: rgba(196, 196, 196, 0.1);
  border: 1px dashed rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: all 0.25s ease 0s;

  &:hover {
    background: rgba(196, 196, 196, 0.4);
  }
  input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

export const PictureDelete = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 60px;
  height: 60px;
  background: #ed4a2a;
  border-radius: 0px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`;

export const Row = styled.div`
  margin-left: -25px;
  margin-right: -25px;
  flex-wrap: wrap;
  display: flex;
  [class^='col-'] {
    padding-left: 25px;
    padding-right: 25px;
  }
`;

export const FormGroup = styled.div`
  margin: 0 0 48px;
  position: relative;
  .form-control {
    background: transparent;
    color: #1d242f;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    border: none;
    border-bottom: 1px solid #485768;
    border-radius: 0;
    height: auto;
    padding: 0 0 3px;
    box-shadow: none;
    -webkit-transition: all 0.35s ease 0s;
    transition: all 0.35s ease 0s;
    &:focus {
      border-color: #4fbbef;
    }
    &::-webkit-input-placeholder {
      color: #485768;
      opacity: 1;
    }
    &::-moz-placeholder {
      color: #485768;
      opacity: 1;
    }
    &:-ms-input-placeholder {
      color: #485768;
      opacity: 1;
    }
    &:-moz-placeholder {
      color: #485768;
      opacity: 1;
    }
    &[disabled] {
      opacity: 0.55;
    }
    &[readonly]{
      pointer-events: none;
    }
  }
  &.border-form-group{
    .form-control{
      padding: 10px 20px;
      border: 1px solid #485768;
      border-radius: 4px;
      margin-top: -8px;
      padding-right: 34px;
      &[readonly]{
        pointer-events: none;
      }
    }
  }
  &.date-group {
    position: relative;
    .react-datepicker-wrapper{
      width:100%;
    }
    .form-control {
      padding-right: 40px;
    }
    .date-icon {
      width: 24px;
      height:24px;
      display:inline-block;
      background-image: url('${cdn('/static/img/calendar-icon.svg')}');
      background-repeat: no-repeat;
      background-position: center;
      position:absolute;
      right: 0;
      top: 31px;
    }
  }
  &.mb-40{
    margin-bottom:40px;
  }
  &.mb-16{
    margin-bottom:16px;
  }
  &.mt-8{
    margin-top:8px;
  }
   
  select.form-control {
    -webkit-appearance: none;
    padding-right: 34px;
    background: url('${cdn('/static/img/select-down-bg.svg')}') no-repeat;
    background-position-x: calc(100% - 15px);
    background-position-y: center;
    background-size: 10px 6px;
  }
`;

export const ProfileBoxAction = styled.div`
  .action-btn {
    padding: 7px 47px;
    border: 2px solid #4fbbef;
    box-sizing: border-box;
    transition: all 0.35s ease 0s;
    box-shadow: none !important;
    text-align: center;
    background: #4fbbef;
    border-radius: 10px;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #1d242f;
    height: auto;
    &:hover {
      background: #fff;
      color: #4fbbef;
      border-color: #4fbbef;
    }
    &[disabled] {
      background: #c2c9d1;
      border-color: #c2c9d1;
      color: #485768;
      pointer-events: none;
      opacity: 1;
    }
  }
`;

export const ErrorMessagePhone = styled.div`
  // font-family: 'Lato', sans-serif;
  // font-weight: 400;
  // font-size: 12px;
  // line-height: 16px;
  // letter-spacing: -0.24px;
  // margin-top: 8px;
  // color: #ca3f2f;
  -webkit-font-smoothing: antialiased;
  text-transform: none;
  display: block;
  color: #ea0000;
  font-family: 'Mulish';
  font-size: 13px;
  line-height: 150%;
  font-weight: normal;
  margin: 5px 0 0;
  letter-spacing: 0;
`;

export const PhoneComponent = styled.div`
  position: relative;
  &.phone-group {
    .PhoneInputCountry {
      margin-right: 15px;
    }
    .PhoneInput--focus {
      border-color: #4fbbef;
    }
    input {
      background: transparent;
      color: #1d242f;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
      border: none;
      border-radius: 0;
      height: auto;
      padding: 0;
      box-shadow: none;
      transition: all 0.35s ease 0s;
      outline: none;
    }
  }
`;

export const ShowHidePassword = styled.div`
  width: 24px;
  position: absolute;
  top: 31px;
  right: 0;
  cursor: pointer;
  height: 24px;
  img {
    width: 100%;
  }
`;

export const ModalStyle = styled.div`
  letter-spacing: 0;
  font-family: 'Mulish', sans-serif;
  color: #1d242f;
  img {
    vertical-align: middle;
  }
  .modal-header {
    padding: 24px 24px 0 24px;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    .modal-title {
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 28px;
      color: #1d242f;
      margin: 0;
      padding: 0 0 16px;
      border-bottom: 1px solid #a1aab4;
      width: 100%;
    }
  }
  .header {
    text-align: center;
    padding: 25px 20px;
    border-bottom: 1px solid #dbe1e8;
    h3 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 15px;
      line-height: 1.2;
    }
    p {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    a {
      color: #009de9;
      font-size: 16px;
      outline: none;
      transition: all 0.35s ease 0s;
      &:hover {
        color: #1d242f;
      }
    }
  }
  .modal-body {
    text-align: center;
    padding: 20px 25px;
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #1d242f;
    a {
      text-decoration: none;
    }

    .verify-mail {
      margin: 30px 0 22px;
      h4 {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 0.5rem;
        line-height: 1.2;
      }
      p {
        font-size: 18px;
        line-height: 1.7;
        margin-bottom: 1rem;
        span {
          font-weight: 600;
        }
      }
    }
    .change-resend {
      margin-bottom: 55px;
      p {
        margin-bottom: 12px;
      }
      a {
        color: #009de9;
        text-decoration: none;
        transition:all 0.35s ease 0s;
        &:hover{
          color:#1d242f;
        }
      }
      .link-btn {
        color: #009de9;
        text-decoration: none;
        background: transparent;
        padding: 0;
        margin: 0;
        border: none;
        display: inline-block;
        transition:all 0.35s ease 0s;
        &:hover{
          color:#1d242f;
        }
      }
      .small {
        display: block;
        margin: 0 0 12px;
        font-size: 14px;
        line-height: 21px;
        color: #c2c9d1;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          width: 113px;
          height: 1px;
          background: #c2c9d1;
          left: calc(50% + 15px);
          top: 50%;
          opacity: 0.7;
        }
        &::after {
          content: '';
          position: absolute;
          width: 113px;
          height: 1px;
          background: #c2c9d1;
          right: calc(50% + 15px);
          top: 50%;
          opacity: 0.7;
        }
      }
    }
    .verify_mail {
      padding: 45px 25px 20px;
      text-align: left;
      .notreceived {
        display: block;
        width: max-content;
        margin-left: auto;
        text-align: right;
        color: #009de9;
        font-weight: 700;
        font-size: 16px;
        outline: none;
        transition: all 0.35s ease 0s;
        &:hover{
          color: #1D242F;
        }
      }
      input[type="number"]{
        &.form-control{
          -moz-appearance: textfield;
          ::-webkit-outer-spin-button,::-webkit-inner-spin-button{-webkit-appearance: none;margin: 0;}          
        }
      }
      .agreements {
        margin: 80px 0 20px;
        .list_one {
          position: relative;
          a{
            color: #009DE9;
            font-weight: 600;
            transition:all 0.35s ease 0s;
            &:hover{
              color: #1D242F;
            }
          }
        }
        input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          &:checked + label::before {
            border: none;
            background: url('${cdn(
              '/static/img/check-square.svg',
            )}') no-repeat center;
          }
        }
        label{
          position: relative;
          margin-bottom: 0;
          width: 100%;
          font-weight: 600;
          font-size: 16px;
          line-height: 152%;
          color: #485768;
          cursor: pointer;
          padding: 10px 8px 10px 34px;
          transition: all 0.2s ease 0s;
          z-index: 1;
          &:before {
            content: "";
            position: absolute;
            width: 24px;
            height: 24px;
            top: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            background: url('${cdn(
              '/static/img/check-box.svg',
            )}') no-repeat center;
            box-sizing: border-box;
            border-radius: 3px;
            transition: all .2s ease 0s;
            cursor: pointer;
          }
        }
      }
    }

    .action-btn {
      background: #4fbbef;
      color: #00405f;
      font-size: 18px;
      line-height: 24px;
      float: none;
      width: 100%;
      font-family: Mulish;
      font-weight: 700;
      padding: 8px 15px;
      border: 2px solid #4fbbef;
      box-sizing: border-box;
      border-radius: 10px;
      transition: all 0.35s ease 0s;
      box-shadow: none;
      text-align: center;
      text-decoration: none;
      outline: none;
      display: block;
      cursor: pointer;
      height: auto;
      &:hover {
        color: #4fbbef;
        background: #fff;
        border-color: #4fbbef;
      }
      &.disabled,&[disabled]{
        background: #C2C9D1 !important;
        border-color: #C2C9D1 !important;
        color: #485768 !important;
        opacity: 1;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }
`;

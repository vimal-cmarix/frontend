import styled from 'styled-components';
import {
  LabelMedium,
  LabelXSmall,
  HeadingLarge,
  LabelXXXSmall,
} from '@assets/styles/typography';

import { Grey, Haiti, GreyC4, PrimaryClean } from '@assets/styles/colors';
import { smscreen, xxsscreen } from '@assets/styles/medias';
import { cdn } from '@utils/general';
import { textInputs } from 'polished';

const bkgImage = cdn('/static/img/sign_background.svg');

export const ColRight = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding: 40px 54px;
  background: ${PrimaryClean};
`;

export const SvgIlustra = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  svg {
    display: block;
  }
`;

export const Quotes = styled.div`
  position: absolute;
  top: 40%;
  right: 50%;
  transform: translate3d(50%, -40%, 0);

  @media (max-width:1024px) {
    top: auto;
    position: relative;
    left: auto;
    right: auto;
    transform: none;
  }

  // @media ${smscreen} {
  //   top: 40%;
  // }
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

export const QuotesRetangle = styled.div`
  width: 625px;
  height: 359px;
  z-index: 1;
  margin-left: 165px;
  background-image: url(${bkgImage});
  background-repeat: no-repeat;

  @media ${smscreen} {
    width: 325px;
    height: 150px;
    background-size: cover;
    margin: auto;
  }
  @media (max-width: 480px) {
    width: 100%;
    background-size: contain;
  }
`;

export const ColLeft = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 54px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;

  @media (max-width: 1024px) {
    height: auto;
  }
  @media ${smscreen} {
    padding-bottom: 24px;
    height: 63.5%;
  }
  @media (max-width: 480px) {
    height: auto;
  }
`;

export const TopNav = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 24px 54px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media ${smscreen} {
    padding: 24px 46px 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 295px;
    margin: auto auto 30px;
  }

  @media ${xxsscreen} {
    padding: 24px 0 0;
    width: auto;
    text-align: center;
  }
`;

export const TopNavText = styled.span`
  padding-right: 10px;
  ${LabelMedium}
  color: ${GreyC4};

  @media ${smscreen} {
    margin-bottom:15px;
    width:200px;
    padding-right:0;
    color: #616161;
    text-align:center;
  }
`;

export const ExternalWrapper = styled.div`
  padding: 0 56px;

  @media ${smscreen} {
    padding: 0 32px;
  }
`;

export const TopNavFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media ${smscreen} {
    justify-content: center;
    padding: 24px 0;
  }
`;

export const SignUpText = styled.span`
  ${LabelMedium}
  color: ${Grey};
  margin-right: 16px;
`;

export const SignUpButtonWrapper = styled.div`
  width: 88px;
`;

export const PageWrapper = styled.div`
  display: flex;
  width: 450px;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 52px;

  @media ${smscreen} {
    width: 100%;
    padding: 52px 16px 0;
    box-sizing: border-box;
  }
`;

export const BrandWrapper = styled.div`
  width: 160px;
  margin: 32px auto 0;
`;

export const PageTitle = styled.div`
 ${HeadingLarge}
  color: ${Haiti};
  margin-bottom: 40px;

  @media ${smscreen} {
    ${HeadingLarge}
    text-align: left;
  }
`;

export const SignInFormWrapper = styled.div`
  margin-top: 24px;
`;

export const FieldWrapper = styled.div`
  margin-top: 24px;

  &:first-child {
    margin-top: 0;
  }
`;

export const SignInButtonWrapper = styled.div`
  padding-top: 24px;
  width: 128px;

  @media ${smscreen} {
    width: 256px;
    margin: 0 0;
  }
`;

export const IlustraWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  svg {
    display: block;
  }
`;

export const RecoverPasswordLink = styled.a`
  color: #485768;
  display: inline-block;
  text-decoration: none;
  transition: all 0.35s ease 0s;
  :hover {
    color: #4fbbef;
  }
`;

export const LikedinContainer = styled.div`
  margin-top: 32px;
  max-width: 256px;
  margin: 0 0;
`;

export const Subtitle = styled.h4`
  ${LabelXSmall}
  text-transform: uppercase;
  display: block;
  text-align: left;
  color: ${GreyC4};
  margin: 24px auto 0;
`;

export const TopNavButtonWrapper = styled.div`
  width: 128px;
  padding-right: 30px;
  @media ${smscreen} {
    margin-bottom: 15px;
    padding-right: 0;
  }
`;

export const BoxFormSection = styled.div`
  background: #f8fbff;
  font-family: 'Mulish', sans-serif;
  letter-spacing: 0;
  min-height: calc(100vh - 62px);
  img {
    max-width: 100%;
    vertical-align: middle;
  }
`;

export const Container = styled.div`
  max-width: 1160px;
`;

export const Label = styled.span`
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #1d242f;
  margin: 0 0 5px;
  display: inline-block;
  .req-star {
    color: #ea0000;
  }
`;

export const BoxFormWrap = styled.div`
  //   width: 684px;
  // margin: auto;
  max-width: 100%;
  // background: #ffffff;
  // box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  // border-radius: 10px;
  font-family: 'Mulish', sans-serif;
  color: #1d242f;
  //overflow: hidden;
`;

export const BoxFormTitle = styled.div`
  text-align: center;
  font-size: 24px;
  line-height: 153%;
  font-weight: 700;
  color: #1d242f;
  padding: 32px 24px 24px;
  border-bottom: 1px solid #dbe1e8;
  -webkit-border-radius: 10px 10px 0 0;
  border-radius: 10px 10px 0 0;
  position: relative;
`;

export const CreateResume = styled.div`
  padding: 30px 25px;
`;

export const ProfileVisabelWrap = styled.div`
  .border-form-group {
    .form-control {
      padding: 10px 20px;
      border: 1px solid #485768;
      border-radius: 4px;
      margin-top: -8px;
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
      &:focus {
        border-color: #4fbbef;
      }
    }

    select.form-control {
      -webkit-appearance: none;
      padding-right: 34px;
      background: url(/img/select-down-bg.svg) no-repeat;
      background-position-x: calc(100% - 15px);
      background-position-y: center;
      background-size: 10px 6px;
    }

    select.form-control {
      padding-right: 34px;
    }
    .text-count {
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      text-align: right;
      color: #1d242f;
      padding-top: 4px;
    }

    .form-group textarea.form-control {
      min-height: 130px;
      max-height: 231px;
      overflow-y: auto;
    }
  }
`;

export const CheckBoxWrap = styled.div``;

export const ContactInfoWrap = styled.div`
  .check_me {
    p {
      margin-top: 18px;
      margin-bottom: 0;
      font-size: 16px;
      line-height: 1.7;
      font-weight: 600;
    }
  }
`;

export const OnlineResumeWrap = styled.div`
  padding: 30px 25px;
  .want-to-upload p {
    font-size: 18px;
    font-weight: 600;
    color: #485768;
    margin-bottom: 20px;
  }
  .action-btn {
    display: block;
    background: #7027e0;
    color: #fff;
    font-size: 18px;
    line-height: 24px;
    float: none;
    width: 100%;
    font-family: Mulish;
    font-weight: 700;
    padding: 8px 15px;
    border: 2px solid #7027e0;
    box-sizing: border-box;
    border-radius: 10px;
    transition: all 0.35s ease 0s;
    outline: none;
    box-shadow: none;
    height: auto;
  }

  .small {
    display: block;
    position: relative;
    text-align: center;
    margin: 40px 0 35px;
    font-size: 16px;
    font-weight: 600;
  }
  .small::before {
    content: '';
    position: absolute;
    width: calc(50% - 30px);
    height: 1px;
    background: #485768;
    left: 0;
    top: 50%;
    opacity: 0.7;
  }
  .small::after {
    content: '';
    position: absolute;
    width: calc(50% - 30px);
    height: 1px;
    background: #485768;
    right: 0;
    top: 50%;
    opacity: 0.7;
  }
  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
`;

export const BoxFormBody = styled.div`
  padding: 24px;
  min-height: 604px;
`;

export const BoxFormAction = styled.div`
  padding: 24px;
  position: relative;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
  .btn {
    display: block;
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
    -webkit-border-radius: 10px;
    border-radius: 10px;
    transition: all 0.35s ease 0s;
    outline: none;
    box-shadow: none;
    text-align: center;
    text-decoration: none;
    height: auto;
  }
`;

export const PasswordNote = styled.p`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #1d242f;
  margin: 0 0 48px;
`;

export const FormGroup = styled.div`
  margin: 0 0 56px;
  position: relative;
  margin-top: 24px !important;
  .form-control {
    background: transparent;
    color: #485768;
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
    transition: all 0.35s ease 0s;
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
    &:focus {
      border-color: #4fbbef;
    }
  }
  .note {
    font-weight: 600;
    font-size: 16px;
    color: #485768;
    margin-bottom: 30px;
  }
  .note span {
    color: #ff0000;
    margin-right: 5px;
  }
`;

export const TermsText = styled.h4`
  ${LabelXXXSmall}
  display: block;
  text-align: center;
  color: ${GreyC4};
  margin: 10px auto 0;
  width: 310px;
`;

export const FormWrapperButton = styled.div`
  padding-top: 24px;
  width: 128px;

  @media ${smscreen} {
    width: 125px;
    margin: 0;
  }
`;

export const FormWrapperBlock = styled.div`
  &.form-group {
    margin-bottom: 32px;
    padding: 0px;
  }
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
    transition: all 0.35s ease 0s;
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
    &:focus {
      border-color: #4fbbef;
    }
  }
  .req-label {
    [class^='style__Label-'] {
      &:after {
        content: ' *';
        color: #ea0000;
        font-style: normal;
      }
    }
  }
  .req-error {
    font-family: Mulish;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: #ea0000;
    margin: 5px 0 0;
    display: inline-block;
  }
`;

export const FormGroupMb8 = styled.div`
  margin-bottom: 8px !important;
  .form-control {
    background: transparent;
    color: #485768;
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
    transition: all 0.35s ease 0s;
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
    &:focus {
      border-color: #4fbbef;
    }
  }
`;

// export const LeftSideMenu = styled.div`
//   .profile-section-wrap {
//     background: #f8fbff;
//     padding: 24px;
//     display: -webkit-flex;
//     display: flex;
//   }
//   .profile-leftside-menu {
//     box-shadow: 0 8px 13px -3px #cfd8e2;
//     border-radius: 10px;
//     background: #fff;
//     width: 375px;
//     min-width: 375px;
//     min-height: 300px;
//     height: 100%;
//   }
//   .profile-leftside-menu h2 {
//     font-family: Mulish;
//     font-style: normal;
//     font-weight: 700;
//     font-size: 24px;
//     line-height: 153%;
//     color: #1d242f;
//     padding: 24px 24px 25px;
//     position: relative;
//     margin-bottom: 24px;
//   }

//   .profile-leftside-menu h2:before {
//     content: '';
//     position: absolute;
//     left: 24px;
//     right: 24px;
//     bottom: 0;
//     border-bottom: 1px solid #dbe1e8;
//   }

//   .profile-leftside-menu ul {
//     margin: 0;
//     padding: 0;
//     list-style-type: none;
//     position: sticky;
//     top: 0;
//   }

//   .profile-leftside-menu ul li.active a {
//     color: #009de9;
//     font-weight: 700;
//     border-color: #009de9;
//     background: rgba(219, 225, 232, 0.25);
//   }

//   .profile-leftside-menu ul li a {
//     font-family: Mulish;
//     font-style: normal;
//     font-weight: 600;
//     font-size: 18px;
//     line-height: 153%;
//     color: #1d242f;
//     padding: 8px 50px 8px 21px;
//     border-left: 3px solid transparent;
//     display: block;
//     position: relative;
//     text-decoration: none;
//     transition: all 0.35s ease 0s;
//     &:hover {
//       background: rgba(219, 225, 232, 0.25);
//     }
//   }
//   a {
//     text-decoration: none !important;
//   }

//   .profile-leftside-menu ul li a svg {
//     position: absolute;
//     right: 33px;
//     top: 15px;
//   }
//   .profile-leftside-menu ul li.active a svg path {
//     stroke: #009de9;
//   }
//   svg:not(:root) {
//     overflow: hidden;
//   }
//   .profile-leftside-menu {
//     ul {
//       .active.has-submenu.opened {
//         a {
//           svg {
//             -webkit-transform: rotate(90deg);
//             transform: rotate(90deg);
//           }
//         }
//       }
//       .sub-menus {
//         height: 0;
//         overflow: hidden;
//         li {
//           a {
//             padding-left: 36px;
//             color: #1d242f;
//             font-weight: 400;
//             &.active {
//               font-weight: 700;
//               padding-left: 45px;
//               background: #dbe1e8;
//               border-top-right-radius: 8px;
//               border-bottom-right-radius: 8px;
//             }
//           }
//         }
//       }
//       li {
//         &.has-submenu.opened {
//           .sub-menus {
//             height: 100%;
//             overflow: visible;
//           }
//         }
//       }
//     }
//   }
// `;

export const LeftSideMenu = styled.div`
  box-shadow: 0 8px 13px -3px #cfd8e2;
  border-radius: 10px;
  background: #fff;
  width: 375px;
  min-width: 375px;
  min-height: 300px .profile-section-wrap {
    background: #f8fbff;
    padding: 24px;
    display: -webkit-flex;
    display: flex;
  }
  .profile-leftside-menu {
    // box-shadow: 0 8px 13px -3px #cfd8e2;
    border-radius: 10px;
    background: #fff;
    width: 100%;
    max-width: 375px;
    min-height: 300px;
    -webkit-transition: 0.3s all ease-in-out;
    transition: 0.3s all ease-in-out;
    position: sticky;
    top: -47px;

    &.sticky-left-panel {
      position: fixed;
      top: -47px;
    }

    h2 {
      font-family: Mulish;
      font-style: normal;
      font-weight: 700;
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
      li {
        &.has-submenu {
          background: rgba(219, 225, 232, 0.1) !important;
        }
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
            font-weight: 700;
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
  }

  a {
    text-decoration: none !important;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  .profile-leftside-menu {
    ul {
      .active.has-submenu.opened {
        a {
          svg {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
          }
        }
      }
      .sub-menus {
        height: 0;
        overflow: hidden;
        li {
          a {
            padding-left: 36px;
            color: #1d242f;
            font-weight: 400;
            cursor: pointer;

            &.active {
              font-weight: 700;
              padding-left: 45px;
              background: #dbe1e8;
              border-top-right-radius: 8px;
              border-bottom-right-radius: 8px;
            }
          }
        }
      }
      li {
        &.has-submenu.opened {
          .sub-menus {
            height: 100%;
            overflow: visible;
          }
        }
      }
    }
  }
`;

export const ColorPopover = styled.div`
  left: 100px;
  top: 50px;
  position: absolute;
  z-index: 2;
  width: 220px;
  trigger: 'focus';
  padding: 10px 10px;
  box-sizing: initial;
  background: #ffffff;
  border: 1px solid #dbe1e8;
  box-sizing: border-box;
  box-shadow: 1px 3px 4px -3px #b6b6b6;
  border-radius: 10px;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  color: #485768;

  .sketch-picker {
    width: 100% !important;
    padding: 0 0 5px !important;
    box-sizing: initial;
    background: #fff;
    border-radius: 0;
    box-shadow: none !important;
    .flexbox-fix input {
      font-family: Mulish, sans-serif;
      font-style: normal;
      font-weight: 600;
      line-height: 152%;
      text-align: center;
      color: #1d242f;
      width: 100% !important;
      outline: none;
      border-radius: 0;
      border: 1px solid #c2c9d1 !important;
      box-shadow: none !important;
      transition: all 0.35s ease 0s;
      &:focus {
        border-color: #4fbbef !important;
      }
    }
    label {
      font-family: Mulish, sans-serif;
      font-style: normal;
      font-weight: 600;
      line-height: 152%;
      color: #1d242f !important;
      width: 100% !important;
      font-size: 12px !important;
    }
  }
`;

export const PopoverAction = styled.div`
  text-align: center;
  justify-content: space-between;
  display: flex;
  button {
    padding: 6px 18px;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 153%;
    color: #1d242f;
    background: #4fbbef;
    border-radius: 7px;
    display: inline-block;
    transition: all 0.35s ease 0s;
    box-shadow: none;
    outline: none;
    border: 2px solid #4fbbef;
    text-align: center;
    height: auto;
    min-width: 85px;
    &:first-child {
      // color: #4fbbef;
      // background: #fff;
      background: #c2c9d1;
      border-color: #c2c9d1;
      color: #485768;
      opacity: 1;
      &:hover {
        border: 2px solid #4fbbef;
        color: #4fbbef !important;
        background: #fff !important;
      }
    }
    &:hover {
      border: 2px solid #4fbbef;
      color: #4fbbef !important;
      background: #fff !important;
    }
  }
`;

export const ReftSideMenu = styled.div`
  width: calc(100% - 375px);
  padding-left: 23px;
  position: relative;
  margin-left: auto;

  .small {
    margin: 10px 0 30px;
    text-transform: uppercase;
    color: #485768;
    font-weight: 700;
    display: block;
    position: relative;
    text-align: center;
    font-size: 16px;

    &::before {
      content: '';
      position: absolute;
      width: 200px;
      left: calc(50% + 30px);
      height: 1px;
      background: #485768;
      top: 50%;
      opacity: 0.7;
    }

    &::after {
      content: '';
      position: absolute;
      width: 200px;
      right: calc(50% + 30px);
      height: 1px;
      background: #485768;
      top: 50%;
      opacity: 0.7;
    }
  }

  .update {
    padding: 6px 40px;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 153%;
    color: #000;
    background: #4fbbef;
    border-radius: 10px;
    display: block;
    width: -webkit-max-content;
    width: max-content;
    border: none;
    transition: all 0.35s ease 0s;
    box-shadow: none;
    outline: none;
    border: 2px solid #4fbbef;
    height: auto;
    min-width: 159px;
    text-align: center;
    &:hover {
      color: #4fbbef;
      background: #fff;
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

  .add-another {
    text-align: right;
    padding-top: 30px;
    padding-bottom: 10px;
    border-top: 1px solid #dedede;
    margin-top: 20px;

    a,
    button {
      font: 700 18px 'Mulish';
      color: #485768;
      align-items: center;
      justify-content: flex-end;
      display: flex;
      border: none;
      background: transparent;
      padding: 0;
      margin: 0 0 0 auto;
      outline: none;
      box-shadow: none;

      img {
        margin-right: 10px;
        opacity: 0.8;
      }
    }
  }
  .company-page-main {
    .company-preview-wrap {
      background: hsla(0, 0%, 76.9%, 0.15);
      border-radius: 10px;
      margin-bottom: 35px;
      position: relative;
      padding: 0;
      &.img-pre-box {
        img {
          width: 100%;
          height: 300px;
          border-radius: 10px;
          object-fit: cover;
          object-position: center;
        }
      }

      .delete {
        width: 55px;
        height: 55px;
        justify-content: center;
        background: #ed4a2a;
        position: absolute;
        right: 0;
        top: 0;
        border-top-right-radius: 10px;
        display: flex;
        align-items: center;
        border: none;
        box-shadow: none;
        outline: none;
        z-index: 1;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      }
      video {
        width: 100%;
        border-radius: 10px;
        max-height: 480px;
        object-fit: cover;
        vertical-align: middle;
        @media screen and (max-width: 1560px) {
          max-height: 400px;
        }
      }
    }
  }

  .company-page-main .set-color_one .show-color.blue {
    background: #009de9;
  }
  .company-page-main .set-color_one .show-color {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 8px;
    margin-top: 12px;
  }
  .company-page-main .set-color_one .show-color.black {
    background: #1d242f;
  }

  .company-page-main .set-color_one .show-color {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 8px;
    margin-top: 12px;
  }
  .card {
    padding: 24px;
    box-shadow: 0px 0px 30px #cfd8e2 !important;
    background: #fff !important;
    border-radius: 10px;
    border: none;
    margin-bottom: 32px;
    transition: all 0.3s ease 0s;
    &#SocialFeed {
      min-height: calc(100vh - 100px);
    }

    &:last-child {
      margin-bottom: 0;
    }

    & > p {
      margin-bottom: 16px;
      font: 400 16px 'Mulish';
      line-height: 1.7;
    }

    &:hover {
      box-shadow: -5px 15px 30px -3px #cfd8e2 !important;
    }
  }

  .company-page-main .drag-drop,
  .company-page-main .drag-drop .delete {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .company-page-main .drag-drop {
    background: hsla(0, 0%, 76.9%, 0.1);
    border-radius: 10px;
    border: 2px dashed rgba(0, 0, 0, 0.05);
    height: 120px;
    position: relative;
    margin-bottom: 35px;
  }

  .company-page-main .upload-video {
    background: #dbe1e8;
    border-color: #dbe1e8;
    height: 238px;
    position: relative;
    flex-direction: column;
    .upload-popup-btn {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      display: block;
      padding: 0;
      margin: 0;
      border: none;
      border-radius: 10px;
      background: transparent;
    }
    .box-note {
      font-size: 14px;
      line-height: 20px;
      color: rgba(29, 36, 47, 0.75);
      margin-top: 8px;
    }
  }
  .company-page-main .drag-drop .delete {
    width: 55px;
    height: 55px;
    background: #ed4a2a;
    position: absolute;
    right: -2px;
    top: -2px;
    border-top-right-radius: 10px;
    z-index: 1;
  }

  .company-page-main .drag-drop,
  .company-page-main .drag-drop .delete {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .company-page-main select {
    margin-top: -8px;
  }

  .company-page-main select {
    border: 1px solid #485768 !important;
    border-radius: 4px;
    height: 50px;
    padding: 5px 12px;
    -webkit-appearance: none;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABWSURBVHgBTYq7DYAwDERtsoAlFmAMCoowAiOwASUFA7BVWkpGyAgMYOtQIuVz1b27x8t4BQJ56gO8g5ruAGLbEBW2cYJZzsmxC6kbbH2+u4r59HJI4R98ux2l4gUVGgAAAABJRU5ErkJggg==)
      no-repeat 50%;
    background-position-x: calc(100% - 20px);
    background-size: 8px;
    font: 600 18px 'Mulish';
    color: #485768;
    box-shadow: none !important;
    outline: none !important;
  }
  .form-control-new {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
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
    &:focus {
      border-color: #4fbbef;
    }
  }

  select {
    word-wrap: normal;
  }

  button,
  select {
    text-transform: none;
  }

  .company-common-title {
    font: 600 18px 'Mulish';
    color: #1d242f;
    margin-bottom: 12px;
    small {
      font-size: 75%;
      font-weight: normal;
      color: rgba(29, 36, 47, 0.75);
    }
  }

  .company-benefits-list .card-header {
    padding: 0 24px;
    margin: 0;
    background: transparent;
    border: none;
  }

  .company-benefits-list .card-header .btn-link.collapsed {
    color: #1d242f;
  }

  .company-benefits-list .card-header .btn-link {
    border: none;
    border-radius: 0;
    width: 100%;
    text-align: left;
    display: block;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    color: #005e8b;
    position: relative;
    padding: 12px 32px 12px 38px;
    text-decoration: none;
    box-shadow: none;
  }
  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  .company-benefits-list .card-header .btn-link > img,
  .company-benefits-list .card-header .btn-link > svg {
    position: absolute;
    left: 0;
    top: 10px;
  }

  .company-benefits-list .card-header .btn-link.collapsed .toggle-icon {
    background: none;
  }
  .company-benefits-list .card-header .btn-link .toggle-icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-repeat: no-repeat;
    background-position: 50%;
    background-image: url(/img/minus-circle.svg);
  }
`;

export const ForgotPasswordLink = styled.p`
  font-weight: 600;
  text-align: right;
`;

export const ProfileSectionWrap = styled.div`
  background: #f8fbff;
  padding: 24px;
  display: flex;
  //overflow-x: hidden;
  position: relative;
  letter-spacing: 0;
`;

export const SetColorOne = styled.div`
  margin-top: 8px;

  &:not(:first-of-type) {
    margin-top: 24px;
  }

  .color-name {
    font: 700 16px 'Mulish';
    color: #1d242f;
    margin-bottom: 6px;
  }
  p {
    font: 400 16px 'Mulish';
    margin-bottom: 0;
  }
`;

export const BrandColorPicker = styled.div`
  margin-top: 12px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  .brand-color-picker-btn {
    border: none;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    display: block;
    margin-top: 0;
  }
`;

export const Wrapper = styled.div`
  overflow: hidden;
  margin: 0 0 24px;

  iframe {
    max-width: 100%;
    width: 100%;
    height: 360px;
    border: none;
    vertical-align: middle;
    border-radius: 5px;
  }

  @media ${smscreen} {
    height: 230px;
    box-sizing: border-box;

    iframe {
      height: 100%;
      width: 100%;
    }
  }
`;

export const DragDrop = styled.div`
  background: rgba(196, 196, 196, 0.1);
  border-radius: 10px;
  border: 2px dashed rgba(0, 0, 0, 0.05);
  min-height: 130px;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 32px;
  position: relative;
  display: flex;

  .drag-drop-group {
    font-family: Mulish;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 153%;
    text-align: center;
    color: #1d242f;
    img {
      margin: -4px 10px 0 0;
      vertical-align: middle;
    }
  }
  .upload-popup-btn {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    border-radius: 10px;
    background: transparent;
  }

  .delete {
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ed4a2a;
    position: absolute;
    right: -2px;
    top: -2px;
    border-top-right-radius: 10px;
    z-index: 1;
    outline: none;
    border: none;
    box-shadow: none;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      background: transparent;
    }
  }

  &.upload-video {
    p {
      background: transparent;
    }
    button {
      img {
        width: max-content;
      }
    }
  }

  &.employee_picture {
    background: #fff;
    justify-content: flex-start;
    box-shadow: 0px 2px 5px #cfd8e2;
    border-color: transparent;
    border: 1px solid #dbe1e8;
    padding: 16px;

    .emp-pic-box {
      width: 100px;
      height: 100px;
      border-radius: 100px;
      background: rgba(196, 196, 196, 0.1);
      border: 1px dashed rgba(0, 0, 0, 0.1);
      transition: all 0.25s ease 0s;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      display: flex;
      &:hover {
        background: rgba(196, 196, 196, 0.4);
      }
      .upload-popup-btn {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        display: block;
        padding: 0;
        margin: 0;
        border: none;
        border-radius: 100px;
        background: transparent;
      }
      img {
        width: 25px;
        margin: 0;
      }
    }
  }

  .company-pro-preview-wrap {
    width: 150px;
    height: 150px;
    border-radius: 200px;
    background: rgba(196, 196, 196, 0.14);
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: cover;
    }
  }
`;

export const FlexRowHalf = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    width: calc(50% - 15px);

    span {
      background: #fff;
      letter-spacing: 0;
      font-family: Mulish;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #1d242f;
      margin: 0 0 5px;
      display: inline-block;
    }
    input::placeholder {
      color: #1d242f;
      opacity: 1 !important;
    }
  }
`;

export const WidthFullBlock = styled.div`
  width: 100% !important;

  &.textarea-div {
    margin-bottom: 8px;
    span {
      margin-left: 12px;
      margin-bottom: 0;
      padding: 0 2px;
    }
  }

  span {
    background: #fff;
    position: relative;
    z-index: 1;
    letter-spacing: 0;
    font-family: Mulish;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #1d242f;
    margin: 0 0 5px;
    display: inline-block;
  }

  input {
    &::placeholder {
      opacity: 1 !important;
      color: #1d242f;
    }
  }
  textarea {
    width: 100%;
    height: 110px;
    border-radius: 4px;
    border: 1px solid #485768;
    margin-top: -8px;
    padding: 18px 15px 10px;
    outline: none;
    transition: all 0.35s ease 0s;
    color: #1d242f;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    vertical-align: middle;
    &:focus {
      border-color: #4fbbef;
      &::placeholder {
        opacity: 0;
      }
    }
    &::placeholder {
      -webkit-transition: 0.3s all ease-in-out;
      transition: 0.3s all ease-in-out;
      color: #485768;
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
  }
`;

export const TextCount = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  color: #1d242f;
  padding-top: 4px;
`;

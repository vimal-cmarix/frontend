import styled from 'styled-components';
import {
  LabelMedium,
  LabelXSmall,
  HeadingLarge,
} from '@assets/styles/typography';

import { Grey, Haiti, GreyC4, PrimaryClean } from '@src/assets/styles/colors';
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

export const BtnComing = styled.div`
  // cursor: pointer;
  // background-color: #4fbbef;
  // color: #fff;
  // font-size: 15px;
  // line-height: 20px;
  // border-radius: 7px;
  // padding: 12px 25px;
  // text-align: center;
  // margin-top: 70px;
  // outline: none;
  // transition: all 0.2s ease 0s;
  // min-width: 140px;
  // box-sizing: border-box;
  // font-weight: 700;
  // letter-spacing: 0.5px;

  // &:hover {
  //   background-color: #1c9ad6;
  // }

  background: #4fbbef;
  color: #000;
  font-size: 18px;
  line-height: 24px;
  float: none;
  font-family: Mulish;
  font-weight: 700;
  padding: 8px 30px;
  border: 2px solid #4fbbef;
  box-sizing: border-box;
  border-radius: 10px;
  transition: all 0.35s ease 0s;
  box-shadow: none;
  text-align: center;
  text-decoration: none;
  outline: none;
  display: inline-block;
  cursor: pointer;
  height: auto;
  letter-spacing: 0.5px;
  margin-top: 70px;

  &:hover {
    color: #4fbbef;
    background: #fff;
    border-color: #4fbbef;
  }

  @media (max-width: 767px) {
    margin-top: 45px;
    font-size: 16px;
    padding: 8px 25px;
    // min-width: 134px;
  }
`;

export const Htext = styled.div`
  h2 {
    font-weight: 700;
    font-size: 250px;
    line-height: 0.8;
    margin: 50px 0 25px;

    @media (max-width: 767px) {
      font-size: 180px;
      margin-top: 40px;
      margin-bottom: 18px;
    }
    @media (max-width: 480px) {
      font-size: 46vw;
    }
  }
`;

export const MainPageDivision = styled.div`
  background: #f0f6ff;
  min-height: 100vh;
  letter-spacing: 0;
  img {
    vertical-align: middle;
  }
`;

export const PageHeader = styled.div`
  padding: 40px 118px 40px 100px;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
  position: relative;
  display: -webkit-flex;
  display: flex;
  .sizigi-header-logo a {
    display: inline-block;
    img {
      max-width: 130px;
      vertical-align: middle;
    }
  }
  .sizigi-header-nav {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #1d242f;
    line-height: 153%;
    align-items: center;
    margin-left: auto;
    min-height: 43px;
    display: flex;
    a {
      line-height: 24px;
      margin-left: 30px;
      text-decoration: none;
      outline: none;
      transition: all 0.25s ease 0s;
      position: relative;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: #1d242f;
      &:hover {
        color: #009de9;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -5px;
        margin: auto;
        width: 0;
        opacity: 0;
        height: 2px;
        border-radius: 20px;
        transition: all 0.35s ease 0s;
        background: #009de9;
      }
      &.active {
        :before {
          width: 100%;
          opacity: 1;
        }
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

export const BoxWrapOuter = styled.div`
  width: calc(100% - 472px);
  padding: 0 0 50px;
  font-family: 'Mulish', sans-serif;
`;

export const FormBtmNote = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 153%;
  text-align: center;
  color: #1d242f;
  margin-top: 30px;
  a {
    text-decoration: underline;
    color: #1d242f;
    outline: none;
    transition: all 0.35s ease 0s;
    &:hover {
      color: #009de9;
      text-decoration: none;
    }
  }
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
  &:hover {
    color: #4fbbef;
  }
  img {
    width: 24px;
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
  display: flex;
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
  display: inline-block;
  margin: 0 0 5px;
  .req-star {
    color: #ea0000;
  }
`;

export const BoxFormWrap = styled.div`
  width: 684px;
  margin: auto;
  max-width: 100%;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-family: 'Mulish', sans-serif;
  color: #1d242f;
`;

export const BoxFormTitle = styled.div`
  text-align: center;
  font-size: 24px;
  line-height: 153%;
  font-weight: 700;
  color: #1d242f;
  padding: 32px 24px 24px;
  border-bottom: 1px solid #dbe1e8;
  border-radius: 10px 10px 0 0;
  position: relative;
  h2 {
    font-size: inherit;
    color: inherit;
    line-height: inherit;
    font-family: inherit;
    font-weight: inherit;
    margin: 0;
  }
`;

export const BoxFormBody = styled.div`
  padding: 24px;
  min-height: 604px;
`;

export const BoxFormAction = styled.div`
  padding: 24px;
  position: relative;
  border-radius: 0 0 10px 10px;
  &:before {
    content: '';
    position: absolute;
    left: 24px;
    right: 25px;
    top: 0;
    border-top: 1px solid #a1aab4;
  }
  .btn {
    background: #4fbbef;
    color: #000;
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
  }
  &.mb-8 {
    margin-bottom: 8px;
  }
  &.mt-24 {
    margin-top: 24px;
  }
`;

export const FormGroupMb8 = styled.div`
  margin: 0 0 56px;
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
  }
  &.mb-8 {
    margin-bottom: 8px;
  }
  &.mt-24 {
    margin-top: 24px;
  }
`;

export const ForgotPasswordLink = styled.div`
  text-align: right;
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  color: #485768;
`;

export const ShowHidePassword = styled.div`
  width: 22px;
  height: 22px;
  position: absolute;
  top: 29px;
  right: 0;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

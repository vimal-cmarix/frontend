import styled from 'styled-components';
import { darken } from 'polished';

import { Primary, White, Black, Blueberry } from '@assets/styles/colors';
import {
  DisplayXSmall,
  LabelLarge,
  DisplayXMedium,
  HeadingMedium,
  HeadingLarge,
  ParagraphLarge,
} from '@assets/styles/typography';
import { smscreen, sizes as breakpoint } from '@src/assets/styles/medias';

export const ColRight = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding: 40px 54px;
  background: ${Primary};
`;
export const MainPageDivision = styled.div`
  background: #f0f6ff;
  min-height: 100vh;
`;

export const FormBtmNote = styled.div``;

export const FormLeftBarP = styled.p`
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 153%;
  color: #1d242f;
  margin-top: 16px;
`;

export const FormLeftBar = styled.div`
  background: #fff;
  padding: 40px 24px 60px;
  margin-top: -125px;
  position: relative;
  z-index: 999;
  max-width: 472px;
  width: 100%;
  min-height: 100vh;
  .logo {
    margin-bottom: 60px;
    a {
      display: inline-block;
      img {
        max-width: 130px;
      }
    }
  }
  h2 {
    font: 700 32px/1.5 'Mulish';
    margin: 0;
    color: #1d242f;
  }
  .vector-img {
    position: absolute;
    bottom: 40px;
    left: 45%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
`;

export const BoxWrapOuter = styled.div`
  width: calc(100% - 472px);
  padding: 0 0 50px;
  font-family: 'Mulish', sans-serif;
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
`;

export const QuotesRetangle = styled.div`
  width: 168px;
  height: 359px;
  opacity: 0.05;
  border: solid 10px ${White};
  z-index: 1;
  margin-left: 165px;
`;

export const QuotesText = styled.div`
  ${DisplayXSmall}
  color: ${White};
  background: ${Primary};
  z-index: 2;
  position: absolute;
  // transform: translate3d(0,-50%,0);
  top: 50%;
  left: 43%;
  text-align: right;
  width: 302px;
  padding: 36px 0 24px 0;
  transform: translate(-50%, -50%);

  small {
    ${LabelLarge}
    display:block;
    padding-top: 24px;
  }
`;

export const ColLeft = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
`;

export const TopNav = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 24px 54px;

  @media ${smscreen} {
    justify-content: center;
    padding: 24px 0;
  }
`;

export const TopNavText = styled.div`
  padding-right: 16px;
`;

export const TopNavButtonWrapper = styled.div`
  width: 80px;

  @media screen and (min-width: ${breakpoint.mediumphone}) {
    width: 108px;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  flex-direction: column;
  color: ${Black};
  text-align: center;
  align-items: center;
  padding-top: 100px;
`;

export const FormWrapperBlock = styled.div`
  padding-top: 24px;
  max-width: 450px;
  width: 450px;
  text-align: left;

  @media ${smscreen} {
    width: 256px;
  }
`;

export const FormWrapperButton = styled.div`
  padding-top: 24px;
  width: 128px;
  margin: 0 auto;

  @media ${smscreen} {
    width: 256px;
  }
`;

export const FormWrapperTitle = styled.h1`
  ${DisplayXMedium}

  @media ${smscreen} {
    ${HeadingLarge}
    text-align: center;
  }
`;

export const FormWrapperResend = styled.p`
  ${LabelLarge}
  color: ${Blueberry};
  margin-top: 48px;
  cursor: pointer;
  margin-bottom: 179px;
  transition: all .1s ease-in-out;

  &:hover {
    color: ${darken(0.12, Blueberry)};
  }
`;

export const FormWrapperDescription = styled.h2`
  ${HeadingMedium}
  margin-top: 16px;
  margin-bottom: 48px;
  max-width: 530px;
  align-self: center;
  text-align: center;

  @media ${smscreen} {
    ${ParagraphLarge}
    text-align: center;
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
  color: rgb(29, 36, 47);
  margin: 0px 0px 5px;
  span {
    color: #ea0000;
  }
`;

export const BoxFormWrap = styled.div`
  width: 684px;
  margin: auto;
  max-width: 100%;
  background: #fff;
  box-shadow: 0 0 4px 1px rgb(0 0 0 / 8%);
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
  -webkit-border-radius: 10px 10px 0 0;
  border-radius: 10px 10px 0 0;
  position: relative;
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
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -webkit-transition: all 0.35s ease 0s;
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
    -webkit-transition: all 0.35s ease 0s;
    transition: all 0.35s ease 0s;
  }
`;

export const ForgotPasswordLink = styled.p`
  font-weight: 600;
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
    -webkit-transition: all 0.35s ease 0s;
    transition: all 0.35s ease 0s;
  }
`;

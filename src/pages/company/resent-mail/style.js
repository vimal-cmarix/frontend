//import styled from 'styled-components';
//import { darken } from 'polished';
import { cdn } from '@utils/general';

import styled, { css } from 'styled-components';
import { Black, Gray415, Blueberry, Grey400 } from '@assets/styles/colors';
import {
  DisplayXMedium,
  HeadingMedium,
  LabelLarge,
  LabelXSmall,
  DisplayXMediumSmall,
  DisplayXSmall,
  HeadingLarge,
  ParagraphMedium,
  LabelMedium,
} from '@assets/styles/typography';
import { lighten, darken } from 'polished';
import { smscreen, xxsscreen, smallestHeight } from '@assets/styles/medias';

export const CodeTitle = styled.h1`
  ${props => (props.small ? DisplayXMediumSmall : DisplayXMedium)}

  @media ${smscreen} {
    padding-top: 32px;
    ${props => (props.small ? HeadingLarge : DisplayXSmall)}
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
export const BoxFormSection = styled.div`
  font-family: 'Mulish', sans-serif;
  padding-bottom: 50px;
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
  background: #ffffff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-family: 'Mulish', sans-serif;
  color: #1d242f;
  overflow: hidden;
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
    -webkit-transition: all 0.35s ease 0s;
    transition: all 0.35s ease 0s;
    outline: none;
    box-shadow: none;
    text-align: center;
    text-decoration: none;
    height: auto;
  }
  :hover {
    color: #00405f;
    background: #fff;
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

export const ForgotPasswordLink = styled.p`
  font-weight: 600;
`;

export const AuthenticateMain = styled.div`
  text-align: center;
  padding: 20px 25px;
  font-family: 'Mulish', sans-serif;
  .verify-mail {
    margin: 30px 0 48px;
    h4 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }
    p {
      font-size: 18px;
      line-height: 1.7;
      span {
        font-weight: 600;
      }
    }
  }

  .change-resend {
    margin-bottom: 20px;
    border-bottom: 1px solid #dedede;
    padding-bottom: 40px;
    font-family: 'Mulish', sans-serif;
    p {
      margin-bottom: 10px;
      font-size: 16px;
      font-family: 'Mulish', sans-serif;
      letter-spacing: 0;
      &:last-child {
        margin-bottom: 0;
      }
    }
    a {
      font-size: 16px;
      color: #009de9;
      text-decoration: none;
    }
    .small {
      display: block;
      margin: 0 0 11px;
      font-size: 14px;
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

export const Label1 = styled.div`
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
a {
  color: #009de9;
  font-weight: 600;
}
:before {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  background: url('${cdn('/static/img/check-box.svg')}') no-repeat center;
  box-sizing: border-box;
  border-radius: 3px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
}
:before {
  border: none;
  background: url('${cdn('/static/img/check-square.svg')}') no-repeat center;
}
`;

export const Resend = styled.p`
  ${LabelLarge}
  color: #009de9;
  cursor: pointer;
`;

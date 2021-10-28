import styled from 'styled-components';
import { darken } from 'polished';
import { cdn } from '@utils/general';
import { Primary, White, Black, Blueberry } from '@assets/styles/colors';
import {
  DisplayXSmall,
  LabelLarge,
  DisplayXMedium,
  HeadingMedium,
  HeadingLarge,
  ParagraphLarge,
} from '@assets/styles/typography';
import { smscreen, sizes as breakpoint } from '@assets/styles/medias';

export const ColRight = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding: 40px 54px;
  background: ${Primary};
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
  padding: 80px 0;
  background: #f0f6ff;
  font-family: 'Mulish', sans-serif;
`;

export const Label = styled.span`
  display: inline-block;
  margin-bottom: 0;
  background-color: #fff;
  margin-left: 20px;
  padding: 0 2px;
  position: relative;
  span {
    color: #ea0000;
  }
`;

export const BoxFormWrap = styled.div`
  width: 684px;
  margin: auto;
  max-width: 100%;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  -webkit-border-radius: 10px;
  border-radius: 10px;
  font-family: 'Mulish', sans-serif;
  color: #1d242f;
  overflow: visible;
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

  .head-back-btn {
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: 37px;
    left: 20px;
    line-height: 20px;
  }

  .head-back-btn path {
    vertical-align: middle;
    transition: all 0.35s ease 0s;
  }

  .head-back-btn:hover path {
    stroke: #4fbbef;
  }
`;

export const BoxFormBody = styled.div`
  padding: 24px;
  min-height: 604px;
  margin-bottom: 48px;

  .filled-title {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 153%;
    color: #005e8b;
    text-align: center;
    margin: 0 0 44px;
  }

  .form-group-title {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    color: #1d242f;
    margin-bottom: 34px;
  }
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
  .compensation-range-group {
    flex-wrap: wrap;
    display: flex;
  }
  select.form-control {
    padding-right: 34px;
  }
  :focus {
    border-color: #4fbbef;
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
  textarea.form-control {
    min-height: 130px;
    max-height: 231px;
    overflow-y: auto;
    border: 1px solid #485768;
    border-radius: 4px;
    margin-top: -8px;
    width: 100%;
    background-color: white;
  }
`;

export const FormGroupMB = styled.div`
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

export const UploadVideoWrap = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: #1d242f;
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #1d242f;
    margin: 0 0 8px;
  }
  p {
    margin-bottom: 0;
  }
  p span {
    color: #005e8b;
  }
`;

export const UploadVideoBody = styled.div`
  padding: 24px;
  margin: 8px -24px 48px;
  background: #f9fcff;
  .upload-drop-area {
    background: #dbe1e8;
    border-radius: 5px;
    height: 238px;
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
  }
  .upload-drop-area input[type='file'] {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    border-radius: 5px;
    cursor: pointer;
  }
  .or {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #485768;
    margin: 24px auto 8px;
    position: relative;
    width: 372px;
    max-width: 100%;
  }
  .or span {
    min-width: 59px;
    background: #f9fcff;
    position: relative;
    display: inline-block;
  }
  .or:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 1px;
    border-bottom: 1px solid #485768;
  }
  form-group {
    margin-bottom: 48px;
  }
`;

export const CheckboxField = styled.div`
  margin-bottom: 48px;
  .checkbox-inner {
    display: inline-block;
    position: relative;
  }
  input {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }
  input:checked + label{
    color: #005E8B;
  }
  input:checked + label::before{
    border:none;
    background: url('${cdn('/static/img/check-square.svg')}') no-repeat center;
  }
`;

export const Label1 = styled.div`
    position: relative;
    margin-bottom: 0;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: #485768;
    cursor: pointer;
    padding: 0 0 0 35px;
    transition: all 0.2s ease 0s;
    display: inline-block;
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
      :before{
        border:none;
        background: url('${cdn(
          '/static/img/check-square.svg',
        )}') no-repeat center;
      }
`;

export const CompensationLabel = styled.div`
  width: 100%;
  margin-bottom: 24px;
  span {
    color: #ea0000;
  }
`;

export const CompensationRangeGroup = styled.div`
  flex-wrap: wrap;
  display: flex;
  .range-group {
    width: 50%;
    display: flex;
    position: relative;
  }
  .range-group select.form-control {
    width: auto;
    color: #3c127c;
    padding: 0 34px 3px 8px;
  }
  .range-group + .range-group input {
    padding-right: 0;
    padding-left: 15px;
  }
  .range-group input {
    padding-right: 15px;
  }
  .range-group + .range-group:before {
    content: '';
    position: absolute;
    left: -4px;
    top: 0;
    bottom: 0;
    height: 2px;
    width: 8px;
    margin: auto;
    background: #485768;
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
  }
`;

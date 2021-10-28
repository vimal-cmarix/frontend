import styled from 'styled-components';
import { darken } from 'polished';
import { cdn } from '@utils/general';
import { Primary, White, Black, Blueberry } from '@src/assets/styles/colors';
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

export const Hint = styled.span`
  // ${LabelXSmall}
  // margin-top: 8px;
  // color: ${props => getHintColor(props)};
  // display: block;

  -webkit-font-smoothing: antialiased;
  text-transform: none;
  display: block;
  color: #ea0000;
  font-family: Mulish,sans-serif;
  font-size: 13px;
  line-height: 150%;
  font-weight: normal;
  margin: 5px 0 0;
  letter-spacing: 0;
`;

export const Logo = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 50px 0;

  img {
    max-width: 150px;
    width: 100%;
    vertical-align: middle;
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

export const Row = styled.div`
  &:not(:last-child) {
    margin-bottom:13px;
  }
  &.swimlanedropdown{
    .scroll-bar__container {
      max-height:100px !important;
      overflow-y:auto !important;
      > div{
        padding:0 !important;
        overflow:auto !important;
      }
    }
  }
  &.checkhere{
    > label{
      max-width:max-content;
    }
  }
  ${props =>
    props.flex &&
    css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}
  ${props =>
    props.hide &&
    css`
      display: none;
    `}

  ${({ hasBorderTop }) =>
    hasBorderTop &&
    css`
      border-top: 1px solid #cfcdd6;
      padding-top: 15px;
      margin-top: -12px;
    `}
`;

export const CustomSelect = styled.div`
  margin-bottom: 48px;

  & > div {
    & > span {
      display: inline-block;
      margin-bottom: 0;
      background-color: #fff;
      margin-left: 20px;
      padding: 0 2px;
      position: relative;
      z-index: 99;
      font-family: Mulish;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #1d242f;
      letter-spacing: 0;
    }
  }

  .select__menu {
    background: #ffffff;
    box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    font-size: 18px;
    font-family: 'Mulish';
    color: #485768;
    z-index: 9;
    padding: 0;

    > div {
      height: auto;
      padding: 0;
      max-height: 278px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 8px;
        border-radius: 20px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 20px;
        box-shadow: none;
        background-color: #c4c4c4;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        cursor: pointer;
      }
      &::-webkit-scrollbar-track {
        box-shadow: none;
        border-radius: 20px;
        background: #fff;
        border: 1px solid #dbe1e8;
      }
      div {
        border-bottom: none;
        // background: transparent;
        font-family: Mulish;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 152%;
        color: #485768;
        padding: 16px;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          right: 8px;
          left: 8px;
          bottom: 0;
          border-bottom: 1px solid #485768;
        }
        &:hover {
          background: #f3f2f4;
        }
        &:last-child {
          border-bottom: none;
          &:before {
            display: none;
          }
        }
      }
    }
  }

  .select__control {
    padding: 8px 20px 8px;
    border: 1px solid #485768 !important;
    border-radius: 4px;
    margin-top: -8px;
    width: 100%;
    height: auto;
    padding-right: 34px;
    background: url(/r/static/img/select-down-bg.svg) no-repeat;
    background-position-x: calc(100% - 15px);
    background-position-y: center;
    background-size: 10px 6px;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    color: #1d242f;
    font-family: 'Mulish';

    .select__placeholder {
      color: #485768;
      font-weight: 600;
      font-family: 'Mulish';
    }

    div {
      padding: 0;
    }
  }
  .select__indicators {
    display: none;
  }
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
  color:${White};
  background:${Primary};
  z-index:2;
  position:absolute;
  // transform:translate3d(0,-50%,0);
  top:50%;
  left:43%;
  text-align:right;
  width:302px;
  padding:36px 0 24px 0;
  transform:translate(-50%, -50%);

  small {
    ${LabelLarge}
    display:block;
    padding-top:24px;
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
    text-align:center;
  }
`;

export const FormWrapperResend = styled.p`
  ${LabelLarge}
  color:${Blueberry};
  margin-top:48px;
  cursor:pointer;
  margin-bottom:179px;
  transition:all .1s ease-in-out;

  &:hover {
    color:${darken(0.12, Blueberry)};
  }
`;

export const FormWrapperDescription = styled.h2`
  ${HeadingMedium}
  margin-top:16px;
  margin-bottom: 48px;
  max-width: 530px;
  align-self: center;
  text-align: center;

  @media ${smscreen} {
    ${ParagraphLarge}
    text-align:center;
  }
`;

export const BoxFormSection = styled.div`
  padding: 0 0 50px;
  background: #f0f6ff;
  font-family: 'Mulish', sans-serif;
  overflow-x: hidden;
  position: relative;
  letter-spacing: 0;
  min-height: 100vh;
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

export const BoxFormWrap = styled.div`
  width: 684px;
  margin: auto;
  max-width: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-family: 'Mulish', sans-serif;
  color: #1d242f;
  transition: all 0.4s ease-in-out;
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
  h2 {
    font-size: inherit;
    color: inherit;
    line-height: inherit;
    font-family: inherit;
    font-weight: inherit;
    margin: 0;
  }
  .head-back-btn {
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: 37px;
    left: 20px;
    line-height: 20px;
    path {
      vertical-align: middle;
      transition: all 0.35s ease 0s;
    }
    &:hover {
      path {
        stroke: #4fbbef;
      }
    }
  }
`;

export const BoxFormBody = styled.div`
  padding: 24px;
  min-height: inherit;

  .filled-title {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
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
    &.mb-24 {
      margin-bottom: 24px;
    }
  }
`;

export const BoxFormAction = styled.div`
  padding: 24px;
  position: relative;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    left: 24px;
    right: 25px;
    top: 0;
    border-top: 1px solid #a1aab4;
  }

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

    &:hover {
      color: #4fbbef;
      background: transparent;
    }

    & + .btn {
      margin-top: 24px;
    }
    &[disabled] {
      background: #c2c9d1;
      border: 2px solid #c2c9d1;
      color: #485768;
      opacity: 1;
    }
  }
  .btn-skip-now {
    width: auto;
    background: transparent;
    color: #005e8b;
    border-color: transparent;
    display: inline-block;
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
  margin:0 0 48px;
  position:relative;
  .form-control {
    background:transparent;
    color:#1d242f;
    font-family:Mulish;
    font-style:normal;
    font-weight:600;
    font-size:18px;
    line-height:28px;
    border:none;
    border-bottom:1px solid #485768;
    border-radius:0;
    height:auto;
    padding:0 0 3px;
    box-shadow:none;
    -webkit-transition:all 0.35s ease 0s;
    transition:all 0.35s ease 0s;
    &:focus {
      border-color:#4fbbef;
    }
    &::-webkit-input-placeholder {
      color:#485768;
      opacity:1;
    }
    &::-moz-placeholder {
      color:#485768;
      opacity:1;
    }
    &:-ms-input-placeholder {
      color:#485768;
      opacity:1;
    }
    &:-moz-placeholder {
      color:#485768;
      opacity:1;
    }
    &[disabled] {
      opacity:0.55;
    }
  }
  
  &.border-form-group{
    .form-control{
      padding:10px 20px;
      border:1px solid #485768;
      border-radius:4px;
      margin-top:-8px;
      padding-right:34px;
      &::placeholder{
        -webkit-transition: 0.3s all ease-in-out;
        transition: 0.3s all ease-in-out;
      }
      &:focus::placeholder{
        opacity: 0;
      }
      &:focus{
        border-color: #4FBBEF;
      }
    }
    textarea{
      &.form-control {
        min-height:120px;
        max-height:231px;
        overflow-y:auto;
        padding-right:20px;
      }
    }
  }
  &.date-group {
    position:relative;
    .react-datepicker-wrapper{
      width:100%;
    }
    .form-control {
      padding-right:40px;
    }
    .date-icon {
      width:24px;
      height:24px;
      display:inline-block;
      background-image:url('${cdn('/static/img/calendar-icon.svg')}');
      background-repeat:no-repeat;
      background-position:center;
      position:absolute;
      right:0;
      top:31px;
    }
  }
  &.mb-40{
    margin-bottom:40px;
  }
  &.mb-24{
    margin-bottom:24px;
  }
  &.mb-32{
    margin-bottom:32px;
  }
  &.mb-16{
    margin-bottom:16px;
  }
  &.mt-8{
    margin-top:8px;
  }
   
  select.form-control {
    -webkit-appearance:none;
    padding-right:34px;
    background:url('${cdn('/static/img/select-down-bg.svg')}') no-repeat;
    background-position-x:calc(100% - 15px);
    background-position-y:center;
    background-size:10px 6px;
  }
  .text-count {
    font-family:Mulish;
    font-style:normal;
    font-weight:600;
    font-size:12px;
    line-height:20px;
    text-align:right;
    color:#1D242F;
    padding-top:4px;
  }
  &.ideal-ans-wrap{
    > label{
      display: block;
    }
    .form-control{
      width: 229px;
      max-width:100%;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }
    .min-lbl{
      display: inline-block;
      vertical-align: middle;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
      color: #1D242F;
    }
  }
`;

export const UploadVideoWrap = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: #1d242f;
  margin-bottom: 48px;
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
    span {
      color: #005e8b;
    }
  }
`;

export const UploadVideoBody = styled.div`
  padding: 24px;
  margin: 8px -24px 0;
  background: #edf0f5;
  .upload-drop-area {
    background: #fff;
    box-shadow: 0px 8px 13px -3px #cfd8e2;
    border-radius: 5px;
    height: 238px;
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
    -webkit-transition: 0.3s all ease-in-out;
    transition: 0.3s all ease-in-out;
    &:hover {
      background: #596a83;
      svg {
        path {
          stroke: #fff;
        }
      }
    }
    input[type='file'] {
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
    span {
      min-width: 59px;
      background: #edf0f5;
      position: relative;
      display: inline-block;
    }
    &:before {
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
  }
`;

export const CheckboxField = styled.div`
  margin-bottom:48px;
  .checkbox-inner {
    display:inline-block;
    position:relative;
  }
  input {
    height:100%;
    width:100%;
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    margin:auto;
    opacity:0;
    cursor:pointer;
    z-index:1;
  }
  input:checked + label{
    color:#005E8B;
  }
  input:checked + label::before{
    border:none;
    background:url('${cdn('/static/img/check-square.svg')}') no-repeat center;
  }
  label{
    position:relative;
    margin-bottom:0;
    font-family:Mulish;
    font-style:normal;
    font-weight:600;
    font-size:16px;
    line-height:28px;
    color:#485768;
    cursor:pointer;
    padding:0 0 0 35px;
    transition:all 0.2s ease 0s;
    display:inline-block;
    :before {
        content:'';
        position:absolute;
        width:24px;
        height:24px;
        top:0;
        left:0;
        bottom:0;
        margin:auto;
        background:url('${cdn('/static/img/check-box.svg')}') no-repeat center;
        box-sizing:border-box;
        border-radius:3px;
        transition:all 0.2s ease 0s;
        cursor:pointer;
      }
    :after{
      border:none;
      background:url('${cdn('/static/img/check-square.svg')}') no-repeat center;
    }
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

export const UploadDropArea = styled.div`
  background: #fff;
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  border-radius: 5px;
  height: 238px;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  -webkit-transition: 0.3s all ease-in-out;
  transition: 0.3s all ease-in-out;
  &:hover {
    background: #596a83;
    svg {
      path {
        stroke: #fff;
      }
    }
  }
  input[type='file'] {
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

export const CadidateScreenTitle = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 153%;
  color: #1d242f;
  margin: 0 0 24px;
`;

export const AddScreeningWrap = styled.div`
  border-top: 1px solid #dbe1e8;
  padding-top: 24px;
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
    line-height: 153%;
    color: #1d242f;
    margin: 0 0 8px;
  }
  p {
    margin: 0;
  }
  &.external-link-wrap {
    border-top: none;
    padding-top: 0;
    padding-bottom: 24px;
    min-height: 133px;
    h4 {
      border-top: 1px solid #dbe1e8;
      padding-top: 24px;
    }
  }
`;

export const AddQueList = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
  margin-top: 24px;
`;

export const AddQueHead = styled.div`
  background: rgba(219,225,232,.3);
  padding: 8px 50px 8px 16px;
  position: relative;
  h4 {
    margin: 0;
    font-size: 18px;
    line-height: 28px;
  }
  .que-remove-icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    background-image: url('${cdn('/static/img/close-icon.svg')}');
    background-repeat: no-repeat;
    background-position: center;
    margin: auto;
    position: absolute;
    right: 16px;
    top: 0;
    bottom: 0;
    border:none;
  }
`;

export const AddQueBody = styled.div`
  padding: 16px;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      border-top: 1px solid #dbe1e8;
      &:last-child {
        div {
          padding-bottom: 0;
        }
      }
    }
  }
`;

export const IdalAnsWrap = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #485768;
  padding: 0 40px 16px 0;
  position: relative;
  h5 {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    margin: 0;
    color: inherit;
  }
  span {
    font-weight: 800;
    font-size: 18px;
    line-height: 28px;
    color: #005e8b;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const QueInner = styled.div`
  padding: 8px 0;
  .checkbox-field {
    margin-bottom:0;
    position:relative;
    .checkbox-inner {
      display:inline-block;
      position:relative;
    }
    input {
      height:100%;
      width:100%;
      position:absolute;
      top:0;
      right:0;
      bottom:0;
      left:0;
      margin:auto;
      opacity:0;
      cursor:pointer;
      z-index:1;
    }
    input:checked + label{
      color:#005E8B;
    }
    input:checked + label::before{
      border:none;
      background:url('${cdn('/static/img/check-square.svg')}') no-repeat center;
    }
  }
`;

export const QueInnerLabel = styled.label`
  position:relative;
  margin-bottom:0;
  font-family:Mulish;
  font-style:normal;
  font-weight:600;
  font-size:16px;
  line-height:28px;
  color:#485768;
  cursor:pointer;
  padding:0 35px 0 0;
  transition:all 0.2s ease 0s;
  display:block;
  :before {
    content:'';
    position:absolute;
    width:24px;
    height:24px;
    top:0;
    left: auto;
    right: 0;
    bottom:0;
    margin:auto;
    background:url('${cdn('/static/img/check-box.svg')}') no-repeat center;
    box-sizing:border-box;
    border-radius:3px;
    transition:all 0.2s ease 0s;
    cursor:pointer;
  }
  :after{
    border:none;
    background:url('${cdn('/static/img/check-square.svg')}') no-repeat center;
  }
`;

export const ScreenQuestionWrap = styled.div`
  padding: 24px 0;
  margin-top: 42px;
  border-top: 1px solid #dbe1e8;
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
    margin: 0 0 16px;
  }
`;

export const ScreenQuestionList = styled.div`
  font-size: 0;
  button{
    display:inline-block;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    color: #1D242F;
    background: #FFFFFF;
    border: 2px solid #A1AAB4;
    box-sizing: border-box;
    border-radius: 15px;
    padding:8px 44px 8px 16px;
    background-image: url('${cdn('/static/img/plus-icon.svg')}');
    background-position:right 16px center;
    background-repeat:no-repeat;
    text-decoration:none;
    transition: all 0.2s ease 0s;
    margin:0 24px 24px 0;
  }  
  button.selected {
    color: #00783e;
    border-color: #00783e;
    background-image:url('${cdn('/static/img/check-icon.svg')}');
    background-position: right 14px center;
  }
`;

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
import { expOne } from '../submit/style';

export const AtsWrap = styled.div`
  background: #f8fbff;
  padding: 24px 24px 10px;
  font-family: Mulish;
  color: #1d242f;
  letter-spacing: 0;
  img {
    vertical-align: middle;
  }
`;

export const AtsHead = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding-bottom: 24px;
`;

export const AtsTitle = styled.div`
  box-shadow: 0 3px 13px -3px #cfd8e2;
  padding: 16px;
  min-width: 350px;
  max-width: 100%;
  border-radius: 10px;
  background: #fff;
  position: relative;
  .ats-title-link {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 10px;
    display: block;
    z-index: 1;
  }
  h2 {
    font-family: Mulish;
    font-size: 18px;
    line-height: 153%;
    font-style: normal;
    font-weight: 700;
    color: #1d242f;
    margin: 0 0 8px;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-family: Mulish;
    font-weight: 400;
    font-size: 18px;
    line-height: 153%;
    display: -webkit-flex;
    display: flex;
    color: #485768;
    li {
      position: relative;
      padding-left: 17px;
      white-space: nowrap;
      &:first-child {
        padding-left: 0;
        :before {
          display: none;
        }
      }
      &:before {
        content: '';
        position: absolute;
        left: 8px;
        top: 0;
        bottom: 0;
        margin: auto;
        border-left: 1px solid #485768;
        height: 20px;
      }
      &:nth-child(2) {
        padding-left: 22px;
        &:before {
          width: 7px;
          height: 7px;
          border: none;
          border-radius: 20px;
          background: #485768;
          left: 6px;
          top: 3px;
        }
      }
    }
  }
`;

export const AtsHeadTabs = styled.div`
  background: #dbe1e8;
  border-radius: 10px;
  padding: 3px;
  font-size: 0;
  a {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 153%;
    text-align: center;
    color: #005e8b;
    display: inline-block;
    padding: 8px 38px;
    border-radius: 8px;
    min-width: 184px;
    transition: all 0.35s ease 0s;
    text-decoration: none;
    outline: none;
    &.active {
      background: #fff;
    }
  }
`;

export const AtsDashboards = styled.div`
  overflow: auto;
  padding: 0 0 20px 8px;
  margin: 0 0 0 -8px;
  min-height: calc(100vh - 220px);
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar:horizontal {
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #c4c4c4;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #dbe1e8;
  }
`;

export const AtsDashboardInner = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const AtsDashboardItem = styled.div`
  background: #fcfcfd;
  box-shadow: 0 8px 13px -3px #cfd8e2;
  border-radius: 5px;
  width: 288px;
  min-width: 288px;
  margin-right: 32px;
  padding: 0 8px;
  position: relative;
  // max-height: calc(100vh - 251px);
  // overflow: auto;
  // &::-webkit-scrollbar {
  //   width: 6px;
  // }
  // &::-webkit-scrollbar-thumb {
  //   border-radius: 0px;
  //   background-color: #c4c4c4;
  //   transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
  //     border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  //   cursor: pointer;
  // }
  // &::-webkit-scrollbar-track {
  //   border-radius: 0px;
  //   background-color: #fff;
  //   border: 1px solid #dbe1e8;
  // }
`;

export const AtsDashboardItemHeader = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 9;
`;
export const AtsItemAction = styled.div`
  margin-bottom: 16px;
  .action-btn {
    padding: 8px 47px;
    border: 2px solid #ed4a2a;
    box-sizing: border-box;
    transition: all 0.35s ease 0s;
    box-shadow: none !important;
    text-align: center;
    background: #ed4a2a;
    border-radius: 10px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    width: 100%;
    height: auto;
    &:hover {
      background: #fff;
      border-color: #ed4a2a;
      color: #ed4a2a;
    }
  }
`;

export const AtsColorStrip = styled.div`
  height: 16px;
  background-color: #eee;
  margin: 0 -8px 22px;
  border-radius: 5px 5px 0 0;
`;

export const AtsItemHead = styled.div`
  position: relative;
  padding: 0 40px 8px;
  border-bottom: 1px solid #c2c9d1;
  margin: 0 0 16px;

  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 152%;
    text-align: center;
    color: #1d242f;
    margin: 0;
  }
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 152%;
    text-align: center;
    color: #485768;
    margin: 0;
    padding-top: 18px;
  }
`;

export const AtsItemHeadIcon = styled.div`
  position: absolute;
  top: 0;
  left: 4px;
  svg {
    vertical-align: middle;
    &:not(:root) {
      overflow: hidden;
    }
  }
`;

export const AtsDashboardColorBox = styled.div`
  position: absolute;
  right: 0;
  top: 2px;
  background: #ffffff;
  border: 1px solid #f3f2f4;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 4px 19px 4px 4px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
  font-size: 0;
  line-height: 14px;
  .colorbox-btn {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    vertical-align: middle;
    font-size: 0;
    img {
      position: absolute;
      width: 10px;
      height: 4px;
      top: 0;
      bottom: 0;
      right: 5px;
      margin: auto;
      vertical-align: middle;
    }
    svg {
      vertical-align: middle;
    }
  }
`;

export const AtsItemBoxWrap = styled.div`
  max-height: calc(100vh - 445px);
  overflow: auto;
  margin: 0 -8px;
  padding: 0 8px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #c4c4c4;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0px;
    background-color: #fff;
    border: 1px solid #dbe1e8;
  }
`;

export const AtsItemBox = styled.div`
  background: #ffffff;
  border: 1px solid #dbe1e8;
  box-sizing: border-box;
  box-shadow: 1px 3px 4px -3px #b6b6b6;
  border-radius: 10px;
  padding: 8px 8px 8px 40px;
  position: relative;
  margin: 0 0 16px;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 152%;
  color: #485768;
  cursor: pointer;
  &.ats-disable-box {
    background: #dbe1e8;
  }

  .ats-user-img {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 8px;
    top: 8px;
    background: #ffffff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
    border-radius: 30px;
  }

  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 152%;
    color: #1d242f;
    margin: 0;
    a {
      transition: all 0.35s ease 0s;
      text-decoration: none;
      outline: none;
      color: #1d242f;
      &:hover {
        color: #005e8b;
      }
    }
  }

  p {
    margin: 0;
  }

  ul {
    margin: 8px 0 0;
    padding: 0;
    list-style-type: none;
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 153%;
    display: flex;
    align-items: center;
    color: #485768;
    li {
      position: relative;
      padding-left: 16px;
      &:before {
        content: '';
        position: absolute;
        left: 8px;
        top: 0;
        bottom: 0;
        margin: auto;
        border-left: 1px solid #485768;
        height: 20px;
      }
      &:first-child {
        padding-left: 0;
        &:before {
          opacity: 0;
        }
      }
      h4 {
        margin: 0;
        padding: 0;
        color: #485768;
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 153%;
        &.red-text {
          color: #d92f0e;
        }
        &.green-text {
          color: #00783e;
        }
      }
    }
  }
`;

export const AtsUserImg = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 8px;
  top: 8px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
  border-radius: 30px;
`;

export const AsItemBoxAction = styled.div`
  margin-bottom: 16px;
  .action-btn {
    padding: 8px 47px;
    border: 2px solid #ed4a2a;
    box-sizing: border-box;
    transition: all 0.35s ease 0s;
    box-shadow: none !important;
    text-align: center;
    background: #ed4a2a;
    border-radius: 10px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    width: 100%;
    height: auto;
  }
  .action-btn[disabled] {
    background: #dbe1e8;
    border-color: #dbe1e8;
    color: #a1aab4;
    opacity: 1;
  }
`;

export const RecordNotFoundWrap = styled.div`
  padding: 70px 0 50px;
  text-align: center;
  border-radius: 0 0 10px 10px;
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #485768;
`;

export const ModelDialog = styled.div`
  transform: none;
  max-width: 100%;
  width: 684px;
  align-items: center;
`;

export const RejectionModelDialog = styled.div`
  max-width: 100%;
  width: 933px;
`;

export const ModelContent = styled.div`
  background: #fff;
  border-radius: 10px;
  border: none;
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  //border-radius: 0.3rem;
  outline: 0;
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 0;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  display: flex;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    color: #1d242f;
    margin: 0;
    padding: 0 0 16px;
    border-bottom: 1px solid #a1aab4;
    width: 100%;
  }
`;

export const RejectionModelHeader = styled.div`
  background: #005e8b;
  border-radius: 10px 10px 0 0;
  padding: 16px 24px;
  color: #fff;
  display: flex;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #fff;
    margin: 0;
  }
`;

export const ModelFade = styled.div`
  padding-right: 17px;
  display: block;
`;

export const ModalBody = styled.div`
  padding: 16px 24px 24px;
  border-radius: 0 0 10px 10px;
  position: relative;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
`;

export const RejectionLetterLink = styled.div`
  text-align: right;
  a:first-child {
    margin-left: 0;
  }
  a {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 153%;
    color: #1d242f;
    margin-left: 20px;
    outline: none;
    text-decoration: none;
    transition: all 0.35s ease 0s;
  }
  .blue-link {
    color: #0287c8;
  }
`;

export const ModalFadeRejectionLetter = styled.div`
  padding-right: 17px;
  display: block;
`;

export const Label = styled.label`
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
  &.border-group-label {
    display: inline-block;
    margin-bottom: 0;
    background-color: #fff;
    margin-left: 20px;
    padding: 0 2px;
    position: relative;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    color: #1D242F;
    &:before{
      display:none;
    }
  }
  .req-star {
    color: #ea0000;
  }

  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background: url('${cdn('/static/img/check-box.svg')}') no-repeat 50%;
    box-sizing: border-box;
    border-radius: 3px;
    transition: all 0.2s ease 0s;
    cursor: pointer;
  }
`;

export const BoxFormWrap = styled.div`
  width: 100%;
  padding: 0;
  background: transparent;
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 152%;
    color: #1d242f;
    margin: 0 0 8px;
    &.mb-24 {
      margin-bottom: 24px;
    }
    &.mb-14 {
      margin-bottom: 14px;
    }
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
  }
  &.border-form-group{
    .form-control{
      padding: 10px 20px;
      border: 1px solid #485768;
      border-radius: 4px;
      margin-top: -11px;
      padding-right: 34px;
      min-height: 120px;
      &:focus {
        border-color: #4fbbef;
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
  &.mb-20{
    margin-bottom:20px;
  }
  &.mb-24{
    margin-bottom:24px;
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

export const FileAttBtn = styled.div`
  position: absolute;
  right: 8px;
  top: 24px;
  background: #abe4ff;
  border-radius: 8px;
  width: 45px;
  height: 45px;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  cursor: pointer;
  input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  img {
    width: 20px;
    cursor: pointer;
  }
  .form-control {
    min-height: 120px;
    padding: 10px 20px;
    border: 1px solid #485768;
    border-radius: 4px;
    margin-top: -8px;
    max-height: 231px;
    overflow-y: auto;
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

export const CheckboxField = styled.div`
  margin: 0 0 20px;
  padding: 0;
  position: relative;
`;

export const CheckBoxInner = styled.div`
  display: inline-block;
  position: relative;
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
    color:#009de9;
  }
  input:checked + label::before{
    border:none;
    background:url('${cdn('/static/img/check-square-2.svg')}') no-repeat center;
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
    padding: 0 0 0 35px;
    display: inline-block;
    transition:all 0.2s ease 0s;
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
    font-size: 16px;
    line-height: 153%;
    color: #000000;
    height: auto;
    &:hover {
      background: #fff;
      color: #4fbbef;
      border-color: #4fbbef;
    }
  }
`;

export const ColorPopover = styled.div`
  right: 0;
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

export const ModalBox = styled.div`
  display: block;
  padding-right: 17px;
`;

export const ModalAction = styled.div`
  &.btn-top-bdr {
    padding-top: 24px;
    margin-top: 48px;
    border-top: 1px solid #a1aab4;
  }
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
    display: inline-block;
    height: auto;
    &:hover {
      background: #fff;
      color: #4fbbef;
      border-color: #4fbbef;
    }
    &.btn-danger {
      background: #ed4a2a;
      border-color: #ed4a2a;
      color: #fff;
      &:hover {
        background: #fff;
        color: #ed4a2a;
        border-color: #ed4a2a;
      }
    }
  }
  &.mt-32 {
    margin-top: 32px;
  }
  &.text-right {
    text-align: right;
  }
`;

export const ModalStyle = styled.div`
  letter-spacing: 0;
  .modal-header {
    border-bottom: none;
    background: #005e8b;
    border-radius: 10px 10px 0 0;
    padding: 16px 24px;
    color: #fff;
    .modal-title {
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 153%;
      color: #fff;
      margin: 0;
    }
  }
  .modal-body {
    padding: 24px;
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
    color: #1d242f;
    p {
      margin: 0 0 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const BoxProgrssBar = styled.div`
  margin-bottom: 40px;
  position: relative;
  border-radius: 30px;
  width: 243px;
`;

export const ProgressBar = styled.div`
  position: relative;
  border-radius: 30px;
  .css-yvszuv-Slider {
    height: 8px;
    width: 100%;
    background: #cfcdd6;
    border-radius: 30px;
    .css-3g5hux-Slider {
      background: #005e8b;
    }
  }
  .progress-bar-value {
    color: #005e8b;
    font-family: 'Mulish';
    font-size: 14px;
    line-height: 152%;
    margin: 2px 0 0 0;
    display: inline-block;
    white-space: nowrap;
  }
`;

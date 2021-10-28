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

export const BoxFormSection = styled.div`
  background: #f0f6ff;
  font-family: 'Mulish', sans-serif;
  letter-spacing: 0;
  min-height: 100vh;
  word-break: break-word;
  img {
    vertical-align: top;
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
    outline: none;
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

export const SizigiLogoWrap = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 50px 0;
  a {
    display: inline-block;
  }
  img {
    max-width: 150px;
    width: 100%;
  }
`;

export const BoxFormWrapOuter = styled.div`
  padding: 0 0 50px;
  width: 100%;
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
  -webkit-border-radius: 10px 10px 0 0;
  border-radius: 10px 10px 0 0;
  position: relative;
  .head-back-btn {
    position: absolute;
    top: 37px;
    left: 20px;
    line-height: 20px;
  }
  .next-step-btn {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 28px;
    color: #009de9;
    position: absolute;
    right: 31px;
    top: 36px;
    outline: none;
    transition: all 0.35s ease 0s;
    padding: 0;
    &:hover {
      color: #1d242f;
    }
  }
`;

export const ReviewTabsWrap = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 28px;
  background: rgba(219, 225, 232, 0.5);
  display: flex;
  justify-content: center;
  text-align: center;
  color: #1d242f;
`;

export const SelectBtn = styled.div`
  color: rgba(29, 36, 47, 0.5);
  margin-right: 30px;
  display: inline-block;
  padding: 11px 0;
  position: relative;
  transition: all 0.35s ease 0s;
  outline: none;
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 28px;
  cursor: pointer;
  &.active {
    color: #1d242f;
    font-weight: 700;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: #009de9;
      width: 67%;
      margin: auto;
      border-radius: 20px;
    }
  }
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: #1d242f;
  }
`;

export const HeadBackBtn = styled.div`
  position: absolute;
  top: 37px;
  left: 20px;
  line-height: 20px;
  cursor: pointer;
  path {
    vertical-align: middle;
    transition: all 0.35s ease 0s;
  }
  &:hover {
    path {
      stroke: #4fbbef;
    }
  }
`;

export const Label = styled.div`
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
    height: auto;

    + .btn {
      margin-top: 24px;
    }
    &:hover {
      color: #4fbbef;
      background: #fff;
      border-color: #4fbbef;
    }
  }
`;

export const BoxFormBody = styled.div`
  font-family: Mulish;
  font-style: normal;
  line-height: 28px;
  color: #1d242f;
  font-weight: 400;
  font-size: 16px;
  min-height: 1010px;
  padding: 40px 24px 0;
  h3 {
    font-weight: 700;
    font-size: 20px;
    margin: 0 0 30px;
    font-family: Mulish;
    font-style: normal;
    line-height: 28px;
    color: #1d242f;
  }
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 28px;
    color: #1d242f;
    margin: 0 0 5px;
  }
  p {
    margin: 0;
  }
`;

export const ReviewVideoBox = styled.div`
  margin: 30px -24px;
  padding: 0;
  border-radius: 5px;
  img {
    max-width: 100%;
    vertical-align: middle;
    border-radius: 5px;
  }
  video {
    width: 100%;
    border-radius: 5px;
    max-height: 360px;
    object-fit: cover;
    vertical-align: middle;
    outline: none;
    border: none;
  }
`;

export const BoxSeprator = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid #dbe1e8;
  padding-bottom: 10px;
  position: relative;
`;

export const UserReviewValue = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #1d242f;
  img {
    max-height: 28px;
    max-width: 60px;
    vertical-align: middle;
    margin-right: 8px;
  }
  &.fwBold {
    font-weight: 700;
  }
`;

export const FormGroup = styled.div`
  margin: 0 0 30px;
  position: relative;
  .mb-0 {
    margin-bottom: 0;
  }
  &.mb-10 {
    margin-bottom: 10px;
  }
`;

export const BlueBoldText = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #005e8b;
`;

export const AddScreeningWrap = styled.div`
  padding-top: 20px;
  margin-top: 20px;
  border: none;
  position: relative;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  font-family: Mulish;
  font-style: normal;
  color: #1d242f;
  &:before {
    content: '';
    border-top: 1px solid #dbe1e8;
    left: -24px;
    right: -24px;
    top: 0;
    position: absolute;
  }
  h4 {
    &.AddScreeningTitle {
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 153%;
      color: #1d242f;
      margin: 0 0 30px;
    }
  }
  p {
    margin: 0;
  }
`;

export const AddQueList = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
  margin-top: 24px;
`;

export const AddQueHead = styled.div`
  background: rgba(219, 225, 232, 0.3);
  padding: 8px 50px 8px 16px;
  position: relative;
  h4 {
    &.add-que-head-title {
      font-size: 16px;
      line-height: 28px;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      color: #1d242f;
      margin-bottom: 0;
    }
  }
`;

export const AddQueBody = styled.div`
  padding: 16px;
  li {
    border-top: 1px solid #dbe1e8;
    &:last-child {
      > div {
        padding-bottom: 0;
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
  padding: 0 0 16px 0;
  position: relative;
  .que-right-label {
    font-weight: 800;
    font-size: 18px;
    line-height: 28px;
    color: #005e8b;
    position: relative;
    right: 0;
    top: 0;
  }
  h5 {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    margin: 0;
    color: inherit;
  }
`;

export const QueInner = styled.div`
  padding: 8px 0;
  .checkbox-field {
    margin: 0;
  }
  .blue-text-label {
    div {
      color: #005e8b;
    }
  }
`;

export const QueLabel = styled.div`
  padding: 0;
  cursor: default;
  display: block;
  transition: all 0.2s ease 0s;
  position: relative;
  margin-bottom: 0;
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  color: #485768;
`;

export const ScreenQuestionWrap = styled.div`
  padding: 20px 0;
  margin-top: 30px;
  border-top: 1px solid #dbe1e8;
  h4 {
    &.screenQuestionTitle {
      font-weight: 600;
      font-size: 18px;
      line-height: 153%;
      margin-bottom: 20px;
      font-family: Mulish;
      font-style: normal;
      color: #1d242f;
    }
  }
`;

export const ScreenQuestionList = styled.div`
  font-size: 0;
  a {
    display: inline-block;
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    color: #1d242f;
    background: #fff;
    border: 2px solid #a1aab4;
    box-sizing: border-box;
    border-radius: 15px;
    padding: 8px 44px 8px 16px;
    background-position: right 16px center;
    background-repeat: no-repeat;
    text-decoration: none;
    transition: all .2s ease 0s;
    margin: 0 24px 24px 0;
    &.selected {
      border-color: #005e8b;
      border-radius: 15px;
      margin: 0 16px 16px 0;
      color: #005e8b;
      background-image:url('${cdn('/static/img/blue-check-icon.svg')}');
      background-position: right 14px center;
    }
  }
  
`;

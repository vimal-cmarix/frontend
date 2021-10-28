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

export const PageSubmittedWrap = styled.div`
padding: 32px 0 18px;
color: #1d242f;
background: #fff;
letter-spacing:0;
min-height: 100vh;
font-family: Mulish;
* {
  max-width: 684px;
  margin: auto;
}
  img {
    margin: auto;
    display: block;
    vertical-align: middle;
    max-width: 100%;
    width:284px;
  }
  ul {
    max-width: 700px;
    list-style: none;
    padding-left: 0;
    margin-left: auto;
    margin-right: auto;
    li {
      padding-left: 60px;
      position: relative;
      margin-bottom: 32px;
      font-family: Mulish;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 153%;
      color: #1d242f;
      max-width: 100%;
      &::before {
        content: "";
        position: absolute;
        width: 38px;
        height: 38px;
        left: 0;
        top: -5px;
        background: url('${cdn(
          '/static/img/green-checked.png',
        )}') no-repeat center left;
        background-size: contain;
      }
      span {
        font-weight: 700;
      }
      .share-link{
        color: #009de9;
        cursor: pointer;
        transition: all 0.35s ease 0s;
        outline: none;
        font-weight: 700;
        border: none;
        background: transparent;
        padding: 0;
        margin: 0;
        display: inline-block;
        box-shadow: none;
        &:hover{
          color: #1d242f;
        }
      }
    }
  }
`;

export const TopHeadline = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  // font-size: 48px;
  font-size: 36px;
  line-height: 153%;
  text-align: center;
  color: #1d242f;
  margin: 32px auto 42px;
  max-width: 684px;
`;

export const ApplicationExperience = styled.div`
  width: 100%;
  max-width: 100%;
  background: rgba(219, 225, 232, 0.5);
  margin-bottom: 42px;
`;

export const Wrapper = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 24px 0;
  text-align: center;
  h4 {
    margin-bottom: 32px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 153%;
    text-align: center;
    color: #1d242f;
  }
  .rateClass {
    svg {
      path {
        // stroke: #949494;
        fill: #cacaca;
      }
    }
    span {
      color: #8c8c8c;
    }
  }
`;

export const Btn = styled.div`
  font-family: 'Mulish';
  font-size: 18px;
  font-weight: 700;
  margin: 24px auto;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 44px;
  padding: 8px 10px;
  text-align: center;
  vertical-align: middle;
  transition: all 0.35s ease 0s;
  color: #000;
  background: #4fbbef;
  border: 2px solid #4fbbef;
  cursor: pointer;
  &:hover {
    color: #4fbbef;
    background: #fff;
    border: 2px solid #4fbbef;
  }
`;

export const Btn1 = styled.div`
  font-family: 'Mulish';
  font-size: 18px;
  font-weight: 700;
  margin: 24px auto;
  line-height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 44px;
  padding: 8px 10px;
  text-align: center;
  vertical-align: middle;
  transition: all 0.35s ease 0s;
  color: #1d242f;
  background: #fff;
  border: 2px solid #1d242f;
  display: flex;
  cursor: pointer;
  &:hover {
    color: #fff;
    background: #1d242f;
    border: 2px solid #1d242f;
  }
`;

export const ShareModalStyle = styled.div`
  .modal-body {
    padding: 0;
    font-family: Mulish, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;

    .link-copied {
      color: #000;
      text-align: center;
      position: fixed;
      top: 15px;
      left: 50%;
      transform: translateX(-50%);
      background: #fff;
      padding: 8px 18px;
      opacity: 0;
      visibility: hidden;
      font-size: 13px;
      display: flex;
      align-items: center;
      -webkit-transition: 0.3s all ease;
      transition: 0.3s all ease;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
      border-radius: 3px;

      img {
        margin-right: 5px;
        max-width: 18px;
      }

      &.showed {
        opacity: 1;
        visibility: visible;
        top: 25px;
      }
    }
  }
  .share-link-info {
    padding: 42px 42px 16px;
    background: #f6f7fb;
    border-radius: 30px 30px 16px 16px;
    font-family: Mulish, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 153%;
    color: #1d242f;
    h2 {
      font-family: Mulish, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 153%;
      color: #1d242f;
      margin: 0 0 24px;
    }
  }
  .share-link-box {
    padding: 37px 42px;
  }
  .share-link-box-inner {
    border: 1px solid #000;
    border-radius: 16px;
    font-family: Mulish, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 153%;
    color: #1d242f;
    width: 382px;
    min-height: 169px;
    padding: 20px;
    margin: auto;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
    p {
      margin: 0;
    }
    strong {
      font-weight: bold;
    }
  }
`;

export const ModalAction = styled.div`
  padding: 0 42px 37px;
  .action-btn {
    padding: 6px 24px;
    border: 2px solid #009de9;
    box-sizing: border-box;
    transition: all 0.35s ease 0s;
    box-shadow: none !important;
    text-align: center;
    background: #009de9;
    border-radius: 10px;
    font-family: Mulish, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    display: inline-block;
    height: auto;
    &:hover {
      background: #fff;
      color: #009de9;
      border-color: #009de9;
    }
  }
  &.mt-32 {
    margin-top: 32px;
  }
  &.text-right {
    text-align: right;
  }
`;

export const ExpOne = styled.div`
  * {
    display: block;
    margin: auto;
  }
  margin: 0 70px !important;
  max-width: 100px !important;
  display: block;
  cursor: pointer;
  &:first-child {
    margin-left: 0 !important;
  }
  &:last-child {
    margin: 0 0 0 33px !important;
  }
  img,
  svg {
    transition: all 0.15s ease 0s;
  }
  span {
    margin-top: 4px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 153%;
    text-align: center;
    color: #1d242f;
    transition: all 0.35s ease 0s;
  }
  svg {
    path {
      transition: all 0.15s ease 0s;
    }
  }
  &:hover {
    img,
    svg {
      transform: scale(1.3);
    }
  }
`;

export const SubmitButton = styled.div`
  max-width: 328px;
  width: 100%;
  padding: 10px 20px;
  height: 52px;
  border: 2px solid #1d242f;
  background: #fff;
  border-radius: 15px;
  margin-top: 30px;
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  color: #1d242f;
  outline: none;
  box-shadow: none;
  transition: all 0.35s ease 0s;
  &:hover {
    background: #1d242f;
    color: #fff;
    border-color: #1d242f;
  }
`;

export const ActiveRate = styled.div`
  outline: none;
  &.active {
    span {
      color: #1d242f;
    }
    img,
    svg {
      transform: scale(1.3);
      path {
        stroke: #1d242f;
        &:first-child {
          fill: #ffcd4e !important;
        }
      }
    }
  }
`;

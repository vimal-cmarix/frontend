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
import { expOne } from '../submit/style';

export const Label = styled.div`
  z-index: 99;
  position: relative;
  background: #fff;
  width: max-content;
  color: #212529;
`;

export const AtsDetailMain = styled.div`
  background: #f8fbff;
  letter-spacing: 0;
  word-break: break-word;
  font-family: Mulish, sans-serif;
`;

export const JobBreifing = styled.div`
  padding: 25px 30px 5px;
  max-width: 100%;
  background: transparent;
  box-shadow: none;
  width: 100%;
  border-radius: 10px;
  align-items: center !important;
  justify-content: space-between !important;
  display: -webkit-flex !important;
  display: flex !important;
  color: #1d242f;
`;

export const JobName = styled.div`
  font: 700 18px 'Mulish';
  margin-bottom: 10px;
`;

export const OuterMostWrapper = styled.div`
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

export const Briefing = styled.div`
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  .location {
    padding-right: 15px;
    margin-right: 8px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      background: #485768;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      right: 0;
    }
  }
  span {
    font-size: 18px;
    display: inline-block;
    color: #485768;
  }
  .jobtype {
    padding-right: 15px;
    margin-right: 8px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      background: #485768;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 1px;
      height: 22px;
      right: 2px;
    }
  }
`;

export const FlexTab = styled.div`
  margin-top: 20px;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  background: #dbe1e8;
  border-radius: 10px;
  padding: 3px;
  width: -webkit-max-content;
  width: max-content;
  .mt-0 {
    margin-top: 0 !important;
  }
  a {
    background: transparent;
    border: none;
    border-radius: 8px;
    padding: 8px 38px;
    margin-top: 0;
    min-width: 184px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 153%;
    text-align: center;
    color: #485768;
  }
  a.active {
    background: #fff;
    color: #005e8b;
  }
`;

export const AtsActionStrip = styled.div`
  background: #fff;
  padding: 10px 30px;
  box-shadow: 0 4px 4px rgb(0 0 0 / 4%);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  & > div {
    margin: 0;

    & > div {
      padding: 0;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;

  & > div{
    padding: 0 15px;
  }
  .searchBox {
    border: none;
    height: 44px;
    padding: 5px 10px 5px 30px;
    font: 400 18px 'Mulish';
    background: #fff url('${cdn('/static/img/search-icon.svg')}') no-repeat 0px;
    outline: none;
    background-size: 22px;
  }
`;

export const RightBar = styled.div`
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  justify-content: flex-end;
`;

export const Selections = styled.div`
  select {
    text-align-last: center;
    border: 1px solid #485768;
    border-radius: 10px;
    height: 44px;
    padding: 5px 30px 5px 20px;
    font: 500 18px 'Mulish';
    -webkit-appearance: none;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABWSURBVHgBTYq7DYAwDERtsoAlFmAMCoowAiOwASUFA7BVWkpGyAgMYOtQIuVz1b27x8t4BQJ56gO8g5ruAGLbEBW2cYJZzsmxC6kbbH2+u4r59HJI4R98ux2l4gUVGgAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
    background-position-x: calc(100% - 15px);
    background-position-y: center;
    background-size: 6px;
    outline: none;
    margin-right: 40px;
  }

  &:last-child {
    select {
      margin-right: 0;
    }
  }
`;

// export const AtsActionStrip = styled.div`
//  background: #fff;
//     padding: 10px 30px;
//     box-shadow: 0 4px 4px rgb(0 0 0 / 4%);
//     border-top: 1px solid rgba(0,0,0,.1);
//     margin-top: 20px;
// `;

export const DetailWrapper = styled.div`
  padding: 24px 30px;
`;

// export const Row = styled.div`
// display: flex;
//     -webkit-flex-wrap: wrap;
//     flex-wrap: wrap;
//     margin-right: -15px;
//     margin-left: -15px;
// `;

export const AtsLeftPanel = styled.div`
  box-shadow: 0 8px 13px -3px #cfd8e2;
  border-radius: 12px;
  background: #fff;

  a {
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
  }
`;

export const LeftPanleTop = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #c2c9d1;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  h4 {
    font: 700 16px 'Mulish';
    color: #005e8b;
    margin-bottom: 0;
  }
  span {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    font: 400 14px 'Mulish';
    color: #485768;
  }
  img {
    margin-right: 5px;
  }
`;

export const LeftApplicantOne = styled.div`
  padding: 15px 25px;
  display: -webkit-flex;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  &.active {
    padding: 15px 25px;
    display: -webkit-flex;
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 100%;
      left: 0;
      top: 0;
      background-color: #009de9;
    }
  }
`;

export const AppImg = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #c4c4c4;
`;

export const RightContent = styled.div`
  width: calc(100% - 48px);
  padding-left: 14px;
  padding-top: 5px;
  .designation {
    font: 400 16px 'Mulish';
    color: #485768;
    margin-bottom: 15px;
    display: block;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font: 400 14px 'Mulish';
    margin-bottom: 5px;
    color: #485768;
  }
`;

export const AppName = styled.div`
  font: 600 18px 'Mulish';
  color: #1d242f;
  margin-bottom: 5px;
`;

export const Dflex = styled.div`
  display: flex !important;
`;

export const Card = styled.div`
  margin-top: 0;
  flex-wrap: nowrap;
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px;
  box-shadow: 0 8px 13px -3px #cfd8e2 !important;
  background: #fff !important;
  border-radius: 10px;
  //border: none;
  margin-bottom: 30px;
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;

  .card_ttl {
    font: 600 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
    line-height: 1;
  }

  .view_more {
    padding-right: 20px;
    position: absolute;
    right: 24px;
    top: 18px;

    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      border-right: 2px solid #009de9;
      border-top: 2px solid #009de9;
      -webkit-transform: translateY(-50%) rotate(45deg);
      transform: translateY(-50%) rotate(45deg);
      right: 0;
      top: 50%;
    }

    &.blue-text {
      color: #009de9;
      font: 700 16px 'Mulish';
    }
  }
`;

export const ApplicantDtls = styled.div`
  width: calc(100% - 55px);
  padding-left: 20px;
  padding-top: 5px;
  .card_ttl {
    font: 600 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
    line-height: 1;
  }
  .designation {
    font: 400 18px 'Mulish';
    color: #485768;
    display: block;
    margin-top: 10px;
  }
  .appliedAgo {
    font: 400 18px 'Mulish';
    color: #485768;
    display: block;
    margin-top: 10px;
  }
`;

export const AppAction = styled.div`
  margin-top: 30px;
  align-items: center !important;
  display: flex !important;
  .fitOrNot {
    color: #00783e;
    font: 700 18px 'Mulish';
    position: relative;
    padding-right: 30px;
    margin-bottom: 0;
  }
  .fitOrNot:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-right: 2px solid #485768;
    border-bottom: 2px solid #485768;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    right: 8px;
    top: 4px;
  }
`;

export const ActionRow = styled.div`
  border-left: 1px solid #485768;
  margin-left: 25px;
  display: flex !important;
  .action-btn {
    display: inline-block;
    padding: 8px 45px !important;
    margin-left: 30px;
    height: auto;
  }
  .blue-bg-btn {
    background: #005e8b;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    font: 500 18px 'Mulish';
    border: 2px solid #005e8b;
  }
  .white-bg-btn {
    background: #fff;
    border: 2px solid #005e8b;
    padding: 10px 20px;
    border-radius: 10px;
    color: #005e8b;
    font: 500 18px 'Mulish';
  }
  .blue-text {
    color: #009de9;
    font: 700 16px 'Mulish';
  }
  .view_more:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-right: 2px solid #009de9;
    border-top: 2px solid #009de9;
    -webkit-transform: translateY(-50%) rotate(45deg);
    transform: translateY(-50%) rotate(45deg);
    right: 0;
    top: 50%;
  }
`;

export const AtsImg = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
`;

export const AtsDetailed = styled.div``;

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
  img {
    margin-bottom: 20px;
    vertical-align: middle;
  }
  p {
    margin-bottom: 0;
  }
`;

export const CoverVideoMain = styled.div`
  min-height: 250px;
  max-width: 600px;
  border-radius: 8px;
  background: #c4c4c4;
  position: relative;
  margin-top: 25px;
  .play_button {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-decoration: none !important;
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
  }
  img,
  svg {
    vertical-align: middle;
    border-style: none;
  }
`;

export const ApplicantOverview = styled.div`
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px;
  box-shadow: 0 8px 13px -3px #cfd8e2 !important;
  background: #fff !important;
  border-radius: 10px;
  //border: none;
  margin-bottom: 30px;
  .card_ttl {
    font: 600 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
    line-height: 1;
  }
`;

export const InsideSection = styled.div`
  margin-top: 40px;
  .sect_ttl {
    font: 600 18px 'Mulish';
    color: #1d242f;
  }
`;

export const InsideSectionOne = styled.div`
  display: flex;
  margin-top: 20px;
  .ats_img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
  }
`;

export const InsideDtls = styled.div`
  padding-top: 5px;
  margin-left: 15px;
  h5 {
    font: 700 16px 'Mulish';
    margin-bottom: 6px;
    color: #1d242f;
  }
  p {
    font: 400 16px 'Mulish';
    margin-bottom: 10px;
    color: #1d242f;
  }
  ul {
    margin-left: 0;
    list-style-position: inside;
    padding-left: 10px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  li {
    list-style: none;
  }
`;

export const StenDT = styled.div`
  font: 400 14px 'Mulish';
  color: #485768;
`;

export const ScreeningResults = styled.div`
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px;
  box-shadow: 0 8px 13px -3px #cfd8e2 !important;
  background: #fff !important;
  border-radius: 10px;
  //border: none;
  margin-bottom: 30px;
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  // border: 1px solid rgba(0, 0, 0, 0.125);
  // border-radius: 0.25rem;
  .card_ttl {
    font: 600 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
    line-height: 1;
  }
`;

export const MatchedQuali = styled.div`
  p {
    font: 600 18px 'Mulish';
    color: #485768;
    margin-top: 14px;
    margin-bottom: 24px;
  }
  span {
    color: #00783e;
  }
`;

export const QualiOneMatched = styled.div`
  box-shadow: 0 2px 4px rgb(0 0 0 / 16%);
  margin-bottom: 25px;
`;

export const QualiQuest = styled.div`
background: rgba(219, 225, 232, 0.3);
    font: 600 18px 'Mulish';
    padding: 14px 15px 14px 50px;
    position: relative;
    margin-bottom: 0;
    margin-top: 0;
    :before{
      background: url('${cdn('/static/img/matched.png')}') no-repeat 0;
      background-size: 25px;
      content: "";
      position: absolute;
      width: 30px;
      left: 13px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      height: 30px;
    }
`;

export const QuestAns = styled.div`
  padding: 0 15px;
  div {
    padding: 14px 0;
    border-bottom: 1px solid #dedede;
  }
`;

export const QualiContent = styled.div`
  .left_img {
    width: 100px;
    height: 100px;
    background: #c4c4c4;
  }
`;

export const RightCont = styled.div`
  width: calc(100% - 100px);
  padding-left: 20px;
  position: relative;
  padding-right: 200px;
  height: 100px;
  overflow: hidden;
  h3 {
    font: 700 16px 'Mulish';
    margin-bottom: 6px;
  }
  p {
    font: 400 16px/1.6 'Mulish';
    margin-bottom: 6px;
    margin-top: 0;
  }
`;

export const BlueTextViewMore = styled.div`
  position: absolute;
  right: 10px;
  bottom: 0;
  top: auto;
  padding-right: 20px;
  color: #009de9;
  font: 700 16px 'Mulish';
  :after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-right: 2px solid #009de9;
    border-top: 2px solid #009de9;
    -webkit-transform: translateY(-50%) rotate(45deg);
    transform: translateY(-50%) rotate(45deg);
    right: 0;
    top: 50%;
  }
`;

export const QualiOneUnMatched = styled.div`
  box-shadow: 0 2px 4px rgb(0 0 0 / 16%);
  margin-bottom: 25px;
  .quali_quest {
    background: rgba(219, 225, 232, 0.3);
    font: 600 18px 'Mulish';
    padding: 14px 15px 14px 50px;
    position: relative;
    margin-bottom: 0;
  }
`;

export const Reveived = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid #dedede;
  .mb-0 {
    color: #1d242f;
    font: 700 16px 'Mulish';
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
  }
  img {
    margin-left: 15px;
    vertical-align: middle;
    border-style: none;
  }
`;

export const CardBordered1 = styled.div`
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px;
  box-shadow: 0 8px 13px -3px #cfd8e2 !important;
  background: #fff !important;
  border-radius: 10px;
  //border: none;
  margin-bottom: 30px;
  .card_ttl {
    font: 600 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
    line-height: 1;
  }
  .resume_main {
    margin-top: 20px;
    max-width: 300px;
    min-height: 400px;
    background: #c4c4c4;
    border-radius: 5px;
    box-shadow: 0 0 5px rgb(0 0 0 / 10%);
  }
`;

export const CardBorderedRejectOffer = styled.div`
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px;
  box-shadow: 0 8px 13px -3px #cfd8e2 !important;
  background: #fff !important;
  border-radius: 10px;
  //border: none;
  margin-bottom: 30px;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  position: relative;
  display: flex;
  .card_ttl {
    font: 600 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
    line-height: 1;
  }
`;

export const TabsFlexTabs = styled.div`
  margin-top: 20px;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  background: #dbe1e8;
  border-radius: 10px;
  padding: 3px;
  width: -webkit-max-content;
  width: max-content;
  .tabs {
    background: transparent;
    border: none;
    border-radius: 8px;
    padding: 8px 38px;
    margin-top: 0;
    min-width: 184px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 153%;
    text-align: center;
    color: #485768;
  }
  .active {
    background: #fff;
    color: #005e8b;
  }
`;

export const TabContent = styled.div`
  .textarea {
    position: relative;
    margin-top: 25px;

    & > div:first-child {
      margin-left: 20px;
    }
  }
  textarea {
    min-height: 120px;
    border-radius: 1px solid #485768;
    width: 100%;
    margin-top: -12px;
    padding: 18px 15px 10px;
    font: 600 18px 'Mulish';
    border-radius: 6px;
    outline: none;
    height: 120px;
    border: 1px solid #485768;
    overflow: auto;
    resize: vertical;
  }
  .attchLink {
    position: absolute;
    right: 5px;
    top: 15px;
    width: 40px;
    height: 40px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    background: #abe4ff;
    border-radius: 6px;
    color: #007bff;
    text-decoration: none !important;
  }
  .note {
    text-align: right;
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

export const ButtonSave = styled.button`
  text-align: center;
  width: 100%;
  display: block;
  margin-top: 30px;
  background: #fff;
  border: 2px solid #005e8b;
  padding: 10px 20px;
  border-radius: 10px;
  color: #005e8b;
  font: 500 18px 'Mulish';
  .blue {
    background: #005e8b;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    font: 500 18px 'Mulish';
    border: 2px solid #005e8b;
  }
`;

export const AattchLink = styled.div`
  position: absolute;
  right: 5px;
  top: 15px;
  width: 40px;
  height: 40px;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  background: #abe4ff;
  border-radius: 6px;
  text-decoration: none !important;
  color: #007bff;
`;

export const BlueButtonSave = styled.button`
  text-align: center;
  width: 100%;
  display: block;
  margin-top: 30px;

  background: #005e8b;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  font: 500 18px 'Mulish';
  border: 2px solid #005e8b;
`;

export const CardBordered = styled.div`
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px;
  box-shadow: 0 8px 13px -3px #cfd8e2 !important;
  background: #fff !important;
  border-radius: 10px;
  //border: none;
  margin-bottom: 30px;
  .card_ttl {
    font: 600 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
    line-height: 1;
  }
`;

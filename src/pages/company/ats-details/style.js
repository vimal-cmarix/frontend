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

export const AtsDetailMain = styled.div`
  background: #f8fbff;
  letter-spacing: 0;
  color: #1d242f;
  font-family: Mulish;
  img {
    vertical-align: middle;
  }
`;

export const BacktoList = styled.div`
  font: 700 18px 'Mulish';
  padding: 24px 30px 0 30px;
  position: relative;
  display: block;
  color: #1d242f;
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.35s ease 0s;
    display: inline-block;
    position: relative;
    padding-left: 20px;
    &:before {
      content: '';
      position: absolute;
      left: 0px;
      bottom: 5px;
      width: 12px;
      height: 12px;
      transform: rotate(45deg);
      border-left: 2px solid #000;
      border-bottom: 2px solid #000;
      transition: all 0.35s ease 0s;
    }
    &:hover {
      color: #009de9;
      &:before {
        border-color: #009de9;
      }
    }
  }
`;

export const AtsDetailed = styled.div``;

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

export const JobBriefing = styled.div`
  max-width: 350px;
  min-height: 90px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 3px 13px -3px #cfd8e2;
  border-radius: 10px;
  padding: 15px;
  font-family: 'Mulish';
  .job_name {
    font: 700 18px 'Mulish';
    margin-bottom: 12px;
    color: #1d242f;
  }
`;

export const Briefing = styled.div`
  display: flex;
  align-items: center;
  span {
    padding-right: 15px;
    margin-right: 8px;
    position: relative;
    font-size: 18px;
    line-height: 24px;
    display: inline-block;
    color: #485768;
  }
  .location {
    &:before {
      content: '';
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #485768;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .jobtype {
    &:after {
      content: '';
      position: absolute;
      width: 1px;
      height: 22px;
      right: 2px;
      top: 50%;
      transform: translateY(-50%);
      background: #485768;
    }
  }
`;

export const DetailWrapper = styled.div`
  padding: 24px 30px;
  .row {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    [class^='col-'] {
      padding-right: 15px;
      padding-left: 15px;
    }
  }
`;

export const Label = styled.div`
  display: inline-block;
  margin-bottom: 0;
  background-color: #fff;
  margin-left: 20px;
  padding: 0 2px;
  position: relative;
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #1d242f;
`;

export const JobApplicant = styled.div`
  margin-top: 25px;
  flex-wrap: nowrap;
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px 25px;
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  background: #fff !important;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
  .ats_img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
  }
`;

export const Dflex = styled.div`
  display: flex !important;
  .ats {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
  }
  .ideal {
    width: 150px;
    font: 600 18px 'Mulish';
    display: inline-block;
  }
  .answer {
    font: 700 18px 'Mulish';
    display: inline-block;
    color: #00783e;
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
  align-items: center;
  display: flex;
  .fitOrNot {
    color: #00783e;
    font: 700 18px 'Mulish';
    position: relative;
    padding-right: 30px;
    margin-bottom: 0;
    &:after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      border-right: 2px solid #485768;
      border-bottom: 2px solid #485768;
      transform: rotate(45deg);
      right: 8px;
      top: 4px;
    }
  }
`;

export const ActionRow = styled.div`
  border-left: 1px solid #485768;
  margin-left: 25px;
  display: flex;
  .action-btn {
    display: inline-block;
    padding: 8px 45px;
    margin-left: 30px;
    border-radius: 10px;
    color: #fff;
    font: 500 18px 'Mulish';
    border: 2px solid #005e8b;
    background: #005e8b;
    height: auto;
    &.white-bg-btn {
      background: #fff;
      border: 2px solid #005e8b;
      color: #005e8b;
      font-weight: 700;
    }
  }
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

export const LeftCardBordered = styled.div`
  border-radius: 8px;
  padding: 20px 0;
  position: sticky;
  top: 85px;
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  background: #fff;
  border: 1px solid #c2c9d1;
  margin-bottom: 30px;
  ul {
    margin-bottom: 0;
    list-style: none;
    padding-left: 0;
    margin-left: 0;
    li {
      a {
        display: block;
        padding: 10px 30px;
        font: 400 16px 'Mulish';
        color: #1d242f;
        transition: all 0.25s ease 0s;
        cursor: pointer;
        &:hover {
          background: #f5f5f5;
        }
        &.active {
          background: #f5f5f5;
          border-left: 3px solid #009de9;
          padding-left: 44px;
          font-weight: 700;
          transition: all 0.25s ease 0s;
        }
      }
    }
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
    transform: translate(-50%, -50%);
  }
  img,
  svg {
    vertical-align: middle;
    border-style: none;
  }
`;

export const ApplicantOverview = styled.div`
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px 25px;
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  background: #fff !important;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
  .card_ttl {
    font: 600 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
    line-height: 1;
  }
`;

export const InsideSection = styled.div`
  margin-top: 40px;
  box-sizing: border-box;
  .sect_ttl {
    font: 600 18px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
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
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
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
    line-height: 20px;
  }
  ul {
    margin-left: 0;
    list-style-position: inside;
    padding-left: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 21px;
  }
  li {
    list-style: none;
  }
`;

export const StenDT = styled.div`
  font: 400 14px 'Mulish';
  color: #485768;
  line-height: 18px;
`;

export const ScreeningResults = styled.div`
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px 25px;
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
  .card_ttl {
    font: 600 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
    line-height: 1;
  }
`;

export const MatchedQuali = styled.div`
  font: 600 18px 'Mulish';
  color: #485768;
  margin-top: 14px;
  margin-bottom: 24px;
  p {
    font-size: inherit;
    color: inherit;
    margin: 0;
    span {
      color: #00783e;
    }
  }
`;

export const QualiOneMatched = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
  margin-bottom: 25px;
`;

export const QualiQuest = styled.div`
  background: rgba(219, 225, 232, 0.3);
  font: 600 18px "Mulish";
  padding: 14px 15px 14px 50px;
  position: relative;
  margin-bottom: 0;
    :before{
      background-size: 25px;
      content: '';
      position: absolute;
      width: 30px;
      left: 13px;
      top: 50%;
      transform: translateY(-50%);
      height: 30px;
      background: url('${cdn('/static/img/matched.png')}') no-repeat 0;
    }
`;

export const QuestAns = styled.div`
  padding: 0px 15px;
  div {
    padding: 14px 0;
    border-bottom: 1px solid #dedede;
    &:last-child {
      border-bottom: none;
    }
  }
  .quali_content {
    align-items: flex-start;
    display: flex;
    .left_img {
      width: 100px;
      height: 100px;
      background: #c4c4c4;
      border: none;
    }
    a {
      position: absolute;
      right: 10px;
      bottom: 0;
      top: auto;
    }
  }
`;

export const QualiContent = styled.div`
  align-items: flex-start;
  display: flex;
  .view-more-text {
    position: absolute;
    right: 10px;
    bottom: 0;
    top: auto;
  }
  .left_img {
    width: 100px;
    height: 100px;
    background: #c4c4c4;
    position: relative;
    width: 200px;
    .play_button {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &.has-video {
    .has-video-right {
      width: calc(100% - 200px);
    }
  }
`;

export const RightCont = styled.div`
  width: calc(100% - 100px);
  padding: 0 200px 0 20px !important;
  position: relative;
  height: 100px;
  overflow: hidden;
  h3 {
    font: 700 16px 'Mulish';
    margin-bottom: 6px;
  }
  p {
    font: 400 16px/1.6 'Mulish';
    margin-bottom: 6px;
  }
`;

export const BlueTextViewMore = styled.a`
  padding-right: 20px;
  position: absolute;
  right: 24px;
  top: 18px;
  color: #009de9;
  font: 700 16px 'Mulish';
  transition: all 0.35s ease 0s;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-right: 2px solid #009de9;
    border-top: 2px solid #009de9;
    transform: translateY(-50%) rotate(45deg);
    right: 0;
    top: 50%;
    transition: all 0.35s ease 0s;
  }
  &:hover {
    color: #1d242f;
    &:after {
      border-color: #1d242f;
    }
  }
`;

export const QualiOneUnMatched = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
  margin-bottom: 25px;
  .quali_quest {
    background: rgba(219, 225, 232, 0.3);
    font: 600 18px 'Mulish';
    padding: 14px 15px 14px 50px;
    position: relative;
    margin-bottom: 0;
  }
  .unmatched-que {
    &:before{
      background: url('${cdn(
        '/static/img/unmatched.png',
      )}') no-repeat center left;
      background-size: 25px;
    }
  }
  &.unmatched{
    .answer{
      color: #1D242F;
    }
    p{
      &.mb-0{
        color: #1D242F;
      }
    }
  }
`;

export const Reveived = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid #dedede;
  .mb-0 {
    color: #00783e;
    font: 700 16px 'Mulish';
    display: flex;
    align-items: center;
    img {
      margin-left: 15px;
      vertical-align: middle;
      border-style: none;
    }
  }
`;

export const CardBordered1 = styled.div`
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px;
  box-shadow: 0 8px 13px -3px #cfd8e2;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
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
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

export const CardBorderedRejectOffer = styled.div`
  border: 1px solid #c2c9d1;
  padding: 20px 25px 24px;
  box-shadow: 0 8px 13px -3px #cfd8e2;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
  .card_ttl {
    font: 600 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
    line-height: 1;
  }
`;

export const TabsFlexTabs = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  background: #dbe1e8;
  border-radius: 10px;
  padding: 3px;
  width: max-content;
  .tabs {
    background: transparent;
    border-radius: 8px;
    padding: 7px 38px;
    margin-top: 0;
    min-width: 184px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 153%;
    text-align: center;
    color: #485768;
    border: 1px solid transparent;
  }
  .active {
    background: #fff;
    color: #005e8b;
    border: 1px solid #c2c9d1;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.08);
  }
`;

export const TabContent = styled.div`
  margin-top: 22px;
  .textarea {
    position: relative;
    margin: 0;
  }
  textarea {
    min-height: 120px;
    width: 100%;
    margin-top: -11px;
    padding: 18px 15px 10px;
    font: 600 18px 'Mulish';
    border-radius: 6px;
    outline: none;
    height: 120px;
    border: 1px solid #485768;
    overflow: auto;
    resize: vertical;
    &::placeholder {
      transition: 0.25s all ease-in-out;
    }
    &:focus {
      border-color: #4fbbef;
      &::placeholder {
        opacity: 0;
      }
    }
  }
  .attchLink {
    position: absolute;
    right: 5px;
    top: 15px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #abe4ff;
    border-radius: 6px;
  }
  .note {
    text-align: right;
    font-size: 14px;
    line-height: 21px;
    margin: 0;
  }
`;

export const ButtonSave = styled.button`
  background: #fff;
  border: 2px solid #005e8b;
  padding: 10px 20px;
  border-radius: 10px;
  color: #005e8b;
  font: 700 18px 'Mulish';
  width: 100%;
  display: block;
  margin-top: 30px;
  box-shadow: none;
  outline: none;
  transition: all 0.35s ease 0s;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: #fff;
    background: #005e8b;
    border-color: 2px solid #005e8b;
  }
  .blue {
    background: #005e8b;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    font: 500 18px 'Mulish';
    border: 2px solid #005e8b;
  }
  &.disabled,
  &[disabled] {
    background: #c2c9d1 !important;
    border-color: #c2c9d1 !important;
    color: #485768 !important;
    opacity: 1;
    cursor: not-allowed;
  }
`;

export const AattchLink = styled.div`
  position: absolute;
  right: 5px;
  top: 18px;
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
  input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
`;

export const BlueButtonSave = styled.button`
  background: #005e8b;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  font: 500 18px 'Mulish';
  border: 2px solid #005e8b;
  width: 100%;
  display: block;
  margin-top: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.35s ease 0s;
  box-shadow: none;
  outline: none;
  &:hover {
    background: #fff;
    color: #005e8b;
    border-color: #005e8b;
  }
  &.disabled,
  &[disabled] {
    background: #c2c9d1 !important;
    border-color: #c2c9d1 !important;
    color: #485768 !important;
    opacity: 1;
    cursor: not-allowed;
  }
`;

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

export const OuterWrapper = styled.div``;

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
  #dropdown-basic2 {
    box-shadow: none !important;
    padding: 0;
  }
  #dropdown-basic {
    border: none;
    color: #212529;
    font-weight: 500;
    padding-right: 22px !important;
    box-shadow: none !important;
    padding: 0;
    position: relative;

    &::after {
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
      display: block;
    }

    img {
      margin-right: 6px;
    }
  }
  .profile-drop-down {
    right: auto;
    position: relative;
    top: auto;
    width: 100%;
    border-radius: 10px;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    padding: 15px 0 24px;

    ul {
      padding-bottom: 15px;
      margin-bottom: 15px;
      position: relative;

      &.middle {
        li {
          &:not(:last-child) {
            margin-bottom: 15px;
          }
          a {
            padding: 12px 20px;
            display: flex;
            align-items: center;

            img {
              height: 27px !important;
              width: 27px !important;
              margin-right: 7px;
            }
          }
        }
      }

      &::after {
        content: '';
        height: 1px;
        background: #dbe1e8;
        bottom: 0;
        position: absolute;
        left: 24px;
        right: 24px;
      }

      li {
        a {
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

          &:hover {
            background: rgba(219, 225, 232, 0.25);
          }

          &.active {
            border-left-color: #009de9;
            background: rgba(219, 225, 232, 0.25);
          }
        }
      }
    }
    .logout {
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
      background: transparent !important;
      outline: none;
    }
  }
  .notification-popup {
    .heading {
    }
  }
`;

export const HeaderMenus = styled.div`
  ul {
    padding-left: 0;
    margin-left: 0;
    list-style: none;
    margin-left: 43px;
    margin-bottom: 0;
  }
  li {
    margin-right: 64px;
  }
  li:last-child {
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
  }
  a:hover {
    color: #005e8b;
  }
  a.active {
    border-bottom: 2px solid #005e8b;
    color: #005e8b;
  }
`;

export const ProfileSectionWrap = styled.div`
  background: #f8fbff;
  overflow-x: hidden;
  position: relative;
  flex-wrap: wrap;
  padding: 24px 0 0 0;
  display: flex;
  letter-spacing: 0;
  img {
    vertical-align: middle;
    max-width: 100%;
  }
`;

export const ProfileLeftsideMenu = styled.div`
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  border-radius: 10px;
  background: #fff;
  width: 375px;
  max-width: 100%;
  height: 100%;
  min-height: auto;
  padding-bottom: 20px;
  position: relative;
  z-index: 9;
  margin-left: 24px;

  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 153%;
    color: #1d242f;
    padding: 24px 24px 25px;
    position: relative;
    margin-bottom: 24px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  h2:before {
    content: '';
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 0;
    border-bottom: 1px solid #dbe1e8;
  }

  ul li {
    a:hover {
      background: rgba(219, 225, 232, 0.25);
    }
    &.has-submenu {
      position: relative;
      span {
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 153%;
        color: #1d242f;
        padding: 8px 50px 8px 21px;
        border-left: 3px solid transparent;
        display: block;
        text-decoration: none;
        transition: all 0.35s ease 0s;
        cursor: pointer;

        &:hover {
          background: rgba(219, 225, 232, 0.25);
        }
      }

      svg {
        position: absolute;
        right: 33px;
        top: 15px;
      }

      &.opened {
        background: #fff !important;
        .sub-menus {
          height: 100%;
          overflow: visible;
        }
      }

      .sub-menus {
        height: 0;
        overflow: hidden;
        li {
          a {
            font-family: Mulish;
            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 153%;
            color: #1d242f;
            padding: 8px 50px 8px 21px;
            border-left: 3px solid transparent;
            display: block;
            position: relative;
            text-decoration: none;
            transition: all 0.35s ease 0s;
            padding-left: 36px;
            color: #1d242f;
            font-weight: 400;
            cursor: pointer;
          }
        }
      }
    }
    &.active {
      a {
        color: #009de9;
        font-weight: bold;
        border-color: #009de9;
        background: rgba(219, 225, 232, 0.25);
      }
    }
  }

  ul li a {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
    padding: 8px 50px 8px 21px;
    border-left: 3px solid transparent;
    display: block;
    position: relative;
    text-decoration: none;
    transition: all 0.35s ease 0s;

    svg {
      position: absolute;
      right: 33px;
      top: 15px;
    }
  }

  box-shadow: 0 8px 13px -3px #cfd8e2;
  border-radius: 10px;
  background: #fff;
  width: 375px;
  min-width: 375px;
`;

export const ProfileRightPanel = styled.div`
  width: 100%;
  padding-left: 0;
  margin-top: -50px;

  .social_feed {
    max-width: 862px;
    margin: auto;
    text-align: center;
    padding: 48px 0;

    & > .row {
      justify-content: space-between;
      & > div {
        max-width: 45%;
        flex: 0 0 45%;
      }
    }
    .social_feed_user {
      width: 48px;
      height: 48px;
      background: #c4c4c4;
      border-radius: 40px;
      margin: auto auto 8px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        object-fit: cover;
        object-position: center;
      }
    }

    .feed-title {
      margin: 0 0 16px;
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 28px;
      text-align: center;
      color: #1d242f;
    }

    .feed-main {
      height: 800px;
      background: #c4c4c4;
      border: 1px solid #c4c4c4;
      .Container {
        border: none;
        border-radius: 0;
        height: 100%;
      }
      @media screen and (max-width: 1560px) {
        height: 650px;
      }
      @media screen and (max-width: 1440px) {
        height: 550px;
      }
    }
  }
`;

export const CompanyPageMain = styled.div`
  background-color: #fff;
  padding: 24px 0 30px;

  @media screen and (max-width:1560px){
    padding-top:70px;
  }

  .compnay-preview-wrapper{
    padding:46px 15px 94px;
    .bottom_information {
      margin: auto;
      background: #FFFFFF;
      box-shadow: 0px 0px 30px #CFD8E2;
      border-radius: 10px;
      padding: 16px;
      width: 684px;
      max-width: 100%;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 153%;
      color: #1D242F;
      p{
        margin:0;
      }
      strong{
        font-weight: 800;
        text-decoration: underline;
      }
    }
  }

  .meet-employees {
    max-width: 920px;
    border-radius: 5px;
    margin:auto;
    box-shadow: 0px 8px 13px -3px #cfd8e2;
  }
  .meet-employees .meet-employees-top {
    padding: 60px 0 59px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background: url('${cdn('/static/img/perks-bg.png')}') no-repeat 50%;
    background-size: cover;    
    align-items: center;
    justify-content: center;
    display: flex;

    .com-name{
      margin-bottom: 0;
      color: #fff;
      padding: 10px 65px;
      border-radius: 40px;
      background-color: #1D242F;    
      font: 700 24px "Mulish";
      color: #1D242F;
    }
  }

  .meet-employees .show_more-employees a {
    position: relative;
    display: inline-block;
    padding-bottom: 20px;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 153%;
    text-align: center;
    color: #009DE9;
    transition:all 0.35s ease 0s;
    &::after{
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      left: 50%;
      bottom: 0;
      border-right: 2px solid #009DE9;
      border-bottom: 2px solid #009DE9;
      transform: rotate(45deg) translateX(-50%);
      transition:all 0.35s ease 0s;
    }
    &:hover{
      color: #1D242F;
      &:after{
        border-color: #1D242F;
      }
    }
}

.toggle_sections {
  max-width: 920px;
  margin: auto;
  padding: 72px 0 48px;
  p{
    margin-bottom: 0;
  }
  .img {
    width: 100%;
    height: 237px;
    border-radius: 4px;
    background: #C4C4C4;
    box-shadow: 0px 8px 13px -3px #CFD8E2;
    border-radius: 5px;
    video{
      border-radius: 5px;
      width: 100%;
      height: 100%;
      vertical-align: middle;
      object-fit: cover;
      border: none;
      outline: none;
    }
  }
  .row{
    margin-bottom:56px;
    &:nth-child(2n) {
      flex-direction: row-reverse;
    }
    &:last-child{
      margin-bottom:0;
    }
    &:nth-child(2n){
      .col-md-6{
        &:last-child{
          text-align:right;
          .info{
            max-width:354px;
          }
        }
      }
    }
  }
  .info {
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 153%;
    color: #1D242F;
    max-width: 330px;
    display: inline-block;
    text-align:left;
    h3 {
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      color: #1D242F;
      margin: 0 0 8px;
      a{
        text-decoration: none;
        color: inherit;
      }
    }
  }
}

  .meet-employees .meet-employees_main {
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    display: flex;
    padding: 31px 9px 0;
  }

  .meet-employees .show_more-employees {
    text-align: center;
    padding-bottom: 30px;
  }

  .meet-employees .meet-employees_main .employee_one {
    text-align: center;
    padding: 0 15px 31px;
    width:33.33%;

    .employee_one_inner{
      max-width: 215px;
      width:215px;
      display: inline-block;
    }

    .video-icon{
      position: absolute;
      right: -24px;
      bottom: 16px;
      width: 58px;
      height: 26px;      
      align-items: center;
      justify-content: center;
      background: #1D242F;
      border-radius: 8px;
      display: flex;
      border: none;
      outline: none;
      box-shadow: none;
      a{
        display:block;
      }
      img {
        vertical-align: middle;
        max-height: 16px;
        border-radius: 0;
      }
    }

    .employee_details{
      margin-top:8px;
      .employee-name{
        margin: 0;
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        text-align: center;
        color: #1D242F;
      }
      .designation{
        font-family: Mulish;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 28px;
        text-align: center;
        color: #1D242F;
        margin-bottom: 8px;
        display: block;
      }
      p{
        font-family: Mulish;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 153%;
        text-align: center;
        color: #1D242F;
        margin: 0;
      }
    }
  }

  .meet-employees .meet-employees_main .employee_one .employee_img {
    width: 100px;
    position: relative;
    height: 100px;
    border-radius: 50%;
    margin: auto;
    background: #C4C4C4;
    box-shadow: 0px 8px 13px -3px #CFD8E2;
    > img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .meet-employees .meet-employees-top .com-name{
    margin: 0;
    color: #fff;
    padding:8px 24px;
    border-radius: 40px;
    background-color: #1d242f;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 153%;
    min-width: 498px;
    text-align: center;
  }

  .hiring_outer_wrapper {
    padding: 24px 0 42px;
    background-color: #edf0f5;
  }

  .feature_article {
    max-width: 920px;
    margin: auto;
    .feature_article_inner{
      margin-bottom: 42px;
      &:last-child{
        margin-bottom: 0;
      }
    }

    .article_main {
      height: 348px;
      background: #c4c4c4;
      border-radius: 5px;
      margin: 0 0 16px;
      video{
        border-radius: 5px;
        width: 100%;
        height: 100%;
        vertical-align: middle;
        object-fit: cover;
        border: none;
        outline: none;
      }
    }

    h3 {
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      color: #1D242F;
      margin: 0 0 24px;
    }

    .article_info {
      text-align: center;
      max-width: 480px;
      margin: auto;
      font-family: Mulish;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 153%;
      text-align: center;
      color: #1D242F;
      h4 {
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 28px;
        text-align: center;
        color: #1D242F;
      }
      p{
        margin:0;
      }
      .learn-more {
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 153%;
        color: #009DE9;
        display: inline-block;
        position: relative;
        padding-right: 20px;
        transition:all 0.35s ease 0s;
        margin-top:8px;
        &:after{
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          border-right: 2px solid #009DE9;
          border-top: 2px solid #009DE9;
          transform: rotate(45deg) translateY(-50%);
          margin-left: 0;
          top: 50%;
          right: 5px;
          transition:all 0.35s ease 0s;
        }
        &:hover{
          color: #1D242F;
          &:after{
            border-color: #1D242F;
          }
        }
      }
    }
  }

.profile-right-panel {
  width: 100%;
  padding-left: 0;
  margin-top: -50px;
}
`;

export const CompnayPreviewtopWrapper = styled.div`
  border-bottom: 1px solid #c2c9d1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
`;

export const InsideTopWrappers = styled.div`
  max-width: 700px;
  margin: auto;
`;

export const TopInfo = styled.div`
  padding-bottom: 16px;
  justify-content: space-between !important;
  .com-name {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 153%;
    color: #1d242f;
    margin: 0 0 24px;
    position: relative;
    padding-right: 90px;
    .shareButton {
      position: absolute;
      right: 0;
      left: calc(100% + 97px);
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      background: transparent;
      transition: all 0.35s ease 0s;
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 153%;
      color: #485768;
      white-space: nowrap;
      svg {
        margin-right: 8px;
        position: relative;
        top: -2px;
      }
      path {
        transition: all 0.35s ease 0s;
      }
      &:hover {
        color: #009de9;
        path {
          stroke: #009de9;
        }
      }
    }
  }
  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
`;

export const CompnayPreviewWrapper = styled.div`
  max-width: 684px;
  margin: auto;
`;

export const CompanyLogo = styled.div`
  width: 278px;
  align-items: center;
  justify-content: center;
  font: 700 16px 'Mulish';
  margin: 27px auto 24px;
  color: #1d242f;
  display: flex;
  img {
    max-width: 100%;
    max-height: 78px;
    vertical-align: middle;
  }
`;

export const WorkingAt = styled.div`
  padding-bottom: 48px;
  border-bottom: 1px solid #a1aab4;
  margin-bottom: 24px;
  .com-name {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 153%;
    color: #1d242f;
    margin-bottom: 24px;
  }
  .com-pre-video {
    background: #1d242f;
    border-radius: 5px;
    margin-bottom: 16px;
    img {
      border-radius: 5px;
    }
    video {
      border-radius: 5px;
      width: 100%;
      height: 315px;
      vertical-align: middle;
      object-fit: cover;
      border: none;
      outline: none;
    }
  }
  p {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const PerksBenefits = styled.div`
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom:48px;
  .accordion-item{
    border: none;
    &:nth-child(2n){
      .accordion-header{
        background:#E6EDF5;
      }
    }
  }

  .accordion-header{
    padding: 0 24px;

    button{
      border: none;
      border-radius: 0;
      width: 100%;
      text-align: left;
      display: block;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 150%;
      color: #005e8b;
      position: relative;
      padding: 12px 32px 12px 38px;
      text-decoration: none;
      box-shadow: none;
      transition: all .35s ease 0s;
      background: none;

      .toggle-icon{
        width: 24px;
        height: 24px;
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-repeat: no-repeat;
        background-position: 50%;
        background-image: url('${cdn('/static/img/minus-circle.svg')}');

        svg{
          position: unset;
          display: none;
        }
      }

      &.collapsed{
        color: #1d242f;
        
        .toggle-icon{
          background: none;

          svg{
            display: block;
            path {
              stroke: #A1AAB4;
            }
          }
        }

        svg{
          path{
            stroke: #1d1d1d ;
            
            &.b{
              fill: #1d1d1d;
              stroke: none;
            }
          }
        }
      }

      svg{
        position: absolute;
        left: 0;
        top: 10px;

        path{
          stroke: #005e8b;

          &.b{
            fill: #005e8b;
            stroke: none;
          }
        }
      }
     
    }
  }

  .accordion-body{
    background: #f9f9fa;
    padding: 16px 24px;
    min-height: 220px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #1d242f;
    transition: all .3s ease-in-out;
  }

  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    color: #1d242f;
    margin: 0 0 8px;
  }
  span {
    color: #005e8b;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

export const PerksTop = styled.div`
background: url('${cdn('/static/img/perks-bg.png')}') no-repeat 50%;
background-size: cover;
display: -webkit-flex;
display: flex;
-webkit-align-items: center;
align-items: center;
-webkit-justify-content: center;
justify-content: center;
padding: 60px 10px 59px;
.com-name {
  padding:8px 24px;
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 153%;
  color: #FFFFFF;
  text-align:center;
  border-radius:50px;
  background: #1D242F;
  width:468px;
  max-width:100%;
  margin:0;
}
`;

export const Card = styled.div`
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
`;

export const CardHeader = styled.div`
  padding: 0 24px;
  margin: 0;
  background: transparent;
  border: none;
`;

export const Btn = styled.div`
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
`;

export const CompanyBenefitList = styled.div`
  .card:nth-child(2n) .card-header {
    background: #e6edf5;
  }
  h3 {
    margin: 0;
  }
  .btn-link {
    border: none;
    border-radius: 0;
    width: 100%;
    text-align: left;
    display: block;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    position: relative;
    padding: 12px 32px 12px 38px;
    text-decoration: none;
    box-shadow: none;
  }
  .btn-link:hover {
    color: #005e8b !important;
  }
  .btn-link svg {
    display: block;
    vertical-align: middle;
  }
  .btn-link:hover svg path{
    stroke: #005E8B !important;
  }
  .btn-link:hover svg path.b{
    fill: #005E8B !important;
  }
  .btn-link svg path{
    stroke: #005E8B;
  }
  .btn-link.collapsed svg path{
    stroke: #1d1d1d;
  }
  .btn-link svg path.a{
    stroke: #005E8B;
  }
  .btn-link svg path.b {
    fill: #005E8B;
    stroke: none !important;
  }
  .btn-link.collapsed svg path.a{
    stroke: #1d1d1d;
  }
  .btn-link.collapsed svg path.b {
    fill: #1d1d1d;
  }
  .btn-link.collapsed{
    color: #1D242F;
  }
  .btn-link > svg {
    position: absolute;
    left: 0;
    top: 10px;
  }
  .btn-link > img {
    position: absolute;
    left: 0;
    top: 10px;
  }
  .toggle-icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-image: url('${cdn('/static/img/minus-circle.svg')}')
    background-repeat: no-repeat;
    background-position: center;
  }
  .toggle-icon {
    background-image: url('${cdn('/static/img/minus-circle.svg')}')
  }
  .company-benefits-body {
    background: #f9f9fa;
    padding: 16px 24px;
    min-height: 220px;
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #1d242f;
  }
  .add-benefits-btn {
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
    border-radius: 10px;
    transition: all 0.35s ease 0s;
    outline: none;
    box-shadow: none;
    text-align: center;
    text-decoration: none;
  }
`;

export const HiringOuterWrapper = styled.div`
  padding: 24px 0 32px;
  margin-top: 0;
  background-color: #edf0f5;
  margin-bottom: 48px;

  .com-name {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #1D242F;
    margin: 0 0 24px;
  }

  .now_hiring{
    .save-the-job{
      position: absolute;
      top: -20px;
      margin-top: 0 !important;
      right: -20px;
      background: #fff;
      box-shadow: 0px 0px 15px rgb(0 0 0 / 15%);
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;

      img{
        margin-right: 0 !important;
      }
    }
    .search-form {
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      width: 100%;
      input {
        width: calc(100% - 110px);
        height: 42px;
        padding: 5px 12px 5px 54px;
        font: 500 16px 'Mulish';
        outline: none;
        border: none;
        background: #fff url('${cdn(
          '/static/img/search-icon.svg',
        )}') no-repeat 16px;
        background-size: 22px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      button {
        background: #009DE9;
        color: #fff;
        width: 110px;
        padding: 5px;
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 152%;
        outline: none;
        height: 42px;
        border: none;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        text-align:center;
        box-shadow:none;
      }
    }
    .job_one {
      background: #fff;
      position: relative;
      box-shadow: 0px 8px 13px -3px #CFD8E2;
      border-radius: 10px;
      padding: 16px 25px 16px 16px;
      margin-top: 35px;
      border: 1px solid #E8ECF1;
      > div {
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 152%;
        letter-spacing: 0;
        color: #485768;
        margin: 0 0 8px;
    
        img{
          margin-right: 10px
        }
      }
      > div.job-posting{
        margin-bottom:0;
        > a {
          display: block;
          position: relative;
          padding-right: 20px;
          font-family: Mulish;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 153%;
          text-align: right;
          color: #009DE9;
          transition:all 0.35s ease 0s;      
          &::after{
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            border-right: 2px solid #009DE9;
            border-top: 2px solid #009DE9;
            transform: translateY(-50%) rotate(45deg);
            right: 0;
            top: 14px;
            transition:all 0.35s ease 0s;
          }
          &:hover{
            color: #1D242F;
            &:after{
              border-color: #1D242F;
            }
          }
        }
      }
      .job-name {
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 152%;
        color: #1D242F;
        margin: 0;
      }
      .company-name {
        font-family: Mulish;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 152%;
        color: #1D242F;
        margin-bottom:16px;
        display: block;
      }
    }
    .carousel {
      padding-bottom: 68px;
      .carousel-inner{
        margin: 0 -30px 0 -10px;
        padding: 0;
        width: auto;
        min-width: 100%;
        .carousel-item {
          padding: 0 30px 0 10px;
        }
      }
      .carousel-control-prev,
      .carousel-control-next {
        width: 110px;
        height: 44px;
        border: none;
        border-radius: 8px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: #fff;
        font: 600 18px "Mulish";
        background: #a873fa;
        opacity: 1;
        position: absolute;
        bottom: 0;
        top: auto;
        span{
          display: none;
        }
      }
      .carousel-control-prev {
        left: -25px;
        &:before {
          content: "";
          width: 10px;
          height: 10px;
          border-bottom: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(45deg);
          margin-right: 10px;
          margin-top: 1px;
        }
        &:after {
          content: 'Prev';
        }
      }
      .carousel-control-next {
        right: -25px;
        &:after {
          content: "";
          width: 10px;
          height: 10px;
          border-top: 2px solid #fff;
          border-right: 2px solid #fff;
          transform: rotate(45deg);
          margin-left: 10px;
          margin-top: 1px;
        }
        &:before {content: 'Next';}    
      }
      .carousel-indicators{
        position: absolute;
        top: auto;
        right: 120px;
        bottom: 0;
        left: 120px;
        margin: 0;
        min-height: 44px;        
        align-items: center;
        justify-content: center;
        display: flex;
        button {
          width: 8px;
          height: 8px;
          border: 1px solid #485768;
          background: #485768;
          border-radius: 50%;
          display: inline-block;
          margin: 0 10px;
          position: relative;
          cursor: pointer;
          opacity: 1;
          transition: all 0.35s ease 0s;
          box-sizing: border-box;
          padding: 0;
          &.active {
            background: transparent;
          }
        }
      }
    }
  }
  .slider-footer {
    align-items: center;
    justify-content: space-between;
    margin: 24px -25px 0;
    display: flex;
    > .nav-buttons {
      width: 110px;
      height: 44px;
      border: none;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font: 600 18px "Mulish";
      background: #a873fa;
      .next :disabled {
        background: red!important;
      }
      &.next:after {
        content: "";
        width: 10px;
        height: 10px;
        border-top: 2px solid #fff;
        border-right: 2px solid #fff;
        transform: rotate(45deg);
        margin-left: 10px;
      }
      &.prev:before {
        content: "";
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        transform: rotate(45deg);
        margin-right: 10px;
      }
    }
    .nav-dots {
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      .nav-dot {
        width: 8px;
        height: 8px;
        border: 1px solid #485768;
        background: #485768;
        border-radius: 50%;
        display: inline-block;
        margin: 0 10px;
        position: relative;
        cursor: pointer;
        &.active {
          background: transparent;
        }
      }
    }
  }
`;

export const AddedList = styled.div`
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    li {
      padding: 16px 0 16px 0;
      position: relative;
      border-bottom: 1px solid #dbe1e8;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 150%;
      color: #1d242f;
      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
      }
      &:first-child {
        padding-top: 0;
      }
      h4 {
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 150%;
        color: #1d242f;
        margin: 0;
      }
    }
  }
`;

// export const HiringOuterWrapper = styled.div`

// `;

export const ComDetailOne = styled.div`
  & > div {
    margin-bottom: 4px;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 153%;
    color: #485768;

    img {
      margin-right: 8px;
    }
  }
  .name {
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 153%;
    color: #1d242f;
  }
`;

export const ToggleAccordion = styled.button`
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
  border-radius: 10px;
  transition: all 0.35s ease 0s;
  outline: none;
  box-shadow: none;
  text-align: center;
  text-decoration: none;

  svg {
    margin-right: 7px;
    position: relative;
    top: -1px;
    path {
      vertical-align: middle;
      transition: all 0.35s ease 0s;
    }
  }

  &:hover {
    text-decoration: none;
    color: #4fbbef;
    background: #fff !important;

    svg {
      path {
        stroke: #4fbbef;
      }
    }
  }
`;

export const ModalStyle = styled.div`
  .modal-body {
    padding: 16px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
  }
  video {
    border-radius: 5px;
    width: 100%;
    height: 315px;
    vertical-align: middle;
    object-fit: cover;
    border: none;
    outline: none;
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

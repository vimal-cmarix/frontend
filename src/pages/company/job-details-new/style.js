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

export const JobPostMain = styled.div`
  padding: 8px 82px 30px 142px;
  overflow: hidden;
  background: #fff;
  letter-spacing: 0;
  img {
    vertical-align: middle;
  }
  @media screen and (max-width: 1550px) {
    padding-left: 108px;
    padding-right: 24px;
  }
`;

export const SearchHeader = styled.div`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  display: flex;
`;

export const BackToList = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 153%;
  color: #1d242f;
  a {
    display: inline-block;
    transition: all 0.35s ease 0s;
    color: inherit;
    cursor: pointer;
    outline: none;
    margin-left: -20px;
    &:hover {
      color: #009de9;
      :hover {
        svg {
          path {
            stroke: #009de9;
          }
        }
      }
    }
    svg {
      margin-right: 12px;
      top: -2px;
      position: relative;
      path {
        transition: all 0.35s ease 0s;
      }
    }
  }
`;

export const JObPostingList = styled.div`
  padding: 0 0 30px;
  box-shadow: none;
  border-radius: 0;
  position: relative;
  margin: 0 0 24px;
  background: #fff;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    right: -100%;
    bottom: 0;
    border-bottom: 1px solid #c2c9d1;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.04);
  }
`;

export const JObPostItem = styled.div`
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
  position: relative;
  h3 {
    font-size: 24px;
    line-height: 153%;
    margin: 0 0 8px;
    font-family: Mulish;
    font-style: normal;
    color: #1d242f;
    font-weight: 700;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      font-size: 16px;
      line-height: 153%;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      color: #485768;
      position: relative;
      padding-left: 24px;
      margin: 0 0 8px;
      &:last-child {
        margin-bottom: 0;
      }
      img {
        top: 4px;
        left: 0;
        position: absolute;
      }
    }
  }
`;

export const JobPostCompany = styled.div`
  margin-bottom: 8px;
  font-weight: 400;
  font-family: Mulish;
  font-style: normal;
  font-size: 18px;
  line-height: 152%;
  color: #1d242f;
  p {
    margin: 0;
  }
`;

export const BookmarkBtn = styled.div`
  right: 92px;
  position: absolute;
  top: 0;
  a {
    width: 44px;
    height: 44px;
    border-radius: 44px;
    background: #fff;
    box-shadow: 2px 2px 8px rgb(0, 0, 0, 0.16);
    align-items: center;
    justify-content: center;
    display: flex;
    svg:not(:root) {
      overflow: hidden;
    }
  }
`;

export const JobPostingWrap = styled.div`
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  display: flex;
`;

export const JobPostingLeftPanel = styled.div`
  margin-right: 116px;
  width: 684px;
  @media screen and (max-width: 1550px) {
    margin-right: 30px;
  }
`;

export const WhyWorkBox = styled.div`
  font-family: Mulish;
  font-style: normal;
  line-height: 153%;
  color: #1d242f;
  font-weight: 600;
  font-size: 18px;
  padding-bottom: 30px;
  position: relative;
  z-index: 0;
  &.job-posting-gray-box {
    padding: 24px 24px 24px 0;
    color: #485768;
    &:before {
      background: #edf0f5;
      border-radius: 0 10px 10px 0;
      content: '';
      position: absolute;
      left: -100%;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
    }
  }
  h2 {
    font-weight: 700;
    font-size: 24px;
    margin: 0 0 16px;
    font-family: Mulish;
    font-style: normal;
    line-height: 153%;
    color: #1d242f;
  }
  p {
    margin: 0 0 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ApplyNowButton = styled.button`
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: #fff;
  padding: 6px 20px;
  background: #1db954;
  border: 2px solid #1db954;
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  display: inline-block;
  text-align: center;
  transition: all 0.35s ease 0s;
  text-decoration: none;
  outline: none;
  box-shadow: none !important;
  cursor: pointer;

  &:hover {
    background: transparent;
    border-color: #1db954;
    color: #1db954;
    path {
      stroke: #1db954;
    }
  }
  svg {
    margin-left: 9px;
    position: relative;
    top: -1px;
    :not(:root) {
      overflow: hidden;
    }
  }
  path {
    transition: all 0.35s ease 0s;
  }
`;

export const WorkBoxVideo = styled.div`
  margin: 0 0 16px;
  text-align:center
  background:#1D242F;
  a {
    display:inline-block;
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
  }
  img {
    max-width: 100%;
    vertical-align: middle;
    max-height:315px;
  }
`;

export const PerksBenefitsWrap = styled.div`
  padding: 32px 24px 32px 0;
`;
export const PerksBenefits = styled.div`
  box-shadow: 0 8px 13px -3px #cfd8e2;
  border-radius: 5px;
  overflow: hidden;

  .accordion-item{
    border: none;

    &:nth-child(2n){
      .accordion-header{
        background: #e6edf5;
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
          path{
            stroke: #005e8b;
          }
        }
      }

      &.collapsed{
        color: #1d242f;
        
        .toggle-icon{
          background: none;

          svg{
            display: block;
            path{
              stroke: #a1aab4;
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
  flex-wrap: wrap;
  padding: 30px 0 0;
  background: #f8fbff;
  display: flex;
`;

export const ProfileLeftsideMenu = styled.div`
  height: 100%;
  min-height: auto;
  padding-bottom: 20px;
  position: relative;
  z-index: 9;
  margin-left: 28px;

  .profile-leftside-menu h2 {
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
  }

  box-shadow: 0 8px 13px -3px #cfd8e2;
  border-radius: 10px;
  background: #fff;
  width: 375px;
  min-width: 375px;
  .has-submenu {
    background: rgba(219, 225, 232, 0.1) !important;
  }
`;

export const ProfileRightPanel = styled.div`
  .social_feed {
    max-width: 920px;
    margin: auto;
    text-align: center;
    padding: 50px 0;
  }

  .social_feed .feed-title {
    font: 700 18px 'Mulish';
    color: #1d242f;
    margin: 10px 0 20px;
  }

  .social_feed .feed-main {
    height: 800px;
    background: #c4c4c4;
  }
`;

export const CompanyPageMain = styled.div`
  background-color: #fff;
  padding: 70px 0 30px;


   .bottom_information {
    margin-top: 40px;
    margin-bottom: 100px;
    box-shadow: 0 0 30px #cfd8e2;
    padding: 15px;
    border-radius: 8px;
    }

.bottom_information p {
  margin-bottom: 0;
  font-size: 16px;
  line-height: 1.7;
  font-weight: 500;
}
  .meet-employees {
    max-width: 920px;
    border-radius: 8px;
    margin: 45px auto 25px;
    box-shadow: 0 0 15px rgb(0 0 0 / 15%);
  }
  .meet-employees .meet-employees-top {
    padding: 70px 0;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background: url('${cdn('/static/img/perks-bg.png')}') no-repeat 50%;
    background-size: cover;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .meet-employees .show_more-employees a {
    position: relative;
    display: inline-block;
    font: 700 18px "Mulish";
    padding-bottom: 20px;
    color: #009de9;
}

.img {
  width: 100%;
  height: 250px;
  background: #c4c4c4;
  border-radius: 4px;
  box-shadow: 0 0 15px rgb(0 0 0 / 20%);
}

.toggle_sections .info h3 {
  font: 700 24px "Mulish";
  margin-bottom: 7px;
}
.toggle_sections {
  max-width: 920px;
  margin: auto;
  padding: 40px 0;
}

  .meet-employees .meet-employees_main {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: flex-start;
    align-items: flex-start;
  }

  .meet-employees .show_more-employees {
    text-align: center;
    padding-bottom: 30px;
  }

  .meet-employees .meet-employees_main .employee_one {
    width: calc(33.3% - 10px);
    text-align: center;
    padding: 20px 40px;
  }

  .meet-employees .meet-employees_main .employee_one .employee_img {
    width: 100px;
    position: relative;
    height: 100px;
    border-radius: 50%;
    margin: auto;
    background: #c4c4c4;
    box-shadow: 0 0 5px rgb(0 0 0 / 10%);
  }

  .meet-employees .meet-employees-top .com-name,
  .compnay-preview-wrapper .perks-benefits .perks_top .com-name {
    margin-bottom: 0;
    color: #fff;
    padding: 10px 65px;
    border-radius: 40px;
    background-color: #1d242f;
  }

  .feature_article {
    max-width: 920px;
    margin: auto;
  }

  .hiring_outer_wrapper {
    padding: 30px 0;
    margin-top: 20px;
    background-color: #edf0f5;
}

.feature_article .article_main {
  height: 350px;
  background: #c4c4c4;
  border-radius: 4px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
}

.feature_article .article_info h4 {
  text-align: center;
  font: 700 18px "Mulish";
  margin-bottom: 5px;
  margin-top: 20px;
}
.feature_article .article_info p {
  font: 400 16px/1.6 "Mulish";
  margin: auto auto 10px;
  max-width: 500px;
  text-align: center;
}

 .feature_article .article_info .learn-more {
  font: 700 16px "Mulish";
  color: #009de9;
  position: relative;
  display: block;
  width: -webkit-max-content;
  width: max-content;
  margin: auto;
}

 .profile-right-panel {
  width: 100%;
  padding-left: 0;
  margin-top: -50px;
}

.feature_article h3 {
  font: 700 24px "Mulish";
  margin-bottom: 20px;
}
`;
export const CompnayPreviewtopWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const InsideTopWrappers = styled.div`
  max-width: 700px;
  margin: auto;
`;

export const TopInfo = styled.div`
  padding-bottom: 20px;
  justify-content: space-between !important;
  .com-name {
    font: 700 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 24px;
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
  max-width: 700px;
  margin: auto;
`;

export const CompanyLogo = styled.div`
  width: 275px;
  height: 80px;
  background-color: #c4c4c4;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  font: 700 16px 'Mulish';
  margin: 30px auto;
`;

export const WorkingAt = styled.div`
  .com-name {
    font: 700 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 24px;
  }
  p {
    margin-top: 20px;
    font: 600 16px 'Mulish';
    color: #1d242f;
    line-height: 1.7;
    padding-bottom: 35px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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
padding: 65px 10px;
.com-name {
  margin-bottom: 0;
  color: #fff;
  padding: 8px 65px;
  border-radius: 40px;
  background-color: #1db954;
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 153%;
  text-align: center;
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
  margin:0;
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
  padding: 30px 0;
  margin-top: 20px;
  background-color: #edf0f5;

  .com-name {
    font: 700 24px 'Mulish';
    color: #1d242f;
    margin-bottom: 24px;
  }

  .now_hiring .search-form {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    width: 100%;
  }
  .now_hiring .search-form input {
    width: calc(100% - 110px);
    height: 42px;
    padding: 5px 12px 5px 45px;
    font: 500 16px 'Mulish';
    outline: none;
    border: none;
    background: #fff url(/static/media/searchicon.08616b69.svg) no-repeat 14px;
    background-size: 18px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .now_hiring .search-form button {
    background: #009de9;
    color: #fff;
    width: 110px;
    padding: 5px;
    font: 600 16px 'Mulish';
    outline: none;
    height: 42px;
    border: none;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .now_hiring .job_one {
    background: #fff;
    position: relative;
    box-shadow: 0 8px 13px -3px #cfd8e2;
    border-radius: 10px;
    padding: 15px 30px 15px 18px;
    margin-top: 35px;
  }

  .now_hiring .job_one .job-name {
    font: 700 18px 'Mulish';
    margin-bottom: 6px;
  }

  .now_hiring .job_one .company-name {
    font: 400 18px 'Mulish';
    margin-bottom: 20px;
    display: block;
  }

  .now_hiring .job_one > div {
    line-height: 1;
    margin-top: 12px;
    font-size: 14px;
  }

  .now_hiring .job_one > div {
    line-height: 1;
    margin-top: 12px;
    font-size: 14px;
  }

  .now_hiring .job_one > div.job-posting > a {
    display: block;
    font: 700 16px 'Mulish';
    color: #009de9;
    position: relative;
    padding-right: 20px;
  }

  .slider-footer {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    margin: 30px -25px 0;
  }

  .slider-footer > .nav-buttons.disabled {
    background: #c2c9d1 !important;
  }

  slider-footer > .nav-buttons {
    width: 110px;
    display: block;
    height: 44px;
    border: none;
    border-radius: 8px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    color: #fff;
    font: 600 18px 'Mulish';
    background: #a873fa;
  }

  .slider-footer .nav-dots {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
  }

  .slider-footer > .nav-buttons {
    width: 110px;
    display: block;
    height: 44px;
    border: none;
    border-radius: 8px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    color: #fff;
    font: 600 18px 'Mulish';
    background: #a873fa;
  }
`;
export const MeetEmployeesSection = styled.div`
  padding: 32px 24px 72px 0;
`;

export const MeetEmployeesWrap = styled.div`
  border-radius: 5px;
  margin: 0;
  box-shadow: 0 8px 13px -3px #cfd8e2;
  background: #fff;
`;

export const MeetEmployeesTop = styled.div`
  padding: 60px 0;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background: url('${cdn('/static/img/perks-bg.png')}') center;
  background-repeat: no-repeat;
  background-size: cover;  
  align-items: center;
  justify-content: center;
  display: flex;
  h3 {
    margin-bottom: 0;
    color: #fff;
    padding: 8px 65px;
    border-radius: 40px;
    background-color: #1db954;
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 153%;
    text-align: center;
  }
`;

export const MeetEmployeeOne = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 8px;
`;

export const EmployeeOne = styled.div`
  width: 33.3%;
  padding: 30px 8px 32px;
  color: #1d242f;
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 153%;
  text-align: center;
  .employee_img {
    width: 100px;
    position: relative;
    height: 100px;
    border-radius: 50%;
    margin: auto;
    background: #c4c4c4;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    > a {
      display: inline-block;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 100px;
        vertical-align: middle;
      }
    }
    .video-icon {
      position: absolute;
      right: -20px;
      bottom: 14px;
      width: 58px;
      height: 26px;
      align-items: center;
      justify-content: center;
      display: flex;
      background: #1db954;
      border-radius: 6px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      img {
        vertical-align: middle;
        max-height: 16px;
      }
    }
  }
`;

export const EmployeeImg = styled.div`
  width: 100px;
  position: relative;
  height: 100px;
  border-radius: 50%;
  margin: auto;
  background: #c4c4c4;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  > a {
    display: inline-block;
    > img {
      width: 100%;
      height: 100%;
      border-radius: 100px;
      vertical-align: middle;
    }
  }
  .video-icon {
    position: absolute;
    right: -20px;
    bottom: 14px;
    width: 58px;
    height: 26px;
    align-items: center;
    justify-content: center;
    display: flex;
    background: #1db954;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    img {
      vertical-align: middle;
      max-height: 16px;
    }
  }
`;

export const EmployeeDetail = styled.div`
  .employee-name {
    font: 600 18px 'Mulish';
    margin: 8px 0 0;
    line-height: 28px;
    color: #1d242f;
  }
  .designation {
    font: 400 18px 'Mulish';
    line-height: 28px;
    color: #1d242f;
    display: block;
    margin-bottom: 8px;
  }
  p {
    margin-bottom: 0;
  }
`;

export const ShowMoreEmployees = styled.div`
  text-align: center;
  padding-bottom: 30px;
  a {
    position: relative;
    display: inline-block;
    font: 700 18px 'Mulish';
    padding-bottom: 20px;
    color: #009de9;
    line-height: 153%;
    transition: all 0.35s ease 0s;
    &:after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      border-right: 2px solid #009de9;
      border-bottom: 2px solid #009de9;
      transform: rotate(45deg);
      transition: all 0.35s ease 0s;
    }
    &:hover {
      color: #1d242f;
      &:after {
        border-color: #1d242f;
      }
    }
  }
`;

export const JobCompanyBox = styled.div`
  margin-top: 51px;
  background: #fff;
  border: 1px solid #e8ecf1;
  box-sizing: border-box;
  box-shadow: 0 0 30px #cfd8e2;
  border-radius: 10px;
  min-width: 448px;
  width: 448px;
`;

export const JobCompanyHeader = styled.div`
  padding: 16px;
  text-align: center;
  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #1d242f;
    margin: 0 0 16px;
  }
  a {
    display: inline-block;
  }
  img {
    max-height: 80px;
  }
`;

export const JobComInfo = styled.div`
  background: #edf0f5;
  padding: 8px 32px;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex-wrap: wrap;
    display: flex;
    li {
      width: 50%;
      font-family: Mulish;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 153%;
      color: #1d242f;
      margin-top: 24px;
      &:first-child {
        margin-top: 0;
      }
      &:nth-child(2) {
        margin-top: 0;
      }
      p {
        margin: 0;
      }
    }
    h4 {
      font-family: Mulish;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 153%;
      color: #485768;
      margin: 0 0 4px;
      position: relative;
      padding-left: 24px;
      img {
        position: absolute;
        left: 0;
        top: 4px;
        vertical-align: middle;
      }
    }
  }
`;

export const JobCompanyBody = styled.div`
  padding: 24px 32px;
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 153%;
  color: #485768;
  p {
    margin: 0 0 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .view-com-link {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 153%;
    text-align: right;
    color: #1ed760;
    svg {
      margin-left: 15px;
    }
    path {
      transition: all 0.35s ease 0s;
    }
    a {
      display: inline-block;
      transition: all 0.35s ease 0s;
      color: inherit;
      text-decoration: none;
      outline: none;
      &:hover {
        color: #1d242f;
        path {
          stroke: #1d242f;
        }
      }
    }
  }
`;

export const NowHiringWrap = styled.div`
  width: 100%;
  padding: 24px 60px 32px 0;
  position: relative;
  z-index: 0;
  :before {
    content: '';
    background: #edf0f5;
    border-radius: 0;
    position: absolute;
    left: -100%;
    right: -100%;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
`;

export const NowHiring = styled.div`
  .com-name {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #1d242f;
    margin: 0 0 24px;
  }
`;

export const SearchForm = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  input {
    width: calc(100% - 110px);
    height: 42px;
    padding: 5px 12px 5px 45px;
    outline: none;
    border: none;
    background: url('${cdn(
      '/static/img/hiring-search-icon.svg',
    )}') no-repeat 14px;
    background-color:#fff;
    background-size: 18px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    color: #1d242f;
  }
  button {
    background: #1db954;
    color: #fff;
    width: 110px;
    padding: 5px;
    font: 600 16px "Mulish";
    outline: none;
    height: 42px;
    border: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const JobOne = styled.div`
  background: #fff;
  position: relative;
  box-shadow: 0 8px 13px -3px #cfd8e2;
  border-radius: 10px;
  padding: 15px 25px 15px 18px;
  margin-top: 34px;
  border: 1px solid #e8ecf1;
  box-sizing: border-box;
  > div {
    margin-top: 8px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 152%;
    color: #485768;
    img {
      margin-right: 8px;
    }
    &.job-posting {
      > a {
        display: block;
        color: #009de9;
        position: relative;
        padding-right: 18px;
        font-family: Mulish;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 153%;
        transition: all 0.35s ease 0s;
        &:after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border-right: 2px solid #009de9;
          border-top: 2px solid #009de9;
          transform: rotate(45deg);
          right: 0;
          top: 8px;
          transition: all 0.35s ease 0s;
        }
        &:hover {
          color: #1d242f;
          &:after {
            border-color: #1d242f;
          }
        }
      }
    }
  }

  .job-name {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 152%;
    color: #1d242f;
    margin: 0;
  }
  .company-name {
    margin-bottom: 16px;
    display: block;
    font-family: Mulish;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 152%;
    color: #1d242f;
  }
  .save-the-job {
    position: absolute;
    top: -20px;
    margin-top: 0 !important;
    right: -20px;
    background: #fff;
    box-shadow: 0 0 15px rgb(0, 0, 0, 0.15);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    img {
      margin-right: 0 !important;
      vertical-align: middle;
    }
  }
`;

export const SliderFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px -25px 0;
  .nav-buttons {
    width: 110px;
    display: block;
    height: 44px;
    border: none;
    border-radius: 8px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    color: #fff;
    font: 600 18px 'Mulish';
    background: #1db954;
    &.disabled {
      background: #c2c9d1 !important;
    }
    &.next {
      &:after {
        content: '';
        width: 10px;
        height: 10px;
        border-top: 2px solid #fff;
        border-right: 2px solid #fff;
        transform: rotate(45deg);
        margin-left: 10px;
      }
    }
    &.prev {
      &:before {
        content: '';
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        margin-right: 10px;
      }
    }
  }
  .nav-dots {
    display: flex;
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
      &.active {
        background: transparent;
      }
    }
  }
`;

export const NavDots = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  .active {
    background: transparent;
  }
  .nav-dot {
    width: 8px;
    height: 8px;
    border: 1px solid #485768;
    background: #485768;
    border-radius: 50%;
    display: inline-block;
    margin: 0 10px;
    position: relative;
  }
  .nav-buttons {
    width: 110px;
    display: block;
    height: 44px;
    border: none;
    border-radius: 8px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    color: #fff;
    font: 600 18px 'Mulish';
    background: #1db954;
  }
`;

export const ZigZagWrap = styled.div`
  width: 920px;
  max-width: 100%;
  margin: auto;
  padding: 48px 0;
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 153%;
  color: #1d242f;
`;

export const SocialFeedWrapRow = styled.div`
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  .col-md-6 {
    width: 405px;
    max-width: 405px;
    padding-right: 15px;
    padding-left: 15px;
  }
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #1d242f;
    margin: 0 0 16px;
  }
`;

export const ZigZagWrapRow = styled.div`
  margin-bottom: 56px;
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  &:last-child {
    margin-bottom: 0;
  }
  &:nth-child(2n) {
    .col-md-6 {
      :first-child {
        text-align: right;
        .info {
          width: 354px;
        }
      }
    }
  }
  [class^='col-'] {
    padding-right: 15px;
    padding-left: 15px;
  }
  .img {
    width: 100%;
    height: 237px;
    background: #c4c4c4;
    box-shadow: 0 8px 13px -3px #cfd8e2;
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;

export const Info = styled.div`
  width: 320px;
  max-width: 100%;
  text-align: left;
  display: inline-block;
  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #1d242f;
    margin-bottom: 6px;
  }
  p {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  button.explore-link {
    padding: 0;
    box-shadow: none;
  }
  .explore-link {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 153%;
    color: #009de9;
    text-decoration: none;
    outline: none;
    transition: all 0.35s ease 0s;
    svg {
      margin-left: 13px;
      &:not(:root) {
        overflow: hidden;
      }
    }
    path {
      transition: all 0.35s ease 0s;
    }
    &:hover {
      color: #1d242f;
      path {
        stroke: #1d242f;
      }
    }
  }
`;
export const FeatureArticleWrap = styled.div`
  background: #edf0f5;
  padding: 24px 0 42px;
  position: relative;
  z-index: 0;
  width: 100%;
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 153%;
  color: #1d242f;
  &:before {
    content: "";
    background: #edf0f5;
    position: absolute;
    left: -100%;
    right: -100%;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
}
`;

export const FeatureArticleImg = styled.div`
  height: 348px;
  border-radius: 5px;
  margin-bottom: 16px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
    vertical-align: middle;
  }
`;

export const FeatureArticleInner = styled.div`
  max-width: 920px;
  margin: auto;
  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #1d242f;
    margin: 0 0 24px;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export const ArticleInfo = styled.div`
  max-width: 496px;
  margin: auto;
  text-align: center;
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #1d242f;
    margin: 0;
  }
  p {
    margin: 0;
  }
  .learn-more {
    position: relative;
    display: block;
    width: -webkit-max-content;
    width: max-content;
    margin: 8px auto auto;
    font-family: Mulish;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 153%;
    color: #009de9;
    transition: all 0.35s ease 0s;
    &:after {
      content: '';
      width: 10px;
      height: 10px;
      position: absolute;
      border-right: 2px solid #009de9;
      border-top: 2px solid #009de9;
      transform: rotate(45deg) translateY(-50%);
      margin-left: 5px;
      top: 50%;
      transition: all 0.35s ease 0s;
    }
    &:hover {
      color: #1d242f;
      &:after {
        border-color: #1d242f;
      }
    }
  }
`;

export const SocialFeedWrap = styled.div`
  width: 865px;
  max-width: 100%;
  margin: auto;
  padding: 48px 0;
  .col-md-6 {
    width: 405px;
    max-width: 405px;
  }
`;

export const SocialFeedImg = styled.div`
  background: #c4c4c4;
  width: 48px;
  height: 48px;
  border-radius: 50px;
  margin: auto auto 8px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50px;
  }
`;

export const SocialFeedBox = styled.div`
  height: 812px;
  background: #c4c4c4;
  width: 100%;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
  .modal-content {
    background: #fff;
    border: 1px solid #e8ecf1;
    box-sizing: border-box;
    box-shadow: 0 0 8px #cfd8e2;
    border-radius: 10px;
  }
  .modal-body {
    padding: 24px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
  }

  .explore-media-box {
    margin-bottom: 16px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
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

export const ModalBox = styled.div`
  display: block;
  padding-right: 17px;
`;

export const ModalStyle = styled.div`
  letter-spacing: 0;
  .modal-header {
    padding: 24px 24px 0 24px;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    .modal-title {
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 28px;
      color: #1d242f;
      margin: 0;
      padding: 0 0 16px;
      border-bottom: 1px solid #a1aab4;
      width: 100%;
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
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 153%;
      color: #1d242f;
    }

    img {
      width: 100%;
      margin-bottom: 8px;
    }
    .apply-now-btn {
      font-family: Mulish;
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 28px;
      color: #fff;
      padding: 6px 20px;
      background: #1db954;
      border: 2px solid #1db954;
      box-sizing: border-box;
      border-radius: 10px;
      width: 100%;
      display: inline-block;
      text-align: center;
      transition: all 0.35s ease 0s;
      text-decoration: none;
      outline: none;
      box-shadow: none !important;
      margin-top: 14px;

      &:hover {
        background: transparent;
        border-color: #1db954;
        color: #1db954;
      }
    }

    p {
      margin: 0 0 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .form-group {
      margin-bottom: 48px;
    }
    h3 {
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      color: #1d242f;
      margin: 0 0 16px;
    }
    .or {
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 28px;
      text-align: center;
      color: #485768;
      margin: 32px auto;
      position: relative;
      width: 372px;
      max-width: 100%;
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
      span {
        min-width: 59px;
        background: #fff;
        position: relative;
        display: inline-block;
      }
    }
  }
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

export const Label = styled.div`
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

export const FormGroup = styled.div`
  margin: 0 0 24px;
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
      margin-top: -8px;
      padding-right: 34px;
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
  &.mb-48{
    margin-bottom:48px;
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

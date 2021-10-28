import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
import { lighten, darken, rgba } from 'polished';
import { Primary, White, Black, Grey } from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { LabelXSmall, LabelMedium } from '@assets/styles/typography';
import {
  laptop,
  smscreen,
  xxsscreen,
  smscreenReverse,
} from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';

const colorSchemas = {
  light: {
    iconColor: Primary,
    inactiveIconColor: rgba(Black, 0.35),
    backgroundColor: White,
    boxShadow: 'inset 0px -1px 0px #EEEEEE',
    backgroundHover: darken(0.03, White),
    backgroundActive: darken(0.12, White),
  },
  dark: {
    iconColor: White,
    inactiveIconColor: rgba(White, 0.35),
    backgroundColor: Primary,
    boxShadow: 'none',
    backgroundHover: lighten(0.15, Primary),
    backgroundActive: lighten(0.1, Primary),
  },
};

export const SecondaryHeader = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  background: #fff;
  padding: 13px 30px 13px 24px;
  position: relative;
  z-index: 99;
  letter-spacing: 0;
  position: sticky;
  top: 0;
  backdrop-filter: blur(4px);

  @media (max-width: 767px) {
    padding-left: 17px;
    padding-right: 17px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
      z-index: -1;
    }
  }

  img {
    vertical-align: middle;
  }

  .secondary_wrapper {
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    .logo {
      cursor: pointer;
      a {
        display: block;
        img {
          max-height: 36px;
        }
      }
    }

    .header-menus {
      @media (max-width: 767px) {
        display: none;
      }
      .profile-drop-down {
        display: none;
      }
      @media (max-width: 767px) {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100%;
        background: #fff;
        z-index: -1;
        padding: 75px 0px 20px;

        li {
          a {
            text-align: left !important;
          }
        }

        .menu-list {
          display: block !important;
          margin-left: 0;
          position: relative;
          padding-bottom: 15px;

          &::after {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0px;
            width: calc(100% - 30px);
            height: 1px;
            background: #dedede;
          }

          li {
            margin-right: 0;

            a {
              padding: 10px 16px !important;
              display: block;
              border-bottom: none !important;

              &.active {
                padding: 9px 20px 9px 12px !important;
                border-left: 4px solid #009de9;
                background: #f4f4f4;
              }
            }
          }
        }

        .profile-drop-down {
          display: block;

          a.logout {
            padding: 30px 16px;
          }

          ul {
            margin-left: 0;

            &.middle {
              margin-top: 15px;
              padding-bottom: 20px;
            }

            &::after {
              left: 15px;
              right: 15px;
            }

            li {
              margin: 0;
              a {
                padding: 10px 20px !important;

                &.active {
                  padding: 9px 20px 9px 16px !important;
                  border-left: 4px solid #009de9;
                  background: #f4f4f4;
                }
              }
            }
          }
        }
      }
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
      .drop-down-menu {
        @media (max-width: 767px) {
          display: none;
        }
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
      &:after {
        content: '';
        position: absolute;
        left: -7px;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background: rgba(219, 225, 232, 0.5);
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 50px;
        z-index: -1;
        transition: all 0.35s ease 0s;
        opacity: 0;
      }
      &:hover {
        &:after {
          opacity: 1;
        }
      }
      &.has-notification {
        :before {
          content: '';
          position: absolute;
          top: 1px;
          right: -1px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fb6d3a;
          z-index: 1;
        }
      }
      img {
        vertical-align: middle;
        position: relative;
      }
    }
    &.show {
      .dropdown-toggle {
        &:after {
          opacity: 1;
        }
      }
    }
    .dropdown-menu {
      right: -20px !important;
      top: 51px !important;
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
    border: none;
    vertical-align: middle;
    line-height: 20px;
    margin: -4px 0 0 0;
  }
  #dropdown-basic {
    border: none;
    color: #1d242f;
    font-weight: 600;
    padding-right: 23px !important;
    box-shadow: none !important;
    padding: 0;
    position: relative;
    font-family: Mulish;

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
      margin-right: 8px;
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
    padding: 15px 0;

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
          color: #485768 !important;
          border-left: 3px solid transparent;
          cursor: pointer;

          &:hover {
            background: rgba(219, 225, 232, 0.25);
          }

          &.active {
            border-left-color: #009de9;
            background: rgba(219, 225, 232, 0.25);
            color: #1d242f !important;
          }
        }
      }
    }
    .logout {
      display: block;
      text-align: center;
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 152%;
      color: #d92f0e !important;
      margin: 0;
      background: transparent !important;
      outline: none;
      padding: 8px 21px 9px;
      &:hover {
        background: rgba(219, 225, 232, 0.25) !important;
        // color: #1d242f !important;
      }
    }
  }
  .notification-popup {
    .heading {
    }
  }
`;

export const MiddalWrap = styled.a`
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
`;

export const DashboardWrap = styled.div`
  background: #f8fbff;
  padding: 24px;
  letter-spacing: 0;
  img {
    vertical-align: middle;
  }
`;

export const DashboardInner = styled.div`
  margin: auto;
  width: 920px;
  max-width: 100%;

  .accordion-item {
    margin-bottom: 16px;
    border: none;

    .accordion-body {
      padding: 0;

      .table-responsive {
        box-shadow: 0 8px 13px -3px #cfd8e2;
        background: #fff;
        overflow: inherit;

        & + .table-responsive {
          margin-top: 16px;
          border-radius: 0 0 10px 10px;
        }

        table {
          margin-bottom: 0;

          .dropdown-toggle {
            background: transparent !important;
            border: none !important;
            padding: 0;
            margin: 0;
            box-shadow: none !important;
            font-size: 0;

            &::after {
              display: none;
            }
          }
          .dropdown-menu {
            background: #fff;
            border: 1px solid #c2c9d1;
            box-sizing: border-box;
            box-shadow: -2px 2px 5px rgb(0 0 0 / 16%);
            border-radius: 4px;
            min-width: 343px;
            margin: 6px 0 0;
            padding: 0 8px;
            right: 0 !important;
            left: auto !important;

            a,
            button {
              font-family: Mulish;
              font-style: normal;
              font-weight: 700;
              font-size: 14px;
              line-height: 28px;
              color: #485768;
              padding: 6px 30px 6px 0;
              border-bottom: 1px solid #dbe1e8;
              position: relative;
              background: transparent;
              transition: all 0.35s ease 0s;

              &.delete-item {
                color: #d92f0e;
              }
              &:hover {
                background: rgba(219, 225, 232, 0.25);
              }

              &:not(.delete-item) {
                &:hover {
                  color: #009de9;

                  svg {
                    path {
                      stroke: #009de9;
                    }
                  }
                }
              }

              &::before {
                content: '';
                position: absolute;
                left: -8px;
                right: -8px;
                top: 0;
                bottom: 0;
                background: transparent;
                z-index: -1;
                transition: all 0.35s ease 0s;
              }

              svg {
                position: absolute;
                right: 0;
                top: 8px;
                path {
                  transition: all 0.35s ease 0s;
                }
              }
            }
          }

          .tbl-search {
            position: relative;
            & > img {
              display: inline-block;
              width: 24px;
              height: 24px;
              position: absolute;
              left: 0;
              top: 2px;
            }
            input {
              font-family: Mulish;
              font-style: normal;
              font-weight: 400;
              font-size: 18px;
              line-height: 153%;
              color: #1d242f;
              border: none;
              padding: 0 0 0 38px;
              margin: 0;
              outline: none;
              box-shadow: none;
              background: transparent;
            }
          }

          tbody {
            tr:hover {
              background: #abe4ff;
            }
          }

          tr {
            transition: all 0.2s ease 0s;
            background: transparent;

            &:last-child {
              td {
                border-bottom: none !important;
              }
            }

            th {
              border: none;
              border-bottom: 1px solid #a1aab4;
              vertical-align: middle;
              font-family: Mulish;
              font-style: normal;
              line-height: 153%;
              color: #485768 !important;
              text-align: center;
              font-weight: 600;
              font-size: 18px !important;
              padding: 18px 16px;
              border: none;
              border-bottom: 1px solid #a1aab4;
              vertical-align: middle;

              &:first-child {
                text-align: left;
                width: 43%;
                min-width: 43%;
              }
              &:last-child {
                font-size: 0 !important;
              }
            }
            td {
              font-family: Mulish;
              font-style: normal;
              line-height: 153%;
              color: #485768 !important;
              text-align: center;
              font-weight: 400;
              font-size: 24px !important;
              padding: 16px;
              min-width: 80px;
              border: none;
              border-bottom: 1px solid #a1aab4;
              vertical-align: middle;

              &:last-child {
                width: 60px;
                min-width: 60px;
                max-width: 60px;
              }

              &:nth-child(4) {
                min-width: 135px;
              }

              h3 {
                font-family: Mulish;
                font-style: normal;
                font-weight: 700;
                font-size: 18px;
                line-height: 153%;
                color: #1d242f;
                margin: 0 0 8px;

                svg {
                  vertical-align: middle;
                  margin-right: 8px;
                  position: relative;
                  top: -2px;
                }

                span {
                  color: #fba72a;
                }
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

                  &::before {
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

                    &::before {
                      display: none;
                    }
                  }
                  &:nth-child(2) {
                    padding-left: 22px;

                    &::before {
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
              &:first-child {
                text-align: left;
                width: 43%;
                min-width: 43%;
              }
            }
          }
        }
      }
    }
  }

  .accordion-header {
    margin-bottom: 0;
    margin-top: 0;
    & > button {
      border: none;
      background: #005e8b;
      border-radius: 10px !important;
      display: block;
      width: 100%;
      text-align: left;
      padding: 16px 15px 16px 48px;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 153%;
      color: #fff;
      position: relative;
      text-decoration: none;
      box-shadow: none;

      &.collapsed {
        .toggle-icon {
          transform: rotate(180deg);
        }
      }

      svg {
        position: absolute;
        left: 16px;
        top: 18px;
      }
      h3 {
        button {
          padding: 0;
          display: flex;
          align-items: center;
          font-family: Mulish;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          width: 100%;
          color: #fff;
          text-decoration: none;
          box-shadow: none !important;

          .toggle-icon {
            margin-left: auto;
            -webkit-transition: 0.2s all ease-in-out;
            transition: 0.2s all ease-in-out;
          }
        }
      }
    }
  }
`;

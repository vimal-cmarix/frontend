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

export const OuterMostWrapper = styled.div`
  background: #f8fbff;
  min-height: 100vh;
  letter-spacing: 0;
  .modal-dialog {
    max-width: 330px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%) !important;
  }
`;

// export const SecondaryHeader = styled.div`
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
//   background: #fff;
//   padding: 13px 30px 13px 24px;
//   position: relative;
//   z-index: 99;
//   letter-spacing: 0;
//   img {
//     vertical-align: middle;
//   }

//   .secondary_wrapper {
//     align-items: center;
//     flex-wrap: wrap;
//     display: flex;
//     .logo {
//       a {
//         display: block;
//         img {
//           max-height: 36px;
//         }
//       }
//     }

//     .header-menus {
//       ul {
//         padding-left: 0;
//         margin-left: 0;
//         list-style: none;
//         margin-left: 43px;
//         margin-bottom: 0;
//         li {
//           margin-right: 64px;
//           &:last-child {
//             margin-right: 0;
//           }
//           a {
//             padding: 20px 0;
//             font-family: Mulish;
//             font-style: normal;
//             font-weight: bold;
//             font-size: 16px;
//             line-height: 153%;
//             text-align: center;
//             color: #485768;
//             text-decoration: none;
//             outline: none;
//             transition: all 0.5s ease 0s;
//             &:hover {
//               color: #005e8b;
//             }
//             &.active {
//               border-bottom: 2px solid #005e8b;
//               color: #005e8b;
//             }
//           }
//         }
//       }
//     }

//     .right-menus {
//       margin-left: auto;
//       align-items: center;
//       display: flex;
//       a {
//         text-decoration: none;
//       }
//       .login-user {
//         font-size: 16px;
//         font-weight: 700;
//         padding-right: 0;
//         position: relative;

//         .dropdown-menu {
//           background: #fff;
//           border: 1px solid #dbe1e8;
//           box-sizing: border-box;
//           box-shadow: 0 3px 4px -3px #9ea0a3;
//           border-radius: 10px 0 10px 10px;
//           transform: none !important;
//           right: 0 !important;
//           left: auto !important;
//           top: 57px !important;
//           padding: 0;
//           margin: 0;
//           min-width: 285px;
//         }
//         a {
//           color: #1d242f;
//         }
//         .dropdown {
//           padding-right: 0;
//         }
//         &.dropdown {
//           &::after {
//             display: none;
//           }
//         }
//         .dropdown-toggle {
//           display: block;
//           font-family: Mulish;
//           font-style: normal;
//           font-weight: 600;
//           font-size: 16px;
//           line-height: 153%;
//           color: #1d242f;

//           &::after {
//             display: none;
//           }
//           svg {
//             margin-left: 9px;
//           }
//         }
//         img {
//           width: 35px;
//           height: 35px;
//           border-radius: 50%;
//           object-fit: cover;
//           margin-right: 8px;
//         }
//       }
//       .drop-down-menu {
//         margin-left: 32px;
//       }
//     }
//   }

//   .notification_wrapper {
//     position: relative;
//     .dropdown-toggle {
//       position: relative;
//       :after {
//         display: none;
//       }
//       &.has-notification {
//         :before {
//           content: '';
//           position: absolute;
//           top: -1px;
//           right: -1px;
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background: #fb6d3a;
//         }
//       }
//     }
//     .dropdown-menu {
//       right: -20px !important;
//       top: 55px !important;
//       left: auto !important;
//       float: none;
//       min-width: 375px;
//       padding: 0;
//       margin: 0;
//       background: #ffffff;
//       border: 1px solid #dbe1e8;
//       box-sizing: border-box;
//       box-shadow: 0px 3px 4px -3px #9ea0a3;
//       border-radius: 10px 0px 10px 10px;
//       transform: none !important;
//       &.show {
//         display: block;
//       }
//       .notification-popup {
//         box-shadow: none;
//         position: relative;
//         top: auto;
//         right: auto;
//         width: 100%;
//         opacity: 1;
//         visibility: visible;
//         padding: 16px 16px 26px;
//         background: #fff;
//         border-radius: 10px;
//         transition: all 0.1s ease-in-out;
//         z-index: 99;
//         .heading {
//           justify-content: space-between;
//           display: flex;
//           h3 {
//             font-family: Mulish;
//             font-style: normal;
//             font-weight: 700;
//             font-size: 14px;
//             line-height: 153%;
//             color: #1d242f;
//             margin-bottom: 0;
//           }
//           .close-popup {
//             width: max-content;
//             padding: 0;
//             background: transparent !important;
//             img {
//               width: 20px;
//             }
//           }
//         }
//         .all-notifications {
//           margin-top: 16px;
//           .notification_one {
//             border-radius: 8px;
//             padding: 8px;
//             margin-bottom: 16px;
//             position: relative;
//             background: rgba(219, 225, 232, 0.25);
//             font-family: Mulish;
//             font-style: normal;
//             font-weight: 400;
//             font-size: 13px;
//             line-height: 153%;
//             color: #1d242f;
//             &::before {
//               content: '';
//               position: absolute;
//               top: 0;
//               left: -11px;
//               bottom: 0;
//               width: 8px;
//               height: 8px;
//               border-radius: 20px;
//               background: #ed4a2a;
//               margin: auto;
//             }
//             h4 {
//               font-family: Mulish;
//               font-style: normal;
//               font-weight: 600;
//               font-size: 13px;
//               line-height: 153%;
//               color: #0287c8;
//               margin-bottom: 0;
//             }
//             p {
//               margin-bottom: 0;
//             }
//           }
//           .seeall {
//             font-family: Mulish;
//             font-style: normal;
//             font-weight: bold;
//             font-size: 13px;
//             line-height: 153%;
//             text-align: center;
//             color: #005e8b !important;
//             width: max-content;
//             margin: auto;
//             display: block;
//             text-decoration: none;
//             outline: none;
//             transition: all 0.35s ease 0s;
//             :hover {
//               color: #1d242f !important;
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const SecondaryWrapper = styled.div`
//   #dropdown-basic2{
//     box-shadow: none !important;
//     padding: 0;
//   }
//   #dropdown-basic{
//     border: none;
//     color: #212529;
//     font-weight: 500;
//     padding-right: 22px !important;
//     box-shadow: none !important;
//     padding: 0;
//     position: relative;

//     &::after{
//       content: '';
//       position: absolute;
//       right: 8px;
//       left: auto;
//       width: 10px;
//       height: 10px;
//       border: none;
//       border-right: 2px solid #212529;
//       border-bottom: 2px solid #212529;
//       transform: rotate(45deg) translateY(-100%);
//       top: 50%;
//       display: block
//     }

//     img{
//       margin-right: 6px
//     }
//   }
//   .profile-drop-down{
//     right: auto;
//     position: relative;
//     top: auto;
//     width: 100%;
//     border-radius: 10px;
//     box-shadow: none;
//     opacity: 1;
//     visibility: visible;
//     padding: 15px 0 24px;

//     ul{
//       padding-bottom: 15px;
//       margin-bottom: 15px;
//       position: relative;

//       &.middle{
//         li{
//           &:not(:last-child){
//             margin-bottom: 15px
//           }
//           a{
//             padding: 12px 20px;
//             display: flex;
//             align-items: center;

//             img{
//               height: 27px !important;
//               width: 27px !important;
//               margin-right: 7px
//             }
//           }
//         }
//       }

//       &::after{
//         content: "";
//         height: 1px;
//         background: #dbe1e8;
//         bottom: 0;
//         position: absolute;
//         left: 24px;
//         right: 24px;
//       }

//       li{
//         a{
//           padding: 8px 21px 9px;
//           display: block;
//           position: relative;
//           font-family: Mulish;
//           font-style: normal;
//           font-weight: 700;
//           font-size: 18px;
//           line-height: 152%;
//           color: #485768;
//           border-left: 3px solid transparent;

//           &:hover{
//             background: rgba(219,225,232,.25);
//           }

//           &.active{
//             border-left-color: #009de9;
//             background: rgba(219,225,232,.25);
//           }
//         }
//       }
//     }
//     .logout{
//       display: block;
//       text-align: center;
//       font-family: Mulish;
//       font-style: normal;
//       font-weight: 700;
//       font-size: 18px;
//       line-height: 152%;
//       color: #d92f0e;
//       width: -webkit-max-content;
//       width: max-content;
//       margin: 24px auto auto;
//       background: transparent!important;
//       outline: none;
//     }
//   }
//   .notification-popup{
//     .heading{
//       d
//     }
//   }
// `;

export const DashboardWrap = styled.div`
  background: #f8fbff;
  padding: 24px;
  letter-spacing: 0;
  // min-height: calc(100vh - 62px);
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
        &:last-child {
          border-radius: 0 0 10px 10px;
          tr {
            &:last-child {
              border-radius: 0 0 10px 10px;
              td {
                &:last-child {
                  border-radius: 0 0 10px 0;
                }
                &:first-child {
                  border-radius: 0 0 0 10px;
                }
              }
            }
          }
        }

        @media screen and (max-width: 767px) {
          overflow-x: auto;
        }

        & + .table-responsive {
          margin-top: 16px;
          border-radius: 0 0 10px 10px;
        }

        table {
          margin-bottom: 0;
          .dropdown-toggle {
            background: transparent url('${cdn(
              '/static/img/more-dots.svg',
            )}') no-repeat center !important;
            // background-size: 22px !important;
            opacity: 0.95;
            border: none !important;
            padding: 0;
            margin: 0;
            box-shadow: none !important;
            font-size: 0;
            width: 24px;
            height: 10px;
            transition:all 0.35s ease 0s;

            &:hover{
              opacity: 1
            }

            &::after {
              display: none;
            }
          }
          .dropdown-menu {
            background: #fff;
            border: 1px solid #c2c9d1;
            box-sizing: border-box;
            box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.16);
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
              &:last-child {
                border-bottom: none;
              }

              &.delete-item {
                color: #d92f0e;
              }
              &:before {
                background: rgba(219, 225, 232, 0.25);
                content: '';
                position: absolute;
                left: -8px;
                right: -8px;
                top: -1px;
                bottom: -1px;
                transition: all 0.35s ease 0s;
                z-index: -1;
                opacity: 0;
              }
              &:hover {
                // background: rgba(219, 225, 232, 0.25);
                &:before {
                  opacity: 1;
                }
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
              width: 100%;
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
                // width: 43%;
                // min-width: 43%;
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
                    max-width: 220px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
                // width: 43%;
                // min-width: 43%;
              }
            }
          }
        }
      }

      .record-not-found-wrap {
        box-shadow: 0px 8px 13px -3px #cfd8e2;
        padding: 50px 24px;
        background: #ffffff;
        text-align: center;
        border-radius: 0;
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        color: #485768;
        &:last-child {
          border-radius: 0 0 10px 10px;
        }
        + .table-responsive {
          margin-top: 16px;
        }
        p {
          margin-bottom: 0;
        }
        h4 {
          font-family: Mulish;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 28px;
          text-align: center;
          color: #485768;
          margin: 0;
        }
        img {
          margin-bottom: 14px;
          max-width: 210px;
        }
        .action-btn {
          display: inline-block;
          background: #4fbbef;
          font-size: 18px;
          line-height: 28px;
          font-family: Mulish;
          font-weight: 700;
          color: #1d242f;
          padding: 8px 15px;
          border: 2px solid #4fbbef;
          box-sizing: border-box;
          border-radius: 10px;
          transition: all 0.35s ease 0s;
          outline: none;
          box-shadow: none;
          text-align: center;
          text-decoration: none;
          width: 302px;
          max-width: 100%;
          margin-top: 12px;
          height: auto;
          svg {
            margin-right: 8px;
            position: relative;
            top: -1px;
          }
          path {
            vertical-align: middle;
            transition: all 0.35s ease 0s;
          }
          &:hover {
            text-decoration: none;
            color: #4fbbef;
            background: #fff;
            border-color: #4fbbef;
            path {
              stroke: #4fbbef;
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
      padding: 16px 15px 16px 50px;
      font-family: Mulish;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 153%;
      color: #fff;
      position: relative;
      text-decoration: none;
      box-shadow: none;
      display: flex;
      align-items: center;
      &:after {
        display: none;
      }
      .toggle-icon {
        margin-left: auto;
        transition: 0.2s all ease-in-out;
        position: relative;
        top: -2px;
      }

      &.collapsed {
        .toggle-icon {
          transform: rotate(180deg);
          position: relative;
          top: 4px;
        }
      }

      svg {
        position: absolute;
        left: 16px;
        top: 17px;
      }

      h3 {
        button {
          padding: 0;
          display: flex;
          align-items: center;
          font-family: Mulish;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          width: 100%;
          color: #fff;
          text-decoration: none;
          box-shadow: none !important;
          .toggle-icon {
            margin-left: auto;
            transition: 0.2s all ease-in-out;
          }
        }
      }
    }
  }
`;

export const DashboardProfile = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: #485768;
  margin: 0 0 21px;

  .profile-img {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    // background: #c4c4c4;
    background: #edf0f5;
    position: relative;
    z-index: 0;
    vertical-align: middle;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 76px;
      background: #f8fbff;
      border-radius: 100px;
      width: 64px;
      height: 64px;
      margin: auto;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: contain;
      object-position: center;
    }
    .profile-progress-bar {
      position: absolute;
      left: -8px;
      right: -8px;
      top: -8px;
      bottom: -10px;
      border-radius: 100px;
      background-image: url('${cdn('/static/img/profile-progress.svg')}');
      background-repeat: no-repeat;
      background-position: top center;
      background-size: contain;
      &.progress-25{background-image: url('${cdn(
        '/static/img/progress-25.svg',
      )}');}
      &.progress-50{background-image: url('${cdn(
        '/static/img/progress-50.svg',
      )}');}
      &.progress-75{background-image: url('${cdn(
        '/static/img/progress-75.svg',
      )}');}
      &.progress-100{background-image: url('${cdn(
        '/static/img/progress-100.svg',
      )}');}
    }
  }

  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #1d242f;
    position: relative;
    margin: 0 0 2px;
  }

  h4{
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: #1D242F;
    position: relative;
    margin: 0;
  }

  p {
    margin: 0 0 10px;

    span {
      color: #005e8b;
    }
  }
`;

export const ProfileImage = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background: #c4c4c4;
  position: relative;
  z-index: 0;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
    object-position: top center;
  }
  img:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 76px;
    background: #fff;
    border-radius: 100px;
    width: 64px;
    height: 64px;
    margin: auto;
    z-index: -1;
  }
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: #1d242f;
    position: relative;
    margin: 0;
  }
  h3 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #1d242f;
    position: relative;
    margin: 0 0 2px;
  }
`;

export const DashboardSection = styled.div`
  margin: 0 0 64px;
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
    margin: 0 0 16px;
  }
  h2 a {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 152%;
    color: #485768;
    float: right;
    transition: all 0.35s ease 0s;
    outline: none;
    text-decoration: none;
  }
  h2 a svg {
    margin-right: 8px;
    float: left;
  }
  h2 a svg path {
    vertical-align: middle;
    transition: all 0.35s ease 0s;
  }
  h2 a:hover svg path {
    stroke: #4fbbef;
  }
  h2 a:hover {
    color: #4fbbef;
  }
`;

export const Card = styled.div`
  margin: 0 0 16px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  background: #fff;
  :last-child {
    margin-bottom: 0;
  }
`;

export const CardHeader = styled.button`
  padding: 0;
  box-shadow: none;
  border: none;
  background: #005e8b;
  border-radius: 10px;
  h3 {
    margin: 0;
    border-radius: 10px;
  }
.btn-link {
  border: none;
  background: #005E8B;
  border-radius: 10px;
  display: block;
  width: 100%;
  text-align: left;
  padding: 16px 46px 16px 48px;
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 153%;
  color: #FFFFFF;
  position: relative;
  text-decoration:none;
  box-shadow: none;
  .btn-link svg {
    position: absolute;
    left: 16px;
    top: 18px;
  }
`;
export const ToggleIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 18px;
  line-height: 20px;
  transition: all 0.35s ease 0s;
  .toggle-icon img {
    vertical-align: middle;
    width: 24px;
  }
  .collapsed .toggle-icon {
    transform: rotate(180deg);
  }
`;

export const TableResponsive = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
`;

export const DashboardAccBody = styled.div`
  table {
    margin-bottom: 0;
    border-radius: 10px;
    th {
      border: none;
      border-bottom: 1px solid #a1aab4;
      vertical-align: middle;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px !important;
      line-height: 153%;
      color: #485768 !important;
      padding: 18px 16px;
      text-align: center;
    }
    td {
      border: none;
      border-bottom: 1px solid #a1aab4;
      vertical-align: middle;
      font-family: Mulish;
      font-style: normal;
      font-weight: normal;
      font-size: 24px !important;
      line-height: 153%;
      text-align: center;
      color: #485768 !important;
      padding: 16px;

      h3 {
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 153%;
        color: #1d242f;
        margin: 0 0 8px;
        span {
          color: #fba72a;
        }
        svg {
          vertical-align: middle;
          margin-right: 8px;
          position: relative;
          top: -2px;
        }
      }

      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        font-family: Mulish;
        font-weight: normal;
        font-size: 18px;
        line-height: 153%;
        display: flex;
        color: #485768;
        li {
          position: relative;
          padding-left: 17px;
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
            &:before {
              display: none;
            }
          }
          &:first-child {
            padding-left: 0;
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
    }
    tr {
      transition: all 0.2s ease 0s;
      background: transparent;
      &:hover {
        background: #abe4ff;
      }
      &:last-child {
        td {
          border-bottom: none;
        }
      }
      th {
        &:first-child {
          text-align: left;
        }
      }
      td {
        &:first-child {
          text-align: left;
        }
      }
    }

    .table-action {
      .dropdown-toggle {
        background: transparent !important;
        border: none !important;
        padding: 0;
        margin: 0;
        box-shadow: none !important;
        &:after {
          display: none;
        }
      }
    }
  }
`;

export const TblSearch = styled.div`
  position: relative;
  input {
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
    border: none;
    padding: 0;
    padding-left: 38px;
    margin: 0;
    outline: none;
    box-shadow: none;
    background: transparent;
  }
  i {
    display: inline-block;
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0;
    top: 2px;
    background: url(/img/search-icon.svg) no-repeat 50%;
  }
`;

export const DropdownToggle = styled.div`
  background: transparent !important;
  border: none !important;
  padding: 0;
  margin: 0;
  box-shadow: none !important;
  :after {
    display: none;
  }
`;

export const DropdownMenu = styled.div`
  background: #ffffff;
  border: 1px solid #c2c9d1;
  box-sizing: border-box;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  min-width: 343px;
  margin: 6px 0 0 0;
  padding: 0 8px;
  a {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 28px;
    color: #485768;
    padding: 6px 30px 6px 0;
    border-bottom: 1px solid #dbe1e8;
    position: relative;
    background: transparent;
  }
  a:last-child {
    border-bottom: none;
  }
  a svg {
    position: absolute;
    right: 0;
    top: 8px;
  }
  a.delete-item {
    color: #d92f0e;
  }
`;

export const DashboardCalendar = styled.div`
  background: #ffffff;
  box-shadow: 0px 8px 13px #cfd8e2;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  .calendar-head {
    background: rgba(219, 225, 232, 0.2);
    padding: 15px 24px;
    align-items: center;
    display: flex;
    h3 {
      margin: 0 16px 0 0;
      font-family: Mulish;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 153%;
      color: #1d242f;
    }
    .head-btn-grp {
      button {
        background: rgba(196, 196, 196, 0.4);
        border: none;
        width: 30px;
        height: 30px;
        line-height: 25px;
        border-radius: 30px;
        text-align: center;
        padding: 0;
        box-sizing: border-box;
        box-shadow: none;
        transition: all 0.35s ease 0s;
        margin-left: 16px;
        align-items: center;
        justify-content: center;
        display: inline-flex;
        &:first-child {
          margin-left: 0;
        }
        path {
          transition: all 0.35s ease 0s;
        }
        &:hover {
          background: #4fbbef;
          path {
            stroke: #fff;
          }
        }
      }
    }
  }
  .dashboard-calendar-body {
    padding: 10px 10px 10px 20px;
    ul {
      padding: 17px 10px 17px 49px;
      margin: 0;
      list-style-type: none;
      height: 560px;
      overflow-y: auto;
      ::-webkit-scrollbar {
        width: 10px;
        border-radius: 20px;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        box-shadow: none;
        background-color: #c4c4c4;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        cursor: pointer;
      }
      ::-webkit-scrollbar-track {
        box-shadow: none;
        border-radius: 20px;
        background: #fff;
        border: 1px solid #dbe1e8;
      }
      li {
        position: relative;
        height: 53px;
        border-top: 1px solid #a1aab4;
        width: 100%;
        align-items: flex-start;
        flex-direction: column;
        display: flex;
        &:last-child {
          height: auto;
        }
      }
    }
    .time-label {
      font-family: Mulish;
      font-style: normal;
      font-weight: 700;
      font-size: 13px;
      line-height: 153%;
      color: #485768;
      position: absolute;
      top: -10px;
      left: -49px;
    }
    .calendar-time-detail {
      padding: 4px 11px;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 153%;
      color: #fff;
      border-radius: 6px;
      display: flex;
      align-items: center;
      &.light-purple-bg {
        background: #caa8ff;
      }
      &.light-blue-bg {
        background: #009de9;
      }
      p {
        margin: 0;
      }
    }
  }
`;

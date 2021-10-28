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

export const AtsWrap = styled.div`
  background: #f8fbff;
  min-height: calc(100vh - 62px);
  padding: 24px;
  letter-spacing: 0;
  word-break: break-word;
  img {
    vertical-align: middle;
  }
`;

export const AtsTableBox = styled.div`
  box-shadow: 0 8px 13px -3px #cfd8e2;
  max-width: 920px;
  margin: auto;
  border-radius: 10px;
  background: #fff;
  // overflow: hidden;

  .record-not-found-wrap {
    text-align: center;
    border-radius: 0 0 10px 10px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #485768;
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
      vertical-align: middle;
    }
    .action-btn {
      display: inline-block;
      background: #4fbbef;
      font-size: 18px;
      line-height: 28px;
      font-family: Mulish;
      font-weight: 700;
      color: #1d242f;
      padding: 6px 15px;
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
`;

export const TableResponsive = styled.div`
  display: block;
  width: 100%;
  overflow: inherit;
  @media screen and (max-width: 767px) {
    overflow-x: auto;
  }
  table {
    margin-bottom: 0;
    border-collapse: collapse;
    border-radius: 10px;
    &.table {
      width: 100%;
      margin-bottom: 1rem;
      color: #212529;
      thead {
        tr {
          background: #fff !important;
          border-radius: 0;
          &:first-child {
            border-radius: 10px 10px 0 0;
          }
          th {
            &:first-child {
              border-radius: 10px 0 0 0;
            }
            &:last-child {
              border-radius: 0 10px 0 0;
            }
          }
        }
      }
      tr {
        transition: all 0.2s ease 0s;
        background: transparent;
        &:last-child {
          border-radius: 0 0 10px 10px;
          td {
            border-bottom: none;
            &:first-child {
              border-radius: 0 0 0 10px;
            }
            &:last-child {
              border-radius: 0 0 10px 0;
            }
          }
        }
        &.tr-link {
          cursor: pointer;
        }
        &:hover {
          background: #abe4ff;
        }
        &.bg-white {
          background: #fff;
          &:last-child {
            td {
              border-radius: 0 0 10px 10px;
            }
          }
        }
      }
      th {
        font-family: Mulish;
        font-style: normal;
        line-height: 153%;
        color: #485768 !important;
        text-align: center;
        font-weight: 600;
        font-size: 18px !important;
        padding: 18px 16px;
        border: none;
        border-bottom: 1px solid #a1aab4 !important;
        vertical-align: middle;
        &:first-child {
          text-align: left;
        }
      }
      td {
        font-weight: 400;
        font-size: 24px !important;
        padding: 16px;
        font-family: Mulish;
        font-style: normal;
        line-height: 153%;
        color: #485768 !important;
        border: none;
        border-bottom: 1px solid #a1aab4;
        vertical-align: middle;
        text-align: center;
        &:first-child {
          text-align: left;
        }
        h3 {
          font-family: Mulish;
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 153%;
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
              max-width: 220px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:before {
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
        .dropdown {
          position: relative;
          display: inline-block;
        }
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
        // .dropdown-menu {
        //   background: #fff;
        //   border: 1px solid #c2c9d1;
        //   box-sizing: border-box;
        //   box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.16);
        //   border-radius: 4px;
        //   min-width: 343px;
        //   margin: 6px 0 0;
        //   padding: 0 8px;
        //   right: -15px !important;
        //   left: auto !important;
        //   a,
        //   button {
        //     font-family: Mulish;
        //     font-style: normal;
        //     font-weight: 700;
        //     font-size: 14px;
        //     line-height: 28px;
        //     color: #485768;
        //     padding: 6px 30px 6px 0;
        //     border-bottom: 1px solid #dbe1e8;
        //     position: relative;
        //     background: transparent;
        //     transition: all 0.35s ease 0s;
        //     &.delete-item {
        //       color: #d92f0e;
        //     }
        //     &:hover {
        //       background: rgba(219, 225, 232, 0.25);
        //     }
        //     &:not(.delete-item) {
        //       &:hover {
        //         color: #009de9;
        //         svg {
        //           path {
        //             stroke: #009de9;
        //           }
        //         }
        //       }
        //     }
        //     &::before {
        //       content: '';
        //       position: absolute;
        //       left: -8px;
        //       right: -8px;
        //       top: 0;
        //       bottom: 0;
        //       background: transparent;
        //       z-index: -1;
        //       transition: all 0.35s ease 0s;
        //     }
        //     svg {
        //       position: absolute;
        //       right: 0;
        //       top: 8px;
        //       path {
        //         transition: all 0.35s ease 0s;
        //       }
        //     }
        //   }
        // }
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
      }
    }
  }
`;

export const TblSearch = styled.div`
  position: relative;
  i {
    display: inline-block;
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0;
    top: 2px;
    background:  url('${cdn('/static/img/search-icon.svg')}') no-repeat 50%;
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
    &::-webkit-input-placeholder{color:#485768;opacity:1;}
    &::-moz-placeholder{color:#485768;opacity:1;}
    &:-ms-input-placeholder{color:#485768;opacity:1;}
    &:-moz-placeholder{color:#485768;opacity:1;}
  }
`;

export const DropdownTableAction = styled.div`
  position: relative;
  .dropdown-menu show {
    position: absolute;
    transform: translate3d(-293px, 34px, 0px);
    top: 0px;
    left: 0px;
    will-change: transform;
    background: #fff;
    border: 1px solid #c2c9d1;
    box-sizing: border-box;
    box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    min-width: 343px;
    margin: 6px 0 0;
    padding: 0 8px;
    display: block;
  }
  .dropdown-toggle {
    background: transparent !important;
    border: none !important;
    padding: 0;
    margin: 0;
    box-shadow: none !important;
    white-space: nowrap;
  }
  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
`;

export const DropdownItem = styled.div`
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
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  text-decoration: none !important;
  .delete-item {
    color: #d92f0e;
    border-bottom: none;
  }
`;

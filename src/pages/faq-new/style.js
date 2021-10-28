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
`;

export const SecondaryWrapper = styled.div`
  .header-menus ul {
    padding-left: 0;
    margin-left: 0;
    list-style: none;
    margin-left: 40px;
    margin-bottom: 0;
  }
  .header-menus ul li:not(:last-child) {
    margin-right: 50px;
  }
  .header-menus ul li a {
    font-size: 16px;
    color: #1d1d1d;
    font-weight: 400;
    -webkit-text-stroke: 0.25px;
    text-decoration: none;
    padding: 20px 0;
  }
  .right-menus {
    margin-left: auto;
  }
  .header-menus ul li a.active {
    border-bottom: 2px solid #b78ff4;
    color: #b78ff4;
  }
`;

export const Label = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: #1d242f;
  margin: 0 0 5px;
  display: inline-block;
  .req-star {
    color: #ea0000;
  }
`;

export const BorderTitle = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 152%;
  color: #1d242f;
  margin: 8px 0 24px;
  padding-top: 24px;
  border-top: 1px solid #a1aab4;
`;

export const ProfileSectionWrap = styled.div`
  background: #f8fbff;
  padding: 24px;
  display: flex;
`;

export const ProfileLeftsideMenu = styled.div`
  box-shadow: 0px 8px 13px -3px #cfd8e2;
  border-radius: 10px;
  background: #fff;
  width: 375px;
  min-width: 375px;
  min-height: 300px;
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
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
  h2:before {
    content: '';
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 0;
    border-bottom: 1px solid #dbe1e8;
  }
  ul li a svg {
    position: absolute;
    right: 33px;
    top: 15px;
  }
  ul li.active a {
    color: #009de9;
    font-weight: bold;
    border-color: #009de9;
    background: rgba(219, 225, 232, 0.25);
  }
  ul li.active a svg path {
    stroke: #009de9;
  }
  ul li a:hover {
    background: rgba(219, 225, 232, 0.25);
  }
`;

export const ProfileRightPanel = styled.div`
  width: calc(100% - 375px);
  padding-left: 23px;
`;

export const ProfileBoxForm = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 30px #cfd8e2;
  border-radius: 10px;
  margin-top: 32px;
`;

export const ProfileBoxHead = styled.div`
  background: #005e8b;
  border-radius: 10px 10px 0px 0px;
  padding: 16px 24px;
  color: #fff;
  h2 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 153%;
    color: #ffffff;
    margin: 0;
  }
`;

export const BoxFormWrap = styled.div`
  width: 100%;
  padding: 24px;
  background: transparent;
  box-shadow: none;
  border-radius: 0 0 10px 10px;
  h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 152%;
    color: #1d242f;
  }
`;

export const UploadPicture = styled.div`
  border: 1px solid #dbe1e8;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 16px 18px;
  position: relative;
  margin: 0 0 32px;
`;

export const UploadPictureField = styled.div`
  background: rgba(196, 196, 196, 0.1);
  border: 1px dashed rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

export const PictureDelete = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 60px;
  height: 60px;
  background: #ed4a2a;
  border-radius: 0px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`;

export const Row = styled.div`
  margin-left: -25px;
  margin-right: -25px;
  [class^='col-'] {
    padding-left: 25px;
    padding-right: 25px;
  }
`;

export const FormGroup = styled.div`
  margin: 0 0 48px;
  margin-bottom: 40px;
  .form-control {
    background: transparent;
    color: #1D242F;
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
  .date-group {
    position: relative;
  }
  .mb-40{
    margin-bottom:40px !important;
}
.mt-8{
    margin-top:8px !important;
}
  date-group .form-control {
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
  select.form-control {
    -webkit-appearance: none;
    padding-right: 34px;
    background: url('${cdn('/static/img/select-down-bg.svg')}') no-repeat;
    background-position-x: calc(100% - 15px);
    background-position-y: center;
    background-size: 10px 6px;
  }
`;

export const ProfileBoxAction = styled.div`
  .action-btn {
    padding: 7px 47px;
    border: 2px solid #4fbbef;
    box-sizing: border-box;
    transition: all 0.35s ease 0s;
    box-shadow: none;
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

export const TableResponsive = styled.div`
  border-radius: 0 0 10px 10px;
  .table {
    margin: 0;
    border-radius: 0 0 10px 10px;
  }
  th {
    padding: 16px 10px;
    border: none;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px !important;
    line-height: 153%;
    color: #485768 !important;
  }
  td {
    padding: 20px 10px 16px;
    border: none;
    border-top: 1px solid #a1aab4;
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 24px !important;
    line-height: 153%;
    color: #485768 !important;
  }
  .table tr td:first-child,
  .table tr th:first-child {
    padding-left: 24px;
  }
  .table tr td:last-child,
  .table tr th:last-child {
    padding-right: 48px;
  }
  .table tr td h4 {
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 153%;
    color: #1d242f;
    margin: 0 0 8px;
  }
  .table tr td p {
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 153%;
    color: #485768;
    margin: 0;
  }
  .table tr {
    transition: all 0.2s ease 0s;
    background: transparent;
  }
  .table tr:hover {
    background: #abe4ff;
  }
`;

export const NotificationPopup = styled.div`
  padding: 20px;
  background: #fff;
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  position: absolute;
  right: 20px;
  top: calc(100% + 28px);
  width: 400px;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: 0.1s all ease-in-out;
  .showed {
    opacity: 1;
    visibility: visible;
  }
  .heading h3 {
    font: 700 16px 'Mulish';
    color: #1d242f;
    margin-bottom: 0;
  }
  .heading .close-popup img {
    width: 20px;
  }
`;

export const AllNotifications = styled.div`
  margin-top: 15px;
`;

export const NotificationOne = styled.div`
  background: rgba(219, 225, 232, 0.2);
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 15px;
  position: relative;
  :before {
    content: '';
    position: absolute;
    left: -13px;
    top: 50%;
    transform: translateY(-50%);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ed4a2a;
  }
  h4 {
    font-size: 13px;
    color: #0287c8;
    margin-bottom: 4px;
  }
  p {
    font-size: 13px;
    margin-bottom: 0;
  }
  .seeall {
    font: 700 13px 'Mulish';
    display: block;
    text-align: center;
    padding: 10px 0 5px;
    color: #005e8b !important;
  }
`;

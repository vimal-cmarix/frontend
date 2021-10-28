import styled from 'styled-components';
import { RadiusSmall } from '@assets/styles/radius';
import { typoTheme } from '@assets/styles/typo';
import { DEFAULT_FONT } from '@assets/styles/theme';
import {
  HeadingLarge,
  LabelMedium,
  LabelXXXSmall,
  LabelXSmall,
} from '@assets/styles/typography';
import {
  Haiti,
  GreyC4,
  PrimaryClean,
  White,
  Black,
  Red,
  GreyCF,
  Grey61,
  Grey50,
} from '@src/assets/styles/colors';
import { smscreen, xxsscreen } from '@assets/styles/medias';
import { cdn } from '@utils/general';

<script
    type="text/javascript"
    async=""
    src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
  />;

export const Label = styled.label`
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #1d242f;
  display: inline-block;
  margin: 0 0 5px;
  .req-star {
    color: #ea0000;
  }
`;

export const BoxFormSection = styled.div`
  padding: 0 0 50px;
  background: #f0f6ff;
  font-family: 'Mulish', sans-serif;
  overflow-x: hidden;
  position: relative;
  letter-spacing: 0;
  min-height: 100vh;
`;

export const BoxFormWrap = styled.div`
  width: 684px;
  margin: auto;
  max-width: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-family: 'Mulish', sans-serif;
  color: #1d242f;
  overflow: hidden;
  transition: all 0.4s ease-in-out;

  &.about_company.moved_left {
    transform: translateX(-100vw);
    max-height: calc(100vh - 200px);
  }

  &.health_and_wellness {
    position: absolute;
    left: 50%;
    top: 150px;
    -webkit-transform: translateX(100vw);
    transform: translateX(100vw);
    transition: all 0.4s ease-in-out;

    &.moved_left {
      transform: translateX(-50%);
      transition: all 0.4s ease-in-out;
    }

    .box-form-body {
      padding: 24px;
      min-height: 604px;

      .list_header {
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        padding-bottom: 24px;

        h3 {
          margin-bottom: 0;
          font-family: Mulish;
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 153%;
          text-align: center;
          color: #1d242f;
        }
        .list-save-btn {
          font-family: Mulish;
          font-style: normal;
          font-weight: 800;
          font-size: 18px;
          line-height: 153%;
          color: #005e8b;
          text-decoration: none;
          transition: all 0.35s ease 0s;
          background: transparent;
          border: none;
          padding: 0;
        }
        .head-back-btn {
          display: inline-block;
          vertical-align: middle;
          background: transparent;
          border: none;
          padding: 0;
          svg {
            &:not(:root) {
              overflow: hidden;
            }
          }
          path {
            vertical-align: middle;
            transition: all 0.35s ease 0s;
          }
          &:hover path {
            stroke: #4fbbef;
          }
        }
      }
      .benefit-search {
        padding: 0 8px;

        .search-field {
          padding: 15px 0;
          border-top: 1px solid #485768;
          position: relative;

          .searchicon {
            display: inline-block;
            width: 24px;
            height: 24px;
            position: absolute;
            left: 0;
            top: 17px;
            bottom: 0;
          }
          input {
            font-family: Mulish;
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 28px;
            color: #485768;
            border: none;
            padding: 0 0 0 38px;
            outline: none;
            box-shadow: none;
            height: auto;
          }
        }
      }
      button.regular_blue_text {
        border: none;
        padding: 0;
        background: transparent;
      }
      .regular_blue_text {
        font: 700 16px 'Mulish' !important;
      }
      .btb-text {
        color: #009de9 !important;
      }
      .list_body {
        padding: 0 8px;
      }
    }
  }
`;
export const Logo = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 50px 0;

  img {
    max-width: 150px;
    width: 100%;
    vertical-align: middle;
  }
`;

export const Row = styled.div`
  &:not(:last-child) {
    margin-bottom: 13px;
  }
  &.swimlanedropdown{
    .scroll-bar__container {
      max-height: 100px !important;
      overflow-y: auto !important;
      > div{
        padding:0 !important;
        overflow: auto !important;
      }
    }
  }
  &.checkhere{
    > label{
      max-width: max-content;
    }
  }
  ${props =>
    props.flex &&
    css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}
  ${props =>
    props.hide &&
    css`
      display: none;
    `}

  ${({ hasBorderTop }) =>
    hasBorderTop &&
    css`
      border-top: 1px solid #cfcdd6;
      padding-top: 15px;
      margin-top: -12px;
    `}

    &.select-combo-wrap {
      margin-bottom: 56px;
      letter-spacing: 0;
      .select-combo-inner {
       [class^="style__Label-"]{
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
        z-index: 1;
        letter-spacing: 0;
       }
       &.req-label{
          [class^="style__Label-"]{
            &:after {
              content: ' *';
              color: #ea0000;
              font-style: normal;
            }
          }
       }
       .select__control {
        height: 50px;
        padding: 8px 20px 8px;
        border: 1px solid #485768 !important;
        border-radius: 4px;
        margin-top: -8px;
        width: 100%;        
        padding-right: 34px;
        background-image: url('${cdn('/static/img/select-down-bg.svg')}');
        background-position-x: calc(100% - 15px);
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: 10px 6px;
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        color: #1d242f;
        font-family: 'Mulish';
        transition: all 0.35s ease 0s;
        &.select__control--is-focused{
          border-color: #4fbbef !important;
        }
        .select__value-container {
          padding:0;
        }
        .select__placeholder {
          color: #485768;
          font-family: Mulish;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 24px;
        }
        .select__indicators{
          display:none;
        }
      }
      .select__menu{
        background: #ffffff;
        box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.16);
        border-radius: 5px;
        font-size: 18px;
        font-family: 'Mulish';
        color: #485768;
        z-index: 9;
        padding: 0;
       
        > div{
          height:auto;
          padding: 0;
          max-height:278px;
          overflow-y: auto;
          &::-webkit-scrollbar{width:8px;border-radius:20px;}
          &::-webkit-scrollbar-thumb{border-radius:20px;box-shadow:none;background-color:#C4C4C4;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;cursor:pointer;}
          &::-webkit-scrollbar-track{box-shadow:none;border-radius:20px;background:#fff;border:1px solid #DBE1E8;}
          div{
            border-bottom:none;
            // background: transparent;
            font-family: Mulish;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 152%;
            color: #485768;
            padding: 16px;
            position:relative;
            &:before{
              content: "";
              position: absolute;
              right: 8px;
              left: 8px;
              bottom: 0;
              border-bottom:1px solid #485768;
            }
            &:hover{
              background: #F3F2F4;
            }
            &:last-child{
              border-bottom:none;
              &:before{
                display:none;
              }
            }
          }
        }        
      }
    }
  }
`;

export const BoxFormTitle = styled.div`
  text-align: center;
  font-size: 24px;
  line-height: 153%;
  font-weight: 700;
  color: #1d242f;
  padding: 32px 24px 24px;
  border-bottom: 1px solid #dbe1e8;
  border-radius: 10px 10px 0 0;
  position: relative;
  h2 {
    font-size: inherit;
    color: inherit;
    line-height: inherit;
    font-family: inherit;
    font-weight: inherit;
    margin: 0;
  }
`;

export const BoxFormBody = styled.div`
  padding: 24px;
  min-height: inherit;
`;

export const BoxFormAction = styled.div`
  padding: 24px;
  position: relative;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    left: 24px;
    right: 25px;
    top: 0;
    border-top: 1px solid #a1aab4;
  }

  .btn {
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
    height: auto;

    &:hover {
      color: #4fbbef;
      background: transparent;
    }

    & + .btn {
      margin-top: 24px;
    }
  }
  .btn-skip-now {
    width: auto;
    background: transparent;
    color: #005e8b;
    border-color: transparent;
    display: inline-block;
  }
`;

export const FormGroup = styled.div`
  margin: 0 0 56px;
  position: relative;
  .form-control {
    padding: 10px 20px;
    border: 1px solid #485768;
    border-radius: 4px;
    margin-top: -8px;
    width: 100%;
    background-color: white;
  }
  select.form-control {
    padding-right: 34px;
    background: url('${cdn('/static/img/select-down-bg.svg')}') no-repeat;
    background-position-x: calc(100% - 15px);
    background-position-y: center;
    background-size: 10px 6px;
  }
  :focus {
    border-color: #4fbbef;
  }
`;

export const CompanyBenefitsWrap = styled.div`
  padding-top: 24px;
  border-top: 1px solid #a1aab4;
  padding-bottom: 24px;
  .accordion {
    margin: 0 -25px;
  }
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
        }
      }

      &.collapsed{
        color: #1d242f;
        
        .toggle-icon{
          background: none;

          svg{
            display: block;
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

export const CompanyBenefitsDes = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: #1d242f;
  margin: 0 0 8px;
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
    background: #fff;

    svg {
      path {
        stroke: #4fbbef;
      }
    }
  }
`;

export const CompanyBenefitList = styled.div`
  margin: 0 -25px;
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

export const CardForm = styled.div`
  border: none;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
`;

export const Card = styled.div`
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  .card-header {
    padding: 0 24px;
    margin: 0;
    background: transparent;
    border: none;
  }
`;

export const ListBody = styled.div`
  padding: 0 8px;
`;

export const ListOne = styled.div`
  align-items: center;
  justify-content: space-between;
  position: relative;
  display: flex;
`;

export const InsideSelectList = styled.div`
  .list_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 24px;
    .head-back-btn {
      display: inline-block;
      vertical-align: middle;
      background: transparent;
      border: none;
      padding: 0;
      svg {
        &:not(:root) {
          overflow: hidden;
        }
      }
      path {
        vertical-align: middle;
        transition: all 0.35s ease 0s;
      }
      &:hover path {
        stroke: #4fbbef;
      }
    }
  }
  .list_header h3 {
    margin-bottom: 0;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 153%;
    text-align: center;
    color: #1d242f;
  }

  a.list-save-btn {
    font-family: Mulish;
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 153%;
    color: #005e8b;
    text-decoration: none;
    transition: all 0.35s ease 0s;
  }
  a.list-save-btn:hover {
    color: #4fbbef;
  }
  .benefit-search {
    padding: 0 8px;
  }
  .search-field {
    padding: 15px 0;
    border-top: 1px solid #485768;
    position: relative;
  }
`;

export const HeadBackBtn = styled.div`
  display: inline-block;
  vertical-align: middle;
  background: transparent;
  border: none;
  padding: 0;

  &hover path {
    stroke: #4fbbef;
  }
`;

export const BenefitSearch = styled.div`
  padding: 0 8px;
  .search-field {
    padding: 15px 0;
    border-top: 1px solid #485768;
    position:relative;
  }
  .search-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0;
    top: 17px;
    bottom: 0;
    background: url('${cdn('/static/img/search-icon.svg')}') no-repeat center;
  }
  .form-control{
    font-family: Mulish;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #485768;
    border: none;
    padding: 0 0 0 38px;
    outline: none;
    box-shadow: none;
    height: auto;
    background: url('${cdn('/static/img/select-down-bg.svg')}') no-repeat;
  }
`;

export const AddedList = styled.div`
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    li {
      padding: 16px 30px 16px 0;
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

export const DeleteItem = styled.div`
  position: absolute;
  right: 0;
  top: 15px;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  img {
    width: 24px;
    vertical-align: middle;
  }
`;

export const AddBenefitsOBtn = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 152%;
  color: #485768;
  text-decoration: none;
  position: relative;
  padding: 0 0 0 35px;
  margin-top: 5px;
  margin-bottom: 28px;
  display: inline-block;
  transition: all 0.35s ease 0s;
  outline: none;
  cursor: pointer;
  border: none;
  background: transparent;
  svg {
    position: absolute;
    left: 0;
    top: -2px;
  }

  path {
    vertical-align: middle;
    transition: all 0.35s ease 0s;
  }

  :hover path {
    stroke: #4fbbef;
  }

  :hover {
    color: #4fbbef;
  }
`;

export const ListSaveBtn = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 153%;
  color: #005e8b;
  text-decoration: none;
  transition: all 0.35s ease 0s;
`;

export const CustomSelect = styled.div`
  margin-bottom: 56px;

  & > div {
    & > span {
      display: inline-block;
      margin-bottom: 0;
      background-color: #fff;
      margin-left: 20px;
      padding: 0 2px;
      position: relative;
      z-index: 1;
      font-family: Mulish;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #1d242f;
      letter-spacing: 0;
    }
  }

  .select__menu{
    background: #ffffff;
    box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    font-size: 18px;
    font-family: 'Mulish';
    color: #485768;
    z-index: 9;
    padding: 0;
   
    > div{
      height:auto;
      padding: 0;
      max-height:278px;
      overflow-y: auto;
      &::-webkit-scrollbar{width:8px;border-radius:20px;}
      &::-webkit-scrollbar-thumb{border-radius:20px;box-shadow:none;background-color:#C4C4C4;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;cursor:pointer;}
      &::-webkit-scrollbar-track{box-shadow:none;border-radius:20px;background:#fff;border:1px solid #DBE1E8;}
      div{
        border-bottom:none;
        // background: transparent;
        font-family: Mulish;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 152%;
        color: #485768;
        padding: 16px;
        position:relative;
        &:before{
          content: "";
          position: absolute;
          right: 8px;
          left: 8px;
          bottom: 0;
          border-bottom:1px solid #485768;
        }
        &:hover{
          background: #F3F2F4;
        }
        &:last-child{
          border-bottom:none;
          &:before{
            display:none;
          }
        }
      }
    }        
  }

  .select__control {
    padding: 8px 20px 8px;
    border: 1px solid #485768 !important;
    border-radius: 4px;
    margin-top: -8px;
    width: 100%;
    height: auto;
    padding-right: 34px;
    background: url('${cdn('/static/img/select-down-bg.svg')}') no-repeat;
    background-position-x: calc(100% - 15px);
    background-position-y: center;
    background-size: 10px 6px;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    color: #1d242f;
    font-family: 'Mulish';

    .select__placeholder {
      color: #485768;
      font-weight: 600;
      font-family: 'Mulish';
    }

    div {
      padding: 0;
    }
  }
  .select__indicators {
    display: none;
  }
`;

export const ListCheckboxOne = styled.div`
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  position: relative;
  display: -webkit-flex;
  display: flex;
`;

export const ListCheckboxOneInput = styled.input`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  opacity: 0;
  z-index: 9;
  cursor: pointer;

  &:checked + label::after{
    content: "";
    position: absolute;
    top: 0;
    right: -8px;
    left: -8px;
    bottom: -1px;
    background: #dbe1e8;
    z-index: -1;
  }

  &:checked + label::before{
    border: none;
    background: url('${cdn('/static/img/check-square.svg')}') no-repeat 50%;
  }

`;

export const ListCheckboxOneLabel = styled.label`
  position: relative;
  margin-bottom: 0;
  width: 100%;
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 152%;
  color: #485768;
  cursor: pointer;
  padding: 15px 30px 15px 8px;
  transition: all .2s ease 0s;
  z-index: 1;
  border-top: 1px solid #485768;

  &::before{
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: url('${cdn('/static/img/check-box.svg')}') no-repeat 50%;
    box-sizing: border-box;
    border-radius: 3px;
    transition: all .2s ease 0s;
    cursor: pointer;
  }
`;

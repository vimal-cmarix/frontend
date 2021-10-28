import styled from 'styled-components';
import { typoTheme } from '@assets/styles/typo';
//import { DEFAULT_FONT } from '@assets/styles/theme';
import { darken } from 'polished';
import { cdn } from '@utils/general';

export const Container = styled.div`
  max-width: 1160px;
`;

export const Label = styled.span`
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
export const MainPageDivision = styled.div`
  background: #f0f6ff;
  min-height: 100vh;
  letter-spacing: 0;
  img {
    vertical-align: middle;
  }
`;

export const PageHeader = styled.div`
  padding: 40px 118px 40px 100px;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
  position: relative;
  display: -webkit-flex;
  display: flex;
  .sizigi-header-logo a {
    display: inline-block;
    img {
      max-width: 130px;
    }
  }
  .sizigi-header-nav {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #1d242f;
    line-height: 153%;
    align-items: center;
    margin-left: auto;
    min-height: 43px;
    display: flex;
    a {
      line-height: 24px;
      margin-left: 30px;
      text-decoration: none;
      outline: none;
      transition: all 0.25s ease 0s;
      position: relative;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: #1d242f;
      &:hover {
        color: #009de9;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -5px;
        margin: auto;
        width: 0;
        opacity: 0;
        height: 2px;
        border-radius: 20px;
        transition: all 0.35s ease 0s;
        background: #009de9;
      }
      &.active {
        :before {
          width: 100%;
          opacity: 1;
        }
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

export const FormLeftBar = styled.div`
  background: #fff;
  padding: 40px 24px 60px;
  margin-top: -125px;
  position: relative;
  z-index: 999;
  max-width: 472px;
  width: 100%;
  min-height: 100vh;
  .logo {
    margin-bottom: 60px;
    a {
      display: inline-block;
      img {
        max-width: 130px;
      }
    }
  }
  h2 {
    font: 700 32px/1.5 'Mulish';
    margin: 0;
    color: #1d242f;
  }
  .vector-img {
    position: absolute;
    bottom: 40px;
    left: 45%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
`;

export const FormLeftBarP = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 153%;
  color: #1d242f;
  text-align: right;
  margin: 16px 0;
`;

export const BoxWrapOuter = styled.div`
  width: calc(100% - 472px);
  padding: 0 0 50px;
  font-family: 'Mulish', sans-serif;
`;

export const BoxFormSection = styled.div`
  display: flex;
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
  min-height: 604px;
`;

export const PasswordNote = styled.p`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #1d242f;
  margin: 0 0 48px;
`;

export const FormGroup = styled.div`
  margin: 0 0 16px;
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
  }
  [class^='style__ArrowContainer-'] {
    display: none;
  }
`;

export const Notreceived = styled.div`
  cursor: pointer;
  display: block;
  width: -webkit-max-content;
  width: max-content;
  margin-left: auto;
  text-align: right;
  color: #009de9;
  font-weight: 700;
  font-size: 16px;
  outline: none;
  transition: all 0.35s ease 0s;
  line-height: 1.5;
  &:hover {
    color: #1d242f;
  }
`;

export const ConfirmMail = styled.div`
  a {
    text-decoration: none;
  }
  .header {
    text-align: center;
    padding: 25px 20px;
    border-bottom: 1px solid #dbe1e8;
    line-height: 1.5;
    h3 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 15px;
      line-height: 1.2;
    }
    p {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    a {
      color: #009de9;
      font-size: 16px;
      transition:all 0.35s ease 0s;
      &:hover{
        color: #1d242f;
      }
    }
  }
  .verify_mail {
    padding: 60px 20px 20px;
    #confirmed{
      :-webkit-outer-spin-button{-webkit-appearance: none;}
      ::-webkit-inner-spin-button{-webkit-appearance: none;}
    }
    .agreements {
      margin: 80px 0 20px;
      .list_one {
        position: relative;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        &:checked + label::before {
          border: none;
          background: url('${cdn(
            '/static/img/check-square.svg',
          )}') no-repeat center;
        }
      }
    }
  }
  .btn {
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
    box-shadow: none;
    text-align: center;
    text-decoration: none;
    outline: none;
    display: block;
    cursor: pointer;
    &:hover {
      color: #4fbbef;
      background: #fff;
      border-color: #4fbbef;
    }
    &.disabled,
    &[disabled] {
      background: #c2c9d1;
      border-color: #c2c9d1;
      color: #485768;
      opacity: 1;
      cursor: not-allowed;
    }
  }
`;

export const Label1 = styled.label`
  position: relative;
  margin-bottom: 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 152%;
  color: #485768;
  cursor: pointer;
  padding: 10px 8px 10px 34px;
  display: inline-block;
  transition: all .2s ease 0s;
  z-index: 1;
  a {
    color: #009de9;
    font-weight: 600;
    transition: all .35s ease 0s;
    &:hover{
      color:#1d242f;
    }
  }
  :before {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background: url('${cdn('/static/img/check-box.svg')}') no-repeat center;
    box-sizing: border-box;
    border-radius: 3px;
    transition: all .2s ease 0s;
    cursor: pointer;
  }
  :after {
    border: none;
    background: url('${cdn('/static/img/check-square.svg')}') no-repeat center;
  }
`;

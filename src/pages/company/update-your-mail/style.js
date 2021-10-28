import styled from 'styled-components';
import { darken } from 'polished';
import { cdn } from '@src/utils/general';

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

export const BoxWrapOuter = styled.div``;

export const BoxFormSection = styled.div`
  display: block;
`;
export const BoxFormWrap = styled.div`
  width: 684px;
  margin: auto;
  max-width: 100%;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-family: 'Mulish', sans-serif;
  color: #1d242f;
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
  min-height: 233px;
`;

export const BoxFormAction = styled.div`
  padding: 24px;
  position: relative;
  border-radius: 0 0 10px 10px;
  &:before {
    content: '';
    position: absolute;
    left: 24px;
    right: 25px;
    top: 0;
    border-top: 1px solid #a1aab4;
  }
  .btn {
    background: #4fbbef;
    color: #000;
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
    height: auto;
    &:hover {
      color: #4fbbef;
      background: #fff;
      border-color: #4fbbef;
    }
  }
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
  margin: 0 0 56px;
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
  }
  &.mb-8 {
    margin-bottom: 8px;
  }
  &.mt-24 {
    margin-top: 24px;
  }
  [class^='style__ArrowContainer-'] {
    display: none;
  }
`;

export const UpdateEmilNote = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #1d242f;
  margin: 0 0 24px;
`;

export const ConfirmMail = styled.p`
  a {
    text-decoration: none;
  }
  .header {
    text-align: center;
    padding: 25px 20px;
    border-bottom: 1px solid #dbe1e8;
  }
  .header h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 15px;
  }
  .header p {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .header a {
    color: #009de9;
    font-size: 16px;
  }
  form.verify_mail {
    padding: 45px 25px 20px;
  }
  form.verify_mail #confirmed::-webkit-outer-spin-button,
  form.verify_mail #confirmed::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  form.verify_mail .form-group {
    margin-bottom: 14px;
  }
  form.verify_mail .form-control{
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
  form.verify_mail .notreceived {
    display: block;
    width: max-content;
    margin-left: auto;
    text-align: right;
    color: #009de9;
    font-weight: 700;
    font-size: 16px;
  }
  form.verify_mail .agreements {
    margin: 80px 0 20px;
  }
  form.verify_mail .agreements input {
    position: absolute;
    top: 21px;
    left: 5px;
    opacity: 0;
  }
  form.verify_mail .agreements .list_one {
    position: relative;
  }

  form.verify_mail .agreements input:checked + label::before {
    border: none;
    background: url('${cdn('/static/img/check-square.svg')}') no-repeat center;
  }
  button.action-btn.disabled {
    background: #c2c9d1;
    border-color: #c2c9d1;
    color: #485768;
    opacity: 1;
    cursor: not-allowed;
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
    height:auto;
  }
  .btn:hover:not(:active) {
    background-color: white;
  }
`;

import styled from 'styled-components';
import { darken } from 'polished';
import { cdn } from '@utils/general';

export const BoxFormSection = styled.div`
  padding: 80px 0;
  background: #f0f6ff;
  font-family: 'Mulish', sans-serif;
`;

export const Container = styled.div`
  max-width: 1160px;
`;

export const Label = styled.span`
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: #1d242f;
  margin: 0 0 5px;
  span {
    color: #ea0000;
  }
`;

export const BoxFormWrap = styled.div`
  width: 684px;
  margin: auto;
  max-width: 100%;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  -webkit-border-radius: 10px;
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
  -webkit-border-radius: 10px 10px 0 0;
  border-radius: 10px 10px 0 0;
  position: relative;
`;

export const BoxFormBody = styled.div`
  padding: 24px;
  min-height: 604px;
`;

export const BoxFormAction = styled.div`
  padding: 24px;
  position: relative;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
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
    color: #485768;
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
  }
`;

export const FormGroupMb8 = styled.div`
  margin-bottom: 8px !important;
  .form-control {
    background: transparent;
    color: #485768;
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
  }
`;

export const ForgotPasswordLink = styled.p`
  font-weight: 600;
`;

export const AuthenticateMain = styled.div`
  text-align: center;
  padding: 20px 25px;
  .verify-mail {
    margin: 30px 0 22px;
  }
  .verify-mail h4 {
    font-size: 18px;
    font-weight: 700;
  }
  .verify-mail p {
    font-size: 18px;
    line-height: 1.7;
  }
  .verify-mail p span {
    font-weight: 600;
  }
  .change-resend {
    margin-bottom: 55px;
  }
  .change-resend p {
    margin-bottom: 12px;
  }
  .change-resend p,
  .change-resend a {
    font-size: 16px;
  }
  .change-resend a {
    color: #009de9;
    text-decoration: none;
  }
  .change-resend .small {
    display: block;
    margin: 0 0 12px;
    font-size: 14px;
    color: #c2c9d1;
    position: relative;
  }
  .change-resend .small::before {
    content: '';
    position: absolute;
    width: 113px;
    height: 1px;
    background: #c2c9d1;
    left: calc(50% + 15px);
    top: 50%;
    opacity: 0.7;
  }
  .change-resend .small::after {
    content: '';
    position: absolute;
    width: 113px;
    height: 1px;
    background: #c2c9d1;
    right: calc(50% + 15px);
    top: 50%;
    opacity: 0.7;
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
  }
`;

export const Label1 = styled.div`
  position: relative;
  margin-bottom: 0;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  line-height: 152%;
  color: #485768;
  cursor: pointer;
  padding: 10px 8px 10px 34px;
  transition: all 0.2s ease 0s;
  z-index: 1;
  a {
    color: #009de9;
    font-weight: 600;
  }
  :before {
    content: '';
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
    transition: all 0.2s ease 0s;
    cursor: pointer;
  }
  :before {
    border: none;
    background: url('${cdn('/static/img/check-square.svg')}') no-repeat center;
  }
`;

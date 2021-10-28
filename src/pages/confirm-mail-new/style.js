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
    background: url('${cdn('/static/img/check-squnare.svg')}') no-repeat center;
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

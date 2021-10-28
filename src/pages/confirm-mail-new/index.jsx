import React from 'react';
import Link from 'next/link';
import {
  Label,
  Label1,
  BoxFormSection,
  BoxFormWrap,
  BoxFormBody,
  ConfirmMail,
  BoxFormTitle,
  BoxFormAction,
  PasswordNote,
  FormGroup,
  FormGroupMb8,
  ForgotPasswordLink,
} from './style';

const confirmMail = () => {
  return (
    <BoxFormSection>
      {/* Reset password */}
      <div className="container">
        <BoxFormWrap>
          <ConfirmMail>
            <div className="header">
              <h3>Confirm your email</h3>
              <p>We sent a code to [email address]</p>
              <a href="/">Not my email address</a>
            </div>
            <form className="verify_mail">
              <div className="form-group">
                <Label>Verify code</Label>
                <input
                  placeholder="Enter Code"
                  id="confirmed"
                  className="form-control"
                  type="number"
                />
              </div>
              <a className="notreceived" href="/">
                Didnt receive a code?
              </a>
              <div className="agreements">
                <div className="list_one">
                  <input id="send-job" type="checkbox" className="checkbox" />
                  <Label1 htmlFor="send-job">
                    Send me relevant job opportunities and career-related
                    updates.
                  </Label1>
                </div>
                <div className="list_one">
                  <input id="agree" type="checkbox" className="checkbox" />
                  <Label1 htmlFor="agree">
                    I have read and agree to <a href="/"> Terms of Use </a> and{' '}
                    <a href="/"> Privacy Policy </a>.
                  </Label1>
                </div>
              </div>
              <Link href="/AboutCompany">
                <button type="submit" className="disabled btn action-btn">
                  Verify
                </button>
              </Link>
            </form>
          </ConfirmMail>
        </BoxFormWrap>
      </div>
    </BoxFormSection>
  );
};

export default confirmMail;

import React from 'react';
import Link from 'next/link';
import { cdn } from '@utils/general';
// import handsMail from '@src/assets/images/Hands-Mail.svg';
import {
  AuthenticateMain,
  // Label,
  // Label1,
  BoxFormSection,
  BoxFormWrap,
  // BoxFormBody,
  // BoxFormTitle,
  // BoxFormAction,
  // PasswordNote,
  // FormGroup,
  // FormGroupMb8,
  // ForgotPasswordLink,
} from './style';

const Authentication = () => {
  return (
    <BoxFormSection>
      {/* Reset password */}
      <div className="container">
        <BoxFormWrap>
          <AuthenticateMain>
            <img
              src={cdn('/static/img/images/Hands-Mail.svg')}
              alt="handMail"
              className="topImg"
            />
            {/* <img className="topImg" src={handsMail} alt="handMail" /> */}
            <div className="verify-mail">
              <h4>Verify your email to continue</h4>
              <p>
                We sent a confirmation email to <br />{' '}
                <span>[email entered]</span>
              </p>
            </div>
            <div className="change-resend">
              <p>
                You can <a href="/">change your email address.</a>
              </p>
              <span className="small">or</span>
              <a href="/">resend confirmation email</a>
            </div>
            <Link href="/ConfirmMail">
              <button type="submit" className="btn action-btn">
                Continue
              </button>
            </Link>
          </AuthenticateMain>
        </BoxFormWrap>
      </div>
    </BoxFormSection>
  );
};

export default Authentication;

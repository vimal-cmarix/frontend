import React from 'react';
import Link from 'next/link';
import { cdn } from '@utils/general';
// import GoogleIcon from '@src/assets/images/google.svg';
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
  TopalignedAdvertisedJobs,
  // Resend,
} from './style';

const Authentication = () => {
  return (
    <BoxFormSection>
      {/* Reset password */}

      <div className="container">
        <TopalignedAdvertisedJobs>
          <div className="job_one">
            <div className="head">
              <img
                src={cdn('/static/img/images/google.svg')}
                alt="googleicon"
              />
              {/* <img src={GoogleIcon} alt="googleicon" /> */}
              <div className="job_info">
                <h3>Position Title</h3>
                <span>Location</span>
                <span>Type</span>
              </div>
            </div>
            <div className="description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque purus, sed nec tempor. Pellentesque urna, erat
                posuere nunc interdum bibendum fames eget diam. Nulla in eu nec,
                vivamus scelerisque urna.
              </p>
            </div>
          </div>
        </TopalignedAdvertisedJobs>
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

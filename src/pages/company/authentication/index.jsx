import React, { useContext, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
// import handsMail from '@src/assets/images/Hands-Mail.svg';
import { useToast } from '@components/molecules/Notification';
// import Btn from '@components/molecules/Btn';
import { cdn } from '@utils/general';
import cookie from 'js-cookie';
import SignService from '@api/services/sign';
import errorHandle from '@src/utils/error';
import { useTranslation } from 'react-i18next';
// import { withAuthSync } from '@src/utils/auth';
import Page from '@components/templates/Page';
import AuthHeaderB2B from '@components/organisms/authheaderB2B';
import {
  AuthenticateMain,
  BoxFormSection,
  BoxFormWrap,
  Resend,
  MainPageDivision,
} from './style';

const Authentication = () => {
  const { t } = useTranslation('signup');
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const userId = cookie.get(`${process.env.PROJECT_NAME}-userId`);
  const [email, setEmail] = useState('');
  const componentDidMount = fun => useEffect(fun, []);
  componentDidMount(() => {
    // emailId = localStorage.getItem('data');
    const userdetails = JSON.parse(localStorage.getItem('userDetail'));
    setEmail(userdetails.email);
    console.log('userDetail', userdetails);
  });
  async function resendCode() {
    try {
      SignService.readCredentials();
      const response = await SignService.unauthorizeResendCodeNew(userId);
      if (response.status === 200) {
        toast.add(t('Code has been resent successfully'), 'success');
      }
    } catch (e) {
      showToast(errorHandle(e));
    }
  }

  const authContent = () => (
    <>
      <MainPageDivision>
        <AuthHeaderB2B />
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
                    We sent a confirmation email to <br /> <span>{email}</span>
                  </p>
                  <div className="verify-note">
                    Please check your spam folder for verification email
                    <br /> if you haven&apos;t received email in your inbox.
                  </div>
                </div>
                <div className="change-resend">
                  <p>
                    You can{' '}
                    <Link href="/company/update-your-mail">
                      change your email address.
                    </Link>
                  </p>
                  <span className="small">or</span>
                  {/* <a href="/" onClick="resendCode()">
                resend confirmation email
              </a> */}
                  <Link href="resent-mail-confirm">
                    <Resend onClick={() => resendCode()}>
                      {/* <a href="/company/authentication"> */}
                      resend confirmation email
                      {/* </a> */}
                    </Resend>
                  </Link>
                </div>
                <Link href="/company/confirm-mail">
                  <button type="submit" className="btn action-btn">
                    Continue
                  </button>
                </Link>
              </AuthenticateMain>
            </BoxFormWrap>
          </div>
        </BoxFormSection>
      </MainPageDivision>
    </>
  );

  const content = authContent();

  return (
    <Page
      title="Sign In"
      description="Sign In Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default Authentication;

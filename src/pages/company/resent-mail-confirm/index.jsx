import React, { useContext, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
// import handsMail from '@src/assets/images/Hands-Mail.svg';
import { useToast } from '@components/molecules/Notification';
import cookie from 'js-cookie';
import SignService from '@api/services/sign';
import errorHandle from '@src/utils/error';
import { useTranslation } from 'react-i18next';
import { cdn } from '@utils/general';
import Page from '@components/templates/Page';
import {
  AuthenticateMain,
  BoxFormSection,
  BoxFormWrap,
  MainPageDivision,
  PageHeader,
} from './style';

const Authentication = () => {
  const { t } = useTranslation('signup');
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const userId = cookie.get(`${process.env.PROJECT_NAME}-userId`);
  let emailId = '';
  const [email, setEmail] = useState('');
  const componentDidMount = fun => useEffect(fun, []);
  componentDidMount(() => {
    emailId = localStorage.getItem('data');
    console.log('email', emailId);

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

  const resentcontex = () => (
    <>
      <MainPageDivision>
        <PageHeader>
          <div className="sizigi-header-logo">
            <Link href="/">
              <img src={cdn('/static/img/sizigi-full-logo.svg')} alt="logo" />
            </Link>
          </div>
          <div className="sizigi-header-nav">
            <a href="/search-jobs">Search Jobs</a>
            <a href="/postajob">For employers</a>
            <a href="/login" className="active">
              Log In{' '}
            </a>
            <a href="/postajob-btc">Sign up</a>
          </div>
        </PageHeader>

        <BoxFormSection>
          {/* Reset password */}
          <div className="container">
            <BoxFormWrap>
              <AuthenticateMain>
                {/* <img className="topImg" src={handsMail} alt="handMail" /> */}
                <img
                  src={cdn('/static/img/images/Hands-Mail.svg')}
                  alt="Hands-Mail"
                />
                <div className="verify-mail">
                  <h4>Resent!</h4>
                  <p>
                    We have resent a confirmation email to <br />{' '}
                    <span>{email}</span>
                  </p>
                </div>
                {/* <div className="change-resend">
                <p>[email entered]</p>
              </div> */}
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

  const content = resentcontex();

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

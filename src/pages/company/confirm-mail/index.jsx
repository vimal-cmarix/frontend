import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import errorHandle from '@src/utils/error';
import { login } from '@src/utils/auth';
// import CodeVerification from '@components/organisms/CodeVerification';
import { useToast } from '@components/molecules/Notification';
// import Btn from '@components/molecules/Btn';
import cookie from 'js-cookie';
import { cdn } from '@utils/general';
import Link from 'next/link';
import { Form } from '@unform/web';
import TextInput from '@components/molecules/TextInput';
import { useRouter } from 'next/router';
import Page from '@components/templates/Page';
import { Typography } from '@assets/styles/typo';
import SignService from '@api/services/sign';
import AuthHeaderB2B from '@components/organisms/authheaderB2B';

import {
  Label,
  Label1,
  BoxFormSection,
  BoxFormWrap,
  ConfirmMail,
  PageHeader,
  MainPageDivision,
  FormLeftBar,
  FormLeftBarP,
  FormGroup,
  BoxWrapOuter,
  Notreceived,
  // BoxFormBody,
  // BoxFormTitle,
  // BoxFormAction,
  // PasswordNote,
  // FormGroup,
  // FormGroupMb8,
  // ForgotPasswordLink,
} from './style';

const confirmMail = ({ onSkip, onSuccess, source, modal, data, success }) => {
  const { t } = useTranslation('signup');
  const router = useRouter();
  const formRef = useRef(null);
  const [codeLoading, setCodeLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [showCheck, setShowCheck] = useState(false);
  const toast = useToast();
  const [email, setEmail] = useState('');
  const showToast = msg => toast.add(msg, 'error');
  let userId = cookie.get(`${process.env.PROJECT_NAME}-userId`);

  useEffect(() => {
    if (data && data.first_name) {
      const conversionObject = {
        debug: 'false',
        parameters: {
          firstname: data.first_name,
          lastname: data.last_name,
          fullname: `${data.first_name} ${data.last_name}`,
          email: data.email,
          phone: data.phone || '',
        },
      };
      if (rrSpace && rrSpace.executeEvent) {
        rrSpace.executeEvent('conversion', conversionObject);
      }
    }
    const userdetails = JSON.parse(localStorage.getItem('userDetail'));
    setEmail(userdetails.email || '');
    // console.log('userDetail', userdetails);
  }, [data]);

  function getCheckValue(value) {
    //console.log('val', value);
    if (value) {
      setShowCheck(false);
    } else {
      setShowCheck(true);
    }
  }

  async function resendCode() {
    try {
      SignService.readCredentials();
      const userDetail = JSON.parse(localStorage.getItem('userDetail'));
      if (userId === undefined) {
        userId = userDetail.id;
      }
      console.log('userid', userId);
      const response = await SignService.unauthorizeResendCode(userId);
      if (response.status === 200) {
        toast.add(t('Code has been resent successfully'), 'success');
      }
    } catch (e) {
      showToast(errorHandle(e));
    }
  }

  async function resendCodeDom() {
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

  function validateCode(e) {
    //value = e.target.value;
    console.log('value', e.target.value, userId);
    if (e.target.value?.length < 6) return;
    setCode(e.target.value);
  }

  // function skipCode() {
  //   onSkip();
  // }

  async function codeSubmit(datas) {
    //console.log('code', code, datas);
    setCode(datas.confirm_code);
    //code = datas.confirm_code;
    if (!code) {
      //console.log('code', code);
      // showToast('The code must be longer than 6 digits');
      showToast('Please enter a code first');
      return;
    }

    setCodeLoading(true);
    try {
      SignService.readCredentials();
      const userDetail = JSON.parse(localStorage.getItem('userDetail'));
      const companyProfile = JSON.parse(localStorage.getItem('companyProfile'));
      if (userId === undefined) {
        userId = userDetail.id;
      }
      console.log('userid', userId);
      //router.push('/company/dashboard');
      const response = await SignService.unauthorizeCodeConfirmNew(
        code,
        userId,
      );

      //if (response.status === 201) {
      if (response.data.accessToken) {
        const { accessToken } = response.data;
        login(accessToken, false, async () => {
          setCodeLoading(false);
          const contact = {
            firstname: userDetail.firstName,
            lastname: userDetail.lastName,
            email: userDetail.email,
            phoneNo: '',
            company: companyProfile.companyName,
            message: '',
          };
          SignService.addContact(contact);
          toast.add(t('Account verified successfully'), 'success');
          setTimeout(async () => {
            onSuccess();
            localStorage.setItem('success', true);
            if (response.data.accessToken) {
              router.push('/company/about');
            }
            //router.push('/profile-personal-info-new');
          }, 100);
        });
      }
    } catch (e) {
      showToast(errorHandle(e));
      setCodeLoading(false);
    }
  }

  const confirmMailpage = () => (
    <>
      <MainPageDivision>
        <AuthHeaderB2B />
        <BoxFormSection>
          <FormLeftBar>
            <div className="logo">
              {/* <Link href="/"> */}
              <img src={cdn('/static/img/sizigi-full-logo.svg')} alt="logo" />
              {/* </Link> */}
            </div>
            <h2>The job of your dreams</h2>
            <FormLeftBarP>is just a click a way...</FormLeftBarP>
            <img
              className="vector-img"
              src={cdn('/static/img/Yuppies-Designing.svg')}
              alt="logo"
            />
          </FormLeftBar>
          <BoxWrapOuter>
            <BoxFormWrap>
              <ConfirmMail>
                <div className="header">
                  <h3>Confirm your email</h3>
                  <p>We sent a code to {email}</p>
                  <Link href="/company/update-your-mail">
                    Not my email address
                  </Link>
                </div>
                <Form
                  onSubmit={codeSubmit}
                  ref={formRef}
                  className="verify_mail"
                >
                  <FormGroup>
                    <Label>Verify code</Label>
                    <TextInput
                      placeholder="Enter Code"
                      id="confirmed"
                      className="form-control"
                      type="number"
                      name="confirm_code"
                      maxLength="6"
                      onChange={validateCode}
                    />
                  </FormGroup>
                  {/* <a className="notreceived" href="/company/authentication">
                    Didn&apos;t receive a code?
                  </a> */}
                  <Link href="/company/resent-mail">
                    <Notreceived onClick={() => resendCodeDom()}>
                      Didn&apos;t receive a code?
                    </Notreceived>
                  </Link>
                  <div className="agreements">
                    {/* <div className="list_one">
                    <input id="send-job" type="checkbox" className="checkbox" />
                    <Label1 htmlFor="send-job">
                      Send me relevant job opportunities and career-related
                      updates.
                    </Label1>
                  </div> */}
                    <div className="list_one">
                      <input
                        id="agree"
                        type="checkbox"
                        className="checkbox"
                        onChange={e => getCheckValue(showCheck)}
                      />
                      <Label1 htmlFor="agree" className="">
                        I have read and agree to{' '}
                        <a
                          href="https://joinsizigi.com/Terms"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                          Terms of Use{' '}
                        </a>{' '}
                        and{' '}
                        <a
                          href="https://joinsizigi.com/Privacy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                          Privacy Policy{' '}
                        </a>
                        .
                      </Label1>
                    </div>
                  </div>
                  {/* <button
                type="submit"
                className="btn action-btn"
                label="Verify"
                handleClick={() => codeSubmit()}
                loading={codeLoading}
              /> */}
                  <button
                    type="submit"
                    className="btn action-btn"
                    disabled={showCheck === false}
                  >
                    Verify
                  </button>
                </Form>
              </ConfirmMail>
            </BoxFormWrap>
          </BoxWrapOuter>
        </BoxFormSection>
      </MainPageDivision>
    </>
  );

  const content = confirmMailpage();

  return (
    <Page
      title={t('page.title')}
      description={t('page.description')}
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

confirmMail.propTypes = {
  onSkip: PropTypes.func,
  onSuccess: PropTypes.func,
  source: PropTypes.string,
  modal: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.string),
};

confirmMail.defaultProps = {
  onSkip: () => null,
  onSuccess: () => null,
  source: 'signup',
  modal: false,
  data: null,
};

export default confirmMail;

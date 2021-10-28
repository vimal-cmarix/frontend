import React, { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';
import jwtDecode from 'jwt-decode';
import VerificationModal from '@components/templates/Modals/VerificateAccount';

import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import errorHandle from '@src/utils/error';
import SignService from '@api/services/sign';
import { login, withoutAuth, loginVerification } from '@src/utils/auth';
import { sizes } from '@assets/styles/medias';

import Page from '@components/templates/Page';
import Brand from '@components/atoms/Brand';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import { useToast, Action } from '@components/molecules/Notification';
import Storage from '@utils/storage';
import AppleIcon from '@src/assets/images/apple.svg';
import FacebookIcon from '@src/assets/images/fbicon.svg';
import GoogleIcon from '@src/assets/images/google.svg';
import Btn from '@components/molecules/Btn';
import hidePwdImg from '@src/assets/images/eye-off.svg';
import showPwdImg from '@src/assets/images/eye-onn.svg';
import {
  TopNav,
  TopNavText,
  TopNavButtonWrapper,
  PageWrapper,
  PageTitle,
  SignInFormWrapper,
  FieldWrapper,
  SignInButtonWrapper,
  RecoverPasswordLink,
  Subtitle,
  LikedinContainer,
  ColRight,
  ColLeft,
  Quotes,
  QuotesRetangle,
  BoxFormSection,
  BoxFormTitle,
  BoxFormBody,
  SocialSignIn,
  Small,
  BoxFormWrap,
  FormGroup,
  Label,
  FormGroupMb8,
  ForgotPasswordLink,
  BoxFormAction,
  LoginFooter,
  ShowHidePassword,
} from './style';

const SignIn = () => {
  const [password, setPwd] = useState('');
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t } = useTranslation('signup');
  const { t: homeT } = useTranslation('home');
  const { dispatch: profileDispatch } = useContext(ProfileContext);

  const { state: appState, dispatch } = useContext(AppContext);
  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(null);
  const [showAction, setShowAction] = useState({ show: false, text: '' });

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  async function signIn(data) {
    localStorage.removeItem('called');
    setLoading(true);

    try {
      const res = await SignService.getApplicant(data);
      const { accessToken, profileId, userId } = res.data.data;

      profileDispatch({
        type: 'CLEAR_PROFILE',
      });
      const info = jwtDecode(accessToken);
      // console.log('info---', info);
      if (info.isVerified) {
        login(accessToken, profileId, () => {
          Storage.rm('university');
          router.push('/profile');
        });
        setLoading(false);
      } else {
        loginVerification(profileId, userId, () => {
          setShowAction({
            show: true,
            text: homeT('account_verification_action.text', {
              type: 'Login',
            }),
          });
        });
        setLoading(false);
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  function showVerificationModal() {
    setShowAction({ show: false, text: '' });
    dispatch({ type: 'SET_MODAL_OPENED', component: VerificationModal });
  }

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      await signIn(data);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  function verifyRedirect() {
    const { redirect } = router.query;
    if (redirect) Storage.add('redirect', redirect);
  }

  useEffect(() => {
    verifyRedirect();
  }, []);

  const leftCellDisplay =
    screenWidth >= parseInt(sizes.laptop, 10) ? 'block' : 'none';
  const rightCellWidth = screenWidth >= parseInt(sizes.laptop, 10) ? 8 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 12 : 1;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '40px';

  const rightContent = () => (
    <>
      {/* {screenWidth >= parseInt(sizes.laptop, 10) && (
        <TopNav>
          <TopNavText>{t('form.not_account')}</TopNavText>
          <TopNavButtonWrapper>
            <Btn
              label={t('Sign up')}
              variant="outlineSecondary"
              handleClick={() => router.push('/signup')}
              rounded="lg"
              full
            />
          </TopNavButtonWrapper>
        </TopNav>
      )} */}
      <BoxFormSection>
        <BoxFormWrap>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <BoxFormTitle>Sign in</BoxFormTitle>
            {showAction.show && (
              <Action
                type="warning"
                title="Oops!"
                description={showAction.text}
                onCancel={() => setShowAction({ show: false, text: '' })}
                onConfirm={() => showVerificationModal()}
              />
            )}
            <BoxFormBody>
              <SocialSignIn>
                <a className="social_one google" href="/">
                  <img src={GoogleIcon} alt="googleicon" /> Sign in with Google
                </a>
                <a className="social_one apple" href="/">
                  <img src={AppleIcon} alt="appleicon" /> Sign in with Apple
                </a>
                <a className="social_one facebook" href="/">
                  <img src={FacebookIcon} alt="fbicon" /> Sign in with Facebook
                </a>
                {/* <LikedinContainer>
              <Btn
                label="Sign in with Google"
                variant="grey"
                handleClick={() => {
                  window.location.href = `${process.env.API_URL_APPLICANT}/linkedin/authorization/`;
                }}
              />
            </LikedinContainer> */}
                {/* <LikedinContainer>
              <Btn
                label="Sign in with Apple"
                variant="grey"
                handleClick={() => {
                  window.location.href = `${process.env.API_URL_APPLICANT}/linkedin/authorization/`;
                }}
              />
            </LikedinContainer> */}
                {/* <LikedinContainer>
              <Btn
                label="Sign in with Facebook"
                variant="grey"
                handleClick={() => {
                  window.location.href = `${process.env.API_URL_APPLICANT}/linkedin/authorization/`;
                }}
              />
              <Subtitle>or start with an email</Subtitle>
            </LikedinContainer> */}
              </SocialSignIn>
              <Small>or</Small>

              <FormGroup>
                <Label>
                  Work email <span className="req-star">*</span>
                </Label>
                <TextInput
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Work email"
                />
              </FormGroup>
              {/* PASSWORD VV */}
              <FormGroupMb8>
                <Label>
                  Password <span className="req-star">*</span>
                </Label>
                <TextInput
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  type={isRevealPwd ? 'text' : 'password'}
                  value={password}
                />
                <ShowHidePassword
                  onClick={() => setIsRevealPwd(prevState => !prevState)}
                >
                  <img
                    title={isRevealPwd ? 'Show password' : 'Hide password'}
                    src={isRevealPwd ? showPwdImg : hidePwdImg}
                    alt="eye"
                  />
                </ShowHidePassword>
              </FormGroupMb8>

              <ForgotPasswordLink>
                <Link href="/signup-btc">Create an account!</Link>
                <Link href="/forgot-password-btc">Forgot password?</Link>
              </ForgotPasswordLink>

              {/* <Link href="/reset-password">
                <RecoverPasswordLink href="/reset-password">
                  I forgot my password
                </RecoverPasswordLink>
              </Link> */}

              {/* <SignInButtonWrapper>
                <Btn
                  label="Sign in"
                  type="submit"
                  variant="outlinePrimary"
                  loading={loading}
                  rounded="lg"
                />
              </SignInButtonWrapper> */}
            </BoxFormBody>
            <BoxFormAction>
              <button type="submit" loading={loading} className="btn">
                Sign in
              </button>
            </BoxFormAction>
          </Form>
          <LoginFooter>
            <p>
              By signing in to your account, you agree to{' '}
              <a href="/"> Sizigi’s Terms of Service </a> and consent to our{' '}
              <a href="/"> Cookie Policy </a> and{' '}
              <a href="/"> Privacy Policy</a>.
            </p>
          </LoginFooter>
        </BoxFormWrap>
      </BoxFormSection>
    </>
  );

  const content = rightContent();

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

export default withoutAuth(SignIn);

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

import Btn from '@components/molecules/Btn';
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
  BoxFormBody,
  BoxFormWrap,
  BoxFormTitle,
  BoxFormAction,
  Container,
  FormGroup,
  ForgotPasswordLink,
  FormGroupMb8,
  Label,
} from './style';

const SignIn = () => {
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
        {/* <Container> */}
        <BoxFormWrap>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <BoxFormTitle>
              <h2>Sign in</h2>
            </BoxFormTitle>

            <BoxFormBody>
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
              <FormGroupMb8>
                <Label>
                  Password <span className="req-star">*</span>
                </Label>
                <TextInput
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <div className="show-hide-password">
                  {/* <img
                  src={process.env.PUBLIC_URL + `{'/img/eye-off.svg'}`}
                  alt="eye"
                /> */}
                </div>
              </FormGroupMb8>

              <ForgotPasswordLink>
                <Link href="/reset-password">
                  <RecoverPasswordLink href="/reset-password">
                    Forgot your password?{' '}
                    {/* <img
                      src={process.env.PUBLIC_URL + '/img/chevron-right.svg'}
                      alt="chevron-right"
                    /> */}
                  </RecoverPasswordLink>
                </Link>
              </ForgotPasswordLink>
            </BoxFormBody>
            <BoxFormAction>
              <button type="submit" className="btn">
                Sign in
              </button>
            </BoxFormAction>
          </Form>
        </BoxFormWrap>
        {/* </Container> */}
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
      <Grid columns={gridSize} gap={gapSize} style={{ minHeight: '100vh' }}>
        {/* <Cell
          width={4}
          style={{
            position: 'relative',
            display: leftCellDisplay,
          }}
        >
          <ColRight>
            <Brand colorSchema="dark" size="navDark" />
            <Quotes>
              <QuotesRetangle />
            </Quotes>
          </ColRight>
          
        </Cell> */}
        <Cell width={rightCellWidth}>
          <ColLeft>{content}</ColLeft>
          {screenWidth < parseInt(sizes.laptop, 10) && (
            <Cell
              className="loginBottomSection"
              width={4}
              style={{
                position: 'relative',
                height: 'auto',
              }}
            >
              <ColRight>
                <TopNav>
                  <TopNavText>{t('Do not have a account?')}</TopNavText>
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
                <Quotes>
                  <QuotesRetangle />
                </Quotes>
              </ColRight>
            </Cell>
          )}
        </Cell>
      </Grid>
    </Page>
  );
};

export default withoutAuth(SignIn);

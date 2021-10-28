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
        localStorage.setItem('isCompanyUser', false);
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
    console.log('data', data);
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
      {screenWidth >= parseInt(sizes.laptop, 10) && (
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
      )}
      <PageWrapper>
        <PageTitle>Welcome back</PageTitle>
        {showAction.show && (
          <Action
            type="warning"
            title="Oops!"
            description={showAction.text}
            onCancel={() => setShowAction({ show: false, text: '' })}
            onConfirm={() => showVerificationModal()}
          />
        )}
        <LikedinContainer>
          <Btn
            label="Sign up with LinkedIn"
            variant="grey"
            handleClick={() => {
              window.location.href = `${process.env.API_URL_APPLICANT}/linkedin/authorization/`;
            }}
          />
          <Subtitle>or start with an email</Subtitle>
        </LikedinContainer>
        <SignInFormWrapper>
          <Form onSubmit={handleSubmit} ref={formRef}>
            {/* EMAIL VV */}
            <FieldWrapper>
              <FormBlock label="Email address">
                <TextInput
                  name="email"
                  placeholder="alfredpennyworth@gmail.com"
                  size="medium"
                  type="email"
                />
              </FormBlock>
            </FieldWrapper>

            {/* PASSWORD VV */}
            <FieldWrapper>
              <FormBlock label="Password">
                <TextInput
                  name="password"
                  placeholder="At least 8 characters"
                  size="medium"
                  type="password"
                />
              </FormBlock>
            </FieldWrapper>

            <Link href="/reset-password">
              <RecoverPasswordLink href="/reset-password">
                I forgot my password
              </RecoverPasswordLink>
            </Link>

            <SignInButtonWrapper>
              <Btn
                label="Sign in"
                type="submit"
                variant="outlinePrimary"
                loading={loading}
                rounded="lg"
              />
            </SignInButtonWrapper>
          </Form>
        </SignInFormWrapper>
      </PageWrapper>
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
        <Cell
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
        </Cell>
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

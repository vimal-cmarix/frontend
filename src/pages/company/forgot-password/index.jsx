import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import Router from 'next/router';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { cdn } from '@utils/general';
import { sizes } from '@assets/styles/medias';
import ForgotService from '@api/services/forgot';
import AppContext from '@context/appContext';
import TextInput from '@components/molecules/TextInput';
import { useToast } from '@components/molecules/Notification';
import Page from '@components/templates/Page';
import errorHandle from '@src/utils/error';
import AuthHeaderB2B from '@components/organisms/authheaderB2B';
import Link from 'next/link';

import {
  FormWrapperDescription,
  FormWrapperResend,
  FormWrapper,
  FormWrapperTitle,
  Label,
  BoxFormSection,
  BoxFormWrap,
  BoxFormBody,
  BoxFormTitle,
  BoxFormAction,
  PasswordNote,
  FormGroup,
  FormGroupMb8,
  ForgotPasswordLink,
  MainPageDivision,
  BoxWrapOuter,
  FormLeftBar,
  FormLeftBarP,
} from './style';

const Forgot = ({ token }) => {
  const { t } = useTranslation('forgot');
  const { t: signupT } = useTranslation('signup');
  const { t: errorMessage } = useTranslation('errorMessages');
  const { state: appState } = useContext(AppContext);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  async function resend() {
    if (!email) {
      setStep(1);
      showToast(t('error_generic'));
      return;
    }

    try {
      const res = await ForgotService.sendForgotNew({ email });
      if (res.status === 201) {
        toast.add(t('success_resend'), 'success');
      }
    } catch (e) {
      if (e.data.message.name === 'EntityNotFound') {
        setStep(1);
        showToast(t('forgot_not_found'));
      } else {
        showToast(errorHandle(e));
      }
      setLoading(false);
    }
  }

  async function forgot(data) {
    setLoading(true);

    try {
      setEmail(data.email);
      const res = await ForgotService.sendForgotNew(data);
      setLoading(false);

      if (res.status === 201) {
        window.scrollTo(0, 0);
        setStep(2);
      }
    } catch (e) {
      if (e.data.message.name === 'EntityNotFound') {
        showToast(t('forgot_not_found'));
      } else {
        showToast(errorHandle(e));
      }
      setLoading(false);
    }
  }

  async function reset(data) {
    setResetLoading(true);

    try {
      const res = await ForgotService.resetNew(token, data);
      setResetLoading(false);

      if (res.status === 200) {
        toast.add(t('reset_success'), 'success');
        setTimeout(() => {
          Router.push('/company/signin');
        }, 100);
      }
    } catch (e) {
      if (e.status === 400) {
        showToast(t('invalid_reset'));
      } else if (e.status === 404) {
        showToast(t('reset_not_found'));
      } else {
        showToast(errorHandle(e));
      }
      setResetLoading(false);
    }
  }

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      window.scrollTo({ to: 0, behavior: 'smooth' });

      // Validation passed
      await forgot(data);
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

  async function handleReset(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string()
          .min(8)
          .required(),
        confirm_new_password: Yup.string()
          .min(8)
          .oneOf([Yup.ref('password'), null])
          .required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      await reset(data);
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

  const stepTwo = () => (
    <FormWrapper>
      <FormWrapperTitle>{t('step_two.title')}</FormWrapperTitle>
      <FormWrapperDescription>
        {t('step_two.description')}
      </FormWrapperDescription>
      <FormWrapperResend onClick={() => resend()}>
        {t('step_two.resend')}
      </FormWrapperResend>
    </FormWrapper>
  );

  const stepOne = () => (
    <>
      {/* Reset password */}
      <MainPageDivision>
        <AuthHeaderB2B />
        <BoxFormSection>
          <FormLeftBar>
            <div className="logo">
              <Link href="/">
                <img src={cdn('/static/img/sizigi-full-logo.svg')} alt="logo" />
              </Link>
            </div>
            <h2>Reset your password</h2>
            <FormLeftBarP>
              Forgot your password? No problem, enter your email address and
              we’ll get you back in!
            </FormLeftBarP>
            <img
              className="vector-img"
              src={cdn('/static/img/Yuppies-Emails.svg')}
              alt="logo"
            />
          </FormLeftBar>
          <BoxWrapOuter>
            <BoxFormWrap>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <BoxFormTitle>
                  <h2>Reset password</h2>
                </BoxFormTitle>

                <BoxFormBody>
                  <PasswordNote>
                    <p>
                      Enter the email associated with your account and we’ll
                      send an email with instructions to reset your password
                    </p>
                  </PasswordNote>
                  <FormGroup>
                    <Label>
                      Email address <span className="req-star">*</span>
                    </Label>
                    <TextInput
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                    />
                  </FormGroup>
                </BoxFormBody>

                <BoxFormAction>
                  {/* <Link href="/CreatePassword">
              <> */}
                  <button type="submit" className="btn">
                    Send instructions
                  </button>
                  {/* </>
            </Link> */}
                </BoxFormAction>
              </Form>
            </BoxFormWrap>
          </BoxWrapOuter>
        </BoxFormSection>
      </MainPageDivision>
    </>
  );

  const resetPasswordContent = (
    <BoxFormSection>
      {/* Reset password */}
      <div className="container">
        <BoxFormWrap>
          <Form onSubmit={handleReset} ref={formRef}>
            <BoxFormTitle>
              <h2>Create new password</h2>
            </BoxFormTitle>

            <BoxFormBody>
              <PasswordNote>
                <p>
                  Your password must be different from previous used passwords
                </p>
              </PasswordNote>
              <FormGroup>
                <Label>
                  Password <span className="req-star">*</span>
                </Label>
                <TextInput
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroupMb8>
                <Label>
                  Confirm password <span className="req-star">*</span>
                </Label>
                <TextInput
                  name="confirm_new_password"
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                />
              </FormGroupMb8>
              <ForgotPasswordLink>
                <p>Both passwords must match</p>
              </ForgotPasswordLink>
            </BoxFormBody>

            <BoxFormAction>
              {/* <Link href="/CreatePassword">
              <> */}
              <button type="submit" className="btn">
                Create new password
              </button>
              {/* </>
            </Link> */}
            </BoxFormAction>
          </Form>
        </BoxFormWrap>
      </div>
    </BoxFormSection>
  );

  const leftCellDisplay =
    screenWidth >= parseInt(sizes.laptop, 10) ? 'block' : 'none';
  const rightCellWidth = screenWidth >= parseInt(sizes.laptop, 10) ? 12 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 12 : 1;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '40px';

  const stepContent = step === 2 ? stepTwo() : stepOne();

  return (
    <Page
      title={t('page.title')}
      description={t('page.description')}
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {token ? resetPasswordContent : stepContent}
      {/* <Grid columns={gridSize} gap={gapSize} style={{ minHeight: '100vh' }}> */}
      {/* <Cell
          width={4}
          style={{ position: 'relative', display: leftCellDisplay }}
        >
          <ColRight>
            <Brand colorSchema="light" size="medium" />
            <Quotes>
              <QuotesRetangle />
              <QuotesText>
                <p>{`"${signupT(`quotes.step_two.text`)}"`}</p>
                <small>{signupT(`quotes.step_two.author`)}</small>
              </QuotesText>
            </Quotes>
          </ColRight>
        </Cell> */}
      {/* <Cell width={rightCellWidth}> */}
      {/* <TopNav>
            <TopNavText>{signupT('form.have_account')}</TopNavText>
            <TopNavButtonWrapper>
              <Btn
                label={signupT('form.button.login')}
                variant="outlineSecondary"
                rounded="lg"
                handleClick={() => {
                  Router.push('/signin');
                }}
                full
              />
            </TopNavButtonWrapper>
          </TopNav> */}
      {/* <ColLeft>{token ? resetPasswordContent : stepContent}</ColLeft> */}
      {/* </Cell> */}
      {/* </Grid> */}
    </Page>
  );
};

Forgot.propTypes = {
  token: PropTypes.string,
};

Forgot.defaultProps = {
  token: '',
};

Forgot.getInitialProps = ({ query }) => {
  return query;
};

export default Forgot;

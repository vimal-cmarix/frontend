import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import Router from 'next/router';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';

import { sizes } from '@assets/styles/medias';

import ForgotService from '@api/services/forgot';

import AppContext from '@context/appContext';

import Brand from '@components/atoms/Brand';

import FormBlock from '@components/organisms/FormBlock';

import TextInput from '@components/molecules/TextInput';
import { useToast } from '@components/molecules/Notification';
import Btn from '@components/molecules/Btn';

import Page from '@components/templates/Page';

import errorHandle from '@src/utils/error';

import {
  TopNav,
  TopNavText,
  TopNavButtonWrapper,
  Quotes,
  QuotesRetangle,
  QuotesText,
  FormWrapperDescription,
  FormWrapperResend,
  FormWrapper,
  FormWrapperTitle,
  FormWrapperBlock,
  FormWrapperButton,
  ColRight,
  ColLeft,
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
      const res = await ForgotService.sendForgot({ email });
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
      const res = await ForgotService.sendForgot(data);
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
      const res = await ForgotService.reset(token, data);
      setResetLoading(false);

      if (res.status === 200) {
        toast.add(t('reset_success'), 'success');
        setTimeout(() => {
          Router.push('/');
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
    <FormWrapper>
      <FormWrapperTitle>{t('step_one.title')}</FormWrapperTitle>
      <FormWrapperDescription>
        {t('step_one.description')}
      </FormWrapperDescription>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <FormWrapperBlock>
          <FormBlock label={signupT('form.label.email')}>
            <TextInput
              name="email"
              size="medium"
              placeholder={signupT('form.placeholder.email')}
              type="email"
            />
          </FormBlock>
        </FormWrapperBlock>
        <FormWrapperButton>
          <Btn
            label={t('step_one.button')}
            type="submit"
            variant="solidPrimary"
            loading={loading}
          />
        </FormWrapperButton>
      </Form>
    </FormWrapper>
  );

  const resetPasswordContent = (
    <FormWrapper>
      <FormWrapperTitle>{t('reset_password')}</FormWrapperTitle>
      <Form onSubmit={handleReset} ref={formRef}>
        <FormWrapperBlock>
          <FormBlock label={signupT('form.label.new_password')}>
            <TextInput
              name="password"
              size="medium"
              type="password"
              placeholder={signupT('form.placeholder.password')}
            />
          </FormBlock>
        </FormWrapperBlock>
        <FormWrapperBlock>
          <FormBlock label={signupT('form.label.confirm_password')}>
            <TextInput
              name="confirm_new_password"
              size="medium"
              type="password"
              placeholder={signupT('form.placeholder.new_password')}
            />
          </FormBlock>
        </FormWrapperBlock>
        <FormWrapperButton>
          <Btn
            label={t('step_one.button')}
            type="submit"
            variant="solidPrimary"
            handleClick={() => {}}
            loading={resetLoading}
            full
          />
        </FormWrapperButton>
      </Form>
    </FormWrapper>
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
      <Grid columns={gridSize} gap={gapSize} style={{ minHeight: '100vh' }}>
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
        <Cell width={rightCellWidth}>
          <TopNav>
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
          </TopNav>
          <ColLeft>{token ? resetPasswordContent : stepContent}</ColLeft>
        </Cell>
      </Grid>
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

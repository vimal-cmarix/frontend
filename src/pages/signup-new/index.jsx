import React, { useContext, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';

import 'react-phone-number-input/style.css';
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';

import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import SignService from '@api/services/sign';
import { loginVerification } from '@src/utils/auth';
import { sizes } from '@assets/styles/medias';

import Page from '@components/templates/Page';
import errorHandle from '@src/utils/error';
import Brand from '@components/atoms/Brand';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import AccountVerification from '@components/organisms/AccountVerification';
import { useToast } from '@components/molecules/Notification';
import Storage from '@utils/storage';

import Btn from '@components/molecules/Btn';
import {
  TopNav,
  TopNavText,
  TopNavButtonWrapper,
  Quotes,
  QuotesRetangle,
  FormWrapper,
  FormWrapperTitle,
  FormWrapperBlock,
  FormWrapperButton,
  ColRight,
  ColLeft,
  LikedinContainer,
  TermsText,
  Subtitle,
  PhoneComponent,
  ErrorMessagePhone,
} from './style';

const SignUp = () => {
  const { t } = useTranslation('signup');
  const { t: errorMessage } = useTranslation('errorMessages');
  const { state: appState } = useContext(AppContext);
  const { dispatch: profileDispatch } = useContext(ProfileContext);

  const [formData, setFormData] = useState(null);
  const [step, setStep] = useState(1);
  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [screenWidth, setScreenWidth] = useState(null);
  const [value, setValue] = useState();
  const [isPossible, setIsPossibleValue] = useState(true);
  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);
  const componentDidMount = fun => useEffect(fun, []);
  componentDidMount(() => {
    localStorage.removeItem('called');
  });
  /* eslint-disable */
  function trackExtoleSignUp(userId, { email, first_name, last_name }) {
    (function(c, e, k, l, a) {
      c[e] = c[e] || {};
      for (c[e].q = c[e].q || []; a < l?.length; ) k(l[a++], c[e]);
    })(
      window,
      'extole',
      function(c, e) {
        e[c] =
          e[c] ||
          function() {
            e.q.push([c, arguments]);
          };
      },
      ['createZone'],
      0,
    );

    extole.createZone({
      name: 'registration',
      data: {
        first_name,
        last_name,
        email,
        partner_user_id: userId,
      },
    });
  }
  /* eslint-enable */

  async function signUp(data) {
    localStorage.removeItem('called');
    setLoading(true);
    const dataSend = data;

    if (dataSend.phone === '') delete dataSend.phone;

    try {
      const res = await SignService.createApplicant(dataSend);
      const { accessToken, profileId, userId } = res.data.data;

      if (accessToken) {
        profileDispatch({
          type: 'CLEAR_PROFILE',
        });

        setFormData(dataSend);

        loginVerification(profileId, userId, () => {
          // Storage.add(`tourShow_${profileId}`, 'true');
          setStep(2);
        });
      }

      trackExtoleSignUp(userId, dataSend);
    } catch (e) {
      if (e.status === 409) {
        showToast(errorMessage('email.duplicated'));
      } else {
        showToast(errorHandle(e));
      }
    } finally {
      setLoading(false);
    }
  }

  async function finishSignUp() {
    router.push('/profile');
    // const tokens = await (
    //   await fetch('https://go.joinsizigi.com/api/v4/token', {
    //     credentials: 'include',
    //     method: 'get',
    //   })
    // ).json();
    // const rewards = await (
    //   await fetch(
    //     `https://go.joinsizigi.com/api/v4/me/rewards?access_token=${tokens.access_token}`,
    //     {
    //       credentials: 'include',
    //     },
    //   )
    // ).json();
    // if (rewards?.length > 0) {
    //   router.push('/reward');
    // } else {
    //   router.push('/profile');
    // }
  }

  async function handleSubmit(data) {
    localStorage.setItem('called', true);
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      if (value !== undefined) {
        if (!value) {
          setIsPossibleValue(false);
        } else {
          //const status = value && isPossiblePhoneNumber(value);
          const status =
            value && isValidPhoneNumber(value) && isPossiblePhoneNumber(value);
          setIsPossibleValue(status);
          if (status) {
            setIsPossibleValue(true);
          } else {
            setIsPossibleValue(false);
          }
        }
      }
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        phone: Yup.string(),
        password: Yup.string()
          .min(8)
          .required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      if (value !== undefined) {
        const status =
          value && isValidPhoneNumber(value) && isPossiblePhoneNumber(value);
        setIsPossibleValue(status);
        if (status) {
          Object.assign(data, { phone: value });
          await signUp(data);
        }
      } else {
        setIsPossibleValue(isPossible);
        if (isPossible) {
          Object.assign(data, { phone: value });
          await signUp(data);
        }
      }
      // Validation passed
      // data.phone = value;
      //await signUp(data);
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

  async function handleChange(e) {
    const call = localStorage.getItem('called');
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
    if (call) {
      const data = formRef.current.getData();
      try {
        // Remove all previous errors
        //console.log('data', data);
        formRef.current.setErrors({});
        if (value !== undefined) {
          if (!value) {
            setIsPossibleValue(false);
          } else {
            const status =
              value &&
              isValidPhoneNumber(value) &&
              isPossiblePhoneNumber(value);
            setIsPossibleValue(status);
            if (status) {
              setIsPossibleValue(true);
            } else {
              setIsPossibleValue(false);
            }
          }
        }
        const schema = Yup.object().shape({
          email: Yup.string()
            .email()
            .required(),
          first_name: Yup.string().required(),
          last_name: Yup.string().required(),
          phone: Yup.string(),
          password: Yup.string()
            .min(8)
            .required(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // Validation passed
        data.phone = value;
        //await signUp(data);
      } catch (err) {
        //console.log('error', err);
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
    //formRef.current.setErrors({});
    //formRef.current.getErrors();
  }

  function setVal(e) {
    setIsPossibleValue(true);
  }

  const leftCellDisplay =
    screenWidth >= parseInt(sizes.laptop, 10) ? 'block' : 'none';
  const rightCellWidth = screenWidth >= parseInt(sizes.laptop, 10) ? 8 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 12 : 1;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '40px';

  const stepTwo = () => (
    <AccountVerification
      onSkip={() => finishSignUp()}
      data={formData}
      onSuccess={() => finishSignUp()}
    />
  );

  const stepOne = () => (
    <>
      {screenWidth >= parseInt(sizes.laptop, 10) && (
        <TopNav>
          {/* <TopNavText>{t('form.have_account')}</TopNavText>
          <TopNavButtonWrapper>
            <Btn
              label={t('Log in')}
              variant="outlineSecondary"
              handleClick={() => router.push('/signin')}
              rounded="lg"
              full
            />
          </TopNavButtonWrapper> */}
        </TopNav>
      )}
      <FormWrapper>
        <FormWrapperTitle>{t('form.create_account-new')}</FormWrapperTitle>
        <LikedinContainer>
          <Btn
            label="Sign in with Google"
            variant="grey"
            handleClick={() => {
              window.location.href = `${process.env.API_URL_APPLICANT}/linkedin/authorization/`;
            }}
          />
        </LikedinContainer>
        <LikedinContainer>
          <Btn
            label="Sign in with Apple"
            variant="grey"
            handleClick={() => {
              window.location.href = `${process.env.API_URL_APPLICANT}/linkedin/authorization/`;
            }}
          />
        </LikedinContainer>
        <LikedinContainer>
          <Btn
            label="Sign in with Facebook"
            variant="grey"
            handleClick={() => {
              window.location.href = `${process.env.API_URL_APPLICANT}/linkedin/authorization/`;
            }}
          />
          <Subtitle>or start with an email</Subtitle>
        </LikedinContainer>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <FormWrapperBlock className="form-group">
            <FormBlock className="reqlabel" label={t('form.label.first_name')}>
              <TextInput
                className="form-control"
                name="first_name"
                size="medium"
                maxLength="30"
                placeholder={t('form.placeholder.first_name')}
                onChange={handleChange}
              />
            </FormBlock>
          </FormWrapperBlock>
          <FormWrapperBlock className="form-group">
            <FormBlock className="reqlabel" label={t('form.label.last_name')}>
              <TextInput
                className="form-control"
                name="last_name"
                size="medium"
                maxLength="30"
                placeholder={t('form.placeholder.last_name')}
                onChange={handleChange}
              />
            </FormBlock>
          </FormWrapperBlock>
          <FormWrapperBlock className="form-group">
            <FormBlock
              className="reqlabel"
              label={t('form.label.Company_name')}
            >
              <TextInput
                className="form-control"
                name="company_name"
                size="medium"
                maxLength="30"
                placeholder={t('form.placeholder.company_name')}
                onChange={handleChange}
              />
            </FormBlock>
          </FormWrapperBlock>
          <FormWrapperBlock className="form-group">
            <FormBlock className="reqlabel" label={t('form.label.email')}>
              <TextInput
                className="form-control"
                name="email"
                size="medium"
                placeholder={t('form.placeholder.email')}
                type="email"
                onChange={handleChange}
              />
            </FormBlock>
          </FormWrapperBlock>
          <FormWrapperBlock className="form-group">
            <FormBlock className="reqlabel" label={t('form.label.password')}>
              <TextInput
                className="form-control"
                name="password"
                type="password"
                size="medium"
                placeholder={t('form.placeholder.password')}
                onChange={handleChange}
              />
            </FormBlock>
          </FormWrapperBlock>
          <FormWrapperButton>
            <Btn
              label={t('Get started')}
              type="submit"
              variant="outlinePrimary"
              loading={loading}
              rounded="lg"
            />
            <TopNav>
              <TopNavText>{t('form.have_account')}</TopNavText>
              <TopNavButtonWrapper>
                <Btn
                  label={t('Log in')}
                  variant="outlineSecondary"
                  handleClick={() => router.push('/signin')}
                  full
                />
              </TopNavButtonWrapper>
            </TopNav>
            <TermsText>
              By signing in to your account, you agree to Sizigi’s Terms of
              Service and consent to our Cookie Policy and Privacy Policy. You
              consent to receiving marketing messages from Sizigi and may opt
              out of receiving such messages by following the unsubscrbe link in
              our messages, or as detailed in our terms
            </TermsText>
          </FormWrapperButton>
        </Form>
      </FormWrapper>
    </>
  );

  const content = step === 2 ? stepTwo() : stepOne();
  //const stepStr = step === 2 ? 'step_two' : 'step_one';

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
              width={4}
              style={{
                position: 'relative',
                display: !leftCellDisplay,
                height: '45%',
              }}
            >
              <ColRight>
                {/* <TopNav>
                  <TopNavText>{t('form.have_account')}</TopNavText>
                  <TopNavButtonWrapper>
                    <Btn
                      label={t('Log in')}
                      variant="outlineSecondary"
                      handleClick={() => router.push('/signin')}
                      full
                    />
                  </TopNavButtonWrapper>
                </TopNav> */}
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

export default SignUp;

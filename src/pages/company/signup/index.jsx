import React, { useContext, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import 'react-phone-number-input/style.css';
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';

import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import SignService from '@src/api/services/sign';
import { loginVerification } from '@src/utils/auth';
import { sizes } from '@assets/styles/medias';
import Page from '@components/templates/Page';
import errorHandle from '@src/utils/error';
import TextInput from '@components/molecules/TextInput';
import Authentication from '@src/pages/company/authentication';
import { useToast } from '@components/molecules/Notification';
// import hidePwdImg from '@src/assets/images/eye-off.svg';
import Btn from '@components/molecules/Btn';
// import showPwdImg from '@src/assets/images/eye-open.svg';
import { cdn } from '@utils/general';
import AuthHeaderB2B from '@components/organisms/authheaderB2B';
import Link from 'next/link';
//import showPwdImg from './show-password.svg';
//import hidePwdImg from './hide-password.svg';
// import Btn from '@components/molecules/Btn';
// import Storage from '@utils/storage';
// import AccountVerification from '@components/organisms/AccountVerification';
// import Brand from '@components/atoms/Brand';
// import FormBlock from '@components/organisms/FormBlock';
// import { Grid, Cell } from 'styled-css-grid';
import {
  // TopNav,
  // TopNavText,
  // TopNavButtonWrapper,
  // Quotes,
  // QuotesRetangle,
  // FormWrapper,
  // FormWrapperTitle,
  // FormWrapperBlock,
  // FormWrapperButton,
  // ColRight,
  // ColLeft,
  // LikedinContainer,
  // TermsText,
  // Subtitle,
  // PhoneComponent,
  // ErrorMessagePhone,
  // PageHeader,
  Label,
  BoxFormSection,
  BoxFormWrap,
  BoxFormTitle,
  BoxFormBody,
  BoxFormAction,
  FormGroup,
  ShowHidePassword,
  MainPageDivision,
  FormLeftBar,
  BoxWrapOuter,
  FormBtmNote,
  FormLeftBarP,
} from './style';

const SignUp = () => {
  const [password, setPwd] = useState('');
  const [isRevealPwd, setIsRevealPwd] = useState(false);
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
      const res = await SignService.createApplicantNew(dataSend);
      localStorage.setItem(
        'signupdata',
        JSON.stringify(res.data.data.profileId),
      );
      const { accessToken, profileId, userId } = res.data.data;
      console.log(profileId, 'profileId');
      localStorage.setItem('userDetail', JSON.stringify(res.data.data.user));
      console.log('companyProfile', res.data.data);
      localStorage.setItem(
        'companyProfile',
        JSON.stringify(res.data.data.companyProfile),
      );
      localStorage.setItem(
        'companyAbout',
        JSON.stringify(res.data.data.company_about),
      );
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
    localStorage.setItem('called', data);
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
        company_name: Yup.string().required(),
        password: Yup.string()
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          )
          .min(8)
          .required(),
      });
      localStorage.setItem('data', data.password);
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
    // setemail(e.target.value);
    const call = localStorage.getItem('called');
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
    if (call) {
      const data = formRef.current.getData();
      try {
        // Remove all previous errors
        formRef.current.setErrors({});
        // if (value !== undefined) {
        //   if (!value) {
        //     setIsPossibleValue(false);
        //   } else {
        //     const status =
        //       value &&
        //       isValidPhoneNumber(value) &&
        //       isPossiblePhoneNumber(value);
        //     setIsPossibleValue(status);
        //     if (status) {
        //       setIsPossibleValue(true);
        //     } else {
        //       setIsPossibleValue(false);
        //     }
        //   }
        // }
        const pattern = new RegExp(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        );
        const schema = Yup.object().shape({
          email: Yup.string()
            .email()
            .required(),
          first_name: Yup.string().required(),
          last_name: Yup.string().required(),
          company_name: Yup.string().required(),
          password: Yup.string()
            .matches(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            )
            .min(8)
            .required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        // Validation passed
        //data.phone = value;
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
    <Authentication
      onSkip={() => finishSignUp()}
      data={formData}
      onSuccess={() => finishSignUp()}
    />
  );

  const stepOne = () => (
    <>
      {/* {screenWidth >= parseInt(sizes.laptop, 10) && (
        <TopNav>
          <TopNavText>{t('form.have_account')}</TopNavText>
          <TopNavButtonWrapper>
            <Btn
              label={t('Log in')}
              variant="outlineSecondary"
              handleClick={() => router.push('/signin')}
              rounded="lg"
              full
            />
          </TopNavButtonWrapper>
        </TopNav>
      )} */}
      <MainPageDivision>
        <AuthHeaderB2B />
        {/* <PageHeader>
          <div className="sizigi-header-logo">
            <a href="/">
              <img src={cdn('/static/img/sizigi-full-logo.svg')} alt="logo" />
            </a>
          </div>
          <div className="sizigi-header-nav">
            <a href="/search-jobs">Search Jobs</a>
            <a href="/postajob">For employers</a>
            <a href="/login">Log In </a>
            <a href="/postajob-btc" className="active">
              Sign up
            </a>
          </div>
        </PageHeader> */}
        <BoxFormSection>
          <FormLeftBar>
            <div className="logo">
              {/* <Link href="/"> */}
              <img src={cdn('/static/img/sizigi-full-logo.svg')} alt="logo" />
              {/* </Link> */}
            </div>
            <h2>The best job board you’ve ever used</h2>
            <FormLeftBarP>is just a click a way..</FormLeftBarP>
            <img
              className="vector-img"
              src={cdn('/static/img/Yuppies-Designing.svg')}
              alt="logo"
            />
          </FormLeftBar>
          <BoxWrapOuter>
            <BoxFormWrap>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <BoxFormTitle>
                  <h2>Get started</h2>
                </BoxFormTitle>

                <BoxFormBody className="min-height-auto">
                  <FormGroup>
                    <Label>
                      First name <span className="req-star">*</span>
                    </Label>
                    <TextInput
                      name="first_name"
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      onChange={handleChange}
                      maxLength="20"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      Last name <span className="req-star">*</span>
                    </Label>
                    <TextInput
                      name="last_name"
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      onChange={handleChange}
                      maxLength="20"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      Company name <span className="req-star">*</span>
                    </Label>
                    <TextInput
                      name="company_name"
                      type="text"
                      // value={companyFromParams || ''}
                      className="form-control"
                      placeholder="Company name"
                      onChange={handleChange}
                      maxLength="64"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      Work email <span className="req-star">*</span>
                    </Label>
                    <TextInput
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Work email"
                      onChange={handleChange}
                      maxLength="64"
                    />
                  </FormGroup>
                  <FormGroup className="mb-0">
                    <Label>
                      Password <span className="req-star">*</span>
                    </Label>
                    <TextInput
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      maxLength="15"
                      type={isRevealPwd ? 'text' : 'password'}
                      value={password}
                      onChange={handleChange}
                    />
                    <ShowHidePassword
                      onClick={() => setIsRevealPwd(prevState => !prevState)}
                    >
                      <img
                        className="vector-img"
                        src={
                          isRevealPwd
                            ? cdn('/static/img/images/eye-open.svg')
                            : cdn('/static/img/images/eye-off.svg')
                        }
                        alt="eye"
                        title={isRevealPwd ? 'Show password' : 'Hide password'}
                      />
                      {/* <img
                        title={isRevealPwd ? 'Show password' : 'Hide password'}
                        src={isRevealPwd ? showPwdImg : hidePwdImg}
                        alt="eye"
                      /> */}
                    </ShowHidePassword>
                  </FormGroup>
                </BoxFormBody>

                <BoxFormAction>
                  {/* <Link href="/company/about"> */}
                  {/* <button type="submit" className="btn" rounded="lg">
                    Post job
                  </button> */}
                  <Btn
                    label="Post job"
                    type="submit"
                    // variant="outlinePrimary"
                    handleClick={handleSubmit}
                    loading={loading}
                    className="btn"
                    rounded="lg"
                  />
                  {/* </Link> */}
                </BoxFormAction>
              </Form>
            </BoxFormWrap>
            <FormBtmNote>
              <a href="https://joinsizigi.com/Terms">
                By clicking &quot;Post Job&ldquo; you agree to our Term &amp;
                Conditions and Privacy Policy
              </a>
            </FormBtmNote>
          </BoxWrapOuter>
        </BoxFormSection>
      </MainPageDivision>
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
      {content}
    </Page>
  );
};

export default SignUp;

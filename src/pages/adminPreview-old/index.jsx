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
  FormWrapperBlock,
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
  FormWrapperButton,
  TermsText,
  OnlineResumeWrap,
  CreateResume,
  ProfileVisabelWrap,
  CheckBoxWrap,
  ContactInfoWrap,
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
  const [value, setValue] = useState();
  const [isPossible, setIsPossibleValue] = useState(true);
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
            const status = value;
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
            <CreateResume className="createresume">
              <BoxFormTitle>
                <h2>1 of 5: Basic Info</h2>
              </BoxFormTitle>

              <OnlineResumeWrap>
                <div className="want-to-upload">
                  <p>
                    Save time by uploading a resume to prefill some of the
                    fields below
                  </p>
                  <button type="submit" className="btn action-btn">
                    Upload existing resume
                  </button>
                  <span className="small">or</span>
                </div>
              </OnlineResumeWrap>

              <p className="top-line">
                Start fresh by creating a new resume by filling out the fields
                below!
              </p>
              <div className="note">
                <span>*</span>Required fields
              </div>

              <FormWrapperBlock className="form-group">
                <FormBlock
                  className="reqlabel"
                  label={t('form.label.first_name')}
                >
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
                <FormBlock
                  className="reqlabel"
                  label={t('form.label.last_name')}
                >
                  <TextInput
                    className="form-control"
                    name="last_name"
                    size="medium"
                    maxLength="30"
                    placeholder={t('form.placeholder.last_name')}
                  />
                </FormBlock>
              </FormWrapperBlock>
              <FormWrapperBlock className="form-group">
                <FormBlock className="reqlabel" label={t('form.label.address')}>
                  <TextInput
                    className="form-control"
                    name="Address"
                    size="medium"
                    maxLength="30"
                    placeholder={t('form.placeholder.address')}
                  />
                </FormBlock>
              </FormWrapperBlock>
              <FormWrapperBlock className="form-group">
                <FormBlock
                  className="reqlabel"
                  label={t('form.label.location')}
                >
                  <TextInput
                    className="form-control"
                    name="Location"
                    size="medium"
                    placeholder={t('form.placeholder.location')}
                  />
                </FormBlock>
              </FormWrapperBlock>
              <CheckBoxWrap>
                <div className="employment_eligible inner_block">
                  <h4 className="common_ttl">Employment Eligibility</h4>
                  <div className="form-group">
                    <div className="list_one">
                      <input
                        id="authorise"
                        type="checkbox"
                        className="checkbox"
                      />
                      <FormBlock
                        htmlFor="authorise"
                        label={t('form.label.authorise')}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="list_one">
                      <input
                        id="sponsor"
                        type="checkbox"
                        className="checkbox"
                      />
                      <FormBlock
                        htmlFor="sponsor"
                        label={t('form.label.sponsor')}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="list_one">
                      <input
                        id="nospecified"
                        type="checkbox"
                        className="checkbox"
                      />
                      <FormBlock
                        htmlFor="nospecified"
                        label={t('form.label.notspecified')}
                      />
                    </div>
                  </div>
                </div>
              </CheckBoxWrap>
              <ProfileVisabelWrap>
                <div className="profile_visible inner_block">
                  <h4 className="common_ttl">
                    Profile Visibility
                    <div className="popup_trigger">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="#1D242F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.08984 9.00057C9.32495 8.33224 9.789 7.76868 10.3998 7.4097C11.0106 7.05073 11.7287 6.91951 12.427 7.03928C13.1253 7.15906 13.7587 7.52209 14.2149 8.0641C14.6712 8.6061 14.9209 9.29209 14.9198 10.0006C14.9198 12.0006 11.9198 13.0006 11.9198 13.0006"
                          stroke="#1D242F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 17H12.01"
                          stroke="#1D242F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="popup">
                        <div className="one_block">
                          <h4>Let Employers Apply to You</h4>
                          <p>
                            We show your profile to employers that are a fit so
                            they can invite you to apply.
                          </p>
                        </div>
                        <div className="one_block">
                          <h4>Know You’re a Great Match</h4>
                          <p>
                            We tell you if you’re a strong candidate so you can
                            prioritize where to apply.
                          </p>
                        </div>
                      </div>
                    </div>
                  </h4>
                  <div className="form-group border-form-group">
                    <FormBlock
                      className="reqlabel"
                      label={t('form.label.Profile')}
                    />
                    <select className="form-control">
                      <option>Select an option</option>
                      <option>Search Engine (ex. Google, Bing, Yahoo)</option>
                      <option>Online Video</option>
                      <option>LinkedIn</option>
                    </select>
                  </div>
                </div>
              </ProfileVisabelWrap>
              <ContactInfoWrap>
                <div className="inner_block contact_info">
                  <h4 className="common_ttl">Contact Information</h4>
                  <div className="form-group">
                    <FormWrapperBlock className="form-group">
                      <FormBlock
                        className="reqlabel"
                        label={t('form.label.email')}
                      >
                        <TextInput
                          className="form-control"
                          name="email"
                          size="medium"
                          maxLength="30"
                          placeholder={t('form.placeholder.email')}
                        />
                      </FormBlock>
                    </FormWrapperBlock>
                    <a href="/" className="locked">
                      <div className="d-flex justify-content-between mt-2">
                        <a href="/">Edit</a>
                        <span>
                          only provide to employers you apply or respond to
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="form-group">
                    <FormWrapperBlock className="form-group">
                      <FormBlock
                        className="reqlabel"
                        label={t('form.label.phone')}
                      >
                        <TextInput
                          className="form-control"
                          name="phone"
                          size="medium"
                          maxLength="30"
                          placeholder={t('form.placeholder.phone')}
                        />
                      </FormBlock>
                    </FormWrapperBlock>
                    <a href="/" className="locked">
                      <div className="d-flex justify-content-between mt-2">
                        <a href="/">Edit</a>
                        <span>
                          only provide to employers you apply or respond to
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="check_me">
                  <div className="list_one">
                    <input id="send_msg" type="checkbox" className="checkbox" />
                    <FormBlock
                      className="reqlabel"
                      htmlFor="send_msg"
                      label={t('form.label.msg')}
                    />
                  </div>
                  <p>
                    By submitting the form with this box checked, I consent to
                    receive calls (including live, automated, and recorded
                    calls), texts, and WhatsApp messages from Sizigi and
                    employers who use Sizigi. This consent includes if this
                    number is a wireless cellular phone number
                  </p>
                </div>
              </ContactInfoWrap>
              <OnlineResumeWrap>
                <div className="want-to-upload">
                  <Link href="/CreateResumeStepTwo-new">
                    <button type="submit" className="btn action-btn">
                      Next
                    </button>
                  </Link>
                </div>
              </OnlineResumeWrap>
              {/* <FormWrapperButton>
                <Btn
                  label={t('Join now')}
                  type="submit"
                  variant="outlinePrimary"
                  loading={loading}
                  rounded="lg"
                />
              </FormWrapperButton> */}
            </CreateResume>
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
      {content}
    </Page>
  );
};

export default withoutAuth(SignIn);

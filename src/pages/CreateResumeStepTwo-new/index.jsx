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
  EductionWrap,
  ReqLabel,
  DateSelectWrap,
  SaveAnouther,
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
                <h2>2 of 5: Add Education</h2>
              </BoxFormTitle>

              <EductionWrap>
                <div className="add_education inner_block">
                  <h4 className="common_ttl">Education</h4>
                  <div className="education-one">
                    <div className="form-group">
                      <FormWrapperBlock className="form-group">
                        <FormBlock
                          className="reqlabel"
                          label={t('form.label.Institution')}
                        >
                          <TextInput
                            className="form-control"
                            name="first_name"
                            size="medium"
                            maxLength="30"
                            placeholder={t('form.placeholder.Institution')}
                            onChange={handleChange}
                          />
                        </FormBlock>
                      </FormWrapperBlock>
                      <FormWrapperBlock className="form-group">
                        <FormBlock
                          className="reqlabel"
                          label={t('form.label.Institution')}
                        >
                          <TextInput
                            className="form-control"
                            name="first_name"
                            size="medium"
                            maxLength="30"
                            placeholder={t('form.placeholder.Institution')}
                            onChange={handleChange}
                          />
                        </FormBlock>
                      </FormWrapperBlock>
                    </div>
                  </div>
                </div>
              </EductionWrap>

              <ReqLabel>
                <div className="note">
                  <span>*</span>Required fields
                </div>
              </ReqLabel>
              <ProfileVisabelWrap>
                <div className="profile_visible inner_block">
                  <div className="form-group border-form-group">
                    <FormBlock
                      className="reqlabel"
                      label={t('form.label.Degree')}
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
              <FormWrapperBlock className="form-group">
                <FormBlock className="reqlabel" label={t('form.label.study')}>
                  <TextInput
                    className="form-control"
                    name="study"
                    size="medium"
                    maxLength="30"
                    placeholder={t('form.placeholder.Institution')}
                    onChange={handleChange}
                  />
                </FormBlock>
              </FormWrapperBlock>
              <FormWrapperBlock className="form-group">
                <FormBlock
                  className="reqlabel"
                  label={t('form.label.Institution')}
                >
                  <TextInput
                    className="form-control"
                    name="Institution"
                    size="medium"
                    maxLength="30"
                    placeholder={t('form.placeholder.Institution')}
                    onChange={handleChange}
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
                    name="location"
                    size="medium"
                    maxLength="30"
                    placeholder={t('form.placeholder.location')}
                    onChange={handleChange}
                  />
                </FormBlock>
              </FormWrapperBlock>
              <CheckBoxWrap>
                <div className="employment_eligible inner_block">
                  <h4 className="common_ttl">Time Period</h4>
                  <div className="form-group">
                    <div className="list_one">
                      <input id="Gohere" type="checkbox" className="checkbox" />
                      <FormBlock
                        htmlFor="Gohere"
                        label={t('form.label.Gohere')}
                      />
                    </div>
                  </div>
                </div>
              </CheckBoxWrap>

              <DateSelectWrap>
                <div className="pickadate">
                  <h5>From</h5>
                  <div className="d-flex w-100 w-sm-75">
                    <div className="w-50 form-group border-form-group">
                      <FormBlock
                        className="reqlabel"
                        label={t('form.label.Month')}
                      />
                      <select className="form-control">
                        <option>Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                      </select>
                    </div>
                    <div className="w-50 w-sm-30 ml-3 form-group border-form-group">
                      <FormBlock
                        className="reqlabel"
                        label={t('form.label.Year')}
                      />
                      <select className="form-control">
                        <option>2021</option>
                        <option>2020</option>
                        <option>2019</option>
                        <option>2018</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="pickadate">
                  <h5>To</h5>
                  <div className="d-flex w-100 w-sm-75">
                    <div className="w-50 form-group border-form-group">
                      <FormBlock
                        className="reqlabel"
                        label={t('form.label.Month')}
                      />
                      <select className="form-control">
                        <option>Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                      </select>
                    </div>
                    <div className="w-50 w-sm-30 ml-3 form-group border-form-group">
                      <FormBlock
                        className="reqlabel"
                        label={t('form.label.Year')}
                      />
                      <select className="form-control">
                        <option>2021</option>
                        <option>2020</option>
                        <option>2019</option>
                        <option>2018</option>
                      </select>
                    </div>
                  </div>
                </div>
              </DateSelectWrap>

              <FormBlock className="reqlabel" label="Description">
                <TextInput
                  multiline
                  name="description"
                  className="volunteerDes"
                  size="medium"
                  onChange={handleChange}
                />
              </FormBlock>

              <SaveAnouther>
                <button type="button" className="btn action-btn save_add">
                  Save and add another
                </button>
              </SaveAnouther>

              <OnlineResumeWrap>
                <div className="want-to-upload">
                  <Link href="/CreateResumeStepThree-new">
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

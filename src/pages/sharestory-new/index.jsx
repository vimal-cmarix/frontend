import React, { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import { cdn } from '@utils/general';
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
  EducationOneThree,
  TitleRecommend,
  VideoWrap,
  WantTodayWrap,
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
                <h2>4 of 5: Skills</h2>
              </BoxFormTitle>
              <TitleRecommend>
                <p className="recommandation_line">
                  <strong>Recommendation:</strong> Create 1-2 pieces of content
                  to showcase your hard skills for this position!
                </p>
              </TitleRecommend>

              <VideoWrap>
                <div className="sharestory-header d-flex justify-content-between">
                  <div className="left">
                    <div className="d-flex align-items-center">
                      <img
                        className="img"
                        src={cdn('/static/img/google.svg')}
                        alt="userImage"
                      />
                      <span className="username">Steven Johnson</span>
                    </div>
                    <a href="/sharestory-new" className="privacy-setting">
                      <img src={cdn('/static/img/Gl0be.png')} alt="Globe" />
                      Anyone
                    </a>
                    <div className="privay-setting-popup">
                      <div className="heading d-flex justify-content-between">
                        <h4 className="title">Who can see your post?</h4>
                        <a href="/sharestory-new">
                          <img
                            src={cdn('/static/img/close-icon.svg')}
                            alt="close-icon.svg"
                          />
                        </a>
                      </div>
                      <div className="who-can-see">
                        <div className="property-one">
                          <div className="icon">
                            <img
                              src={cdn('/static/img/global-big.png')}
                              alt="global-big"
                            />
                          </div>
                          <div className="content">
                            <input type="radio" className="radio" />
                            <FormBlock label={t('form.label.comantext')} />
                          </div>
                        </div>
                        <div className="property-one">
                          <div className="icon">
                            <img
                              src={cdn('/static/img/frieds-only.png')}
                              alt="frieds-only"
                            />
                          </div>
                          <div className="content">
                            <input type="radio" className="radio" />
                            <FormBlock label={t('form.label.comantext')} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <a
                      href="/sharestory-new"
                      data-toggle="modal"
                      data-target="#draft-saved"
                      className="make-draft"
                    >
                      Drafts
                    </a>
                    <a href="/sharestory-new" className="save">
                      Next
                    </a>
                  </div>
                </div>
              </VideoWrap>

              <WantTodayWrap>
                <div className="add-content">
                  <div className="textfield">
                    <textarea
                      className="share-story-here"
                      placeholder="What do you want to share today?"
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="toolbar-left">
                      <a href="/sharestory-new">
                        <img src={cdn('/static/img/TT.png')} alt="userImage" />
                      </a>
                      <a href="/sharestory-new">
                        <img
                          src={cdn('/static/img/Toolkit-Quotes.png')}
                          alt="userImage"
                        />
                      </a>
                      <a href="/sharestory-new">
                        <img
                          src={cdn('/static/img/listicon.svg')}
                          alt="userImage"
                        />
                      </a>
                      <a href="/sharestory-new">
                        <img
                          src={cdn('/static/img/justify.png')}
                          alt="userImage"
                        />
                      </a>
                    </div>
                    <div className="toolbar-right">
                      <a href="/sharestory-new">
                        <img
                          src={cdn('/static/img/plus-bordered.png')}
                          alt="userImage"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </WantTodayWrap>
              <SaveAnouther>
                <div className="step-action">
                  <Link href="/CreateResumeStepFour-new">
                    <button type="button" className="btn action-btn save_add">
                      Back
                    </button>
                  </Link>
                  <Link href="/CreateResumeStepFive-new">
                    <button type="submit" className="btn action-btn">
                      Next
                    </button>
                  </Link>
                </div>
              </SaveAnouther>

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

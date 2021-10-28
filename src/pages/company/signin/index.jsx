import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import VerificationModal from '@components/templates/Modals/VerificateAccount';
import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import errorHandle from '@src/utils/error';
import SignService from '@src/api/services/sign';
import { login, withoutAuth, loginVerification } from '@src/utils/auth';
import { sizes } from '@assets/styles/medias';
import { cdn } from '@utils/general';
import Page from '@components/templates/Page';
import TextInput from '@components/molecules/TextInput';
import { useToast, Action } from '@components/molecules/Notification';
import Storage from '@utils/storage';
// import { ChevronRight } from 'src/assets/images/chevron-right.svg';
// import hidePwdImg from '@src/assets/images/eye-off.svg';
// import showPwdImg from '@src/assets/images/eye-open.svg';
import AuthHeaderB2B from '@components/organisms/authheaderB2B';
// import { Grid, Cell } from 'styled-css-grid';
// import Brand from '@components/atoms/Brand';
// import FormBlock from '@components/organisms/FormBlock';
import Btn from '@components/molecules/Btn';
import {
  Spinner,
  BoxFormSection,
  BoxFormBody,
  BoxFormTitle,
  BoxFormAction,
  RecoverPasswordLink,
  FormGroup,
  ForgotPasswordLink,
  Label,
  ShowHidePassword,
  MainPageDivision,
  BoxWrapOuter,
  FormLeftBar,
  BoxFormWrap,
  FormBtmNote,
  FormLeftBarP,
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
  const componentDidMount = fun => useEffect(fun, []);
  componentDidMount(() => {
    localStorage.removeItem('signincalled');
    localStorage.removeItem('success');
    //window.focus();
  });
  async function signIn(data) {
    localStorage.removeItem('called');
    setLoading(true);

    try {
      const res = await SignService.getApplicantNew(data);
      console.log('Response', res);
      const { accessToken } = res.data.data;
      const profileId = res.data.data.companyProfile.id;
      const userId = res.data.data.user.id;
      localStorage.setItem('userDetail', JSON.stringify(res.data.data.user));
      // console.log('companyProfile', res.data.data.companyProfile);
      localStorage.setItem(
        'companyProfile',
        JSON.stringify(res.data.data.companyProfile),
      );
      localStorage.setItem('isCompanyUser', true);
      localStorage.setItem(
        'companyAbout',
        JSON.stringify(res.data.data.companyProfile.company_about),
      );

      profileDispatch({
        type: 'CLEAR_PROFILE',
      });
      const info = jwtDecode(accessToken);
      if (info.isVerified) {
        console.log('isVerified');
        login(accessToken, profileId, () => {
          Storage.rm('university');
          router.push('/company/dashboard');
        });
        setLoading(false);
      } else {
        console.log('isNotVerified');
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
    router.push('/company/confirm-mail');
    //dispatch({ type: 'SET_MODAL_OPENED', component: VerificationModal });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log('-----', e.target.elements);
    // const data = new FormData(event.target);
    // const data = e.target.elements;
    const data = formRef.current.getData();
    localStorage.setItem('signincalled', data);
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(8),
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

  async function handleChange(e) {
    const call = localStorage.getItem('signincalled');
    const data = formRef.current.getData();
    if (call) {
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

        await schema.validate(data, {
          abortEarly: false,
        });

        // Validation passed
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
  const autoFocus = useCallback(el => (el ? el.focus() : null), []);
  const rightContent = () => (
    <>
      <MainPageDivision>
        <AuthHeaderB2B />
        <BoxFormSection>
          <FormLeftBar>
            <div className="logo">
              <Link href="/">
                <img src={cdn('/static/img/sizigi-full-logo.svg')} alt="logo" />
              </Link>
            </div>
            <h2>Welcome Back!</h2>
            <FormLeftBarP>
              Post your job, request content, interview, and find that new
              perfect team member.
            </FormLeftBarP>
            <img
              className="vector-img"
              src={cdn('/static/img/Yuppies-Remote-Team.svg')}
              alt="logo"
            />
          </FormLeftBar>
          <BoxWrapOuter>
            <BoxFormWrap>
              <Form ref={formRef}>
                {showAction.show && (
                  <Action
                    type="warning"
                    title="Oops!"
                    description={showAction.text}
                    onCancel={() => setShowAction({ show: false, text: '' })}
                    onConfirm={() => showVerificationModal()}
                  />
                )}
                <BoxFormTitle>
                  <h2>Sign in</h2>
                </BoxFormTitle>

                <BoxFormBody>
                  <FormGroup className="mt-24">
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
                  <FormGroup className="group-password-group mb-8">
                    <Label>
                      Password <span className="req-star">*</span>
                    </Label>
                    <TextInput
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      type={isRevealPwd ? 'text' : 'password'}
                      value={password}
                      onChange={handleChange}
                      maxLength="15"
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
                       
                        src={isRevealPwd ? showPwdImg : hidePwdImg}
                        alt="eye"
                      /> */}
                    </ShowHidePassword>
                  </FormGroup>

                  <ForgotPasswordLink>
                    <Link href="/company/reset-password">
                      <RecoverPasswordLink href="/company/reset-password">
                        Forgot your password?
                        <img
                          src={cdn('/static/img/images/chevron-right.svg')}
                          alt="chevron-right"
                        />
                        {/* <img src={ChevronRight} alt="chevron-right" /> */}
                      </RecoverPasswordLink>
                    </Link>
                  </ForgotPasswordLink>
                </BoxFormBody>
                <BoxFormAction>
                  <Btn
                    label="Sign in"
                    type="submit"
                    // variant="outlinePrimary"
                    handleClick={handleSubmit}
                    loading={loading}
                    className="btn"
                    rounded="lg"
                  />
                  {/* <button type="submit" className="btn">
                    {!loading && 'Sign in'}
                    {loading && <Spinner />}
                  </button> */}
                </BoxFormAction>
              </Form>
            </BoxFormWrap>
            <FormBtmNote>
              <Link href="/signin">
                Are you trying to log in to your user portal?
              </Link>
            </FormBtmNote>
          </BoxWrapOuter>
        </BoxFormSection>
      </MainPageDivision>
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

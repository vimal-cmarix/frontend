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
import Brand from '@components/atoms/Brand';
import styled from 'styled-components';
import { HeadingSmall } from '@assets/styles/typography';
import { Black, SizigiGrey } from '@assets/styles/colors';
// import { ChevronRight } from 'src/assets/images/chevron-right.svg';
// import hidePwdImg from '@src/assets/images/eye-off.svg';
// import showPwdImg from '@src/assets/images/eye-open.svg';
// import AuthHeaderB2B from '@components/organisms/authheaderB2B';
// import { Grid, Cell } from 'styled-css-grid';
// import FormBlock from '@components/organisms/FormBlock';
// import Btn from '@components/molecules/Btn';
import {
  // TopNav,
  // TopNavText,
  // TopNavButtonWrapper,
  // PageWrapper,
  // PageTitle,
  // SignInFormWrapper,
  // FieldWrapper,
  // SignInButtonWrapper,
  // Subtitle,
  // LikedinContainer,
  // ColRight,
  // ColLeft,
  // Quotes,
  // QuotesRetangle,
  // Container,
  // FormGroupMb8,
  // PageHeader,
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
  BoxFormWrap,
  FormBtmNote,
  Htext,
  BtnComing,
} from './style';

const ErrorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${HeadingSmall}
  color: ${Black};
  
  p {
    padding: 24px 0;
  }

  &.error404{
    background: #f8fbff;
    color: #1d242f;
    text-align:center;
    padding:30px 15px;
    // color: #313134;
    letter-spacing: 0;
    overflow-y: auto;
    @media only screen and (max-width:812px) and (orientation:landscape){
      justify-content: flex-start;
    }
    @media (max-width:767px){
      justify-content: flex-start;
      h1{
        width:130px;
        height: 44px;
        min-height: 44px;
      }
    }
    @media (max-width:480px){
      justify-content:center;
    }

    h2{
      font-weight: 700;
      font-size: 116px;
      line-height: 0.9;
      margin: 40px 0 50px;

      @media (max-width:992px){
        font-size: 80px;
      }
      @media (max-width:767px){
        font-size: 80px;
        margin-top:40px;
        margin-bottom:18px;
      }
      @media (max-width:480px){
        font-size: 14vw;
      }
    }
    p {
      font-size: 23px;
      line-height: 1.4;
      padding: 0;
      @media (max-width:767px){
        font-size: 16px;
      }
    }
    .goHomeBtn{
      background-color: #4FBBEF;
      color: #fff;
      font-size: 15px;
      line-height: 20px;
      border-radius: 7px;
      padding: 12px 25px;
      text-align:center;
      margin-top:70px;
      outline:none;
      transition:all 0.2s ease 0s;
      min-width:140px;
      box-sizing: border-box;
      font-weight: 700;
      letter-spacing: 0.5px;

      &:hover{
        background-color: #1c9ad6;
      }
      @media (max-width:767px){
        margin-top:45px;
        font-size: 14px;
        padding: 10px 15px;
        min-width: 134px;
      }
    }
    
  }
`;

const ComingSoonPage = () => {
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
      const { accessToken, profileId, userId } = res.data.data;
      localStorage.setItem('userDetail', JSON.stringify(res.data.data.user));
      // console.log('companyProfile', res.data.data.companyProfile);
      localStorage.setItem(
        'companyProfile',
        JSON.stringify(res.data.data.companyProfile),
      );
      localStorage.setItem(
        'companyAbout',
        JSON.stringify(res.data.data.company_about),
      );

      profileDispatch({
        type: 'CLEAR_PROFILE',
      });
      const info = jwtDecode(accessToken);
      if (info.isVerified) {
        login(accessToken, profileId, () => {
          Storage.rm('university');
          router.push('dashboard');
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
    router.push('/company/confirm-mail');
    //dispatch({ type: 'SET_MODAL_OPENED', component: VerificationModal });
  }

  async function handleSubmit(data) {
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
  const ComingSoon = () => (
    <>
      <ErrorWrapper className="error404 coming-soon-wrap">
        <Brand size="large" colorSchema="gray" />
        <Htext>
          <h2>Coming soon!</h2>
        </Htext>
        {/* <p>
        {statusCode
          ? `We couldn't find the page you're looking for`
          : 'An error occurred on client'}
      </p> */}
        <p>The page you are looking for is coming soon.</p>
        <Link href="/company/dashboard" className="goHomeBtn">
          <BtnComing>Go to my dashboard</BtnComing>
        </Link>
      </ErrorWrapper>
    </>
  );

  const content = ComingSoon();

  return (
    <Page
      title="Coming Soon"
      description="Coming Soon Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default ComingSoonPage;

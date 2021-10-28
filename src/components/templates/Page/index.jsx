import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import { createGlobalStyle } from 'styled-components';
import { useLocation } from 'react-router-dom';

import { useToast } from '@components/molecules/Notification';
import errorHandle from '@src/utils/error';

import ProfileContext from '@context/profileContext';
import PaymentContext from '@context/paymentContext';

import ProfileService from '@api/services/profile';
import PaymentService from '@api/services/payment';
import UserService from '@api/services/user';
import SignService from '@api/services/sign';

import PageHead from '@components/molecules/PageHead';
import NavBar from '@components/organisms/NavBar';
import TopBar from '@components/organisms/TopBar';
import { BgPage } from '@assets/styles/colors';
import { LoaderContainer } from '@assets/styles/helpers';
import Storage from '@utils/storage';
import Loader from '@components/atoms/Loader';
import { FREE, PREMIUM, PREMIUM_STUDENT } from '@modules/consts';
import AppContext from '@context/appContext';

const BackgroundGrey = createGlobalStyle`
  body {
    background: ${BgPage};
  }
`;

/**
 * Page Wrapper to store global page components
 */
const Page = ({
  children,
  nav,
  topbar,
  signUp,
  title,
  description,
  isAccountVerify,
  className,
  loadProfile,
  pageLoader,
  isPrivateView,
  isVerified,
  includePageHead,
  isViewerMode,
}) => {
  // const location = window.location.pathname;
  const { state, dispatch } = useContext(ProfileContext);
  const { state: paymentState, dispatch: paymentDispatch } = useContext(
    PaymentContext,
  );
  const { dispatch: appDispatch } = useContext(AppContext);

  const [profileId] = useState(
    cookie.get(`${process.env.PROJECT_NAME}-profileId`),
  );
  const [token] = useState(cookie.get(`${process.env.PROJECT_NAME}-token`));
  const [check, setCheck] = useState(0);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  async function verifyUniversity() {
    const localUniversity = Storage.get('university');
    const excludedPaths = ['/signin', '/signup'];
    if (excludedPaths.includes(window.location.pathname)) return false;

    if (!localUniversity) return false;

    const dataSend = { universityName: localUniversity };

    try {
      await UserService.sendUniversity(dataSend);
      Storage.add('hasUniversity');
      // router.push('/pricing');
    } catch (e) {
      showToast(errorHandle(e));
    } finally {
      Storage.rm('university');
    }

    return true;
  }

  async function updatePaymentContext() {
    await verifyUniversity();
    const response = await PaymentService.getUserPlanActive();
    const subscription = await SignService.getSubscription();
    const { data } = response;
    const isStudent =
      (
        (subscription.data.user.properties &&
          subscription.data.user.properties.discounts) ||
        []
      ).indexOf('student') > -1;
    const lastSubscriptionType = localStorage.getItem(
      `sizigi-lastSubscriptionStatus-${subscription.data.user.id}`,
    );

    const currentPlanType = data.rows?.[0]?.plan?.type ?? FREE;
    if (
      lastSubscriptionType &&
      lastSubscriptionType !== currentPlanType &&
      currentPlanType === FREE
    ) {
      // User went from a paid plan to FREE
      appDispatch({ type: 'SHOW_ALERT_BAR', data: 'subscription_ended' });
    }
    localStorage.setItem(
      `sizigi-lastSubscriptionStatus-${subscription.data.user.id}`,
      currentPlanType,
    );
    // REMOVED FROM BACKEND
    // paymentDispatch({
    //   type: 'SET_IS_TRIAL_ELIGIBLE',
    //   data: subscription.data.isTrialEligible,
    // });

    if (data.rows?.length && data.rows[0].plan.type === PREMIUM_STUDENT)
      paymentDispatch({ type: 'SET_IS_STUDENT_TRIAL', data: true });

    if (isStudent) paymentDispatch({ type: 'SET_IS_STUDENT', data: true });

    if (data.rows?.length === 0)
      paymentDispatch({ type: 'SET_PLAN', data: FREE });
    else
      paymentDispatch({
        type: 'SET_PLAN',
        data:
          data.rows[0].plan.type === PREMIUM_STUDENT
            ? PREMIUM
            : data.rows[0].plan.type,
      });

    if (data.rows && data.rows?.length && data.rows[0].isBillingCanceled)
      paymentDispatch({ type: 'SET_PLAN_CANCELED', data: true });

    if (data.rows && data.rows?.length)
      paymentDispatch({ type: 'SET_PLAN_DATA', data: data.rows[0] });
  }

  function handleData(data) {
    dispatch({ type: 'SET_PROFILE_DATA', data });
    updatePaymentContext();
  }

  function isSigninSignup() {
    return router.pathname === '/signin' || router.pathname === '/signup';
  }

  async function getProfile() {
    try {
      ProfileService.readCredentials();
      const res = await ProfileService.getProfile(profileId);

      handleData(res.data.data);
    } catch (e) {
      showToast(errorHandle(e));
    }
  }

  async function getUpdateProfile() {
    try {
      ProfileService.readCredentials();
      const res = await ProfileService.getProfile(profileId);
      const { data } = res;

      if (data.data.summary.asset === null) {
        handleData(data.data);
        Storage.rm('updateProfile');
        setChecked(true);
        return;
      }

      if (
        data.data.summary.asset &&
        data.data.summary.asset.thumbnail !== null
      ) {
        handleData(data.data);
        Storage.rm('updateProfile');
        setChecked(true);
      }
      if (data.data.summary.asset === null) {
        setChecked(true);
      }
    } catch (e) {
      showToast(errorHandle(e));
    }
  }

  if (loadProfile) {
    useEffect(() => {
      async function fetchData() {
        // console.log('-----------', window.location.pathname.split('/')[2]);
        if (window.location.pathname.split('/')[2] !== 'company') {
          await getProfile();
        }
        // await getProfile();
      }

      if (token && state && !state.id) fetchData();
      if (paymentState && !paymentState.userPlan) updatePaymentContext();
    }, [token]);

    useEffect(() => {
      const id = setInterval(() => {
        const hasUpdateProfile = Storage.get('updateProfile');
        if (!checked && hasUpdateProfile === 'true') {
          getUpdateProfile();
          setCheck(check + 1);
        }
      }, 5000);
      return () => clearInterval(id);
    }, [check]);
  }

  function verifyRedirect() {
    const redirect = Storage.get('redirect');
    const excludedPaths = ['/signin', '/signup'];

    if (excludedPaths.includes(window.location.pathname)) return false;

    if (redirect === '/') return Storage.rm('redirect');

    if (redirect) {
      Storage.rm('redirect');
      router.push(redirect);
    }

    return true;
  }

  useEffect(() => {
    verifyRedirect();
  }, []);

  return (
    <>
      {!isSigninSignup() && <BackgroundGrey />}
      {includePageHead && <PageHead title={title} description={description} />}
      <LoaderContainer show={pageLoader}>
        <Loader size="xlarge" />
      </LoaderContainer>
      {nav.show && (
        <NavBar
          isViewerMode={isViewerMode}
          colorSchema={nav.colorSchema}
          component={nav.component}
          isAccountVerify={isAccountVerify}
          className={className}
          privateView={isPrivateView}
          isVerified={isVerified}
          signUpBar={signUp}
        />
      )}
      {topbar.show && (
        <TopBar
          colorSchema={topbar.colorSchema}
          component={topbar.component}
          className={className}
        />
      )}

      {children}
    </>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element).isRequired,
    PropTypes.element.isRequired,
  ]),
  nav: PropTypes.shape({
    show: PropTypes.bool,
    component: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
    colorSchema: PropTypes.string,
  }),
  topbar: PropTypes.shape({
    show: PropTypes.bool,
    component: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
    colorSchema: PropTypes.string,
  }),
  signUp: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isAccountVerify: PropTypes.func,
  className: PropTypes.string,
  loadProfile: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  pageLoader: PropTypes.bool,
  isPrivateView: PropTypes.bool,
  isVerified: PropTypes.bool.isRequired,
  includePageHead: PropTypes.bool,
  isViewerMode: PropTypes.bool,
};

Page.defaultProps = {
  children: null,
  nav: {
    show: true,
    component: undefined,
    colorSchema: 'light',
  },
  topbar: {
    show: true,
    component: undefined,
    colorSchema: 'light',
  },
  signUp: false,
  isAccountVerify: () => null,
  className: '',
  loadProfile: true,
  pageLoader: false,
  isPrivateView: false,
  includePageHead: true,
  isViewerMode: false,
};

export default Page;

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  AlertBarButton,
  AlertBarContainer,
  AlertBarMargin,
  AlertBarText,
} from '@components/molecules/AlertBar/style';
import ProfileContext from '@context/profileContext';
import VerificationModal from '@components/templates/Modals/VerificateAccount';
import AppContext from '@context/appContext';
import { FREE } from '@modules/consts';
import PaymentContext from '@context/paymentContext';

const LOCAL_STORAGE_KEY = 'sizigi-alertBarDismiss';
const ALERT_TYPES = {
  EMAIL_VERIFICATION: 'email_verification',
  UPGRADE_PLAN: 'upgrade_plan',
  SUBSCRIPTION_ENDED: 'subscription_ended',
};

export default function AlertBar({ isVerified }) {
  const router = useRouter();
  const { state: profileState } = useContext(ProfileContext);
  const { state: paymentState } = useContext(PaymentContext);
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const [enabled, setEnabled] = useState(false);

  const isAnalyticsEnabled = useMemo(() => {
    return paymentState?.userPlan !== FREE;
  }, [paymentState]);

  const showAlertBar = () => {
    setEnabled(true);
  };

  const dismissAlertBar = key => {
    appDispatch({ type: 'SHOW_ALERT_BAR', data: '' });
    window.localStorage.setItem(
      `${LOCAL_STORAGE_KEY}-${profileState.id}-${key}`,
      Date.now().toString(),
    );
    setEnabled(false);
  };

  const isDismissed = key => {
    const strVal = window.localStorage.getItem(
      `${LOCAL_STORAGE_KEY}-${profileState.id}-${key}`,
    );
    return strVal && parseInt(strVal, 10) + 43200000 > Date.now(); // after 12 hours
  };

  const showEmailConfirmationModal = () => {
    appDispatch({ type: 'SET_MODAL_OPENED', component: VerificationModal });
    dismissAlertBar();
  };

  const goToPricing = () => {
    dismissAlertBar(ALERT_TYPES.UPGRADE_PLAN);
    router.push('/pricing');
  };

  useEffect(() => {
    if (appState.alertBar) showAlertBar();
    else setEnabled(false);
  }, [appState.alertBar]);

  useEffect(() => {
    if (profileState.alertBar) {
      showAlertBar();
    } else if (
      isVerified === false &&
      profileState.personalInfo?.firstName &&
      !isDismissed(ALERT_TYPES.EMAIL_VERIFICATION)
    ) {
      showAlertBar();
      appDispatch({
        type: 'SHOW_ALERT_BAR',
        data: ALERT_TYPES.EMAIL_VERIFICATION,
      });
    } else if (
      !isAnalyticsEnabled &&
      paymentState.isTrialEligible &&
      !isDismissed(ALERT_TYPES.UPGRADE_PLAN)
    ) {
      showAlertBar();
      appDispatch({ type: 'SHOW_ALERT_BAR', data: ALERT_TYPES.UPGRADE_PLAN });
    }
  }, [enabled, profileState.personalInfo, isVerified, isAnalyticsEnabled]);

  const AlertMessage = useMemo(() => {
    switch (appState.alertBar) {
      case ALERT_TYPES.EMAIL_VERIFICATION:
        return (
          <>
            <AlertBarText>
              {`Hey ${profileState.personalInfo.firstName}! we need you to confirm your email address.`}
            </AlertBarText>
            <AlertBarButton onClick={showEmailConfirmationModal}>
              Confirm email
            </AlertBarButton>
          </>
        );
      case ALERT_TYPES.UPGRADE_PLAN:
        return (
          <>
            <AlertBarText>
              You are on the free plan. Upgrade now and get a 14 days free
              trial!
            </AlertBarText>
            <AlertBarButton onClick={goToPricing}>Upgrade</AlertBarButton>
          </>
        );
      case ALERT_TYPES.SUBSCRIPTION_ENDED:
        return (
          <>
            <AlertBarText>
              Your subscription has ended. Analytics insights and custom
              presentations will not be available anymore.
            </AlertBarText>
            <AlertBarButton onClick={goToPricing}>
              Renew subscription
            </AlertBarButton>
          </>
        );
      default:
        return null;
    }
  }, [appState.alertBar]);

  return (
    <>
      <AlertBarMargin enabled={appState.alertBar && enabled} />
      <AlertBarContainer enabled={appState.alertBar && enabled}>
        {AlertMessage}
        <AlertBarButton onClick={() => dismissAlertBar(appState.alertBar)}>
          Dismiss
        </AlertBarButton>
      </AlertBarContainer>
    </>
  );
}

AlertBar.propTypes = {
  isVerified: PropTypes.bool.isRequired,
};

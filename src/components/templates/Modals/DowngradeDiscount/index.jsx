import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { FREE, PREMIUM_STUDENT, PREMIUM } from '@modules/consts';

import AppContext from '@context/appContext';

import Btn from '@components/molecules/Btn';
import DiscountAppliedModal from '@components/templates/Modals/DiscountApplied';
import { useToast } from '@components/molecules/Notification';

import PaymentService from '@api/services/payment';
import UserService from '@api/services/user';

import errorHandle, { braintreeErrorHandle } from '@utils/error';

import PaymentContext from '@context/paymentContext';
// import ProfileContext from '@context/profileContext';
import {
  Container,
  ActionHeader,
  ActionTitle,
  ActionDescription,
  ActionButtonsWrapper,
  ActionWarningText,
} from './style';
import ModalBody from '../ModalBody';

/**
 *  Dialog Modal
 */
const DowngradeDiscount = ({ cardsToInactivateAmount, onCancel }) => {
  // const { state: profileState } = useContext(ProfileContext);
  const { dispatch: paymentDispatch } = useContext(PaymentContext);
  const { dispatch: appDispatch } = useContext(AppContext);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState();

  const router = useRouter();
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  const { t: modalsT } = useTranslation('modals');

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function openModalDiscountAplied() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: DiscountAppliedModal,
      props: {
        cancelBackClick: true,
        title: 'Yay!!! Your discount has been applied',
        confirmText: 'Go back to my account',
        onConfirm: async () => {
          if (router.route !== '/billing') router.push('/billing');
          closeModal();
        },
      },
    });
  }

  async function subscriptionsDiscount() {
    setLoading(true);

    try {
      await PaymentService.subscriptionDiscount();

      openModalDiscountAplied();
    } catch (err) {
      const message =
        err.name === 'BraintreeError'
          ? braintreeErrorHandle(err)
          : errorHandle(err);

      setError(`Something went wrong. Contact support (Error: ${message})`);
    } finally {
      setLoading(false);
    }
  }

  async function reloadPrice() {
    try {
      const response = await PaymentService.getUserPlanActive();
      const { data } = response;

      if (data.rows?.length && data.rows[0].plan.type === PREMIUM_STUDENT)
        paymentDispatch({ type: 'SET_IS_STUDENT_TRIAL', data: true });

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
    } catch (err) {
      showToast(errorHandle(err));
    }
  }

  async function setBonusDowngrade() {
    setLoading(true);
    setError(null);

    try {
      await UserService.setBonusDowngrade();
      await subscriptionsDiscount();
      await reloadPrice();
    } catch (err) {
      showToast(errorHandle(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalBody
      isMobileFull
      isUnPadding
      fitContent
      isCancelBackClick
      onCancel={onCancel}
      rounded="xlg"
    >
      <Container>
        <ActionHeader>
          <ActionTitle>{modalsT('downgrade_sure.title')}</ActionTitle>
        </ActionHeader>

        <ActionDescription
          dangerouslySetInnerHTML={{
            __html: modalsT('downgrade_sure.description'),
          }}
        />

        {error && <ActionDescription hasError>{error}</ActionDescription>}

        <ActionButtonsWrapper>
          <Btn
            handleClick={onCancel}
            variant="outlineSecondary"
            label={modalsT('downgrade_sure.cancel')}
          />
          <Btn
            handleClick={setBonusDowngrade}
            variant="outlinePrimary"
            label={modalsT('downgrade_sure.confirm')}
            loading={loading}
          />
        </ActionButtonsWrapper>

        <ActionWarningText
          dangerouslySetInnerHTML={{
            __html: modalsT('downgrade_sure.warn_description').replace(
              '{INACTIVATE_AMOUNT}',
              String(cardsToInactivateAmount),
            ),
          }}
        />
      </Container>
    </ModalBody>
  );
};

DowngradeDiscount.propTypes = {
  cardsToInactivateAmount: PropTypes.string,
  onCancel: PropTypes.func,
};

DowngradeDiscount.defaultProps = {
  cardsToInactivateAmount: '',
  onCancel: undefined,
};

export default DowngradeDiscount;

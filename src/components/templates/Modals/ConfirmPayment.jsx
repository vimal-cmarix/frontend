import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as dateAndTime from 'date-and-time';
import * as ordinalDateAndTime from 'date-and-time/plugin/ordinal';

import AppContext from '@context/appContext';

import UnorderedList from '@components/molecules/UnorderedList';
import PaymentContext from '@context/paymentContext';
import Btn from '@components/molecules/Btn';
import BtnGroup from '@components/organisms/BtnGroup';
import {
  DefaultModalContent,
  Title,
  Body,
  SuccessResume,
  ButtonWrapperConfirmPayment,
} from './style';

dateAndTime.plugin(ordinalDateAndTime);

/**
 * Payment confirmation modal
 */
const ConfirmationPaymentModal = ({ type, handleConfirm, handleCancel }) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: paymentState } = useContext(PaymentContext);

  const { t: modalT } = useTranslation('modal_confirmation_payment');
  const { t: paymentT } = useTranslation('payment_form');

  const firstBilling = dateAndTime.format(
    dateAndTime.addDays(new Date(), 14),
    'MMM DDD, YYYY',
  );

  function closeModal() {
    appDispatch({
      type: 'SET_MODAL_CLOSED',
    });
  }

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened}>
      <Title
        dangerouslySetInnerHTML={{
          __html: modalT('resume').replace(
            '{PLAN}',
            `${modalT(`plan.${type}.title`)}`,
          ),
        }}
      />
      <Body>
        {/* <SuccessResume>
          <strong>By confirming you will unlock</strong>
          <UnorderedList
            size="medium"
            list={paymentT(`plans.${type}.features`, { returnObjects: true })}
          />
        </SuccessResume> */}
        {/* <br />
        {paymentState.isTrialEligible && (
          <SuccessResume>
            <strong>Free trial</strong>
            <br />
            <span>
              You are eligible for a 14 days free trial. Your card will not be
              charged until <strong>{firstBilling}</strong>
            </span>
          </SuccessResume>
        )} */}
        {!paymentState.isTrialEligible && (
          <SuccessResume>
            <strong>Your card will be charged immediately</strong>
          </SuccessResume>
        )}
        <ButtonWrapperConfirmPayment>
          <BtnGroup>
            <Btn
              label={modalT('cancel')}
              colorSchema="secondary"
              handleClick={() => {
                closeModal();
                handleCancel();
              }}
              variant="outlineSecondary"
            />
            <Btn
              label={
                paymentState.isTrialEligible
                  ? 'Start free trial'
                  : 'Pay with card'
              }
              handleClick={() => {
                closeModal();
                handleConfirm();
              }}
              variant="solidPrimary"
            />
          </BtnGroup>
        </ButtonWrapperConfirmPayment>
      </Body>
    </DefaultModalContent>
  );
};

ConfirmationPaymentModal.propTypes = {
  type: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ConfirmationPaymentModal;

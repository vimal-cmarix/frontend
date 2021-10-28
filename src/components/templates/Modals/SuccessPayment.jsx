import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Btn from '@components/molecules/Btn';

import AppContext from '@context/appContext';

import PaymentContext from '@context/paymentContext';
import Icon from '@components/atoms/Icon';
import {
  DefaultModalContent,
  Title,
  Body,
  CloseButton,
  StudentsWrapper,
  StudentsTitle,
  StudentsEffect,
  StudentsDesc1,
  StudentsButtonWrapper,
} from './style';

/**
 * Payment success alert modal
 */

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1).slice(0, s.indexOf(' '));
};

const SuccessPaymentModal = () => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: paymentState } = useContext(PaymentContext);

  const { t: modalT } = useTranslation('modal_success_payment');

  function closeModal() {
    appDispatch({
      type: 'SET_MODAL_CLOSED',
    });
    appDispatch({
      type: 'SET_PAYMENT_SUCCESS',
      props: {
        show: false,
        type: '',
      },
    });
  }

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened}>
      <CloseButton onClick={closeModal}>
        <Icon name="close" />
      </CloseButton>
      <Body>
        <StudentsWrapper>
          <StudentsTitle>
            <Title>
              {modalT('title').replace(
                '{PLAN}',
                capitalize(paymentState.planData?.plan.title),
              )}
            </Title>
            <StudentsEffect />
          </StudentsTitle>
          <StudentsDesc1>
            <span
              dangerouslySetInnerHTML={{
                __html: modalT('resume').replace(
                  '{PLAN}',
                  paymentState.userPlan,
                ),
              }}
            />
          </StudentsDesc1>
          <StudentsButtonWrapper onClick={closeModal}>
            <Btn label="Let's do This!" variant="solidPrimary" />
          </StudentsButtonWrapper>
        </StudentsWrapper>
      </Body>
    </DefaultModalContent>
  );
};

export default SuccessPaymentModal;

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import PaymentContext from '@context/paymentContext';
import { formatDate } from '@utils/general';
import Downgrade from '@components/templates/Modals/Downgrade';

import Btn from '@components/molecules/Btn';
import { Typography } from '@assets/styles/typo';
import {
  DefaultModalContent,
  Body,
  Description,
  LeftButtonWrapper,
  RightButtonWrapper,
  Actions,
} from './style';

const CancelPlan = () => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: paymentState } = useContext(PaymentContext);

  const { t: modalT } = useTranslation('modals');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: monthsT } = useTranslation('months');
  const { t: dateFormatesT } = useTranslation('dateFormates');

  async function deletePlan() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: () => <Downgrade />,
    });
  }

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened}>
      <Typography display="block" color="grey31" size="headline3">
        {modalT('cancel_plan.title')}
      </Typography>
      <Body>
        <Description>
          <span
            dangerouslySetInnerHTML={{
              __html: modalT('cancel_plan.description'),
            }}
          />
          <br />
          {modalT('cancel_plan.cancellation').replace(
            '{DATE}',
            formatDate(
              paymentState &&
                paymentState.planData &&
                paymentState.planData.nextBillingDate,
              monthsT,
              dateFormatesT('write'),
            ),
          )}
        </Description>
        <Actions>
          <LeftButtonWrapper>
            <Btn
              full
              type="button"
              label={buttonsT('keep_plan')}
              variant="outlinePrimary"
              handleClick={closeModal}
            />
          </LeftButtonWrapper>
          <RightButtonWrapper>
            <Btn
              full
              type="submit"
              label={buttonsT('cancel_subscription')}
              variant="solidPrimary"
              handleClick={deletePlan}
            />
          </RightButtonWrapper>
        </Actions>
      </Body>
    </DefaultModalContent>
  );
};

export default CancelPlan;

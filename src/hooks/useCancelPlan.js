/* eslint-disable no-use-before-define */
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';

import { useToast } from '@components/molecules/Notification';

import PaymentService from '@api/services/payment';
import BoardService from '@api/services/board';

import errorHandle, { braintreeErrorHandle } from '@utils/error';

// MODALS
import JobCardsSelectModal from '@components/templates/Modals/JobCardsSelect';
import DowngradeModal from '@components/templates/Modals/Downgrade';
import DowngradeDiscount from '@components/templates/Modals/DowngradeDiscount';

export default function useCancelPlan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { t: modalT } = useTranslation('modals');

  const { dispatch: appDispatch } = useContext(AppContext);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function openModalJobCardPendency(cardsToInactivateAmount) {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <JobCardsSelectModal
          pendencyAmount={cardsToInactivateAmount}
          onConfirm={handleOnSaveJobCardToInactivate}
          supportText={modalT('job_tracker_pendency.inactivate.support_text')}
          pendencyText={modalT(
            'job_tracker_pendency.inactivate.pendency_text',
          ).replace('{AMOUNT}', String(cardsToInactivateAmount))}
          abortText={modalT(
            'job_tracker_pendency.inactivate.abort_text_downgrade',
          )}
          type="inactivate"
        />
      ),
    });
  }

  function openModalInfoJobCardPendency(cardsToInactivateAmount) {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <DowngradeDiscount
          cardsToInactivateAmount={cardsToInactivateAmount}
          onCancel={() => openModalJobCardPendency(cardsToInactivateAmount)}
        />
      ),
    });
  }

  function methodsMapper(pendencyResponse) {
    const transformedPendencyResponse = pendencyResponse.reduce(
      (acc, pendency) => ({
        ...acc,
        [pendency.type]: pendency,
      }),
      {},
    );

    if (transformedPendencyResponse['downgrade-jobcard']) {
      const { pendencyAmount } = transformedPendencyResponse[
        'downgrade-jobcard'
      ];

      openModalInfoJobCardPendency(pendencyAmount);

      return;
    }

    openDowngradeModal();
  }

  async function handleOnSaveJobCardToInactivate(jobCardIds) {
    try {
      const { data: response } = await BoardService.batchDeleteJobCards(
        jobCardIds,
      );

      methodsMapper(response.data);
    } catch (err) {
      showToast(errorHandle(err));
    }
  }

  function openDowngradeModal() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: DowngradeModal,
      props: {
        cancelBackClick: true,
      },
    });
  }

  async function checkForPending(planIdData) {
    setLoading(true);

    try {
      if (Object.keys(planIdData).length > 0) {
        const { data: response } = await PaymentService.checkPendencie(
          planIdData,
        );

        methodsMapper(response.data);
      } else {
        methodsMapper([]);
      }
    } catch (err) {
      const message =
        err.name === 'BraintreeError'
          ? braintreeErrorHandle(err)
          : errorHandle(err);

      setError(
        `Something went wrong. Please check your information and submit again. If the problem persists please contact support (Error: ${message})`,
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    models: { loading, error },
    actions: { closeModal, checkForPending },
  };
}

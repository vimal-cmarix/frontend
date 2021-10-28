import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import PaymentContext from '@context/paymentContext';
import PaymentService from '@api/services/payment';

import Icon from '@components/atoms/Icon';
import SummaryCard from '@components/molecules/SummaryCard';

import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import DeleteDialog from '@components/molecules/DeleteDialog';
import { formatDate } from '@utils/general';

import { Typography } from '@assets/styles/typo';
import BtnGroup from '@components/organisms/BtnGroup';
import Btn from '@components/molecules/Btn';
import ModalBody from '../ModalBody';

import {
  Description,
  Actions,
  Row,
  SummaryCardWrapper,
  EditIconWrapper,
  EditArea,
} from '../style';

const Edit = () => {
  const { t: monthsT } = useTranslation('months');
  const { t: dateFormatesT } = useTranslation('dateFormates');
  const { t: modalT } = useTranslation('modals');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: billingT } = useTranslation('billing');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: paymentState, dispatch: paymentDispatch } = useContext(
    PaymentContext,
  );

  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [itemsToRemove, setTtemsToRemove] = useState([]);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const [showDeletAlert, setShowDelectAlert] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [cardValue, setcardValue] = useState();

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function resetAndcloseModal() {
    setTtemsToRemove([]);
    closeModal();
  }

  function fetchData() {
    if (
      paymentState &&
      paymentState.customer &&
      paymentState.customer.paymentMethods
    ) {
      setPayments(paymentState.customer.paymentMethods);
    }
  }

  async function save() {
    setLoading(true);

    try {
      if (
        paymentState &&
        paymentState.customer &&
        paymentState.customer.id &&
        itemsToRemove?.length > 0
      ) {
        const { id } = paymentState.customer;
        const methodIds = itemsToRemove;
        const response = await PaymentService.deletePaymentMethods(id, {
          paymentMethodIds: methodIds,
        });

        if (response.status === 200) {
          paymentDispatch({
            type: 'SET_PAYMENT_DATA_CUSTOMER',
            data: { ...paymentState.customer, paymentMethods: payments },
          });

          resetAndcloseModal();
          showSuccess(modalT('credit_card.success_edit'));
        }
      }

      setLoading(false);
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  const listRemoveItem = id => {
    setTtemsToRemove([...itemsToRemove, id]);
    setPayments(payments.filter(t => t.id !== id));
  };

  // eslint-disable-next-line consistent-return
  function handleRemoveCard(item) {
    if (item.inUse) {
      return showToast('This card is used for your subscription plan');
    }
    setcardValue(item);
    setShowDelectAlert(true);
  }

  const deleteCard = async () => {
    try {
      setDeleteLoading(true);
      listRemoveItem(cardValue.id);

      setDeleteLoading(false);
      setShowDelectAlert(false);
    } catch (err) {
      setDeleteLoading(false);
      showError(errorHandle(err));
    }
  };

  useEffect(() => {
    if (appState.modal.isOpened) {
      setTtemsToRemove([]);
      fetchData();
    }
  }, [appState.modal.isOpened]);

  return (
    <ModalBody onCancel={closeModal} headerTitle={modalT('credit_card.title')}>
      <Typography
        style={{ marginBottom: '24px' }}
        display="block"
        size="headline1"
        color="grey31"
      >
        {modalT('credit_card.edit_description')}
      </Typography>
      {showDeletAlert && (
        <DeleteDialog
          type="warning"
          title={modalT('credit_card.delete.title')}
          description={modalT('credit_card.delete.description')}
          warnDescription="You can add it again if you want"
          onCancel={() => setShowDelectAlert(false)}
          onConfirm={deleteCard}
          loading={deleteLoading}
        />
      )}
      <Row>
        {payments?.length > 0 ? (
          payments.map((item, index) => (
            <SummaryCardWrapper key={item.id}>
              <SummaryCard
                title={`${item.card.type} ${billingT('payment_info.ending')} ${
                  item.card.lastFour
                }`}
                lines={[
                  `Created: ${formatDate(
                    item.createdAt,
                    monthsT,
                    dateFormatesT('simple'),
                  )}`,
                ]}
                hasBorder={false}
                last={payments?.length === index + 1}
              />
              <EditArea>
                <EditIconWrapper
                  disabled={item.inUse}
                  onClick={() => handleRemoveCard(item)}
                >
                  <Icon name="delete_outline" />
                </EditIconWrapper>
              </EditArea>
            </SummaryCardWrapper>
          ))
        ) : (
          <Description>{modalT('credit_card.not_cards')}</Description>
        )}
      </Row>
      <Actions>
        <BtnGroup>
          <Btn
            startIcon="leftArrow"
            iconSize={12}
            label={buttonsT('back')}
            handleClick={resetAndcloseModal}
          />
        </BtnGroup>

        <BtnGroup>
          <Btn
            variant="outlinePrimary"
            label={buttonsT('save_close')}
            handleClick={save}
            type="submit"
            disabled={itemsToRemove?.length <= 0}
            loading={loading}
          />
        </BtnGroup>
      </Actions>
    </ModalBody>
  );
};

export default Edit;

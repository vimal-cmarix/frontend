import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import Icon from '@components/atoms/Icon';
import SummaryCard from '@components/molecules/SummaryCard';

import { formatDate, formateCurrency } from '@src/utils/general';

import { DefaultModalContent, Title, Body, CloseButton } from './style';

const Invoices = ({ disputes }) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const { t: billingT } = useTranslation('billing');
  const { t: monthsT } = useTranslation('months');
  const { t: dateFormatesT } = useTranslation('dateFormates');

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function invoiceLine(item) {
    const date = formatDate(item.createdAt, monthsT, dateFormatesT('simple'));
    const total = formateCurrency(item.total);

    return `${date} - ${total} - ${billingT(`status.${item.disputeStatus}`)}`;
  }

  function invoiceTitle(item) {
    const isAnalytics = item.lineItems?.length === 0;
    const product = isAnalytics
      ? item.subscription.plan.title
      : item.lineItems[0].product.name;
    const { quantity } = isAnalytics ? {} : item.lineItems[0];

    if (isAnalytics) return `${product}`;

    return `${quantity} X ${product}`;
  }

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened}>
      <Title>{billingT('disputes.title')}</Title>
      <CloseButton onClick={closeModal}>
        <Icon name="close" />
      </CloseButton>
      <Body>
        {disputes &&
          disputes.map(item => (
            <SummaryCard
              title={invoiceTitle(item)}
              lines={[invoiceLine(item)]}
              hasBorder={false}
              last={false}
            />
          ))}
      </Body>
    </DefaultModalContent>
  );
};

Invoices.propTypes = {
  disputes: PropTypes.arrayOf(PropTypes.object),
};

Invoices.defaultProps = {
  disputes: [],
};

export default Invoices;

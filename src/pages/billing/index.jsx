import React, { useContext, useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';
import * as dateAndTime from 'date-and-time';
import * as ordinalDateAndTime from 'date-and-time/plugin/ordinal';
import cookie from 'js-cookie';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import PaymentContext from '@context/paymentContext';
import PaymentService from '@api/services/payment';
import ProfileService from '@api/services/profile';
import SignService from '@api/services/sign';

import Page from '@components/templates/Page';
import LinkFooter from '@components/molecules/Link';
import AddCreditCard from '@components/templates/Modals/CreditCard/add';
import EditCreditCard from '@components/templates/Modals/CreditCard/edit';
import InvoicesModal from '@components/templates/Modals/Invoices';
import DisputesModal from '@components/templates/Modals/Disputes';
import ContactBilling from '@components/templates/Modals/ContactBilling';

import { SafeArea } from '@assets/styles/wrapper';
import { formatDate, formateCurrency } from '@src/utils/general';
import { sizes } from '@assets/styles/medias';
import { FREE, PREMIUM_STUDENT, PREMIUM } from '@modules/consts';
import { useToast, Action } from '@components/molecules/Notification';
import errorHandle from '@utils/error';
import UnorderedList from '@components/molecules/UnorderedList';

import { Primary } from '@assets/styles/colors';
import { Item } from '@components/molecules/UnorderedList/style';

import useCancelPlan from '@src/hooks/useCancelPlan';
import VerificationModal from '@components/templates/Modals/VerificateAccount';
import { logout } from '@utils/auth';

import {
  Title,
  Section,
  SectionTitle,
  SectionWrapper,
  SectionSubtitle,
  SectionText,
  LinkFooterWrapper,
  ContentWrapper,
} from './style';

dateAndTime.plugin(ordinalDateAndTime);

const Index = () => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);
  const { state: paymentState, dispatch: paymentDispatch } = useContext(
    PaymentContext,
  );

  const {
    actions: cancelPlanActions,
    models: cancelPlanModels,
  } = useCancelPlan();

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const { t } = useTranslation('billing');
  const { t: billingT } = useTranslation('billing');
  const { t: paymentT } = useTranslation('payment_form');
  const { t: monthsT } = useTranslation('months');
  const { t: dateFormatesT } = useTranslation('dateFormates');
  const [showAction, setShowAction] = useState({ show: false, text: '' });

  const [token, setToken] = useState(null);
  const [disputes, setDisputes] = useState([]);
  const [transactions, setTransactions] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);
  const [bigLoader, setBigLoader] = useState(true);
  const showToast = msg => toast.add(msg, 'error');

  const getTransactions = async () => {
    const response = await PaymentService.getTransactions();
    const disputesResponse = await PaymentService.getDisputes();
    const { data } = response;
    const { data: disputesData } = disputesResponse;
    setTransactions(data.rows);
    setDisputes(disputesData.rows);
    setBigLoader(false);
  };

  function openModal() {
    setShowAction({
      show: true,
      text: 'Are you sure want to delete this account ?',
    });
  }
  // function showVerificationModal() {
  //   setShowAction({ show: false, text: '' });
  //   dispatch({ type: 'SET_MODAL_OPENED', component: VerificationModal });
  // }
  async function updatePaymentContext() {
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
  }

  async function cancelPlan() {
    await cancelPlanActions.checkForPending({});
  }

  const handleData = async () => {
    try {
      const { firstName, lastName } = profileState.personalInfo;
      const { email, phone } = profileState.contactInfo;

      updatePaymentContext();

      const customerResponse = await PaymentService.createCustomer({
        provider: 'braintree',
        firstName,
        lastName,
        email,
        phone,
      });

      setToken(customerResponse.data.client.clientToken);

      paymentDispatch({
        type: 'SET_PAYMENT_DATA',
        data: customerResponse.data,
      });
    } catch (error) {
      showError(errorHandle(error));
    } finally {
      setTimeout(() => {
        setBigLoader(false);
      }, 700);
    }

    getTransactions();
  };

  useEffect(() => {
    if (profileState.id && !token) handleData();
  }, [profileState]);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function getGridSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 10;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 12;
    return 1;
  }

  function getLeftSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 3;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 3;
    return 0;
  }

  function getCellSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 6;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 8;
    return 0;
  }

  const cellSize = getCellSize();
  const gridSize = getGridSize();
  const leftSize = getLeftSize();

  const goToPricing = () => {
    Router.push('/pricing');
  };

  const addCreditCard = () => {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: AddCreditCard,
    });
  };

  const editCreditCard = () => {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: EditCreditCard,
    });
  };

  const invoicesModal = () => {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: InvoicesModal,
      props: { transactions },
    });
  };

  function openDisputesModal() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: DisputesModal,
      props: { disputes },
    });
  }

  function openContactModal() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ContactBilling,
    });
  }

  async function deleteAccount() {
    try {
      // SignService.readCredentials();
      const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);
      const response = await ProfileService.deleteProfile(profileId);
      if (response.status === 200) {
        toast.add(t('success'), 'success');
        logout();
      }
    } catch (e) {
      console.log('err---', e);
      showToast(errorHandle(e));
    }
  }

  function getCanceledText() {
    if (paymentState.isStudentTrial) {
      return billingT('plan_analytics.student_trial').replace(
        '{DATE_EXPIRE}',
        paymentState.planData &&
          formatDate(
            paymentState.planData?.nextBillingDate,
            monthsT,
            dateFormatesT('write'),
          ),
      );
    }

    return billingT('plan_analytics.canceled')
      .replace(
        '{DATE_CANCEL}',
        formatDate(
          paymentState.planData?.canceledAt,
          monthsT,
          dateFormatesT('write'),
        ),
      )
      .replace(
        '{DATE_AVAILABLE}',
        formatDate(
          paymentState.planData?.nextBillingDate,
          monthsT,
          dateFormatesT('ord'),
        ),
      );
  }

  function invoiceLine(item) {
    const isAnalytics = item.lineItems?.length === 0;
    const date = formatDate(item.createdAt, monthsT, dateFormatesT('simple'));
    const product = isAnalytics
      ? item.subscription.plan.title
      : item.lineItems[0].product.title;
    const { quantity } = isAnalytics ? {} : item.lineItems[0];
    const total = formateCurrency(item.total);

    if (isAnalytics) return `${date}: ${product} (${total}) `;

    return `${date}: ${quantity} X ${product} (${total})`;
  }

  const myPlan = useMemo(() => {
    if (!paymentState.userPlan) return {};
    return {
      title: paymentT(`plans.${paymentState.userPlan}.title`),
      features: paymentT(`plans.${paymentState.userPlan}.features`, {
        returnObjects: true,
      }),
      showUnsubscribeButton:
        paymentState.userPlan !== 'free' && !paymentState.canceled,
      nextBillingDate: paymentState.planData?.nextBillingDate,
      price: paymentState.planData?.total ?? 0,
      canceled: paymentState.canceled,
    };
  }, [paymentState]);

  return (
    <Page
      title={billingT('title')}
      description={billingT('description')}
      pageLoader={bigLoader}
      isVerified
    >
      <SafeArea>
        <Grid gap="24px" columns={gridSize}>
          <Cell width={cellSize} left={leftSize}>
            <Title>{billingT('title')}</Title>
            {showAction.show && (
              <Action
                type="warning"
                title="Delete!"
                description={showAction.text}
                onCancel={() => setShowAction({ show: false, text: '' })}
                onConfirm={() => deleteAccount()}
              />
            )}
            <ContentWrapper>
              <Grid
                gap="24px"
                columns={
                  screenWidth > parseInt(sizes.tabletPortrait, 10) ? 2 : 1
                }
              >
                <Cell>
                  <Section className="billingBox">
                    <SectionTitle>{billingT('my_plan')}</SectionTitle>
                    <SectionWrapper>
                      <SectionSubtitle>{myPlan.title}</SectionSubtitle>
                      <UnorderedList size="medium" list={myPlan.features || []}>
                        {paymentState.isStudent && (
                          <Item style={{ color: Primary }}>
                            50% off Student Pricing
                          </Item>
                        )}
                      </UnorderedList>
                      {myPlan.nextBillingDate && !myPlan.canceled && (
                        <>
                          <br />
                          <SectionSubtitle>Next billing</SectionSubtitle>
                          <SectionText>
                            {formateCurrency(myPlan.price)}
                            {' will be charged on '}
                            {dateAndTime.format(
                              new Date(myPlan.nextBillingDate),
                              'MMM DDD, YYYY',
                            )}
                          </SectionText>
                        </>
                      )}
                      {myPlan.canceled && (
                        <>
                          <br />
                          <SectionSubtitle>
                            {paymentState.isStudentTrial
                              ? 'Students trial'
                              : 'Subscription canceled'}
                          </SectionSubtitle>
                          <SectionText>{getCanceledText()}</SectionText>
                        </>
                      )}
                      <LinkFooterWrapper>
                        {myPlan.showUnsubscribeButton && (
                          <LinkFooter
                            label={
                              cancelPlanModels.loading
                                ? 'wait...'
                                : billingT('plan_analytics.link')
                            }
                            className="link_footer"
                            handleClick={cancelPlan}
                            size="small"
                            arrow="right"
                            arrowDirection="right"
                          />
                        )}
                        {paymentState.userPlan !== PREMIUM && (
                          <LinkFooter
                            label={billingT('plan_analytics.upgrade')}
                            className="link_footer"
                            handleClick={goToPricing}
                            size="small"
                            arrow="right"
                            arrowDirection="right"
                          />
                        )}
                        <LinkFooter
                          label={billingT('plan_analytics.delete')}
                          className="link_footer"
                          handleClick={openModal}
                          size="small"
                          arrow="right"
                          arrowDirection="right"
                        />
                      </LinkFooterWrapper>
                    </SectionWrapper>
                  </Section>
                </Cell>
                <Cell>
                  <Section className="billingBox">
                    <SectionTitle>
                      {billingT('payment_info.title')}
                    </SectionTitle>
                    {paymentState &&
                    paymentState.customer &&
                    paymentState.customer.paymentMethods?.length > 0 ? (
                      <SectionWrapper>
                        <UnorderedList
                          size="medium"
                          list={paymentState.customer.paymentMethods.map(
                            item => {
                              return `${item.card.type} ${billingT(
                                'payment_info.ending',
                              )} ${item.card.lastFour}`;
                            },
                          )}
                        />
                        <LinkFooterWrapper>
                          <LinkFooter
                            label={billingT('payment_info.add')}
                            className="link_footer"
                            handleClick={addCreditCard}
                            size="small"
                            arrow="right"
                            arrowDirection="right"
                          />
                          <LinkFooter
                            label={billingT('payment_info.edit')}
                            className="link_footer"
                            handleClick={editCreditCard}
                            size="small"
                            arrow="right"
                            arrowDirection="right"
                          />
                        </LinkFooterWrapper>
                      </SectionWrapper>
                    ) : (
                      <SectionWrapper>
                        <SectionSubtitle>
                          {billingT('payment_info.no_payments.title')}
                        </SectionSubtitle>
                        <SectionText>
                          {billingT('payment_info.no_payments.description')}
                        </SectionText>
                        <LinkFooterWrapper>
                          <LinkFooter
                            label={billingT('payment_info.add')}
                            className="link_footer"
                            handleClick={addCreditCard}
                            size="small"
                            arrow="right"
                            arrowDirection="right"
                          />
                        </LinkFooterWrapper>
                      </SectionWrapper>
                    )}
                  </Section>
                </Cell>
                <Cell>
                  <Section className="billingBox">
                    <SectionTitle>{billingT('invoices.title')}</SectionTitle>
                    {transactions && transactions?.length > 0 ? (
                      <SectionWrapper>
                        <UnorderedList
                          size="medium"
                          list={transactions.slice(0, 4).map(item => {
                            return invoiceLine(item);
                          })}
                        />
                        {transactions?.length > 4 && (
                          <LinkFooterWrapper>
                            <LinkFooter
                              label={billingT('invoices.view')}
                              className="link_footer"
                              handleClick={invoicesModal}
                              size="small"
                              arrow="right"
                              arrowDirection="right"
                            />
                          </LinkFooterWrapper>
                        )}
                      </SectionWrapper>
                    ) : (
                      <SectionWrapper>
                        <SectionSubtitle>
                          {billingT('invoices.no_invoices.title')}
                        </SectionSubtitle>
                        <SectionText>
                          {billingT('invoices.no_invoices.description')}
                        </SectionText>
                      </SectionWrapper>
                    )}
                  </Section>
                </Cell>
                <Cell>
                  <Section className="billingBox">
                    <SectionTitle>{billingT('disputes.title')}</SectionTitle>
                    <SectionWrapper>
                      {!disputes?.length ? (
                        <>
                          <SectionSubtitle>
                            {billingT('disputes.no_disputes.title')}
                          </SectionSubtitle>
                          <SectionText>
                            {billingT('disputes.no_disputes.description')}
                          </SectionText>
                        </>
                      ) : (
                        <UnorderedList
                          size="medium"
                          list={disputes.slice(0, 4).map(item => {
                            return invoiceLine(item);
                          })}
                        />
                      )}
                      <LinkFooterWrapper>
                        {!!disputes?.length && (
                          <LinkFooter
                            label={billingT('disputes.view')}
                            className="link_footer"
                            handleClick={openDisputesModal}
                            size="small"
                            arrow="right"
                            arrowDirection="right"
                          />
                        )}
                        <LinkFooter
                          label={billingT('disputes.contact')}
                          className="link_footer"
                          handleClick={openContactModal}
                          size="small"
                          arrow="right"
                          arrowDirection="right"
                        />
                      </LinkFooterWrapper>
                    </SectionWrapper>
                  </Section>
                </Cell>
              </Grid>
            </ContentWrapper>
          </Cell>
        </Grid>
      </SafeArea>
    </Page>
  );
};

export default Index;

import React, { useContext, useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';

import PaymentService from '@api/services/payment';
import errorHandle from '@utils/error';
import { useToast } from '@components/molecules/Notification';
import { SafeArea } from '@assets/styles/wrapper';
import { sizes } from '@assets/styles/medias';
import Page from '@components/templates/Page';
import AppContext from '@context/appContext';
import LinkBack from '@components/molecules/Link';
import ProfileContext from '@context/profileContext';
import PaymentContext from '@context/paymentContext';
import PaymentForm from '@components/organisms/PaymentForm';
import { withAuthSync } from '@src/utils/auth';

import { serverRedirect } from '@utils/general';
import { Title } from './style';

const Index = () => {
  const { state: appState } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);
  const { dispatch: paymentDispatch } = useContext(PaymentContext);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');

  const router = useRouter();

  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(null);
  const [subsOptions, setSubsOptions] = useState(null);
  const [bigLoader, setBigLoader] = useState(true);

  const { t: checkoutT } = useTranslation('checkout');
  const { t: buttonT } = useTranslation('buttons');

  async function handleData() {
    try {
      // const subsResponse = await PaymentService.getUserPlanActive();
      // if (subsResponse.data.rows?.length) return router.push('/pricing');

      const plansResponse = await PaymentService.getPlans();

      setSubsOptions(plansResponse.data.rows);

      const { firstName, lastName } = profileState.personalInfo;
      const { email, phone } = profileState.contactInfo;

      const customerResponse = await PaymentService.createCustomer({
        provider: 'braintree',
        firstName,
        lastName,
        email,
        phone,
      });

      setToken(customerResponse.data.client.clientToken);
      setCustomer(customerResponse.data.customer);

      return paymentDispatch({
        type: 'SET_PAYMENT_DATA',
        data: customerResponse.data,
      });
    } catch (error) {
      return showError(errorHandle(error));
    } finally {
      setTimeout(() => {
        setBigLoader(false);
      }, 700);
    }
  }

  useEffect(() => {
    if (profileState.personalInfo) {
      handleData();
    }
  }, [profileState.personalInfo]);

  const [screenWidth, setScreenWidth] = useState(null);
  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function getGridSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 10;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 12;
    return 1;
  }

  function getLeftSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 4;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 3;
    return 0;
  }

  function getCellSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 4;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 8;
    return 0;
  }

  const cellSize = getCellSize();
  const gridSize = getGridSize();
  const leftSize = getLeftSize();

  return (
    <Page
      title="Checkout"
      description=""
      pageLoader={bigLoader}
      // nav={{ show: navBottom }}
      isVerified
    >
      <SafeArea>
        <Grid columns={gridSize}>
          <Cell width={cellSize} left={leftSize}>
            <LinkBack
              label={buttonT('back')}
              handleClick={() => {
                router.back();
              }}
              size="medium"
              arrow="left"
            />
            <Title>{checkoutT('title')}</Title>
            {token && customer && (
              <PaymentForm
                options={subsOptions}
                token={token}
                customer={customer}
              />
            )}
          </Cell>
        </Grid>
      </SafeArea>
    </Page>
  );
};

Index.getInitialProps = async ctx => {
  const { query } = ctx;
  const types = ['starter', 'premium'];

  function redirect() {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/pricing');
    } else {
      Router.push('/pricing');
    }
  }

  // TODO: verify if user has the plan of analytics, if has redirect();
  if (!types.includes(query.type)) redirect();

  return { type: query.type };
};

export default withAuthSync(Index);

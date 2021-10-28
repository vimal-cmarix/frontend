import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import withGA from 'next-ga';
import TagManager from 'react-gtm-module';
import { I18nextProvider } from 'react-i18next';
import GlobalStyles from '@components/globalStyles';
import addYupCustomMethods from '@utils/yup';
import { AppProvider } from '@context/appContext';
import { ProfileProvider } from '@context/profileContext';
import { PaymentProvider } from '@context/paymentContext';
import i18n from '@src/i18n';
import { withToastProvider } from '@components/molecules/Notification';

import Modal from '@components/organisms/Modal';
import TourProfile from '@components/organisms/TourProfile';
import TourEPortfolio from '@components/organisms/TourEPortfolio';

// Plugin Styles
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
// import 'https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-anchor-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Head from 'next/head';

const tagManagerArgs = {
  gtmId: process.env.GTM_ID,
};

const Sizigi = ({ Component, pageProps }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      TagManager.initialize(tagManagerArgs);
      window.GA_INITIALIZED = true;
    }
  }, []);

  addYupCustomMethods();

  return (
    <>
      <GlobalStyles />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=no"
        />
      </Head>
      <I18nextProvider i18n={i18n}>
        <PaymentProvider>
          <ProfileProvider>
            <AppProvider>
              <Component {...pageProps} />
              <Modal />
              <TourProfile />
              <TourEPortfolio />
            </AppProvider>
          </ProfileProvider>
        </PaymentProvider>
      </I18nextProvider>
    </>
  );
};

Sizigi.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withGA(process.env.GA_ID, Router)(withToastProvider(Sizigi));

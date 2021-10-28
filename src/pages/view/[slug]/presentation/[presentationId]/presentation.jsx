import React, { useState, useEffect, useContext } from 'react';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import ProfileContext from '@context/profileContext';

import Storage from '@utils/storage';
import Page from '@components/templates/Page';
import View from '@components/templates/Presentation/view';
import { useToast } from '@components/molecules/Notification';
import ScrollDownProfile from '@components/organisms/ScrollDownProfile';

import errorHandle from '@src/utils/error';

import { SafeArea } from '@assets/styles/wrapper';
import { serverRedirect } from '@utils/general';

const Presentation = ({ meta }) => {
  const { dispatch, state: profileState } = useContext(ProfileContext);

  const [bigLoading, setBigLoading] = useState(true);
  const [userCode, setUserCode] = useState(false);
  const [presentationData, setPresentationData] = useState(null);
  const [navBottom, setNavBottom] = useState(true);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');

  const { t: presentationT } = useTranslation('pitch_steps');

  async function getPresentation() {
    try {
      setPresentationData(meta.content);
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setTimeout(() => {
        setBigLoading(false);
      }, 700);
    }
  }

  async function getProfile() {
    try {
      const data = meta.metadata;

      dispatch({
        type: 'SET_PROFILE_DATA',
        data: {
          ...data,
          accessToken: meta.share.accessToken,
        },
      });
    } catch (e) {
      showError(errorHandle(e));
      setBigLoading(false);
      Storage.rm(`userCode`);
    }
  }

  async function fetchData() {
    await getProfile();
  }

  if (process.browser) {
    useEffect(() => setUserCode(Storage.get(`userCode`)), [window]);
  }

  useEffect(() => {
    const { accessToken } = profileState;
    if (accessToken && !presentationData) getPresentation();
  }, [profileState.accessToken]);

  useEffect(() => {
    if (userCode) {
      fetchData();
    }
  }, [userCode]);

  return (
    <Page
      title={presentationT(`step4.title`)}
      description={presentationT(`step4.description`)}
      className="view-profile"
      pageLoader={!userCode || bigLoading}
      loadProfile={false}
      meta={meta}
      nav={{
        show: navBottom,
        component:
          userCode && !bigLoading ? (
            <ScrollDownProfile type="pitch" />
          ) : (
            undefined
          ),
      }}
      isPrivateView
      isVerified
    >
      <SafeArea>
        {presentationData && <View presentation={presentationData} />}
      </SafeArea>
    </Page>
  );
};

Presentation.propTypes = {
  meta: PropTypes.objectOf().isRequired,
};

Presentation.getInitialProps = async ctx => {
  const { query } = ctx;
  const { id } = query;

  if (!id) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/');
    } else {
      Router.push('/');
    }
  }

  return {};
};

export default Presentation;

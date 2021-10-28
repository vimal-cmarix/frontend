import React, { useState, useEffect, useContext } from 'react';
import Router, { useRouter } from 'next/router';

import ProfileContext from '@context/profileContext';
import ShareService from '@api/services/share';
import Loader from '@components/atoms/Loader';

import { useToast } from '@components/molecules/Notification';
import errorHandle from '@src/utils/error';

import { serverRedirect } from '@utils/general';
import PageSummary from '../../profile/summary';
import { LoaderWrapper } from './style';

const Summary = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState(true);
  const { dispatch, state: profileState } = useContext(ProfileContext);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  async function getProfile() {
    setLoading(true);
    try {
      const res = await ShareService.getShare(slug, null);
      const { data } = res.data;
      const { content } = data;
      dispatch({
        type: 'SET_PROFILE_DATA',
        data: { ...content, accessToken: data.accessToken },
      });
      setLoading(false);
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!profileState.id) getProfile();
    else setLoading(false);
  }, [profileState]);

  return (
    <>
      {loading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <PageSummary isPrivateLink />
      )}
    </>
  );
};

Summary.getInitialProps = async ctx => {
  const { query } = ctx;
  const { slug } = query;

  if (!slug) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/');
    } else {
      Router.push('/');
    }
  }

  return {};
};

export default Summary;

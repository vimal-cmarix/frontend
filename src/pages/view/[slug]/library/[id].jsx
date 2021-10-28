import React, { useState, useEffect, useContext } from 'react';
import Router, { useRouter } from 'next/router';

import ProfileContext from '@context/profileContext';
import ShareService from '@api/services/share';
import Storage from '@utils/storage';
import Loader from '@components/atoms/Loader';

import { useToast } from '@components/molecules/Notification';
import errorHandle from '@src/utils/error';

import { serverRedirect } from '@utils/general';
import PagePortfolio from '../../../library/post/[id]';
import { LoaderWrapper } from '../style';

const Summary = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState(true);
  const [userCode, setUserCode] = useState(false);
  const [userSlug, setUserSlug] = useState(false);
  const { dispatch, state: profileState } = useContext(ProfileContext);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  if (process.browser) {
    useEffect(() => {
      setUserCode(Storage.get('userCode'));
      setUserSlug(Storage.get('userSlug'));
    }, [window]);
  }

  async function getProfile() {
    setLoading(true);
    try {
      const res = await ShareService.getShare(
        slug,
        encodeURIComponent(userCode),
      );
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
    if (userSlug !== false) {
      if (userSlug === slug) {
        if (!profileState.id) getProfile();
        else setLoading(false);
      } else {
        Storage.rm('userCode');
        Storage.rm('userSlug');
        Router.push(`/view/${slug}`);
      }
    }
  }, [profileState, userCode, userSlug]);

  return (
    <>
      {loading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <PagePortfolio isPrivateLink={!!true} />
      )}
    </>
  );
};

Summary.getInitialProps = async ctx => {
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

export default Summary;

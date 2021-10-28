import React, { useState, useEffect, useContext } from 'react';
import Router, { useRouter } from 'next/router';

import ProfileContext from '@context/profileContext';
import ShareService from '@api/services/share';
import Storage from '@utils/storage';
import Loader from '@components/atoms/Loader';

import { useToast } from '@components/molecules/Notification';
import errorHandle from '@src/utils/error';

import PagePortfolio from '@pages/library/post/[id]';
import { LoaderWrapper } from '@pages/view/[slug]/style';
import { serverRedirect } from '@utils/general';

const Summary = () => {
  const router = useRouter();
  const { slug, presentationId } = router.query;

  const [loading, setLoading] = useState(true);
  const [userCode, setUserCode] = useState(false);
  const [userSlug, setUserSlug] = useState(false);
  const { dispatch, state: profileState } = useContext(ProfileContext);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  if (process.browser) {
    useEffect(() => {
      setUserCode(
        Storage.get(presentationId ? `userCode_${presentationId}` : 'userCode'),
      );
      setUserSlug(Storage.get('userSlug'));
    }, [window]);
  }

  async function getProfile() {
    setLoading(true);
    try {
      if (!userCode) return;
      const res = await ShareService[
        presentationId !== undefined ? 'getSharePresentation' : 'getShare'
      ](
        presentationId !== undefined ? presentationId : slug,
        encodeURIComponent(userCode),
      );
      const { data } = res.data;
      const { content, metadata } = data;
      const profileData = presentationId !== undefined ? metadata : content;
      dispatch({
        type: 'SET_PROFILE_DATA',
        data: { ...profileData, accessToken: data.accessToken },
      });
      setLoading(false);
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  useEffect(() => {
    if (presentationId) {
      if (!profileState.id) getProfile();
      else setLoading(false);
    }

    if (!presentationId && userSlug !== false) {
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
        <PagePortfolio isPrivateLink={!!true} signUpBar={!!true} />
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

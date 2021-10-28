import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

import Page from '@components/templates/Page';
import View from '@components/templates/Post/view';

import { SafeArea } from '@assets/styles/wrapper';
import { serverRedirect } from '@utils/general';

const Post = ({ meta }) => {
  const profileData = meta.profile;

  return (
    <Page
      title={meta.title}
      description={meta.description || meta.defaultDescription}
      nav={{ show: true, component: [] }}
      className="view-profile"
      topbar={{ show: true }}
      loadProfile={false}
      pageLoader={false}
      meta={meta}
      isPrivateView
      isVerified
      signUp
    >
      <SafeArea>{meta && <View post={meta} profile={profileData} />}</SafeArea>
    </Page>
  );
};

Post.propTypes = {
  meta: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

Post.getInitialProps = async ctx => {
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

export default Post;

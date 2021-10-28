import React from 'react';
import Router from 'next/router';
import PagePortfolio from '@pages/library/post/[id]';
import { serverRedirect } from '@utils/general';

const Library = () => {
  return <PagePortfolio isPrivateLink={false} />;
};

Library.getInitialProps = async ctx => {
  const { query } = ctx;
  const { id } = query;

  if (!id) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/presentation');
    } else {
      Router.push('/');
    }
  }

  return {};
};

export default Library;

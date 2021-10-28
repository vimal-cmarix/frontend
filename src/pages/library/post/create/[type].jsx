import React from 'react';
import Router, { useRouter } from 'next/router';

import { withAuthSync } from '@src/utils/auth';
import Video from '@components/templates/Post/Video';
import Document from '@components/templates/Post/Document';
import Blog from '@components/templates/Post/Blog';
import PostLink from '@components/templates/Post/Link';
import { serverRedirect } from '@utils/general';

const Create = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      {type === 'document' && <Document action="create" />}
      {type === 'video' && <Video action="create" />}
      {type === 'blog' && <Blog action="create" />}
      {type === 'link' && <PostLink action="create" />}
    </>
  );
};

Create.getInitialProps = async ctx => {
  const { query } = ctx;
  const types = ['video', 'link', 'blog', 'document'];
  const { type } = query;

  if (!types.includes(type)) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, `/library`);
    } else {
      Router.push('/library');
    }
  }

  return {};
};

export default withAuthSync(Create, true);

import React from 'react';
import Router, { useRouter } from 'next/router';

import { withAuthSync } from '@src/utils/auth';

import Document from '@components/templates/Post/Document';
import Video from '@components/templates/Post/Video';
import Blog from '@components/templates/Post/Blog';
import PostLink from '@components/templates/Post/Link';
import { serverRedirect } from '@utils/general';

const Edit = () => {
  const router = useRouter();
  const { slug } = router.query;
  const type = slug[0];
  const id = slug[1];

  return (
    <>
      {type === 'document' && <Document action="edit" postId={id} />}
      {type === 'video' && <Video action="edit" postId={id} />}
      {type === 'blog' && <Blog action="edit" postId={id} />}
      {type === 'link' && <PostLink action="edit" postId={id} />}
    </>
  );
};

Edit.getInitialProps = async ctx => {
  const { query } = ctx;
  const types = ['video', 'link', 'blog', 'document'];
  const { slug } = query;
  const type = slug[0];
  const id = slug[1];

  if (!types.includes(type) || id === undefined) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/library');
    } else {
      Router.push('/library');
    }
  }

  return {};
};

export default withAuthSync(Edit, true);

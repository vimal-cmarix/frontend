import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import ShareService from '@api/services/share';
import Storage from '@utils/storage';
import Loader from '@components/atoms/Loader';
import PageHead from '@components/molecules/PageHead';
import getCoverImage from '@utils/portfolio';
import { getCanonicalUrl, serverRedirect } from '@utils/general';

import Post from './post';

import { LoaderWrapper } from '../../style';

const View = ({ postId, content }) => {
  const [userCode, setUserCode] = useState(false);

  if (process.browser) {
    useEffect(() => {
      setTimeout(() => {
        const code = Storage.get(`userCode_${postId}`);
        setUserCode(code);
      }, 100);
    }, [window]);
  }

  const component = useMemo(() => {
    if (userCode === false)
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    return <Post meta={content} />;
  }, [content, userCode]);

  return (
    <>
      <PageHead
        title={content.title}
        description={content.description || content.defaultDescription}
        image={getCoverImage(content)}
        canonical={content.canonical}
        // imageHeight={content.image?.height}
        // imageWidth={content.image?.width}
        type={content.type}
        video={
          content.type === 'media' && content.asset.type === 'video'
            ? content.asset.url
            : null
        }
      />
      {component}
    </>
  );
};

View.propTypes = {
  postId: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.object]),
};

View.defaultProps = {
  postId: undefined,
  content: {},
};

View.getInitialProps = async ctx => {
  const { query } = ctx;
  const { postId, p } = query;

  if (!postId) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/');
    } else {
      Router.push('/');
    }
  }

  const { data } = await ShareService.getSharePortfolio(postId);
  const { content } = data.data;

  content.path = ctx.asPath;
  content.canonical = getCanonicalUrl(ctx);

  return {
    postId,
    p,
    content,
  };
};

export default View;

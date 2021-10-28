import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import ShareService from '@api/services/share';
import PresentationService from '@api/services/presentation';
import Storage from '@utils/storage';
import Loader from '@components/atoms/Loader';
import PageHead from '@components/molecules/PageHead';
import { getCanonicalUrl } from '@utils/general';
import Unavailable from '@components/templates/Unavailable';
import Verify from './verify';

import { LoaderWrapper } from './style';
import Presentation from './presentation/[presentationId]/presentation';
import Profile from './profile';

function formatContent(content, thumbnail, url) {
  return {
    ...content,
    cover: {
      ...content.cover,
      video: { ...content.cover.video, thumbnail, url },
    },
  };
}

const Share = ({ type, shortUrl, error }) => {
  const [userCode, setUserCode] = useState(false);
  const [userMeta, setUserMeta] = useState({});

  useEffect(() => {
    const load = async () => {
      const code = Storage.get(`userCode`);

      try {
        if (code || type) {
          const { data: share } = await ShareService.getShareJobCardValid(
            shortUrl,
            code || '',
          );

          if (typeof share === 'string') throw new Error('');
          if (type === 'profile') {
            Router.push(`/view/${share.data.content.slug}/${shortUrl}`);
            return;
          }

          const { data: metadata } = await PresentationService.getMeta(
            share.data.objectId,
          );
          if (!code) Storage.add('userCode', '12345');
          setUserCode(code || ' ');
          userMeta.share = share.data;
          setUserMeta({
            ...share.data,
            ...userMeta,
            content: formatContent(
              share.data.content,
              metadata.meta.image.url,
              metadata.meta.video.url,
            ),
          });
        } else throw new Error('');
      } catch (e) {
        setUserCode(null);
      }
    };
    load();
  }, []);

  const component = useMemo(() => {
    if (error) return <Unavailable />;
    if (userCode === false)
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );

    if (userCode === null) {
      return <Verify type="presentation" />;
    }
    return <Presentation meta={userMeta} />;
  }, [userMeta, userCode]);

  return (
    <>
      <PageHead
        title={userMeta.title || 'Share'}
        description={userMeta.description || userMeta.defaultDescription}
        image={userMeta.image?.url}
        imageHeight={userMeta.image?.height}
        imageWidth={userMeta.image?.width}
        type={userMeta.type}
        video={userMeta.video?.url}
        canonical={userMeta.canonical}
      />
      {component}
    </>
  );
};

Share.propTypes = {
  type: PropTypes.string,
  shortUrl: PropTypes.string,
  error: PropTypes.bool,
};

Share.defaultProps = {
  type: '',
  shortUrl: '',
  error: false,
};

Share.getInitialProps = async ctx => {
  const { query } = ctx;
  const { slug } = query;
  let dataJob = { data: {} };
  try {
    dataJob = await ShareService.getShareJobCard(slug);

    dataJob = dataJob.data;
    if (typeof dataJob === 'string') {
      dataJob = { data: {} };
    }
  } catch (error) {
    //
  }
  const { objectType } = dataJob.data;

  return {
    type: objectType,
    shortUrl: slug,
  };
};

export default Share;

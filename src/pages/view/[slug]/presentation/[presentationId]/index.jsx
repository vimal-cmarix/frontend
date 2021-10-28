import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import PresentationService from '@api/services/presentation';
import Storage from '@utils/storage';
import Loader from '@components/atoms/Loader';
import PageHead from '@components/molecules/PageHead';
import { getCanonicalUrl, serverRedirect } from '@utils/general';
import Verify from '../../verify';
import Presentation from './presentation';

import { LoaderWrapper } from '../../style';

const View = ({ presentationId, p, meta }) => {
  const [userCode, setUserCode] = useState(false);

  if (process.browser) {
    useEffect(() => {
      setTimeout(() => {
        const code = Storage.get(`userCode_${presentationId}`);
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

    if (meta.public) {
      Storage.add(`userCode_${presentationId}`, 'public');
      return <Presentation meta={meta} />;
    }

    if (p) {
      Storage.add(`userCode_${presentationId}`, p);
      return <Presentation meta={meta} />;
    }

    if (userCode === null) {
      return <Verify type="presentation" />;
    }

    return <Presentation meta={meta} />;
  }, [meta, userCode]);

  return (
    <>
      <PageHead
        title={meta.title}
        description={meta.description || meta.defaultDescription}
        image={meta.image?.url}
        imageHeight={meta.image?.height}
        imageWidth={meta.image?.width}
        type={meta.type}
        video={meta.video?.url}
        canonical={meta.canonical}
      />
      {component}
    </>
  );
};

View.propTypes = {
  p: PropTypes.string,
  presentationId: PropTypes.string,
  meta: PropTypes.objectOf(),
};

View.defaultProps = {
  presentationId: undefined,
  p: undefined,
  meta: {},
};

View.getInitialProps = async ctx => {
  const { query } = ctx;
  const { presentationId, p } = query;

  if (!presentationId) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/');
    } else {
      Router.push('/');
    }
  }

  const { data } = await PresentationService.getMeta(presentationId);
  const { meta } = data;
  meta.canonical = getCanonicalUrl(ctx);

  return {
    presentationId,
    p,
    meta,
  };
};

export default View;

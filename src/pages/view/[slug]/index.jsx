import ProfileService from '@api/services/profile';
import PageHead from '@components/molecules/PageHead';
import PropTypes from 'prop-types';
import React from 'react';
import Profile from '../../profile';

const View = ({ meta }) => {
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
      />
      <Profile previewMode />
    </>
  );
};

View.propTypes = {
  meta: PropTypes.objectOf().isRequired,
};

View.getInitialProps = async ctx => {
  const { slug } = ctx.query;
  const { data } = await ProfileService.getProfileMeta(slug);
  return {
    ...data,
  };
};

export default View;

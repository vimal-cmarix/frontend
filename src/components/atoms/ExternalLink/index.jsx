import React from 'react';
import PropTypes from 'prop-types';

import { CustomLink } from './styles';

const ExternalLink = ({ url, decoration, ...rest }) => {
  return (
    <CustomLink
      href={url || null}
      isDisabled={!url}
      decoration={decoration}
      target="_blank"
      rel="noreferrer noopener"
      {...rest}
    />
  );
};

ExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  decoration: PropTypes.string,
};

ExternalLink.defaultProps = {
  decoration: 'underline',
};

export default ExternalLink;

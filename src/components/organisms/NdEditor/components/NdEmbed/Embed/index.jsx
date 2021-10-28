import React from 'react';
import PropTypes from 'prop-types';
import Noembed from '@components/atoms/Noembed';

const Embed = props => {
  const { contentState, block } = props;
  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();

  return <Noembed url={src} />;
};

Embed.propTypes = {
  contentState: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Embed;

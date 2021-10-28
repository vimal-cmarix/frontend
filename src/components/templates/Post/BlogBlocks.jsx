import React from 'react';
import PropTypes from 'prop-types';

import { Blocks, BlockText } from './style';

const BlogBlocks = ({ data }) => {
  const dataFilterd = data.filter(item => item.position !== 0);
  const renderHTML = h => {
    return { __html: h };
  };

  return (
    <Blocks>
      {dataFilterd.map(item => (
        <>
          {item.type === 'blog' && (
            <BlockText
              key={item.id}
              dangerouslySetInnerHTML={renderHTML(item.text)}
            />
          )}
        </>
      ))}
    </Blocks>
  );
};

BlogBlocks.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BlogBlocks;

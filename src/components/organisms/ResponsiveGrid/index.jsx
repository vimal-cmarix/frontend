import PropTypes from 'prop-types';
import { Grid } from 'styled-css-grid';
import React from 'react';
import { useGridOptions } from '@utils/portfolio';

export default function ResponsiveGrid({ options, children }) {
  const opts = {
    postOffset: 0,
    widthOffset: 0,
    margin: 'auto',
    ...(options || {}),
  };
  const { postPerLine, gridGap } = useGridOptions(opts);
  return (
    <Grid columns={postPerLine} gap={gridGap} style={{ margin: opts.margin }}>
      {children}
    </Grid>
  );
}

ResponsiveGrid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  options: PropTypes.objectOf(PropTypes.any),
};

ResponsiveGrid.defaultProps = {
  options: {},
};

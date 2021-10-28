import React from 'react';
import PropTypes from 'prop-types';

import createSideToolbarPlugin from './components/SideToolbar';

import NdImageButton from '../NdImageButton';
import NdEmbedButton from '../NdEmbedButton';

import { Container } from './style';

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

export const NdSideToolbarPlugins = [sideToolbarPlugin];

const NdSideToolbar = ({ readOnly }) => {
  return (
    <Container readOnly={readOnly}>
      <SideToolbar>
        {externalProps => {
          return (
            <>
              <NdImageButton {...externalProps} />
              <NdEmbedButton {...externalProps} />
            </>
          );
        }}
      </SideToolbar>
    </Container>
  );
};

NdSideToolbar.propTypes = {
  readOnly: PropTypes.bool,
};

NdSideToolbar.defaultProps = {
  readOnly: false,
};

export default NdSideToolbar;

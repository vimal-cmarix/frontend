import React from 'react';

import { composeDecorators } from 'draft-js-plugins-editor';

import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createImagePlugin from 'draft-js-image-plugin';
// import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
// import createResizeablePlugin from 'draft-js-resizeable-plugin';

const blockDndPlugin = createBlockDndPlugin();
const focusPlugin = createFocusPlugin();
// const resizeablePlugin = createResizeablePlugin();
// const alignmentPlugin = createAlignmentPlugin();
// const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  blockDndPlugin.decorator,
  // resizeablePlugin.decorator,
  // alignmentPlugin.decorator,
  focusPlugin.decorator,
);

export const imagePlugin = createImagePlugin({ decorator });

export const NdImagePlugins = [
  blockDndPlugin,
  focusPlugin,
  // alignmentPlugin,
  // resizeablePlugin,
  imagePlugin,
];

const NdImage = () => {
  // return <AlignmentTool />;
  return <></>;
};

export default NdImage;

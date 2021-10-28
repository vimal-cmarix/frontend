/* eslint-disable react/destructuring-assignment */
// import React from 'react';
import addEmbed from './modifiers/addEmbed';
import EmbedComponent from './Embed';

const createEmbedPlugin = () => {
  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = block.getEntityAt(0);
        if (!entity) return null;
        const type = contentState.getEntity(entity).getType();

        if (type === 'EMBED') {
          return {
            component: EmbedComponent,
            editable: false,
          };
        }

        return null;
      }

      return null;
    },
    addEmbed,
  };
};

export const NdEmbedPlugins = [createEmbedPlugin()];

export default createEmbedPlugin;
export const Embed = EmbedComponent;

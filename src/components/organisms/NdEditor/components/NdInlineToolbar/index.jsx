import React from 'react';

import { Separator } from 'draft-js-inline-toolbar-plugin';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from 'draft-js-buttons';

import { Container } from './style';

const NdInlineToolbar = ({ plugins }) => {
  const { linkPlugin, inlineToolbarPlugin } = plugins;
  const { InlineToolbar } = inlineToolbarPlugin;

  return (
    <Container className="NdEditorPopOver" data-tut="reactour__inline_toolbar">
      <InlineToolbar>
        {externalProps => {
          return (
            <>
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <HeadlineThreeButton {...externalProps} />
              <Separator {...externalProps} />
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <linkPlugin.LinkButton {...externalProps} />
              <Separator {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
            </>
          );
        }}
      </InlineToolbar>
    </Container>
  );
};

export default NdInlineToolbar;

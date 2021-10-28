import styled, { css } from 'styled-components';

import { Grey61, GreyCF } from '@assets/styles/colors';
import {
  HeadingXXLarge,
  HeadingLarge,
  HeadingSmall,
  LabelMedium,
  ParagraphSmall,
} from '@assets/styles/typography';
import { smscreen } from '@assets/styles/medias';
import { DEFAULT_FONT } from '@assets/styles/theme';

export const NdEditorWrapper = styled.div`
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #cfcdd6;
  box-sizing: border-box;
  border-radius: 0.625rem;
  background: #ffffff;
  padding: 8px 11px;
`;

export const NdEditorContainer = styled.div`
  .editor-wrapper {
    outline: none;
    height: 100%;
    &.create-blog-editor {
      .editor-sidebar {
        position: relative;
        .blogEditorBtn {
          top: 0;
          left: 0;
          margin-top: 20px;
        }
      }
    }
  }

  .DraftEditor-root {
    position: relative;
    min-height: 244px;
  }
  .public-DraftEditorPlaceholder-root {
    ${LabelMedium}
    position: absolute;
    color: ${GreyCF};
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

  .public-DraftStyleDefault-block {
    @media ${smscreen} {
      ${ParagraphSmall};
      font-size: inherit;
      line-height: inherit;
    }
  }

  .DraftEditor-editorContainer {
    padding-bottom: 24px;
  }

  figure img {
    margin: 10px 0;
  }

  figure iframe {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
  }

  figure > div {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 0;
  }

  figure,
  img {
    max-width: 100%;
    min-width: 100%;
  }

  h1 {
    ${HeadingXXLarge}
  }

  h2 {
    ${HeadingLarge}
  }

  h3 {
    ${HeadingSmall}
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ul,
  ol {
    padding-left: 27px;
  }

  blockquote {
    border-left: 2px solid #ccc;
    padding-left: 10px;
    margin-left: 10px;
  }

  .active-step {
    transform: scale(1);
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    background: blue;
  }

  ${({ onlyInlineEditor, noBorder, focus, minHeight, maxHeight }) =>
    onlyInlineEditor
      ? css`
          ${!noBorder &&
            css`
              border: 1px solid ${focus ? Grey61 : GreyCF};
            `};
          box-sizing: border-box;
          border-radius: 10px;
          padding: 10px;
          font-family: ${DEFAULT_FONT};
          font-size: 14px;
          font-weight: 400;
          line-height: 21px;
          color: #313134;
          min-height: ${minHeight || '100px'};
          max-height: ${maxHeight || '165px'};
          overflow-y: auto;
        `
      : null}
`;

export default NdEditorContainer;

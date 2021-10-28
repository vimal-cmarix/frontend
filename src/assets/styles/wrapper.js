import styled, { css } from 'styled-components';

import { White } from './colors';
import { smscreen, sizes as breakpoint } from './medias';

export const SafeArea = styled.div`
  width: 100%;
  max-width: 1920px;
  box-sizing: border-box;
  margin: 0px;
  padding: 20px 24px;

  @media ${smscreen} {
    padding: 30px 16px;
    margin: 0;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  margin-right: 0px;

  &.blog-wrapper {
    @media ${smscreen} {
      overflow-x: hidden;
    }

    div.active-tour {
      margin-top: 12px;
    }
  }

  &.post-wrapper {
    @media ${smscreen} {
      margin-bottom: 80px;
      // margin-top:35px;

      .DraftEditor-editorContainer {
        max-width: 100%;
      }

      [class*='NdEditorContainer'] {
        margin-top: 24px;
      }
    }
  }

  ${({ isVanity }) =>
    isVanity &&
    css`
      width: 100%;
      max-width: ${breakpoint.laptop};
      margin: 0 auto;
      min-height: calc(100vh - 76px);
      background-color: ${White};
    `};
`;

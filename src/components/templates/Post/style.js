import styled, { css } from 'styled-components';
import {
  Haiti,
  White,
  Grey100,
  Black,
  Primary,
  Grey61,
  Black111,
  Grey29,
} from '@assets/styles/colors';
import {
  HeadingLarge,
  HeadingSmall,
  ParagraphSmall,
  ParagraphMedium,
  HeadingXSmall,
  LabelSmall,
  LabelMedium,
} from '@assets/styles/typography';
import { RadiusSmall } from '@assets/styles/radius';
import { smscreen } from '@assets/styles/medias';
import { lighten } from 'polished';
import { SPACING } from '@assets/styles/theme';
import { typoTheme } from '@assets/styles/typo';

export const SafeArea = styled.div``;

export const FlexColumns = styled.div`
  display: flex;
  height: 100%;
`;

export const PageContent = styled.div`
  width: 100%;
`;

export const ContentWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const IconDeleteButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 2px;
  background-color: ${White};
  border: 0;
  padding: 0;
  position: absolute;
  top: ${SPACING * 3}px;
  left: ${SPACING * 4}px;
  color: ${Grey61};
  cursor: pointer;
`;

export const VideoWrapper = styled.div`
  width: 100%;

  ${props =>
    !props.isDocument
      ? css`
          height: 27vw;
        `
      : css`
          min-height: 120px;
        `}

  ${({ aspectRatio16x9 }) =>
    !aspectRatio16x9 &&
    css`
      @media ${smscreen} {
        height: 250px;
      }
    `};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ aspectRatio16x9 }) =>
    aspectRatio16x9 &&
    css`
      height: auto;
      padding-top:56.25%;
      position: relative;

      // @media ${smscreen} {
      //   height: 180px;
      // }

      ::before {
        content: '';
        display: block;
        //padding-top: calc(720 / 1280 * 100%);

        padding-top: -moz-calc(720 / 1280 * 100%);
        padding-top: -webkit-calc(720 / 1280 * 100%);
        padding-top: -o-calc(720 / 1280 * 100%);
        padding-top: calc(720 / 1280 * 100%);
        display: none;
      }

      .video-trash {
        top: 0;
        left: 0;
        right: auto;

        > button {
          margin-left: 0;
        }
      }

      .video-box {
        position: absolute;
        top: 0;
        left: 0;
      }
    `};
`;

export const ButtonsWrapper = styled.div`
  display: flex;

  @media ${smscreen} {
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

export const ButtonWrapperWithSpace = styled.div`
  width: 128px;
  margin-right: 16px;

  @media ${smscreen} {
    width: fit-content;
    margin-right: 0;
    margin-left: 15px;
    min-width: 96px;
    button {
      justify-content: flex-start;
    }
  }
`;

export const ButtonWrapperWithSpaceLarge = styled.div`
  width: 148px;
  margin-right: 16px;

  @media ${smscreen} {
    display: none;
  }
`;

export const ButtonWrapperWithSpaceLeftLarge = styled.div`
  width: 148px;
  margin-left: 16px;
`;

export const ButtonWrapper = styled.div`
  width: 128px;

  @media ${smscreen} {
    width: fit-content;
    margin-right: 10px;
    position: relative;
    > a {
      color: ${Primary};
      padding: 8px 16px 8px 12px;
      white-space: nowrap;
      &:before {
        display: none;
      }
    }
  }
`;

export const PostTitle = styled.div`
  font-size: ${typoTheme.sizes.headline3};
  line-height: 152%;
  color: ${Black111};
  padding-bottom: 48px;
`;

export const FileUploadWrapper = styled.div`
  padding-bottom: 32px;
  position: relative;
  width: 100%;

  .mock-file-wrapper,
  .mock-video-wrapper {
    position: absolute;
    z-index: -1;
    left: -5000px;

    &.active-mock {
      position: relative;
      z-index: unset;
      left: 0;

      .swiper-container {
        width: 100%;
      }
    }
  }
`;

export const VideoIconsWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  padding: ${SPACING * 2}px;

  ${props =>
    props.viewDocument &&
    css`
      transform: translate(-50%);
      left: 50%;
      max-width: 256px;
      top: 50%;
      padding: 0;
    `}
`;

export const FormBlockWrapper = styled.div`
  margin-bottom: 32px;

  &.active-tour {
    padding-bottom: 32px;
  }

  &.reactour-fun-part {
    padding: 32px 0 0 88px;
    margin: -32px 0 0 -88px;
  }

  .taginput {
    padding-right: 115px;
  }
  .mock-text-wrapper,
  .mock-editor-wrapper {
    display: none;

    &.active-mock {
      display: block;
    }
  }

  .editor-sidebar {
    margin-top: 12px;
  }

  @media ${smscreen} {
    margin-bottom: 40px;

    /* &.editor-focus-active {
      .DraftEditor-editorContainer {
        max-width: 85%;
        margin-left: auto;
      }
    } */
  }
`;

export const FileUploadControl = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
`;

export const Cover = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const ContentEdition = styled.div`
  background: ${White};
  border: 1px solid ${Grey100};
  box-sizing: border-box;
  ${RadiusSmall}
  display: flex;
  margin-bottom: 32px;
  align-items: center;
  position: relative;
  padding: 4px 16px;
  height: 142px;

  @media ${smscreen} {
    height: 128px;
  }
`;

export const ContentEditionTitle = styled.div`
  font-size: ${typoTheme.sizes.headline2};
  color: ${Grey29};
  padding-bottom: 8px;
  padding-right: 168px;
  padding-left: 16px;

  @media ${smscreen} {
    ${HeadingXSmall}
    padding-right: 16px;
  }
`;

export const ContentEditionDesc = styled.div`
  font-size: ${typoTheme.sizes.body1};
  color: ${Grey29};
  line-height: 152%;
  padding-right: 150px;
  padding-left: 16px;

  @media ${smscreen} {
    padding-right: 16px;
  }
`;

export const ContentEditionClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
  padding: 8px;
  cursor: pointer;

  :hover {
    color: ${Haiti};
  }
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 32px;
  right: 10px;
`;

export const Blocks = styled.div``;

export const OptionsBoxWrapper = styled.div``;

export const OptionsTitle = styled.p``;

export const PopOverWrapper = styled.div`
  max-width: 216px;
`;

export const BlockText = styled.div`
  p {
    ${ParagraphMedium}
    color: ${Black};
    padding-top: 24px;
  }
`;

export const ButtonAddContent = styled.button`
  ${LabelSmall}
  color: ${Black};
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  padding: 0 16px;
  outline: none;
  border: none;
  cursor: pointer;
  background: transparent;

  :hover {
    color: ${lighten(0.15, Black)};
  }

  :active {
    color: ${lighten(0.1, Black)};
  }
`;

export const ButtonAddContentWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Tags = styled.div`
  margin-top: 16px;
  ul {
    li {
      > div {
        word-break: break-word;
        height: auto;
      }
    }
  }
`;

export const MockEditor = styled.div`
  ${LabelMedium}
  padding: 16px 0;
`;

export const MockWrapper = styled.div`
  display: flex;
  pointer-events: all;
  cursor: pointer;

  > button {
    pointer-events: none;
  }
`;

export const GridWrapper = styled.div`
  padding-bottom: 48px;

  .editBlogWrap {
    .DraftEditor-editorContainer {
      max-height: 250px !important;
      overflow-y: auto !important;
    }
  }
`;

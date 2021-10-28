import styled, { css } from 'styled-components';

import { typoTheme } from '@assets/styles/typo';
import {
  Red,
  Haiti,
  White,
  Grey100,
  Black,
  Primary,
  Grey,
  Grey4,
  Grey5,
  Black111,
  Grey61,
} from '@assets/styles/colors';
import {
  HeadingSmall,
  ParagraphSmall,
  ParagraphMedium,
  HeadingXSmall,
  LabelSmall,
} from '@assets/styles/typography';
import { RadiusSmall, RadiusXSmall } from '@assets/styles/radius';
import { smscreen } from '@assets/styles/medias';
import {
  InsertBoxWrapper as HomeWrapper,
  InsertBox as HomeBox,
  InsertTitle as HomeTitle,
} from '@pages/home/style';
import { SPACING } from '@assets/styles/theme';

export const IconDeleteButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 2px;
  background-color: #fff;
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
  height: 27vw;

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

export const NavButtonWrapper = styled.div`
  width: 128px;
  position: relative;

  & + & {
    margin-left: 16px;
  }

  @media ${smscreen} {
    width: fit-content;
    z-index: 2;

    & + & {
      margin-left: ${SPACING * 2}px;
    }

    ${props =>
      props.hideMobile &&
      css`
        display: none;
      `}
  }
`;

export const ButtonWrapperWithSpaceLarge = styled.div`
  width: 148px;
  margin-right: 16px;

  @media ${smscreen} {
    display: none;
  }
`;

export const ButtonWrapperLarge = styled.div`
  width: 148px;
`;

export const ButtonWrapperWithSpaceLeftLarge = styled.div`
  width: 148px;
  margin-left: 16px;
`;

export const ButtonWrapper = styled.div`
  width: ${props => (props.larger ? '168px' : '128px')};
  position: relative;

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

export const ButtonWrapperPublish = styled(ButtonWrapper)``;

export const StepTitle = styled.div`
  font-size: ${typoTheme.sizes.headline3};
  line-height: 152%;
  color: ${Black111};
  padding-bottom: 24px;
`;

export const StepDescription = styled.div`
  ${ParagraphSmall}
  color:  ${Grey};
  padding-bottom: 40px;
`;

export const FileUploadWrapper = styled.div`
  padding-bottom: 0px;
  position: relative;
  width: 100%;
`;

export const VideoIconsWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  z-index: 2;
  padding: 8px;

  button {
    margin-left: 8px;
  }
`;

export const FormBlockWrapper = styled.div`
  margin-bottom: 32px;

  @media ${smscreen} {
    margin-bottom: 20px;

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
  ${HeadingSmall}
  color: ${Haiti};
  padding-bottom: 8px;
  padding-right: 168px;
  padding-left: 16px;

  @media ${smscreen} {
    ${HeadingXSmall}
    padding-right: 16px;
  }
`;

export const ContentEditionDesc = styled.div`
  ${ParagraphSmall}
  color: ${Haiti};
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

export const InsertBoxWrapper = styled(HomeWrapper)`
  ${RadiusSmall}
  height: auto;
  margin-top: 10px;

  ${props =>
    props.error &&
    css`
      border: 2px dashed ${Red};
    `}
`;

export const InsertBox = styled(HomeBox)`
  ${props =>
    props.disabled &&
    css`
      cursor: initial;
      position: relative;
      border-color: ${Grey5};

      span,
      h2 {
        opacity: 0.25;
      }

      &:hover {
        color: ${Grey4};
        border-color: ${Grey5};

        div {
          display: block;
        }
      }
    `}
`;

export const HoverMessage = styled.div`
  ${LabelSmall}
  ${RadiusXSmall}
  display: none;
  background-color: ${Haiti};
  position: absolute;
  color: ${White};
  text-align: center;
  max-width: 200px;
  width: fit-content;
  box-sizing: border-box;
  padding: 4px 11px;
  top: -48px;
  left: 50%;
  transform: translateX(-50%);

  &:after {
    content: '';
    position: absolute;
    width: 9px;
    height: 9px;
    background: ${Haiti};
    bottom: calc(100% - 5px);
    left: 50%;
    top: 35px;
    transform: translateX(-50%) rotate(45deg);
    border-top-left-radius: 2px;
  }
`;

export const InsertTitle = styled(HomeTitle)``;

export const NavPresentation = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
  z-index: 2;
`;

export const Handle = styled.div`
  position: absolute;
  top: ${SPACING * 3}px;
  left: ${SPACING * 3}px;
  z-index: 2;
  display: flex;
  width: 32px;
  height: 32px;
  font-size: 20px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #000;
  box-shadow: 0px 2px 8px rgba(17, 14, 27, 0.09);
  color: ${Primary};
  cursor: move;
`;

export const Hint = styled.span`
  ${LabelSmall}
  margin-top: 8px;
  color: ${Red};
  display: block;
`;

import styled, { css } from 'styled-components';

import { DEFAULT_FONT, SPACING } from '@assets/styles/theme';
import { White, ModalHeaderBG } from '@assets/styles/colors';
import {
  RadiusMedium,
  RadiusXLarge,
  RadiusSmall,
  RadiusLarge,
} from '@assets/styles/radius';
import {
  smscreen,
  smallHeight,
  sizes as breakpoint,
} from '@assets/styles/medias';
import { LargeElevation } from '@assets/styles/elevations';
import { LabelLarge } from '@assets/styles/typography';

const radius = {
  sm: RadiusSmall,
  md: RadiusMedium,
  lg: RadiusLarge,
  xlg: RadiusXLarge,
};

export const Container = styled.div`
  ${({ rounded }) => radius[rounded]};
  ${LargeElevation};
  transform: ${props => (props.isOpened ? 'scale(1)' : 'scale(0.95)')};
  max-width: ${props => (props.fitContent ? 'fit-content' : '728px')};
  width: 100%;
  background: ${White};
  transition: 0.1s ease-in;
  position: relative;

  .scroll-bar__container {
    border-radius: inherit;
  }

  ${props =>
    props.isMobileFull &&
    css`
      @media ${smscreen} {
        width: 100%;
        min-width: 100%;
        height: 100%;
        border-radius: 0;
      }
      &.pitch-class {
        max-width: 100% !important;
        box-sizing: border-box;
        position: static !important;
        padding: 15px 20px;

        @media ${smscreen} {
          min-height: calc(100vh - 344px);
        }
        @media (max-width: 480px) {
          min-height: calc(100vh - 274px);
        }

        .addPitchAppCard {
          max-width: 200px;
          min-width: 200px;
          margin-top: 0;
          h2 {
            max-height: 44px;
            overflow: hidden;
            line-height: 22px;
          }
          p {
            font-size: 12px;
            line-height: 18px;
            max-height: 36px;
            overflow: hidden;
          }
        }
        .addPitchAppWrapper {
          max-height: 350px;
          padding: 10px;
          @media ${smscreen} {
            max-height: 100vh;
          }
        }
        .addPitchHeadBtn {
          > div {
            flex-direction: row;
            width: 40%;
            position: absolute;
            right: 25px;
            button {
              padding: 0.625rem 1.5rem;
              margin: 0;
              & + button {
                margin-left: 20px;
              }
            }
            @media ${smscreen} {
              width: 100%;
              position: relative;
              right: 0;
              z-index: 9;
            }
            div {
              right: auto;
              left: 0;
            }
          }
          & + div {
            margin: 0;
            @media ${smscreen} {
              margin: 25px 0 0;
            }
          }
        }
      }
    `}

  ${({ selectContentModal }) =>
    selectContentModal &&
    css`
      max-width: ${breakpoint.laptop};
    `};

  ${props =>
    props.fullScreen &&
    css`
      max-height: 100vh;
      height: 100vh;
      max-width: 100vw;
      border-radius: 0;
      @media ${smscreen} {
        max-height: 100vh;
      }
      @media ${smallHeight} {
        max-height: 100vh;
      }
    `}

  ${props =>
    props.large &&
    css`
      max-width: 1024px;
    `}

    .scroll-bar__container {
    > div {
      overflow-y: 'scroll';
      overflow-x: 'hidden';
      margin-bottom: 0;
    }
  }

  ${({ hFull }) =>
    hFull &&
    css`
      @media screen and (min-width: ${breakpoint.tablet}) {
        .scroll-bar__container > div {
          height: calc(100vh - 94px) !important;
          display: flex;
        }

        .scroll-bar__container > div > div {
          width: 100%;
          display: flex;
        }
      }
    `};
`;

export const ModalContent = styled.div`
    padding:${props => (props.isUnPadding ? 0 : '30px 60px 25px')};

    ${props =>
      props.hasHeaderTitle &&
      css`
        padding-top: 30px;
      `}
    ${props =>
      !props.isUnPadding &&
      css`
        @media ${smscreen} {
          padding: ${({ hasHeaderTitle }) => (hasHeaderTitle ? 30 : 46)}px 35px
            05px 35px;
        }
      `}

    ${({ isLarge }) =>
      isLarge
        ? css`
            margin-bottom: 30px;
          `
        : null}
    ${({ unGutterBottom }) =>
      unGutterBottom &&
      css`
        padding-bottom: 0;
      `};
`;

export const ModalHeader = styled.header`
  background-color: ${ModalHeaderBG};
  height: 44px;
  display: flex;
  padding: 0 66px;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px 16px 0 0;

  @media ${smscreen} {
    padding: 0 40px;
    border-radius: 0;
    justify-content: center;
    position: relative;
  }

  p {
    ${LabelLarge};
    color: ${White};
  }
`;

export const CloseButton = styled.button`
  border: 0;
  background-color: transparent;
  outline-style: none;
  padding: 0;
  margin-right: -50px;
  cursor: pointer;

  @media ${smscreen} {
    position: absolute;
    left: 15px;
  }
`;

export const Title = styled.span`
  font-family: ${DEFAULT_FONT};
  font-weight: 700;
  font-size: 18px;
  color: ${White};
`;

export const BoxSticky = styled.div`
  background-color: ${White};
  padding: ${SPACING * 4}px 0;
  margin-top: ${SPACING * 4}px;
  position: sticky;
  bottom: 0;
  z-index: 1;
  margin-left: -1px;
`;

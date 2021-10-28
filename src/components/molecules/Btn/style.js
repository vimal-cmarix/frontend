import styled, { css, keyframes } from 'styled-components';

import { DEFAULT_FONT, SPACING } from '@assets/styles/theme';
import { sizes as breakpoint } from '@assets/styles/medias';
import { RadiusSmall, RadiusMedium, RadiusLarge } from '@assets/styles/radius';
import {
  Grey61,
  Grey31,
  Primary,
  PrimaryDark,
  White,
  LightPurple,
} from '@assets/styles/colors';
import { typoTheme } from '@assets/styles/typo';

const PADDING_X = SPACING * 9;
const PADDING_X_MOBILE = SPACING * 4;

const radius = {
  sm: RadiusSmall,
  md: RadiusMedium,
  lg: RadiusLarge,
};

const sizes = {
  sm: css`
    font-size: ${typoTheme.sizes.body2};
    height: 30px;
  `,
  md: css`
    font-size: ${typoTheme.sizes.body1};
    height: 40px;
  `,
  lg: css`
    font-size: ${typoTheme.sizes.base};
    height: 50px;
  `,
};

const variants = {
  text: css`
    background-color: transparent;
    color: ${Grey61};

    :hover:not(:active) {
      color: ${Grey31};
    }
  `,
  textPrimary: css`
    background-color: transparent;
    color: ${Primary};

    :hover:not(:active) {
      color: ${PrimaryDark};
    }
  `,
  delete: css`
    background-color: transparent;
    color: ${Grey61};

    :hover:not(:active) {
      color: #d32c63;
    }
  `,
  solidPrimary: css`
    color: ${White};
    background-color: ${Primary};
    padding: 0 ${PADDING_X_MOBILE}px;

    :hover:not(:active) {
      background-color: ${PrimaryDark};
    }

    @media screen and (min-width: ${breakpoint.tablet}) {
      padding: 0 ${PADDING_X}px;
    }
  `,
  solidSecondary: css`
    color: ${White};
    background-color: ${Grey61};
    padding: 0 ${PADDING_X_MOBILE}px;

    :hover:not(:active) {
      background-color: ${Grey31};
    }

    @media screen and (min-width: ${breakpoint.tablet}) {
      padding: 0 ${PADDING_X}px;
    }
  `,
  outlinePrimary: css`
    color: ${Primary};
    background-color: transparent;
    border: 1px solid currentColor;
    padding: 0 ${PADDING_X_MOBILE}px;

    :hover:not(:active) {
      color: ${White};
      background-color: ${PrimaryDark};
    }

    :active {
      color: ${PrimaryDark};
    }

    @media screen and (min-width: ${breakpoint.tablet}) {
      padding: 0 ${PADDING_X}px;
    }
  `,
  outlineLight: css`
    color: ${LightPurple};
    background-color: transparent;
    border: 1px solid currentColor;
    padding: 0 ${PADDING_X_MOBILE}px;

    :hover:not(:active) {
      color: ${White};
      background-color: ${LightPurple};
    }

    :active {
      color: ${LightPurple};
    }

    @media screen and (min-width: ${breakpoint.tablet}) {
      padding: 0 ${PADDING_X}px;
    }
  `,
  outlineSecondary: css`
    color: ${Grey61};
    background-color: transparent;
    border: 1px solid currentColor;
    padding: 0 ${PADDING_X_MOBILE}px;

    :hover:not(:active) {
      color: ${White};
      background-color: ${Grey31};
    }

    :active {
      color: ${Grey31};
    }

    @media screen and (min-width: ${breakpoint.tablet}) {
      padding: 0 ${PADDING_X}px;
    }
  `,
  danger: css`
    color: ${Grey61};
    background-color: transparent;
    border: 1px solid currentColor;
    padding: 0 ${PADDING_X_MOBILE}px;

    :hover:not(:active) {
      color: ${White};
      background-color: #d32c63;
    }

    :active {
      color: #d32c63;
    }

    @media screen and (min-width: ${breakpoint.tablet}) {
      padding: 0 ${PADDING_X}px;
    }
  `,
  grey: css`
    color: ${Grey61};
    background-color: ${White};
    border: 1px solid currentColor;
    padding: 0 ${PADDING_X_MOBILE}px;

    :hover:not(:active) {
      color: #292929;
      background-color: #d8d8d8;
    }

    @media screen and (min-width: ${breakpoint.tablet}) {
      padding: 0 ${PADDING_X}px;
    }
  `,
  addBoard: css`
    color: #b1adb7;
    background-color: transparent;
    border: 1px solid currentColor;
    padding: 0 ${PADDING_X_MOBILE}px;

    :hover:not(:active) {
      color: ${Grey61};
      box-shadow: 0px 4px 10px rgba(97, 97, 97, 0.16);
    }

    :active {
      color: ${White};
      background-color: ${Grey61};
    }

    @media screen and (min-width: ${breakpoint.tablet}) {
      padding: 0 ${PADDING_X}px;
    }
  `,
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  color: inherit;
  box-sizing: border-box;
  animation: ${spin} 1s linear infinite;

  ::before,
  ::after {
    content: '';
    width: 24px;
    height: 24px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    box-sizing: border-box;
  }

  ::before {
    opacity: 0.4;
    border: 2px solid currentColor;
  }

  ::after {
    border: 2px solid transparent;
    border-left-color: currentColor;
  }
`;

export const Container = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: ${DEFAULT_FONT};
  line-height: 152%;
  font-weight: 400;
  outline: none;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;

  > * {
    flex-shrink: 0;
  }

  :disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  ${({ size }) => sizes[size]};
  ${({ variant }) => variants[variant]};
  ${({ rounded }) => radius[rounded]};

  ${({ full }) =>
    full &&
    css`
      width: 100%;
      justify-content: center;
    `};

  ${({ spaceElements }) =>
    spaceElements &&
    css`
      > *:not(:last-child) {
        margin-right: ${spaceElements}px;
      }
    `};

  ${Spinner} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }

  ${({ showLoading }) =>
    showLoading &&
    css`
      pointer-events: none;

      > * {
        opacity: 0;
        visibility: hidden;
      }

      ${Spinner} {
        opacity: 1;
        visibility: visible;
      }
    `};
`;

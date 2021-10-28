import styled, { css } from 'styled-components';

import { DEFAULT_FONT } from './theme';
import {
  Primary,
  PrimaryDark,
  PrimaryLight,
  Grey31,
  Grey61,
  Haiti,
  Grey400,
  Grey29,
  White,
  Black,
  Black111,
  Grey87,
  GreyCF,
  Red,
  MediumGrey,
} from './colors';
import { smscreen } from './medias';

export const typoTheme = {
  colors: {
    default: 'inherit',
    black: Black,
    white: White,
    primary: Primary,
    primaryDark: PrimaryDark,
    primaryLight: PrimaryLight,
    grey31: Grey31,
    grey29: Grey29,
    grey61: Grey61,
    greyCF: GreyCF,
    grey400: Grey400,
    haiti: Haiti,
    black111: Black111,
    grey87: Grey87,
    red: Red,
    mediumGrey: MediumGrey,
  },
  sizes: {
    headline3: '1.875rem', // 30px
    headline2: '1.5rem', // 24px
    headline1: '1.125rem', // 18px
    base: '1rem', // 16px
    body1: '0.875rem', // 14px
    body2: '0.75rem', // 12px
    caption: '0.625rem', // 10px
  },
};

export const Typography = styled.span`
  ${({
    color = 'default',
    size = 'base',
    align = 'left',
    lineHeight = '152%',
    display = 'inline-flex',
    fontWeight = 400,
    font = DEFAULT_FONT,
    transform = 'none',
  }) => css`
    font-size: ${typoTheme.sizes[size]};
    color: ${typoTheme.colors[color]};
    font-family: ${font};
    text-align: ${align};
    line-height: ${lineHeight};
    font-weight: ${fontWeight};
    display: ${display};
    text-transform: ${transform};

    @media ${smscreen} {
      &.menuItemName,
      &.menuUserName {
        margin: 4px 0 !important;
      }
    }
  `};

  ${({ clamp }) =>
    clamp &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${clamp || 3};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `};
`;

export const TypographyPre = styled.pre`
  ${({
    color = 'default',
    size = 'base',
    align = 'left',
    lineHeight = '152%',
    display = 'inline-flex',
    fontWeight = 400,
    font = DEFAULT_FONT,
    transform = 'none',
  }) => css`
    font-size: ${typoTheme.sizes[size]};
    color: ${typoTheme.colors[color]};
    font-family: ${font};
    text-align: ${align};
    line-height: ${lineHeight};
    font-weight: ${fontWeight};
    display: ${display};
    text-transform: ${transform};

    // @media ${smscreen} {
    //   margin: 4px 0 !important;
    // }
    
    &.proBucketListDes{
      white-space: normal;
    }
  `};

  ${({ clamp }) =>
    clamp &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${clamp || 3};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `};
`;

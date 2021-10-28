import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
import { lighten, darken, rgba } from 'polished';
import { Primary, White, Black, Grey } from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { LabelXSmall, LabelMedium } from '@assets/styles/typography';
import {
  laptop,
  smscreen,
  xxsscreen,
  smscreenReverse,
} from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';

const colorSchemas = {
  light: {
    iconColor: Primary,
    inactiveIconColor: rgba(Black, 0.35),
    backgroundColor: White,
    boxShadow: 'inset 0px -1px 0px #EEEEEE',
    backgroundHover: darken(0.03, White),
    backgroundActive: darken(0.12, White),
  },
  dark: {
    iconColor: White,
    inactiveIconColor: rgba(White, 0.35),
    backgroundColor: Primary,
    boxShadow: 'none',
    backgroundHover: lighten(0.15, Primary),
    backgroundActive: lighten(0.1, Primary),
  },
};

export const PageHeader = styled.div`
  padding: 40px 118px 40px 100px;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
  position: relative;
  display: -webkit-flex;
  display: flex;
  .sizigi-header-logo {
    display: inline-block;
    img {
      cursor: pointer;
      max-width: 130px;
      vertical-align: middle;
    }
  }
  .sizigi-header-nav {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #1d242f;
    line-height: 153%;
    align-items: center;
    margin-left: auto;
    min-height: 43px;
    display: flex;
    a {
      line-height: 24px;
      margin-left: 30px;
      text-decoration: none;
      outline: none;
      transition: all 0.25s ease 0s;
      position: relative;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: #1d242f;
      &:hover {
        color: #009de9;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -5px;
        margin: auto;
        width: 0;
        opacity: 0;
        height: 2px;
        border-radius: 20px;
        transition: all 0.35s ease 0s;
        background: #009de9;
      }
      &.active {
        :before {
          width: 100%;
          opacity: 1;
        }
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

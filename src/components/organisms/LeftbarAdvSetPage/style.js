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

export const ProfileLeftsideMenu = styled.div`
  box-shadow: 0 8px 13px -3px #cfd8e2;
  border-radius: 10px;
  background: #fff;
  width: 375px;
  min-width: 375px;
  min-height: 250px;
  height: 100%;

  &.profile-leftside-menu {
    
    &.sticky-left-panel{
      position: fixed;
      top: -47px;
      height: unset;
    }

  .has-submenu.opened {
    border-left: 3px solid #009de9;
    background: rgba(219,225,232,.25);

    & > a{
      font-weight: 700
    }

    a {
      svg {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }
    }
  }

  li {
    &.has-submenu.opened {
      .sub-menus {
        height: 100%;
        overflow: visible;
      }
    }
  }
`;

export const LeftbarTitle = styled.h2`
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 153%;
  color: #1d242f;
  padding: 24px 24px 25px;
  position: relative;
  margin-bottom: 24px;
  &:before {
    content: '';
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 0;
    border-bottom: 1px solid #dbe1e8;
  }
`;

export const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;

  li.active {
    & > div {
      color: #009de9;
      font-weight: bold;
      border-color: #009de9;
      background: rgba(219, 225, 232, 0.25);
    }
  }

  li {
    a {
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 153%;
      color: #1d242f;
      padding: 8px 50px 8px 21px;
      border-left: 3px solid transparent;
      display: block;
      position: relative;
      text-decoration: none;
      transition: all 0.35s ease 0s;
      cursor: pointer;

      &:hover {
        background: rgba(219, 225, 232, 0.25);
      }
      svg {
        position: absolute;
        right: 33px;
        top: 15px;
      }
    }
    &.active {
      a {
        color: #009de9;
        font-weight: 700;
        border-color: #009de9;
        background: rgba(219, 225, 232, 0.25);
        svg {
          path {
            stroke: #009de9;
          }
        }
      }
    }
  }
`;

export const LeftSubMenu = styled.div`
  height: 0;
  overflow: hidden;
  li {
    a {
      padding-left: 36px;
      color: #1d242f;
      font-weight: 400;
      &.active {
        font-weight: 700;
        padding-left: 45px;
        background: #dbe1e8;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }
`;

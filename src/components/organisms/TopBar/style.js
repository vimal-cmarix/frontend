import styled, { createGlobalStyle } from 'styled-components';
import { lighten, darken, rgba } from 'polished';
import { Primary, White, Black } from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';

const colorSchemas = {
  light: {
    iconColor: Black,
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

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 52px;
  background: ${props => colorSchemas[props.colorSchema].backgroundColor};
  box-shadow: ${props => colorSchemas[props.colorSchema].boxShadow};
  z-index: 10;
  display: none;

  @media ${smscreen} {
    display: block;

    &.blog-navbar,
    &.summary-navbar {
      display: none;
    }
  }
`;

export const NavWrapper = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const MarginTop = createGlobalStyle`
  body {
    @media ${smscreen} {
      margin-top: 52px;
    }
  }
`;

export const BrandWrapper = styled.div`
  display: flex;
  margin: 0 auto;
`;

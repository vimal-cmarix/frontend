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

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 76px;
  background: ${props => colorSchemas[props.colorSchema].backgroundColor};
  box-shadow: ${props => colorSchemas[props.colorSchema].boxShadow};
  z-index: 10;

  @media ${smscreen} {
    top: auto;
    bottom: 0;
    height: 64px;
    padding-top: 7px;
  }

  &.blog-navbar,
  &.summary-navbar {
    @media ${smscreen} {
      top: 0;
      height: 52px;

      > [class*='NavWrapper'] {
        padding: 0;
      }
    }
  }

  &.mock-tour-opened {
    z-index: 0;
  }

  &.view-profile {
    @media ${smscreen} {
      display: none;
    }
  }
`;

export const NavWrapper = styled.div`
  padding: 0 ${SPACING * 8}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  @media ${smscreen} {
    padding: 0 15px;
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${SPACING * 4}px;
  height: 100%;

  @media ${smscreen} {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-right: 0;
    padding: 0 15px 0 0;

    .TooltipWrapperCustomPosition {
      > div:nth-child(1) {
        display: none;
      }
    }
  }

  @media ${smscreenReverse} {
    .TooltipWrapperCustomPosition {
      > div:nth-child(1) {
        left: calc(50% + 8px);
      }
    }
  }
`;

export const NavText = styled.span`
  font-size: 12px;
`;

export const IconWrapper = styled.a`
  height: 100%;
  position: relative;
  border-bottom: 2px solid ${props => (props.active ? Primary : 'transparent')};
  padding: 0 ${SPACING * 4}px;
  display: flex;
  align-items: center;

  color: ${props =>
    props.active
      ? colorSchemas[props.colorSchema].iconColor
      : colorSchemas[props.colorSchema].inactiveIconColor};
  font-size: 24px;

  @media ${smscreen} {
    margin-left: 0;
  }

  :hover {
    background: ${props => colorSchemas[props.colorSchema].backgroundHover};
    border-bottom: 2px solid ${Primary};
    color: ${props =>
      props.active
        ? colorSchemas[props.colorSchema].iconColor
        : colorSchemas[props.colorSchema].inactiveIconColor};
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ active }) =>
    active &&
    css`
      color: ${Primary};
    `}
`;

export const AvatarWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  align-items: center;

  @media ${smscreen} {
    margin-left: auto;
  }
`;

export const AvatarInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${props =>
    props.active
      ? colorSchemas[props.colorSchema].iconColor
      : colorSchemas[props.colorSchema].inactiveIconColor};
  white-space: nowrap;

  @media ${smscreen} {
    margin-top: 0px !important;
    .menuUserName {
      margin-right: 4px !important;
    }
  }
`;

export const NavIconsAndAvatar = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  @media ${smscreen} {
    width: 100%;
  }
`;

export const MarginTop = createGlobalStyle`
  body {
    margin-top: 76px;
    word-break: break-word;

    @media ${smscreen} {
      margin-top: 0;
    }
  }
`;

export const PopOverContainer = styled.div`
  position: absolute;
  top: 105%;
  right: 20px;
  transition: all 0.1s ease-in-out;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? 1 : 0)};

  @media ${smscreen} {
    transition: all 0.3s ease-in-out;
    bottom: 100%;
    top: auto;
    width: 100vw;
    right: unset;
    max-width: calc(100% - 32px);
    left: 50%;
    transform: ${props =>
      props.visible ? 'translate(-50%, 0)' : 'translate(-50%, 150vh)'};
  }
`;

const jump = keyframes`
  0% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(5px);
  }
`;

export const TourIndicator = styled.div`
  pointer-events: none;
  position: absolute;
  max-width: 145px;
  text-align: right;
  top: 70px;
  background: ${Black};
  right: 10px;
  ${RadiusSmall}
  padding: 8px 16px;
  color: ${White};
  ${LabelXSmall}
  animation: ${jump} 1s ease-in-out infinite;

  &:after {
    content: '';
    position: absolute;
    width: 9px;
    height: 9px;
    background: ${Black};
    top: -5px;
    right: 17px;
    transform: translateX(-50%) rotate(45deg);
    border-top-left-radius: 2px;
  }
`;

export const BrandWrapper = styled.div`
  ${props =>
    props.isViewerMode &&
    css`
      padding-left: 164px;
      @media ${laptop} {
        padding-left: 30px;
      }
    `}
  @media ${smscreen} {
    display: none;
  }
`;

export const SignUpWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const SignUpText = styled.span`
  ${LabelMedium};
  font-weight: 400;
  color: ${Grey};
  margin-right: 16px;
`;

export const SignUpButtonWrapper = styled.div`
  width: 88px;
`;

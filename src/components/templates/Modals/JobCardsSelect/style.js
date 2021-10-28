import styled from 'styled-components';
import { darken } from 'polished';

import { RadiusSmall } from '@assets/styles/radius';
import { SPACING } from '@assets/styles/theme';
import { White } from '@assets/styles/colors';
import { sizes as breakpoint } from '@assets/styles/medias';

export const JobCardsContainer = styled.div`
  padding: ${SPACING * 2}px ${SPACING * 4}px;
  overflow-y: auto;
`;

export const HeaderLeft = styled.div``;

export const HeaderRight = styled.div``;

export const FullButton = styled.button`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 0;
  cursor: pointer;
  transition: all 0.2s;
  color: #4f9598;
  background-color: transparent;
  outline: none;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    width: auto;
    background: #82b6b9;
    color: ${White};

    :hover {
      background-color: ${darken(0.1, '#82b6b9')};
    }
  }
`;

export const Footer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: ${White};

  @media screen and (max-width: ${breakpoint.tabletPortrait}) {
    align-items: center;
    filter: drop-shadow(0px -2px 2px rgba(0, 0, 0, 0.04));
    padding-top: ${SPACING * 2}px;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-shrink: 0;
  border-bottom: 1px solid #f3f2f4;
  padding: ${SPACING * 4}px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  &.overflow_hide {
    overflow: hidden;
  }
`;

export const Container = styled.div`
  width: 1180px;
  height: 100vh;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${RadiusSmall};

  ${Body} {
    flex-grow: 1;
    display: flex;
    flex-wrap: nowrap;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    height: calc(100vh - 79px);
  }
`;

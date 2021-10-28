import styled from 'styled-components';

import { sizes as breakpoint } from '@assets/styles/medias';

import {
  Grey61,
  White,
  Primary,
  GreyCF,
  Grey31,
  PrimaryDark,
} from '@assets/styles/colors';
import { SPACING, DEFAULT_FONT } from '@assets/styles/theme';

export const SIDEBAR_WIDTH = 260;
export const HEADER_HEIGHT = 60;

export const HeaderContainer = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: #fbfbfb;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    padding-left: ${SIDEBAR_WIDTH}px;
  }
`;

export const SideBarContainer = styled.aside`
  width: ${SIDEBAR_WIDTH}px;
  height: 100%;
  background-color: #f7f7f7;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: none;
  flex-direction: column;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    display: flex;
  }
`;

export const BackButton = styled.button`
  padding: 0;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
  font-size: 18px;
  color: ${Grey61};
  font-family: ${DEFAULT_FONT};
  flex-shrink: 0;
  cursor: pointer;

  > span {
    display: none;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    > div {
      margin-right: ${SPACING}px;
    }

    > span {
      display: inline-flex;
    }
  }
`;

export const AddButtonContainer = styled.div`
  margin-bottom: ${SPACING * 4}px;
`;

export const MobileOnly = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    display: none;
  }
`;

export const SectionTitle = styled.h2`
  color: ${Grey31};
  font-size: 16px;
  line-height: 152%;
  font-family: ${DEFAULT_FONT};
  display: block;
  margin-bottom: ${props => `${props.gutterMb || SPACING * 4}px`};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${GreyCF};
  display: block;
  margin: ${SPACING * 8}px 0;
`;

export const CreateButton = styled.button`
  padding: 0;
  border: 0;
  background-color: ${Primary};
  outline: none;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 152%;
  font-family: ${DEFAULT_FONT};
  color: ${White};
  border-radius: 10px;
  height: 40px;
  transition: all 0.2s;
  padding: 0 ${SPACING * 4}px;
  cursor: pointer;

  :hover {
    background-color: ${PrimaryDark};
  }

  > div {
    margin-right: ${SPACING * 2}px;
  }

  > span {
    position: relative;
    top: -1px;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    display: inline-flex;
    padding: 0 ${SPACING * 6}px;
    min-width: 123px;
  }
  @media screen and (max-width: 991px) {
    display: inline-flex;
    padding: 0 15px;
    min-width: 100px;
  }
`;

export const Body = styled.div`
  padding: ${SPACING * 4}px;

  &.overflow_hide {
    overflow: hidden;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    display: flex;
    flex-grow: 1;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 0;
  }
`;

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: ${HEADER_HEIGHT}px;
  background-color: #fbfbfb;

  &,
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    height: 100vh;
    min-height: initial;
    background-color: ${White};
    padding-left: ${SIDEBAR_WIDTH}px;
  }
`;

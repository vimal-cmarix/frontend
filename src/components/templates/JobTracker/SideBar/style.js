import styled, { css } from 'styled-components';

import { SPACING, DEFAULT_FONT } from '@assets/styles/theme';
import { White, Grey31, PrimaryDark } from '@assets/styles/colors';

import { HEADER_HEIGHT } from '../style';

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 ${SPACING * 6}px;
  color: ${Grey31};
  height: ${HEADER_HEIGHT}px;
  flex-shrink: 0;
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding-top: 15px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-family: ${DEFAULT_FONT};
  color: ${Grey31};
  padding: 40px ${SPACING * 6}px;

  &.appHeaderTitle {
    padding: 0;
    margin: 0;
  }
`;

export const TrashContainer = styled.div`
  display: inline-flex;
`;

export const PlusButtonContainer = styled.div`
  display: inline-flex;
  margin-right: -8px;
`;

export const LinkItem = styled.div`
  width: calc(100% - ${SPACING * 4}px);
  border-radius: 0px 10px 10px 0px;
  padding-left: ${SPACING * 6}px;
  padding-right: ${SPACING * 4}px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${DEFAULT_FONT};
  transition: all 0.2s;
  cursor: pointer;

  & + & {
    margin-top: 6px;
  }

  span {
    font-size: 16px;
    color: currentColor;
  }

  :not(:hover) {
    ${TrashContainer} {
      display: none;
    }
  }

  ${TrashContainer}:active {
    color: ${White};
  }

  ${props =>
    props.noHover &&
    css`
      color: ${Grey31};
      cursor: initial;
    `};

  ${props =>
    !props.isActive &&
    !props.noHover &&
    css`
      color: ${Grey31};

      :hover {
        color: ${PrimaryDark};
        background-color: ${White};
      }
    `};

  ${props =>
    props.isActive &&
    css`
      color: ${PrimaryDark};
      background-color: ${White};
    `};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

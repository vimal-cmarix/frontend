import styled, { css } from 'styled-components';

import { GreyCF } from '@assets/styles/colors';
import { DEFAULT_FONT, SPACING } from '@assets/styles/theme';

import { levelColors } from './constants';

export const LevelBox = styled.span`
  width: 38px;
  border-right: 1px solid #616161;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${DEFAULT_FONT};
  font-weight: 900;
`;

export const Text = styled.p`
  display: flex;
  align-items: center;
  color: currentColor;
  flex-grow: 1;
  font-size: 14px;
  line-height: 152%;
  font-family: ${DEFAULT_FONT};
  font-weight: 400;
  padding: ${SPACING}px 14px;
`;

export const Container = styled.div`
  display: flex;
  border: 1px solid #616161;
  border-radius: 0px 10px 10px 0px;
  min-height: 38px;
  box-sizing: border-box;
  color: ${GreyCF};
  transition: background-color 0.2s;
  cursor: pointer;

  ${props =>
    !props.isActive &&
    css`
      :hover {
        background-color: rgba(49, 49, 52, 0.3);
        color: #a09ea5;
      }
    `};

  ${props =>
    props.isActive &&
    css`
      background-color: ${levelColors[props.level].bg};
      color: ${levelColors[props.level].color};

      ${LevelBox} {
        border-right: 0;
      }
    `};

  ${props =>
    props.level &&
    css`
      ${LevelBox} {
        background-color: ${levelColors[props.level].bg};
        color: ${levelColors[props.level].color};
      }
    `};

  & + & {
    margin-top: ${SPACING * 3}px;
  }
`;

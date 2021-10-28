import styled, { css } from 'styled-components';

import { DEFAULT_FONT, SPACING } from '@assets/styles/theme';
import { typoTheme } from '@assets/styles/typo';
import { sizes as breakpoint } from '@assets/styles/medias';

export const Container = styled.li`
  height: 38px;
  display: inline-flex;
  color: #6d678a;
  transition: color 0.2s;
  position: relative;

  & + & {
    margin-left: ${SPACING * 8}px;
  }

  ::before {
    content: '';
    width: 0;
    height: 2.5px;
    background-color: currentColor;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 3px;
    margin: 0 auto;
    transition: width 0.2s;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    & + & {
      margin-left: ${SPACING * 10}px;
    }
  }

  ${props =>
    props.isActive &&
    css`
      color: #292929;

      ::before {
        width: 52px;
        max-width: 100%;
      }
    `}

  ${props =>
    !props.isActive &&
    css`
      &:hover {
        color: #292929;
      }
    `}
`;

export const Button = styled.button`
  height: inherit;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0;
  padding: 0;
  color: currentColor;
  position: relative;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
`;

export const EditButton = styled.div`
  position: absolute;
  top: 0;
  right: -24px;
`;

export const Text = styled.span`
  font-family: ${DEFAULT_FONT};
  font-weight: 900;
  font-size: ${typoTheme.sizes.base};
  letter-spacing: normal;

  ${({ isTimeline }) =>
    isTimeline &&
    css`
      font-size: ${typoTheme.sizes.headline1};
    `};
`;

import styled, { css } from 'styled-components';

import { typoTheme } from '@assets/styles/typo';
import { White, BlueHover, PrimaryLight, GreyCF } from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { SPACING } from '@assets/styles/theme';
import { smscreen } from '@assets/styles/medias';

export const Container = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0%;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: all 0.1s ease-in-out;
  background: ${White};
  ${RadiusSmall};
  box-sizing: border-box;
  width: 216px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${GreyCF};

  @media ${smscreen} {
    width: 190px;
  }
  ${({ styles }) => styles}
`;

export const Icon = styled.div``;

export const PopOverItem = styled.a`
  font-size: ${typoTheme.sizes.body1};
  line-height: 152%;
  color: ${PrimaryLight};
  padding: ${SPACING * 2}px ${SPACING * 4}px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  cursor: pointer;

  :not(:last-child) {
    border-bottom: 1px solid ${GreyCF};
  }

  > span {
    flex-grow: 1;
  }

  ${Icon} {
    display: inline-flex;
    flex-shrink: 0;
    margin-left: ${SPACING * 2}px;
  }

  :hover {
    background: ${BlueHover};
    color: ${PrimaryLight};
  }

  ${props =>
    props.disabled &&
    css`
      cursor: default;
      opacity: 0.25;
      pointer-events: none;
    `}
`;

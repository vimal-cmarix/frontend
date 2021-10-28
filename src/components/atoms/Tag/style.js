import styled, { css } from 'styled-components';

import { Grey100, TagBG } from '@assets/styles/colors';
import { RadiusXLarge } from '@assets/styles/radius';
import { DEFAULT_FONT, SPACING } from '@assets/styles/theme';

const types = {
  solid: css`
    background-color: ${TagBG};
    padding: 3px ${SPACING * 5}px;
    min-height: 24px;
    word-break: break-word;
  `,
  outline: css`
    border: 1px solid ${Grey100};
    background-color: transparent;
    padding: 3px ${SPACING * 5}px;
  `,
  thin: css`
    background-color: ${TagBG};
    padding: 3px ${SPACING * 5}px;
    height: 20px;
  `,
};

export const RemoveButton = styled.span`
  display: inline-flex;
  cursor: pointer;
  position: relative;
  top: 1px;
  margin-left: ${SPACING}px;
  margin-right: -${SPACING}px;
`;

export const DefaultTag = styled.div`
  ${RadiusXLarge};
  display: inline-flex;
  align-items: center;
  font-family: ${DEFAULT_FONT};

  ${({ type }) => types[type]};
`;

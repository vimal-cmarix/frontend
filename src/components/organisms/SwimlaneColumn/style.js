import styled, { css } from 'styled-components';

import { SPACING } from '@assets/styles/theme';

export const Content = styled.div`
  flex-grow: 1;
  padding: ${SPACING}px ${SPACING * 4}px;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  > * {
    position: relative;
    z-index: 1;
  }

  ${props =>
    props.isDraggingOver &&
    css`
      ::before {
        content: '';
        width: calc(100% - ${SPACING * 4}px);
        height: calc(100% - ${SPACING * 4}px);
        background-color: #f3f2f4;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        border-radius: 10px;
      }
    `};
`;

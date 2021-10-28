import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  ${({ spaceElements, spaceY }) =>
    spaceElements &&
    css`
      & + & {
        margin-top: ${spaceY}px;
      }

      > *:not(:last-child) {
        margin-right: ${spaceElements}px;
      }
    `};
`;

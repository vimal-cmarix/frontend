import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin: ${({ spaceY }) => `${spaceY / 2}px 0`};
  }

  ${({ spaceX }) =>
    spaceX &&
    css`
      > *:not(:last-child) {
        margin-right: ${spaceX}px;
      }
    `};
`;

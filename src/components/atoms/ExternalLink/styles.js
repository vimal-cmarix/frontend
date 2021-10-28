import styled, { css } from 'styled-components';

export const CustomLink = styled.a`
  &:hover {
    text-decoration: ${({ decoration }) => decoration || 'underline'};
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: default;

      &:hover {
        text-decoration: none;
      }
    `}
`;

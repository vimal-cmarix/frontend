import styled from 'styled-components';
import { Grey100, Black, Grey400, Red } from '@assets/styles/colors';
import { RadiusXSmall } from '@assets/styles/radius';
import { HeadingMedium, ParagraphLarge } from '@assets/styles/typography';
import { smscreen } from '@assets/styles/medias';

export const Code = styled.div`
  ${RadiusXSmall}
  border: 1px solid ${({ error }) => (error ? Red : Grey100)};
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: text;
  ${({ error, focus }) =>
    focus &&
    `
    border-color: ${error ? Red : Black};
  `}

  @media ${smscreen} {
    width: 42px;
    height: 42px;
  }
`;

export const Number = styled.p`
  ${HeadingMedium}
  color: ${({ value }) => (value ? Black : Grey400)};

  @media ${smscreen} {
    ${ParagraphLarge}
  }
`;

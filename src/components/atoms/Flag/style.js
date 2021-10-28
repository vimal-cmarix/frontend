import styled from 'styled-components';
import { Yellow, White, Red } from '@assets/styles/colors';
import { RadiusXSmall } from '@assets/styles/radius';
import { ParagraphXSmall } from '@assets/styles/typography';

const schema = {
  yellow: {
    color: White,
    background: Yellow,
  },
  red: {
    color: White,
    background: Red,
  },
};

export const Container = styled.div`
  ${RadiusXSmall}
  background-color: ${props => schema[props.schema].background};
  padding: 1px 4px;
  width: fit-content;
  display: flex;
  margin: 0 8px;

  span {
    color: ${props => schema[props.schema].color};
  }
`;

export const Label = styled.span`
  ${ParagraphXSmall}
  font-weight: 700;
  text-transform: uppercase;
  line-height: 16px;
`;

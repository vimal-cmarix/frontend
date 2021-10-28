import { ParagraphSmall } from '@assets/styles/typography';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px 60px;
  flex-wrap: wrap;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  margin: 20px;
`;

export const Text = styled.span`
  ${ParagraphSmall};
  text-align: center;
  margin-top: 5px;
`;

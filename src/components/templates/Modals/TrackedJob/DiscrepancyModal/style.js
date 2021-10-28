import { PrimaryLight, GreyCF, GreyF3 } from '@assets/styles/colors';
import styled from 'styled-components';

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 0;
`;

export const DiscrepancyModalHeader = styled.p`
  margin: 0 40px;
  font-size: 1.125rem;
  font-weight: 400;
  text-align: justify;
  margin-bottom: 2rem;
`;

export const DiscrepancyModalDivider = styled.p`
  font-size: 1.5rem;
  color: ${PrimaryLight};
  margin: 1rem 40px;
`;

export const DiscrepancyModalOption = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  padding: 0.5rem 40px;

  &:hover {
    background-color: ${GreyF3};
  }
`;

export const DiscrepancyModalOptionType = styled.p`
  font-weight: 600;
`;

export const DiscrepancyModalOptionItem = styled.div`
  border: 1px ${GreyCF} solid;
  border-radius: 10px;
  padding: 0.5rem;
  width: 60%;
`;

import styled from 'styled-components';
import { Grey100, Primary } from '@assets/styles/colors';
import { RadiusSmall, RadiusCircle } from '@assets/styles/radius';
import { ParagraphSmall } from '@assets/styles/typography';

export const Container = styled.div`
  ${RadiusSmall}
  width: 100%;
  height: 100%;
  border: 1px solid ${Grey100};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

export const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  ${RadiusCircle}
  color: ${Primary};
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const Text = styled.span`
  ${ParagraphSmall}
  display: block;
  color: ${Primary};
`;

import styled from 'styled-components';
import { White, Grey100, Grey50, Blue, Black } from '@assets/styles/colors';
import { RadiusCircle, RadiusSmall } from '@assets/styles/radius';
import { LabelSmall } from '@assets/styles/typography';

export const Container = styled.div`
  ${RadiusSmall}
  background: ${White};
  border: 1px solid ${Grey100};
  padding: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 16px;
`;

export const FileIconCircle = styled.div`
  ${RadiusCircle}
  width: 48px;
  height: 48px;
  background: ${Grey50};
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FileIconWrapper = styled.div`
  font-size: 24px;
  color: ${Blue};
`;

export const FileName = styled.span`
  ${LabelSmall}
  color: ${Black};
  display: block;
`;

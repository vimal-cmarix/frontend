import styled from 'styled-components';
import { White, Primary } from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { LargeElevation } from '@assets/styles/elevations';
import {
  ParagraphSmall,
  LabelXSmall,
  LabelSmall,
} from '@assets/styles/typography';
import { smscreen } from '@assets/styles/medias';

export const Container = styled.div`
  background: ${White};
  ${RadiusSmall}
  ${LargeElevation}
  max-width:96vw;
`;

export const Header = styled.div`
  padding: 16px 16px 8px 16px;
`;

export const Progress = styled.span`
  background: ${Primary};
  color: ${White};
  ${RadiusSmall};
  ${LabelSmall};
  padding: 4px 8px;
`;

export const Content = styled.div`
  padding: 10px;
  max-width: 300px;
  height: 60px;
  width: 500px;
  margin-bottom: 20px ${ParagraphSmall};
`;
export const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;
  ${LabelXSmall}
`;

export const LinkFooter = styled.span`
  color: ${Primary};
  cursor: pointer;
  display: block;
  padding: 8px 16px 16px 16px;
`;

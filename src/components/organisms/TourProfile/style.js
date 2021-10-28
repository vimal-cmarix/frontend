import styled from 'styled-components';
import { Primary, TagBG } from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { LargeElevation } from '@assets/styles/elevations';
import { LabelXSmall } from '@assets/styles/typography';

export const Container = styled.div`
  background: ${TagBG};
  ${RadiusSmall}
  ${LargeElevation}
  width: 400px;
  max-width: 95vw;
`;

export const Content = styled.div`
  padding: 16px;
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${LabelXSmall}
`;

export const LinkFooter = styled.span`
  color: ${Primary};
  cursor: pointer;
  display: block;
  padding: 8px 16px 16px 16px;
`;

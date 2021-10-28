import styled from 'styled-components';
import { rgba } from 'polished';
import { RadiusSmall, RadiusXSmall } from '@assets/styles/radius';
import { Grey100, Black, White, Haiti } from '@assets/styles/colors';
import { LabelSmall } from '@assets/styles/typography';

export const Container = styled.div`
  ${RadiusSmall}
  border: 1px solid ${Grey100};
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  ${RadiusXSmall}
  height: 80px;
  width: 112px;
  overflow: hidden;
  margin-right: 16px;
  position: relative;
`;

export const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${rgba(Haiti, 0.5)};
`;

export const IconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${White};
  font-size: 24px;
`;

export const Text = styled.span`
  ${LabelSmall}
  color: ${Black};
  max-width: 146px;
`;

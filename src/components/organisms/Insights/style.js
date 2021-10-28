import styled, { css } from 'styled-components';
import { HeadingLarge, LabelLarge } from '@assets/styles/typography';
import { Black, Grey, Grey100, White } from '@assets/styles/colors';
import { RadiusMedium } from '@assets/styles/radius';
import { SmallElevation } from '@assets/styles/elevations';

export const LoaderWrapperInsight = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const InsightTitle = styled.h2`
  ${HeadingLarge}
  color: ${Black};
  padding-bottom: 4px;
`;

export const InsightDescription = styled.p`
  ${LabelLarge}
  color: ${Grey};
  display: flex;
  flex-direction: row;
  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
    margin-left: 5px;
  }
`;

export const InsightWrapper = styled.div`
  padding-bottom: 24px;
`;

export const Insight = styled.div`
  background: ${White};
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${Grey100};
  ${RadiusMedium}
  padding: 24px;
  ${SmallElevation}
  position: relative;
  overflow: hidden;

  ${InsightDescription},
  ${InsightTitle} {
    opacity: ${p => (p.loading === 'true' ? '0' : '1')};
  }
`;

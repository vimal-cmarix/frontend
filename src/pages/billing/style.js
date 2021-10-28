import styled from 'styled-components';
import {
  White,
  Grey100,
  Haiti,
  Black,
  Grey,
  Primary,
} from '@assets/styles/colors';
import { RadiusMedium } from '@assets/styles/radius';
import {
  LabelMediumUpper,
  HeadingLarge,
  LabelMedium,
} from '@assets/styles/typography';
import { smscreen } from '@assets/styles/medias';

export const Title = styled.h1`
  color: ${Haiti};
  ${HeadingLarge};
  padding-bottom: 40px;
`;

export const Section = styled.section`
  padding-bottom: 42px;
  position: relative;
  height: 100%;

  @media (max-width: 767px) {
    &.billingBox {
      overflow: hidden;
    }
  }
`;

export const SectionWrapper = styled.div`
  background: ${White};
  padding: 24px 24px 48px 24px;
  box-sizing: border-box;
  border: 1px solid ${Grey100};
  ${RadiusMedium}
  height: calc(100% - 42px);
  min-height: 228px;
  position: relative;

  @media ${smscreen} {
    min-height: auto;
  }
`;

export const SectionTitle = styled.h2`
  ${LabelMediumUpper}
  margin-bottom: 16px;
`;

export const ContentWrapper = styled.div`
  @media ${smscreen} {
    padding-bottom: 40px;
  }
`;

export const SectionSubtitle = styled.h4`
  ${LabelMedium}
  color: ${Black};
  margin-bottom: 10px;
`;

export const SectionText = styled.p`
  ${LabelMedium}
  color: ${Grey};
`;

export const LinkFooterWrapper = styled.div`
  position: absolute;
  left: 24px;
  bottom: 24px;
  width: 100%;
  display: flex;

  a {
    color: ${Primary} !important;
    margin-right: 24px;
  }
`;

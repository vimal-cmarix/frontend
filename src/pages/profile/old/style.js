import styled from 'styled-components';
import {
  LabelMediumUpper,
  HeadingXSmall,
  LabelSmall,
  HeadingLarge,
  HeadingSmall,
} from '@assets/styles/typography';
import { RadiusMedium } from '@assets/styles/radius';
import { smscreen, xxsscreen } from '@assets/styles/medias';
import { Black, Primary, White, Grey100, Grey400 } from '@assets/styles/colors';

export const AddButton = styled.span`
  ${LabelSmall}
  color: ${Primary};
  display: block;
  position: absolute;
  padding: 0px 0px 5px 5px;
  top: 0;
  right: 0;
  cursor: pointer;
  white-space: nowrap;

  @media ${smscreen} {
    top: 12px;
  }
`;

export const EditIconWrapper = styled.div`
  padding: 0px 0px 5px 5px;
  margin-left: 8px;
  color: ${Primary};
  cursor: pointer;
`;

export const Section = styled.section`
  margin-bottom: 30px;
  position: relative;

  &[data-tut*='__resume'] {
    &.active-step {
      @media ${xxsscreen} {
        padding-bottom: 72px;
      }
    }
  }

  &[data-tut*='__summary'] {
    &.active-step {
      .summary-edit {
        display: none;
      }
      ${AddButton} {
        display: none;
      }
    }
  }
`;

export const LinkContainer = styled.div`
  margin-bottom: 32px;

  @media ${smscreen} {
    display: none;
  }
`;

export const TextHelp = styled.div`
  ${LabelSmall}
  color: ${Grey400}
`;

export const SectionWrapper = styled.section`
  background: ${White};
  padding: 24px;
  box-sizing: border-box;
  border: 1px solid ${Grey100};
  ${RadiusMedium}
`;

export const SectionTitle = styled.h4`
  ${LabelMediumUpper}
  margin-bottom: 16px;

  @media ${smscreen} {
    color: ${props => (props.largeMobile ? Black : '')};
    ${props => (props.largeMobile ? HeadingLarge : LabelMediumUpper)}
  }
`;

export const VideoWrapper = styled.div`
  width: 100%;
  height: 27vw;
  margin-bottom: 16px;

  @media ${smscreen} {
    height: 229px;
    width: ${props => (props.fullWidth ? '100vw' : '100%')};
    margin-left: ${props => (props.fullWidth ? '-16px' : '0')};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const VideoTitle = styled.h3`
  ${HeadingXSmall}
  color: ${Black};
  display: block;

  @media ${smscreen} {
    ${HeadingSmall}
  }
`;

export const EditArea = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;

  @media ${smscreen} {
    top: 10px;
  }
`;

export const SummaryCardWrapper = styled.div`
  position: relative;
`;

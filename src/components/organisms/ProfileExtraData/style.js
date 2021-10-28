import styled from 'styled-components';

import { Black, Primary, Grey100, Grey400, White } from '@assets/styles/colors';
import { smscreen, sizes as breakpoint } from '@assets/styles/medias';
import { RadiusMedium } from '@assets/styles/radius';
import { SPACING } from '@assets/styles/theme';
import {
  HeadingLarge,
  LabelMediumUpper,
  LabelSmall,
} from '@assets/styles/typography';

export const Container = styled.section``;

export const Content = styled.div`
  padding: ${SPACING * 8}px;

  @media ${smscreen} {
    padding-bottom: 70px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    padding: ${SPACING * 8}px;
  }
`;

export const AddButton = styled.span`
  ${LabelSmall};
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
`;

export const TextHelp = styled.div`
  ${LabelSmall};
  color: ${Grey400};
`;

export const SectionWrapper = styled.section`
  background: ${White};
  padding: 24px;
  box-sizing: border-box;
  border: 1px solid ${Grey100};
  ${RadiusMedium};
`;

export const SectionTitle = styled.h4`
  ${LabelMediumUpper};
  margin-bottom: 16px;

  @media ${smscreen} {
    color: ${props => (props.largeMobile ? Black : '')};
    ${props => (props.largeMobile ? HeadingLarge : LabelMediumUpper)};
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

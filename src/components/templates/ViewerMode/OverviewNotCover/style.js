import styled from 'styled-components';

import { sizes as breakpoint } from '@assets/styles/medias';
import { RadiusMedium } from '@assets/styles/radius';
import { SPACING } from '@assets/styles/theme';

export const TitleWrapper = styled.div`
  margin-bottom: ${SPACING * 3}px;
`;

export const SkillsSliderWrapper = styled.div`
  &,
  > div {
    width: 270px;
    margin: 0 auto;
  }
`;

export const Card = styled.article`
  ${RadiusMedium};
  min-width: 0;
  grid-column-end: span 1;
  background: #fdfdfd;
  padding: ${SPACING * 7}px ${SPACING * 6}px;
  box-shadow: 2px 3px 10px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${SPACING * 8}px;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @media screen and (min-width: ${breakpoint.laptop}) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 60px;
  }
`;

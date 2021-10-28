import styled from 'styled-components';

import { DEFAULT_FONT, SPACING } from '@assets/styles/theme';
import { RadiusMedium } from '@assets/styles/radius';
import { sizes as breakpoint } from '@assets/styles/medias';

import { levelColors } from './constants';

export const CardSkillWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 30px;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 66px;
    grid-row-gap: 105px;
  }

  @media screen and (min-width: ${breakpoint.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 130px;
    grid-row-gap: 90px;
  }
`;

export const IconMoveContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const ArrowContainer = styled.div`
  margin-left: ${SPACING * 2}px;
`;

export const Title = styled.h2`
  font-size: 30px;
  line-height: 152%;
  font-family: ${DEFAULT_FONT};
  font-weight: 700;
`;

export const LevelText = styled.span`
  font-size: 14px;
  line-height: 152%;
  font-family: ${DEFAULT_FONT};
  font-weight: 400;
  margin-top: ${SPACING}px;
`;

export const RelatedText = styled.span`
  font-size: 14px;
  line-height: 152%;
  font-family: ${DEFAULT_FONT};
  font-weight: 400;
  margin-top: ${SPACING}px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    margin-top: ${SPACING * 8}px;
  }
`;

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  ${RadiusMedium};
  background-color: ${props => levelColors[props.level].bg};
  padding: ${SPACING * 6}px;
  position: relative;

  ${Title} {
    color: ${props => levelColors[props.level].colorTitle};
  }

  ${IconMoveContainer},
  ${LevelText} {
    color: ${props => levelColors[props.level].colorLevelText};
  }

  ${RelatedText} {
    color: ${props => levelColors[props.level].colorRelatedText};
  }
`;

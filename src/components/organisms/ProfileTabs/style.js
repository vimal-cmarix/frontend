import styled, { css } from 'styled-components';

import { PrimaryLight } from '@assets/styles/colors';
import { SPACING } from '@assets/styles/theme';
import { sizes as breakpoint } from '@assets/styles/medias';

export const FillBox = styled.li`
  width: ${SPACING * 8}px;
  height: 1px;
  display: inline-flex;
  flex-shrink: 0;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    width: ${SPACING * 9}px;
  }
`;

export const Container = styled.ul`
  display: flex;
  align-items: center;
  background-color: ${PrimaryLight};
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  & + & {
    margin-top: 20px;
  }

  ${props =>
    props.isTimeline &&
    css`
      border-radius: 30px 30px 0px 0px;
      height: 68px;
    `};

  .swiper-wrapper {
    display: flex;
  }

  .swiper-slide + .swiper-slide {
    margin-left: ${SPACING * 9}px;
  }
`;

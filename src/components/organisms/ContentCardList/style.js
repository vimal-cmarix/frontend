import styled, { css } from 'styled-components';

import { sizes as breakpoint } from '@assets/styles/medias';
import { Black, Grey400, Primary, White } from '@assets/styles/colors';
import { SPACING } from '@assets/styles/theme';

export const HandleCheck = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  background-color: ${White};
  width: 30px;
  height: 30px;
  border-radius: 100%;
  position: absolute;
  top: ${SPACING * 3}px;
  right: ${SPACING * 3}px;
  z-index: 1;
  border: 1px solid ${Grey400};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${White};
  outline: none;

  ${({ isSelect }) =>
    isSelect &&
    css`
      background-color: ${Black};
      border-color: ${Black};
    `};
`;

export const HandleDrag = styled(HandleCheck)`
  border: 0;
  color: ${Primary};
`;

export const ContainerItem = styled.div`
  position: relative;
  min-width: 0;
  grid-column-end: span 1;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 30px;

  &.addPitchModalList {
    background: #fff;
  }
  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 100px;
    grid-row-gap: 70px;
    &.addPitchModalList {
      grid-column-gap: 40px;
      grid-row-gap: 40px;
    }
  }

  @media screen and (min-width: ${breakpoint.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

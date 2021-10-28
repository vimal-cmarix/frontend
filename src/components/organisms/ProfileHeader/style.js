import { White } from '@assets/styles/colors';
import { xmscreen, sizes as breakpoint } from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';
import styled from 'styled-components';

export const Container = styled.div``;

export const HeaderWrapper = styled.div`
  background-color: ${White};
  padding: 0 ${SPACING * 8}px ${SPACING * 4}px ${SPACING * 8}px;
  position: relative;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    padding: 0 ${SPACING * 9}px ${SPACING * 4}px ${SPACING * 9}px;
  }
`;

export const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

export const RightContent = styled.div`
  position: absolute;
  right: ${SPACING * 9}px;
  top: 22px;

  @media ${xmscreen} {
    top: 19px;
    right: ${SPACING * 8}px;
  }
`;

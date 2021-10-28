import styled from 'styled-components';

import { SPACING } from '@assets/styles/theme';
import { sizes as breakpoint } from '@assets/styles/medias';
import { GreyCF } from '@assets/styles/colors';

export const LoaderContainer = styled.div`
  padding: ${SPACING * 6}px;
  display: flex;
  justify-content: center;
`;

export const DividerContent = styled.div`
  width: 155px;
  height: 1px;
  margin-top: ${SPACING * 4}px;
  margin-bottom: ${SPACING * 11}px;
  @media (max-width: 1023px) {
    margin-bottom: 25px;
  }
`;

export const Container = styled.section`
  padding: ${SPACING * 8}px;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    padding: ${SPACING * 9}px;
  }
  @media (max-width: 1023px) {
    &.contentTabWrap {
      padding-bottom: 90px;
    }
  }
`;

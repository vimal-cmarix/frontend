import styled from 'styled-components';

import { SPACING, DEFAULT_FONT } from '@assets/styles/theme';
import { Grey31 } from '@assets/styles/colors';
import { sizes as breakpoint } from '@assets/styles/medias';

export const MobileTitle = styled.h2`
  font-size: 16px;
  line-height: 152%;
  color: ${Grey31};
  display: flex;
  justify-content: left;
  margin-left: 10px;
  flex-grow: 1;
  font-weight: normal;
  font-family: ${DEFAULT_FONT};

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    display: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${SPACING * 4}px;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    padding: 0 ${SPACING * 6}px;
  }
`;

import styled from 'styled-components';

import { Typography } from '@assets/styles/typo';
import { SPACING } from '@assets/styles/theme';
import { sizes as breakpoint } from '@assets/styles/medias';

import Btn from '@components/molecules/Btn';

import { cdn } from '@utils/general';

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    width: 232px;
    max-width: 100%;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const BtnConfirm = styled(Btn)`
  @media screen and (max-width: ${breakpoint.tabletPortrait}) {
    align-self: flex-end;
  }
`;

export const Title = styled(Typography)`
  color: #a873fa;
  margin-bottom: ${SPACING * 4}px;

  @media screen and (max-width: ${breakpoint.tabletPortrait}) {
    width: 178px;
    align-self: center;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 525px;
  height: 288px;
  max-width: 100%;
  box-sizing: border-box;
  background-image: url(${cdn('/static/img/pricing/discount-bg.svg')});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center bottom;
  border-radius: 2rem;
  overflow: hidden;
  padding: ${SPACING * 3}px ${SPACING * 6}px;

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    background-size: cover;
    background-position: center center;
  }
`;

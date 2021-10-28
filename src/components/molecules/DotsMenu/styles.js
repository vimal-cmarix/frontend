import styled from 'styled-components';
import { DEFAULT_FONT } from '@assets/styles/theme';

import { MediumElevation } from '@assets/styles/elevations';

export const Container = styled.div`
  max-width: 100px;
  min-height: 125px;
  background-color: #ffffff;
  ${MediumElevation};
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: calc(100% + 10px);

  opacity: ${({ showMenu }) => (showMenu ? 1 : 0)};
  z-index: 999;
  transition: 0.2s;
`;

export const MenuItem = styled.div`
  display: flex;
  font-family: ${DEFAULT_FONT};
  cursor: pointer;

  span {
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #a99de0;
    margin-left: 18px;
  }
`;

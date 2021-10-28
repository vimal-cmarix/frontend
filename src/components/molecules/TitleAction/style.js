import styled from 'styled-components';

import { SPACING } from '@assets/styles/theme';
import { Grey31, Primary } from '@assets/styles/colors';

export const ActionArea = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 0;
  background-color: transparent;
  color: ${Grey31};
  outline: none;
  cursor: pointer;

  :hover {
    color: ${Primary};
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;

  ${ActionArea} {
    position: relative;
    margin-left: ${SPACING}px;
    top: -8px;
  }
`;

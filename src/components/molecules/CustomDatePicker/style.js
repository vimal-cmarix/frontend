import styled, { css } from 'styled-components';
import { GreyCF, Grey31, Red, White } from '@assets/styles/colors';

import { DEFAULT_FONT } from '@assets/styles/theme';

export const Container = styled.div`
  position: relative;
`;

export const DatePickerInputContainer = styled.div`
  display: flex;
  height: 40px;
  border: 1px solid ${({ isOpened }) => (isOpened ? '#6F5CCD' : GreyCF)};
  overflow: hidden;
  border-radius: 10px;
  padding-left: 10px;
  max-width: 174px;

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${Red};
      background-color: #fcf5f4;
    `}
`;

export const DatePickerInput = styled.input`
  border: 0;
  padding: 0;
  background-color: ${({ hasError }) => (hasError ? '#fcf5f4' : '#ffffff')};
  outline: none;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  font-family: ${DEFAULT_FONT};
  font-weight: 400;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  color: ${Grey31};
`;

export const ButtonCorner = styled.div`
  cursor: pointer;
  display: flex;
  min-width: 44px;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ isOpened }) => (isOpened ? '#6F5CCD' : '#616161')};
  color: ${White};
`;

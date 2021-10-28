import styled from 'styled-components';

import { SPACING, DEFAULT_FONT } from '@assets/styles/theme';
import { Grey31, MediumGrey, Primary, GreyCF } from '@assets/styles/colors';
import Btn from '@components/molecules/Btn';

export const HeaderLeft = styled.div`
  color: ${props => props.color};
`;

export const HeaderRight = styled.div`
  color: ${Primary};
  position: relative;
`;

export const HeaderGroup = styled.div`
  display: flex;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${GreyCF};
  display: block;
  margin: ${SPACING * 8}px 0;
`;

export const HeaderContent = styled.div`
  > h2,
  > span {
    font-family: ${DEFAULT_FONT};
    line-height: 152%;
  }

  > h2 {
    font-size: 16px;
    color: ${Grey31};
  }

  > span {
    font-size: 18px;
    color: ${MediumGrey};
  }
`;

export const Header = styled.header`
  padding: 40px ${SPACING * 4}px ${SPACING * 2}px ${SPACING * 4}px;

  ${HeaderLeft} {
    flex-shrink: 0;
  }

  ${HeaderContent} {
    flex-grow: 1;
    text-align: center;
  }
`;

export const HorizontalBar = styled.div`
  border: 1px solid ${MediumGrey};
  box-sizing: border-box;
  user-select: none;
  margin-top: ${SPACING * 8}px;
`;

export const HeaderColor = styled.div`
  background: ${props => props.color};
  width: 100%;
  height: 8px;
  min-height: 8px;
`;

export const ColorPopover = styled.div`
  right: 0;
  position: absolute;
  z-index: 2;
  width: 220px;
  trigger: 'focus';
  padding: 10px 10px;
  box-sizing: initial;
  background: rgb(255, 255, 255);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.15) 0px 8px 16px;
  .sketch-picker {
    width: 100% !important;
    padding: 0 0 10px !important;
    box-sizing: initial;
    background: rgb(255, 255, 255);
    border-radius: 0;
    box-shadow: none !important;
    .flexbox-fix input {
      font-family: Lato, sans-serif;
    }
    label {
      font-family: Lato, sans-serif;
    }
  }
`;

export const HeaderColorPicker = styled.div`
  width: 35px;
  height: 22px;
  borderradius: 2px;
  button {
    position: relative;
    > div {
      width: 13px;
      height: 13px;
      position: absolute;
      right: -17px;
    }
  }
`;

export const PopoverAction = styled.div`
  text-align: center;
  justify-content: space-between;
  display: flex;
  button {
    padding: 0 27px;
    line-height: 130%;
    height: 34px;
    &:first-child {
      border-color: transparent;
    }
  }
`;

export const Container = styled.div`
  width: 288px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  user-select: none;
  scroll-snap-align: start;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;
// :not(:last-child) {
//   border-right: 1px solid #f3f2f4;
// }

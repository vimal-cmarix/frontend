import styled from 'styled-components';
import { Black, Grey200, Grey50, White } from '@assets/styles/colors';
import { RadiusXSmall } from '@assets/styles/radius';

export const CheckboxWrapper = styled.div`
  position: absolute;
  z-index: 3;
  right: 5px;
  top: 5px;
  color: ${White};
`;

export const CustomCheckboxIcon = styled.div`
  ${RadiusXSmall}
  width: 14px;
  height: 14px;
  background: ${White};
  border: 1px solid ${Grey200};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  object-fit: contain;
  object-position: center center;
`;

export const ThumbItemWrapper = styled.label`
  position: relative;
  cursor: pointer;
  display: flex;
  width: 176px;
  height: 99px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  // border: 1px solid black;
  overflow: hidden;

  input {
    display: none;

    &:checked + ${CustomCheckboxIcon} {
      background: ${Black};
      border-color: ${Black};
    }

    &:disabled + ${CustomCheckboxIcon} {
      background: ${Grey50};
      border-color: ${Grey50};
    }
  }
`;

import styled from 'styled-components';
import {
  Grey100,
  Grey500,
  White,
  Grey200,
  Black,
  Grey50,
  Primary,
} from '@assets/styles/colors';
import { RadiusXSmall } from '@assets/styles/radius';
import { ParagraphSmall } from '@assets/styles/typography';
import { Hint as hintStyle } from '@components/molecules/TextInput/style';
import { SmallElevation } from '@assets/styles/elevations';
import Icon from '@components/atoms/Icon';

export const Container = styled.label`
  display: flex;
  align-items: center;
  flex: 1;

  &.checkboxVideo {
    margin-top: 25px;
  }

  &.pinTaskLabel {
    width: max-content;
    cursor: pointer;
  }
`;

export const CustomIconContainer = styled.div`
  ${RadiusXSmall}
  width: 14px;
  height: 14px;
  background: ${White};
  border: 1px solid ${Grey200};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${props => (props.label ? '8px' : '0')};
`;

export const IconWrapper = styled.div`
  font-size: 14px;
  color: ${White};
`;

export const Label = styled.span`
  ${ParagraphSmall}
  line-height: 16px;
  display: block;
  user-select: none;
  color: ${({ changeColourFocused }) =>
    changeColourFocused ? Primary : Grey500};
`;

export const Hint = styled(hintStyle)`
  ${SmallElevation}
  display: none;
  position: absolute;
  background-color: ${White};
  color: ${Black};
  width: 125px;
  top: -56px;
  left: 18px;
  padding: 8px;
  cursor: initial;
  border: 1px solid ${Grey100};

  &:hover {
    display: block;
  }
`;

export const HintContainer = styled.div`
  position: relative;
  margin-left: 8px;
`;

export const IconQuestWrapper = styled.div`
  font-size: 16px;
  color: ${Grey500};
  cursor: pointer;

  &:hover {
    + span {
      display: block;
    }
  }
`;

export const Input = styled.input`
  display: none;

  &:checked + ${CustomIconContainer} {
    background: ${({ changeColourFocused }) =>
      changeColourFocused ? Primary : Black};
    border-color: ${({ changeColourFocused }) =>
      changeColourFocused ? Primary : Black};
  }

  &:disabled + ${CustomIconContainer} {
    background: ${Grey50};
    border-color: ${Grey50};

    ${IconWrapper} {
      color: ${Grey50};
    }
  }
`;

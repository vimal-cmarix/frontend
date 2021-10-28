import styled, { css } from 'styled-components';
import { tint } from 'polished';
import {
  ParagraphSmall,
  LabelXSmall,
  ParagraphMedium,
} from '@assets/styles/typography';
import { LargeElevation } from '@assets/styles/elevations';
import { RadiusSmall } from '@assets/styles/radius';
import {
  Grey50,
  MediumGrey,
  Grey500,
  Black,
  White,
  Red,
  Grey,
  Grey400,
  BlueHover,
  GreyC9,
  GreyCF,
  ExtraLightGrey,
  Grey61,
} from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';

const getBorderColor = ({ disabled, error, focus }) => {
  if (error) return Red;
  if (disabled) return Grey50;
  if (focus) return Black;
  return GreyC9;
};

const getBackgroundColor = ({ disabled, error }) => {
  if (error) return tint(0.95, Red);
  if (disabled) return BlueHover;
  return White;
};

const getLabelColor = ({ disabled, activeOrValue }) => {
  if (disabled) return Grey400;
  if (activeOrValue) return Black;
  return Grey500;
};

const getHintColor = ({ disabled, error }) => {
  if (error) return Red;
  if (disabled) return Grey400;
  return Grey;
};

const getTopOrBottomPosition = ({ position, topOrBottom }) => {
  if (position !== 'absolute') return '';
  if (topOrBottom) return topOrBottom;
  return '40px';
};

const getWidthDropDown = ({ position }) => {
  if (position === 'fixed') return '84%';
  return '100%';
};

export const Container = styled.div`
  position: relative;
  width: 100%;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

const SelectBox = styled.div`
  ${RadiusSmall}
  background: ${props => getBackgroundColor(props)};
  border-color: ${props => getBorderColor({ ...props, focus: props.isActive })};
  border-style: solid;
  border-width: 1px;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;

  @media ${smscreen} {
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-radius: 0;
  }
`;

export const SmallSelectBox = styled(SelectBox)`
  padding: 5px 11px;
`;

export const MediumSelectBox = styled(SelectBox)`
  padding: 9px 11px;
`;

export const Label = styled.span`
  ${ParagraphSmall}
  color: ${props =>
    getLabelColor({
      ...props,
      activeOrValue: props.isActive || props.hasValue,
    })};
  display: block;
  user-select: none;
`;

export const Hint = styled.div`
  ${LabelXSmall}
  margin-top: 8px;
  color: ${props => getHintColor(props)};
  display: block;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  font-size: 24px;
  svg {
    width: 20px;
    height: 30px;
    margin-right: 5px;
  }
`;

export const DropDownContainer = styled.div`
  ${RadiusSmall};
  ${LargeElevation};
  background: ${White};
  position: ${({ position }) => position};
  ${({ toTop }) => (toTop ? 'bottom' : 'top')}: ${getTopOrBottomPosition};
  margin-top: 10px;
  width: ${getWidthDropDown};
  z-index: 1;
  overflow: auto;
`;

export const ContainerOptions = styled.div`
  > div:not(:last-child) {
    border-bottom: 0.5px solid ${GreyCF};
  }
`;

export const OptionLabel = styled.span`
  ${ParagraphMedium}
  color: ${MediumGrey};
  display: block;
  user-select: none;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  background: ${White};

  &:hover {
    background: ${ExtraLightGrey};

    ${OptionLabel} {
      color: ${Grey61};
    }
  }
`;

export const ContainerAvatar = styled.div`
  margin: 0 10px 0 0;
`;

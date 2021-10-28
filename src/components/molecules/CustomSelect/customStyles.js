import { tint } from 'polished';
import {
  Black,
  Grey50,
  Grey400,
  Grey500,
  White,
  Red,
  ExtraLightGrey,
  Grey61,
  MediumGrey,
  GreyCF,
  GreyC4,
} from '@assets/styles/colors';
import { LargeElevation } from '@assets/styles/elevations';
import { RadiusSmall } from '@assets/styles/radius';
import { DEFAULT_FONT } from '@assets/styles/theme';

const getOptionBackground = state => {
  if (state.isFocused) return ExtraLightGrey;
  if (state.isSelected) return ExtraLightGrey;
  return White;
};

const getControlBackground = state => {
  if (state.selectProps.error) return tint(0.95, Red);
  if (state.isDisabled) return Grey50;
  return White;
};

const getBorderColor = state => {
  if (state.selectProps.error) return Red;
  if (state.isDisabled) return Grey50;
  if (state.isFocused) return Black;
  return GreyC4;
};

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: RadiusSmall.split(':')[1],
    backgroundColor: getControlBackground(state),
    boxShadow: 'none',
    cursor: 'pointer',
    fontSize: 14,
    height: 40,
    lineHeight: '20px',
    borderColor: getBorderColor(state),

    ':hover': {
      borderColor: getBorderColor(state),
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? Grey400 : GreyCF,
    fontFamily: DEFAULT_FONT,
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: Grey500,
    width: 34,
    padding: '8px',
    marginRight: 12,

    ':hover': {
      color: Grey500,
    },
  }),
  indicatorSeparator: () => ({
    display: 'auto',
  }),
  menu: provided => ({
    ...provided,
    boxShadow: LargeElevation.split(':')[1],
    borderRadius: RadiusSmall.split(':')[1],
    overflow: 'hidden',
    marginTop: 0,
    color: Black,
    ' div:not(:last-child)': {
      borderBottom: `0.5px solid ${GreyCF}`,
    },
  }),
  menuList: provided => ({
    ...provided,
    fontSize: '16px',
    lineHeight: '24px',
    color: MediumGrey,
    display: 'block',
    userSelect: 'none',
    maxHeight: 152,
    fontFamily: DEFAULT_FONT,
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    background: getOptionBackground(state),
    color: Grey61,

    '&:hover': {
      background: getOptionBackground(state),

      a: {
        color: Grey61,
      },
    },
  }),
};

export const customTheme = theme => theme;

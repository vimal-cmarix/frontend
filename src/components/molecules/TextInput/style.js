import styled, { css } from 'styled-components';
import { tint } from 'polished';
import { LabelXSmall } from '@assets/styles/typography';
import { typoTheme } from '@assets/styles/typo';
import { DEFAULT_FONT } from '@assets/styles/theme';
import { RadiusSmall } from '@assets/styles/radius';
import {
  Grey50,
  Grey400,
  GreyCF,
  Grey500,
  Black,
  White,
  Grey,
  Red,
  Grey61,
} from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';

export const Container = styled.div`
  position: ${({ position }) => position};
  width: 100%;
`;

const getBorderColor = ({ disabled, error, focus }) => {
  if (error) return Red;
  if (disabled) return Grey50;
  if (focus) return Grey61;
  return GreyCF;
};

const getBackgroundColor = ({ disabled, error }) => {
  if (error) return tint(0.95, Red);
  if (disabled) return Grey50;
  return White;
};

const getHintColor = ({ disabled, error }) => {
  if (error) return Red;
  if (disabled) return Grey400;
  return Grey;
};

const Input = styled.input`
  ${RadiusSmall};
  font-size: ${typoTheme.sizes.base};
  font-family: ${DEFAULT_FONT};
  background: ${props => getBackgroundColor(props)};
  color: ${props => (props.disabled ? Grey500 : Black)};
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => getBorderColor(props)};
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 40px;

  &:focus {
    background: ${props => getBackgroundColor(props)};
    border-color: ${props => getBorderColor({ ...props, focus: true })};
  }

  &::placeholder {
    color: ${GreyCF};
  }
  ${({ noBorder }) =>
    noBorder &&
    css`
      @media ${smscreen} {
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
        border-radius: 0;
      }
    `}
`;

export const SmallInput = styled(Input)`
  padding: 5px 11px;
`;

export const MediumInput = styled(Input)`
  padding: 9px 11px;
`;

export const TextAreaWrapper = styled.div`
  textarea {
    ${RadiusSmall};
    font-size: ${typoTheme.sizes.base};
    font-family: ${DEFAULT_FONT};
    background: ${props => getBackgroundColor(props)};
    color: ${props => (props.disabled ? Grey500 : Black)};
    display: block;
    width: 100%;
    border-width: ${props => (props.noBorder ? '0' : '1px')};
    border-style: solid;
    border-color: ${props => getBorderColor(props)};
    box-sizing: border-box;
    outline: none;
    padding: 8px 11px;
    resize: ${props => props.resize};
    min-height: 80px;
    -webkit-appearance: none;
    -moz-appearance: none;
    &.volunteerDes {
      height: 150px !important;
      overflow-y: auto !important;
    }
    &.pitchDes {
      height: 150px !important;
      overflow-y: auto !important;
    }
    &.aboutBlurb {
      height: 150px !important;
      overflow-y: auto !important;
    }
    &.editBlogDec {
      height: 150px !important;
      overflow-y: auto !important;
    }
    &.addNoteCard {
      height: 200px !important;
      overflow-y: auto !important;
    }
    &:focus {
      background: ${props => getBackgroundColor(props)};
      border-color: ${props => getBorderColor({ ...props, focus: true })};
    }

    &::placeholder {
      color: ${Grey400};
    }
  }
`;

export const Hint = styled.span`
  // ${LabelXSmall}
  // margin-top: 8px;
  // color: ${props => getHintColor(props)};
  // display: block;

  -webkit-font-smoothing: antialiased;
  text-transform: none;
  display: block;
  color: #ea0000;
  font-family: Mulish,sans-serif;
  font-size: 13px;
  line-height: 150%;
  font-weight: normal;
  margin: 5px 0 0;
  letter-spacing: 0;
`;

export const ArrowContainer = styled.div`
  position: absolute;
  right: 18px;
  top: 8px;
`;

export const ArrowWrapper = styled.span`
  display: flex;
  cursor: pointer;
  width: 12px;
  height: 12px;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: absolute;
  top: 12px;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.25;
      cursor: default;
      pointer-events: none;
    `}

  ${props =>
    props.up &&
    css`
      top: 0;
      transform: rotate(180deg);
      transform-origin: center;
    `}
`;

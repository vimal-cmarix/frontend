import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';
import {
  Linkedin,
  Haiti,
  White,
  Grey100,
  Blue,
  Primary,
  Grey,
  Grey200,
  Black,
  GreyC4,
  PrimaryDark,
} from '@assets/styles/colors';
import {
  LabelSmall,
  IconSmall,
  IconMedium,
  IconLarge,
} from '@assets/styles/typography';
import { RadiusSmall, RadiusXXLarge } from '@assets/styles/radius';

const sizes = {
  'xsmall-side': {
    padding: '8px 16px',
    typography: LabelSmall,
    buttonWidth: '200px',
  },
  xsmall: {
    padding: '8px 16px',
    typography: LabelSmall,
  },
  small: {
    padding: '10px 16px',
    typography: LabelSmall,
    width: '32px',
    height: '32px',
    icon: IconSmall,
  },
  medium: {
    padding: '14px 16px',
    typography: LabelSmall,
    width: '40px',
    height: '40px',
    icon: IconMedium,
  },
  large: {
    padding: '18px 16px',
    typography: LabelSmall,
    width: '48px',
    height: '48px',
    icon: IconLarge,
  },
};

const schemas = {
  primary: {
    color: White,
    backgroundColor: PrimaryDark,
    backgroundHover: Primary,
    backgroundActive: Primary,
  },
  secondary: {
    color: Haiti,
    backgroundColor: Grey100,
    backgroundHover: darken(0.03, Grey100),
    backgroundActive: darken(0.12, Grey100),
  },
  white: {
    color: Primary,
    backgroundColor: White,
    backgroundHover: darken(0.03, White),
    backgroundActive: darken(0.12, White),
    border: `1px solid ${Primary}`,
  },
  grey: {
    color: GreyC4,
    backgroundColor: White,
    backgroundHover: darken(0.03, White),
    backgroundActive: darken(0.12, White),
    border: `1px solid ${GreyC4}`,
  },
  purple: {
    color: Primary,
    colorHover: White,
    backgroundColor: White,
    backgroundHover: lighten(0.15, Primary),
    backgroundActive: lighten(0.1, Primary),
    border: `1px solid ${Primary}`,
    radius: RadiusXXLarge,
  },
  ghost: {
    color: Haiti,
    backgroundColor: 'transparent',
    backgroundHover: darken(0.03, White),
    backgroundActive: darken(0.12, White),
  },
  clean: {
    color: Grey,
    backgroundColor: 'transparent',
    backgroundHover: darken(0.03, White),
    backgroundActive: darken(0.12, White),
  },
  linkedin: {
    color: Black,
    backgroundColor: White,
    backgroundHover: darken(0.03, White),
    backgroundActive: darken(0.12, White),
    border: `1px solid ${Grey200}`,
    direction: 'row-reverse',
  },
  copy: {
    color: Primary,
    backgroundColor: 'transparent',
    backgroundHover: darken(0.03, White),
    backgroundActive: darken(0.12, White),
    direction: 'row-reverse',
  },
  icon: {
    color: Blue,
    backgroundColor: White,
  },
  share: {
    color: Haiti,
    backgroundColor: Grey100,
    backgroundHover: darken(0.03, Grey100),
    backgroundActive: darken(0.12, Grey100),
    direction: 'row-reverse',
  },
  outline: {
    color: Black,
    colorHover: White,
    backgroundColor: 'transparent',
    backgroundHover: PrimaryDark,
    backgroundActive: PrimaryDark,
    border: `1px solid ${Black}`,
    radius: RadiusXXLarge,
  },
  reward: {
    color: Primary,
    colorHover: White,
    backgroundColor: White,
    backgroundHover: Primary,
    backgroundActive: Primary,
    border: `1px solid ${Primary}`,
    fontFamily: 'Bebas Neue',
  },
};

export const DefaultButton = styled.button`
  ${props => sizes[props.size].typography}
  ${props => schemas[props.colorSchema].radius || RadiusSmall}
  width: ${props => sizes[props.size].buttonWidth || '100%'};
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: ${props => schemas[props.colorSchema].direction || 'row'};
  color: ${props => schemas[props.colorSchema].color};
  padding: ${props => sizes[props.size].padding};
  background: ${props => schemas[props.colorSchema].backgroundColor};
  pointer-events: ${props => (props.loading ? 'none' : 'inherit')};
  outline: none;
  border: ${props => schemas[props.colorSchema].border || 'none'};
  cursor: pointer;
  transition: 0.2s;
  position: relative;

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  :hover {
    background: ${props => schemas[props.colorSchema].backgroundHover};
    color: ${props => schemas[props.colorSchema].colorHover};
  }

  :active {
    background: ${props => schemas[props.colorSchema].backgroundActive};
    transition: none;
  }

  :disabled {
    opacity: 0.25;
    cursor: default;
    pointer-events: none;
  }

  ${props =>
    props.active &&
    css`
      background: ${schemas[props.colorSchema].backgroundActive};
    `}
`;

export const Label = styled.span`
  display: inline-block;
  user-select: none;
  white-space: wrap;
  opacity: ${props => (props.loading ? 0 : 1)};
`;

export const IconsWrapper = styled.span`
  display: inline-block;
  font-size: 24px;
  margin-left: 4px;
  transform: translateY(1px);

  span {
    line-height: 12px;
  }

  ${props => {
    if (props.icon === 'linkedin_solid')
      return css`
        margin-right: 12px;
        color: ${Linkedin};
      `;
    if (props.icon === 'copy')
      return css`
        margin-right: 12px;
      `;
    if (props.icon === 'share')
      return css`
        margin-right: 12px;
      `;
    return '';
  }}
`;

export const DefaultIconButton = styled(DefaultButton)`
  padding: 0;
  width: ${props => sizes[props.size].width};
  height: ${props => sizes[props.size].height};
  ${props => sizes[props.size].icon}
`;

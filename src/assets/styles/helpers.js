import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { Grey31, Grey100, SecondaryLight, White } from './colors';
import { RadiusCircle } from './radius';

export const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${Grey100};
  transition: all 0.3s;
  opacity: ${props => (props.show ? '1' : '0')};
`;

export const Wrapper = styled.div``;

const circleIconButtonVariants = {
  default: css`
    background-color: ${SecondaryLight};
    color: ${Grey31};

    :hover {
      background-color: ${darken(0.05, SecondaryLight)};
    }
  `,
  dark: css`
    background-color: ${Grey31};
    color: ${White};

    :hover {
      background-color: ${darken(0.05, Grey31)};
    }
  `,
};
export const CircleIconButton = styled.div`
  width: ${({ size }) => (size === 'md' ? 48 : 24)}px;
  height: ${({ size }) => (size === 'md' ? 48 : 24)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ variant }) => (variant === 'dark' ? White : Grey31)};
  background-color: ${({ variant }) =>
    variant === 'dark' ? Grey31 : SecondaryLight};
  ${RadiusCircle};
  cursor: pointer;

  ${({ variant }) => circleIconButtonVariants[variant || 'default']};
`;

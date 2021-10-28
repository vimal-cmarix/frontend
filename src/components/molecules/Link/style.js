import styled from 'styled-components';
import { LabelSmall, LabelMedium } from '@assets/styles/typography';
import { Haiti, BlueHover } from '@assets/styles/colors';
import { RadiusXSmall } from '@assets/styles/radius';

const sizes = {
  small: LabelSmall,
  medium: LabelMedium,
};

export const IconWrapper = styled.span`
  display: block;
  position: relative;
  font-size: 24px;
  width: 6px;
  height: 10px;
  ${props => (props.arrow === 'left' ? 'transform: rotate(180deg);' : '')}

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${props => (props.direction === 'down' ? 'transform: rotate(90deg)' : '')}
`;

export const Label = styled.span`
  ${props => sizes[props.size]};
  margin-right: ${props => (props.arrow === 'right' ? '8px' : '0')};
  margin-left: ${props => (props.arrow === 'left' ? '8px' : '0')};
`;

export const Container = styled.a`
  color: ${Haiti};
  display: flex;
  flex-direction: row;
  cursor: pointer;
  max-width: fit-content;
  align-items: center;
  position: relative;

  * {
    z-index: 2;
  }

  &:before {
    content: '';
    ${RadiusXSmall}
    background: ${BlueHover};
    position: absolute;
    top: -4px;
    bottom: -4px;
    left: -8px;
    right: -8px;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
  }

  &:hover:before {
    opacity: 1;
  }
`;

export default Container;

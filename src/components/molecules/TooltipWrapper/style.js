import styled from 'styled-components';
import { LabelXSmall } from '@assets/styles/typography';
import { RadiusXSmall } from '@assets/styles/radius';
import { White, Haiti } from '@assets/styles/colors';
import { smscreen, laptopMedium } from '@assets/styles/medias';

const TooltipContainer = styled.div`
  ${RadiusXSmall}
  position: absolute;
  width: max-content;
  background: ${Haiti};
  padding: 8px;
  max-width: 260px;
  box-sizing: border-box;
  z-index: 1;
  user-select: none;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  cursor: default;

  &:after {
    content: '';
    position: absolute;
    width: 9px;
    height: 9px;
    background: ${Haiti};
  }

  &:before {
    content: '';
    position: absolute;
  }
`;

export const Container = styled.div`
  position: relative;
  cursor: ${props => (props.disable ? 'default' : 'pointer')};
  width: 100%;

  &:hover ${TooltipContainer} {
    opacity: 1;
    visibility: visible;

    @media ${laptopMedium} {
      ${props => props.fromRight && 'left: -115px;'}
    }
  }
`;

export const TopTooltip = styled(TooltipContainer)`
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);

  &:after {
    position: absolute;
    top: calc(100% - 5px);
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    border-bottom-right-radius: 2px;

    @media ${smscreen} {
      left: unset;
      right: 5px;
    }
  }

  &:before {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 10px;
  }
`;

export const RightTooltip = styled(TooltipContainer)`
  top: 50%;
  left: calc(100% + 10px);
  transform: translateY(-50%);

  &:after {
    right: calc(100% - 5px);
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    border-bottom-left-radius: 2px;
  }

  &:before {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 12px;
  }
`;

export const BottomTooltip = styled(TooltipContainer)`
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);

  &:after {
    position: absolute;
    bottom: calc(100% - 5px);
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    border-top-left-radius: 2px;
  }

  &:before {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 10px;
  }
`;

export const LeftTooltip = styled(TooltipContainer)`
  top: 50%;
  right: calc(100% + 10px);
  transform: translateY(-50%);

  &:after {
    left: calc(100% - 5px);
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    border-bottom-right-radius: 2px;
  }

  &:before {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 12px;
  }
`;

export const Text = styled.span`
  ${LabelXSmall}
  color: ${White};
  display: block;
`;

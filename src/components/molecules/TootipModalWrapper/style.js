import styled, { css } from 'styled-components';
import { LabelXSmall } from '@assets/styles/typography';
import { RadiusXSmall } from '@assets/styles/radius';
import { White, Primary, GreyC4 } from '@assets/styles/colors';
import { laptopMedium, desktopMedium } from '@assets/styles/medias';

const TooltipContainer = styled.div`
  ${RadiusXSmall}
  position: absolute;
  width: max-content;
  background: ${White};
  padding: 8px;
  max-width: 450px;
  box-sizing: border-box;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  border-radius: 15px;
  cursor: default;
  @media ${desktopMedium} {
    max-width: 100%;
    height: 100%;
  }
`;

export const Container = styled.div`
  position: relative;
  cursor: ${props => (props.disable ? 'default' : 'pointer')};
  width: fit-content;

  ${({ visibled }) =>
    visibled &&
    css`
      ${TooltipContainer} {
        opacity: 1;
        visibility: visible;

        @media ${desktopMedium} {
          ${props => props.fromRight && 'left: -115px;'}
        }
      }
    `}
`;

export const RightTooltip = styled(TooltipContainer)`
  position: fixed;
  right: calc(-100%);
  padding: 10px 20px;

  @media ${desktopMedium} {
    right: 0;
  }
`;

export const IconContainer = styled.div`
  position: fixed;
  right: 10px;
  top: 15px;
  user-select: none;

  color: ${GreyC4};
  ${({ visibled }) =>
    visibled &&
    css`
      color: ${Primary};
    `};
`;

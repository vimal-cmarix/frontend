import styled, { css } from 'styled-components';
import { White, Grey31, Grey888 } from '@assets/styles/colors';

import { RadiusXLarge } from '@assets/styles/radius';
import { MediumElevation } from '@assets/styles/elevations';
import { smscreen } from '@assets/styles/medias';
import { DEFAULT_FONT } from '@assets/styles/theme';

export const StyledToastWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  font-family: ${DEFAULT_FONT};
  // transform: translateX(-50%);
  transform: none;
`;

export const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(22, 9, 52, 0.2);
`;

export const ActionContent = styled.div`
  background-color: ${White};
  ${RadiusXLarge};
  min-width: 280px;
  max-width: 428px;
  ${MediumElevation};
  margin-top: 24px;
  position: relative;
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(-20px);

  padding: 15px 30px 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15% @media ${smscreen} {
    max-width: 90vw;
    padding: 20px 25px 30px;
  }

  ${props =>
    props.isAnimated &&
    css`
      opacity: 1;
      transform: translateY(0);
    `};
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
`;

export const ActionWrapper = styled(StyledToastWrapper)`
  ${({ isCentered }) =>
    isCentered &&
    css`
      top: 30%;
    `}

  pointer-events: initial;
`;

export const ActionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ActionTitle = styled.h2`
  font-size: 18px;
  font-weight: 900;
  line-height: 27px;
  margin-right: 15px;
`;

export const ActionDescription = styled.p`
  color: ${Grey31};
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  margin-top: 20px;
  text-align: center;
`;

export const ActionWarningText = styled.p`
  color: ${Grey888};
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  width: 100%;
  button {
    width: 45%;
  }
`;

export const ActionLoader = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

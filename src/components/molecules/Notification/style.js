import styled, { css } from 'styled-components';
import { Black, White, Red, Green, Blue, Yellow } from '@assets/styles/colors';
import {
  LabelSmall,
  LabelMedium,
  ParagraphSmall,
} from '@assets/styles/typography';
import { RadiusXLarge, RadiusXSmall } from '@assets/styles/radius';
import { MediumElevation } from '@assets/styles/elevations';
import { SPACING } from '@assets/styles/theme';

const handleColorType = color => {
  switch (color) {
    case 'error':
      return Red;
    case 'success':
      return Green;
    case 'warning':
      return Yellow;
    case 'information':
      return Blue;
    default:
      return Red;
  }
};

export const StyledToast = styled.div`
  background-color: ${White};
  ${RadiusXSmall}
  max-width: 480px;
  ${MediumElevation}
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(-20px);
  box-sizing: border-box;
  margin: 24px auto auto;
  width: max-content;
  white-space: nowrap;

  @media (max-width: 480px) {
    max-width: 92%;
    white-space: normal;
  }

  ${props =>
    props.isAnimated &&
    css`
      opacity: 1;
      transform: translateY(0);
    `};

  span {
    color: ${({ type }) => handleColorType(type)};
  }
`;

export const StyledToastText = styled.div`
  ${LabelSmall}
  color: ${Black};
  ${props =>
    props.type !== 'none' &&
    css`
      margin-left: 8px;
    `}
`;

export const StyledToastWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  // transform: translateX(-50%);
  transform: none;
  height: 0;
`;

export const ActionContent = styled.div`
  width: 410px;
  max-width: 100%;
  background-color: ${White};
  ${RadiusXLarge};
  ${MediumElevation};
  margin-top: 24px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(-20px);

  ${props =>
    props.isAnimated &&
    css`
      opacity: 1;
      transform: translateY(0);
    `};
`;

export const ActionWrapper = styled(StyledToastWrapper)``;

export const ActionIcon = styled.div`
  color: ${({ type }) => handleColorType(type)};
  font-size: 24px;
`;

export const ActionTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${SPACING * 6}px;

  .editModalTitle {
    white-space: nowrap;
    span {
      margin-top: 5px;
    }
  }
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  width: 100%;

  button:first-child {
    width: 100px;
    margin-right: 16px;
    ${props =>
      props.autoWidth &&
      css`
        width: auto;
      `}
  }

  button:last-child {
    min-width: 50px;
    width: auto;
    max-width: 100px;
    ${props =>
      props.autoWidth &&
      css`
        width: auto;
        max-width: unset;
      `}
  }
`;

export const ActionTitle = styled.h2`
  ${LabelMedium}
`;

export const ActionDescription = styled.p`
  ${ParagraphSmall}
`;

export const ActionLoader = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

export const ActionLoading = styled.div`
  opacity: 1;
  padding: 24px;
  display: flex;

  ${props =>
    props.loading &&
    css`
      opacity: 0;
    `};
`;

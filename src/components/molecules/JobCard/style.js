import styled, { css } from 'styled-components';
import { rem, rgba } from 'polished';

import {
  White,
  Grey31,
  GreyCF,
  GreyF3,
  MediumGrey,
} from '@assets/styles/colors';
import { SPACING, DEFAULT_FONT } from '@assets/styles/theme';
import { sizes as breakpoint } from '@assets/styles/medias';
import { typoTheme } from '@assets/styles/typo';

export const colorSchemes = {
  white: {
    backgroundColor: White,
    color: Grey31,
    borderColor: GreyF3,
    backgroundColorImage: GreyCF,
    colorTrackedIcon: Grey31,
    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.04)',
  },
  purple: {
    backgroundColor: '#DCC6FF',
    color: Grey31,
    borderColor: '#A873FA',
    backgroundColorImage: White,
    colorTrackedIcon: Grey31,
    boxShadow: 'none',
  },
  yellow: {
    backgroundColor: '#FFE8AD',
    color: Grey31,
    borderColor: '#E4C679',
    backgroundColorImage: White,
    colorTrackedIcon: Grey31,
    boxShadow: 'none',
  },
  red: {
    backgroundColor: '#FFABC4',
    color: Grey31,
    borderColor: '#E087A2',
    backgroundColorImage: White,
    colorTrackedIcon: Grey31,
    boxShadow: 'none',
  },
  green: {
    backgroundColor: '#A8E79E',
    color: Grey31,
    borderColor: '#6BAC61',
    backgroundColorImage: White,
    colorTrackedIcon: Grey31,
    boxShadow: 'none',
  },
  disabled: {
    backgroundColor: GreyF3,
    color: MediumGrey,
    borderColor: MediumGrey,
    backgroundColorImage: GreyCF,
    colorTrackedIcon: MediumGrey,
    boxShadow: 'none',
  },
};

export const CheckBox = styled.div`
  width: 24px;
  height: 24px;
  border: ${rem(2.4)} solid #b1adb7;
  border-radius: ${rem(3.6)};
  position: absolute;
  top: ${SPACING * 2}px;
  right: ${SPACING * 2}px;
  background-color: ${White};
  cursor: pointer;
  box-sizing: border-box;
  color: ${White};

  ${({ isSelect }) =>
    isSelect &&
    css`
      background-color: #b1adb7;
    `};
`;

export const Image = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: ${SPACING * 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typoTheme.sizes.caption};
  font-family: ${DEFAULT_FONT};
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RightIcon = styled.button`
  padding: 0;
  border: 0;
  outline: none;
  background-color: transparent;
  position: absolute;
  top: ${SPACING * 2}px;
  right: ${SPACING * 2}px;
  transition: all 0.2s;
  cursor: pointer;
`;

export const WrapperTrackedIcon = styled.div`
  position: absolute;
  left: ${SPACING * 2}px;
  bottom: ${SPACING * 2}px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2px;
`;

export const Group = styled.div`
  display: flex;

  ${RightIcon},
  ${Image} {
    flex-shrink: 0;
  }

  ${Content} {
    flex-grow: 1;
  }
`;

export const JobTitle = styled.h2`
  font-size: 14px;
  line-height: 152%;
  padding-right: ${SPACING * 7}px;
  box-sizing: border-box;
  white-space: nowrap;
  width: 22ch;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const CompanyName = styled.span`
  font-weight: 300;
  font-size: 12px;
  line-height: 152%;
  margin-top: ${SPACING}px;
`;

export const CreatedAt = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: 300;
  font-size: 10px;
  line-height: 170%;
  margin-top: ${SPACING * 2}px;

  > *:not(:last-child) {
    margin-right: ${SPACING}px;
  }
`;

export const Container = styled.article`
  padding: ${SPACING * 2}px;
  border-radius: 10px;
  font-family: ${DEFAULT_FONT};
  position: relative;
  cursor: pointer;

  ${({ colorScheme }) => css`
    background-color: ${colorSchemes[colorScheme].backgroundColor};
    border: 1px solid ${colorSchemes[colorScheme].borderColor};
    color: ${colorSchemes[colorScheme].color};
    box-shadow: ${colorSchemes[colorScheme].boxShadow};

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    & + & {
      margin-top: ${SPACING * 6}px;
    }

    ${Image} {
      background-color: ${colorSchemes[colorScheme].backgroundColorImage};
      color: ${colorSchemes[colorScheme].color};
    }

    ${WrapperTrackedIcon} {
      color: ${colorSchemes[colorScheme].colorTrackedIcon};
    }

    ${RightIcon} {
      color: ${rgba(colorSchemes[colorScheme].color, 0.8)};

      :active {
        color: ${colorSchemes[colorScheme].color};
      }

      @media screen and (min-width: ${breakpoint.tabletPortrait}) {
        :hover {
          color: ${colorSchemes[colorScheme].color};
        }
      }
    }
  `};

  ${({ colorScheme, isDragging }) =>
    isDragging &&
    css`
      border-color: transparent;
      background-color: transparent;

      ::before,
      ${Group} {
        transform: rotate(-5deg);
      }

      ::before {
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid ${colorSchemes[colorScheme].borderColor};
        background-color: ${colorSchemes[colorScheme].backgroundColor};
        box-shadow: ${colorSchemes[colorScheme].boxShadow};
      }

      ${Group} {
        position: relative;
        z-index: 1;
      }
    `};

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    :not(:hover) {
      ${RightIcon} {
        opacity: 0;
        visibility: hidden;
      }
    }
  }

  ${({ isDisabled, isSelectable }) =>
    isDisabled &&
    !isSelectable &&
    css`
      pointer-events: none;
    `};
`;

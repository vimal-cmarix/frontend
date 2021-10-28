import styled, { css } from 'styled-components';

import {
  LabelMediumUpper,
  HeadingXSmall,
  LabelSmall,
  HeadingLarge,
  HeadingSmall,
} from '@assets/styles/typography';
import { RadiusMedium } from '@assets/styles/radius';
import { smscreen, xxsscreen } from '@assets/styles/medias';
import { Black, Primary, White, Grey100, Grey400 } from '@assets/styles/colors';

export const AddButton = styled.span`
  ${LabelSmall};
  color: ${Primary};
  display: block;
  position: absolute;
  padding: 0px 0px 5px 5px;
  top: 0;
  right: 0;
  cursor: pointer;
  white-space: nowrap;

  @media ${smscreen} {
    top: 12px;
  }
`;

export const EditIconWrapper = styled.div`
  padding: 0px 0px 5px 5px;
  margin-left: 8px;
  color: ${Primary};
  cursor: pointer;
`;

export const Section = styled.section`
  margin-bottom: 30px;
  position: relative;

  &[data-tut*='__resume'] {
    &.active-step {
      @media ${xxsscreen} {
        padding-bottom: 72px;
      }
    }
  }

  &[data-tut*='__summary'] {
    &.active-step {
      .summary-edit {
        display: none;
      }
      ${AddButton} {
        display: none;
      }
    }
  }
`;

export const LinkContainer = styled.div`
  margin-bottom: 32px;

  @media ${smscreen} {
    display: none;
  }
`;

export const TextHelp = styled.div`
  ${LabelSmall};
  color: ${Grey400};
`;

export const SectionWrapper = styled.section`
  background: ${White};
  padding: 24px;
  box-sizing: border-box;
  border: 1px solid ${Grey100};
  ${RadiusMedium};
`;

export const SectionTitle = styled.h4`
  ${LabelMediumUpper};
  margin-bottom: 16px;

  @media ${smscreen} {
    color: ${props => (props.largeMobile ? Black : '')};
    ${props => (props.largeMobile ? HeadingLarge : LabelMediumUpper)};
  }
`;

export const VideoWrapper = styled.div`
  width: 100%;
  height: 27vw;
  margin-bottom: 16px;

  ${({ aspectRatio16x9 }) =>
    !aspectRatio16x9 &&
    css`
      @media ${smscreen} {
        height: 229px;
        width: ${props => (props.fullWidth ? '100vw' : '100%')};
        margin-left: ${props => (props.fullWidth ? '-16px' : '0')};
      }
    `};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ aspectRatio16x9 }) =>
    aspectRatio16x9 &&
    css`
      height: auto;
      padding-top:56.25%;
      position: relative;

      // @media ${smscreen} {
      //   height: 180px;
      // }

      ::before {
        content: '';
        display: block;
        // padding-top: calc(720 / 1280 * 100%);

        padding-top: -moz-calc(720 / 1280 * 100%);
        padding-top: -webkit-calc(720 / 1280 * 100%);
        padding-top: -o-calc(720 / 1280 * 100%);
        padding-top: calc(720 / 1280 * 100%);
        display: none;
      }

      .video-trash {
        top: 0;
        left: 0;
        right: auto;

        > button {
          margin-left: 0;
        }
      }

      .video-box {
        position: absolute;
        top: 0;
        left: 0;
      }
    `};
`;

export const VideoTitle = styled.h3`
  ${HeadingXSmall};
  color: ${Black};
  display: block;

  @media ${smscreen} {
    ${HeadingSmall};
  }
`;

export const EditArea = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;

  @media ${smscreen} {
    top: 10px;
  }
`;

export const SummaryCardWrapper = styled.div`
  position: relative;
`;

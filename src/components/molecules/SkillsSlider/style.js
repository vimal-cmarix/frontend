import styled, { css } from 'styled-components';
import { ellipsis } from 'polished';

import { cdn } from '@utils/general';
import { Grey61, White } from '@assets/styles/colors';
import { SPACING } from '@assets/styles/theme';

export const TagWrapper = styled.div`
  display: flex;
  white-space: nowrap;

  > * {
    width: 100%;
    justify-content: center;
    padding: 0 ${SPACING * 2}px;

    span {
      ${ellipsis};
    }
  }
`;

export const Container = styled.div`
  display: flex;
  overflow: hidden;

  .swiper-container {
    display: flex;
    flex-direction: column-reverse;
  }

  .swiper-wrapper {
    display: flex;
  }

  .swiper-pagination {
    display: flex;
    justify-content: center;
    margin-top: ${SPACING * 4}px;
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: ${Grey61};
    border-radius: 50%;
    border: 1px solid ${White};
    transition: all 0.2s;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;

    &.swiper-pagination-bullet-active {
      background-color: transparent;
      border-color: ${Grey61};
    }
  }

  .swiper-pagination-bullet:not(:last-child) {
    margin-right: 10px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-origin: content-box;
    padding: 6px;
    outline: none;
    cursor: pointer;

    &.swiper-button-disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .swiper-button-next {
    right: 0;
    background-image: url('${cdn('/static/img/arrow-right.svg')}');
  }

  .swiper-button-prev {
    left: 0;
    background-image: url('${cdn('/static/img/arrow-left.svg')}');
  }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  box-sizing: border-box;

  ${Container},
  .swiper-container {
    width: 100%;
  }

  .swiper-wrapper {
    height: 30px;
    align-items: center;
  }

  .swiper-slide {
    flex-shrink: 0 !important;
  }

  ${({ hideNavigation }) =>
    !hideNavigation &&
    css`
      display: inline-flex;
      padding: 0 30px;
      margin-left: -11px;
    `};

  ${({ hideNavigation }) =>
    hideNavigation &&
    css`
      .swiper-wrapper {
        transform: translate3d(0px, 0px, 0px) !important;
      }

      .swiper-button-next,
      .swiper-button-prev,
      .swiper-pagination {
        display: none;
      }
    `};
`;

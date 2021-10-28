import styled from 'styled-components';
import { LabelSmall } from '@assets/styles/typography';
import { Black, Primary } from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { lighten } from 'polished';
import { smscreen, sizes as breakpoint } from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';

export const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: ${p => (p.isMobile ? 'column' : 'row')};
  align-items: ${p => (p.isMobile ? 'flex-start' : 'center')};
  width: 100%;

  &.tour-opened {
    > label {
      pointer-events: none;
      cursor: normal;
    }
  }
`;

export const FileUploadWrapper = styled.div`
  padding-bottom: 32px;
  position: relative;
  width: 100%;
`;

export const FormBlockWrapper = styled.div`
  margin-top: ${SPACING * 8}px;

  @media ${smscreen} {
    margin-bottom: 40px;
  }

  .swiper-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    /* Fix of Webkit flickering */
    z-index: 1;
  }
  .swiper-container-vertical > .swiper-wrapper {
    flex-direction: column;
  }
  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }
  .swiper-container-android .swiper-slide,
  .swiper-wrapper {
    transform: translate3d(0px, 0, 0);
  }
  .swiper-container-multirow > .swiper-wrapper {
    flex-wrap: wrap;
  }
  .swiper-container-multirow-column > .swiper-wrapper {
    flex-wrap: wrap;
    flex-direction: column;
  }
  .swiper-container-free-mode > .swiper-wrapper {
    transition-timing-function: ease-out;
    margin: 0 auto;
  }
  .swiper-slide {
    flex-shrink: 0;
    width: auto;
    height: 100%;
    position: relative;
    transition-property: transform;
    label {
      width: 100%;
      img {
        object-fit: cover;
      }
    }
    &:empty {
      display: none;
    }
  }
  .swiper-slide-invisible-blank {
    visibility: hidden;
  }
  /* Auto Height */
  .swiper-container-autoheight {
    &,
    .swiper-slide {
      height: auto;
    }

    .swiper-wrapper {
      align-items: flex-start;
      transition-property: transform, height;
    }
  }

  /* 3D Effects */
  .swiper-container-3d {
    perspective: 1200px;
    .swiper-wrapper,
    .swiper-slide,
    .swiper-slide-shadow-left,
    .swiper-slide-shadow-right,
    .swiper-slide-shadow-top,
    .swiper-slide-shadow-bottom,
    .swiper-cube-shadow {
      transform-style: preserve-3d;
    }
    .swiper-slide-shadow-left,
    .swiper-slide-shadow-right,
    .swiper-slide-shadow-top,
    .swiper-slide-shadow-bottom {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 10;
    }
    .swiper-slide-shadow-left {
      background-image: linear-gradient(
        to left,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0)
      );
    }
    .swiper-slide-shadow-right {
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0)
      );
    }
    .swiper-slide-shadow-top {
      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0)
      );
    }
    .swiper-slide-shadow-bottom {
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0)
      );
    }
  }

  /* CSS Mode */
  .swiper-container-css-mode {
    > .swiper-wrapper {
      overflow: auto;
      scrollbar-width: none; /* For Firefox */
      -ms-overflow-style: none; /* For Internet Explorer and Edge */
      &::-webkit-scrollbar {
        display: none;
      }
    }
    > .swiper-wrapper > .swiper-slide {
      scroll-snap-align: start start;
    }
  }
  .swiper-container-horizontal.swiper-container-css-mode {
    > .swiper-wrapper {
      scroll-snap-type: x mandatory;
    }
  }
  .swiper-container-vertical.swiper-container-css-mode {
    > .swiper-wrapper {
      scroll-snap-type: y mandatory;
    }
  }
`;

export const UploadThumb = styled.label`
  ${LabelSmall};
  color: ${Black};
  width: 176px;
  height: 99px;
  outline: none;
  border: none;
  background: transparent;
  ${RadiusSmall};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  padding: 16px;
  flex-shrink: 0;
  border: 1px solid ${Primary};
  cursor: pointer;

  > div {
    display: none;
  }

  span {
    color: ${Primary};
    font-size: 16px;
    margin-bottom: 4px;
  }

  :hover {
    color: ${lighten(0.15, Black)};
  }

  :active {
    color: ${lighten(0.1, Black)};
  }

  @media screen and (max-width: ${breakpoint.tabletPortrait}) {
    width: 100%;
  }
`;

export const CarrouselWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 121px;
  box-sizing: border-box;
  padding: 0 19px;
  position: relative;

  .swiper-container {
    margin: 0 22px;
  }

  .swiper-wrapper {
    border-radius: 8px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    text-align: center;
    justify-content: center;
    display: flex;

    i {
      border: solid black;
      border-width: 0 1px 1px 0;
      display: inline-block;
      padding: 4px;
    }
  }

  .swiper-button-prev {
    left: 7px;

    i {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    }
  }

  .swiper-button-next {
    right: 7px;

    i {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }
`;

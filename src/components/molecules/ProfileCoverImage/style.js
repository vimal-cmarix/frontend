import styled, { css } from 'styled-components';

import { Grey61 } from '@assets/styles/colors';
import { smscreen, xmscreen, sizes as breakpoint } from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';

export const ImageContent = styled.div``;

export const TakePhotoWrapper = styled.div``;

export const CoverImage = styled.div`
  overflow: hidden;
  position: relative;
  background-color: ${Grey61};
  display: flex;
  align-items: center;
  justify-content: center;

  ::before {
    content: '';
    width: 100%;
    padding-top: calc(283 / 1130 * 100%);
    display: block;
  }

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
  }
`;

export const EditLayer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${SPACING * 2}px;
  box-sizing: border-box;

  @media screen and (min-width: ${breakpoint.mediumphone}) {
    padding: ${SPACING * 2.5}px;
  }
  .profileImageAction {
    display: flex;
    justify-content: center;
    align-items: center;

    > *:not(:first-child) {
      margin-left: ${SPACING * 2}px;
    }

    @media ${smscreen} {
      bottom: 0;
      right: 0;
    }
  }

  ${({ fullSize }) =>
    fullSize &&
    css`
      width: 100%;
      height: 100%;

      @media ${xmscreen} {
        justify-content: flex-end;
        align-items: flex-start;
      }
    `};

  > *:not(:first-child) {
    margin-left: ${SPACING * 2}px;
  }
`;

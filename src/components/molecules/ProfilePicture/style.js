import { smscreen } from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';
import styled from 'styled-components';

export const ImageContent = styled.div`
  display: flex;
  padding-bottom: ${SPACING * 3}px;
`;

export const TakePhotoWrapper = styled.div`
  body {
    &.overflow_hide {
      overflow: hidden;
    }
  }
`;

export const ImageWrapper = styled.div`
  margin-top: -97px;
  display: inline-flex;
  position: relative;
  width: 180px;
  height: 180px;
  font-size: 70px;

  @media ${smscreen} {
    width: 120px;
    height: 120px;
    font-size: 46px;
    margin-top: -43px;
  }
`;

export const EditLayer = styled.div`
  position: absolute;
  bottom: ${SPACING * 3}px;
  right: ${SPACING * 4}px;
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
`;

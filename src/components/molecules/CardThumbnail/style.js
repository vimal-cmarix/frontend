import styled, { css } from 'styled-components';
import { White } from '@assets/styles/colors';
import { SPACING } from '@assets/styles/theme';

export const PlayWrapper = styled.div`
  position: absolute;
  top: ${SPACING * 3}px;
  left: ${SPACING * 3}px;
  color: ${White};
  z-index: 2;
`;

export const FeaturedImageWrapper = styled.div`
  padding-bottom: 56.25%;
  width: 100%;
  margin-bottom: ${SPACING * 4}px;
  position: relative;

  ${({ type }) =>
    type === 'media' &&
    css`
      ::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        background: linear-gradient(
          109.6deg,
          rgba(49, 49, 52, 0.7) 10.97%,
          rgba(255, 255, 255, 0) 93.49%
        );
      }
    `};
`;

export const FeaturedImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${p => (p.cover ? 'cover' : 'contain')};
  object-position: center center;
`;

export const BlurImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('${p => p.src}');
  background-position: center center;
  background-size: 200%;
  filter: blur(2px);
`;

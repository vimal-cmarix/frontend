import styled from 'styled-components';
import { rgba, darken } from 'polished';
import { RadiusSmall } from '@assets/styles/radius';
import { White, Haiti } from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';

export const PlayIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${White};
  font-size: 62px;
  transition: 0.3s;
`;

export const Container = styled.div`
  ${RadiusSmall}
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  @media ${smscreen} {
    ${props => (props.noRadius ? 'border-radius: 0' : '')};
  }

  :hover ${PlayIconWrapper} {
    color: ${darken(0.1, White)};
  }

  &.full-width {
    @media ${smscreen} {
      border-radius: 0;
    }
  }
`;

export const Thumb = styled.img`
  width: 100%;
  height: 100%;
  background-color: black;
  object-fit: contain;
  object-position: center;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${rgba(Haiti, 0.5)};
  width: 100%;
  height: 100%;
`;

export const VideoEl = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${Haiti};
  // opacity: ${props => (props.videoIsRunning ? 1 : 0)};
  // transform: ${props => (props.videoIsRunning ? 'scale(1)' : 'scale(0.9)')};
  // visibility: ${props => (props.videoIsRunning ? 'visible' : 'hidden')};
  // transition: 0.3s;
`;

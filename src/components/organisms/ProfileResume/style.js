import { GreyC4 } from '@assets/styles/colors';
import { CircleIconButton } from '@assets/styles/helpers';
import { xmscreen } from '@assets/styles/medias';
import { RadiusMedium } from '@assets/styles/radius';
import { SPACING } from '@assets/styles/theme';
import styled from 'styled-components';

export const Container = styled.section`
  padding: ${SPACING * 10}px ${SPACING * 9}px;
  display: flex;

  @media ${xmscreen} {
    padding: 30px 32px;
    flex-direction: column-reverse;
  }

  @media (max-width: 1023px) {
    &.resumetabwrap {
      padding-bottom: 70px;
    }
  }
`;

export const LeftArea = styled.div`
  flex: 1;
  max-width: 500px;
  padding-right: ${SPACING * 3}px;
  @media (max-width: 480px) {
    padding-right: 0;
  }
`;

export const PreviewDoc = styled.div`
  ${RadiusMedium}
  background-color: ${GreyC4};
  position: relative;
  min-height: 150px;
  max-height: 350px;
  overflow: hidden;

  img{
    width: 100%;
    height: 100%;
    max-height:350px;
    object-fit: cover;
    object-position: top center;
  }
`;

export const RightArea = styled.div`
  padding-left: ${SPACING * 10}px;

  @media ${xmscreen} {
    padding-bottom: ${SPACING * 10}px;
    padding-left: 0;
  }
`;

export const PreviewActions = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.35);
`;

export const DeleteButton = styled(CircleIconButton)`
  position: absolute;
  right: ${SPACING * 4}px;
  top: ${SPACING * 4}px;
`;

export const IframeContainer = styled.div`
  padding-top: ${SPACING * 10}px;
  height: 70vh;
`;

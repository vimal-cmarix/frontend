import styled, { createGlobalStyle, css } from 'styled-components';
import { rgba } from 'polished';
import { smscreen } from '@assets/styles/medias';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${rgba('#000', 0.75)};
  z-index: ${props => (props.profile ? '8' : '100')};
  opacity: ${props => (props.isOpened ? 1 : 0)};
  visibility: ${props => (props.isOpened ? 'visible' : 'hidden')};
  transition: 0.2s;
  box-sizing: border-box;

  @media ${smscreen} {
    padding: 0;

    ${props =>
      props.isFullScreen &&
      css`
        box-sizing: initial;
        padding: 0;
      `}
  }
`;

export const RemoveBodyScroll = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

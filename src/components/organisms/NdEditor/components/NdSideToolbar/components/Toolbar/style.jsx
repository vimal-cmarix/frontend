import styled from 'styled-components';
import { smscreen } from '@assets/styles/medias';

export const Container = styled.div`
  position: absolute;
  z-index: 5;
  width: 32px;
  height: 32px;

  transform: scale(${props => (props.visible ? 1 : 0)});
  transition: transform 0.15s cubic-bezier(0.3, 1.2, 0.2, 1);

  top: ${props => props.top}px;
  left: ${props => props.left}px;

  @media ${smscreen} {
    left: 0px;
    top: ${props => props.top - 35}px;
  }
`;

export default Container;

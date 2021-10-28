import { smscreen } from '@assets/styles/medias';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  color: ${props => props.color};

  @media ${smscreen} {
    height: 24px;
  }

  > svg {
    width: 100%;
    height: 100%;
  }
`;

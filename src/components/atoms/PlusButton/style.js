import styled from 'styled-components';

import { Grey61, White } from '@assets/styles/colors';

export const Circle = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid ${Grey61};
  border-radius: 50%;
  color: currentColor;

  ::before,
  ::after {
    content: '';
    background-color: currentColor;
    width: 1px;
    height: 9px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }

  ::after {
    transform: rotate(90deg);
  }
`;

export const Container = styled.button`
  width: ${props => props.area}px;
  height: ${props => props.area}px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: transparent;
  border: 0;
  position: relative;
  color: ${Grey61};
  outline: none;
  cursor: pointer;

  :hover {
    color: ${White};

    ${Circle} {
      background-color: ${Grey61};
    }
  }
`;

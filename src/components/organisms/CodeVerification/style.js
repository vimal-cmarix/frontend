import styled from 'styled-components';
import { smscreen } from '@assets/styles/medias';

export const Container = styled.div`
  display: flex;
  width: fit-content;
  margin: 0 auto;
  position: relative;
`;

export const CodeBlock = styled.div`
  margin-right: 12px;

  @media ${smscreen} {
    margin-right: 8px;
  }
`;

export const Input = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  opacity: 0;
`;

export const CodeContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

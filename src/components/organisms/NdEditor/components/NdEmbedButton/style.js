import styled from 'styled-components';
import { ParagraphMedium } from '@assets/styles/typography';

export const NdEmbedButtonForm = styled.div`
  position: absolute;

  input {
    border: 0;
    ${ParagraphMedium}
    outline: 0;
    background: transparent;
    font-style: italic;
    width: 100%;

    &.invalid {
      color: red;
    }
  }
`;

export default NdEmbedButtonForm;

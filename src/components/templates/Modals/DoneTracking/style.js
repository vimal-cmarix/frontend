import styled, { css } from 'styled-components';

import { Grey31, GreyCF } from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';
import { ParagraphLarge, ParagraphSmall } from '@assets/styles/typography';
import { Form } from '@unform/web';
import Btn from '@components/molecules/Btn';

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;

  width: 399px;
  box-sizing: border-box;
  padding: 24px;

  @media ${smscreen} {
    width: 100vw;
    height: 100vh;
  }
`;

export const Title = styled.span`
  ${ParagraphLarge}
  color: ${Grey31};
  margin-bottom: 16px;
  font-weight: 900;
`;

export const Content = styled.p`
  ${ParagraphSmall}
  line-height: 23.1px;
  color: ${Grey31};
  margin-bottom: 8px;
`;

export const WrapperActions = styled.div`
  display: flex;
  margin-top: 32px;
  justify-content: space-between;
  align-items: center;
`;

export const BtnSubmit = styled(Btn)`
  width: 50%;
`;

export const TextWarn = styled.p`
  ${ParagraphSmall}
  line-height: 23.1px;
  color: ${GreyCF};
  width: 50%;

  cursor: pointer;
`;

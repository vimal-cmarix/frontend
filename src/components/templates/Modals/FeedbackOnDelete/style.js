import styled from 'styled-components';

import { Grey31 } from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';
import { ParagraphSmall } from '@assets/styles/typography';
import { Form } from '@unform/web';

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;

  width: 399px;
  box-sizing: border-box;
  padding: 24px;

  @media ${smscreen} {
    padding: 26px 25px 34px 34px;
    width: 100vw;
    height: 100vh;
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  line-height: 27px;
  font-weight: 900;
  margin-bottom: 25px;
`;

export const Content = styled.p`
  ${ParagraphSmall}
  line-height: 23.1px;
  color: ${Grey31};
  margin-bottom: 24px;
  text-align: center;
`;

export const TextCancel = styled.p`
  ${ParagraphSmall}
  line-height: 21.28px;
  color: #cfcdd6;
  cursor: pointer;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  justify-content: space-between;
`;

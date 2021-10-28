import styled, { css } from 'styled-components';

import { Grey31, Purple, White, MediumGrey } from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';
import { ParagraphLarge, ParagraphSmall } from '@assets/styles/typography';
import { Form } from '@unform/web';
import Btn from '@components/molecules/Btn';
import { SPACING } from '@assets/styles/theme';

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;

  width: 606px;
  box-sizing: border-box;
  padding: 24px 78px 41px 78px;

  @media ${smscreen} {
    padding: 26px 25px 34px 34px;
    width: 100vw;
    height: 100vh;
  }
`;

export const Title = styled.span`
  ${ParagraphLarge}
  color: ${Grey31};
  margin-bottom: 16px;
  font-weight: 900;
  text-align: center;
`;

export const Content = styled.p`
  ${ParagraphSmall}
  line-height: 23.1px;
  color: ${Grey31};
  margin-bottom: 24px;
  text-align: center;
`;

export const BtnCancel = styled(Btn)`
  margin-top: 32px;
  color: ${White};
  background-color: #d32c63;

  width: 50%;
  align-self: center;
`;

export const CloseIconButtonWrapper = styled.div`
  position: absolute;
  top: ${SPACING * 2}px;
  right: ${SPACING * 2}px;
  display: inline-flex;
`;

export const CloseIconButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: ${MediumGrey};
  outline: none;
`;

export const TextWarn = styled.p`
  ${ParagraphSmall}
  margin-top: 24px;
  line-height: 23.1px;
  color: #4f9598;
  text-align: center;
  align-self: center;
  width: 50%;

  cursor: pointer;
`;

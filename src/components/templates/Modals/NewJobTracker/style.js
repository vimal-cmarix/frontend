import styled, { css } from 'styled-components';

import { MediumGrey, Grey31, ExtraLightGrey } from '@assets/styles/colors';
import { Form } from '@unform/web';
import { ParagraphSmall } from '@assets/styles/typography';

export const FormNewJob = styled(Form)`
  box-sizing: border-box;
`;

export const TextEnterManually = styled.span`
  ${ParagraphSmall}
  display: ${({ hide }) => (hide ? 'none' : 'block')};
  color: ${MediumGrey};
  margin-top: 8px;
  width: 108px;
  cursor: pointer;
  transition: color .2s;

  &:hover {
    color: ${Grey31};
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  padding: 0 16px;
`;

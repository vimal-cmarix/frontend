import styled, { css } from 'styled-components';
import { MediumGrey, Primary, White } from '@assets/styles/colors';
import { ParagraphSmall } from '@assets/styles/typography';
import { CustomCheckboxIcon } from '@components/molecules/ThumbItem/style';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  cursor: pointer;
`;

export const CheckboxWrapper = styled(CustomCheckboxIcon)`
  user-select: none;
  width: 10px;
  height: 10px;
  margin-right: 8px;
  cursor: pointer;

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${Primary};
      border-color: ${Primary};

      span {
        color: ${White};
      }
    `};
`;

export const Label = styled.span`
  ${ParagraphSmall}
  line-height: 16px;
  display: block;
  user-select: none;
  color: ${MediumGrey};
`;

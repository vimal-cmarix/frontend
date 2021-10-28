import styled, { css } from 'styled-components';
import { LabelSmall, ParagraphSmall } from '@assets/styles/typography';
import {
  Black,
  White,
  Primary,
  MediumGrey,
  Grey61,
  ExtraLightGrey,
  GreyCF,
} from '@assets/styles/colors';
import { MediumElevation } from '@assets/styles/elevations';
import { RadiusXSmall } from '@assets/styles/radius';
import { DEFAULT_FONT } from '@assets/styles/theme';
import { smscreen } from '@assets/styles/medias';
import { CustomCheckboxIcon } from '../ThumbItem/style';
import { WrapperButtonIcon } from '../List/style';

export const ListWrapper = styled.ul`
  display: block;

  .ghost {
    ${MediumElevation}
    ${RadiusXSmall}
    background: ${White};
    border: none;
  }

  li:first-child {
    border: none;
  }
`;

export const ContainerList = styled.div`
  height: ${({ isColapsed }) => (isColapsed ? 'fit-content' : '32px')};
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  overflow: none;
  align-items: center;
  padding: 0 8px 0 16px;
  box-sizing: border-box;
  height: 32px;
  ${({ isColapsed }) =>
    !isColapsed &&
    css`
      &:hover {
        background: ${ExtraLightGrey};
      }
      cursor: pointer;
    `}
`;

export const ListItemText = styled.span`
  ${LabelSmall}
  color: ${Black};
  margin-left: 8px;
  width: 55%;

  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${smscreen} {
    width: 50%;
  }
`;

export const CheckboxWrapper = styled(CustomCheckboxIcon)`
  background-color: ${({ finished }) => finished && Primary};
  user-select: none;

  width: 10px;
  height: 10px;
  margin-right: 8px;
  cursor: pointer;

  span {
    color: ${({ finished }) => finished && White};
  }
`;

export const VerticalBar = styled.div`
  height: 14px;
  border: 1px solid ${MediumGrey};
  box-sizing: border-box;
  user-select: none;
`;

export const ListItemDate = styled.span`
  font-family: ${DEFAULT_FONT};
  font-size: 12px;
  color: ${Grey61};
  text-align: right;
  flex: 1;
`;

export const WrapperButtonRemove = styled(WrapperButtonIcon)`
  user-select: none;
  cursor: pointer;
  span {
    color: ${MediumGrey};
  }
`;

export const HorizontalBar = styled.div`
  border: 1px solid ${GreyCF};
  box-sizing: border-box;
  user-select: none;
  margin: 8px 16px;
`;

export const TextEmpty = styled.p`
  ${ParagraphSmall}
  color: ${Grey61};
  display: block;
  text-align: center;
`;

export const WrapperEmpty = styled.div`
  background: ${White};
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  /* position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; */
`;

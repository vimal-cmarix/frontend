import styled, { css } from 'styled-components';
import { LabelMedium } from '@assets/styles/typography';
import { Black, Grey100, White, Primary } from '@assets/styles/colors';
import { MediumElevation } from '@assets/styles/elevations';
import { RadiusXSmall } from '@assets/styles/radius';
import { cdn } from '@utils/general';

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

export const ListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 16px 16px 0;
  border-top: solid 1px ${Grey100};

  ${props =>
    props.postCardStyle &&
    css`
      max-width: 350px;
      display: inline-block;
      border: none;
      padding: 0;
      margin: 0 24px 24px 0;
      position: relative;

      &:nth-child(3n) {
        margin-right: 0;
      }
    `}
`;

export const Handle = styled.span`
  display: block;
  padding: 8px 16px;
  position: relative;
  cursor: pointer;

  span {
    display: block;
    width: 12px;
    height: 20px;
    background-image: url('${cdn('/static/img/drag.svg')}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const ListItemText = styled.span`
  ${LabelMedium}
  color: ${Black};
`;

export const WrapperButtonIcon = styled.div`
  margin-left: auto;
`;

export const IconWrapper = styled.div`
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  width: 32px;
  box-shadow: 0px 2px 8px rgba(17, 14, 27, 0.09);
  height: 32px;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  color: ${Primary};
  font-size: 20px;
`;

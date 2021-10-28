import styled, { css } from 'styled-components';
import { Blue, Red, Grey100, Grey61 } from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { rgba } from 'polished';
import { smscreen } from '@assets/styles/medias';

export const DropAreaContentBox = styled.div``;

const DropArea = styled.button`
  ${RadiusSmall}
  // background: ${rgba(Blue, 0.05)};
  width: 100%;
  height: 120px;
  border: 2px dashed ${Grey100};
  font-size: 24px;
  color: ${Blue};
  cursor: pointer;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  background:#EFF2F9;
  

  ${props =>
    props.error &&
    css`
      background: ${rgba(Red, 0.05)};
      border: 2px dashed ${Red};
      color: ${Red};
    `};

  ${({ isVideo }) =>
    isVideo &&
    css`
      height: auto;
      padding-top:56.25%;
      position: relative;

      // @media ${smscreen} {
      //   height: 180px;
      // }

      ::before {
        content: '';
        display: block;
        //padding-top: calc(720 / 1280 * 100%);

        padding-top: -moz-calc(720 / 1280 * 100%);
        padding-top: -webkit-calc(720 / 1280 * 100%);
        padding-top: -o-calc(720 / 1280 * 100%);
        padding-top: calc(720 / 1280 * 100%);
        display: none;
      }

      ${DropAreaContentBox} {
        width: 110px;
        height: 110px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        color: ${Grey61};
      }
    `};
`;

export default DropArea;

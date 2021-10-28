import styled, { css } from 'styled-components';
import { LabelSmall } from '@assets/styles/typography';
import {
  Blue,
  Red,
  Grey100,
  Haiti,
  Primary,
  Grey61,
} from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { rgba } from 'polished';
import { smscreen } from '@assets/styles/medias';

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.button`
  ${RadiusSmall}
  ${props =>
    props.colorSchema === 'primary' &&
    `
    background: ${rgba(Blue, 0.05)};
  `}
  width: 100%;
  height: 120px;
  border: 2px dashed ${Grey100};
  font-size: 24px;
  color: ${props => (props.colorSchema === 'secondary' ? Primary : Blue)};
  cursor: pointer;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  background: #eff2f9;

  ${props =>
    props.error &&
    css`
      background: ${rgba(Red, 0.05)};
      border: 2px dashed ${Red};
      color: ${Red};
    `};

  @media ${smscreen} {
    //background-color: transparent;
  }

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

      ${ContentBox} {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        justify-content: center;
        align-items: center;
        color: ${Grey61};
      }
    `};
`;

export const FileOptions = styled.p`
  ${LabelSmall}
  color: ${Haiti};

  &:first-of-type {
    margin-top: 4px;
  }
`;

export const LoaderWrapper = styled.div`
  padding-bottom: 8px;
`;

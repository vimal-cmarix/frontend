import styled, { css } from 'styled-components';
import { LabelXSmall, LabelLarge } from '@assets/styles/typography';
import {
  Red,
  Black,
  Grey400,
  Grey61,
  Primary,
  ModalHeaderBG,
} from '@assets/styles/colors';
import { RadiusCircle } from '@assets/styles/radius';

export const ListItem = styled.li``;

export const List = styled.ul`
  display: flex;
  flex-direction: ${props => props.layout};

  ${ListItem} {
    padding-bottom: ${props => (props.layout === 'column' ? '8px' : '0px')};
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 32px;

  input {
    position: absolute;
    left: -999em;
    opacity: 0;
  }
`;

export const Text = styled.span`
  display: block;
  ${props =>
    props.size === 'small' &&
    css`
    ${LabelXSmall}
    color: ${Black};
    padding-left: 8px;
  `}
  ${props =>
    (props.size === 'medium' || props.size === 'large') &&
    css`
    ${LabelLarge}
    color: ${Grey61};
    padding-left: 16px;
  `}
`;

export const Bullet = styled.em`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  transition: all .3s;

  ${props =>
    props.size === 'small' &&
    css`
    width: 16px;
    min-width: 16px;
    height: 16px;
    ${RadiusCircle}
    border: solid 1px ${Grey400};
  `}

  ${props =>
    props.size === 'medium' &&
    css`
      width: 32px;
      min-width: 32px;
      height: 32px;
      border-radius: 25%;
      border: solid 2px ${Grey61};
    `}

  ${props =>
    props.size === 'large' &&
    css`
      width: 48px;
      min-width: 48px;
      height: 48px;
      border-radius: 25%;
      border: solid 2px ${Grey61};
    `}

  &:before {
    content: '';
    display: block;
    box-sizing: border-box;
    ${props =>
      props.size === 'small' &&
      css`
        width: 8px;
        height: 8px;
        ${RadiusCircle}
      `}
    ${props =>
      props.size === 'medium' &&
      css`
        width: 24px;
        height: 24px;
        border-radius: 25%;
      `}
    ${props =>
      props.size === 'large' &&
      css`
        width: 40px;
        height: 40px;
        border-radius: 25%;
      `}
    background: transparent;
    transition: all 0.3s;
  }

  input:checked + & {
    border-color: ${props => (props.colorLight ? ModalHeaderBG : Primary)};
    &:before {
      background: ${props => (props.colorLight ? ModalHeaderBG : Primary)};
    }
  }
`;

export const Error = styled.div`
  ${LabelXSmall}
  margin-top: 8px;
  color: ${Red};
  display: block;
`;

export const Container = styled.div`
  display: block;
`;

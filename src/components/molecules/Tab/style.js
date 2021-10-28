import styled from 'styled-components';
import {
  Grey200,
  Black,
  Grey,
  Primary,
  BlueHover,
} from '@assets/styles/colors';
import { LabelMedium } from '@assets/styles/typography';
import { xmscreen } from '@assets/styles/medias';

export const Tabs = styled.div`
  border-bottom: solid 1px ${Grey200};
`;
export const Tab = styled.button`
  background: transparent;
  color: ${props => (props.active ? Black : Grey)};
  ${LabelMedium};
  border: none;
  outline: none;
  padding: 8px 24px;
  border-bottom: solid 2px ${props => (props.active ? Primary : 'transparent')};
  margin-bottom: -1px;
  cursor: ${props => (props.active ? 'default' : 'pointer')};
  ${props => (props.active ? 'pointer-events: none' : '')};
  font-weight: ${props => (props.activeBoldeness ? 700 : 400)};
  -webkit-tap-highlight-color: transparent;

  :hover {
    background-color: ${props => (props.active ? 'transparent' : BlueHover)};
  }

  @media ${xmscreen} {
    padding: 8px 20px;
  }

  @media (max-width: 370px) {
    padding: 8px 12px;
  }

  @media (max-width: 338px) {
    padding: 8px;
  }
`;

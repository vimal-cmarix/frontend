import { White } from '@assets/styles/colors';
import styled from 'styled-components';

export const ButtonsWrapper = styled.div`
  position: relative;
  top: 122px;
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  flex-direction: column;
  z-index: 10;
  background-color: ${White};
  padding: 36px 21px 36px 21px;
`;

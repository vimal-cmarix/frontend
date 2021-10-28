import { SPACING } from '@assets/styles/theme';
import styled from 'styled-components';

export const FlexList = styled.ul`
  display: flex;
  flex-flow: row wrap;
`;

export const ListItem = styled.li`
  margin-bottom: ${SPACING * 4}px;

  :not(:last-child) {
    margin-right: ${SPACING * 5}px;
  }
`;

export default FlexList;

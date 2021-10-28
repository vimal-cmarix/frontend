import styled from 'styled-components';

import { GreyCF, Grey61, White } from '@assets/styles/colors';
import { SPACING, DEFAULT_FONT } from '@assets/styles/theme';

export const Container = styled.article`
  border-radius: 10px;
  border: 1px solid ${GreyCF};
  padding: ${SPACING * 2}px;
  font-family: ${DEFAULT_FONT};
  display: flex;
  flex-direction: column;
  background-color: ${White};

  & + & {
    margin-top: ${SPACING * 2}px;
  }

  > h2 {
    font-size: 16px;
    line-height: 152%;
    color: ${Grey61};
  }

  > span {
    font-size: 12px;
    line-height: 152%;
    color: ${Grey61};
    margin-top: ${SPACING * 2}px;
  }

  > time {
    font-size: 10px;
    line-height: 170%;
    font-weight: 400;
    color: ${Grey61};
    margin-top: ${SPACING * 4}px;
  }
`;

import styled from 'styled-components';
import { smscreen } from '@assets/styles/medias';
import { LargeElevation } from '@assets/styles/elevations';
import { Black111 } from '@assets/styles/colors';

export const Container = styled.div`
  > div {
    width: fit-content;
    z-index: 10;
    top: -40px !important;
    left: 50% !important;
    border: 1px solid ${Black111};
    ${LargeElevation}
    div > button {
      width: 32px;
      height: 36px;
    }

    &::before {
      border-top-color: ${Black111};
    }

    @media ${smscreen} {
      transform: none !important;
      left: 0 !important;
      top: -110px !important;
      div > button {
        padding: 0;
      }
    }
  }
`;

export default Container;

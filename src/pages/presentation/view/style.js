import styled from 'styled-components';
import { smscreen } from '@assets/styles/medias';
import { Primary } from '@assets/styles/colors';

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 64px;
  max-width: 1024px;
  padding: 0 16px;
  box-sizing: border-box;

  @media ${smscreen} {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 auto 30px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 128px;
  position: relative;
  z-index: 1;

  @media ${smscreen} {
    width: fit-content;
    margin-right: 10px;
    position: relative;
    > a {
      color: ${Primary};
      padding: 8px 16px 8px 12px;
      white-space: nowrap;
      &:before {
        display: none;
      }
    }
  }
`;

export const ButtonWrapperWithSpace = styled.div`
  width: 128px;
  margin-right: 16px;

  @media ${smscreen} {
    width: fit-content;
    margin-right: 0;
    margin-left: 15px;
    min-width: 96px;
    button {
      justify-content: flex-start;
    }
  }
`;

export const PopOverWrapper = styled.div`
  max-width: 216px;
`;

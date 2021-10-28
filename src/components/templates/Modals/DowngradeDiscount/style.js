import styled, { css } from 'styled-components';
import { Grey31, Grey888, RedBerry } from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 640px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 24px 0px 43px 0px;

  @media ${smscreen} {
    padding: 26px 0 34px 34px;
    width: 100vw;
    height: 100vh;
  }
`;

export const ActionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ActionTitle = styled.h2`
  font-size: 18px;
  font-weight: 900;
  line-height: 27px;
  margin-left: 15px;
  color: ${Grey31};
`;

export const ActionDescription = styled.p`
  width: 564px;
  max-width: 100%;
  display: block;
  color: ${Grey31};
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  margin: 20px auto 0 auto;
  text-align: center;
  box-sizing: border-box;
  padding: 0 ${SPACING * 4}px;

  ${({ hasError }) =>
    hasError &&
    css`
      color: ${RedBerry};
    `};
`;

export const ActionWarningText = styled.p`
  color: ${Grey888};
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 24px;
  width: 100%;
  button {
    width: 168px;
  }
`;

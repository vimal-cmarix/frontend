import styled from 'styled-components';

import { DEFAULT_FONT } from '@assets/styles/theme';

export const Container = styled.div`
  width: 580px;
  border: 2px solid #a99de0;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 12px;
  font-family: ${DEFAULT_FONT};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 8px;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 14px;
`;

export const CardTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

export const CardDescription = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;

export const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 30px 6px 30px;
`;

export const CardText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #313134;
`;

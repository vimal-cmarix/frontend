import styled from 'styled-components';

import { MediumElevation } from '@assets/styles/elevations';

export const Container = styled.div`
  position: relative;
  width: 20px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const QuestionModal = styled.div`
  display: flex;
  min-width: 200px;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  padding: 40px 50px;
  ${MediumElevation};
  border-radius: 30px;
  background-color: #fff;
  bottom: 0;
  bottom: 100%;
  left: 100%;
`;

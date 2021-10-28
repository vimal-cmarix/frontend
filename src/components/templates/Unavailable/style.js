import { HeadingSmall, ParagraphLarge } from '@assets/styles/typography';
import { cdn } from '@utils/general';
import styled from 'styled-components';

const darkImg = cdn('/static/img/sizigi.svg');

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  flex-direction: column;
`;

export const Logo = styled.h1`
  width: 160px;
  height: 53px;
  background-image: url(${darkImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-indent: -9999px;

  user-select: none;
`;

export const Title = styled.p`
  ${HeadingSmall}
  color: #1E1E1F;
  padding: 24px 0;
`;

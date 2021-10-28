import styled, { css } from 'styled-components';

import { Grey31, Purple } from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';
import { ParagraphLarge, ParagraphSmall } from '@assets/styles/typography';
import { cdn } from '@utils/general';

export const Container = styled.div`
  display: flex;
  width: 603px;
  box-sizing: border-box;
  padding: 26px 0 34px 48px;
  button {
    width: 50%;
    color: ${Grey31};
  }

  @media ${smscreen} {
    padding: 26px 0 34px 34px;
    width: 100vw;
    height: 100vh;
  }
`;

export const Title = styled.span`
  ${ParagraphLarge}
  color: ${Purple};
  margin-bottom: 16px;
`;

export const Content = styled.p`
  ${ParagraphSmall}
  line-height: 23.1px;
  color: ${Grey31};
  margin-bottom: 24px;
`;

export const BannerImage = styled.div`
  position: fixed;
  bottom: 0;
  right: -16%;
  background: url('${cdn('/static/img/tech.png')}') no-repeat center bottom;
  background-size: contain;
  height: 274.65px;
  width: 100%;
  pointer-events: none;

  @media ${smscreen} {
    width: 100%;
    height: 260px;
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 52%;
  br {
    padding-top: 10px;
  }

  @media ${smscreen} {
    width: 80%;
  }
`;

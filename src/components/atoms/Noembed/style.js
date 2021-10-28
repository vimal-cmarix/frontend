import styled from 'styled-components';
import { Primary, BlueHover } from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { HeadingXSmall, ParagraphSmall } from '@assets/styles/typography';
import { smscreen } from '@assets/styles/medias';

export const LoaderWrapper = styled.div`
  padding: 24px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  @media ${smscreen} {
    width: 100vw;
    margin-left: -16px;
    margin-right: -16px;
  }
`;

export const Wrapper = styled.div`
  overflow: hidden;

  iframe {
    max-width: 100%;
    ${RadiusSmall}
  }

  @media ${smscreen} {
    height: 230px;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;

    iframe {
      height: 100%;
      width: 100%;
    }
  }
`;

export const URLEmbeded = styled.div`
  border-left: solid 4px ${Primary};
  padding: 24px;
  background: ${BlueHover};

  img {
    display: block;
    max-width: 100%;
    margin-bottom: 16px;
    ${RadiusSmall}
  }

  span {
    display: block;
    ${HeadingXSmall}
    padding-bottom: 8px;
  }

  p {
    ${ParagraphSmall}
  }
`;

import styled from 'styled-components';

import { xmscreen, smscreen } from '@assets/styles/medias';
import { DEFAULT_FONT } from '@assets/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${DEFAULT_FONT};
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px 60px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 900;
  margin: 60px 0 20px;
`;

export const Section = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: minmax(20px, auto);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
  width: 100%;
  flex-wrap: wrap;

  @media ${smscreen} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${xmscreen} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const SectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

export const SectionRow = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;

  > h3 {
    font-size: 20px;
    font-weight: 700;
    margin-right: 40px;
  }

  > button {
    margin-right: 20px;
  }
`;

export const ButtonAddMoreTooltip = styled.div`
  position: relative;
  width: 100px;
  margin-top: 40px;
`;

export const TagsWrapper = styled.div`
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;

  @media ${xmscreen} {
    flex-direction: column;
  }
`;

export const TagItem = styled.div`
  margin-bottom: 8px;
  margin-right: 16px;

  @media ${xmscreen} {
    margin-right: 8px;
  }
`;

export const ThreeDotsButtonWrapper = styled.div`
  position: relative;
  max-width: 25px;
`;

export const ThreeDotsButton = styled.div`
  cursor: pointer;
`;

export const TypographyContainer = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`;

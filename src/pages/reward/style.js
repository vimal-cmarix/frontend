import styled from 'styled-components';
import {
  BebasNeueXXLarge,
  ParagraphCustomReward,
  BebasNeueXLarge,
} from '@assets/styles/typography';
import { Primary, Grey31 } from '@assets/styles/colors';
import { deskscreen, smscreen } from '@assets/styles/medias';

export const Section = styled.section``;

export const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 60px 160px;
  align-items: center;

  @media ${deskscreen} {
    padding: 60px 300px;
  }

  @media ${smscreen} {
    flex-direction: column;
    padding: 0;
  }
`;

export const TextWrapper = styled.div`
  padding-right: 60px;
  padding-top: 60px;

  @media ${smscreen} {
    padding-right: 0;
    padding-top: 30px;
    text-align: center;
  }
`;

export const ImageWrapper = styled.div`
  img {
    max-width: 500px;
    @media ${smscreen} {
      max-width: 300px;
    }
  }
`;

export const SectionTitle = styled.h4`
  ${BebasNeueXXLarge}
  color: ${Grey31};

  @media ${smscreen} {
    ${BebasNeueXLarge}
  }
`;

export const Paragraph = styled.p`
  ${ParagraphCustomReward}
  margin-top: 60px;
  padding-right: 30px;

  @media ${smscreen} {
    margin-top: 30px;
    padding-right: 0;
  }
`;

export const DiscountPercentage = styled.span`
  color: ${Primary};
`;

export const ButtonWrapper = styled.div`
  width: 168px;
  margin-top: 40px;

  @media ${smscreen} {
    width: 200px;
    margin: 30px auto;
  }
`;

import styled from 'styled-components';
import {
  HeadingLarge,
  LabelMedium,
  ParagraphSmall,
} from '@assets/styles/typography';
import { Black, White, BlueHover, Primary } from '@assets/styles/colors';
import { Container as cardStyle } from '@components/molecules/FileCard/style';
import { RadiusSmall } from '@assets/styles/radius';
import { SmallElevation, LargeElevation } from '@assets/styles/elevations';
import { xmscreen, smscreen, xxxsscreen } from '@assets/styles/medias';

export const Section = styled.section``;

export const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 3;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FormWrapper = styled.div`
  display: flex;

  @media ${smscreen} {
    justify-content: space-between;
    margin-top: 8px;
  }
`;

export const TabsWrapper = styled.div`
  padding: 10px 0;
`;

export const SectionTitle = styled.h4`
  ${HeadingLarge}
  color: ${Black};
`;

export const ActionButton = styled.div`
  width: 268px;
  position: relative;
  z-index: 2;

  @media ${smscreen} {
    width: 158px;
  }
`;

export const SelectBlock = styled.div`
  width: 168px;
  margin-left: auto;
  margin-right: 16px;

  @media ${smscreen} {
    width: 158px;
  }

  @media ${xxxsscreen} {
    width: 114px;
  }
`;

export const PopOver = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0%;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: all 0.1s ease-in-out;
  background: ${White};
  ${RadiusSmall};
  ${SmallElevation};
  box-sizing: border-box;
  padding: 8px 0;
  width: 216px;
`;

export const PopOverItem = styled.a`
  ${ParagraphSmall}
  color: ${Black};
  padding: 8px 16px;
  display: block;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background: ${BlueHover};
    color: ${Black};
  }
`;

export const PostsCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: -24px;
`;

export const PostCardWrapper = styled.div`
  display: flex;
  margin-left: 24px;
  margin-bottom: 24px;
  cursor: pointer;
`;

export const MsgErro = styled.div`
  text-align: center;
  ${LabelMedium}
  text-transform: uppercase;
`;

export const GridWrapper = styled.div`
  @media ${xmscreen} {
    margin-bottom: 40px;
  }
`;

export const ButtonLoadMoreWrapper = styled.div`
  width: 216px;
  margin: 16px auto 40px auto;

  @media ${xmscreen} {
    width: 100%;
    margin: 40px auto 80px;
  }
`;

export const ContainerAvailable = styled(cardStyle)`
  flex-direction: column;
  justify-content: center;
  height: 240px;
  width: 240px;
  margin-top: 20px;
  transition: box-shadow 0.3s;
  background: none;

  &:hover {
    ${LargeElevation}
  }
`;

export const TitleAvailable = styled.h2`
  ${LabelMedium}
  color: ${Primary};
  margin-top: 24px;
`;

export const IconWrapper = styled.div`
  color: ${Primary};
  font-size: 48px;
`;

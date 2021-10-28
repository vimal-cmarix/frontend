import styled from 'styled-components';
import {
  HeadingLarge,
  LabelMedium,
  ParagraphSmall,
} from '@assets/styles/typography';
import { Black, White, BlueHover } from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { SmallElevation } from '@assets/styles/elevations';
import { xmscreen, sizes as breakpoint } from '@assets/styles/medias';

export const Section = styled.section``;

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabsWrapper = styled.div`
  padding: 40px 0;
`;

export const SectionTitle = styled.h4`
  ${HeadingLarge}
  color: ${Black};
`;

export const ActionButton = styled.div`
  width: 128px;
  position: relative;
  z-index: 2;

  @media screen and (min-width: ${breakpoint.tablet}) {
    width: 160px;
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

export const PopOverWrapper = styled.div`
  &.active-step {
    width: 216px;
    height: 160px;
    top: calc(100% + 5px);
    right: 0%;
    position: absolute;
    transition: all 0.1s ease-in-out;
    border-radius: 8px;
    padding: 8px 0;

    > div {
      position: relative;
      top: 0;
      opacity: 1;
      visibility: visible;
    }
  }
`;

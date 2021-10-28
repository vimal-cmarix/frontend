import styled from 'styled-components';
import {
  HeadingLarge,
  LabelMedium,
  ParagraphSmall,
  BebasNeue,
  LabelMont,
} from '@assets/styles/typography';
import {
  Black,
  White,
  BlueHover,
  Haiti,
  Blueberry,
  Yellow,
  Orange,
} from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import { SmallElevation } from '@assets/styles/elevations';
import { smscreen, xmscreen, ultrawide } from '@assets/styles/medias';
import { Tab, Tabs } from '@components/molecules/Tab/style';
import { cdn } from '@utils/general';

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
  margin-top: -20px;
  background: #fff;
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

export const BannerWrapper = styled.div`
  display: flex;
  width: calc(100% - 48px);
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 0px 0;

  @media ${ultrawide} {
    width: calc(100% - 200px);
  }

  @media ${smscreen} {
    flex-direction: column;
  }
`;

export const MessageWrapper = styled.div`
  width: 50%;
  padding: 64px 0;

  @media ${ultrawide} {
    padding: 100px 0;
  }

  @media ${smscreen} {
    width: 100%;
    padding: 32px 0 0;
  }
`;

export const BannerTitle = styled.div`
  ${BebasNeue};
  font-size: 60px;
  line-height: 100%;
  text-transform: uppercase;
  color: #313134;
  margin-bottom: 8px;

  @media ${ultrawide} {
    font-size: 110px;
  }

  @media ${smscreen} {
    margin-bttom: 16px;
  }
`;

export const BannerSubTitle = styled.div`
  ${LabelMont}
  font-style: italic;
  font-size: 20px;
  line-height: 140%;
  color: #aeacef;

  @media ${ultrawide} {
    font-size: 30px;
  }

  strong {
    font-weight: 700;
  }
`;

export const BannerDescription = styled.div`
  ${LabelMont}
  color: #313134;
  font-size: 20px;
  line-height: 140%;
  font-weight: 400;
  margin-top: 48px;

  @media ${ultrawide} {
    font-size: 30px;
  }
`;

export const BannerImage = styled.div`
  background: url('${cdn(
    '/static/img/learning-center/banner.png',
  )}') no-repeat center bottom;
  background-size: contain;
  width: 50%;
  margin-top: 20px;

  @media ${smscreen} {
    width: 100%;
    height: 260px;
  }
`;

export const StyledTab = styled.button`
  ${HeadingLarge}
  font-weight: 400;
  color: ${Haiti};
  display: flex;
  position: relative;
  background: transparent;
  border: none;
  outline: none;
  padding: 8px 24px;
  margin-bottom: -1px;
  cursor: ${props => (props.active ? 'default' : 'pointer')};
  ${props => (props.active ? 'pointer-events: none' : '')};
  ${props => (props.active ? 'text-shadow: 0 0 1px black' : '')};

  :hover {
    background-color: ${props => (props.active ? 'transparent' : BlueHover)};
  }

  &:before {
    content: '';
    width: calc(100% - 48px);
    height: 3px;
    border-bottom: solid 2px ${props => (props.active ? Orange : 'transparent')};
    position: absolute;
    bottom: 10px;
    z-index: 0;
  }

  &:after {
    content: '';
    width: 3px;
    height: calc(100% - 24px);
    background: ${Blueberry};
    display: flex;
    position: absolute;
    left: -2px;
    top: 12px;
    bottom: 12px;
    pointer-events: none;
  }

  &:first-child {
    &:after {
      content: none;
    }
  }
`;

export const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: center;
  border-bottom: none;
  font-size: 0;
`;

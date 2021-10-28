import styled, { css } from 'styled-components';

import { xmscreen } from '@assets/styles/medias';
import { White, TooltipBg } from '@assets/styles/colors';
import { SmallElevation } from '@assets/styles/elevations';
import { SPACING } from '@assets/styles/theme';

export const LoaderContainer = styled.div`
  padding: ${SPACING * 6}px;
  display: flex;
  justify-content: center;
`;

export const Container = styled.section`
  padding: 54px ${SPACING * 9}px;
  background-color: ${TooltipBg};

  
  @media (max-width:991px){
    padding-bottom: 95px;
  }
  // @media ${xmscreen} {
  //   padding: 54px ${SPACING * 8}px;
  // }
`;

export const SectionContainer = styled.div`
  background-color: ${White};
  padding: 35px 31px;
  border-radius: 15px;
  ${SmallElevation};
  margin-top: ${({ mt }) => mt || 0}px;
  @media ${xmscreen} {
    padding: 25px 22px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const SectionContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const TagsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;
`;

export const TagItem = styled.div`
  margin-bottom: 8px;
  margin-right: 16px;

  @media ${xmscreen} {
    margin-right: 8px;
  }
`;

export const NonProfitOrgsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding-left: 20px;
`;

export const ListContentItem = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ pl }) => pl || 20}px;
  margin-top: 15px;
`;

export const AddMoreButtonWrapper = styled.div`
  margin-top: 10px;
  margin-left: 20px;
`;

export const InspiresMeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 30px;
`;

export const InspiresMeHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const InspiresMeItemList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  margin-top: 10px;
`;

export const ExternalLink = styled.a.attrs(props => ({
  target: '_blank',
  rel: 'noreferrer noopener',
  ...props,
}))`
  &:hover {
    text-decoration: underline;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: default;

      &:hover {
        text-decoration: none;
      }
    `}
`;

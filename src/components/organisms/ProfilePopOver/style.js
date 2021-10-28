import styled from 'styled-components';
import {
  LabelMedium,
  ParagraphXSmall,
  ParagraphMedium,
  HeadingMedium,
  ParagraphLarge,
} from '@assets/styles/typography';
import { RadiusSmall } from '@assets/styles/radius';
import {
  White,
  BlueHover,
  Black,
  GreyC4,
  Grey31,
  Grey61,
  MediumGrey,
} from '@assets/styles/colors';
import { SmallElevation, LargeElevation } from '@assets/styles/elevations';
import { smscreen } from '@assets/styles/medias';

export const Container = styled.div`
  ${SmallElevation};
  max-height: calc(100vh - 80px);
  background: ${White};
  box-sizing: border-box;
  width: 235px;
  background: ${White};
  cursor: default;
  overflow-x: hidden;

  @media ${smscreen} {
    ${LargeElevation}
    border-radius: 16px 16px 0px 0px;
    width: 100%;
    height: calc(var(--height-full) - 100px);
  }
`;

export const Header = styled.header`
  box-sizing: border-box;
`;

export const HeaderContent = styled.div`
  padding: 24px;
`;

export const WrapperHeaderContent = styled.div`
  display: flex;

  @media ${smscreen} {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

export const HeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  justify-content: center;

  @media ${smscreen} {
    margin-left: 0px;
  }
`;

export const HeadTitle = styled.h2`
  ${LabelMedium};
  margin-bottom: 4px;

  @media ${smscreen} {
    ${HeadingMedium}
    color: ${Black}
  }
`;

export const Occupation = styled.p`
  ${ParagraphXSmall};
`;

export const ActionList = styled.ul`
  ${ParagraphMedium};
  width: 100%;
  border-top: 1px solid ${MediumGrey};
  padding: 8px 0;
`;

export const Action = styled.li`
  cursor: pointer;
  background: transparent;
  box-sizing: border-box;
  padding: 8px 13px;
  transition: 0.1s;
  display: flex;
  position: relative;

  a {
    display: block;
  }

  :hover {
    background: ${BlueHover};
  }

  @media ${smscreen} {
    color: ${Black};
    padding: 8px 24px;
  }

  #extole_zone_global_header {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

    a {
      text-indent: -9999px;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
`;

export const Text = styled.span`
  ${ParagraphMedium};
  color: ${Grey61};
  margin-left: 13px;
`;

export const ActionTitle = styled.p`
  ${ParagraphLarge};
  font-weight: bold;
  color: ${Grey31};
  padding: 6px 16px;
`;

export const ButtonWrapper = styled.div`
  margin-top: 24px;
`;

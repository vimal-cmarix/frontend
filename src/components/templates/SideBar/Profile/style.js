import styled from 'styled-components';
import {
  White,
  Grey100,
  Black,
  Primary,
  Haiti,
  Grey200,
  BlueHover,
} from '@assets/styles/colors';
import {
  RadiusCircle,
  RadiusMedium,
  RadiusXSmall,
} from '@assets/styles/radius';
import {
  HeadingMedium,
  LabelSmallUpper,
  ParagraphSmall,
  LabelSmall,
} from '@assets/styles/typography';
import { smscreen } from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';

export const Container = styled.div`
  background: ${White};
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${Grey100};
  ${RadiusMedium}
  padding: 32px 0;
`;

export const SideBarWrapper = styled.div`
  padding: 0 24px;
`;

export const HeaderWrapper = styled.div`
  padding: 0 24px;

  &:after {
    content: '';
    display: block;
    background: ${Grey100};
    height: 1px;
    width: 100%;
    margin: 40px 0;
  }
`;

export const AvatarContent = styled.div`
  width: 96px;
  margin-bottom: 16px;
`;

export const AvatarWrapper = styled.div`
  ${RadiusCircle}
  overflow: hidden;
  width: 96px;
  height: 96px;
  cursor: pointer;
  position: relative;
`;

export const EditLayer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -15px;

  button {
    margin: 0 4px;
  }
`;

export const AddButton = styled.span`
  ${LabelSmall}
  color: ${Grey200};
  display: block;
  position: absolute;
  padding: 0px 0px 5px 5px;
  top: 0;
  right: 0;
  cursor: pointer;
  white-space: nowrap;
  transition: all .3s;

  @media ${smscreen} {
    color: ${Primary};
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const UserName = styled.h2`
  ${HeadingMedium}
  color: ${Haiti};
`;

export const EditIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  color: ${Grey200};
  cursor: pointer;
  transition: all 0.3s;

  @media ${smscreen} {
    color: ${Primary};
  }
`;

export const Section = styled.section`
  margin-bottom: 40px;
  position: relative;

  &:after {
    pointer-events: none;
    opacity: 0;
    content: '';
    background: ${BlueHover};
    position: absolute;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -12px;
    ${RadiusXSmall}
    transition: all .3s;
  }

  &:hover {
    &:after {
      opacity: 1;
    }

    ${AddButton},
    ${EditIconWrapper} {
      color: ${Primary};
    }
  }
`;

export const SectionTitle = styled.h4`
  ${LabelSmallUpper}
  margin-bottom: 16px;
  position: relative;
`;

export const RowIconPlusText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const RowIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${Primary};
  margin-right: 8px;
`;

export const RowText = styled.span`
  ${ParagraphSmall}
  color: ${Black};
  display: block;
`;

export const InterestsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const InterestWrapper = styled.div`
  margin-bottom: ${SPACING * 4}px;

  :not(:last-child) {
    margin-right: ${SPACING * 5}px;
  }
`;

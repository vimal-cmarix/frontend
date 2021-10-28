import styled from 'styled-components';
import {
  Grey100,
  Grey600,
  White,
  Black,
  Primary,
  Haiti,
} from '@assets/styles/colors';
import {
  HeadingMedium,
  ParagraphXSmall,
  LabelSmallUpper,
  LabelSmall,
} from '@assets/styles/typography';
import { RadiusSmall, RadiusCircle, RadiusMedium } from '@assets/styles/radius';
import { smscreen, xxsscreen } from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';

export const Container = styled.div`
  background: ${White};
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${Grey100};
  ${RadiusMedium}
  padding: 32px 0;

  @media ${smscreen} {
    margin-bottom: 16px;
  }

  @media ${xxsscreen} {
    margin-bottom: 50px;
  }
`;

export const SideBarWrapper = styled.div`
  padding: 0 24px;
`;

export const HeaderWrapper = styled.div`
  &:after {
    content: '';
    display: block;
    background: ${Grey100};
    height: 1px;
    width: calc(100% - 48px);
    margin: 40px 24px;
    @media ${smscreen} {
      margin: 10px 24px;
    }
  }
`;

export const HeaderFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const UserInfos = styled.div`
  margin-top: 8px;
  max-width: 170px;
`;

export const UserName = styled.h2`
  ${HeadingMedium}
  color: ${Haiti};
  margin-bottom: 4px;
`;

export const UserDesc = styled.p`
  ${ParagraphXSmall}
  color: ${Grey600};
`;

export const HeaderButtonWrapper = styled.div`
  margin-top: 32px;
  width: 130px;
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: center;
  width: 100%;

  button:not(:last-child) {
    margin-right: 10px;
  }
`;

export const SideBarBody = styled.div``;

export const Section = styled.section`
  margin-top: 40px;
`;

export const SectionTitle = styled.h4`
  ${LabelSmallUpper}
  margin-bottom: 16px;
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

export const ButtonEditInformationWrapper = styled.div`
  width: 178px;
`;

export const InsertBoxWrapper = styled.div`
  height: 128px;
`;

export const DocumentWrapper = styled.div`
  ${RadiusSmall}
  border: solid 1px ${Grey100};
  height: 80px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  justify-content: ${props => (props.loading ? 'center' : 'flex-start')};
`;

export const DocumentIcon = styled.div`
  background: ${Grey100};
  min-width: 48px;
  height: 48px;
  ${RadiusCircle}
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Primary};
  font-size: 24px;
  margin-right: 16px;
`;

export const DocumentName = styled.div`
  ${LabelSmall}
  color: ${Black};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

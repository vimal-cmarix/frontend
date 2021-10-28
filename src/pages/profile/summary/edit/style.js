import styled from 'styled-components';
import {
  White,
  Grey100,
  Haiti,
  Grey,
  Primary,
  Grey61,
} from '@assets/styles/colors';
import { RadiusSmall } from '@assets/styles/radius';
import {
  HeadingSmall,
  ParagraphSmall,
  HeadingXSmall,
} from '@assets/styles/typography';
import { laptop, smscreen } from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';

export const IconDeleteButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 2px;
  background-color: #fff;
  border: 0;
  padding: 0;
  position: absolute;
  top: ${SPACING * 3}px;
  left: ${SPACING * 4}px;
  color: ${Grey61};
  cursor: pointer;
`;

export const ButtonsWrapper = styled.div`
  display: flex;

  @media ${laptop} {
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

export const ButtonWrapperWithSpace = styled.div`
  width: 128px;

  @media ${laptop} {
    width: 80px;
    margin-right: 0;

    span {
      color: ${Grey};
    }
  }
`;

export const ButtonWrapper = styled.div`
  width: 128px;

  @media ${smscreen} {
    width: fit-content;
    margin-right: 10px;
    position: relative;
    > a {
      color: ${Primary};
      padding: 8px 16px 8px 12px;
      white-space: nowrap;
      &:before {
        display: none;
      }
    }
  }
`;

export const FileUploadWrapper = styled.div`
  padding-bottom: 24px;
  position: relative;
  width: 100%;
`;

export const VideoIconsWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  z-index: 2;
  padding: 8px;

  button {
    margin-left: 8px;
  }
`;

export const FileUploadControl = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
`;

export const FormRow = styled.div`
  margin-bottom: 40px;
`;

export const ContentEdition = styled.div`
  background: ${White};
  border: 1px solid ${Grey100};
  box-sizing: border-box;
  ${RadiusSmall}
  display: flex;
  margin-bottom: 32px;
  align-items: center;
  position: relative;
  padding: 4px 16px;
  height: 142px;

  @media ${laptop} {
    height: 128px;
  }
`;

export const ContentEditionTitle = styled.div`
  ${HeadingSmall}
  color: ${Haiti};
  padding-bottom: 8px;
  padding-right: 168px;
  padding-left: 16px;

  @media ${laptop} {
    ${HeadingXSmall}
    padding-right: 16px;
  }
`;

export const ContentEditionDesc = styled.div`
  ${ParagraphSmall}
  color: ${Haiti};
  padding-right: 150px;
  padding-left: 16px;

  @media ${laptop} {
    padding-right: 16px;
  }
`;

export const ContentEditionClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
  padding: 8px;
  cursor: pointer;

  :hover {
    color: ${Haiti};
  }
`;

export const PopOverWrapper = styled.div`
  max-width: 216px;
`;

export const ContainerEditor = styled.div`
  max-width: 695px;
  margin: 0 auto;
`;

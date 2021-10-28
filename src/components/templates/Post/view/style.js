import styled, { css } from 'styled-components';
import {
  ParagraphSmall,
  HeadingLarge,
  ParagraphMedium,
  LabelSmall,
  LabelXSmall,
  HeadingSmall,
} from '@assets/styles/typography';
import { RadiusCircle, RadiusSmall } from '@assets/styles/radius';
import { Grey500, Black, Primary, Haiti } from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';

export const WrapperEditor = styled.div`
  position: relative;
`;

export const LinkBack = styled.div`
  ${LabelSmall}
  padding: 0 8px 24px 0;
  color: ${Primary};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  button {
    width: 140px;
    margin-left: auto;

    & + button {
      margin-left: 16px;
    }

    @media ${smscreen} {
      max-width: 80px;

      span {
        width: 48px;
      }
    }
  }
`;

export const PersonalInfoWrapper = styled.div`
  display: block;
`;

export const Name = styled.h2`
  ${HeadingLarge}
  color: ${Haiti};
  padding-left: 20px;

  @media ${smscreen} {
    ${HeadingSmall}
  }
`;

export const Occupation = styled.p`
  ${ParagraphMedium}
  color: ${Black};
  padding-left: 20px;

  @media ${smscreen} {
    ${ParagraphSmall}
  }
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

  ${props =>
    props.viewDocument &&
    css`
      transform: translate(-50%);
      left: 50%;
      max-width: 256px;
      top: 50%;
      padding: 0;
    `}
`;

export const ExternalLink = styled.a`
  ${LabelSmall}
  display: block;
  margin-top: 16px;
  margin-bottom: 16px;
  color: ${Primary};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 27vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  height: 27vw;
  margin-top: 32px;

  @media ${smscreen} {
    height: 250px;
    margin-left: -16px;
    margin-right: -16px;
    width: 100vw;
  }
`;

export const PostTitle = styled.h2`
  ${HeadingLarge}
  color: ${Haiti};
  padding-top: 24px;

  @media ${smscreen} {
    ${HeadingSmall}
  }
`;

export const PostDescription = styled.p`
  ${ParagraphMedium}
  color: ${Black};
  padding: 16px 0;

  @media ${smscreen} {
    ${ParagraphSmall}
  }
`;

export const DateUpdate = styled.div``;

export const Dot = styled.span`
  ${RadiusCircle}
  display: block;
  width: 4px;
  height: 4px;
  margin: 0 8px;
  background-color: ${Grey500};
`;

export const PostDate = styled.div`
  ${LabelXSmall}
  padding-bottom: 16px;
  display: flex;
  align-items: center;
`;

export const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    margin-bottom: ${SPACING * 4}px;
  }

  > *:not(:last-child) {
    margin-right: ${SPACING * 5}px;
  }
`;

export const Cover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => `calc(${size * 100 + 100}% + 120px)`};
  margin-left: ${({ size }) => `calc(-${(size * 100) / 2}% - 60px)`};
  margin-top: 32px;
  max-height: 350px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 350px;
    object-fit: cover;
    object-position: top center;
  }

  @media ${smscreen} {
    max-width: 100vw;
    margin: 32px auto 0 -16px;
  }
`;

export const Image = styled.img``;

export const EmbeedWrapper = styled.div`
  padding-top: 24px;
`;

export const ButtonModalView = styled.a`
  color: ${Primary};
  font-size: 45px;
`;

export const WrapperPdfButton = styled.div`
  max-width: 512px;
  width: 100%;
  margin: 0 auto;

  ${props =>
    props.overlay &&
    css`
      position: relative;

      &:after {
        content: '';
        ${RadiusSmall}
        position: relative;
        background-color: rgba(0, 0, 0, 0.25);
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
      }
    `}
`;

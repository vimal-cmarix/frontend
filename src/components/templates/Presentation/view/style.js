import styled, { css } from 'styled-components';
import {
  LabelMedium,
  HeadingLarge,
  LabelMediumUpper,
  HeadingXSmall,
  HeadingSmall,
  ParagraphMedium,
  LabelXSmall,
  HeadingXLarge,
} from '@assets/styles/typography';
import { Grey, Haiti, Grey100, White, Black } from '@assets/styles/colors';
import { smscreen, xmscreen } from '@assets/styles/medias';
import { RadiusMedium } from '@assets/styles/radius';

export const LoaderWrapper = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${Grey100};
  transition: all 0.3s;
  opacity: ${props => (props.loading ? '1' : '0')};
`;

export const SignUpText = styled.span`
  ${LabelMedium}
  color: ${Grey};
  margin-right: 16px;
`;

export const SignUpButtonWrapper = styled.div`
  width: 88px;
`;

export const PageWrapper = styled.div`
  max-width: 256px;
  margin: 0 auto;
`;

export const BrandWrapper = styled.div`
  width: 160px;
  margin: 120px auto 0;
`;

export const PageTitle = styled.div`
  ${HeadingLarge}
  color: ${Haiti};
  margin-top: 78px;
  text-align: center;

  @media ${smscreen} {
    margin-top: 80px;
  }
`;

export const SignInFormWrapper = styled.div`
  margin-top: 40px;
`;

export const FieldWrapper = styled.div`
  margin-top: 24px;
  text-align: center;
`;

export const SignInButtonWrapper = styled.div`
  margin-top: 24px;

  @media ${smscreen} {
    margin-bottom: 40px;
  }
`;

export const Section = styled.section`
  margin-bottom: 30px;
  position: relative;
`;

export const SectionWrapper = styled.section`
  background: ${White};
  padding: 24px;
  box-sizing: border-box;
  border: 1px solid ${Grey100};
  ${RadiusMedium}
`;

export const TabContent = styled.section`
  padding-top: 40px;
  display: ${props => (props.show ? 'block' : 'none')};
  @media ${smscreen} {
    padding-top: 30px;
  }
`;

export const SectionTitle = styled.h4`
  ${LabelMediumUpper}
  margin-bottom: 16px;

  @media ${smscreen} {
    color: ${props => (props.largeMobile ? Black : '')};
    ${props => (props.largeMobile ? HeadingLarge : LabelMediumUpper)}
  }
`;

export const FitContentButtonWrapper = styled.div`
  width: fit-content;
  ${props =>
    props.center &&
    css`
      margin: 0 auto;
    `}
`;

export const SectionDescription = styled.p`
  ${ParagraphMedium}
  color: ${Haiti};
  margin-bottom: 32px;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;

  ${({ aspectRatio16x9 }) =>
    !aspectRatio16x9 &&
    css`
      height: 27vw;

      @media ${smscreen} {
        height: 229px;
        width: ${props => (props.fullWidth ? '100vw' : '100%')};
        margin-left: ${props => (props.fullWidth ? '-16px' : '0')};
      }
    `};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ aspectRatio16x9 }) =>
    aspectRatio16x9 &&
    css`
      height: auto;
      padding-top:56.25%;
      position: relative;

      // @media ${smscreen} {
      //   height: 180px;
      // }
      
      ::before {
        content: '';
        display: block;
        //padding-top: calc(720 / 1280 * 100%);

        padding-top: -moz-calc(720 / 1280 * 100%);
        padding-top: -webkit-calc(720 / 1280 * 100%);
        padding-top: -o-calc(720 / 1280 * 100%);
        padding-top: calc(720 / 1280 * 100%);
        display: none;
      }

      .video-box {
        position: absolute;
        top: 0;
        left: 0;
      }
    `};
`;

export const VideoTitle = styled.h3`
  ${HeadingXSmall}
  color: ${Black};
  display: block;

  @media ${smscreen} {
    ${HeadingSmall}
  }
`;

export const ResumeWrapper = styled.div`
  width: 100%;
  height: 70vh;
`;

export const ButtonLoadMoreWrapper = styled.div`
  width: 216px;
  margin: 16px auto 40px auto;

  @media ${xmscreen} {
    width: 100%;
    margin: 40px auto 80px;
  }
`;

export const SummaryTitle = styled.h2`
  ${HeadingLarge}
  color: ${Haiti};
  padding-bottom: 16px;
`;

export const HiringName = styled.h2`
  ${HeadingXLarge}
  color: ${Haiti};
  padding-bottom: 32px;
`;

export const PresentationTitle = styled.h3`
  ${HeadingLarge}
  color: ${Haiti};
  padding-bottom: 16px;
`;

export const PresentationDescription = styled.p`
  ${ParagraphMedium}
  color: ${Black};
  padding-bottom: 32px;
`;

export const SummaryDescription = styled.p`
  ${ParagraphMedium}
  color: ${Black};
  padding-bottom: 16px;
`;

export const UpdateDate = styled.div`
  ${LabelXSmall}
  padding-bottom: 16px;
`;

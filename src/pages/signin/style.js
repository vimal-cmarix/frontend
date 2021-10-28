import styled from 'styled-components';
import {
  LabelMedium,
  LabelXSmall,
  HeadingLarge,
} from '@assets/styles/typography';
import { Grey, Haiti, GreyC4, PrimaryClean } from '@assets/styles/colors';
import { smscreen, xxsscreen } from '@assets/styles/medias';
import { cdn } from '@utils/general';

const bkgImage = cdn('/static/img/sign_background.svg');

export const ColRight = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding: 40px 54px;
  background: ${PrimaryClean};
`;

export const SvgIlustra = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  svg {
    display: block;
  }
`;

export const Quotes = styled.div`
  position: absolute;
  top: 40%;
  right: 50%;
  transform: translate3d(50%, -40%, 0);

  @media (max-width:1024px) {
    top: auto;
    position: relative;
    left: auto;
    right: auto;
    transform: none;
  }

  // @media ${smscreen} {
  //   top: 40%;
  // }
`;

export const QuotesRetangle = styled.div`
  width: 625px;
  height: 359px;
  z-index: 1;
  margin-left: 165px;
  background-image: url(${bkgImage});
  background-repeat: no-repeat;

  @media ${smscreen} {
    width: 325px;
    height: 150px;
    background-size: cover;
    margin: auto;
  }
  @media (max-width: 480px) {
    width: 100%;
    background-size: contain;
  }
`;

export const ColLeft = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 54px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;

  @media (max-width: 1024px) {
    height: auto;
  }
  @media ${smscreen} {
    padding-bottom: 24px;
    height: 63.5%;
  }
  @media (max-width: 480px) {
    height: auto;
  }
`;

export const TopNav = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 24px 54px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media ${smscreen} {
    padding: 24px 46px 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 295px;
    margin: auto auto 30px;
  }

  @media ${xxsscreen} {
    padding: 24px 0 0;
    width: auto;
    text-align: center;
  }
`;

export const TopNavText = styled.span`
  padding-right: 10px;
  ${LabelMedium}
  color: ${GreyC4};

  @media ${smscreen} {
    margin-bottom:15px;
    width:200px;
    padding-right:0;
    color: #616161;
    text-align:center;
  }
`;

export const ExternalWrapper = styled.div`
  padding: 0 56px;

  @media ${smscreen} {
    padding: 0 32px;
  }
`;

export const TopNavFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media ${smscreen} {
    justify-content: center;
    padding: 24px 0;
  }
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
  display: flex;
  width: 450px;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 52px;

  @media ${smscreen} {
    width: 100%;
    padding: 52px 16px 0;
    box-sizing: border-box;
  }
`;

export const BrandWrapper = styled.div`
  width: 160px;
  margin: 32px auto 0;
`;

export const PageTitle = styled.div`
 ${HeadingLarge}
  color: ${Haiti};
  margin-bottom: 40px;

  @media ${smscreen} {
    ${HeadingLarge}
    text-align: left;
  }
`;

export const SignInFormWrapper = styled.div`
  margin-top: 24px;
`;

export const FieldWrapper = styled.div`
  margin-top: 24px;

  &:first-child {
    margin-top: 0;
  }
`;

export const SignInButtonWrapper = styled.div`
  padding-top: 24px;
  width: 128px;

  @media ${smscreen} {
    width: 256px;
    margin: 0 0;
  }
`;

export const IlustraWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  svg {
    display: block;
  }
`;

export const RecoverPasswordLink = styled.a`
  ${LabelXSmall}
  color: ${Grey};
  margin-top: 16px;
  display: inline-block;

  :hover {
    text-decoration: underline;
  }
`;

export const LikedinContainer = styled.div`
  margin-top: 32px;
  max-width: 256px;
  margin: 0 0;
`;

export const Subtitle = styled.h4`
  ${LabelXSmall}
  text-transform: uppercase;
  display: block;
  text-align: left;
  color: ${GreyC4};
  margin: 24px auto 0;
`;

export const TopNavButtonWrapper = styled.div`
  width: 128px;
  padding-right: 30px;
  @media ${smscreen} {
    margin-bottom: 15px;
    padding-right: 0;
  }
`;

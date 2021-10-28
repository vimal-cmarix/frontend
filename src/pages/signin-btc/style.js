import styled from 'styled-components';
import {
  LabelMedium,
  LabelXSmall,
  HeadingLarge,
} from '@assets/styles/typography';

import { Grey, Haiti, GreyC4, PrimaryClean } from '@assets/styles/colors';
import { smscreen, xxsscreen } from '@assets/styles/medias';
import { cdn } from '@utils/general';
import { textInputs } from 'polished';

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
  color: #485768;
  display: inline-block;
  text-decoration: none;
  -webkit-transition: all 0.35s ease 0s;
  transition: all 0.35s ease 0s;
  :hover {
    color: #4fbbef;
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

export const BoxFormSection = styled.div`
  padding: 80px 0;
  background: #f0f6ff;
  font-family: 'Mulish', sans-serif;
`;

export const Container = styled.div`
  max-width: 1160px;
`;

export const Label = styled.span`
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: rgb(29, 36, 47);
  margin: 0px 0px 5px;
  span {
    color: #ea0000;
  }
`;

export const BoxFormWrap = styled.div`
  width: 684px;
  margin: auto;
  max-width: 100%;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  -webkit-border-radius: 10px;
  border-radius: 10px;
  font-family: 'Mulish', sans-serif;
  color: #1d242f;
  overflow: hidden;
`;

export const BoxFormTitle = styled.div`
  text-align: center;
  font-size: 24px;
  line-height: 153%;
  font-weight: 700;
  color: #1d242f;
  padding: 32px 24px 24px;
  border-bottom: 1px solid #dbe1e8;
  -webkit-border-radius: 10px 10px 0 0;
  border-radius: 10px 10px 0 0;
  position: relative;
`;

export const BoxFormBody = styled.div`
  padding: 24px;
  min-height: 604px;
`;

export const BoxFormAction = styled.div`
  padding: 24px;
  position: relative;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
  .btn {
    display: block;
    background: #7027e0;
    color: #fff;
    font-size: 18px;
    line-height: 24px;
    float: none;
    width: 100%;
    font-family: Mulish;
    font-weight: 700;
    padding: 8px 15px;
    border: 2px solid #7027e0;
    box-sizing: border-box;
    border-radius: 10px;
    transition: all 0.35s ease 0s;
    outline: none;
    box-shadow: none;
    height: auto;
  }
  .have-account {
    text-align: right;
    margin-top: 18px;
  }
  .have-account span {
    display: block;
    color: #485768;
    font-size: 16px;
    margin-bottom: 5px;
  }
  .have-account a {
    font-weight: 700;
    color: #485768;
    font-size: 16px;
  }
  .have-account a:hover {
    color: #4fbbef;
  }
`;

export const PasswordNote = styled.p`
  font-family: Mulish;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #1d242f;
  margin: 0 0 48px;
`;

export const FormGroup = styled.div`
  margin: 0 0 56px;
  position: relative;
  margin-top: 24px !important;
  .form-control {
    background: transparent;
    color: #485768;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    border: none;
    border-bottom: 1px solid #485768;
    border-radius: 0;
    height: auto;
    padding: 0 0 3px;
    box-shadow: none;
    -webkit-transition: all 0.35s ease 0s;
    transition: all 0.35s ease 0s;
  }
`;

export const FormGroupMb8 = styled.div`
  margin-bottom: 8px !important;
  margin: 0 0 56px;
  position: relative;
  .form-control {
    background: transparent;
    color: #485768;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    border: none;
    border-bottom: 1px solid #485768;
    border-radius: 0;
    height: auto;
    padding: 0 0 3px;
    box-shadow: none;
    -webkit-transition: all 0.35s ease 0s;
    transition: all 0.35s ease 0s;
  }
`;

export const ForgotPasswordLink = styled.p`
  font-weight: 600;
  text-align: right;
`;

export const SocialSignIn = styled.div`
  .social_one {
    display: block;
    padding: 13px 15px;
    border: 1px solid #000;
    border-radius: 50px;
    margin-bottom: 22px;
    text-align: center;
    position: relative;
    font-size: 18px;
    font-weight: 700;
    color: #000;
    text-decoration: none;
    -webkit-transition: 0s;
  }
  .social_one:hover {
    border-color: #4fbbef !important;
    color: #4fbbef !important;
  }
  social_one.google {
    border-color: #909090;
  }
  .social_one.facebook {
    border-color: #1877f2;
    color: #1877f2;
  }
  .social_one img {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const Small = styled.div`
  display: block;
  position: relative;
  text-align: center;
  margin: 40px 0 35px;
  font-size: 16px;
  font-weight: 600;
  :before {
    content: '';
    position: absolute;
    width: calc(50% - 30px);
    height: 1px;
    background: #485768;
    left: 0;
    top: 50%;
    opacity: 0.7;
  }
  :after {
    content: '';
    position: absolute;
    width: calc(50% - 30px);
    height: 1px;
    background: #485768;
    right: 0;
    top: 50%;
    opacity: 0.7;
  }
`;

export const LoginFooter = styled.div`
padding: 10px 24px 24px;
}
p{
    margin-bottom: 0;
    font-size: 16px;
    line-height: 1.8;
}
a{
    color: #0287C8;
    text-decoration: none;
    font-weight: 600;
}
`;

export const ShowHidePassword = styled.div`
  width: 24px;
  position: absolute;
  top: 31px;
  right: 0;
  cursor: pointer;
  img {
    width: 100%;
  }
`;

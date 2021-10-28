import styled from 'styled-components';
import {
  LabelMedium,
  LabelXSmall,
  HeadingLarge,
  LabelXXXSmall,
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

export const CreateResume = styled.div`
  padding: 30px 25px;
`;

export const ProfileVisabelWrap = styled.div`
  .border-form-group {
    .form-control {
      padding: 10px 20px;
      border: 1px solid #485768;
      border-radius: 4px;
      margin-top: -8px;
    }

    select.form-control {
      -webkit-appearance: none;
      padding-right: 34px;
      background: url(/img/select-down-bg.svg) no-repeat;
      background-position-x: calc(100% - 15px);
      background-position-y: center;
      background-size: 10px 6px;
    }

    select.form-control {
      padding-right: 34px;
    }

    .form-control:focus {
      border-color: #4fbbef;
    }

    .text-count {
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      text-align: right;
      color: #1d242f;
      padding-top: 4px;
    }

    .form-group textarea.form-control {
      min-height: 130px;
      max-height: 231px;
      overflow-y: auto;
    }
  }
`;

export const CheckBoxWrap = styled.div``;

export const ContactInfoWrap = styled.div`
  .check_me {
    p {
      margin-top: 18px;
      margin-bottom: 0;
      font-size: 16px;
      line-height: 1.7;
      font-weight: 600;
    }
  }
`;

export const OnlineResumeWrap = styled.div`
  padding: 30px 25px;
  .want-to-upload p {
    font-size: 18px;
    font-weight: 600;
    color: #485768;
    margin-bottom: 20px;
  }
  .action-btn {
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

  .small {
    display: block;
    position: relative;
    text-align: center;
    margin: 40px 0 35px;
    font-size: 16px;
    font-weight: 600;
  }
  .small::before {
    content: '';
    position: absolute;
    width: calc(50% - 30px);
    height: 1px;
    background: #485768;
    left: 0;
    top: 50%;
    opacity: 0.7;
  }
  .small::after {
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
    background: #4fbbef;
    color: #00405f;
    font-size: 18px;
    line-height: 24px;
    float: none;
    width: 100%;
    font-family: Mulish;
    font-weight: 700;
    padding: 8px 15px;
    border: 2px solid #4fbbef;
    box-sizing: border-box;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -webkit-transition: all 0.35s ease 0s;
    transition: all 0.35s ease 0s;
    outline: none;
    box-shadow: none;
    text-align: center;
    text-decoration: none;
    height: auto;
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
  .note {
    font-weight: 600;
    font-size: 16px;
    color: #485768;
    margin-bottom: 30px;
  }
  .note span {
    color: #ff0000;
    margin-right: 5px;
  }
`;

export const TermsText = styled.h4`
  ${LabelXXXSmall}
  display: block;
  text-align: center;
  color: ${GreyC4};
  margin: 10px auto 0;
  width: 310px;
`;

export const FormWrapperButton = styled.div`
  padding-top: 24px;
  width: 128px;

  @media ${smscreen} {
    width: 125px;
    margin: 0;
  }
`;

export const EducationOneThree = styled.div`
  .education-one {
    border-bottom: 1px solid #485768;
    padding-bottom: 14px;
    width: calc(100% - 60px);
    margin-left: auto;
    margin-right: auto;
    position: relative;
    margin-bottom: 18px;
    margin-top: 18px;
  }
`;
export const EductionWrap = styled.div`
  .common_ttl {
    font-size: 18px;
    font-weight: 700;
    color: #1d242f;
    display: inline-block;
    margin-bottom: 15px;
  }
`;

export const ReqLabel = styled.div`
  .note {
    > span {
      color: red;
      margin-right: 5px;
    }
  }
`;

export const DateSelectWrap = styled.div`
  .w-100 {
    width: 100% !important;
  }
  .d-flex {
    display: -webkit-flex !important;
    display: flex !important;
  }
`;
export const SaveAnouther = styled.div`
  .step-action {
    padding-top: 25px;
    margin-top: 25px;
    border-top: 1px solid #a1a1a1;
  }
  .action-btn {
    background: #7027e0;
    color: #fff;
    border: 2px solid #7027e0;
    height: auto;
  }
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
  }
  .save_add {
    background: #fff !important;
    color: #8a4ee4 !important;
    margin-bottom: 25px;
  }
`;

export const FormWrapperBlock = styled.div`
  &.form-group {
    margin-bottom: 30px;
    padding: 0px;
  }
  .form-control {
    background: transparent;
    color: #1d242f;
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
export const TitleRecommend = styled.div`
  .recommandation_line {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.7;
  }
  b,
  strong {
    font-weight: bolder;
  }
`;

export const WantTodayWrap = styled.div`
  .textfield textarea {
    height: 400px;
    outline: none;
    width: 100%;
    border: none;
    border-bottom: 1px solid #dedede;
    background: rgba(219, 225, 232, 0.2);
    font-size: 14px;
    padding: 10px 15px;
    margin-bottom: 6px;
  }
`;

export const VideoWrap = styled.div`

.privacy-setting{
  display: flex; align-items: center; justify-content: center;
  padding: 5px 35px 5px 10px;
  border-radius: 50px;
  border: 1px solid #1D242F;
  font: 400 14px "Mulish";
  color: rgba(29, 36, 47,0.5);
  margin-top: 4px;
  width: max-content;
  position: relative;
  text-decoration: none;
  margin-left: 50px;
}
.privacy-setting::after{
  content: '';
  position: absolute;
  width: 10px;
  height: 8px;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: url(../assets/images/drop-down-icon.png) no-repeat center;
  background-size: 7px;
}
.privacy-setting img{
  margin-right: 5px;
}
 .sharestory-header .left{
  position: relative;
}
 .sharestory-header .left .img{
  width: 40px; height: 40px; border-radius: 50%; object-fit: cover;
  margin-right: 10px;
}
 .sharestory-header .left .username{
  font: 700 16px "Mulish";
  color: #1D242F;
}
 .sharestory-header .right .make-draft{
  color: #1D242F; font-size: 16px; font-weight: 600; font-family: 'Mulish';
}
 .sharestory-header .right .save{
  color: #A873FA;
  font: 700 16px "Mulish";
  margin-left: 20px;
} 
.resume-action {
    border: 1px solid #a1aab4;
    border-radius: 10px;
    padding: 30px 20px;
    text-align: center;
    background: #eff2f5;
}
.small{
    display: block;
    position: relative;
    text-align: center;
    margin: 40px 0 35px;
    font-size: 16px;
    font-weight: 600;
}
.small::before{
    content: '';
    position: absolute;
    width: calc(50% - 30px);
    height: 1px;
    background: #485768;
    left: 0;
    top: 50%;
    opacity: 0.7;
}
.small::after{
    content: '';
    position: absolute;
    width: calc(50% - 30px);
    height: 1px;
    background: #485768;
    right: 0;
    top: 50%;
    opacity: 0.7;
}
}
`;

export const ForgotPasswordLink = styled.p`
  font-weight: 600;
  text-align: right;
`;

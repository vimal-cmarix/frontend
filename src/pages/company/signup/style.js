import styled from 'styled-components';
import { RadiusSmall } from '@src/assets/styles/radius';
import { typoTheme } from '@src/assets/styles/typo';
import { DEFAULT_FONT } from '@src/assets/styles/theme';
import {
  HeadingLarge,
  LabelMedium,
  LabelXXXSmall,
  LabelXSmall,
} from '@src/assets/styles/typography';
import {
  Haiti,
  GreyC4,
  PrimaryClean,
  White,
  Black,
  Red,
  GreyCF,
  Grey61,
  Grey50,
} from '@src/assets/styles/colors';
import { smscreen, xxsscreen } from '@src/assets/styles/medias';
import { cdn } from '@utils/general';

const getBackgroundColor = ({ disabled, error }) => {
  if (error) return tint(0.95, Red);
  if (disabled) return Grey50;
  return White;
};

const getBorderColor = ({ disabled, error, focus }) => {
  if (error) return Red;
  if (disabled) return Grey50;
  if (focus) return Grey61;
  return GreyCF;
};
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
  top: 50vh;
  right: 50%;
  transform: translate3d(50%, -40%, 0);

  @media ${smscreen} {
    top: 60%;
  }
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
`;

export const ColLeft = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 54px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;

  @media ${smscreen} {
    padding-bottom: 24px;
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
  padding-right: 16px;
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

export const TopNavButtonWrapper = styled.div`
  width: 128px;
`;

export const FormWrapper = styled.div`
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

export const FormWrapperBlock = styled.div`
  padding-top: 24px;
`;

export const FormWrapperButton = styled.div`
  padding-top: 24px;
  width: 128px;

  @media ${smscreen} {
    width: 125px;
    margin: 0;
  }
`;

export const FormWrapperTitle = styled.div`
  ${HeadingLarge}
  color: ${Haiti};
  margin-bottom: 40px;

  @media ${smscreen} {
    ${HeadingLarge}
    text-align: left;
  }
`;

export const LikedinContainer = styled.div`
  max-width: 256px;
  margin: 0;
`;

export const TermsText = styled.h4`
  ${LabelXXXSmall}
  display: block;
  text-align: center;
  color: ${GreyC4};
  margin: 10px auto 0;
  width: 310px;
`;

export const Subtitle = styled.h4`
  ${LabelXSmall};
  text-transform: uppercase;
  display: block;
  text-align: left;
  color: ${GreyC4};
  margin: 24px auto 0;
`;

export const PhoneComponent = styled.div`
  position: relative;
  input{
    ${RadiusSmall};
    font-size: ${typoTheme.sizes.base};
    font-family: ${DEFAULT_FONT};
    background: ${props => getBackgroundColor(props)};
    color: ${props => (props.disabled ? Grey500 : Black)};
    display: block;
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => getBorderColor(props)};
    box-sizing: border-box;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 40px;
    padding: 9px 45px 9px 11px;
    &:focus {
      background: ${props => getBackgroundColor(props)};
      border-color: ${props => getBorderColor({ ...props, focus: true })};
    }

    &::placeholder {
      color: ${GreyCF};
    }
    ${({ noBorder }) =>
      noBorder &&
      css`
        @media ${smscreen} {
          border-left-width: 0;
          border-right-width: 0;
          border-top-width: 0;
          border-radius: 0;
        }
      `}
`;
export const ErrorMessagePhone = styled.div`
  // font-family: 'Lato', sans-serif;
  // font-weight: 400;
  // font-size: 12px;
  // line-height: 16px;
  // letter-spacing: -0.24px;
  // margin-top: 8px;
  // color: #ca3f2f;
  -webkit-font-smoothing: antialiased;
  text-transform: none;
  display: block;
  color: #ea0000;
  font-family: 'Mulish';
  font-size: 13px;
  line-height: 150%;
  font-weight: normal;
  margin: 5px 0 0;
  letter-spacing: 0;
`;

export const Label = styled.span`
  font-family: Mulish;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #1d242f;
  display: inline-block;
  margin: 0 0 5px;
  .req-star {
    color: #ea0000;
  }
`;

export const BoxFormWrap = styled.div`
  width: 684px;
  margin: auto;
  max-width: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
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
  border-radius: 10px 10px 0 0;
  position: relative;
  h2 {
    font-size: inherit;
    color: inherit;
    line-height: inherit;
    font-family: inherit;
    font-weight: inherit;
    margin: 0;
  }
`;

export const BoxFormBody = styled.div`
  padding: 24px 24px 72px;
  min-height: inherit;
`;

export const BoxFormAction = styled.div`
  padding: 24px;
  position: relative;
  border-radius: 0 0 10px 10px;
  &:before {
    content: '';
    position: absolute;
    left: 24px;
    right: 25px;
    top: 0;
    border-top: 1px solid #a1aab4;
  }
  .btn {
    background: #4fbbef;
    color: #000;
    font-size: 18px;
    line-height: 24px;
    float: none;
    width: 100%;
    font-family: Mulish;
    font-weight: 700;
    padding: 8px 15px;
    border: 2px solid #4fbbef;
    box-sizing: border-box;
    border-radius: 10px;
    transition: all 0.35s ease 0s;
    box-shadow: none;
    text-align: center;
    text-decoration: none;
    outline: none;
    display: block;
    cursor: pointer;
    height: auto;
    &:hover {
      color: #4fbbef;
      background: #fff;
      border-color: #4fbbef;
    }
  }
`;

export const FormGroup = styled.div`
  margin: 0 0 30px;
  position: relative;
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
    &:focus {
      border-color: #4fbbef;
    }
    &::-webkit-input-placeholder {
      color: #485768;
      opacity: 1;
    }
    &::-moz-placeholder {
      color: #485768;
      opacity: 1;
    }
    &:-ms-input-placeholder {
      color: #485768;
      opacity: 1;
    }
    &:-moz-placeholder {
      color: #485768;
      opacity: 1;
    }
  }
  &.mb-8 {
    margin-bottom: 8px;
  }
  &.mt-24 {
    margin-top: 24px;
  }
`;

export const ShowHidePassword = styled.div`
  width: 22px;
  height: 22px;
  position: absolute;
  top: 29px;
  right: 0;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const PageHeader = styled.div`
  padding: 40px 118px 40px 100px;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
  position: relative;
  display: -webkit-flex;
  display: flex;
  .sizigi-header-logo a {
    display: inline-block;
    img {
      max-width: 130px;
    }
  }
  .sizigi-header-nav {
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #1d242f;
    line-height: 153%;
    align-items: center;
    margin-left: auto;
    min-height: 43px;
    display: flex;
    a {
      line-height: 24px;
      margin-left: 30px;
      text-decoration: none;
      outline: none;
      transition: all 0.25s ease 0s;
      position: relative;
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: #1d242f;
      &:hover {
        color: #009de9;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -5px;
        margin: auto;
        width: 0;
        opacity: 0;
        height: 2px;
        border-radius: 20px;
        transition: all 0.35s ease 0s;
        background: #009de9;
      }
      &.active {
        :before {
          width: 100%;
          opacity: 1;
        }
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

export const FormLeftBar = styled.div`
  background: #fff;
  padding: 40px 24px 60px;
  margin-top: -125px;
  position: relative;
  z-index: 999;
  max-width: 472px;
  width: 100%;
  min-height: 100vh;
  .logo {
    margin-bottom: 60px;
    a {
      display: inline-block;
      img {
        max-width: 130px;
      }
    }
  }
  h2 {
    font: 700 32px/1.5 'Mulish';
    margin: 0;
    color: #1d242f;
  }
  .vector-img {
    position: absolute;
    bottom: 40px;
    left: 45%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
`;

export const FormLeftBarP = styled.div`
  font-family: Mulish;
  font-style: italic;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
  color: #a873fa;
  text-align: right;
  margin: 16px 0;
`;

export const BoxWrapOuter = styled.div`
  width: calc(100% - 472px);
  padding: 0 0 50px;
  font-family: 'Mulish', sans-serif;
`;

export const BoxFormSection = styled.div`
  display: flex;
`;

export const MainPageDivision = styled.div`
  background: #f0f6ff;
  min-height: 100vh;
  letter-spacing: 0;
  img {
    vertical-align: middle;
  }
`;

export const FormBtmNote = styled.div`
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  color: #1d242f;
  margin-top: 30px;
  padding: 0 15px;
  a {
    color: #1d242f;
    text-decoration: none;
    outline: none;
    transition: all 0.35s ease 0s;
    &:hover {
      color: #009de9;
    }
  }
  p {
    margin-bottom: 0;
  }
`;

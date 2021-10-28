import styled from 'styled-components';
import { RadiusSmall } from '@assets/styles/radius';
import { typoTheme } from '@assets/styles/typo';
import { DEFAULT_FONT } from '@assets/styles/theme';
import {
  HeadingLarge,
  LabelMedium,
  LabelXXXSmall,
  LabelXSmall,
} from '@assets/styles/typography';
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
} from '@assets/styles/colors';
import { smscreen, xxsscreen } from '@assets/styles/medias';
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
  color: rgb(29, 36, 47);
  margin: 0px 0px 5px;
  span {
    color: #ea0000;
  }
`;

export const BoxFormSection = styled.div`
  padding: 80px 0;
  background: #f0f6ff;
  font-family: 'Mulish', sans-serif;
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
  min-height: inherit;
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
  }
`;

export const FormGroup = styled.div`
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

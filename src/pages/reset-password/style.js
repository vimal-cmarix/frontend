import styled from 'styled-components';
import { darken } from 'polished';

import { Primary, White, Black, Blueberry } from '@assets/styles/colors';
import {
  DisplayXSmall,
  LabelLarge,
  DisplayXMedium,
  HeadingMedium,
  HeadingLarge,
  ParagraphLarge,
} from '@assets/styles/typography';
import { smscreen, sizes as breakpoint } from '@assets/styles/medias';

export const ColRight = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding: 40px 54px;
  background: ${Primary};
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
`;

export const QuotesRetangle = styled.div`
  width: 168px;
  height: 359px;
  opacity: 0.05;
  border: solid 10px ${White};
  z-index: 1;
  margin-left: 165px;
`;

export const QuotesText = styled.div`
  ${DisplayXSmall}
  color: ${White};
  background: ${Primary};
  z-index: 2;
  position: absolute;
  // transform: translate3d(0,-50%,0);
  top: 50%;
  left: 43%;
  text-align: right;
  width: 302px;
  padding: 36px 0 24px 0;
  transform: translate(-50%, -50%);

  small {
    ${LabelLarge}
    display:block;
    padding-top: 24px;
  }
`;

export const ColLeft = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
`;

export const TopNav = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 24px 54px;

  @media ${smscreen} {
    justify-content: center;
    padding: 24px 0;
  }
`;

export const TopNavText = styled.div`
  padding-right: 16px;
`;

export const TopNavButtonWrapper = styled.div`
  width: 80px;

  @media screen and (min-width: ${breakpoint.mediumphone}) {
    width: 108px;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  flex-direction: column;
  color: ${Black};
  text-align: center;
  align-items: center;
  padding-top: 100px;
`;

export const FormWrapperBlock = styled.div`
  padding-top: 24px;
  max-width: 450px;
  width: 450px;
  text-align: left;

  @media ${smscreen} {
    width: 256px;
  }
`;

export const FormWrapperButton = styled.div`
  padding-top: 24px;
  width: 128px;
  margin: 0 auto;

  @media ${smscreen} {
    width: 256px;
  }
`;

export const FormWrapperTitle = styled.h1`
  ${DisplayXMedium}

  @media ${smscreen} {
    ${HeadingLarge}
    text-align: center;
  }
`;

export const FormWrapperResend = styled.p`
  ${LabelLarge}
  color: ${Blueberry};
  margin-top: 48px;
  cursor: pointer;
  margin-bottom: 179px;
  transition: all .1s ease-in-out;

  &:hover {
    color: ${darken(0.12, Blueberry)};
  }
`;

export const FormWrapperDescription = styled.h2`
  ${HeadingMedium}
  margin-top: 16px;
  margin-bottom: 48px;
  max-width: 530px;
  align-self: center;
  text-align: center;

  @media ${smscreen} {
    ${ParagraphLarge}
    text-align: center;
  }
`;

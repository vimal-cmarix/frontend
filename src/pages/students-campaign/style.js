import styled from 'styled-components';
import { Primary, White, Haiti, Grey } from '@assets/styles/colors';
import {
  DisplayXSmall,
  LabelLarge,
  HeadingLarge,
  LabelMedium,
} from '@assets/styles/typography';
import { smscreen, xxsscreen } from '@assets/styles/medias';

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
  width: 100%;
  height: 100%;
  padding-bottom: 54px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;

  @media ${smscreen} {
    padding-bottom: 24px;
  }
`;

export const TopNav = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 24px 54px;

  @media ${smscreen} {
    padding: 24px 46px 0;
    display: flex;
    justify-content: center;
  }

  @media ${xxsscreen} {
    padding: 24px 40px 0;
  }
`;

export const TopNavText = styled.span`
  padding-right: 16px;
  ${LabelMedium}
  color: ${Grey};
`;

export const TopNavButtonWrapper = styled.div`
  width: 80px;
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
    width: 256px;
    margin: 0 auto;
  }
`;

export const FormWrapperTitle = styled.div`
  ${HeadingLarge}
  color: ${Haiti};
  margin-bottom: 40px;

  @media ${smscreen} {
    ${HeadingLarge}
    text-align: center;
  }
`;

export const LikedinContainer = styled.div`
  max-width: 256px;
  margin: 0 auto;
`;

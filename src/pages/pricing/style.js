import styled, { css } from 'styled-components';
import {
  ParagraphMedium,
  HeadingLarge,
  LabelMedium,
} from '@assets/styles/typography';
import {
  Haiti,
  Black,
  LightPurple,
  Grey888,
  White,
  ExtraLightGrey,
  Grey50,
  Grey31,
  Grey9F,
  GreyD4,
  ContentCardBG,
} from '@assets/styles/colors';
import { RightButtonWrapper } from '@components/templates/Modals/style';
import {
  laptop,
  smscreen,
  smscreenReverse,
  xxsscreen,
  xxxsscreen,
} from '@assets/styles/medias';
import { RadiusMedium } from '@assets/styles/radius';
import { cdn } from '@utils/general';
import Btn from '@components/molecules/Btn';
import { MediumElevation } from '@assets/styles/elevations';

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-left: 100px;
  overflow-x: visible;

  @media ${smscreen} {
    padding: 0;
    flex-direction: column;
    margin-bottom: 50px;
  }

  @media ${xxsscreen} {
    padding: 0;
    flex-direction: column;
    margin-bottom: 50px;
  }
`;

export const HeaderInfoBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  margin-bottom: 30px;

  div {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    @media ${smscreen} {
      row-gap: 0;
      justify-content: flex-start;
      width: 100%;
    }

    @media ${xxsscreen} {
      row-gap: 0;
      justify-content: flex-start;
      width: 100%;
    }
  }

  @media ${smscreen} {
    justify-content: flex-start;
    width: 100%;
  }

  @media ${xxsscreen} {
    justify-content: flex-start;
    width: 100%;
  }
`;

export const HeaderButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 28px;

  button {
    margin-right: 24px;

    @media ${smscreen} {
      margin-right: 0;
    }
  }

  @media ${smscreen} {
    margin-top: 28px;
    padding-right: 18px;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  @media ${xxsscreen} {
    margin-top: 28px;
    padding-right: 18px;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 68px;
  line-height: 150%;
  font-weight: 700;
  color: ${Grey31};
  width: 800px;
  position: relative;
  overflow: visible;
  margin-bottom: 11px;

  @media ${smscreen} {
    padding-left: 5px;
    font-weight: 600;
    font-size: 30px;
    line-height: 150%;
    margin-bottom: 10px;
    width: 100%;
  }

  @media ${xxsscreen} {
    padding-left: 5px;
    font-weight: 600;
    font-size: 30px;
    line-height: 150%;
    margin-bottom: 10px;
    width: 100%;
  }
`;

export const Description = styled.h2`
  font-size: 30px;
  line-height: 36px;
  color: ${Grey31};
  position: relative;
  width: 520px;

  @media ${smscreen} {
    padding-left: 5px;
    font-size: 18px;
    line-height: 24px;
    width: 275px;
    &.pricingDescription {
      width: auto;
    }
  }

  @media ${xxsscreen} {
    padding-left: 5px;
    font-size: 18px;
    line-height: 24px;
    width: 275px;
    &.pricingDescription {
      width: auto;
    }
  }
`;

export const CTAButton = styled(Btn)`
  padding: 1rem 2rem;
  font-size: 18px;
  border-radius: 100px;

  @media ${`${smscreenReverse} and ${laptop}`} {
    ${props =>
      props.isMobileHeader &&
      css`
        width: 50%;
        margin: 0 32px 40px 32px;
      `}
  }

  @media ${smscreen} {
    width: 100%;
    ${props =>
      props.isMobileHeader &&
      css`
        width: auto;
        margin: 0 32px 40px 32px;
      `}
  }

  @media ${xxsscreen} {
    width: 100%;
    ${props =>
      props.isMobileHeader &&
      css`
        width: auto;
        margin: 0 32px 40px 32px;
      `}
  }
`;

export const HeaderIllustration = styled.img`
  max-width: 100vw;
  z-index: -100;
  margin-left: -100px;

  @media ${smscreen} {
    width: 100%;
    margin-left: 0;
  }

  @media ${xxsscreen} {
    width: 100%;
    margin-left: 0;
  }
`;

export const PlanTitle = styled.h2`
  ${HeadingLarge}
  color: ${Haiti};
  margin-bottom: 8px;

  @media ${smscreen} {
    margin-top: 8px;
  }
`;

export const Resume = styled.p`
  ${ParagraphMedium}
  color: ${Haiti};
`;

export const DiscountImg = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const ToggleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DiscountWrapper = styled.div`
  position: relative;

  .confetti {
    position: absolute;
    top: -30px;
    right: -40px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  height: ${props => (props.nomarging ? 'auto' : '140px')};

  ${props =>
    props.isPresentation &&
    css`
      li {
        &:last-child {
          margin-bottom: 0;
        }
      }
    `}
`;

export const Feature = styled.li`
  ${ParagraphMedium}
  display: flex;
  color: ${Black};
  zmargin-bottom: 8px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const IconWrapper = styled.div`
  font-size: 22px;
  margin-right: 8px;

  @media ${smscreen} {
    margin-right: 4px;
  }
`;

export const ButtonWrapper = styled(RightButtonWrapper)`
  width: 100%;
`;

export const InfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const EnphaseLine = styled.span`
  display: block;
  background-color: yellow;
  width: 244px;
  height: 41px;
  position: absolute;
  bottom: -15px;
  left: 182px;
  z-index: -1;
  background: url('${cdn('/static/img/enphase-line.svg')}') 0 0 no-repeat;
  background-size: contain;

  @media ${smscreen} {
    width: 180px;
    height: 30px;
    left: unset;
    right: 9px;
    bottom: -5px;
  }

  @media ${xxsscreen} {
    width: 147px;
    height: 26px;
  }
`;

export const ComparisionGrid = styled.div`
  ${RadiusMedium}
  display: flex;
  flex-direction: column;
  background-color: ${White};
  box-sizing: border-box;
  padding: 10px 26px 45px 40px;
  width: 100%;
  margin: auto;
  margin-top: 80px;
  @media ${smscreen} {
    display: none;
  }
`;

export const ComparisionRow = styled.div`
  background-color: ${props =>
    props.soon || props.comparisionHeader ? White : 'transparent'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: ${props => props.comparisionHeader && 'sticky'};
  top: ${props => props.comparisionHeader && '76px'};
  color: ${props => (props.soon ? GreyD4 : Grey31)};
  &:not(:first-child) {
    border-bottom: 1px solid ${props => (props.soon ? ExtraLightGrey : GreyD4)};
  }
  @media ${smscreen} {
    top: ${props => props.comparisionHeader && '48px'};
  }
`;

export const ComparisionCell = styled.div`
  width: ${props => (props.isMobileEmpty ? '0' : '25%')};
  display: ${props => (props.mobileDisplay === false ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  padding: ${p => (p.header ? '20px 0' : '20px')};
  box-sizing: border-box;
  background-color: ${p => (p.grey ? Grey50 : 'none')};

  @media ${smscreen} {
    padding: 17px 30px 26px 10px;
    min-height: auto;
    width: 50%;
    justify-content: ${p => (p.top ? 'flex-start' : 'center')};
    align-items: flex-end;
  }
`;

export const ComparisionCellLabel = styled.p`
  text-align: start;
  width: 100%;
  padding-left: 10px;
  font-weight: 500;
  color: ${props => (props.soon ? GreyD4 : Grey31)};
  font-size: 14px;
`;

export const ComparisionCellText = styled.p`
  font-size: 14px;
  font-weight: ${props => (props.strong ? 600 : 500)};
  color: ${props => (props.strong ? Grey31 : GreyD4)};

  @media ${smscreen} {
    width: 100%;
    text-align: right;
    padding-right: 15px;
  }
`;

export const CellHeader = styled.p`
  font-size: 30px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  color: ${Grey31};
`;

export const CellDescription = styled.div`
  ${LabelMedium}
  display: block;
  margin-bottom: 10px;
  min-height: 60px;
  @media ${smscreen} {
    display: none;
  }
`;

export const CellPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 18px;

  ${props =>
    props.mobileCell &&
    css`
      margin: 22px 0;
    `}
`;

export const CellPrice = styled.p`
  font-size: ${props => (props.oldPrice ? '14px' : '18px')};
  line-height: ${props => (props.oldPrice ? '21px' : '24px')};
  margin-top: 6px;
  width: 100%;
  text-align: center;
  color: ${props => (props.oldPrice ? Grey888 : LightPurple)};
  text-decoration: ${props => (props.oldPrice ? 'line-through' : 'none')};
  font-weight: ${props => (props.oldPrice ? '500' : '400')};
`;

export const PaymentInterval = styled.p`
  font-size: 12px;
  color: ${Grey9F};
  line-height: 150%;
  margin-bottom: 24px;
`;

export const MobileComparisionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;

  @media ${smscreenReverse} {
    display: none;
  }
`;

export const SliderControllersWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px 0;
`;

export const SliderControllerLabel = styled.div`
  font-size: 22px;
  line-height: 150%;
  color: ${Grey31};
`;

export const MobilePricingInfo = styled.div`
  display: flex;
  padding-top: 29px;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  background-color: ${ContentCardBG};
  border-radius: 5px;
  ${MediumElevation}

  @media ${smscreen} {
    margin: 0 13px;
  }

  @media ${xxxsscreen} {
    margin: 0 13px;
  }
`;

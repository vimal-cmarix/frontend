import styled, { css } from 'styled-components';

import { DEFAULT_FONT, SPACING } from '@assets/styles/theme';
import { typoTheme } from '@assets/styles/typo';

import {
  RadiusSmall,
  RadiusMedium,
  RadiusXSmall,
  RadiusCircle,
} from '@assets/styles/radius';

import {
  White,
  Black,
  Grey100,
  Grey,
  Haiti,
  Red,
  Grey200,
  Primary,
  BlueHover,
  Grey400,
  Orange,
  GreyCF,
  Grey61,
  PrimaryLight,
  Grey31,
  Grey50,
} from '@assets/styles/colors';

import {
  HeadingLarge,
  LabelSmall,
  HeadingSmall,
  ParagraphMedium,
  LabelMedium,
  ParagraphSmall,
  LabelXSmall,
  LabelXSmallUpper,
  HeadingXLarge,
  DisplaySmall,
  DisplayXSmall,
} from '@assets/styles/typography';
import { LargeElevation } from '@assets/styles/elevations';
import { lighten, darken } from 'polished';
import {
  smscreen,
  xxsscreen,
  smallHeight,
  smscreenReverse,
  sizes as breakpoint,
} from '@assets/styles/medias';
import {
  InsertBoxWrapper as HomeWrapper,
  InsertBox as HomeBox,
  InsertTitle as HomeTitle,
} from '@pages/home/style';
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

export const StudentsTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StudentsDiscountDescription = styled.span`
  ${LabelMedium};
  font-weight: 400;
  margin: 10px 100px 0 20px;
  color: ${Grey400};

  strong {
    font-weight: 700;
  }
`;

export const StudentsDiscountTitle = styled.h1`
  ${({ small }) => (small ? DisplayXSmall : DisplaySmall)};
  width: 250px;
  color: ${Black};
  margin: 0 100px 0 20px;

  .highlight {
    color: ${Orange};
    white-space: nowrap;
  }

  span {
    white-space: nowrap;
  }

  @media ${smscreen} {
    ${DisplayXSmall};
    width: auto;
  }
`;

export const ContainerAlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ShowMobile = styled.div`
  display: none;

  @media ${smscreen} {
    display: flex;
    flex-direction: column;
  }
`;

export const HideMobile = styled.div`
  display: flex;
  flex-direction: column;

  @media ${smscreen} {
    display: none;
  }
`;

export const CloseButton = styled.div`
  ${RadiusCircle};
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 24px;
  padding: 8px;
  color: ${Grey};
  background: ${Grey100};
  cursor: pointer;

  ${props =>
      props.fullScreen &&
      css`
        top: 64px;
      `}
    :hover {
    background: ${darken(0.03, Grey100)};
  }

  :active {
    background: ${darken(0.12, Grey100)};
  }

  ${props =>
    props.hideDesktop &&
    css`
      @media ${smscreenReverse} {
        display: none;
      }
    `}
`;

export const DefaultModalContent = styled.div`
  ${RadiusMedium};
  ${LargeElevation};
  transform: ${props => (props.isOpened ? 'scale(1)' : 'scale(0.95)')};
  max-width: ${props => (props.fitContent ? 'fit-content' : '728px')};
  max-height: 80vh;
  width: 100%;
  padding: ${props => (props.fitContent ? '70px' : '40px')};
  background: ${White};
  transition: 0.1s ease-in;
  overflow-y: auto;
  position: absolute;
  z-index: 5;

  &.shareProfileModal {
    margin-bottom: 40px;
  }

  @media ${smscreen} {
    max-height: calc(100% - 48px);
    padding: 46px 24px 24px;

    &.shareProfileModal {
      margin-bottom: 0px;
    }
  }

  @media (max-width: 767px) {
    padding: 40px 20px;
    box-sizing: border-box;
    &.pricingModal {
      max-width: 94% !important;
      form {
        > div {
          display: block;
          text-align: center;
          h1 {
            margin: 10px 0;
            width: auto;
          }
          span {
            margin: 0;
          }
        }
        button {
          margin: 10px auto auto;
        }
      }
    }
  }

  @media ${smallHeight} {
    max-height: calc(90% - 48px);
  }

  ${props =>
    props.fullScreen &&
    css`
      max-height: 100vh;
      height: 100vh;
      max-width: 100vw;
      padding: 0;
      border-radius: 0;
      @media ${smscreen} {
        max-height: 100vh;
        padding: 0;
      }
      @media ${smallHeight} {
        max-height: 100vh;
      }
    `}

  ${props =>
    props.large &&
    css`
      max-width: 1024px;
    `}
`;

export const Title = styled.span`
  font-size: ${typoTheme.sizes.headline3};
  line-height: 152%;
  color: ${Grey31};
  margin-bottom: 32px;

  ${props =>
    props.private &&
    css`
      margin-bottom: 16px;
      margin-top: 24px;

      @media ${xxsscreen} {
        text-align: center;
      }
    `}

  ${props =>
    props.smallMarginBottomMobile &&
    css`
      @media ${smscreen} {
        margin-bottom: 8px;
      }
    `}
`;

export const Subtitle = styled.h3`
  ${HeadingSmall};
  color: ${Grey31};
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: ${typoTheme.sizes.base};
  line-height: 152%;
  color: ${Grey31};
  font-family: ${DEFAULT_FONT};
  margin-bottom: 32px;

  strong {
    font-weight: bold;
  }
`;

export const Body = styled.div`
  ${({ gutterY }) =>
    gutterY &&
    css`
      padding-top: ${gutterY}px;
      padding-bottom: ${gutterY}px;
    `};
  &.cardListBody {
    padding-bottom: 82px !important;
    @media (max-width: 1023px) {
      padding-bottom: 0 !important;
    }
  }
  &.overflow_hide {
    overflow: hidden;
  }
`;

export const SocialContent = styled.div`
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
    `};

  ${({ justifyEnd }) =>
    justifyEnd &&
    css`
      justify-content: flex-end;
    `};

  ${({ justifyEnd }) =>
    justifyEnd &&
    css`
      justify-content: flex-end;
    `};

  ${({ gutterR }) =>
    gutterR &&
    css`
      padding-right: 38px;
    `};

  ${({ gutterX }) =>
    gutterX &&
    css`
      padding-left: 38px;
      padding-right: 38px;
    `};

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    ${({ gutterR }) =>
      gutterR &&
      css`
        padding-right: 64px;
      `};

    ${({ gutterX }) =>
      gutterX &&
      css`
        padding-left: 64px;
        padding-right: 64px;
      `};
  }
`;

export const SocialRowTrash = styled.div`
  ${({ hide }) =>
    hide &&
    css`
      opacity: 0;
      visibility: hidden;
    `};
`;

export const SocialRowContent = styled.div``;

export const SocialRow = styled.div`
  display: flex;
  align-items: center;

  ${SocialRowContent} {
    flex-grow: 1;
  }

  ${SocialRowTrash},
  > img {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    position: relative;
  }

  > img {
    border-radius: 50%;
    margin-right: ${SPACING * 2}px;
  }

  ${SocialRowTrash} {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${SPACING * 2}px;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    ${SocialRowTrash},
    > img {
      width: 48px;
      height: 48px;
    }

    ${SocialRowTrash} {
      margin-left: ${SPACING * 4}px;
    }

    > img {
      margin-right: ${SPACING * 4}px;
    }
  }
`;

export const Row = styled.div`
  &:not(:last-child) {
    margin-bottom: 13px;
  }
  &.swimlanedropdown{
    .scroll-bar__container {
      max-height: 100px !important;
      overflow-y: auto !important;
      > div{
        padding:0 !important;
        overflow: auto !important;
      }
    }
  }
  &.checkhere{
    > label{
      max-width: max-content;
    }
  }
  ${props =>
    props.flex &&
    css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}
  ${props =>
    props.hide &&
    css`
      display: none;
    `}

  ${({ hasBorderTop }) =>
    hasBorderTop &&
    css`
      border-top: 1px solid #cfcdd6;
      padding-top: 15px;
      margin-top: -12px;
    `}


`;

export const FormBlockWrapper = styled.div`
  margin-bottom: 16px;

  & > .form-block__multiple_inputs:not(:nth-last-child(2)) {
    margin-bottom: 50px;
  }
`;
export const TextInput = styled.textarea``;
export const FormBlockRow = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: ${SPACING * 4}px;
  flex-direction: column;

  div {
    flex: 1;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    gap: 30px;
    flex-direction: row;
  }
  ${TextInput} {
    max-height: 200px;
    overflow: auto !important;
  }
`;

export const TrashButton = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: -35px;
  @media (max-width: 1023px) {
    right: -25px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ mt }) => mt || 0}px;

  ${props => props.left && 'justify-content: flex-start;'}
  ${props => props.center && 'justify-content: center;'};
  ${props =>
    props.hide &&
    css`
      display: none;
    `}

  ${({ isFixedBottom }) =>
    isFixedBottom &&
    css`
      @media ${smscreen} {
        position: fixed;
        background-color: #fff;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px 30px;
        box-sizing: border-box;
      }
    `}
`;

export const SelectsWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const SelectBlock = styled.div`
  width: 100%;
  max-width: ${props => (props.small ? '150px' : '300px')};
  margin-right: ${props => (props.small ? '16px' : 0)};
`;

export const LeftButtonWrapper = styled.div`
  width: 170px;
  margin-right: 16px;
`;

export const CenterButtonWrapper = styled.div`
  width: 160px;
  margin-left: auto;
  margin-right: 16px;

  @media ${smscreen} {
    button {
      padding: 14px 0;
      justify-content: flex-start;
    }
  }
`;

export const RightButtonWrapper = styled.div`
  width: 170px;
`;

export const FitContentButtonWrapper = styled.div`
  width: fit-content;

  ${props =>
    props.center &&
    css`
      margin: 0 auto;
    `}
`;

export const ButtonAddContent = styled.button`
  ${LabelSmall}
  color: ${Black};
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  padding: 0 16px;
  outline: none;
  border: none;
  cursor: pointer;
  background: transparent;

  :hover {
    color: ${lighten(0.15, Black)};
  }

  :active {
    color: ${lighten(0.1, Black)};
  }
`;

export const ButtonAddContentWrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    padding-right: 90px;
  }
  span {
    word-break: break-all;
  }
`;

export const VideoWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  position: relative;

  ${({ aspectRatio16x9 }) =>
    !aspectRatio16x9 &&
    css`
      height: 400px;

      @media ${smscreen} {
        height: 240px;
      }
    `};

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

export const VideoIconsWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  padding: 8px;

  button {
    margin-left: 8px;
  }
`;

export const Resume = styled.p`
  ${ParagraphMedium}
  color: ${Haiti};
  text-align: center;
  max-width: 420px;

  i{
    font-style: italic;
    margin-right: 2px;
  }
`;

export const PrivateLinkWrapper = styled.div`
  width: fit-content;
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;

  @media ${xxsscreen} {
    width: 100%;
  }
`;

export const ContentCopy = styled.div`
  ${ParagraphMedium}
  ${RadiusXSmall}
  margin: 32px auto;
  border: 1px solid ${Haiti};
  padding: 16px 24px;
  box-sizing: border-box;
  text-align: ${({ isLeft }) => (isLeft ? 'left' : 'center')};
  color: ${Haiti};

  @media ${xxsscreen} {
    padding: 8px 12px;
  }

  p {
    word-break: break-word;

    strong {
      font-weight: bold;
    }

    span {
      display: block;
      margin-bottom: 8px;
    }
  }

  ${props =>
    props.alignLeft &&
    css`
      text-align: left;
    `}
`;

export const CopyButtonWrapper = styled.div`
  margin: 0 auto;
  display: flex;

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
      margin: 0 0 0 16px;
    `}

  @media ${smscreen} {
    ${props =>
      props.hideMobile &&
      css`
        display: none;
      `}
  }
`;

export const InputHidden = styled.textarea`
  position: fixed;
  right: 130vw;
  opacity: 0;
`;

export const LoaderWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InsertBoxWrapper = styled(HomeWrapper)`
  ${RadiusSmall}
  height: auto;
  margin-top: 10px;

  ${props =>
    props.noBackground &&
    css`
      background: none;
    `}

  ${props =>
    props.newContentStyle &&
    css`
      max-width: 1024px;
      padding-left: 0;

      > div {
        /* TODO: Work on a better solution for iphone */
        @supports (padding: max(0px)) {
          /* Portrait */
          /* ----------- iPhone 6, 6S, 7 and 8 ----------- */
          @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
            padding-bottom: max(env(safe-area-inset-bottom, 126px), 126px);
          }

          /* Portrait */
          /* ----------- iPhone 6+, 7+ and 8+ ----------- */
          @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
            padding-bottom: max(env(safe-area-inset-bottom, 126px), 126px);
          }

          /* Portrait */
          /* ----------- iPhone X ----------- */
          @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
            padding-bottom: max(env(safe-area-inset-bottom, 126px), 126px);
          }
        }
      }
    `}
`;

export const InsertBox = styled(HomeBox)``;

export const InsertTitle = styled(HomeTitle)``;

export const CheckboxWrapper = styled.div`
  position: absolute;
  z-index: 3;
  right: 16px;
  top: 16px;
`;

export const ButtonWrapper = styled.div`
  z-index: 9;
  width: calc(100% - 80px);
  margin: 0 auto;
  padding-top: 32px;
  padding-bottom: 30px;
  position: fixed;
  right: 40px;
  bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #fff;
  width: 100%;
  z-index: 900;
  > div {
    width: auto;
  }

  /* TODO: Work on a better solution for iphone */
  /* Portrait */
  /* ----------- iPhone 6, 6S, 7 and 8 ----------- */
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    padding-bottom: 48px;
    position: sticky;
    bottom: 0;
  }

  /* Portrait */
  /* ----------- iPhone 6+, 7+ and 8+ ----------- */
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    padding-bottom: 48px;
    position: sticky;
    bottom: 0;
  }

  /* Portrait */
  /* ----------- iPhone X ----------- */
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    padding-bottom: 48px;
    position: sticky;
    bottom: 0;
  }

  @media ${smscreen} {
    padding-bottom: 40px;
    bottom: 0;
    z-index: 3;
  }

  @media ${smallHeight} {
    bottom: 0;
  }

  ${props =>
    props.hideMobile &&
    css`
      @media ${smscreen} {
        display: none;
      }
    `}
`;

export const WrapperFullScreen = styled.div`
  padding: 48px 40px;
  position: relative;
  height: 100%;
  box-sizing: border-box;
  /* TODO: shrink padding for small devices (iPhone 5) */

  /* TODO: Work on a better solution for iphone */
  @supports (padding: max(0px)) {
    /* Portrait */
    /* ----------- iPhone 6, 6S, 7 and 8 ----------- */
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
      padding: max(env(safe-area-inset-top, 48px), 48px)
        max(env(safe-area-inset-right, 40px), 48px)
        max(env(safe-area-inset-bottom, 48px), 48px)
        max(env(safe-area-inset-left, 40px), 48px);
    }

    /* Portrait */
    /* ----------- iPhone 6+, 7+ and 8+ ----------- */
    @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
      padding: max(env(safe-area-inset-top, 48px), 48px)
        max(env(safe-area-inset-right, 40px), 48px)
        max(env(safe-area-inset-bottom, 48px), 48px)
        max(env(safe-area-inset-left, 40px), 48px);
    }

    /* Portrait */
    /* ----------- iPhone X ----------- */
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
      padding: max(env(safe-area-inset-top, 48px), 48px)
        max(env(safe-area-inset-right, 40px), 48px)
        max(env(safe-area-inset-bottom, 48px), 48px)
        max(env(safe-area-inset-left, 40px), 48px);
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  @media ${smscreen} {
    flex-direction: column;
    margin-bottom: 32px;
  }
`;

export const TitleCounter = styled.h4`
  ${HeadingLarge}
  color: ${Grey};
  margin-left: 8px;

  @media ${smscreen} {
    ${LabelMedium}
    margin-left: 0;

    > span {
      display: none;
    }
  }
`;

export const ButtonWrapperSuccess = styled.div`
  max-width: 128px;
  margin-left: auto;
  margin-top: 24px;
`;

export const SuccessResume = styled.p`
  text-align: left;
  color: ${Black};

  strong {
    font-weight: 700;
  }
`;

export const ButtonWrapperConfirmPayment = styled.div`
  display: flex;
  max-width: 300px;
  justify-content: flex-end;
  margin-left: auto;
  margin-top: 24px;

  button {
    &:first-child {
      margin-right: 24px;
    }
  }
`;

export const BrainTreeContainer = styled.div`
  margin-bottom: 32px;
  position: relative;

  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  &.loading .form {
    opacity: 0;
  }

  .braintree-hosted-fields-focused {
    border-color: ${Grey61};
  }
  .braintree-hosted-fields-invalid {
    border-color: ${Red};
  }
`;

export const BrainTreeField = styled.div`
  ${ParagraphSmall};
  ${RadiusSmall};
  background: ${White};
  color: ${Black};
  display: block;
  width: 100%;
  border: 1px solid ${GreyCF};
  box-sizing: border-box;
  outline: none;

  iframe {
    max-height: 40px;
    padding: 9px 11px;
    box-sizing: border-box;

    input {
      ${ParagraphSmall};
    }
  }
`;

export const ErrorMessage = styled.span`
  ${LabelXSmall}
  margin-top: 8px;
  color: ${Red};
`;

export const EditIconWrapper = styled.div`
  padding: 0px 0px 5px 5px;
  margin-left: 8px;
  color: ${Grey200};
  cursor: pointer;
  transition: all 0.3s;
  opacity: ${props => (props.disabled ? '.3' : '1')};

  @media ${smscreen} {
    color: ${Primary};
  }
`;

export const EditArea = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

export const ButtonWrapperCenter = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px auto 0;
  max-width: 256px;
`;

export const SummaryCardWrapper = styled.div`
  position: relative;

  &:after {
    pointer-events: none;
    opacity: 0;
    content: '';
    background: ${BlueHover};
    position: absolute;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -12px;
    ${RadiusXSmall}
    transition: all .3s;
  }

  &:hover {
    &:after {
      opacity: 1;
    }

    ${EditIconWrapper} {
      color: ${Primary};
    }
  }
`;

export const LabelTitle = styled.h3`
  ${LabelMedium}
  color: ${Grey};
  margin-top: 10px;
`;

export const LabelList = styled.span`
  ${LabelXSmallUpper}
  color: ${Grey};
`;

export const LabelListWrapper = styled.div`
  display: flex;
  padding-bottom: 32px;
  padding-top: 8px;

  ${LabelList} {
    padding-right: 8px;
    display: flex;
    align-items: center;

    &:before {
      content: '';
      display: block;
      width: 2px;
      height: 2px;
      ${RadiusCircle}
      background: ${Grey};
      margin-right: 8px;
    }
  }

  ${LabelList}:first-child {
    padding-left: 0;
    &:before {
      display: none;
    }
  }
`;

export const StudentsWrapper = styled.div`
  max-width: 427px;
  margin: 0 auto;
  text-align: center;
  color: ${Black};
`;

export const StudentsTitle = styled.h2`
  ${HeadingXLarge}
  margin-bottom: 68px;
  position: relative;
`;

export const StudentsEffect = styled.span`
  display: block;
  width: 246px;
  height: 42px;
  position: absolute;
  bottom: -17px;
  left: 90px;
  z-index: -1;
  background: url('${cdn('/static/img/enphase-line.svg')}') 0 0 no-repeat;
  background-size: contain;

  @media ${smscreen} {
    transform: translateX(-50%);
    left: 50%;
  }
`;

export const StudentsDesc1 = styled.p`
  ${HeadingSmall};
  margin-bottom: 23px;
`;

export const StudentsDesc2 = styled.p`
  ${HeadingSmall};
  margin-bottom: 65px;
  color: ${Grey400};
`;

export const StudentsButtonWrapper = styled.div`
  max-width: 128px;
  margin: 0 auto;
`;

export const InternalModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  ${RadiusMedium};
`;

export const InternalModalBoxClose = styled.div`
  width: 20px;
  height: 20px;
  color: ${Grey61};
  cursor: pointer;
`;

export const InternalModalBox = styled.div`
  width: 282px;
  padding: 30px 25px;
  display: grid;
  grid-gap: 44px;
  grid-template-columns: repeat(3, 1fr);
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${White};
  box-sizing: border-box;
  z-index: 1;
  position: relative;
  ${RadiusSmall};

  ${InternalModalBoxClose} {
    position: absolute;
    top: ${SPACING * 2}px;
    right: ${SPACING * 2}px;
  }

  > button {
    width: 100%;
    padding: 0;
    border: 0;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }

  > button > img {
    width: 100%;
    display: block;
  }

  @media screen and (min-width: ${breakpoint.tabletPortrait}) {
    width: 324px;
    padding: 48px 45px;
    grid-column-gap: 45px;
    grid-row-gap: 54px;
  }
`;

export const InternalModal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  &.pitch-class {
    top: -260px;
    height: calc(100% + 260px) !important;
    max-height: calc(100% + 260px) !important;
    align-items: flex-start;
    z-index: 9;

    @media ${smscreen} {
      top: -273px;
      // height: 100vh !important;
      // max-height: 100vh !important;

      height: calc(100vh - 44px) !important;
      max-height: calc(100vh - 44px) !important;
      z-index: 99;
    }

    @media (max-width: 767px) {
      height: 100vh !important;
      max-height: 100vh !important;
    }

    > div {
      + div {
        height: 100%;
        box-shadow: none;
      }
    }

    .scroll-bar__container {
      height: calc(100% - 40px) !important;
      @media ${smscreen} {
        height: calc(100% - 60px) !important;
      }
      @media (max-width: 767px) {
        height: calc(100% - 44px) !important;
      }
      > div {
        height: 100% !important;
        overflow-x: hidden !important;
        background: #fff;

        @media (max-width: 767px) {
          height: calc(100% - 30px) !important;
        }
      }
    }
  }

  ${({ show }) =>
    !show &&
    css`
      opacity: 0;
      visibility: hidden;
    `};
`;

export const LoaderWrapperModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${SPACING * 8}px;
`;

export const VideoSummaryDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${SPACING * 2}px 0;
  background-color: ${PrimaryLight};
`;

export const VideoEditCircle = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  background-color: ${GreyCF};
  position: absolute;
  top: ${SPACING * 4}px;
  right: ${SPACING * 4}px;
  border-radius: 50%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Grey61};
  outline: none;
  cursor: pointer;

  :hover {
    background-color: ${darken(0.05, GreyCF)};
  }
`;

export const ReadonlyBtn = styled.button`
  border: none;
  background: transparent;
  curser: pointer;
  z-index: 1;
  padding: 0;
`;

export const InputWithIcon = styled.div`
  position: relative;
  ${ReadonlyBtn} {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
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

  &.overflow_hide {
    overflow: hidden;
  }
`;

export const ListWrapper = styled.div`
  span {
    word-break: break-all;
  }
`;

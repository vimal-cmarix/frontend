// import { GreyC4 } from '@assets/styles/colors';
import {
  GreyC4,
  MediumGrey,
  GreyF3,
  Primary,
  Grey61,
  White,
  ExtraLightGrey,
  PrimaryDark,
} from '@assets/styles/colors';
import { CircleIconButton } from '@assets/styles/helpers';
import {
  xmscreen,
  smscreen,
  xxsscreen,
  smscreenReverse,
} from '@assets/styles/medias';
import { LargeElevation, SmallElevation } from '@assets/styles/elevations';
import { RadiusCircle, RadiusMedium, RadiusSmall } from '@assets/styles/radius';
import { SPACING } from '@assets/styles/theme';
import styled from 'styled-components';
import { Button } from '@components/molecules/Button';

export const ContainerResume = styled.div`
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  margin: 40px 48px;
  box-sizing: border-box;
  padding: ${SPACING * 10}px ${SPACING * 9}px;
  @media ${smscreen} {
    margin: 24px 16px;
  }
  .icon-delete_outline {
    color: ${MediumGrey};
  }
  @media ${xmscreen} {
    padding: ${SPACING * 10}px ${SPACING * 8}px;
    flex-direction: column-reverse;
  }
`;

export const PopupResumeWaper = styled.div`
  padding: 10px 30px 30px;
  > div {
    margin: 0;
    padding: 0;
  }
  .resumePreview {
    .resumePreview {
      background: rgba(0, 0, 0, 0.35);
    }
  }
`;

export const PopupResumeInner = styled.div`
  display: flex;
  @media (max-width: 480px) {
    display: block;
  }
  > div {
    &:first-child {
      min-width: 320px;
      @media (max-width: 480px) {
        min-width: 100%;
      }
    }
    &:nth-child(2) {
      align-items: center;
      display: flex;
      @media (max-width: 480px) {
        justify-content: center;
        padding: 30px 0 0;
      }
    }
  }

  .resumeUploadBtn {
    > div {
      pointer-events: none;
    }
    position: relative;
    padding-bottom: 28px;
    min-width: 130px;
    button {
      position: absolute;
      bottom: 0;
      top: 0;
      padding-top: 25px;
      height: auto;
      cursor: pointer;
    }
  }
`;

export const LeftArea = styled.div`
  flex: 1;
  max-width: 500px;
  padding-right: ${SPACING * 3}px;
`;

export const PreviewDoc = styled.div`
  ${RadiusMedium}
  background-color: ${GreyC4};
  position: relative;
  min-height: 410px;
  max-height: 600px;
  overflow: hidden;
  max-width: 305px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.resumePreview{
    background: transparent;
    min-height: auto;
  }
`;

export const RightArea = styled.div`
  padding-left: ${SPACING * 10}px;
  margin-left: auto;
  @media ${xmscreen} {
    padding-bottom: ${SPACING * 10}px;
    padding-left: 0;
  }
`;

export const PreviewActions = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dbe1e8;
  &.resumePreview {
    background: transparent;
  }
`;

export const UploadBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  button {
    height: 28px;
  }
`;

export const DeleteButton = styled(CircleIconButton)`
  position: absolute;
  right: ${SPACING * 4}px;
  top: ${SPACING * 4}px;
`;

export const IframeContainer = styled.div`
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  padding-top: ${SPACING * 10}px;
  height: 70vh;
`;

export const AddApplicationWrapper = styled.div`
  padding: ${props => (props.isUntracked ? '105px 198px' : '1.5625rem 3rem')};
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  flex-direction: column;
  color: #000000;
  @media ${smscreen} {
    padding: ${props => (props.isUntracked ? '50px 70px' : '1.5625rem 1rem')};
  }
  @media ${xxsscreen} {
    padding: ${props => (props.isUntracked ? '50px 70px' : '1.5625rem 1rem')};
  }
`;

export const ContainerApplication = styled.div`
  display: ${props => (props.isShowing ? 'flex' : 'none')};
`;

export const AddApplicationTitle = styled.h1`
  display: flex;
  align-items: center;
  color: ${Primary};
  font-weight: 600;
  font-size: 1.5rem;
  > div {
    margin-right: 0.5rem;
  }
`;

export const AddApplicationActionsWrapper = styled.div`
  padding: 3.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  display: ${props => (props.isShowing ? 'block' : 'none')};
`;

export const AddApplicationActionsTitle = styled.div`
  display: flex;
  justify-content: center;
  color: ${Grey61};
  font-size: 0.875rem;
`;

export const AddApplicationActionsButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media ${smscreen} {
    flex-direction: column;
    align-items: center;
  }
`;

export const AddApplicationDropdownWrapper = styled.div`
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  flex-direction: column;
  @media ${smscreenReverse} {
    position: absolute;
    right: 20px;
  }
  @media ${smscreen} {
    width: 185px;
  }
`;

export const AddApplicationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${smscreen} {
    flex-direction: column;
  }
`;

export const ApplicationCardsWrapper = styled.div`
  margin: 0.875rem 0;
  color: #000000;
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  justify-content: flex-start;
`;

export const ApplicationCard = styled.div`
  ${RadiusMedium};
  background-color: #fff;
  margin-top: 1rem;
  min-height: 200px;
  min-width: 200px;
  ${LargeElevation};
`;

export const AddApplicationButton = styled(Button)`
  font-weight: normal;
  border-radius: 10px;
  font-size: 14px;
  min-width: 167px;
  min-height: 40px;
  margin-top: 16px;
  margin-left: 1rem;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;

  @media ${smscreen} {
    margin-left: 0;
  }
`;

export const DropDownOption = styled.div`
  align-items: center;
  padding: 8px 16px;
  box-sizing: border-box;
  cursor: pointer;
  background: ${White};
  &:hover {
    background: ${ExtraLightGrey};
  }
  display: flex;
  justify-content: space-between;
  width: 320px;
  align-items: center;
  padding: 0.5rem 1rem;
  color: ${Grey61};
  border-bottom: 1px ${GreyF3} solid;
  @media ${smscreen} {
    width: 266px;
    top: auto;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.disabled &&
    css`
      user-select: none;
      pointer-events: none;
    `};
`;

export const ButtonDeleteProfile = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  right: ${SPACING * 3}px;
  top: ${SPACING * 3}px;
  background: ${White};
  display: flex;
  justify-content: center;
  align-items: center;
  ${RadiusCircle}
  ${SmallElevation}
  transition: all 0.1s ease-in-out;
  z-index: 3;
  cursor: pointer;
`;

export const ChangeApplicationTypeButton = styled(Button)`
  display: ${props => (props.isShowing ? 'block' : 'none')};
  font-weight: normal;
  border-radius: 10px;
  padding: 0.625rem 4rem;

  @media ${smscreen} {
    margin-top: 16px;
  }
`;

export const ResumeTabBtn = styled.div`
  display: ${props => (props.isShowing ? 'block' : 'none')};
  padding: 30px;
  .resume_btn {
    margin-right: 10px;
  }
`;

export const DropDownContainer = styled.div`
  ${RadiusSmall};
  ${LargeElevation};
  background: ${White};
  position: absolute;
  right: 0;
  top: 50px;
  z-index: 1;
  overflow: auto;
  @media ${smscreen} {
    top: auto;
    right: 40px;
    margin-top: 60px;
  }
`;

export const ShareButton = styled(Button)`
  display: ${props => (props.isShowing ? 'block' : 'none')};
  font-weight: normal;
  border-radius: 10px;
  padding: 0.625rem 4rem;
  margin-top: 17px;
  background: ${White};
  border: 1px solid ${Primary};
  color: ${Primary};

  &:hover {
    background: ${PrimaryDark};
    color: ${White};
  }
`;

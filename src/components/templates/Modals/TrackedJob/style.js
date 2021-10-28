import styled, { css } from 'styled-components';

import {
  Black,
  ExtraLightGrey,
  MediumGrey,
  Primary,
  Grey31,
  Grey61,
  GreyF3,
  White,
  PrimaryDark,
} from '@assets/styles/colors';
import { LargeElevation, SmallElevation } from '@assets/styles/elevations';
import { RadiusCircle, RadiusMedium, RadiusSmall } from '@assets/styles/radius';
import { smscreen, smscreenReverse, xxsscreen } from '@assets/styles/medias';

import { Button } from '@components/molecules/Button';
import { SPACING } from '@assets/styles/theme';

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

export const ContainerJobTracker = styled.div`
  width: 928px;
  position: relative;

  @media ${smscreen} {
    width: auto;
  }
`;

export const TrackedJobHeader = styled.div`
  padding: 1.5rem 3rem;
  display: flex;

  @media ${smscreen} {
    padding: 2rem 1rem;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  background-color: ${GreyF3};
  height: 288px;
  width: 100%;

  align-items: center;
  justify-content: center;
`;

export const TrackedJobNavbar = styled.nav`
  padding: 1px 3rem;
  display: flex;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  white-space: nowrap;

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

export const CloseIconButtonWrapper = styled.div`
  position: absolute;
  top: ${SPACING * 2}px;
  right: ${SPACING * 2}px;
  display: inline-flex;
`;

export const CloseIconButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: ${MediumGrey};
  outline: none;
`;

export const NavbarLink = styled.a`
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
`;

export const NavbarItem = styled.div`
  padding: 6px 2px;
  display: inline-flex;
  transition: color 0.2s;
  position: relative;

  & > a {
    color: ${props => (props.isCurrentTab ? Black : MediumGrey)};
  }
  margin-right: 3.75rem;

  @media (max-width: 480px) {
    margin-right: 25px;
    &:last-child {
      margin-right: 0;
    }
  }

  ::before {
    content: '';
    width: 0;
    height: 2.5px;
    background-color: ${Primary};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 3px;
    margin: 0 auto;
    transition: width 0.2s;
  }

  ${props =>
    props.isCurrentTab &&
    css`
      ::before {
        width: 52px;
        max-width: 100%;
      }
    `}
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

export const TrackedJobTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TrackedJobTitle = styled.h3`
  font-weight: 600;
  font-size: 1.5rem;
  margin-top: 20px;
  color: ${Grey31};
`;

export const TrackedJobCompanyName = styled.p`
  font-weight: 400;
  font-size: 1.125rem;
  margin-top: 0.375rem;
  color: ${Grey61};
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

export const ChangeApplicationTypeButton = styled(Button)`
  display: ${props => (props.isShowing ? 'block' : 'none')};
  font-weight: normal;
  border-radius: 10px;
  padding: 0.625rem 4rem;

  @media ${smscreen} {
    margin-top: 16px;
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

export const TrackedJobIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

export const AddApplicationWrapper = styled.div`
  padding: ${props => (props.isUntracked ? '105px 198px' : '1.5625rem 3rem')};
  background-color: ${GreyF3};
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  flex-direction: column;
  @media ${smscreen} {
    padding: ${props => (props.isUntracked ? '50px 70px' : '1.5625rem 1rem')};
  }
  @media ${xxsscreen} {
    padding: ${props => (props.isUntracked ? '50px 70px' : '1.5625rem 1rem')};
  }
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

export const ApplicationCardsWrapper = styled.div`
  margin: 0.875rem 0;
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

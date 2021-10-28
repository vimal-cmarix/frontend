import styled, { css } from 'styled-components';
import { ParagraphSmall, ParagraphXSmall } from '@assets/styles/typography';
import {
  Black,
  GreyCF,
  MediumGrey,
  Primary,
  White,
} from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';
import { LargeElevation } from '@assets/styles/elevations';
import { RadiusSmall } from '@assets/styles/radius';
import { NavbarItem } from '@components/templates/Modals/TrackedJob/style';

export const ListTaskWrapper = styled.div`
  ${LargeElevation}
  ${RadiusSmall}

  display: flex;
  flex-direction: column;
  height: 513px;
  width: 400px;
  box-sizing: border-box;

  background: #ffffff;
  overflow: hidden;

  @media ${smscreen} {
    margin-top: 20px;
    width: 100%;
  }
`;

export const NavbarLink = styled.a`
  ${ParagraphSmall}
  cursor: pointer;
`;

export const NavbarItemTask = styled(NavbarItem)`
  padding: 6px 2px;
`;

export const TrackedJobNavbar = styled.nav`
  padding: 1px 16px;
  display: flex;
  div:first-child {
    margin-right: 48px;
  }
`;

export const TextTitleList = styled.span`
  ${ParagraphXSmall}
  display: block;
  color: ${MediumGrey};
  padding: 16px 0px 8px 16px;
`;

export const ContainerPinned = styled.div`
  background: ${White};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  flex: 1;
`;

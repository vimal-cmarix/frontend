import styled from 'styled-components';

import { RadiusMedium, RadiusCircle } from '@assets/styles/radius';
import { MediumElevation } from '@assets/styles/elevations';

export const AbsoluteContainer = styled.div`
  position: absolute;
  left: calc(100% + 40px);
  bottom: calc(50% - 50px);
  z-index: 999;
`;

export const Container = styled.div`
  position: relative;
  width: 320px;
  height: 246px;
  background-color: #ffffff;
  padding: 45px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'a b c'
    'd e f ';
  box-sizing: border-box;
  ${RadiusMedium};
  ${MediumElevation};

  svg {
    position: absolute;
    max-width: 38px;
    left: -34px;
    bottom: 25px;

    -webkit-filter: drop-shadow(-4px 0px 2px rgba(0, 0, 0, 0.13));
    filter: drop-shadow(-8px 0px 4px rgba(0, 0, 0, 0.13));
  }

  opacity: ${({ showTooltip }) => (showTooltip ? 1 : 0)};
  transition: 0.4s;
`;

export const SocialIcons = styled.img`
  width: 48px;
  height: 48px;
  ${RadiusCircle};
  cursor: pointer;

  &:nth-child(1) {
    grid-area: a;
    align-self: start;
    justify-self: start;
  }

  &:nth-child(2) {
    grid-area: b;
    align-self: start;
    justify-self: center;
  }

  &:nth-child(3) {
    grid-area: c;
    align-self: start;
    justify-self: end;
  }

  &:nth-child(4) {
    grid-area: d;
    align-self: end;
    justify-self: start;
  }

  &:nth-child(5) {
    grid-area: e;
    align-self: end;
    justify-self: center;
  }

  &:nth-child(6) {
    grid-area: f;
    align-self: end;
    justify-self: end;
  }
`;

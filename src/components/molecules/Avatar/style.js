import styled, { css } from 'styled-components';
import { RadiusCircle } from '@assets/styles/radius';
import { White, Orange } from '@assets/styles/colors';

export const Container = styled.div`
  ${RadiusCircle}
  font-family: 'Apercu Pro';
  background: ${({ background }) => background};

  ${props =>
    !props.image &&
    css`
      background: ${Orange};
    `};

  color: ${White};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-weight: 600;
  user-select: none;
`;

export const XXXSmallContainer = styled(Container)`
  width: 16px;
  height: 16px;
  min-width: 16px;
  font-size: 8px;
  line-height: 10px;
`;

export const XXSmallContainer = styled(Container)`
  width: 24px;
  height: 24px;
  min-width: 24px;
  font-size: 12px;
  line-height: 15px;
`;

export const XSmallContainer = styled(Container)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  font-size: 15px;
  line-height: 19px;
`;

export const SmallContainer = styled(Container)`
  width: 48px;
  height: 48px;
  min-width: 48px;
  font-size: 22px;
  line-height: 27px;
`;

export const MediumContainer = styled(Container)`
  width: 56px;
  height: 56px;
  min-width: 56px;
  font-size: 26px;
  line-height: 32px;
`;

export const LargeContainer = styled(Container)`
  width: 64px;
  height: 64px;
  min-width: 64px;
  font-size: 30px;
  line-height: 37px;
`;

export const XLargeContainer = styled(Container)`
  width: 80px;
  height: 80px;
  min-width: 80px;
  font-size: 38px;
  line-height: 47px;
`;

export const XXLargeContainer = styled(Container)`
  width: 96px;
  height: 96px;
  min-width: 96px;
  font-size: 44px;
  line-height: 55px;
`;

export const ResponsiveContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;

export const Initial = styled.span`
  display: none;

  ${props =>
    !props.image &&
    css`
      display: block;
    `};
`;

export const ImageContent = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit }) => objectFit};
  display: none;

  ${props =>
    props.image &&
    css`
      display: block;
    `};
`;

import styled from 'styled-components';

import { typoTheme } from '@assets/styles/typo';
import { RadiusMedium, RadiusCircle } from '@assets/styles/radius';
import {
  Grey100,
  Black,
  Grey400,
  White,
  Grey,
  Grey87,
  Primary,
} from '@assets/styles/colors';
import {
  HeadingSmall,
  LabelXSmall,
  LabelSmall,
} from '@assets/styles/typography';
import { SmallElevation, LargeElevation } from '@assets/styles/elevations';
import { smscreen } from '@assets/styles/medias';
import { SPACING } from '@assets/styles/theme';

const lineClamp = `
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ActionButton = styled.div`
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
  opacity: ${props => (props.isPopOverVisible ? '1' : '0')};
  transition: all 0.1s ease-in-out;
  z-index: 3;
`;

export const OptionsContainer = styled.div`
  font-size: 24px;
`;

export const Container = styled.div`
  ${RadiusMedium};
  margin: auto;
  max-width: 330px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background: ${White};
  position: relative;
  transition: all 0.1s ease-in-out;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    ${ActionButton} {
      opacity: 1;
    }
  }

  @media ${smscreen} {
    ${ActionButton} {
      opacity: 1;
    }
  }
`;

export const TextContainer = styled.div`
  padding: 0 ${SPACING * 4}px ${SPACING * 4}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &.pitchTextWrap {
    h2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

export const Title = styled.h2`
  ${HeadingSmall}
  color: ${Black};
  margin-bottom: 24px;
  ${lineClamp}
`;

export const Description = styled.p`
  font-size: ${typoTheme.sizes.body2};
  line-height: 152%;
  color: ${Grey87};
  margin-top: ${SPACING * 2}px;
  margin-bottom: ${SPACING * 4}px;
  ${lineClamp};
`;

export const Recipient = styled.p`
  ${LabelSmall}
  color: ${Grey};
  margin-bottom: 8px;
`;
export const LinkJob = styled.p`
  ${LabelXSmall}
  color: ${Grey400};
  margin-bottom: 24px;
`;

export const ViewsWrapper = styled.div`
  color: ${Grey400};
  display: flex;
  align-items: center;
  margin-top: 2px;
  justify-content: space-between;
`;

export const Created = styled.span`
  font-size: ${typoTheme.sizes.caption};
  line-height: 170%;
  color: ${Grey87};
  font-weight: 300;
`;

export const Views = styled.div`
  font-size: ${typoTheme.sizes.caption};
  font-weight: 300;
  line-height: 170%;
  color: ${Primary};
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ViewsIcon = styled.span`
  font-size: 15px;
  margin-left: 4px;
`;

import { LargeElevation } from '@assets/styles/elevations';
import { xmscreen } from '@assets/styles/medias';
import { RadiusXLarge } from '@assets/styles/radius';
import { SPACING } from '@assets/styles/theme';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

export const HoverContainer = styled.div`
  display: inline-flex;
  cursor: help;
`;

export const StyledTooltip = styled(ReactTooltip)`
  &&&{
    ${RadiusXLarge};
    ${LargeElevation}
    padding: ${SPACING * 5}px;
    margin-bottom: ${SPACING * 2}px;
    max-width: 382px;

    @media ${xmscreen}{
      max-width: 70vw;
      padding: ${SPACING * 3}px;
      margin-bottom: 0;
    }
  }
`;

import styled, { css } from 'styled-components';
import { Cell, Grid } from 'styled-css-grid';

import { White, Primary, Grey31 } from '@assets/styles/colors';
import { desktopMedium, smscreen } from '@assets/styles/medias';
import { ParagraphSmall } from '@assets/styles/typography';
import { CloseButton } from '../style';

const FontTextJob = styled.span`
  ${ParagraphSmall}
  display: block;
  color: ${Grey31};
  text-align: center;
  margin: 15px 0px;
  align-self: center;
  span {
    color: ${Primary};
  }
`;

export const TitleJobTracked = styled(FontTextJob)`
  @media ${smscreen} {
    width: 202px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &.overflow_hide {
    overflow: hidden;
  }
`;

export const TextJobInfo = styled(FontTextJob)`
  text-align: left;
  p {
    margin-top: 15px;
  }
`;

export const ContainerCardsGrid = styled(Grid)`
  ${Cell} {
    height: auto;
  }
  ${Cell}:first-child {
    border-radius: 0px 0px 0px 15px;
  }
  ${Cell}:last-child {
    border-left: 1px solid #a2a2a2;
    border-radius: 0px 0px 15px 0px;
  }
`;

export const CloseButtomMobile = styled(CloseButton)`
  display: none;
  background: ${White};
  padding: 0;
  user-select: none;
  @media ${desktopMedium} {
    display: block;
  }
  :hover {
    background: ${White};
  }
`;

export const ShowDesktopMedium = styled.div`
  display: none;

  @media ${desktopMedium} {
    display: block;
  }
`;

export const HideDesktopMedium = styled.div`
  display: block;

  @media ${desktopMedium} {
    display: none;
  }
`;

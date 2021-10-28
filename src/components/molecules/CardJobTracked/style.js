import {
  Grey61,
  MediumGrey,
  PrimaryDark,
  White,
  Primary,
} from '@assets/styles/colors';
import { desktopMedium, smscreen } from '@assets/styles/medias';
import { ParagraphSmall } from '@assets/styles/typography';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';

export const CardTrackedJob = styled(Cell)`
  background-color: #f3f2f4;
  text-align: center;
  display: flex;
  flex: 1;
  padding: 20px 10px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    background-color: #f3f2f4;
    border: 1px solid ${MediumGrey};
    border-radius: 15px;
    color: ${MediumGrey};
    text-align: center;
    width: 140px;
    span {
      font-family: 'Lato';
      font-size: 14px;
    }
    span:last-child {
      font-size: 24px;
    }
  }

  &:hover {
    background-color: ${White};
    p {
      color: #000;
    }
    div > p,
    path {
      color: ${Primary};
      stroke: ${Primary};
    }
    button {
      background-color: #fff;
      border: 1px solid ${Primary};
      color: ${Primary};
      &:hover {
        color: #fff;
        background-color: ${PrimaryDark};
      }
    }
  }

  @media ${smscreen} {
    width: 158px;
    height: 230px;
    cursor: pointer;
  }
`;

export const TextTrackedJob = styled.p`
  ${ParagraphSmall}
  color: ${MediumGrey};
`;

export const TitleCardJobTracked = styled(TextTrackedJob)`
  margin-bottom: 7px;
  @media ${smscreen} {
    color: ${Grey61};
    margin-bottom: 0;
    line-height: 21.28px;
  }
`;

export const SubTitleCardJobTracked = styled(TextTrackedJob)`
  margin-left: 10px;
  @media ${smscreen} {
    margin-left: 0;
    width: 118px;
    line-height: 21.28px;
  }
`;

export const ContentCardJobTracked = styled(TextTrackedJob)`
  margin: 20px 0px;
  width: 210px;
  @media ${smscreen} {
    font-weight: 300;
    font-size: 12px;
    color: ${Grey61};
    width: 124px;
    margin: 10px 0px;
    line-height: 18.24px;
  }
`;

export const ContainerSubTitleJob = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 16px;
    height: 16px;
  }
  @media ${smscreen} {
    display: initial;
    p,
    path {
      color: ${Primary};
      stroke: ${Primary};
    }
    svg {
      width: 11px;
      height: 11px;
    }
  }
`;

export const ButtonCreateMobile = styled.span`
  display: none;

  font-family: Lato;
  font-weight: 300;
  font-size: 10px;
  line-height: 17px;
  cursor: pointer;
  color: ${MediumGrey};
  @media ${smscreen} {
    display: block;
  }
`;

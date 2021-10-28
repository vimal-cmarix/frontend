import styled from 'styled-components';
import { MediumElevation } from '@assets/styles/elevations';
import { cdn } from '@utils/general';
import { ParagraphSmall, LabelXXXSmall } from '@assets/styles/typography';
import { Grey61, MediumGrey, Primary } from '@assets/styles/colors';
import { smscreen } from '@assets/styles/medias';

export const Container = styled.div`
  ${MediumElevation}
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  border-radius: 5px;
  width: 250px;
  height: 200px;
  margin: 20px 0px;
  padding: 8px 16px;
  cursor: pointer;

  &.noteCardBody {
    width: 250px;
    @media ${smscreen} {
      width: 100%;
    }
  }
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  &.overflow_hide {
    overflow: hidden;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  span:last-child {
    color: ${MediumGrey};
  }
`;

export const Handle = styled.span`
  display: block;
  user-select: none;
  height: 15px;

  circle {
      fill: ${Primary};
  }

  > div {
    cursor: grab;
    display: block;
    width: 9px;
    height: 15px;
    background-image: url('${cdn('/static/img/drag.svg')}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

  }
`;

export const TextNote = styled.span`
  ${ParagraphSmall}

  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 11.4em;
  word-wrap: break-word;

  color: ${Grey61};
`;

export const TextData = styled.span`
  ${LabelXXXSmall}
  font-weight: 300;
  color: ${MediumGrey};
`;

export const ButtonDelete = styled.button`
  padding: 0;
  outline: none;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  margin: 0px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

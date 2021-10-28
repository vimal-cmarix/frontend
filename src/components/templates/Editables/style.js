import styled, { css } from 'styled-components';
import {
  Primary,
  Grey100,
  Black,
  White,
  BlueHover,
  Grey200,
  Grey400,
} from '@assets/styles/colors';
import { LabelSmall } from '@assets/styles/typography';
import { RadiusCircle, RadiusSmall, RadiusXSmall } from '@assets/styles/radius';
import { smscreen } from '@assets/styles/medias';

export const EditIconWrapper = styled.div`
  padding: 0px 0px 5px 5px;
  margin-left: 8px;
  color: ${Grey200};
  cursor: pointer;
  transition: all 0.3s;

  @media ${smscreen} {
    color: ${Primary};
  }
`;

export const TextHelp = styled.div`
  ${LabelSmall}
  color: ${Grey400};
`;

export const SummaryCardWrapper = styled.div`
  position: relative;

  &:after {
    pointer-events: none;
    opacity: 0;
    content: '';
    background: ${BlueHover};
    position: absolute;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -12px;
    ${RadiusXSmall}
    transition: all .3s;
  }

  &:hover {
    &:after {
      opacity: 1;
    }

    ${EditIconWrapper} {
      color: ${Primary};
    }
  }
`;

export const EditArea = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
`;

export const AddButton = styled.span`
  ${LabelSmall}
  color: ${Primary};
  display: block;
  position: absolute;
  padding: 0px 0px 5px 5px;
  top: 0;
  right: 0;
  cursor: pointer;

  @media ${smscreen} {
    top: 12px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const DropAreaContainer = styled.button`
  ${RadiusSmall}
  width: 100%;
  height: 80px;
  border: 2px dashed ${Grey100};
  font-size: 24px;
  color: ${Primary};
  cursor: pointer;
  outline: 0;
  display: flex;
  justify-content: center;
`;

export const DocumentWrapper = styled.div`
  ${RadiusSmall}
  border: solid 1px ${Grey100};
  height: ${props => (props.heightAuto ? 'auto' : '80px')};
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  justify-content: ${props => (props.loading ? 'center' : 'flex-start')};
  background: ${White};

  ${props =>
    props.heightAuto &&
    css`
      height: 500px;
      min-height: 120px;
      overflow: hidden;
      > div {
        height: 100%;
      }
      img {
        object-fit: cover;
        object-position: top center;
      }
    `}

  ${props =>
    props.overlay &&
    css`
      position: relative;
      cursor: initial;

      &:after {
        content: '';
        ${RadiusSmall}
        position: relative;
        background-color: rgba(0, 0, 0, 0.25);
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
      }
    `}
`;

export const DocumentIcon = styled.div`
  background: ${Grey100};
  min-width: 48px;
  height: 48px;
  ${RadiusCircle}
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Primary};
  font-size: 24px;
  margin-right: 16px;
`;

export const DocumentName = styled.div`
  ${LabelSmall}
  color: ${Black};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

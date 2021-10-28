import styled from 'styled-components';
import { LabelSmall, ParagraphSmall } from '@assets/styles/typography';
import { Black, Grey100 } from '@assets/styles/colors';
import { RadiusXSmall } from '@assets/styles/radius';

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: ${props => (props.hasBorder ? '16px' : '0')};
  border-bottom-width: 1px;
  border-bottom-style: ${props => (props.hasBorder ? 'solid' : 'none')};
  border-bottom-color: ${Grey100};
  margin-bottom: ${props => (props.last ? '0px' : '24px')};
  padding-right: 50px;
  word-break: break-word;
  box-sizing: border-box;
`;

export const ColImage = styled.div`
  width: 40px;
  margin-right: 16px;
`;

export const ColText = styled.div`
  min-width: 234px;
`;

export const ImageWrapper = styled.div`
  ${RadiusXSmall}
  width: 40px;
  height: 40px;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const Title = styled.h5`
  ${LabelSmall}
  color: ${Black};
  margin-bottom: 2px;
`;

export const Desc = styled.p`
  ${ParagraphSmall}
  margin-bottom: 2px;
`;

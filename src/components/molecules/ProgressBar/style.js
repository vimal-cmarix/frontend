import styled from 'styled-components';
import { GreyCF, ExtraLightGrey, Purple } from '@assets/styles/colors';
import { ParagraphSmall } from '@assets/styles/typography';

const getTranslateX = ({ percent }) => {
  let translate = '0%';
  if (percent > 5 && percent < 94) translate = '-50%';
  else if (percent >= 94) translate = '-100%';
  return `translateX(${translate})`;
};

export const Container = styled.div`
  display: flex;
  align-items: center;

  background: ${ExtraLightGrey};
  height: 69px;
`;

export const WrapperProgress = styled.div`
  flex: 1;
  height: 4px;
  border-radius: 4px;
  background: ${GreyCF};
  margin: 0 1.5rem;
  position: relative;
`;

export const Bar = styled.div`
  height: 4px;
  border-radius: 4px;
  background: ${Purple};
  width: ${({ percent }) => percent}%;
  transition: width 0.5s;
`;

export const TextValue = styled.span`
  ${ParagraphSmall}
  color: ${Purple};
  position: absolute;
  top: 12px;
  left: ${({ percent }) => percent}%;
  transform: ${getTranslateX};
  transition: left 0.5s, transform 0.5s;
  white-space: nowrap;
`;

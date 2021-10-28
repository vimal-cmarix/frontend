import styled from 'styled-components';
import { ParagraphSmall, ParagraphMedium } from '@assets/styles/typography';
import { Primary } from '@assets/styles/colors';

const styles = {
  small: ParagraphSmall,
  meddium: ParagraphMedium,
};

export const Container = styled.ul`
  list-style: none;
  ${props => styles[props.size]}
  padding-left: 1em;
`;

export const Item = styled.li`
  padding-bottom: 0.2em;

  &:before {
    content: '\\2022';
    font-size: 1.4em;
    color: ${Primary};
    font-weight: bold;
    display: inline-block;
    width: 0.8em;
    vertical-align: bottom;
    margin-left: -0.8em;
  }
`;

import styled from 'styled-components';
import { Primary } from '@assets/styles/colors';
import { LabelSmall } from '@assets/styles/typography';
import { smscreen } from '@assets/styles/medias';

// eslint-disable-next-line import/prefer-default-export
export const AlertBarContainer = styled.div(
  p => `
  ${LabelSmall}
  width: 100%;
  height: 40px;
  background-color: #aeacef;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  position: fixed;
  top: 80px;
  z-index: 9;
  transform: ${p.enabled ? 'translateY(0)' : 'translateY(-40px)'};
  transition: transform 500ms;
  
  @media ${smscreen} {
    top: 48px;
    height: 60px;
    transform: ${p.enabled ? 'translateY(0)' : 'translateY(-60px)'};
  }
`,
);

export const AlertBarMargin = styled.div(
  p => `
  width: 100%;
  height: ${p.enabled ? '60px' : '0'};
  transition: height 500ms;
`,
);

export const AlertBarText = styled.span`
  color: white;
`;

export const AlertBarButton = styled.button`
  ${LabelSmall}
  background: none;
  border: none;
  width: auto;
  color: ${Primary};
  text-decoration: underline;
  margin: 0 0 0 10px;
  padding: 0;
  cursor: pointer;
  &:active {
    border: none;
    outline: none;
  }
  &:focus {
    border: none;
    outline: none;
  }
  &:click {
    border: none;
    outline: none;
  }
  &:visited {
    border: none;
    outline: none;
  }
`;

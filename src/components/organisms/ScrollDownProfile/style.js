import styled from 'styled-components';
import { smscreen, laptop } from '@assets/styles/medias';

export const BannerWrapper = styled.div`
  position: sticky;
  top: 72px;
  z-index: 10;
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 160px 12px 0;

  @media ${laptop} {
    padding: 12px 30px 12px 30px;
  }

  @media ${smscreen} {
    display: none;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;

import styled from 'styled-components';

export const ButtonsWrapper = styled.div`
  height: 47px;
  width: 184px;
  display: flex;
  justify-content: center;
  align-items: center;
  .at-share-btn-elements {
    display: ${props => (props.layout === 'row' ? 'inline-flex' : 'block')};
    justify-content: center;
    align-items: center;
    background: white;
    > a {
      outline: none !important;
    }
  }
`;

export const Container = styled.div`
  display: block;
`;

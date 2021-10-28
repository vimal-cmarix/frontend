import styled from 'styled-components';

export const Container = styled.div`
  display: ${props => (props.readOnly ? 'none' : 'block')};
`;

export default Container;

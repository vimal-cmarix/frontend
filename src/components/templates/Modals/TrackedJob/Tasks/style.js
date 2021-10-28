import { smscreen } from '@assets/styles/medias';
import { Button } from '@components/molecules/Button';
import styled from 'styled-components';

export const CreateTask = styled.div`
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  margin: 40px 3rem;
  justify-content: space-between;
  box-sizing: border-box;

  @media ${smscreen} {
    flex-direction: column;
    align-items: center;
    margin: 24px 16px;
  }
`;

export const ButtonAddTask = styled(Button)`
  font-weight: normal;
  border-radius: 10px;
  font-size: 14px;
  width: 167px;
  height: 40px;
  align-self: flex-end;
  margin-bottom: 24px;
`;

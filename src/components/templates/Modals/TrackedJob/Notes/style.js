import { MediumGrey, White } from '@assets/styles/colors';
import { MediumElevation } from '@assets/styles/elevations';
import { smscreen } from '@assets/styles/medias';
import { RadiusXSmall } from '@assets/styles/radius';
import { Button } from '@components/molecules/Button';
import styled from 'styled-components';

export const ContainerNotes = styled.div`
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  flex-direction: column;
  margin: 40px 48px;
  box-sizing: border-box;

  @media ${smscreen} {
    margin: 24px 16px;
  }
  .icon-delete_outline {
    color: ${MediumGrey};
  }
`;

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-items: center;


.ghost {
  ${MediumElevation}
  ${RadiusXSmall}
  background: ${White};
  border: none;
}

li:first-child {
  border: none;
}
  @media ${smscreen} {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

export const ButtonAddNote = styled(Button)`
  font-weight: normal;
  border-radius: 10px;
  font-size: 14px;
  width: 167px;
  height: 40px;
  align-self: flex-end;
`;

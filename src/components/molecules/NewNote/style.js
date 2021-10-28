import { MediumGrey } from '@assets/styles/colors';
import { MediumElevation } from '@assets/styles/elevations';
import { smscreen } from '@assets/styles/medias';
import { RadiusSmall } from '@assets/styles/radius';
import { ShowMobile } from '@components/templates/Modals/style';
import { Form } from '@unform/web';
import styled from 'styled-components';
import Btn from '../Btn';

export const FormNewNote = styled(Form)`
  ${MediumElevation}
  ${RadiusSmall}
  padding: 8px 23px 8px 8px;
  textarea {
    border: 0px;
  }
  .icon-delete_outline {
    color: ${MediumGrey};
  }

  @media ${smscreen} {
    width: 83vw;
  }
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 0px 15px 11px;
  align-items: center;
  margin-top: 23px;

  @media ${smscreen} {
    align-items: flex-end;
  }
  &.addNoteFooter {
    button {
      margin-top: 0;
    }
  }
`;

export const FooterLeft = styled.div`
  margin-top: 45px;
  .icon-delete_outline {
    margin-top: 8px;
  }
  .button_cancel {
    margin-top: 18px;
    width: 114px;
  }
`;

export const FooterRight = styled.div`
  .icon-delete_outline {
    margin-top: 8px;
  }
  .button_cancel {
    margin-top: 80px;
    width: 114px;
    margin-left: 300px;
  }
`;

export const HeaderMobile = styled(ShowMobile)`
  position: absolute;
  right: 10px;
  padding-top: 10px;
`;

export const ButtonSave = styled(Btn)`
  margin-top: 80px;
  width: 114px;
`;

export const ButtonDel = styled(Btn)`
  margin-top: 10px;
  width: 114px;
`;

export const TextAreaWrapper = styled.div`
  textarea {
    max-height: 400px;
  }
  span {
    margin-left: 11px;
  }
`;

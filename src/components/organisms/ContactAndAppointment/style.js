import styled, { css } from 'styled-components';
import { Black, MediumGrey, Grey61 } from '@assets/styles/colors';
import TextInput from '@components/molecules/TextInput';
import FormBlock from '../FormBlock';

export const ContactAndAppointmentFormWrapper = styled.div`
  padding: 0 66px;
  top: 23px;
`;

export const ContactAndAppointmentFormSection = styled.div`
	${props =>
    props.isRequestAnInterview &&
    css`
      display: none;
    `}
    padding: ${props => (props.noTop ? 0 : '32px')} 0 32px 0;
    border-bottom: ${props => (props.noBorder ? 0 : `1px ${MediumGrey} solid`)};
`;

export const ContactAndAppointmentFormSectionTitle = styled.h2`
  font-size: 18px;
  color: ${Black};
  line-height: 150%;
  font-weight: 400;
`;

export const ContactAndAppointmentFormSectionBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  margin-top: 16px;
`;

export const ContactAndAppointmentFormTextInput = styled(TextInput)`
  border: 1px ${Grey61} solid;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  color: ${Grey61};
  border-radius: 10px;
  padding: ${props => (props.rows ? 0 : '8px 16px')};
  height: ${props => (props.rows ? 'auto' : '40px')};

  span {
    font-weight: 400;
  }

  textarea {
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    color: ${Grey61};
    margin: 0;
  }
`;

export const FormActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContactAndAppointmentFormBlock = styled(FormBlock)``;

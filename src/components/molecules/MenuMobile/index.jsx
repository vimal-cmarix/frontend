import React, { useContext, useState } from 'react';
import IconSVG from '@components/atoms/IconSVG';
import AppContext from '@context/appContext';
import Btn from '@components/molecules/Btn';
import ContactAndAppointmentModal from '@components/organisms/ContactAndAppointment';
import { ButtonsWrapper } from './style';

export default function MenuMobile() {
  const { dispatch } = useContext(AppContext);
  const [isShowing, setIsShowing] = useState(false);

  const handleOpenModalSendAMessage = () => {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: () => <ContactAndAppointmentModal option="send-a-message" />,
    });
  };

  const handleOpenModalRequestAnInterview = () => {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <ContactAndAppointmentModal option="request-interview" />
      ),
    });
  };

  return (
    <>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          overflow: 'auto',
        }}
      >
        <button
          type="button"
          onClick={() => setIsShowing(!isShowing)}
          style={{
            backgroundColor: 'transparent',
            border: 0,
            position: 'absolute',
            right: '20px',
          }}
        >
          <IconSVG
            name={isShowing ? 'close' : 'menu'}
            size={isShowing ? 48 : 32}
          />
        </button>
      </div>
      <ButtonsWrapper isShowing={isShowing}>
        <Btn
          startIcon="mail"
          label="Send a message"
          type="button"
          size="md"
          handleClick={handleOpenModalSendAMessage}
          variant="outlinePrimary"
          rounded="lg"
          style={{ marginBottom: '39px', padding: '12px 24px 12px 24px' }}
        />
        <Btn
          startIcon="calendar"
          label="Request an interview"
          type="button"
          size="md"
          handleClick={handleOpenModalRequestAnInterview}
          variant="outlineLight"
          rounded="lg"
          style={{ padding: '12px 24px 12px 24px' }}
        />
      </ButtonsWrapper>
    </>
  );
}

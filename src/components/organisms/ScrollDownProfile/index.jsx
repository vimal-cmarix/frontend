import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import ContactAndAppointmentModal from '@components/organisms/ContactAndAppointment';
import Btn from '@components/molecules/Btn';
import { BannerWrapper, ButtonsWrapper } from './style';

export default function ScrollDownProfile({ isShowing, type }) {
  const { state: profile } = useContext(ProfileContext);
  const { dispatch } = useContext(AppContext);

  const handleOpenModalSendAMessage = () => {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <ContactAndAppointmentModal option="send-a-message" type={type} />
      ),
    });
  };

  const handleOpenModalRequestAnInterview = () => {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <ContactAndAppointmentModal option="request-interview" type={type} />
      ),
    });
  };

  return (
    <BannerWrapper isShowing={isShowing}>
      <ButtonsWrapper>
        <Btn
          startIcon="mail"
          label="Send a Message"
          type="button"
          size="md"
          handleClick={handleOpenModalSendAMessage}
          variant="outlinePrimary"
          rounded="lg"
          style={{ marginRight: '30px', padding: '12px 24px 12px 24px' }}
        />
        <Btn
          startIcon="calendar"
          label="Request an Interview"
          type="button"
          size="md"
          handleClick={handleOpenModalRequestAnInterview}
          variant="outlineLight"
          rounded="lg"
          style={{ padding: '12px 24px 12px 24px' }}
        />
      </ButtonsWrapper>
    </BannerWrapper>
  );
}

ScrollDownProfile.propTypes = {
  isShowing: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

ScrollDownProfile.defaultProps = {
  isShowing: true,
};

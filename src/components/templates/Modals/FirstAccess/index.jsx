import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import Btn from '@components/molecules/Btn';
import { Container, Title, Content, BannerImage, Left } from './style';
import ModalBody from '../ModalBody';

/**
 *  first access Modal
 */
const FirstAccess = ({ content }) => {
  const { state: profileState } = useContext(ProfileContext);
  const { dispatch: appDispatch } = useContext(AppContext);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  return (
    <ModalBody
      isMobileFull
      isUnPadding
      fitContent
      isCancelBackClick
      onCancel={closeModal}
    >
      <Container>
        <Left>
          <Title>
            Hey{' '}
            {profileState.personalInfo
              ? profileState.personalInfo.firstName
              : '[First name]'}
            !
          </Title>
          <Content dangerouslySetInnerHTML={{ __html: content }} />
          <Btn
            label="Get started"
            variant="outlineSecondary"
            rounded="md"
            handleClick={closeModal}
          />
        </Left>
        <BannerImage />
      </Container>
    </ModalBody>
  );
};

FirstAccess.propTypes = {
  content: PropTypes.string,
};

FirstAccess.defaultProps = {
  content: '',
};

export default FirstAccess;

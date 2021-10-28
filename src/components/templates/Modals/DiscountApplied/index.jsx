import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import AppContext from '@context/appContext';

import { Container, Content, Title, BtnConfirm } from './style';

import ModalBody from '../ModalBody';

const DiscountApplied = ({ onConfirm, confirmText, title }) => {
  const { dispatch: appDispatch } = useContext(AppContext);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  return (
    <ModalBody
      isMobileFull={false}
      isUnPadding
      fitContent
      onCancel={closeModal}
      rounded="xlg"
    >
      <Container>
        <Content>
          <Title display="block" align="center" size="headline1">
            {title}
          </Title>
          <BtnConfirm
            handleClick={onConfirm}
            label={confirmText}
            variant="outlineSecondary"
          />
        </Content>
      </Container>
    </ModalBody>
  );
};

DiscountApplied.propTypes = {
  title: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DiscountApplied;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import Icon from '@components/atoms/Icon';

import { DefaultModalContent, Title, Body, CloseButton } from './style';

/**
 * Preview PDF Modal
 */
const PreviewPDF = ({ path, title, fullScreen }) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  const styleBody = {
    height: fullScreen ? '100%' : '70vh',
  };

  return (
    <DefaultModalContent
      isOpened={appState.modal.isOpened}
      fullScreen={fullScreen}
    >
      {!fullScreen && <Title>{title}</Title>}
      <CloseButton onClick={closeModal} fullScreen={fullScreen}>
        <Icon name="close" />
      </CloseButton>
      <Body style={styleBody}>
        <iframe
          width="100%"
          height="100%"
          title={title}
          src={path}
          frameBorder="0"
        />
      </Body>
    </DefaultModalContent>
  );
};

PreviewPDF.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  fullScreen: PropTypes.bool,
};

PreviewPDF.defaultProps = {
  path: '',
  title: '',
  fullScreen: false,
};

export default PreviewPDF;

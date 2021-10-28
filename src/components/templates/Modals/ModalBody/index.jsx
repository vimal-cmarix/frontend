import React, { useCallback, useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import useMedia from '@hooks/useMedia';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';
import AppContext from '@context/appContext';
import { sizes as breakpoint } from '@assets/styles/medias';

import {
  Container,
  ModalHeader,
  CloseButton,
  ModalContent,
  Title,
} from './styles';

import { InternalModal, InternalModalOverlay } from '../style';

const ModalBody = ({
  className,
  headerTitle,
  onCancel,
  children,
  elementID,
  isLarge,
  isUnPadding,
  fitContent,
  internalModal,
  showInternalModal,
  onCancelInternalModal,
  selectContentModal,
  contentUnGutterBottom,
  isMobileFull,
  rounded,
  hFull,
}) => {
  const { state: appState } = useContext(AppContext);

  const handleCancelInternalModal = useCallback(
    event => {
      if (onCancelInternalModal) onCancelInternalModal(event);
    },
    [onCancel],
  );

  const handleOnCancel = useCallback(() => {
    if (onCancel) onCancel();
  }, [onCancel]);

  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  return (
    <Container
      onClick={e => e.stopPropagation()}
      className={className}
      fitContent={fitContent}
      isOpened={appState.modal.isOpened}
      selectContentModal={selectContentModal}
      isMobileFull={isMobileFull}
      rounded={rounded}
      hFull={hFull}
    >
      <InternalModal className={className} show={showInternalModal}>
        <InternalModalOverlay onClick={handleCancelInternalModal} />
        {internalModal}
      </InternalModal>

      {headerTitle && (
        <ModalHeader>
          <Title>{headerTitle}</Title>
          <CloseButton type="button" onClick={handleOnCancel}>
            <IconSVG
              color="#fff"
              name={isMobile ? 'leftArrow' : 'close'}
              size={isMobile ? 17 : 36}
            />
          </CloseButton>
        </ModalHeader>
      )}

      <Scrollbars
        id={elementID}
        autoHeight
        autoHeightMax="calc(100vh - 64px)"
        className="scroll-bar__container"
        hideTracksWhenNotNeeded
      >
        <ModalContent
          isUnPadding={isUnPadding}
          isLarge={isLarge}
          hasHeaderTitle={!!headerTitle}
          unGutterBottom={contentUnGutterBottom}
        >
          {children}
        </ModalContent>
      </Scrollbars>
    </Container>
  );
};

ModalBody.propTypes = {
  headerTitle: PropTypes.string,
  className: PropTypes.string,
  elementID: PropTypes.string,
  onCancel: PropTypes.func,
  onCancelInternalModal: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.elementType),
  ]).isRequired,
  isLarge: PropTypes.bool,
  isUnPadding: PropTypes.bool,
  fitContent: PropTypes.bool,
  internalModal: PropTypes.element,
  showInternalModal: PropTypes.bool,
  selectContentModal: PropTypes.bool,
  contentUnGutterBottom: PropTypes.bool,
  isMobileFull: PropTypes.bool,
  rounded: PropTypes.oneOf(['sm', 'md', 'lg', 'xlg']),
  hFull: PropTypes.bool,
};

ModalBody.defaultProps = {
  onCancel: () => {},
  onCancelInternalModal: () => {},
  isLarge: false,
  elementID: '',
  className: '',
  isUnPadding: false,
  fitContent: false,
  headerTitle: '',
  internalModal: null,
  showInternalModal: false,
  selectContentModal: false,
  contentUnGutterBottom: false,
  isMobileFull: true,
  rounded: 'md',
  hFull: false,
};

export default ModalBody;

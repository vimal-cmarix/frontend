import React from 'react';
import PropTypes from 'prop-types';

import Btn from '@components/molecules/Btn';

import IconSVG from '@components/atoms/IconSVG';
import useMedia from '@src/hooks/useMedia';
import { sizes } from '@assets/styles/medias';
import {
  Container,
  ActionHeader,
  ActionTitle,
  ActionDescription,
  ActionButtonsWrapper,
  ActionWarningText,
} from './style';
import ModalBody from '../ModalBody';

/**
 *  Dialog Modal
 */
const Dialog = ({
  icon,
  title,
  description,
  warnDescription,
  onConfirm,
  onCancel,
  labelCancel,
  labelConfirm,
  width,
}) => {
  const isMobile = useMedia(`(max-width: ${sizes.tablet})`);

  return (
    <ModalBody
      isMobileFull={false}
      isUnPadding
      fitContent
      isCancelBackClick
      onCancel={onCancel}
      rounded={isMobile ? 'sm' : 'xlg'}
    >
      <Container width={width}>
        <ActionHeader>
          {icon.name && (
            <IconSVG name={icon.name} size={24} color={icon.color} />
          )}
          <ActionTitle>{title}</ActionTitle>
        </ActionHeader>

        <ActionDescription dangerouslySetInnerHTML={{ __html: description }} />

        <ActionButtonsWrapper>
          <Btn
            handleClick={onCancel}
            variant="outlineSecondary"
            label={labelCancel || 'Cancel'}
          />
          <Btn
            handleClick={onConfirm}
            variant="outlinePrimary"
            label={labelConfirm || 'Yes'}
          />
        </ActionButtonsWrapper>

        {warnDescription && (
          <ActionWarningText
            dangerouslySetInnerHTML={{ __html: warnDescription }}
          />
        )}
      </Container>
    </ModalBody>
  );
};

Dialog.propTypes = {
  icon: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  title: PropTypes.string,
  description: PropTypes.string,
  warnDescription: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  labelCancel: PropTypes.string,
  labelConfirm: PropTypes.string,
  width: PropTypes.string,
};

Dialog.defaultProps = {
  icon: {},
  title: '',
  description: '',
  labelCancel: '',
  labelConfirm: '',
  warnDescription: '',
  onCancel: undefined,
  width: '506px',
};

export default Dialog;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '@components/atoms/Loader';

import IconSVG from '@components/atoms/IconSVG';
import Btn from '../Btn';

import {
  ActionWrapper,
  ActionContent,
  ActionButtonsWrapper,
  ActionTitle,
  ActionDescription,
  ActionHeader,
  ActionWarningText,
  ActionLoader,
  LoadingWrapper,
  Layer,
} from './styles';

const DeleteDialog = ({
  title,
  description,
  onConfirm,
  onCancel,
  warnDescription,
  isLoading,
  isCentered,
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  return (
    <>
      {isCentered && <Layer />}
      <ActionWrapper className="dialog-delete" isCentered={isCentered}>
        <ActionContent isAnimated={isAnimated}>
          <LoadingWrapper isLoading={isLoading}>
            <ActionHeader>
              <ActionTitle>{title}</ActionTitle>
              <IconSVG name="trash" size={24} color="#D32C63" />
            </ActionHeader>

            <ActionDescription>{description}</ActionDescription>

            <ActionButtonsWrapper>
              <Btn
                handleClick={onCancel}
                variant="outlineSecondary"
                label="Cancel"
              />
              <Btn handleClick={onConfirm} variant="danger" label="Yes" />
            </ActionButtonsWrapper>

            {warnDescription && (
              <ActionWarningText>{warnDescription}</ActionWarningText>
            )}
          </LoadingWrapper>
        </ActionContent>

        {isLoading && (
          <ActionLoader>
            <Loader size="large" />
          </ActionLoader>
        )}
      </ActionWrapper>
    </>
  );
};

DeleteDialog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  warnDescription: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isLoading: PropTypes.bool,
  isCentered: PropTypes.bool,
};

DeleteDialog.defaultProps = {
  title: '',
  description: '',
  warnDescription: '',
  onCancel: undefined,
  isLoading: false,
  isCentered: false,
};

export default DeleteDialog;

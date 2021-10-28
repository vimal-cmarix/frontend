import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/atoms/Icon';
import Loader from '@components/atoms/Loader';

import { Typography } from '@assets/styles/typo';
import { SPACING } from '@assets/styles/theme';
import {
  ActionWrapper,
  ActionContent,
  ActionTextWrapper,
  ActionButtonsWrapper,
  ActionIcon,
  ActionLoading,
  ActionLoader,
} from './style';
import Btn from '../Btn';

const Action = ({
  title,
  description,
  onConfirm,
  onCancel,
  type,
  loading,
  hideCancel,
  labelConfirm,
  labelCancel,
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  return (
    <ActionWrapper>
      <ActionContent isAnimated={isAnimated}>
        <ActionLoading loading={loading ? 1 : 0}>
          <ActionTextWrapper>
            <Typography
              className="editModalTitle"
              size="headline1"
              color="grey31"
              fontWeight={900}
            >
              {title}
              {type !== 'none' && type !== 'loading' ? (
                <ActionIcon type={type} style={{ marginLeft: SPACING * 4 }}>
                  <Icon className="action__icon" name={type} />
                </ActionIcon>
              ) : (
                ''
              )}
            </Typography>
            <Typography
              size="body1"
              color="grey31"
              display="block"
              align="center"
              style={{ marginTop: SPACING * 5, maxWidth: 290 }}
            >
              {description}
            </Typography>
            <ActionButtonsWrapper autoWidth={labelConfirm}>
              {!hideCancel && (
                <Btn
                  label={labelCancel || 'Cancel'}
                  variant="outlineSecondary"
                  type="button"
                  handleClick={onCancel}
                />
              )}
              <Btn
                label={labelConfirm || 'Ok'}
                variant="danger"
                type="button"
                handleClick={onConfirm}
              />
            </ActionButtonsWrapper>
          </ActionTextWrapper>
        </ActionLoading>
        {loading && (
          <ActionLoader>
            <Loader size="large" />
          </ActionLoader>
        )}
      </ActionContent>
    </ActionWrapper>
  );
};

Action.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  type: PropTypes.oneOf([
    'error',
    'success',
    'warning',
    'information',
    'none',
    'loading',
  ]),
  loading: PropTypes.bool,
  hideCancel: PropTypes.bool,
  labelConfirm: PropTypes.string,
  labelCancel: PropTypes.string,
};

Action.defaultProps = {
  type: 'error',
  title: '',
  description: '',
  onCancel: undefined,
  loading: false,
  hideCancel: false,
  labelConfirm: '',
  labelCancel: '',
};

export default Action;

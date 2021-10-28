import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/atoms/Icon';
import Loader from '@components/atoms/Loader';
import { StyledToast, StyledToastText } from './style';

const Toast = ({ children, type, remove }) => {
  const removeRef = useRef();
  removeRef.current = remove;
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const duration = process.env.TIMEOUT_NOTIFICATION;
    const id = setTimeout(() => removeRef.current(), duration);
    setTimeout(() => setIsAnimated(false), duration - 100);
    setTimeout(() => setIsAnimated(true), duration / 100);

    return () => {
      clearTimeout(id);
      setIsAnimated(false);
    };
  }, []);

  return (
    <StyledToast onClick={remove} isAnimated={isAnimated} type={type}>
      {type !== 'none' && type !== 'loading' ? <Icon name={type} /> : ''}
      {type === 'loading' ? <Loader size="small" /> : ''}
      <StyledToastText type={type}>{children}</StyledToastText>
    </StyledToast>
  );
};

Toast.propTypes = {
  children: PropTypes.node.isRequired,
  remove: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'error',
    'success',
    'warning',
    'information',
    'none',
    'loading',
  ]),
};

Toast.defaultProps = {
  type: 'error',
};

export default Toast;

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from '@components/atoms/Loader';
import { useToast } from '@components/molecules/Notification';

const Callback = () => {
  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const router = useRouter();

  function getParams() {
    const params = new URLSearchParams(window.location.search);
    showError(params.get('error_description'));
    return router.push('/');
  }

  useEffect(() => {
    getParams();
  }, []);

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
  };

  return (
    <div style={containerStyle}>
      <Loader theme="dark" size="xlarge" />
    </div>
  );
};

export default Callback;

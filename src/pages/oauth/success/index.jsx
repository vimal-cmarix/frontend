import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { login } from '@utils/auth';
import Loader from '@components/atoms/Loader';

const Index = () => {
  const router = useRouter();

  async function getParams() {
    const params = {};
    const { href } = window.location;
    const { search } = new URL(href);

    if (search?.length) {
      search
        .replace('?', '')
        .split('&')
        .map(item => {
          const [key, value] = item.split('=');
          return (params[key] = value);
        });

      await login(params.access_token, params.profile_id, () =>
        router.push('/'),
      );

      return true;
    }

    return false;
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

export default Index;

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/pricing');
  }, []);

  return <div />;
};

export default Index;

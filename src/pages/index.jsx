import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { withAuthSync } from '@src/utils/auth';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const isCompanyUser = localStorage.getItem('isCompanyUser');
    // console.log('isCompanyUser', isCompanyUser);
    if (isCompanyUser === 'true') {
      router.push('/company/dashboard');
    } else {
      router.push('/profile');
    }
  }, []);
  return <div />;
};

export default withAuthSync(Index);

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { clearCredentials } from '@src/utils/auth';
import Storage from '@utils/storage';

const University = () => {
  const router = useRouter();

  function saveUniversity() {
    const { university } = router.query;

    Storage.add('university', university);
  }

  function redirect() {
    return router.push('/signup');
  }

  useEffect(() => {
    if (router.query.university) {
      clearCredentials();
      saveUniversity();
      redirect();
    }
  }, [router.query.university]);

  return null;
};

export default University;

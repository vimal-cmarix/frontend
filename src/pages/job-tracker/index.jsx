import React, { useEffect } from 'react';
import BoardService from '@api/services/board';

import JobTrackerHomeLayout from '@components/templates/JobTrackerHome';
import { useRouter } from 'next/router';
import { logout } from '@utils/auth';

const JobTracker = () => {
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await BoardService.getBoards();
        if (data.data.length > 0) router.push(`job-tracker/${data.data[0].id}`);
        else logout();
      } catch (error) {
        logout();
      }
    };
    load();
  }, []);

  return (
    <JobTrackerHomeLayout mobileTitle="Application Tracker">
      <div />
    </JobTrackerHomeLayout>
  );
};

export default JobTracker;

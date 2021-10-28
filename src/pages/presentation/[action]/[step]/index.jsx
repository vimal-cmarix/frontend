import React from 'react';
import Router, { useRouter } from 'next/router';

import Step1 from '@components/templates/Presentation/step1';
import Step2 from '@components/templates/Presentation/step2';
import Step3 from '@components/templates/Presentation/step3';
import Step4 from '@components/templates/Presentation/step4';

import { withAuthSync } from '@src/utils/auth';
import { serverRedirect } from '@utils/general';

const Create = () => {
  const router = useRouter();
  const { step, id, action } = router.query;

  switch (step) {
    case 'step-1':
      return <Step1 action={action} presentationId={id} />;

    case 'step-2':
      return <Step2 action={action} presentationId={id} />;

    case 'step-3':
      return <Step3 action={action} presentationId={id} />;

    case 'step-4':
      return <Step4 action={action} presentationId={id} />;

    default:
      return <Step1 />;
  }
};

Create.getInitialProps = async ctx => {
  const { query } = ctx;
  const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
  const actions = ['create', 'edit'];
  const { step, action, id } = query;

  function redirect() {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/presentation');
    } else {
      Router.push('/presentation');
    }
  }

  if (!actions.includes(action)) redirect();
  if (!steps.includes(step)) redirect();
  if (steps.indexOf(step) > 0 && id === undefined) redirect();

  return {};
};

export default withAuthSync(Create, true);

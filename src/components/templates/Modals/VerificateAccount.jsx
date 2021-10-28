import React, { useContext } from 'react';
import AccountVerification from '@components/organisms/AccountVerification';
import AppContext from '@context/appContext';
import { useRouter } from 'next/router';

import { DefaultModalContent } from './style';

/**
 * VerifyAccount Modal
 */
const VerifyAccountModal = () => {
  const { state: appState, dispatch } = useContext(AppContext);
  const router = useRouter();
  function closeModal(refresh) {
    dispatch({ type: 'SET_MODAL_CLOSED' });
    // if (refresh) window.location.reload();
    if (refresh) router.push('/profile');
  }

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened}>
      <AccountVerification
        onSkip={closeModal}
        onSuccess={() => closeModal(true)}
        source="verification-modal"
        modal
      />
    </DefaultModalContent>
  );
};

export default VerifyAccountModal;

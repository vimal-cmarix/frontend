import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import CertificateService from '@api/services/certificate';

import ModalCertificate from '@components/templates/Modals/Certificate';
import SummaryCard from '@components/molecules/SummaryCard';
import Icon from '@components/atoms/Icon';
import { useToast } from '@components/molecules/Notification';
import DeleteDialog from '@components/molecules/DeleteDialog';
import errorHandle from '@src/utils/error';

import { monthYearToString } from '@src/utils/general';

import {
  SummaryCardWrapper,
  EditArea,
  EditIconWrapper,
  AddButton,
  TextHelp,
} from './style';

/**
 * Group Certificates with Actions
 */
const EditableCertificates = () => {
  const { t: modalsT } = useTranslation('modals');
  const { t: monthsT } = useTranslation('months');

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const { certificates, previewMode } = profileState;

  const [certificateToDelete, setCertificateToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastLoading, setToastLoading] = useState(false);

  function addCertificate() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalCertificate,
    });
  }

  function editCertificate(item) {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalCertificate,
      props: { currentData: item },
    });
  }

  function removeCertificateFromState() {
    return profileDispatch({
      type: 'REMOVE_CERTIFICATE',
      certificate: certificateToDelete,
    });
  }

  function deleteCertificateAction(id) {
    setCertificateToDelete(id);
    setShowToast(true);
  }

  async function deleteCertificate() {
    const profileId = profileState.id;
    const certificateId = certificateToDelete;

    const closeAction = () => {
      setShowToast(false);
      setToastLoading(false);
      setCertificateToDelete(null);
    };

    try {
      setToastLoading(true);
      await CertificateService.deleteCertificate(profileId, certificateId);
      removeCertificateFromState();
      closeAction();
      showSuccess(modalsT('certificate.delete_success'));
    } catch (err) {
      showError(errorHandle(err));
      closeAction();
    }
  }

  if (!previewMode && (!certificates || certificates?.length === 0)) {
    return (
      <>
        <TextHelp>
          Got any extracurricular certifications or extended learning you want
          to talk about?
        </TextHelp>
        <AddButton onClick={() => addCertificate()}>+ Add</AddButton>
      </>
    );
  }

  return (
    <>
      {showToast && (
        <DeleteDialog
          type="warning"
          title={modalsT('certificate.deleteV2.title')}
          description={modalsT('certificate.deleteV2.description')}
          warnDescription={modalsT('certificate.deleteV2.warnDescription')}
          onCancel={() => setShowToast(false)}
          onConfirm={deleteCertificate}
          isLoading={toastLoading}
          isCentered
        />
      )}
      {certificates?.length &&
        certificates.map((item, index) => (
          <SummaryCardWrapper key={item.id}>
            <SummaryCard
              title={item.title}
              lines={[item.institution, monthYearToString(item.date, monthsT)]}
              hasBorder={false}
              last={certificates?.length === index + 1}
            />

            {!previewMode && (
              <EditArea>
                <EditIconWrapper
                  onClick={() => deleteCertificateAction(item.id)}
                >
                  <Icon name="delete_outline" />
                </EditIconWrapper>
                <EditIconWrapper onClick={() => editCertificate(item)}>
                  <Icon name="edit_outline" />
                </EditIconWrapper>
              </EditArea>
            )}
          </SummaryCardWrapper>
        ))}

      {!previewMode && (
        <AddButton onClick={() => addCertificate()}>+ Add</AddButton>
      )}
    </>
  );
};

export default EditableCertificates;

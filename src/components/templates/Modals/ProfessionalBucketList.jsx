import React, { useContext, useState, useRef, useMemo } from 'react';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import CultureFitService from '@api/services/cultureFit';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import { useToast } from '@components/molecules/Notification';
import DeleteDialog from '@components/molecules/DeleteDialog';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import Btn from '@components/molecules/Btn';
import errorHandle from '@src/utils/error';
import IconSVG from '@components/atoms/IconSVG';
import ModalBody from './ModalBody';

import { Row, Actions, TrashButton } from './style';

const ProfessionalBucketList = ({
  bucketListData,
  selectedItemIndex,
  cultureFitId,
}) => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: modalT } = useTranslation('modals');

  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const initialData = useMemo(() => {
    return bucketListData[selectedItemIndex];
  }, [bucketListData]);

  const closeModal = () => {
    formRef.current.setErrors({});
    formRef.current.reset();
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
  };

  const saveModal = async data => {
    const profileId = profileState.id;
    const reqBody = {
      name: data.name,
      description: data.description,
    };

    try {
      if (selectedItemIndex === null) {
        await CultureFitService.createProfessionalBucket(
          profileId,
          cultureFitId,
          reqBody,
        );
      } else {
        await CultureFitService.updateProfessionalBucket(
          profileId,
          cultureFitId,
          initialData.id,
          reqBody,
        );
      }
      profileDispatch({
        type: 'SET_PROFESSIONAL_BUCKET_LIST',
        professionalBucketList: reqBody,
      });
      showSuccess(modalT('professional_bucket_list.success'));
      closeModal();
    } catch (err) {
      showToast(errorHandle(err));
      setLoading(false);
    }
  };

  const handleSubmit = async data => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await saveModal(data);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  const handleDelete = async () => {
    const profileId = profileState.id;
    try {
      setLoading(true);

      await CultureFitService.deleteProfessionalBucket(
        profileId,
        cultureFitId,
        initialData.id,
      );
      showSuccess(modalT('professional_bucket_list.success'));
      profileDispatch({ type: 'SET_VOLUNTEER_EXPERIENCE' });
      closeModal();
    } catch (err) {
      showToast(errorHandle(err));
      setLoading(false);
    }
  };

  function handleChange(e) {
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
  }

  return (
    <>
      {showDelete && (
        <DeleteDialog
          type="warning"
          title={modalT('volunteer_experience.delete_title')}
          description={modalT('volunteer_experience.delete_description')}
          warnDescription={modalT('volunteer_experience.delete_warn')}
          onCancel={() => setShowDelete(false)}
          onConfirm={handleDelete}
          isLoading={loading}
          isCentered
        />
      )}
      <ModalBody
        onCancel={closeModal}
        headerTitle="My Professional Bucket List"
      >
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Row style={{ position: 'relative' }}>
            <FormBlock className="reqlabel" label="Name">
              <TextInput
                value={initialData?.name || ''}
                name="name"
                size="medium"
                onChange={handleChange}
              />
            </FormBlock>
            {initialData && (
              <TrashButton onClick={() => setShowDelete(true)}>
                <IconSVG name="trash" size={20} />
              </TrashButton>
            )}
          </Row>

          <Row>
            <FormBlock className="reqlabel" label="Description">
              <TextInput
                value={initialData?.description || ''}
                multiline
                name="description"
                className="volunteerDes"
                size="medium"
                onChange={handleChange}
              />
            </FormBlock>
          </Row>

          <Actions style={{ marginTop: 32 }}>
            <Btn
              label={buttonsT('back')}
              size="md"
              handleClick={closeModal}
              variant="text"
              startIcon="leftArrow"
              iconSize={8}
            />

            <Btn
              label={buttonsT('save')}
              type="submit"
              size="md"
              variant="outlinePrimary"
              loading={loading}
            />
          </Actions>
        </Form>
      </ModalBody>
    </>
  );
};

ProfessionalBucketList.propTypes = {
  bucketListData: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedItemIndex: PropTypes.number,
  cultureFitId: PropTypes.string.isRequired,
};

ProfessionalBucketList.defaultProps = {
  selectedItemIndex: null,
};

export default ProfessionalBucketList;

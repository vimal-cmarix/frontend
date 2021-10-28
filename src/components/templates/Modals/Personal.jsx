import React, { useContext, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import ProfileService from '@api/services/profile';

import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import { Button } from '@components/molecules/Button';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import ModalBody from './ModalBody';

import { Row, Actions, LeftButtonWrapper, RightButtonWrapper } from './style';

/**
 * Personal Modal
 */
const Personal = () => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: modalT } = useTranslation('modals');
  const { t: signupT } = useTranslation('signup');
  const { t: buttonsT } = useTranslation('buttons');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const formRef = useRef(null);

  function closeModal() {
    formRef.current.setErrors({});
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  async function save(data) {
    setLoading(true);

    try {
      const profileId = profileState.id;
      const res = await ProfileService.setPersonal(profileId, data);
      setLoading(false);

      if (res.status === 200) {
        profileDispatch({
          type: 'SET_PERSONAL',
          personalInfo: data,
        });

        closeModal();
        showSuccess(modalT('personal.success'));
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      await save(data);
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
  }

  function fill() {
    if (profileState.personalInfo) {
      setFirstname(profileState.personalInfo.firstName);
      setLastname(profileState.personalInfo.lastName);
    }
  }

  useEffect(() => {
    fill();
  }, [appState.modal.isOpened]);

  return (
    <ModalBody headerTitle={modalT('personal.title')} onCancel={closeModal}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <FormBlock label={signupT('form.label.first_name')}>
            <TextInput
              name="firstName"
              size="medium"
              placeholder={signupT('form.placeholder.first_name')}
              value={firstname}
              key={firstname}
            />
          </FormBlock>
        </Row>
        <Row>
          <FormBlock label={signupT('form.label.last_name')}>
            <TextInput
              name="lastName"
              size="medium"
              placeholder={signupT('form.placeholder.last_name')}
              value={lastname}
              key={lastname}
            />
          </FormBlock>
        </Row>
        <Actions>
          <LeftButtonWrapper>
            <Button
              label={buttonsT('cancel')}
              size="medium"
              colorSchema="secondary"
              handleClick={closeModal}
            />
          </LeftButtonWrapper>

          <RightButtonWrapper>
            <Button
              label={buttonsT('save')}
              type="submit"
              size="medium"
              loading={loading}
            />
          </RightButtonWrapper>
        </Actions>
      </Form>
    </ModalBody>
  );
};

export default Personal;

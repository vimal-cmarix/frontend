import React, { useContext, useState, useRef } from 'react';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import UserService from '@api/services/user';

import AppContext from '@context/appContext';

import FormBlock from '@components/organisms/FormBlock';
import BtnGroup from '@components/organisms/BtnGroup';

import TextInput from '@components/molecules/TextInput';
import { useToast } from '@components/molecules/Notification';
import Btn from '@components/molecules/Btn';

import errorHandle from '@src/utils/error';

import ModalBody from './ModalBody';

import { Row, Actions, FormBlockWrapper } from './style';

/**
 * Change Password Modal
 */
const ChangePasswordModal = () => {
  const { t } = useTranslation('modals');
  const { t: buttonT } = useTranslation('buttons');
  const { t: errorMessage } = useTranslation('errorMessages');

  const { dispatch: appDispatch } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const formRef = useRef(null);

  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  function clearErrors() {
    return formRef.current.setErrors({});
  }

  function resetForm() {
    return formRef.current.reset();
  }

  function closeModal() {
    clearErrors();
    resetForm();
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  async function submit(data) {
    setLoading(true);

    const schema = Yup.object().shape({
      current_password: Yup.string()
        .min(8)
        .required(),
      new_password: Yup.string()
        .min(8)
        .required(),
      confirm_new_password: Yup.string()
        .min(8)
        .oneOf([Yup.ref('new_password'), null])
        .required(),
    });

    try {
      clearErrors();

      await schema.validate(data, {
        abortEarly: false,
      });

      const passwordChanged = await UserService.changePassword(data);

      if (passwordChanged) showSuccess(t('change_password.success'));

      setLoading(false);
      closeModal();
    } catch (e) {
      const validationErrors = {};

      if (e instanceof Yup.ValidationError) {
        e.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });

        formRef.current.setErrors(validationErrors);
      } else {
        showError(errorHandle(e));
      }
      setLoading(false);
    }
  }

  return (
    <ModalBody onCancel={closeModal} headerTitle={t('change_password.title')}>
      <Form onSubmit={submit} ref={formRef}>
        <Row>
          <FormBlockWrapper>
            <FormBlock label={t('change_password.current_password')}>
              <TextInput
                name="current_password"
                placeholder={t('change_password.placeholders.current_password')}
                size="medium"
                type="password"
                autocomplete="current-password"
              />
            </FormBlock>
          </FormBlockWrapper>
        </Row>
        <Row>
          <FormBlockWrapper>
            <FormBlock label={t('change_password.new_password')}>
              <TextInput
                name="new_password"
                size="medium"
                placeholder={t('change_password.placeholders.new_password')}
                type="password"
                autocomplete="new-password"
              />
            </FormBlock>
          </FormBlockWrapper>
        </Row>
        <Row>
          <FormBlockWrapper>
            <FormBlock label={t('change_password.confirm_new_password')}>
              <TextInput
                name="confirm_new_password"
                size="medium"
                placeholder={t(
                  'change_password.placeholders.confirm_new_password',
                )}
                type="password"
                autocomplete="new-password"
              />
            </FormBlock>
          </FormBlockWrapper>
        </Row>
        <Actions>
          <BtnGroup>
            <Btn
              startIcon="leftArrow"
              iconSize={12}
              label={buttonT('back')}
              handleClick={closeModal}
            />
          </BtnGroup>

          <BtnGroup>
            <Btn
              type="submit"
              variant="outlinePrimary"
              label={buttonT('save')}
              loading={loading}
              handleClick={submit}
            />
          </BtnGroup>
        </Actions>
      </Form>
    </ModalBody>
  );
};

export default ChangePasswordModal;

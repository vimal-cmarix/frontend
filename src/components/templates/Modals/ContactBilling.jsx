import React, { useContext, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import SignService from '@api/services/sign';

import TextInput from '@components/molecules/TextInput';
import { useToast } from '@components/molecules/Notification';

import FormBlock from '@components/organisms/FormBlock';

import errorHandle from '@src/utils/error';

import BtnGroup from '@components/organisms/BtnGroup';
import Btn from '@components/molecules/Btn';
import ModalBody from './ModalBody';

import { Row, Actions } from './style';

/**
 * Contact Billing Modal
 */
const ContactModal = () => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: modalT } = useTranslation('modals');

  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const formRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function closeModal() {
    formRef.current.setErrors({});
    formRef.current.reset({});
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  async function save(data) {
    setLoading(true);

    try {
      await SignService.sendContactMessage(data);
      closeModal();
      showSuccess(modalT('contact.success_send'));
    } catch (e) {
      showToast(errorHandle(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const { email: profileEmail } = profileState.contactInfo;
    const { firstName, lastName } = profileState.personalInfo;

    setName(`${firstName} ${lastName}`);
    setEmail(profileEmail);
  }, [profileState]);

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        message: Yup.string().required(),
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

  function handleChange(e, inputType) {
    if (e.target.value && e.target.value.trim() !== '') {
      if (inputType === 'name') {
        setName(e.target.value);
      } else if (inputType === 'email') {
        setEmail(e.target.value);
      } else if (inputType === 'message') {
        setMessage(e.target.value);
      }
    } else {
      e.target.value = '';
    }
  }

  return (
    <ModalBody onCancel={closeModal} headerTitle={modalT('contact.title')}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <FormBlock label={modalT('contact.fields.name.label')}>
            <TextInput
              name="name"
              size="medium"
              onChange={e => handleChange(e, 'name')}
              value={name}
            />
          </FormBlock>
        </Row>
        <Row>
          <FormBlock label={modalT('contact.fields.email.label')}>
            <TextInput
              name="email"
              type="email"
              size="medium"
              onChange={e => handleChange(e, 'email')}
              value={email}
            />
          </FormBlock>
        </Row>
        <Row>
          <FormBlock label={modalT('contact.fields.message.label')}>
            <TextInput
              name="message"
              type="text"
              size="medium"
              onChange={e => handleChange(e, 'message')}
              value={message}
              multiline
            />
          </FormBlock>
        </Row>

        <Actions>
          <BtnGroup>
            <Btn
              startIcon="leftArrow"
              iconSize={12}
              label={buttonsT('back')}
              handleClick={closeModal}
            />
          </BtnGroup>

          <BtnGroup>
            <Btn
              type="submit"
              variant="outlinePrimary"
              label={buttonsT('submit')}
              loading={loading}
            />
          </BtnGroup>
        </Actions>
      </Form>
    </ModalBody>
  );
};

export default ContactModal;

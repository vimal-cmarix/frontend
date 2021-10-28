import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form } from '@unform/web';

import { useRouter } from 'next/router';
import AppContext from '@context/appContext';

import RadioList from '@components/molecules/RadioList';
import Btn from '@components/molecules/Btn';
import ShareService from '@api/services/share';

import { useTranslation } from 'react-i18next';
import { useToast } from '@components/molecules/Notification';
import ProfileContext from '@context/profileContext';
import ModalBody from '../../templates/Modals/ModalBody';

import {
  ContactAndAppointmentFormWrapper,
  ContactAndAppointmentFormSection,
  ContactAndAppointmentFormSectionTitle,
  ContactAndAppointmentFormSectionBody,
  ContactAndAppointmentFormTextInput,
  FormActionsWrapper,
  ContactAndAppointmentFormBlock,
} from './style';

const ContactAndAppointmentModal = ({ option, type }) => {
  const { t: message } = useTranslation('errorMessages');
  const { dispatch } = useContext(AppContext);

  const { state: profileState } = useContext(ProfileContext);

  const toast = useToast();
  const formRef = useRef();
  const radioListRef = useRef();

  const { query } = useRouter();

  const isRequestAnInterview = option === 'request-interview';
  const initialMessage = isRequestAnInterview
    ? 'request-interview'
    : 'ask-question';
  const [currentType, setCurrentType] = useState(initialMessage);
  const title = isRequestAnInterview
    ? 'Request an appointment'
    : 'Send a message';

  const messageTypes = [
    {
      value: 'ask-question',
      label: 'Ask a question',
    },
    {
      value: 'request-interview',
      label: 'Request an interview',
    },
    {
      value: 'sent-email',
      label: 'Send an offer',
    },
  ];

  function closeModal() {
    dispatch({ type: 'SET_MODAL_CLOSED' });
  }

  async function handleSubmit(data) {
    formRef.current.setErrors({});
    const schema = Yup.object().shape({
      messageType: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      message: Yup.string().required(),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      if (query.shortUrl || type === 'pitch')
        await ShareService.setShareEmailJobCard(
          data.messageType,
          type === 'pitch' ? query.slug : query.shortUrl,
          {
            name: data.name,
            email: data.email,
            message: data.message,
            option: type,
          },
        );
      else
        await ShareService.setShareEmail(
          `${data.messageType}-profile`,
          profileState.id,
          {
            name: data.name,
            email: data.email,
            message: data.message,
            option: type,
          },
        );
      toast.add(message('Message sent.'), 'success');
      formRef.current.reset();
      closeModal();
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = message(`${error.path}.${error.type}`);
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <ModalBody headerTitle={title} isUnPadding onCancel={closeModal}>
      <ContactAndAppointmentFormWrapper
        as={Form}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <ContactAndAppointmentFormSection
          noTop
          isRequestAnInterview={isRequestAnInterview}
        >
          <ContactAndAppointmentFormSectionTitle>
            What would you like to do?
          </ContactAndAppointmentFormSectionTitle>
          <ContactAndAppointmentFormSectionBody>
            <ContactAndAppointmentFormBlock className="label">
              <RadioList
                colorLight
                layout="column"
                size="medium"
                name="messageType"
                list={messageTypes}
                ref={radioListRef}
                value={currentType}
                onChange={e => setCurrentType(e)}
              />
            </ContactAndAppointmentFormBlock>
          </ContactAndAppointmentFormSectionBody>
        </ContactAndAppointmentFormSection>

        <ContactAndAppointmentFormSection noTop={isRequestAnInterview}>
          <ContactAndAppointmentFormSectionTitle>
            Contact Info
          </ContactAndAppointmentFormSectionTitle>
          <ContactAndAppointmentFormSectionBody>
            <ContactAndAppointmentFormBlock label="Name" isLabelMedium>
              <ContactAndAppointmentFormTextInput
                name="name"
                placeholder="Please enter name here"
              />
            </ContactAndAppointmentFormBlock>
            <ContactAndAppointmentFormBlock
              label="Email"
              className="label"
              isLabelMedium
            >
              <ContactAndAppointmentFormTextInput
                name="email"
                placeholder="Please enter email here"
              />
            </ContactAndAppointmentFormBlock>
          </ContactAndAppointmentFormSectionBody>
        </ContactAndAppointmentFormSection>

        <ContactAndAppointmentFormSection noBorder>
          <ContactAndAppointmentFormSectionTitle>
            Message
          </ContactAndAppointmentFormSectionTitle>
          <ContactAndAppointmentFormSectionBody>
            <ContactAndAppointmentFormTextInput
              multiline
              noBorder
              className="ContactAndAppointmentFormTextInput"
              placeholder="Type message here..."
              name="message"
              rows="10"
            />
          </ContactAndAppointmentFormSectionBody>
        </ContactAndAppointmentFormSection>

        <ContactAndAppointmentFormSection noBorder>
          <FormActionsWrapper>
            <Btn
              label="Cancel"
              handleClick={closeModal}
              variant="outlineSecondary"
            />
            <Btn label="Send" type="submit" variant="outlinePrimary" />
          </FormActionsWrapper>
        </ContactAndAppointmentFormSection>
      </ContactAndAppointmentFormWrapper>
    </ModalBody>
  );
};

ContactAndAppointmentModal.propTypes = {
  option: PropTypes.oneOf(['send-a-message', 'request-an-interview'])
    .isRequired,
  type: PropTypes.string,
};

ContactAndAppointmentModal.defaultProps = {
  type: 'profile',
};

export default ContactAndAppointmentModal;

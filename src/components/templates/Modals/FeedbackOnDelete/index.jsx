import React, { useContext, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';

import ListFeedback from '@components/organisms/ListFeedback';

import FeedbackService from '@api/services/feedback';

import Btn from '@components/molecules/Btn';

import { useToast } from '@components/molecules/Notification';

import { FormContainer, Title, TextCancel, ActionsWrapper } from './style';
import ModalBody from '../ModalBody';

const FeedbackOnDelete = () => {
  const { t: errorMessage } = useTranslation('errorMessages');

  const { dispatch: appDispatch } = useContext(AppContext);

  const formRef = useRef(null);

  const toast = useToast();
  const showSuccess = msg => toast.add(msg, 'success');
  const showError = msg => toast.add(msg, 'error');

  const [selectedOption, setSelectedOption] = useState('');
  const [listDowngrade, setListDowngrade] = useState([
    {
      value: 'No longer interested in job',
      label: 'No longer interested in job',
    },
    { value: "Didn't get the job", label: "Didn't get the job" },
    { value: 'Other', label: 'Other (please explain below)' },
  ]);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function handleChangeChecked(item) {
    setListDowngrade(
      listDowngrade.map(element => {
        const ele = element;
        if (item.value === ele.value) ele.checked = true;
        else ele.checked = false;

        return ele;
      }),
    );

    setSelectedOption(item.value);
  }

  const isOther = listDowngrade.filter(
    (item, i) => i === listDowngrade.length - 1,
  )[0].checked;

  async function handleSubmit(values) {
    try {
      formRef.current.setErrors({});
      if (isOther) {
        const schema = Yup.object().shape({
          detail: Yup.string().required(),
        });

        await schema.validate(values, {
          abortEarly: false,
        });
      }

      if (listDowngrade.filter(item => item.checked).length === 0) {
        showError('Please select any one reason for delete a card');
        return;
      }

      const data = {
        type: 'jobCard-deleted',
        option: selectedOption,
      };
      if (values.detail) data.description = values.detail;

      await FeedbackService.sendFeedback(data);
      showSuccess('Reason submit successfully for delete a card');
      closeModal();
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

  return (
    <ModalBody
      isMobileFull
      isUnPadding
      fitContent
      isCancelBackClick
      onCancel={closeModal}
    >
      <FormContainer ref={formRef} onSubmit={handleSubmit}>
        <Title>Could you share with us why you’re deleting this card?</Title>
        <ListFeedback
          list={listDowngrade}
          onChange={handleChangeChecked}
          placeholder={`Anything you want to share? ${
            !isOther ? '(Optional)' : ''
          }`}
        />

        <ActionsWrapper>
          <TextCancel onClick={closeModal}>I’d prefer not to share</TextCancel>

          <Btn variant="solidPrimary" label="Submit" />
        </ActionsWrapper>
      </FormContainer>
    </ModalBody>
  );
};

FeedbackOnDelete.propTypes = {};

FeedbackOnDelete.defaultProps = {};

export default FeedbackOnDelete;

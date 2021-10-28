import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';

import ListFeedback from '@components/organisms/ListFeedback';

import FeedbackService from '@api/services/feedback';

import { useToast } from '@components/molecules/Notification';

import {
  FormContainer,
  Title,
  Content,
  WrapperActions,
  BtnSubmit,
  TextWarn,
} from './style';
import ModalBody from '../ModalBody';

/**
 *  DoneTracking Modal
 */
const DoneTracking = ({ jobCard }) => {
  const { t: errorMessage } = useTranslation('errorMessages');

  const { dispatch: appDispatch } = useContext(AppContext);

  const formRef = useRef(null);

  const toast = useToast();
  const showSuccess = msg => toast.add(msg, 'success');
  const showError = msg => toast.add(msg, 'error');

  const [listDowngrade, setListDowngrade] = useState([
    { value: 'Got the job!', label: 'Got the job!' },
    { value: 'Got an offer but declined', label: 'Got an offer but declined' },
    {
      value: 'No longer interested in job',
      label: 'No longer interested in job',
    },
    { value: 'Didn’t get the job', label: 'Didn’t get the job' },
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
      const itensSelected = listDowngrade.filter(item => item.checked);
      if (itensSelected.length === 0) {
        showError('Item checked is required');
        return;
      }
      const data = {
        type: 'jobCard-finished',
        option: itensSelected[0].value,
      };
      if (values.detail) data.description = values.detail;

      await FeedbackService.sendFeedback(data);
      showSuccess('Done');
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
        <Title>
          🎉 WOOHOO!
          <br />
          This means you’re done tracking {jobCard.jobTitle} at{' '}
          {jobCard.company?.name}
        </Title>
        <Content>
          Take a moment to share the outcome so we can add this to your
          analytics report!
        </Content>
        <ListFeedback
          list={listDowngrade}
          onChange={handleChangeChecked}
          placeholder={`Any other outcome not mentioned above? ${
            !isOther ? '(Optional)' : ''
          }`}
        />
        <WrapperActions>
          <TextWarn onClick={closeModal}>I’d prefer not to share</TextWarn>
          <BtnSubmit variant="solidPrimary" label="Submit" />
        </WrapperActions>
      </FormContainer>
    </ModalBody>
  );
};

DoneTracking.propTypes = {
  jobCard: PropTypes.shape({
    id: PropTypes.string,
    jobTitle: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

DoneTracking.defaultProps = {};

export default DoneTracking;

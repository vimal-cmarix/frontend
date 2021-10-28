import React, { useContext, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';

import IconSVG from '@components/atoms/IconSVG';
import ListFeedback from '@components/organisms/ListFeedback';
import FeedbackService from '@api/services/feedback';
import PaymentContext from '@context/paymentContext';
import PaymentService from '@api/services/payment';
import errorHandle from '@src/utils/error';

import { useToast } from '@components/molecules/Notification';
import { FREE, PREMIUM_STUDENT, PREMIUM } from '@modules/consts';
import {
  FormContainer,
  Title,
  Content,
  TextWarn,
  BtnCancel,
  CloseIconButtonWrapper,
  CloseIconButton,
} from './style';
import ModalBody from '../ModalBody';

/**
 *  Downgrade Modal
 */
const Downgrade = () => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { dispatch: paymentDispatch, state: paymentState } = useContext(
    PaymentContext,
  );

  const formRef = useRef(null);

  const toast = useToast();
  const showSuccess = msg => toast.add(msg, 'success');
  const showError = msg => toast.add(msg, 'error');

  const [selectedOption, setSelectedOption] = useState('');
  const [canceling, setCanceling] = useState(false);
  const [listDowngrade, setListDowngrade] = useState([
    { value: 'Too expensive', label: 'Too expensive' },
    { value: 'Done with my job hunt', label: 'Done with my job hunt' },
    { value: 'Technical issues', label: 'Technical issues' },
    {
      value: 'Switching to another product',
      label: 'Switching to another product',
    },
    {
      value: 'Not sure how to use data & tools',
      label: 'Not sure how to use data & tools',
    },
    { value: 'Missing features I need', label: 'Missing features I need' },
    { value: 'Other', label: 'Other (please explain below)' },
  ]);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  async function updatePaymentContext() {
    const response = await PaymentService.getUserPlanActive();
    const { data } = response;

    if (data.rows?.length && data.rows[0].plan.type === PREMIUM_STUDENT)
      paymentDispatch({ type: 'SET_IS_STUDENT_TRIAL', data: true });

    if (data.rows?.length === 0)
      paymentDispatch({ type: 'SET_PLAN', data: FREE });
    else
      paymentDispatch({
        type: 'SET_PLAN',
        data:
          data.rows[0].plan.type === PREMIUM_STUDENT
            ? PREMIUM
            : data.rows[0].plan.type,
      });

    if (data.rows && data.rows?.length && data.rows[0].isBillingCanceled)
      paymentDispatch({ type: 'SET_PLAN_CANCELED', data: true });
    if (data.rows && data.rows?.length)
      paymentDispatch({ type: 'SET_PLAN_DATA', data: data.rows[0] });
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  async function deletePlan() {
    setCanceling(true);
    try {
      const active = await PaymentService.getUserPlanActive();
      const { data } = active;

      if (data && data.rows?.length > 0) {
        const { id } = data.rows[0];
        if (id) {
          const response = await PaymentService.cancelSubscription(id);

          if (response) {
            updatePaymentContext();
          }
          setCanceling(false);
        }
      }
      await FeedbackService.sendFeedback(data);
    } catch (e) {
      showError(errorHandle(e));
      setCanceling(false);
    }
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
        showError('Item checked is required');
        return;
      }

      const data = {
        type: 'downgrade',
        option: selectedOption,
        ...values,
      };

      await deletePlan(data);
      showSuccess('Success');
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
        <CloseIconButtonWrapper>
          <CloseIconButton onClick={closeModal}>
            <IconSVG name="close" size={44} />
          </CloseIconButton>
        </CloseIconButtonWrapper>
        <Title>We’re sad to see you go 😔</Title>
        <Content>
          Before you downgrade, please let us know the reason you are leaving.
          Every bit of feedback helps!
        </Content>
        <ListFeedback
          list={listDowngrade}
          onChange={handleChangeChecked}
          placeholder={`Anything you want to share? ${
            !isOther ? '(Optional)' : ''
          }`}
        />

        <BtnCancel
          variant="danger"
          label="Cancel Account"
          loading={canceling}
        />

        <TextWarn onClick={closeModal}>
          Nevermind, I don’t want to cancel!
        </TextWarn>
      </FormContainer>
    </ModalBody>
  );
};

Downgrade.propTypes = {};

Downgrade.defaultProps = {};

export default Downgrade;

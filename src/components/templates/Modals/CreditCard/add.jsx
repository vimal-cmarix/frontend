import React, { useContext, useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Braintree from 'braintree-web';
import { Grid, Cell } from 'styled-css-grid';

import AppContext from '@context/appContext';
import PaymentContext from '@context/paymentContext';

import PaymentService from '@api/services/payment';

import { sizes } from '@assets/styles/medias';
import { Grey400 } from '@assets/styles/colors';

import Loader from '@components/atoms/Loader';

import { useToast } from '@components/molecules/Notification';
import TextInput from '@components/molecules/TextInput';

import FormBlock from '@components/organisms/FormBlock';

import errorHandle, { braintreeErrorHandle } from '@utils/error';

import BtnGroup from '@components/organisms/BtnGroup';
import Btn from '@components/molecules/Btn';
import { Typography } from '@assets/styles/typo';
import ModalBody from '../ModalBody';

import {
  Actions,
  BrainTreeContainer,
  BrainTreeField,
  ErrorMessage,
} from '../style';

/**
 * About Modal
 */
const CreditCard = () => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: paymentState, dispatch: paymentDispatch } = useContext(
    PaymentContext,
  );

  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: paymentT } = useTranslation('payment_form');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: modalT } = useTranslation('modals');

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const [cvvError, setCvvError] = useState({
    show: false,
    message: '',
  });
  const [numberError, setNumberError] = useState({
    show: false,
    message: '',
  });
  const [expirationDateError, setExpirationDateError] = useState({
    show: false,
    message: '',
  });
  const [postalCode, setPostalCode] = useState({
    show: false,
    message: '',
  });

  const [screenWidth, setScreenWidth] = useState(null);
  const [buttonloader, setButtonLoader] = useState(false);
  const [hostedFields, setHostedFields] = useState(null);
  const [formLoading, setFormLoading] = useState(true);

  const formRef = useRef(null);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  async function handlePayment({ nonce, details }, { name }) {
    const { id } = paymentState.customer;
    const { cardType, lastFour } = details;

    const response = await PaymentService.createPayment(id, {
      nonce,
      cardType,
      lastFour,
      makeDefault: true,
      name,
    });

    return response;
  }

  function fieldsCreated(err, fields) {
    if (!err) {
      setFormLoading(false);
      return setHostedFields(fields);
    }

    return err;
  }

  function clientCreated(err, client) {
    if (!err) {
      return Braintree.hostedFields.create(
        {
          client,
          fields: {
            number: {
              selector: '#card-number',
              placeholder: '4111 1111 1111 1111',
            },
            cvv: {
              selector: '#cvv',
              placeholder: 'XXXX',
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: 'XX/XXXX',
            },
            postalCode: {
              selector: '#postal-code',
              placeholder: '11111',
            },
          },
          styles: {
            '::placeholder': {
              color: Grey400,
              'font-family': 'inherit',
            },
            '::-webkit-input-placeholder': {
              color: Grey400,
              'font-family': 'inherit',
            },
          },
        },
        fieldsCreated,
      );
    }

    return err;
  }

  function validateBraintreeFields(fields) {
    let returnVal = true;

    Object.keys(fields).map(key => {
      if (fields[key].isEmpty) {
        const show = true;
        const message = `The field is required`;
        returnVal = false;

        if (key === 'cvv') return setCvvError({ show, message });
        if (key === 'number') return setNumberError({ show, message });
        if (key === 'expirationDate')
          return setExpirationDateError({ show, message });
        if (key === 'postalCode') return setPostalCode({ show, message });
      }

      if (!fields[key].isValid) {
        const show = true;
        const message = `The field is invalid`;
        returnVal = false;

        if (key === 'cvv') return setCvvError({ show, message });
        if (key === 'number') return setNumberError({ show, message });
        if (key === 'expirationDate')
          return setExpirationDateError({ show, message });
        if (key === 'postalCode') return setPostalCode({ show, message });
      }

      return true;
    });

    return returnVal;
  }

  async function createClient(token) {
    Braintree.client.create({ authorization: token }, clientCreated);
  }

  async function save(formData) {
    const braintreeData = await hostedFields.tokenize({
      cardholderName: document.querySelector('#name').value,
    });
    const paymentResponse = await handlePayment(braintreeData, formData);
    if (paymentResponse.status === 201) {
      paymentDispatch({
        type: 'SET_PAYMENT_DATA_CUSTOMER',
        data: paymentResponse.data,
      });
      showSuccess(modalT('credit_card.success'));
      closeModal();
      hostedFields.clear('number');
      hostedFields.clear('cvv');
      hostedFields.clear('expirationDate');
    }
    setButtonLoader(false);
  }

  async function submitForm(data) {
    try {
      setButtonLoader(true);

      // Remove all previous errors
      formRef.current.setErrors({});
      setCvvError({ show: false, message: '' });
      setNumberError({ show: false, message: '' });
      setExpirationDateError({ show: false, message: '' });
      setPostalCode({ show: false, message: '' });

      const schema = Yup.object().shape({
        name: Yup.string().required(),
      });

      // Validate card fields
      const { fields } = hostedFields.getState();
      validateBraintreeFields(fields);

      // Validation passed
      await schema.validate(data, {
        abortEarly: false,
      });

      return await save(data);
    } catch (error) {
      const validationErrors = {};

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          validationErrors[err.path] = errorMessage(`${err.path}.${err.type}`);
        });
        return formRef.current.setErrors(validationErrors);
      }

      return showError(
        error.name === 'BraintreeError'
          ? braintreeErrorHandle(error)
          : errorHandle(error),
      );
    } finally {
      setButtonLoader(false);
    }
  }

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => {
    if (paymentState.client.clientToken) {
      createClient(paymentState.client.clientToken);
    }
  }, [paymentState]);

  const colWidth = screenWidth > parseInt(sizes.tabletPortrait, 10) ? 2 : 4;
  const colWidthSmall =
    screenWidth > parseInt(sizes.tabletPortrait, 10) ? 1 : 4;

  return (
    <ModalBody onCancel={closeModal} headerTitle={modalT('credit_card.title')}>
      <Typography
        style={{ marginBottom: '24px' }}
        display="block"
        size="headline1"
        color="grey31"
      >
        {modalT('credit_card.add_description')}
      </Typography>
      <Form onSubmit={submitForm} ref={formRef}>
        <BrainTreeContainer className={formLoading && 'loading'}>
          {formLoading && <Loader size="large" className="loader" />}
          <Grid
            className="form"
            gap="24px"
            columns={4}
            style={{ marginBottom: '24px' }}
          >
            <Cell width={colWidth}>
              <FormBlock label={paymentT('labels.name')}>
                <TextInput
                  id="name"
                  name="name"
                  size="medium"
                  type="text"
                  hint={paymentT('hints.name')}
                />
              </FormBlock>
            </Cell>
            <Cell width={colWidth}>
              <FormBlock
                className="formFieldCell"
                label={modalT('credit_card.fields.zip')}
              >
                <BrainTreeField
                  name="postalCode"
                  id="postal-code"
                  className={[
                    postalCode.show && 'braintree-hosted-fields-invalid',
                  ]}
                />
                {postalCode.show && (
                  <ErrorMessage>{postalCode.message}</ErrorMessage>
                )}
              </FormBlock>
            </Cell>
          </Grid>
          <Grid className="form" gap="24px" columns={4}>
            <Cell width={colWidth}>
              <FormBlock
                className="formFieldCell"
                label={modalT('credit_card.fields.number')}
              >
                <BrainTreeField
                  name="cardNumber"
                  id="card-number"
                  className={[
                    numberError.show && 'braintree-hosted-fields-invalid',
                  ]}
                />
                {numberError.show && (
                  <ErrorMessage>{numberError.message}</ErrorMessage>
                )}
              </FormBlock>
            </Cell>
            <Cell width={colWidthSmall}>
              <FormBlock
                className="formFieldCell"
                label={modalT('credit_card.fields.expiration')}
              >
                <BrainTreeField
                  name="expirationDate"
                  id="expiration-date"
                  className={[
                    expirationDateError.show &&
                      'braintree-hosted-fields-invalid',
                  ]}
                />
                {expirationDateError.show && (
                  <ErrorMessage>{expirationDateError.message}</ErrorMessage>
                )}
              </FormBlock>
            </Cell>
            <Cell width={colWidthSmall}>
              <FormBlock
                className="formFieldCell"
                label={modalT('credit_card.fields.cvv')}
              >
                <BrainTreeField
                  name="cvv"
                  id="cvv"
                  className={[
                    cvvError.show && 'braintree-hosted-fields-invalid',
                  ]}
                />
                {cvvError.show && (
                  <ErrorMessage>{cvvError.message}</ErrorMessage>
                )}
              </FormBlock>
            </Cell>
          </Grid>
        </BrainTreeContainer>
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
              label={buttonsT('save_close')}
              loading={buttonloader}
            />
          </BtnGroup>
        </Actions>
      </Form>
    </ModalBody>
  );
};

export default CreditCard;

import React, { useRef, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Braintree from 'braintree-web';
import PropTypes from 'prop-types';
import { Grid, Cell } from 'styled-css-grid';

import { sizes } from '@assets/styles/medias';
import { Grey400 } from '@assets/styles/colors';

import PaymentService from '@api/services/payment';
import BoardService from '@api/services/board';

import ProfileContext from '@context/profileContext';
import PaymentContext from '@context/paymentContext';
import AppContext from '@context/appContext';

import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import CustomSelect from '@components/molecules/CustomSelect';
import CustomCheckbox from '@components/molecules/CustomCheckbox';
import RadioList from '@components/molecules/RadioList';
import Btn from '@components/molecules/Btn';
import { useToast } from '@components/molecules/Notification';

// MODALS
import ConfirmPaymentModal from '@components/templates/Modals/ConfirmPayment';
import JobCardsSelectModal from '@components/templates/Modals/JobCardsSelect';
import DowngradeDiscount from '@components/templates/Modals/DowngradeDiscount';

import {
  BrainTreeContainer,
  BrainTreeField,
  BrainTreeWrapper,
  ButtonWrapper,
  WrapperTitle,
  SelectWrapper,
  PlanTitle,
  PlanPrice,
  CheckboxWrapper,
  RadiusWrapper,
  ErrorMessage,
  StudentPriceBanner,
  ErrorWrapper,
} from '@components/organisms/PaymentForm/style';

import {
  FREE,
  PRESENTATION,
  STARTER_PLANS_E_IDS,
  PREMIUM_PLANS_E_IDS,
} from '@modules/consts';

import errorHandle, { braintreeErrorHandle } from '@utils/error';
import { formateCurrency } from '@utils/general';

const PaymentForm = ({ token, options, customer }) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: paymentState, dispatch: paymentDispatch } = useContext(
    PaymentContext,
  );
  const { state: profileState } = useContext(ProfileContext);

  const { t: paymentT } = useTranslation('payment_form');
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: modalsT } = useTranslation('modals');

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  const router = useRouter();

  const [paymentError, showError] = useState(null);
  const [buttonloader, setButtonLoader] = useState(false);
  const [hostedFields, setHostedFields] = useState(null);
  const [currSubs, setCurrSubs] = useState({});
  const [savedCard, setSavedCard] = useState('new-method');
  const [listSavedCards, setListSavedCards] = useState(null);

  const [currPrice, setCurrPrice] = useState('');

  const [save, setSave] = useState(false);

  const formRef = useRef(null);

  /* eslint-disable */
  function trackExtoleCheckout(partner_conversion_id, cart_value) {
    const { id } = profileState;
    const { firstName, lastName } = profileState.personalInfo;
    const { email } = profileState.contactInfo;

    (function(c, e, k, l, a) {
      c[e] = c[e] || {};
      for (c[e].q = c[e].q || []; a < l?.length; ) k(l[a++], c[e]);
    })(
      window,
      'extole',
      function(c, e) {
        e[c] =
          e[c] ||
          function() {
            e.q.push([c, arguments]);
          };
      },
      ['createZone'],
      0,
    );

    extole.createZone({
      name: 'conversion',
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        partner_user_id: id,
        partner_conversion_id,
        cart_value,
      },
    });
  }
  /* eslint-enable */

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

  async function handleSubscription({ payment, subscription }) {
    const { value } = subscription;

    const [, /* externalId */ planId] = value.split(':');
    let paymentMethodId = null;

    const { asPath, query } = router;
    const { billing, type } = query;
    const campaign = billing ? asPath : undefined;

    if (!payment) {
      if (customer.paymentMethods?.length) {
        paymentMethodId =
          customer.paymentMethods[customer.paymentMethods?.length - 1].id;
      }

      const response = await PaymentService.subscription({
        paymentMethodId,
        planId,
        currency: 'USD',
        campaign,
      });

      paymentDispatch({
        type: 'SET_PLAN',
        userPlan: type,
      });

      paymentDispatch({ type: 'SET_PLAN_CANCELED', data: false });
      paymentDispatch({ type: 'SET_PLAN_DATA', data: undefined });
      paymentDispatch({ type: 'SET_IS_STUDENT_TRIAL', data: false });

      trackExtoleCheckout(
        response.data.subscription.id,
        response.data.subscription.total / 100,
      );
      return response;
    }

    const { paymentMethods } = payment.data;
    paymentMethodId = paymentMethods[0].id;

    const response = await PaymentService.subscription({
      paymentMethodId,
      planId,
      currency: 'USD',
      campaign,
    });

    paymentDispatch({
      type: 'SET_PLAN',
      userPlan: type,
    });

    paymentDispatch({ type: 'SET_PLAN_DATA', data: undefined });
    paymentDispatch({ type: 'SET_PLAN_CANCELED', data: false });
    paymentDispatch({ type: 'SET_IS_STUDENT_TRIAL', data: false });

    trackExtoleCheckout(
      response.data.subscription.id,
      response.data.subscription.total / 100,
    );

    return response;
  }

  async function handleRequests(formData) {
    setButtonLoader(true);

    const activeSuccessMessageHome = () => {
      appDispatch({
        type: 'SET_PAYMENT_SUCCESS',
        props: { show: true, type: router.query.type },
      });
    };

    try {
      let paymentResponse = false;

      let redirect;

      if (savedCard !== 'new-method') {
        await handleSubscription({
          payment: paymentResponse,
          subscription: currSubs,
        });
        redirect = '/billing';
      } else {
        const braintreeData = await hostedFields.tokenize({
          cardholderName: document.querySelector('#name').value,
        });

        if (save) {
          paymentResponse = await handlePayment(braintreeData, formData);
        }

        await handleSubscription({
          payment: paymentResponse,
          subscription: currSubs,
        });

        // redirect = '/home';
        redirect = '/company/signin';
      }

      activeSuccessMessageHome();
      setTimeout(() => {
        // Wait a bit for extole tags to fire
        router.push(redirect);
      }, 200);
      return true;
    } catch (error) {
      const message =
        error.name === 'BraintreeError'
          ? braintreeErrorHandle(error)
          : errorHandle(error);
      return showError(
        `Invalid card details.Please check your information and submit again (Error: ${message})`,
        // `Something went wrong. Please check your information and submit again. If the problem persists please contact support (Error: ${message})`,
      );
    } finally {
      setButtonLoader(false);
    }
  }

  function openModalJobCardPendency(cardsToInactivateAmount, formData) {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <JobCardsSelectModal
          pendencyAmount={cardsToInactivateAmount}
          // eslint-disable-next-line no-use-before-define
          onConfirm={handleOnSaveJobCardsToInactivate(formData)}
          supportText={modalsT('job_tracker_pendency.inactivate.support_text')}
          pendencyText={modalsT(
            'job_tracker_pendency.inactivate.pendency_text',
          ).replace('{AMOUNT}', String(cardsToInactivateAmount))}
          abortText={modalsT(
            'job_tracker_pendency.inactivate.abort_text_downgrade',
          )}
          type="inactivate"
        />
      ),
    });
  }

  function openModalInfoJobCardPendency(cardsToInactivateAmount, formData) {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <DowngradeDiscount
          cardsToInactivateAmount={cardsToInactivateAmount}
          onCancel={() =>
            openModalJobCardPendency(cardsToInactivateAmount, formData)
          }
        />
      ),
    });
  }

  async function callMethodBasedPendencies(pendencyResponse, formData) {
    const transformedPendencyResponse = pendencyResponse.reduce(
      (acc, pendency) => ({
        ...acc,
        [pendency.type]: pendency,
      }),
      {},
    );

    if (transformedPendencyResponse['downgrade-jobcard']) {
      const { pendencyAmount } = transformedPendencyResponse[
        'downgrade-jobcard'
      ];

      openModalInfoJobCardPendency(pendencyAmount, formData);

      return;
    }

    await handleRequests(formData);
  }

  function handleOnSaveJobCardsToInactivate(formData) {
    return async jobCardIds => {
      try {
        const { data: response } = await BoardService.batchDeleteJobCards(
          jobCardIds,
        );

        callMethodBasedPendencies(response.data, formData);
      } catch (err) {
        showToast(errorHandle(err));
      }
    };
  }

  async function checkPendencies(formData) {
    try {
      const { value } = currSubs;
      const [, newPlanId] = value.split(':');

      const { data: response } = await PaymentService.checkPendencie({
        newPlanId,
      });

      callMethodBasedPendencies(response.data, formData);
    } catch (err) {
      const message =
        err.name === 'BraintreeError'
          ? braintreeErrorHandle(err)
          : errorHandle(err);

      showError(
        `Invalid card details.Please check your information and submit again (Error: ${message})`,
        // `Something went wrong. Please check your information and submit again. If the problem persists please contact support (Error: ${message})`,
      );
    }
  }

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

  function validateBraintreeFields(fields) {
    return Object.keys(fields).map(key => {
      if (fields[key].isEmpty) {
        const show = true;
        const message = `The field is required`;

        if (key === 'cvv') return setCvvError({ show, message });
        if (key === 'number') return setNumberError({ show, message });
        if (key === 'expirationDate')
          return setExpirationDateError({ show, message });
        if (key === 'postalCode') return setPostalCode({ show, message });
      }

      if (!fields[key].isValid) {
        const show = true;
        const message = `The field is invalid`;

        if (key === 'cvv') return setCvvError({ show, message });
        if (key === 'number') return setNumberError({ show, message });
        if (key === 'expirationDate')
          return setExpirationDateError({ show, message });
        if (key === 'postalCode') return setPostalCode({ show, message });
      }

      return true;
    });
  }

  async function handleSubmit(data) {
    let schema = null;

    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      setCvvError({ show: false, message: '' });
      setNumberError({ show: false, message: '' });
      setExpirationDateError({ show: false, message: '' });
      setPostalCode({ show: false, message: '' });

      if (savedCard === 'new-method') {
        schema = Yup.object().shape({
          name: Yup.string().required(),
          subs: Yup.string().required(),
        });
      } else {
        schema = Yup.object().shape({
          subs: Yup.string().required(),
        });
      }

      // Validate card fields
      const { fields } = hostedFields.getState();
      const isValid = validateBraintreeFields(fields);

      // Validation passed
      await schema.validate(data, {
        abortEarly: false,
      });

      if (savedCard === 'new-method') {
        if (!isValid.includes(undefined)) {
          appDispatch({
            type: 'SET_MODAL_OPENED',
            component: ConfirmPaymentModal,
            props: {
              type: router.query.type,
              handleConfirm: () => checkPendencies(data),
              handleCancel: () => {},
            },
          });
        }
      } else {
        appDispatch({
          type: 'SET_MODAL_OPENED',
          component: ConfirmPaymentModal,
          props: {
            type: router.query.type,
            handleConfirm: () => checkPendencies(data),
            handleCancel: () => {},
          },
        });
      }
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

  function fieldsCreated(err, fields) {
    if (!err) {
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
              placeholder: 'XXX',
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: 'XX/XX',
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

  function generateOptions() {
    const { type } = router.query;
    const reference =
      type === 'starter' ? STARTER_PLANS_E_IDS : PREMIUM_PLANS_E_IDS;
    const { ONE_MONTH, TWELVE_MONTHS } = reference;

    const ordered = [
      options.filter(option => option.externalId === ONE_MONTH)[0],
      options.filter(option => option.externalId === TWELVE_MONTHS)[0],
    ];

    const captalize = s => {
      const c = s.toLowerCase().split('');
      if (c[0]) c[0] = c[0].toUpperCase();
      return c.join('');
    };

    return ordered.map(e => ({
      label: captalize(e.billing),
      value: `${e.externalId}:${e.id}`,
    }));
  }

  async function createClient() {
    Braintree.client.create({ authorization: token }, clientCreated);
  }

  function readCustomer() {
    if (!customer.paymentMethods?.length) {
      return setListSavedCards([
        { label: 'Use a new payment method', value: 'new-method' },
      ]);
    }

    const { firstName, lastName, paymentMethods } = customer;
    const methods = [];

    paymentMethods.map(card => {
      const { id } = card;
      const { type, lastFour, name } = card.card;

      return methods.push({
        label: `${type} ending ${lastFour} - ${name ||
          `${firstName} ${lastName}`}`,
        value: id,
      });
    });

    return setListSavedCards([
      ...methods,
      { label: 'Use a new payment method', value: 'new-method' },
    ]);
  }

  function updateSubscription(plan) {
    const { type } = router.query;
    const subscriptions = options;
    const [{ prices: subsPrice, billing }] = subscriptions.filter(
      e => e.id === plan.value.split(':')[1],
    );
    const [{ amount: subsTotal, hasDiscount, finalAmount }] = subsPrice;

    if (billing === 'annual') {
      setCurrPrice(`${formateCurrency(finalAmount)} / YEAR`);
    } else {
      setCurrPrice(
        `${formateCurrency(finalAmount)} / ${paymentT(`plans.${type}.per`)}`,
      );
    }
  }

  function setInitialSubValue() {
    const { billing, type } = router.query;
    const reference =
      type === 'starter' ? STARTER_PLANS_E_IDS : PREMIUM_PLANS_E_IDS;

    const opts = generateOptions();
    let subscription = 'ONE_MONTH';

    if (billing === 'annual') subscription = 'TWELVE_MONTHS';

    const startOpt = opts.find(opt =>
      opt.value.startsWith(reference[subscription]),
    );

    setCurrSubs(startOpt);
    setSave(true);
  }

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => {
    if (Object.keys(currSubs)?.length) {
      updateSubscription(currSubs);
    }
  }, [currSubs]);

  useEffect(() => {
    createClient();
    readCustomer();
    setInitialSubValue();
  }, []);

  const colWidth = screenWidth > parseInt(sizes.tabletPortrait, 10) ? 2 : 4;
  const colWidthSmall =
    screenWidth > parseInt(sizes.tabletPortrait, 10) ? 1 : 4;

  return (
    <>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <BrainTreeWrapper hide={router.query.type === PRESENTATION}>
          <WrapperTitle>
            {paymentT(`plans.${router.query.type}.title`)}
          </WrapperTitle>
          <StudentPriceBanner
            style={paymentState.isStudent ? {} : { visibility: 'hidden' }}
          >
            50% off Student Pricing
          </StudentPriceBanner>
          {/* <PlanTitle>{paymentT(`plans.${router.query.type}.resume`)}</PlanTitle>
          <List nomarging>
            {paymentT(`plans.${router.query.type}.features`, {
              returnObjects: true,
            }).map((row, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Feature key={index}>
                <IconWrapper>
                  <Icon name="check" />
                </IconWrapper>
                {row}
              </Feature>
            ))}
          </List> */}
          <PlanTitle>{paymentT('titles.total_price')}</PlanTitle>
          <PlanPrice>{currPrice}</PlanPrice>
          <PlanTitle margin>{paymentT('titles.billing')}</PlanTitle>
          <FormBlock label="">
            <SelectWrapper>
              <CustomSelect
                value={currSubs}
                options={generateOptions()}
                onOptionSelected={e => setCurrSubs(e)}
                name="subs"
                placeholder={paymentT('subs_placeholder')}
                size="medium"
              />
            </SelectWrapper>
          </FormBlock>
        </BrainTreeWrapper>
        {/* <BrainTreeWrapper
          hide={
            router.query.type === PRESENTATION || !paymentState.isTrialEligible
          }
        >
          <WrapperTitle>{paymentT('titles.free_trial')}</WrapperTitle>
          <PlanResume>{paymentT('resumes.free_trial')}</PlanResume>
        </BrainTreeWrapper>
        <BrainTreeWrapper
          hide={
            router.query.type === PRESENTATION || paymentState.isTrialEligible
          }
        >
          <WrapperTitle>{paymentT('titles.no_free_trial')}</WrapperTitle>
          <PlanResume>{paymentT('resumes.no_free_trial')}</PlanResume>
        </BrainTreeWrapper> */}
        <BrainTreeWrapper className="paymentTitles">
          <WrapperTitle>{paymentT('titles.payment')}</WrapperTitle>
          <RadiusWrapper>
            {listSavedCards && listSavedCards?.length > 1 && (
              <FormBlock label="">
                <RadioList
                  onChange={e => setSavedCard(e)}
                  name="card"
                  value={savedCard}
                  list={listSavedCards}
                />
              </FormBlock>
            )}
          </RadiusWrapper>
          <div
            style={{ display: savedCard === 'new-method' ? 'block' : 'none' }}
          >
            <BrainTreeContainer>
              <input type="hidden" name="payment_method_nonce" />
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
                    label={paymentT('labels.zip')}
                  >
                    <BrainTreeField
                      name="postalCode"
                      id="postal-code"
                      className={[
                        postalCode.show && 'braintree-hosted-fields-invalid',
                      ]}
                    />
                    {postalCode.show ? (
                      <ErrorMessage>{postalCode.message}</ErrorMessage>
                    ) : null}
                  </FormBlock>
                </Cell>
              </Grid>
              <Grid className="form" gap="24px" columns={4}>
                <Cell width={colWidth}>
                  <FormBlock
                    className="formFieldCell"
                    label={paymentT('labels.number')}
                  >
                    <BrainTreeField
                      name="cardNumber"
                      id="card-number"
                      className={[
                        numberError.show && 'braintree-hosted-fields-invalid',
                      ]}
                    />
                    {numberError.show ? (
                      <ErrorMessage>{numberError.message}</ErrorMessage>
                    ) : null}
                  </FormBlock>
                </Cell>
                <Cell width={colWidthSmall}>
                  <FormBlock
                    className="formFieldCell"
                    label={paymentT('labels.expiration')}
                  >
                    <BrainTreeField
                      name="expirationDate"
                      id="expiration-date"
                      className={[
                        expirationDateError.show &&
                          'braintree-hosted-fields-invalid',
                      ]}
                    />
                    {expirationDateError.show ? (
                      <ErrorMessage>{expirationDateError.message}</ErrorMessage>
                    ) : null}
                  </FormBlock>
                </Cell>
                <Cell width={colWidthSmall}>
                  <FormBlock
                    className="formFieldCell"
                    label={paymentT('labels.cvv')}
                  >
                    <BrainTreeField
                      name="cvv"
                      id="cvv"
                      className={[
                        cvvError.show && 'braintree-hosted-fields-invalid',
                      ]}
                    />
                    {cvvError.show ? (
                      <ErrorMessage>{cvvError.message}</ErrorMessage>
                    ) : null}
                  </FormBlock>
                </Cell>
              </Grid>
            </BrainTreeContainer>
            <FormBlock label="">
              <CheckboxWrapper isPlan={router.query.type !== FREE}>
                <CustomCheckbox
                  label={paymentT('labels.save')}
                  name="save"
                  // hint={paymentT('hints.check')}
                  checked={save}
                  onChange={e => setSave(e.target.checked)}
                />
              </CheckboxWrapper>
            </FormBlock>
          </div>
        </BrainTreeWrapper>
        {paymentError && (
          <ErrorWrapper>
            <p>{paymentError}</p>
          </ErrorWrapper>
        )}
        <ButtonWrapper>
          <Btn
            type="submit"
            variant="solidPrimary"
            label={
              paymentState.isTrialEligible
                ? paymentT('button_free_trial')
                : paymentT('button_pay')
            }
            handleClick={() => {}}
            loading={buttonloader}
          />
        </ButtonWrapper>
      </Form>
    </>
  );
};

PaymentForm.propTypes = {
  token: PropTypes.string.isRequired,
  customer: PropTypes.oneOfType([PropTypes.object]).isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

PaymentForm.defaultProps = {
  options: [],
};

export default PaymentForm;

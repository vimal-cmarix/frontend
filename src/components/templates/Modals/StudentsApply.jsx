import React, { useContext, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import UserService from '@api/services/user';

import Icon from '@components/atoms/Icon';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import { Button } from '@components/molecules/Button';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';

import {
  StudentsDiscountTitle,
  StudentsDiscountDescription,
  StudentsTitleContainer,
  DefaultModalContent,
  Body,
  Row,
  CloseButton,
} from '@components/templates/Modals/style';
import { cdn } from '@utils/general';

const StudentsApply = () => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const formRef = useRef(null);

  function closeModal() {
    formRef.current.setErrors({});
    formRef.current.reset({});
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
  }

  async function save(data) {
    setLoading(true);

    try {
      await UserService.applyAsStudent(data);
      showSuccess('Check your email address for further instructions');
      setLoading(false);
      setSuccess(true);
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
        email: Yup.string()
          .email()
          .required(),
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

  return (
    <DefaultModalContent
      className="pricingModal"
      style={{ maxWidth: 'fit-content' }}
      isOpened={appState.modal.isOpened}
    >
      <CloseButton onClick={closeModal}>
        <Icon name="close" />
      </CloseButton>
      <Body>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Row flex>
            <img
              width="122px"
              src={cdn('/static/img/pricing/students-apply-ilustration.svg')}
              alt="Apply for the students discount"
            />
            <StudentsTitleContainer>
              <StudentsDiscountTitle small={success}>
                {!success ? (
                  <>
                    Students get <span className="highlight">50% off!</span>
                  </>
                ) : (
                  <>
                    <span>We&apos;ve sent you a link</span>
                    <br />
                    <span className="highlight">
                      to access student pricing!
                    </span>
                  </>
                )}
              </StudentsDiscountTitle>
              <StudentsDiscountDescription>
                {!success ? (
                  <>
                    Add your <strong>student email</strong> and get this offer!
                  </>
                ) : (
                  <>
                    Please check your <strong>email address</strong> for further
                    instructions.
                  </>
                )}
              </StudentsDiscountDescription>
            </StudentsTitleContainer>
          </Row>
          <Row>
            <div style={success ? { display: 'none' } : {}}>
              <FormBlock label="">
                <TextInput
                  autocomplete={false}
                  name="email"
                  type="email"
                  placeholder="student@university.com"
                  size="medium"
                />
                <Button
                  label="Get offer"
                  type="submit"
                  size="xsmall-side"
                  loading={loading}
                />
              </FormBlock>
            </div>
          </Row>
        </Form>
      </Body>
    </DefaultModalContent>
  );
};

export default StudentsApply;

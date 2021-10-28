import React, { useContext, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import ProfileService from '@api/services/profile';

import 'react-phone-number-input/style.css';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';

import IconSVG from '@components/atoms/IconSVG';
import TextInput from '@components/molecules/TextInput';
import Btn from '@components/molecules/Btn';
import { useToast } from '@components/molecules/Notification';

import FormBlock from '@components/organisms/FormBlock';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import BtnGroup from '@components/organisms/BtnGroup';

import errorHandle from '@src/utils/error';

import useMedia from '@hooks/useMedia';

import { sizes as breakpoint } from '@assets/styles/medias';

import ModalBody from './ModalBody';

import {
  Row,
  Actions,
  ReadonlyBtn,
  InputWithIcon,
  ErrorMessagePhone,
} from './style';

/**
 * Contact Modal
 */
const Contact = () => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: modalT } = useTranslation('modals');

  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const [loading, setLoading] = useState(false);

  const [isViewContact, setViewContact] = useState(false);

  const [viewPhoneType, setViewPhoneType] = useState('password');

  const [value, setValue] = useState();
  const [isPossible, setIsPossibleValue] = useState(true);
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
      const profileId = profileState.id;
      await ProfileService.setContactInfo(profileId, data);

      profileDispatch({
        type: 'SET_CONTACT',
        contact: data,
      });

      closeModal();
      showSuccess(modalT('contact.success'));
      setLoading(false);
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      console.log(value);
      const schema = Yup.object().shape({
        phone: Yup.string(),
        email: Yup.string()
          .email()
          .required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (value) {
        const status = value && isPossiblePhoneNumber(value);
        setIsPossibleValue(status);
        if (status) {
          await save({ phone: value, email: data.email });
        }
      } else {
        await save({ phone: value, email: data.email });
      }
      //await save({ phone: value, email: data.email });
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

  function fillCurrents() {
    const profileStatePhone = profileState.contactInfo.phone;
    const profileStateEmail = profileState.contactInfo.email;

    if (profileStatePhone) {
      setValue(profileState.contactInfo.phone);
      formRef.current.setData({ phone: profileStatePhone });
    }

    if (profileStateEmail) {
      formRef.current.setData({ email: profileStateEmail });
    }
  }

  function handleChangePhone(e) {
    setValue(e);
    if (value) {
      const status = value && isPossiblePhoneNumber(value);
      setIsPossibleValue(status);
    } else {
      setIsPossibleValue(true);
    }
    // const value = e.target.value.replace(/[A-Za-zç]/g, '');
    formRef.current.setData({ phone: value });
  }

  function viewPhone(type) {
    setViewPhoneType(type);
    if (type === 'password') {
      setViewContact(false);
    } else {
      setViewContact(true);
    }
  }
  useEffect(() => {
    if (appState.modal.isOpened) fillCurrents();
  }, [appState.modal.isOpened]);

  useEffect(() => {
    //const phoneInput = formRef.current.getFieldRef('phone');
    // console.log('------', phoneInput);
    setTimeout(() => {
      // phoneInput.focus();
    }, 100);
  }, []);

  return (
    <ModalBody onCancel={closeModal} headerTitle="Contact">
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <FormBlock
            label={
              isMobile
                ? modalT('contact.fields.phone.labelMobile')
                : modalT('contact.fields.phone.label')
            }
          >
            <InputWithIcon>
              <PhoneInput
                name="phone"
                type={viewPhoneType}
                placeholder={modalT('contact.fields.phone.placeholder')}
                size="medium"
                maxLength="20"
                value={profileState.contactInfo.phone}
                onChange={handleChangePhone}
                autoFocus
              />
              {/* <TextInput
                name="phone"
                type={viewPhoneType}
                placeholder={modalT('contact.fields.phone.placeholder')}
                size="medium"
                maxLength="20"
                value={profileState.contactInfo.phone}
                onChange={handleChangePhone}
                autoFocus
              /> */}
              {isViewContact ? (
                <ReadonlyBtn
                  type="button"
                  onClick={() => viewPhone('password')}
                >
                  <IconSVG name="unEye" size={20} />
                </ReadonlyBtn>
              ) : (
                <ReadonlyBtn type="button" onClick={() => viewPhone('text')}>
                  <IconSVG name="eye" size={20} />
                </ReadonlyBtn>
              )}
            </InputWithIcon>
          </FormBlock>
          {!isPossible ? (
            <ErrorMessagePhone>Enter valid phone number</ErrorMessagePhone>
          ) : (
            ''
          )}
        </Row>
        <Row>
          <FormBlock
            label={
              isMobile
                ? modalT('contact.fields.email.labelMobile')
                : modalT('contact.fields.email.label')
            }
          >
            <TextInput
              name="email"
              type="email"
              placeholder={modalT('contact.fields.email.placeholder')}
              size="medium"
              value={profileState.contactInfo.email}
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
              label={buttonsT('save')}
              loading={loading}
            />
          </BtnGroup>
        </Actions>
      </Form>
    </ModalBody>
  );
};

export default Contact;

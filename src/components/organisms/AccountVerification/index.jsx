import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SignService from '@api/services/sign';
import errorHandle from '@src/utils/error';
import { login } from '@src/utils/auth';
import CodeVerification from '@components/organisms/CodeVerification';
import { useToast } from '@components/molecules/Notification';
import Btn from '@components/molecules/Btn';
import cookie from 'js-cookie';

import {
  CodeTitle,
  CodeDescription,
  Resend,
  CodeFooter,
  SkipContainer,
  SkipTrigger,
  SkipText,
  ButtonContainer,
  CodeWrapper,
} from './style';

const AccountVerification = ({ onSkip, onSuccess, source, modal, data }) => {
  const { t } = useTranslation('signup');

  const [codeLoading, setCodeLoading] = useState(false);
  const [code, setCode] = useState(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const userId = cookie.get(`${process.env.PROJECT_NAME}-userId`);

  useEffect(() => {
    if (data && data.first_name) {
      const conversionObject = {
        debug: 'false',
        parameters: {
          firstname: data.first_name,
          lastname: data.last_name,
          fullname: `${data.first_name} ${data.last_name}`,
          email: data.email,
          phone: data.phone || '',
        },
      };
      if (rrSpace && rrSpace.executeEvent) {
        rrSpace.executeEvent('conversion', conversionObject);
      }
    }
  }, [data]);

  async function resendCode() {
    try {
      SignService.readCredentials();
      const response = await SignService.unauthorizeResendCode(userId);
      if (response.status === 200) {
        toast.add(t('Code has been resent successfully'), 'success');
      }
    } catch (e) {
      showToast(errorHandle(e));
    }
  }

  function validateCode(value) {
    if (value?.length < 6) return;
    setCode(value);
  }

  // function skipCode() {
  //   onSkip();
  // }

  async function codeSubmit() {
    if (!code) {
      // showToast('The code must be longer than 6 digits');
      showToast('Please enter a code first');
      return;
    }

    setCodeLoading(true);
    try {
      SignService.readCredentials();
      const response = await SignService.unauthorizeCodeConfirm(code, userId);
      if (response.status === 201) {
        const { accessToken } = response.data;
        login(accessToken, false, async () => {
          setCodeLoading(false);
          toast.add(t('Account verified successfully'), 'success');
          setTimeout(() => {
            onSuccess();
          }, 100);
        });
      }
    } catch (e) {
      showToast(errorHandle(e));
      setCodeLoading(false);
    }
  }

  return (
    <CodeWrapper small={source === 'verification-modal'}>
      <CodeTitle small={source === 'verification-modal'}>
        {t('step_two.title')}
      </CodeTitle>
      <CodeDescription>{t('step_two.description')}</CodeDescription>
      <CodeVerification onValidate={val => validateCode(val)} />
      <Resend onClick={() => resendCode()} modal={modal}>
        {t('step_two.resend')}
      </Resend>
      <CodeFooter>
        {/* <SkipContainer>
          <SkipTrigger onClick={() => skipCode()}>
            {t('step_two.footer.skip.title')}
          </SkipTrigger>
          <SkipText>{t('step_two.footer.skip.description')}</SkipText>
        </SkipContainer> */}
        <ButtonContainer>
          <Btn
            label={t('step_two.footer.button')}
            handleClick={() => codeSubmit()}
            variant="solidPrimary"
            loading={codeLoading}
            full
          />
        </ButtonContainer>
      </CodeFooter>
    </CodeWrapper>
  );
};

AccountVerification.propTypes = {
  onSkip: PropTypes.func,
  onSuccess: PropTypes.func,
  source: PropTypes.string,
  modal: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.string),
};

AccountVerification.defaultProps = {
  onSkip: () => null,
  onSuccess: () => null,
  source: 'signup',
  modal: false,
  data: null,
};

export default AccountVerification;

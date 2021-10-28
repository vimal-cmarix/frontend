import React, { useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';

import ProfileContext from '@context/profileContext';
import errorHandle from '@src/utils/error';
import ShareService from '@api/services/share';
import Storage from '@utils/storage';

import Page from '@components/templates/Page';
import { Button } from '@components/molecules/Button';
import Brand from '@components/atoms/Brand';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import { useToast } from '@components/molecules/Notification';

import { serverRedirect } from '@utils/general';
import {
  PageWrapper,
  BrandWrapper,
  PageTitle,
  SignInFormWrapper,
  FieldWrapper,
  SignInButtonWrapper,
} from './style';

const Verify = ({ type }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { t: errorMessage } = useTranslation('errorMessages');
  const { dispatch } = useContext(ProfileContext);

  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const [loading, setLoading] = useState(false);

  async function signIn(data) {
    setLoading(true);

    try {
      const res = await ShareService.getShareJobCardValid(
        slug,
        encodeURIComponent(data.code),
      );

      const { content, metadata } = res.data.data;
      const profileData = metadata;
      if (content) {
        Storage.add(`userCode`, data.code);
        Storage.add('userSlug', slug);
        dispatch({ type: 'SET_PROFILE_DATA', profileData });
        window.location.reload();
      }
      setLoading(false);
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        code: Yup.string()
          .min(5)
          .required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      await signIn(data);
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
    <Page
      title={type === 'presentation' ? 'Presentation' : 'View Profile'}
      description={type === 'presentation' ? 'Presentation' : 'View Profile'}
      nav={{ show: false }}
      topbar={{ show: false }}
      loadProfile={false}
    >
      <PageWrapper>
        <BrandWrapper>
          <Brand size="large" />
        </BrandWrapper>
        <PageTitle>
          {type === 'presentation' ? 'Presentation' : 'Private Profile'}
        </PageTitle>
        <SignInFormWrapper>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <FieldWrapper>
              <FormBlock label="Enter password to verify">
                <TextInput
                  style={{ textAlign: 'center' }}
                  name="code"
                  placeholder="Ex: 123456"
                  size="medium"
                  maxLength="5"
                />
              </FormBlock>
            </FieldWrapper>

            <SignInButtonWrapper>
              <Button
                label="Verify"
                type="submit"
                size="medium"
                handleClick={() => {}}
                loading={loading}
              />
            </SignInButtonWrapper>
          </Form>
        </SignInFormWrapper>
      </PageWrapper>
    </Page>
  );
};

Verify.propTypes = {
  type: PropTypes.string,
};

Verify.defaultProps = {
  type: 'private',
};

Verify.getInitialProps = async ctx => {
  const { query } = ctx;
  const { slug } = query;

  if (!slug) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/');
    } else {
      Router.push('/');
    }
  }

  return {};
};

export default Verify;

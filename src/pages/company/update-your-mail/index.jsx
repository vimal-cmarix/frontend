import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SignService from '@src/api/services/sign';
import errorHandle from '@src/utils/error';
import { login } from '@src/utils/auth';
import { useToast } from '@components/molecules/Notification';
import cookie from 'js-cookie';
import { cdn } from '@utils/general';
import { Form } from '@unform/web';
import TextInput from '@components/molecules/TextInput';
import { useRouter } from 'next/router';
import Page from '@components/templates/Page';
import AuthHeaderB2B from '@components/organisms/authheaderB2B';
import * as Yup from 'yup';

import ProfileService from '@api/services/profile';
import {
  Label,
  BoxFormSection,
  BoxFormWrap,
  ConfirmMail,
  MainPageDivision,
  BoxWrapOuter,
  BoxFormTitle,
  BoxFormBody,
  FormGroup,
  UpdateEmilNote,
  BoxFormAction,
} from './style';

const confirmMail = ({ onSkip, onSuccess, source, modal, data, success }) => {
  const { t } = useTranslation('signup');
  const router = useRouter();
  const formRef = useRef(null);
  const [codeLoading, setCodeLoading] = useState(false);
  const [code, setCode] = useState(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const userId = cookie.get(`${process.env.PROJECT_NAME}-userId`);
  const [loading, setLoading] = useState(false);
  const { t: errorMessage } = useTranslation('errorMessages');
  //const toast = useToast();
  //const showToast = msg => toast.add(msg, 'error');
  //const formRef = useRef(null);
  const formInfoRef = useRef(null);
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
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

  // async function codeSubmit(datas) {
  //   console.log('code', code, datas);
  //   setCode(datas.confirm_code);
  //   //code = datas.confirm_code;
  //   if (!code) {
  //     console.log('code', code);
  //     // showToast('The code must be longer than 6 digits');
  //     showToast('Please enter a code first');
  //     return;
  //   }

  //   setCodeLoading(true);
  //   try {
  //     SignService.readCredentials();
  //     const userDetail = JSON.parse(localStorage.getItem('userDetail'));
  //     if (userId === undefined) {
  //       userId = userDetail.id;
  //     }
  //     console.log('userid', userId);
  //     const response = await SignService.unauthorizeCodeConfirmNew(
  //       code,
  //       userId,
  //     );
  //     if (response.status === 201) {
  //       const { accessToken } = response.data;
  //       login(accessToken, false, async () => {
  //         setCodeLoading(false);
  //         toast.add(t('Account verified successfully'), 'success');
  //         setTimeout(() => {
  //           onSuccess();
  //           localStorage.setItem('success', true);
  //           if (success === true) {
  //             router.push('/company/profile-change-password-');
  //           }
  //           router.push('/company/profile-personal-info');
  //         }, 100);
  //       });
  //     }
  //   } catch (e) {
  //     showToast(errorHandle(e));
  //     setCodeLoading(false);
  //   }
  // }

  async function saveEmail(emailData) {
    setLoading(true);

    try {
      const userIds = userId;
      const userdetails = JSON.parse(localStorage.getItem('userDetail'));
      userdetails.email = emailData.email;
      localStorage.setItem('userDetail', JSON.stringify(userdetails));
      const res = await ProfileService.updateEmail(userIds, emailData);

      setLoading(false);

      if (res.status === 200) {
        toast.add(t('Update Email successfully'), 'success');
        router.push('/company/confirm-mail');
        //logout();
      } else {
        toast.add(t('Something went wrong!'), 'error');
      }
    } catch (e) {
      toast.add(t(e.data.message[0].constraints.DUP_ENTRY), 'error');
      //showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function updateInfo(datas) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
      });

      await schema.validate(datas, {
        abortEarly: false,
      });
      await saveEmail(datas);
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

  const confirmMailupdatepage = () => (
    <>
      <MainPageDivision>
        <AuthHeaderB2B />
        <BoxFormSection>
          <BoxWrapOuter>
            <BoxFormWrap>
              <ConfirmMail>
                <BoxFormTitle>
                  <h2>Update email</h2>
                </BoxFormTitle>
                <Form onSubmit={updateInfo} ref={formRef}>
                  <BoxFormBody>
                    <UpdateEmilNote>
                      Update your email address to get a verification code
                    </UpdateEmilNote>

                    <FormGroup>
                      <Label>Email Address</Label>
                      <TextInput
                        placeholder="Email Address"
                        id="confirmed"
                        className="form-control"
                        type="email"
                        name="email"
                        //onChange={validateCode}
                      />
                    </FormGroup>
                  </BoxFormBody>
                  <BoxFormAction>
                    <button type="submit" className="btn action-btn">
                      Send instructions
                    </button>
                  </BoxFormAction>
                </Form>
              </ConfirmMail>
            </BoxFormWrap>
          </BoxWrapOuter>
        </BoxFormSection>
      </MainPageDivision>
    </>
  );

  const content = confirmMailupdatepage();

  return (
    <Page
      title="Admin Team Member"
      description="Admin Team Member Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

confirmMail.propTypes = {
  onSkip: PropTypes.func,
  onSuccess: PropTypes.func,
  source: PropTypes.string,
  modal: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.string),
};

confirmMail.defaultProps = {
  onSkip: () => null,
  onSuccess: () => null,
  source: 'signup',
  modal: false,
  data: null,
};

export default confirmMail;

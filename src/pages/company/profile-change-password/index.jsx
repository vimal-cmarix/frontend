import React, { useRef, useState, useContext, useEffect } from 'react';
// import notificationBell from '@src/assets/images/notification.png';
import Page from '@components/templates/Page';
import Link from 'next/link';
// import handsMail from '@src/assets/images/Hands-Mail.svg';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import ProfileService from '@api/services/profile';
import AppContext from '@context/appContext';
import TextInput from '@components/molecules/TextInput';
import UserService from '@api/services/user';
// import hidePwdImg from '@src/assets/images/eye-off.svg';
// import showPwdImg from '@src/assets/images/eye-open.svg';
import { cdn } from '@utils/general';
import { withAuthSync, login, logout } from '@src/utils/auth';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { useRouter } from 'next/router';
import HeaderB2B from '@components/organisms/headerB2B';
import SignService from '@api/services/sign';
import Btn from '@components/molecules/Btn';
//import { logout } from '@utils/auth';
//import { login } from '@src/utils/auth';
import {
  OuterMostWrapper,
  Label,
  ProfileSectionWrap,
  ProfileLeftsideMenu,
  ProfileRightPanel,
  ProfileBoxForm,
  ProfileBoxHead,
  BoxFormWrap,
  FormGroup,
  ProfileBoxAction,
  ErrorMessagePhone,
  PhoneComponent,
  ShowHidePassword,
  ModalStyle,
} from './style';

const ProfileChangePassword = () => {
  const router = useRouter();
  //const [value, setValue] = useState();
  //const toast = useToast();
  // const showToast = msg => toast.add(msg, 'error');
  //let userId = cookie.get(`${process.env.PROJECT_NAME}-userId`);
  const [isPossible, setIsPossibleValue] = useState(true);
  const [oldPwd, setOldPwd] = useState('');
  const [isRevealOldPwd, setIsRevealOldPwd] = useState(false);
  const [newPwd, setNewPwd] = useState('');
  const [isRevealNewPwd, setIsRevealNewPwd] = useState(false);
  const [cnfPwd, setCnfPwd] = useState('');
  const [isRevealCnfPwd, setIsRevealCnfPwd] = useState(false);
  const [emailValue, setEmailValue] = useState(true);
  const [modalShowcontune, setcontuneModalShow] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const { t } = useTranslation('modals');
  const { t: buttonT } = useTranslation('buttons');
  const { t: errorMessage } = useTranslation('errorMessages');
  const [codeLoading, setCodeLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [confirmCode, setConfirmCode] = useState('');
  const [showCheck, setShowCheck] = useState(false);
  const { dispatch: appDispatch } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const formRef = useRef(null);
  const formInfoRef = useRef(null);
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  let userdetails = [];
  const [firstName, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState('');

  const fill = fun => useEffect(fun, []);
  fill(() => {
    // const success = localStorage.getItem('success');
    // if (success === true) {
    //   const response = JSON.parse(localStorage.getItem('res'));
    //   localStorage.setItem('userDetail', JSON.stringify(response));
    // }
    userdetails = JSON.parse(localStorage.getItem('userDetail'));
    console.log('data...', userdetails.email);
    setFirstname(userdetails.firstName);
    setEmail(userdetails.email);
    setPhone(userdetails.phone);
    setUserId(userdetails.id);
    //const res = ProfileService.getProfileNew(userId);
    //console.log('res', res);
  });

  async function resendCode() {
    try {
      SignService.readCredentials();
      const response = await SignService.unauthorizeResendCodeNew(userId);
      if (response.status === 200) {
        toast.add(t('Code has been resent successfully'), 'success');
      }
    } catch (e) {
      showToast(errorHandle(e));
    }
  }

  function setVal(e) {
    setIsPossibleValue(true);
  }
  let confirmCodes = '';
  function validateCode(e) {
    //value = e.target.value;
    console.log('value', e.target.value, userId);
    if (e.target.value?.length < 6) return;
    confirmCodes = e.target.value;
    console.log('confirmcode', confirmCodes);
    //setConfirmCode(e.target.value);
  }

  function clearErrors() {
    return formRef.current.setErrors({});
  }

  function resetForm() {
    return formRef.current.reset();
  }

  function onchangeEmailValue() {
    setEmailValue(true);
  }

  async function handleChange(e) {
    // const call = JSON.parse(localStorage.getItem('confirmPassword'));
    // if (call) {
    const data = formRef.current.getData();
    clearErrors();

    const schema = Yup.object().shape({
      current_password: Yup.string()
        .min(8)
        .required(),
      new_password: Yup.string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        )
        .min(8)
        .required(),
      confirm_new_password: Yup.string()
        .min(8)
        .oneOf([Yup.ref('new_password'), null])
        .required(),
    });
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
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

  function closeModal() {
    clearErrors();
    resetForm();
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  async function Save(data) {
    console.log('ddd....', data, userId);
    setLoading(true);

    try {
      const userIds = userId;
      const res = await ProfileService.updatePersonalInfo(userIds, data);
      console.log('responses', res);
      //localStorage.setItem('res', JSON.stringify(res.data));
      localStorage.setItem('userDetail', JSON.stringify(res.data));
      setLoading(false);

      if (res.status === 200) {
        const companyProfile = JSON.parse(
          localStorage.getItem('companyProfile'),
        );
        console.log('com', companyProfile);
        const userDet = JSON.parse(localStorage.getItem('userDetail'));

        console.log('success', email, userDet.email);
        if (email !== userDet.email) {
          logout();
        }
        //setModalShow(true);
        toast.add(t('Update Info successfully'), 'success');

        //logout();
        //localStorage.setItem('success', false);
        //router.push('/confirmmail-new');
      }
    } catch (e) {
      if (e.status === 409) {
        toast.add(t('The Email already exists'), 'error');
      }
      //showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function codeSubmit() {
    //console.log('code', code, datas);
    ///setCode(datas.confirm_code);
    //code = datas.confirm_code;
    if (!confirmCodes) {
      //console.log('code', code);
      // showToast('The code must be longer than 6 digits');
      showToast('Please enter a code first');
      return;
    }

    setCodeLoading(true);
    try {
      SignService.readCredentials();
      const userDetail = JSON.parse(localStorage.getItem('userDetail'));
      if (userId === undefined) {
        setUserId(userDetail.id);
      }
      console.log('userid', userId);
      //router.push('/company/dashboard');
      const response = await SignService.unauthorizeCodeConfirmNew(
        confirmCodes,
        userId,
      );
      //if (response.status === 201) {
      if (response.data.accessToken) {
        const { accessToken } = response.data;
        login(accessToken, false, async () => {
          setCodeLoading(false);
          toast.add(t('Account verified successfully'), 'success');
          setTimeout(() => {
            //onSuccess();
            localStorage.setItem('success', true);
            if (response.data.accessToken) {
              //router.push('/company/about');
            }
            //router.push('/profile-personal-info-new');
          }, 100);
        });
      }
    } catch (e) {
      showToast(errorHandle(e));
      setCodeLoading(false);
    }
  }
  //let showChecks = false;

  function getCheckValue(value) {
    console.log('val', value);
    if (value) {
      setShowCheck(false);
      //showChecks = false;
      console.log('show', showCheck);
    } else {
      setShowCheck(true);
      //showChecks = true;
      //console.log('shodw', showChecks);
    }
  }

  async function updateInfo(data) {
    console.log('data....', data, phone);
    const newData = data;
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      if (newData.email === '') {
        setEmailValue(false);
      }
      // if (value === undefined) {
      //   setIsPossibleValue(true);
      // }
      //console.log('val', value);
      // if (phone !== undefined) {
      //   if (!phone) {
      //     // setIsPossibleValue(false);
      //   } else {
      //     //const status = value && isPossiblePhoneNumber(value);
      //     // const status =
      //     //   phone && isValidPhoneNumber(phone) && isPossiblePhoneNumber(phone);
      //     // setIsPossibleValue(status);
      //     // if (status) {
      //     //   setIsPossibleValue(true);
      //     // } else {
      //     //   setIsPossibleValue(false);
      //     // }
      //   }
      // } else {
      //   //console.log('phoi', value);
      //   setIsPossibleValue(false);
      // }
      if (phone !== undefined) {
        newData.phone = phone;
      } else {
        newData.phone = '';
      }
      await Save(newData);
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        phone: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      // if (phone !== undefined) {
      //   // const status =
      //   //   phone && isValidPhoneNumber(phone) && isPossiblePhoneNumber(phone);
      //   // setIsPossibleValue(status);
      //   // if (status) {
      //   //   Object.assign(data, { phone });
      //   //   await Save(data);
      //   // }
      // } else {
      //   setIsPossibleValue(false);
      //   console.log('isposs', isPossible);
      //   // if (isPossible) {
      //   //   Object.assign(data, { phone: value });
      //   //   //await Save(data);
      //   // }
      // }
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

  async function submit(data) {
    console.log('data....', data);
    setLoading(true);

    const schema = Yup.object().shape({
      current_password: Yup.string()
        .min(8)
        .required(),
      new_password: Yup.string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        )
        .min(8)
        .required(),
      confirm_new_password: Yup.string()
        .min(8)
        .oneOf([Yup.ref('new_password'), null])
        .required(),
    });

    try {
      clearErrors();

      await schema.validate(data, {
        abortEarly: false,
      });

      const passwordChanged = await UserService.changePasswordNew(data);

      if (passwordChanged) showSuccess(t('change_password.success'));

      setLoading(false);
      closeModal();
    } catch (e) {
      const validationErrors = {};

      if (e instanceof Yup.ValidationError) {
        e.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });

        formRef.current.setErrors(validationErrors);
      } else {
        showError(errorHandle(e));
      }
      setLoading(false);
    }
  }

  function MycontinuedModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        className="verify-email-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <style>
          {`
            .verify-email-modal .modal-dialog {
              max-width: 100%;
              width: 684px;
              letter-spacing: 0;
            }
            .verify-email-modal .modal-content {
              background: #FFFFFF;
              border-radius: 10px;
              border: none;
            }
          `}
        </style>
        <ModalStyle>
          {/* <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header> */}
          <Modal.Body className="p-0">
            <div className="header">
              <h3>Confirm your email</h3>
              <p>We sent a code to {email}</p>
              <a href="/company/profile-change-password">
                Not my email address
              </a>
            </div>
            <Form onSubmit={codeSubmit} ref={formRef} className="verify_mail">
              <FormGroup className="mb-16">
                <Label>Verify code</Label>
                <input
                  placeholder="Enter Code"
                  id="confirmed"
                  className="form-control"
                  type="number"
                  name="confirm"
                  maxLength="6"
                  onChange={validateCode}
                />
              </FormGroup>
              <a
                className="notreceived"
                href="/company/profile-change-password"
              >
                Didn&apos;t receive a code?
              </a>
              <div className="agreements">
                <div className="list_one">
                  <input
                    id="agree"
                    type="checkbox"
                    className="checkbox"
                    name="accept"
                    checked={showCheck}
                    onChange={e => setShowCheck(e.target.checked)}
                  />
                  <Label htmlFor="agree">
                    By clicking verify you agree to{' '}
                    <a href="/company/profile-change-password">Terms of Use</a>{' '}
                    and{' '}
                    <a href="/company/profile-change-password">
                      Privacy Policy
                    </a>
                    .
                  </Label>
                </div>
              </div>
              <button
                type="submit"
                disabled={!showCheck}
                className="btn action-btn violet_btn w-100"
                //onClick={e => codeSubmit}
              >
                Verify
              </button>
            </Form>
          </Modal.Body>
        </ModalStyle>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        className="verify-email-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <style>
          {`
            .verify-email-modal .modal-dialog {
              max-width: 100%;
              width: 684px;
              letter-spacing: 0;
            }
            .verify-email-modal .modal-content {
              background: #FFFFFF;
              border-radius: 10px;
              border: none;
            }
          `}
        </style>
        <ModalStyle>
          {/* <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            {/* <img src={handsMail} alt="" /> */}
            <img
              src={cdn('/static/img/images/Hands-Mail.svg')}
              alt="Hands-Mail"
            />
            <div className="verify-mail">
              <h4>Verify your email to continue</h4>
              <p>
                We sent a confirmation email to <br /> <span>{email}</span>
              </p>
            </div>
            <div className="change-resend">
              <p>
                You can{' '}
                <Link href="/company/profile-change-password">
                  change your email address.
                </Link>
              </p>
              <span className="small">or</span>
              <button
                type="button"
                onClick={() => resendCode()}
                className="link-btn"
              >
                resend confirmation email
              </button>
            </div>

            <button
              type="button"
              className="btn action-btn"
              data-toggle="modal"
              data-target="#confirmMail"
              onClick={() => setcontuneModalShow(true)}
            >
              Continue
            </button>
          </Modal.Body>
        </ModalStyle>
      </Modal>
    );
  }

  const rightContent = () => (
    <OuterMostWrapper>
      <HeaderB2B />

      <ProfileSectionWrap>
        <ProfileLeftsideMenu>
          <h2>Profile</h2>
          <ul>
            <li>
              <Link href="/company/profile-personal-info">
                <a href="/company/profile-personal-info">
                  Personal Info
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 13L7 7L1 1"
                      stroke="#1D242F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/company/profile-access-setting">
                <a href="/company/profile-access-setting">
                  Access Settings
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 13L7 7L1 1"
                      stroke="#1D242F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Link>
            </li>
            <li className="active">
              <Link href="/company/profile-change-password">
                <a href="/company/profile-change-password">
                  Security
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 13L7 7L1 1"
                      stroke="#1D242F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Link>
            </li>
          </ul>
        </ProfileLeftsideMenu>

        <ProfileRightPanel>
          <ProfileBoxForm>
            <ProfileBoxHead>
              <h2>Update Info</h2>
            </ProfileBoxHead>
            <div className="profile-box-form-body">
              <BoxFormWrap>
                <Form onSubmit={updateInfo} ref={formRef}>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label>
                          Email <span className="req-star">*</span>
                        </Label>
                        <TextInput
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          key={email}
                          onChange={onchangeEmailValue}
                        />
                        {!emailValue ? (
                          <ErrorMessagePhone>
                            Email is required
                          </ErrorMessagePhone>
                        ) : (
                          ''
                        )}
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label>Phone number </Label>
                        <PhoneComponent className="phone-group">
                          <PhoneInput
                            placeholder={t('XXX-XXX-XXXX')}
                            name="phone"
                            size="medium"
                            maxLength="15"
                            onFocus={setVal}
                            onChange={setPhone}
                            value={phone}
                            className="form-control"
                          />
                          {/* {!isPossible ? (
                            <ErrorMessagePhone>
                              Enter valid phone number
                            </ErrorMessagePhone>
                          ) : (
                            ''
                          )} */}
                        </PhoneComponent>
                        {/* <input
                          type="text"
                          className="form-control"
                          placeholder="XXX-XXX-XXXX"
                        /> */}
                      </FormGroup>
                    </div>
                  </div>

                  <ProfileBoxAction>
                    {/* <button type="submit" className="btn action-btn">
                      Save changes
                    </button> */}

                    {/* <button
                      type="submit"
                      className="btn action-btn"

                      // data-toggle="modal"
                      // data-target="#sendInvite"
                      //onClick={() => setModalShow(true)}
                      // onClick={e => changeClassName()}
                    >
                      Save changes
                    </button> */}
                    <Btn
                      label="Save changes"
                      type="submit"
                      // variant="outlinePrimary"
                      //handleClick={handleSubmit}
                      loading={loading}
                      className="btn action-btn"
                      rounded="lg"
                    />
                  </ProfileBoxAction>
                </Form>
              </BoxFormWrap>
            </div>
          </ProfileBoxForm>

          <ProfileBoxForm className="mt-32">
            <ProfileBoxHead>
              <h2>Change Password</h2>
            </ProfileBoxHead>
            <div className="profile-box-form-body">
              <BoxFormWrap className="profile-change-password">
                <Form onSubmit={submit} ref={formRef}>
                  <div className="row">
                    <div className="col-md-8">
                      <FormGroup className="mb-40">
                        <Label>
                          Old Password <span className="req-star">*</span>
                        </Label>
                        <TextInput
                          name="current_password"
                          className="form-control"
                          placeholder={t(
                            'change_password.placeholders.current_password',
                          )}
                          size="medium"
                          type={isRevealOldPwd ? 'text' : 'password'}
                          value={oldPwd}
                          autocomplete="current-password"
                          onChange={handleChange}
                        />
                        <ShowHidePassword
                          onClick={() =>
                            setIsRevealOldPwd(prevState => !prevState)
                          }
                        >
                          <img
                            title={
                              isRevealOldPwd ? 'Show password' : 'Hide password'
                            }
                            src={
                              isRevealOldPwd
                                ? cdn('/static/img/images/eye-open.svg')
                                : cdn('/static/img/images/eye-off.svg')
                            }
                            alt="eye"
                          />
                        </ShowHidePassword>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <FormGroup className="mb-40">
                        <Label>
                          New Password <span className="req-star">*</span>
                        </Label>
                        <TextInput
                          name="new_password"
                          className="form-control"
                          size="medium"
                          placeholder={t(
                            'change_password.placeholders.new_password',
                          )}
                          type={isRevealNewPwd ? 'text' : 'password'}
                          value={newPwd}
                          autocomplete="new-password"
                          onChange={handleChange}
                        />
                        <ShowHidePassword
                          onClick={() =>
                            setIsRevealNewPwd(prevState => !prevState)
                          }
                        >
                          <img
                            title={
                              isRevealNewPwd ? 'Show password' : 'Hide password'
                            }
                            src={
                              isRevealNewPwd
                                ? cdn('/static/img/images/eye-open.svg')
                                : cdn('/static/img/images/eye-off.svg')
                            }
                            alt="eye"
                          />
                        </ShowHidePassword>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-8">
                      <FormGroup className="mb-40">
                        <Label>
                          Confirm Password <span className="req-star">*</span>
                        </Label>

                        <TextInput
                          name="confirm_new_password"
                          className="form-control"
                          size="medium"
                          placeholder={t(
                            'change_password.placeholders.confirm_new_password',
                          )}
                          type={isRevealCnfPwd ? 'text' : 'password'}
                          value={cnfPwd}
                          autocomplete="new-password"
                          onChange={handleChange}
                        />
                        <ShowHidePassword
                          onClick={() =>
                            setIsRevealCnfPwd(prevState => !prevState)
                          }
                        >
                          <img
                            title={
                              isRevealCnfPwd ? 'Show password' : 'Hide password'
                            }
                            src={
                              isRevealCnfPwd
                                ? cdn('/static/img/images/eye-open.svg')
                                : cdn('/static/img/images/eye-off.svg')
                            }
                            alt="eye"
                          />
                        </ShowHidePassword>
                      </FormGroup>
                    </div>
                  </div>

                  <ProfileBoxAction>
                    {/* <button type="submit" className="btn action-btn">
                      Save Password
                    </button> */}
                    <Btn
                      label="Save Password"
                      type="submit"
                      loading={loading}
                      className="btn action-btn"
                      rounded="lg"
                    />
                  </ProfileBoxAction>
                </Form>
              </BoxFormWrap>
            </div>
          </ProfileBoxForm>
        </ProfileRightPanel>
      </ProfileSectionWrap>
    </OuterMostWrapper>
  );

  const content = rightContent();
  return (
    <>
      <Page
        title="Profile Personal Info"
        description="Profile Personal Info Page"
        nav={{ show: false }}
        topbar={{ show: false }}
      >
        {content}
      </Page>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <MycontinuedModal
        show={modalShowcontune}
        onHide={() => setcontuneModalShow(false)}
      />
    </>
  );
};

export default withAuthSync(ProfileChangePassword);

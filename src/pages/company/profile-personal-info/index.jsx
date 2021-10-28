import React, { useRef, useState, useContext, useEffect } from 'react';
import moment from 'moment';
import FileUploadModal from '@components/molecules/FileUploadModal';
import Btn from '@components/molecules/Btn';
import { withAuthSync } from '@src/utils/auth';
import Link from 'next/link';
// import uploadIcon from '@src/assets/images/upload-cloud.svg';
// import trashIcon from '@src/assets/images/trash-white-icon.svg';
import Page from '@components/templates/Page';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import ProfileService from '@api/services/profile';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import TextInput from '@components/molecules/TextInput';
import CustomDatePicker from '@components/molecules/CustomDatePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-number-input/style.css';
import { cdn } from '@utils/general';
import { Dropdown } from 'react-bootstrap';
import HeaderB2B from '@components/organisms/headerB2B';
import LeftbarB2B from '@components/organisms/LeftbarProfilePage';
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import {
  OuterMostWrapper,
  SecondaryHeader,
  SecondaryWrapper,
  Label,
  ProfileSectionWrap,
  ProfileLeftsideMenu,
  ProfileRightPanel,
  ProfileBoxForm,
  ProfileBoxHead,
  BoxFormWrap,
  UploadPicture,
  UploadPictureField,
  PictureDelete,
  Row,
  FormGroup,
  ProfileBoxAction,
  ErrorMessagePhone,
  PhoneComponent,
} from './style';
import ProfileTopBar from '../../profile-topbar-new';

const ProfilePersonalInfo = ({ previewMode = true, jwt }) => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: modalT } = useTranslation('modals');
  const { t: signupT } = useTranslation('signup');
  const { t: buttonsT } = useTranslation('buttons');
  const [values, onChange] = useState(new Date());

  const [value, setValue] = useState();
  const [isPossible, setIsPossibleValue] = useState(true);
  //const [imgsrc, setImgSrc] = useState('');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );
  const [imgsrc, setImgSrc] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showUploadModalvideo, setShowUploadModalvideo] = useState(false);
  const [dob, setDob] = useState('');
  const [startDate, setStartDate] = useState('');
  // const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState('');
  const [profilesId, setProfileId] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [prefferedPronoun, setPrefferedPronoun] = useState('');
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [positionBtn, setPositionBtn] = useState(false);
  const [dateVal, setDateVal] = useState('');
  const formRef = useRef(null);

  let userdetails = [];
  //let addGender = '';
  const fill = fun => useEffect(fun, []);
  fill(() => {
    userdetails = JSON.parse(localStorage.getItem('userDetail'));
    console.log(userdetails, '...');
    console.log('data...', userdetails.firstName);
    setFirstname(userdetails.firstName);
    setLastname(userdetails.lastName);
    setEmail(userdetails.email);
    setPhone(userdetails.phone);
    setAddress(userdetails.address);
    setPrefferedPronoun(userdetails?.preferredPronoun);
    //moment(e).format('MMM. D, yyyy');
    setDob(moment(userdetails.dob).format('MMM. D, yyyy'));
    console.log('dob', userdetails.dob);
    setDateVal(userdetails.dob);
    //const dateVal = userdetails.dob;
    //setStartDate(userdetails.dob);

    setPosition(userdetails.position);
    console.log('bn', userdetails.position);
    if (
      userdetails.position === null ||
      userdetails.position === '' ||
      userdetails.position === undefined
    ) {
      console.log('btn');
      setPositionBtn(false);
    } else {
      setPositionBtn(true);
    }
    setProfileId(userdetails.id);
    //setPrefferedPronoun(userdetails.)
    setImgSrc(userdetails.photoUrl);
    //console.log('firstname', firstName);
  });

  function checkPosition(e) {
    console.log('val', e.target.value);
    const positionValue = e.target.value;
    if (positionValue === '') {
      setPositionBtn(false);
    } else {
      setPositionBtn(true);
    }
  }
  async function handleChange(e) {
    const call = localStorage.getItem('profileInfo');
    console.log('e', e.target.value, call);
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
    if (call) {
      console.log('call');
      const data = formRef.current.getData();
      try {
        // Remove all previous errors
        //console.log('data', data);
        formRef.current.setErrors({});
        if (value !== undefined) {
          if (!value) {
            setIsPossibleValue(false);
          } else {
            const status =
              value &&
              isValidPhoneNumber(value) &&
              isPossiblePhoneNumber(value);
            setIsPossibleValue(status);
            if (status) {
              setIsPossibleValue(true);
            } else {
              setIsPossibleValue(false);
            }
          }
        }
        const schema = Yup.object().shape({
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          phone: Yup.string(),
          // gender: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // Validation passed
        data.phone = value;
        //await signUp(data);
      } catch (err) {
        //console.log('error', err);
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
    //formRef.current.setErrors({});
    //formRef.current.getErrors();
  }

  const onUploadSuccess = async res => {
    setShowUploadModalvideo(false);
    setImgSrc(res);
  };

  function setVal(e) {
    //console.log('SETVAL', e.target.value);
    setIsPossibleValue(true);
  }

  // async function onSelectGender(e) {
  //   console.log('gender', e.target.value);
  //   setGender(e.target.value);
  // }

  async function onPrefferedPro(e) {
    console.log('gender', e.target.value);
    setPrefferedPronoun(e.target.value);
  }

  async function save(data) {
    //console.log('ddd....', data, profilesId);
    setLoading(true);

    try {
      const profileId = profilesId;
      const res = await ProfileService.setPersonalNew(profileId, data);
      console.log('response', res.data);
      localStorage.setItem('userDetail', JSON.stringify(res.data));

      setLoading(false);

      if (res.status === 200) {
        profileDispatch({
          type: 'SET_PERSONAL',
          personalInfo: data,
        });

        //closeModal();
        showSuccess(modalT('Personal info updated successfully'));
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function handleDate(e) {
    console.log('date', e);
    setStartDate(e);
    const dateString = moment(e).format('MMM. D, yyyy');
    setDob(dateString);
  }

  async function handleSubmit(data) {
    console.log('value......', startDate);
    //companyProfile.logoUrl = imgsrc;
    // console.log('url', imgsrc);
    // Object.assign(data, { photoUrl: imgsrc });
    console.log('value......', dateVal);
    //data.assign(photoUrl:imgsrc);
    //const dateString = moment(startDate).format('DD/MM/YYYY');
    let dateString;
    // if (startDate === '' && startDate === null && startDate === undefined) {
    //   dateString = dateVal;
    // } else {
    //   dateString = startDate;
    // }
    console.log('dateString......', dateString);
    localStorage.setItem('profileInfo', true);
    const userDetail = JSON.parse(localStorage.getItem('userDetail'));
    //console.log('userdetail', data.firstName);
    if (imgsrc === undefined) {
      Object.assign(data, { photoUrl: userDetail.photoUrl });
    } else {
      Object.assign(data, { photoUrl: imgsrc });
    }
    if (prefferedPronoun === undefined) {
      Object.assign(data, { preferredPronoun: userDetail.PrefferedPronoun });
    } else {
      Object.assign(data, { preferredPronoun: prefferedPronoun });
    }
    if (data.firstName === undefined) {
      Object.assign(data, { firstName: userDetail.firstName });
    }
    if (data.lastName === undefined) {
      Object.assign(data, { lastName: userDetail.lastName });
    }
    if (data.email === undefined) {
      Object.assign(data, { email: userDetail.email });
    }
    if (data.address === undefined) {
      Object.assign(data, { address: userDetail.address });
    }
    if (data.position === undefined) {
      Object.assign(data, { position: userDetail.position });
    }
    if (data.phone === undefined) {
      Object.assign(data, { phone: userDetail.phone });
    }
    if (value !== undefined) {
      console.log('value', value);
      Object.assign(data, { phone: value });
      setValue(userDetail.phone);
    }
    if (data.dob === undefined) {
      console.log('dob', data.dob);
      if (startDate === '') {
        Object.assign(data, { dob: dateVal });
      } else {
        Object.assign(data, { dob: startDate });
      }
    }
    // if (gender === undefined) {
    //   Object.assign(data, { gender: userDetail.gender });
    // } else {
    //   Object.assign(data, { gender });
    // }
    try {
      // Remove all previous errors
      console.log('try');
      formRef.current.setErrors({});
      console.log('val', data);
      if (value !== undefined) {
        if (!value) {
          setIsPossibleValue(false);
        } else {
          //const status = value && isPossiblePhoneNumber(value);
          const status =
            value && isValidPhoneNumber(value) && isPossiblePhoneNumber(value);
          setIsPossibleValue(status);
          if (status) {
            await save(data);
            setIsPossibleValue(true);
          } else {
            setIsPossibleValue(false);
          }
        }
      } else {
        setIsPossibleValue(isPossible);
        if (isPossible) {
          //Object.assign(data, { phone: value });
          await save(data);
        }
      }

      // const schema = Yup.object().shape({
      //   firstName: Yup.string().required(),
      //   lastName: Yup.string().required(),
      //   phone: Yup.string(),
      //   dob: Yup.string(),
      //   gender: Yup.string(),
      //   address: Yup.string().required(),
      //   position: Yup.string().required(),
      // });
      // console.log('schema', value);
      // await schema.validate(data, {
      //   abortEarly: false,
      // });
      // console.log('save call', data);

      // if (value !== undefined) {
      //   const status =
      //     value && isValidPhoneNumber(value) && isPossiblePhoneNumber(value);
      //   setIsPossibleValue(status);
      //   if (status) {
      //     //Object.assign(data, { phone: value });
      //     await save(data);
      //   }
      // } else {
      //   setIsPossibleValue(isPossible);
      //   if (isPossible) {
      //     //Object.assign(data, { phone: value });
      //     await save(data);
      //   }
      // }
      //data.phone = value;
      // Validation passed
      //await save(data);
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

  async function handleSubmitPosition(data) {
    const userDetail = JSON.parse(localStorage.getItem('userDetail'));
    console.log('postion', data);
    setLoadingPosition(true);
    if (data.position === undefined) {
      Object.assign(data, { position: userDetail.position });
    }
    try {
      const res = await ProfileService.setPersonalPosition(profilesId, data);
      setLoadingPosition(false);
      console.log('rres', res);
      localStorage.setItem('userDetail', JSON.stringify(res.data));
      if (res.status === 200) {
        //closeModal();
        showSuccess(modalT('Position info updated successfully'));
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoadingPosition(false);
    }
  }
  const rightContent = () => (
    <OuterMostWrapper>
      <HeaderB2B />
      <ProfileSectionWrap>
        <LeftbarB2B />
        <ProfileRightPanel>
          <ProfileBoxForm>
            <ProfileBoxHead>
              <h2>Personal information</h2>
            </ProfileBoxHead>
            <div className="profile-box-form-body">
              <BoxFormWrap>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <h4>
                    Profile picture{' '}
                    <small>
                      (200 X 200 is recommended size for image upload)
                    </small>
                  </h4>
                  <UploadPicture>
                    {!imgsrc && (
                      <UploadPictureField>
                        <button
                          className="upload-popup-btn"
                          type="button"
                          value=""
                          onClick={e => setShowUploadModalvideo(true)}
                        >
                          Upload file here
                        </button>
                        {/* <img src={uploadIcon} alt="" /> */}
                        <img
                          src={cdn('/static/img/images/upload-cloud.svg')}
                          alt="upload-cloud"
                        />
                      </UploadPictureField>
                    )}
                    {imgsrc && (
                      <>
                        <div className="profile-preview-wrap">
                          <img src={imgsrc} alt="" />
                        </div>
                        <PictureDelete onClick={e => setImgSrc('')}>
                          {/* <img src={trashIcon} alt="trash" /> */}
                          <img
                            src={cdn('/static/img/images/trash-white-icon.svg')}
                            alt="trash-white-icon"
                          />
                        </PictureDelete>
                      </>
                    )}
                  </UploadPicture>

                  {showUploadModalvideo && (
                    <FileUploadModal
                      closeModal={e => setShowUploadModalvideo(e)}
                      onSuccess={onUploadSuccess}
                    />
                  )}

                  <Row>
                    <div className="col-lg-6">
                      <FormGroup>
                        <Label>
                          First name <span className="req-star">*</span>
                        </Label>
                        <TextInput
                          type="text"
                          name="firstName"
                          className="form-control"
                          placeholder="First name"
                          value={firstName}
                          onChange={handleChange}
                          key={firstName}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-lg-6">
                      <FormGroup>
                        <Label>
                          Last name <span className="req-star">*</span>
                        </Label>
                        <TextInput
                          type="text"
                          name="lastName"
                          className="form-control"
                          placeholder="Last name"
                          value={lastName}
                          onChange={handleChange}
                          key={lastName}
                        />
                      </FormGroup>
                    </div>
                  </Row>

                  {/* <Row>
                    <div className="col-lg-6">
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
                          onChange={handleChange}
                          key={email}
                          disabled
                        />
                      </FormGroup>
                    </div>
                    <div className="col-lg-6">
                      <FormGroup>
                        <Label>
                          Phone number <span className="req-star">*</span>
                        </Label>
                        <PhoneComponent className="phone-group">
                          <PhoneInput
                            placeholder="XXX-XXX-XXXX"
                            name="phone"
                            size="medium"
                            className="form-control"
                            maxLength="15"
                            value={phone}
                            key={phone}
                            onFocus={setVal}
                            onChange={setValue}
                          />
                          {!isPossible ? (
                            <ErrorMessagePhone>
                              Enter valid phone number
                            </ErrorMessagePhone>
                          ) : (
                            ''
                          )}
                        </PhoneComponent>
                      </FormGroup>
                    </div>
                  </Row> */}

                  <Row>
                    <div className="col-lg-12">
                      <FormGroup className="date-group">
                        <Label>Date of Birth</Label>
                        {/* <TextInput
                          type="text"
                          name="dob"
                          className="form-control"
                          placeholder="MM/DD/YYYY"
                          value={dob}
                          key={dob}
                        /> */}
                        <DatePicker
                          className="form-control"
                          selected={startDate}
                          onChange={handleDate}
                          //onChange={date => setStartDate(date)}
                          value={dob}
                          key={dob}
                          // dateFormat="YYYY/MM/DD"
                          //dateFormat="MMMM d, yyyy"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                        <i className="date-icon" />
                      </FormGroup>
                    </div>
                    {/* <div className="col-lg-6">
                      <FormGroup className="border-form-group">
                        <Label className="border-group-label">
                          Gender <span className="req-star">*</span>
                        </Label>
                        <select
                          name="gender"
                          className="form-control"
                          value={gender}
                          key={gender}
                          onChange={onSelectGender}
                        >
                          <option disabled>Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </FormGroup>
                    </div> */}
                  </Row>

                  <Row>
                    <div className="col-lg-12">
                      <FormGroup className="border-form-group">
                        <Label className="border-group-label">
                          Preferred Pronoun
                        </Label>
                        <select
                          name="prefferedPronoun"
                          className="form-control"
                          value={prefferedPronoun}
                          key={prefferedPronoun}
                          onChange={onPrefferedPro}
                        >
                          <option>Please Select</option>
                          <option value="She/Her">She/Her</option>
                          <option value="He/Him">He/Him</option>
                          <option value="They/Them">Other</option>
                        </select>
                      </FormGroup>
                    </div>
                    {/* <div className="col-lg-6">
                      <FormGroup className="mb-40">
                        <Label>Position</Label>
                        <TextInput
                          type="text"
                          name="position"
                          className="form-control"
                          placeholder="Position"
                          value={position}
                          key={position}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div> */}
                  </Row>

                  <Row>
                    <div className="col-lg-12">
                      <FormGroup className="mb-40">
                        <Label>Address</Label>
                        <TextInput
                          type="text"
                          name="address"
                          className="form-control"
                          placeholder="Address"
                          value={address}
                          key={address}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div>
                  </Row>

                  <ProfileBoxAction>
                    <Btn
                      label="Update"
                      type="submit"
                      // variant="outlinePrimary"
                      // handleClick={handleSubmit}
                      loading={loading}
                      className="btn action-btn"
                      rounded="lg"
                    />

                    {/* <button type="submit" className="btn action-btn">
                      Update
                    </button> */}
                  </ProfileBoxAction>
                </Form>
              </BoxFormWrap>
            </div>
          </ProfileBoxForm>

          <ProfileBoxForm className="mt-32">
            <ProfileBoxHead>
              <h2>Employment</h2>
            </ProfileBoxHead>
            <Form ref={formRef} onSubmit={handleSubmitPosition}>
              <div className="profile-box-form-body">
                <BoxFormWrap>
                  <Row>
                    <div className="col-lg-12">
                      <FormGroup className="mb-40">
                        <Label>
                          Current Position at this company{' '}
                          {/* <span className="req-star">*</span> */}
                        </Label>
                        <TextInput
                          type="text"
                          className="form-control"
                          placeholder="Position name"
                          name="position"
                          value={position}
                          key={position}
                          onChange={e => checkPosition(e)}
                        />
                      </FormGroup>
                    </div>
                  </Row>

                  <ProfileBoxAction>
                    <Btn
                      label="Update"
                      type="submit"
                      // variant="outlinePrimary"
                      // handleClick={handleSubmit}
                      loading={loadingPosition}
                      className="btn action-btn"
                      rounded="lg"
                      disabled={!positionBtn}
                    />

                    {/* <button type="submit" className="btn action-btn">
                      Update
                    </button> */}
                  </ProfileBoxAction>
                </BoxFormWrap>
              </div>
            </Form>
          </ProfileBoxForm>
        </ProfileRightPanel>
      </ProfileSectionWrap>
    </OuterMostWrapper>
  );

  const content = rightContent();
  return (
    <Page
      title="Profile Personal Info"
      description="Profile Personal Info Page"
      nav={{ show: false }}
      topbar={{ show: false }}
    >
      {content}
    </Page>
  );
};

export default withAuthSync(ProfilePersonalInfo, true);

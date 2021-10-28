import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Link from 'next/link';
import { withAuthSync } from '@src/utils/auth';
import Storage from '@utils/storage';
import Page from '@components/templates/Page';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import cookie from 'js-cookie';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import AboutCompanyService from '@src/api/services/about-company';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { cdn } from '@utils/general';
import DashboardNew from '@src/api/services/dashboard-new';
import FormBlock from '@components/organisms/FormBlock';
import ReactSelect from '@components/molecules/CustomSelect/ReactSelect';
import FileUploadModal from '@components/molecules/FileUploadModal';
import Btn from '@components/molecules/Btn';
import NumberFormat from 'react-number-format';
import AssetService from '@api/services/asset';
import TextInput from '@components/molecules/TextInput';
import {
  Label,
  BoxFormSection,
  UploadVideoBodyp,
  BoxFormWrap,
  BoxFormBody,
  BoxFormTitle,
  BoxFormAction,
  FormGroup,
  UploadVideoWrap,
  UploadVideoBody,
  CheckboxField,
  CompensationLabel,
  CompensationRangeGroup,
  RangeToolTipBody,
  RangeToolTip,
  RangeToolInner,
  Logo,
  Row,
  Wrapper,
  CustomSelect,
  TextCount,
  Hint,
} from './style';

const generalInfo = () => {
  const router = useRouter();
  const companyProfileData =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('companyProfile'))
      : null;
  const additionalCompensation = {};
  let values = false;
  //let companyName = '';
  const [videoSrc, setVideoSrc] = useState('');
  const [videoLink, setVideoLink] = useState(''); // Page AdminCompanyPage-new
  const [previewVideo, setPreviewVideo] = useState('');
  const { t: modalsT } = useTranslation('modals');

  const { t: modalT } = useTranslation('modals');
  const [description, setDescription] = useState('');
  const [characterCount, setCharaterCount] = useState(0);
  const [isLocation, setIsLocationValue] = useState(true);
  const [companyProfile, setCompanyProfile] = useState(companyProfileData);
  const [companyName, setCompanyName] = useState(
    companyProfileData?.companyName || '',
  );
  const [location, setLocation] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [jobTitles, setJobTitle] = useState('');
  const [currencyType, setCurrencyType] = useState('USD');
  const [compStartRange, setCompStartRange] = useState('');
  const [compEndRange, setCompEndRange] = useState('');
  const [compCycle, setCompCycle] = useState('per year');
  const [additionalCompShow, setAdditionalComp] = useState(false);
  const [showUploadModalvideo, setShowUploadModalvideo] = useState(false);
  const [addCurrencyType, setAddCurrencyType] = useState('USD');
  const [addCompStartRange, setAddCompStartRange] = useState('');
  const [addCompEndRange, setAddCompEndRange] = useState('');
  const [addCompCycle, setAddCompCycle] = useState('per year');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmploymentType, setIsEmployementTypeValue] = useState(true);
  const [countrySelected, setCountrySelected] = useState({
    label: modalT('general_info.fields.location.label'),
    value: modalT('general_info.fields.location.label'),
  });
  const [valEmployementError, setValEmployementError] = useState('');
  const [valLocationError, setValLocationError] = useState('');
  const [valWhyJoinUsError, setValWhyJoinUsError] = useState('');
  const [valJobTitleError, setValJobTitleError] = useState('');
  const [valJobLocationError, setValJobLocationError] = useState('');
  const [stateSelected, setStateSelected] = useState({
    label: modalT('general_info.fields.employment.label'),
    value: modalT('general_info.fields.employment.label'),
  });
  const toast = useToast();
  const { t: errorMessage } = useTranslation('errorMessages');
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [profilesId, setProfileId] = useState('');

  const onChangeLinkURL = e => {
    setVideoLink(e.target.value);
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
    const accessToken = cookie.get('sizigi-token');
    if (e.target.value.match(regex)) {
      const response = AssetService.parserLink({
        url: e.target.value.trim(),
        width: 0,
        accessToken,
      });
      response.then(res => {
        const { data } = res;
        if (data.url.includes('twitter.com')) {
          if (data.title.includes('JavaScript')) {
            data.title = 'Description not available.';
          }
        }
        if (data.title || data.description) {
          setPreviewVideo(data.media ? data.media : null);
        } else {
          setPreviewVideo(false);
        }
      });
    } else {
      setPreviewVideo(false);
    }
  };

  const onLinkVideoPreview = url => {
    setVideoLink(url);
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
    const accessToken = cookie.get('sizigi-token');
    if (url.match(regex)) {
      const response = AssetService.parserLink({
        url: url.trim(),
        width: 0,
        accessToken,
      });
      response.then(res => {
        const { data } = res;
        if (data.url.includes('twitter.com')) {
          if (data.title.includes('JavaScript')) {
            data.title = 'Description not available.';
          }
        }
        if (data.title || data.description) {
          setPreviewVideo(data.media ? data.media : null);
        } else {
          setPreviewVideo(false);
        }
      });
    } else {
      setPreviewVideo(false);
    }
  };

  const options = [
    { label: 'In-Office', value: 'In-Office' },
    { label: 'Hybrid', value: 'Hybrid' },
    { label: 'Remote', value: 'Remote' },
  ];

  const optionsEmp = [
    { label: 'Full-time', value: 'Full-time' },
    { label: 'Part-time', value: 'Part-time' },
    { label: 'Contract', value: 'Contract' },
    { label: 'Temporary', value: 'Temporary' },
    { label: 'Volunteer', value: 'Volunteer' },
    { label: 'Internship', value: 'Internship' },
  ];

  const loadData = response => {
    // console.log('newResponse', response);
    if (
      response.company_profile.videoLink &&
      response.company_profile.videoLink !== ''
    ) {
      onLinkVideoPreview(response.company_profile.videoLink);
    }
    const selectedLocation = options.find(
      res => res.value === response.location,
    );
    const selectedEmpType = optionsEmp.find(
      res => res.value === response.employmentType,
    );
    setId(response?.id);
    setJobTitle(response?.jobTitle);
    setCompanyName(response?.company_profile.companyName);
    setCountrySelected({
      label: selectedLocation?.label,
      value: selectedLocation?.value,
    });
    setStateSelected({
      label: selectedEmpType?.label,
      value: selectedEmpType?.value,
    });
    setDescription(response?.company_profile?.content);
    setCharaterCount(response?.company_profile?.content.length);
    setVideoSrc(response?.company_profile?.videoUrl);
    setVideoLink(response?.company_profile?.videoLink);
    setJobLocation(response?.jobLocation);
    // setEmploymentType(response?.employmentType);
    setCurrencyType(response?.compensationRange.currency);
    setCompStartRange(response?.compensationRange.startRange);
    setCompEndRange(response?.compensationRange.endRange);
    setCompCycle(response?.compensationRange.cycle);
    if (response.additionalCompensation.startRange !== '') {
      setAdditionalComp(true);
      const {
        currency,
        cycle,
        endRange,
        startRange,
      } = response.additionalCompensation;
      setAddCurrencyType(currency);
      setAddCompStartRange(startRange);
      setAddCompEndRange(endRange);
      setAddCompCycle(cycle);
    }
  };
  useEffect(() => {
    const getResponse = async () => {
      localStorage.removeItem('generalInfo');
      const jobId = Storage.get('profileId');

      if (!jobId) {
        const companyDetail =
          typeof window !== 'undefined'
            ? JSON.parse(localStorage.getItem('companyProfile'))
            : null;
        // console.log(companyDetail, 'NewDetrail');
        if (companyDetail.videoLink && companyDetail.videoLink !== '') {
          onLinkVideoPreview(companyDetail?.videoLink);
        }
        setCompanyProfile(companyDetail);
        setVideoLink(companyDetail?.videoLink);
        setVideoSrc(companyDetail?.videoUrl);
        setDescription(companyDetail?.content);
        setCharaterCount(companyDetail?.content?.length);
        // setJobLocation(companyDetail?.company_about?.headquarters);
      }

      if (jobId) {
        const res = await DashboardNew.getJobInfo(jobId);
        const { data } = res.data;
        if (data) {
          loadData(data);
        }
      }

      const existingFormData =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('profileuserInformation'))
          : null;
      if (existingFormData) {
        const { data } = existingFormData;
        loadData(data);
      }
    };
    getResponse();
  }, []);
  const formRef = useRef(null);
  let currency = '';
  let cycle = '';
  let startRange = '';
  let endRange = '';
  let currency1 = '';
  let cycle1 = '';
  let startRange1 = '';
  let endRange1 = '';

  function createNoembedMarkup() {
    return { __html: previewVideo };
  }

  const onSubmitForm = async () => {
    setLoading(true);
    try {
      const data = {
        jobTitle: jobTitles,
        location: countrySelected.value,
        jobLocation,
        employmentType: stateSelected.value,
        compensationRange: {
          currency: currencyType,
          cycle: compCycle,
          startRange: compStartRange,
          endRange: compEndRange,
        },
        additionalCompensation: {
          currency: addCurrencyType,
          cycle: addCompCycle,
          startRange: addCompStartRange,
          endRange: addCompEndRange,
        },
        companyMediaInfo: {
          content: description,
          videoUrl: videoSrc,
          videoLink,
        },
      };
      formRef.current.setErrors({});
      if (data.employmentType === 'Employment type') {
        setValEmployementError('Employement Type is required');
      } else {
        setValEmployementError('');
      }
      if (data.location === 'Location') {
        setValLocationError('Location is required');
      } else {
        setValLocationError('');
      }
      if (data.jobTitle === '') {
        setValJobTitleError('Job Title is required');
      } else {
        setValJobTitleError('');
      }
      if (data.jobLocation === '') {
        setValJobLocationError('Job Location is required');
      } else {
        setValJobLocationError('');
      }
      const schema = Yup.object().shape({
        jobLocation: Yup.string().required(),
        jobTitle: Yup.string().required(),
        location: Yup.string().required(),
        employmentType: Yup.string().required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      if (
        data.location !== 'Location' &&
        data.employmentType !== 'Employment type' &&
        data.companyMediaInfo?.content.toString() !== '' &&
        data.jobLocation !== '' &&
        data.jobTitle !== ''
      ) {
        if (id) {
          const res = await AboutCompanyService.updateGeneralInfo(id, data);
          localStorage.setItem(
            'profileuserInformation',
            JSON.stringify(res.data),
          );
          console.log('companyProfile---before', companyProfile);
          companyProfile.videoLink = videoLink;
          companyProfile.videoUrl = videoSrc;
          companyProfile.content = description;
          console.log('companyProfile---after', companyProfile);
          localStorage.setItem(
            'companyProfile',
            JSON.stringify(companyProfile),
          );
          setLoading(false);
          if (res.status === 200) {
            router.push('job-post-second-page');
          }
        } else {
          console.log('NewPost');
          const companyprofile =
            typeof window !== 'undefined'
              ? JSON.parse(localStorage.getItem('companyProfile'))
              : null;
          const profileId = JSON.parse(localStorage.getItem('signupdata'));
          const pid = companyprofile.id || profileId;
          const res = await AboutCompanyService.setGeneralInfo(pid, data);
          localStorage.setItem(
            'profileuserInformation',
            JSON.stringify(res.data),
          );
          companyProfile.videoLink = videoLink;
          companyProfile.videoUrl = videoSrc;
          companyProfile.content = description;
          localStorage.setItem(
            'companyProfile',
            JSON.stringify(companyProfile),
          );
          setLoading(false);
          if (res.status === 201) {
            router.push('/company/job-post-second-page');
          }
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      // showToast(errorHandle(e));
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });
        formRef.current.setErrors(validationErrors);
      }
      setLoading(false);
    }
  };

  async function handleChange(e) {
    const call = JSON.parse(localStorage.getItem('generalInfo'));
    if (call) {
      const data = formRef.current.getData();
      try {
        // Remove all previous errors
        formRef.current.setErrors({});
        if (location === '') {
          setIsLocationValue(false);
        } else {
          setIsLocationValue(true);
        }
        if (employmentType === '') {
          setIsEmployementTypeValue(false);
        } else {
          setIsEmployementTypeValue(true);
        }
        setJobTitle(e.target.value);
        // setJobLocation(e.target.value);
        const schema = Yup.object().shape({
          jobTitle: Yup.string().required(),
          jobLocation: Yup.string().required(),
        });
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
  }

  const onUploadVideo = async res => {
    setShowUploadModalvideo(false);
    setVideoSrc(res);
  };

  async function handleSelectOption(e) {
    // console.log('value', e.target.value, e.target.name);
    if (e.target.name === 'location') {
      setLocation(e.target.value);
      handleChange();
    }
    if (e.target.name === 'employmentType') {
      setEmploymentType(e.target.value);
    }
    if (e.target.name === 'currency') {
      currency = e.target.value;
    }
    if (e.target.name === 'cycle') {
      cycle = e.target.value;
    }
    if (e.target.name === 'startRange') {
      // console.log('endRange', startRange);
      startRange = e.target.value;
    }
    if (e.target.name === 'endRange') {
      endRange = e.target.value;
    }
  }

  async function handleSelectAddOption(e) {
    if (e.target.name === 'currency1') {
      currency1 = e.target.value;
    }
    if (e.target.name === 'cycle1') {
      cycle1 = e.target.value;
    }
    if (e.target.name === 'startRange1') {
      startRange1 = e.target.value;
    }
    if (e.target.name === 'endRange1') {
      endRange1 = e.target.value;
    }
    if (currency1 === '') {
      currency1 = 'USD';
    }
    if (cycle1 === '') {
      cycle1 = 'per year';
    }
    Object.assign(
      additionalCompensation,
      { currency: currency1 },
      { cycle: cycle1 },
      { startRange: startRange1 },
      { endRange: endRange1 },
    );
  }

  async function handleAdditional(e) {
    if (e.target.checked) {
      setAdditionalComp(true);
    } else {
      setAdditionalComp(false);
    }

    if (!e.target.checked) {
      setAddCurrencyType('USD');
      setAddCompCycle('per year');
      setAddCompStartRange('');
      setAddCompEndRange('');
    }
    const { type, checked, value, name } = e.target;
    values = type === 'checkbox' ? checked : value;
  }

  async function Save(data) {
    setLoading(true);

    try {
      const profileId = JSON.parse(localStorage.getItem('signupdata'));
      const res = await AboutCompanyService.setGeneralInfo(profileId, data);
      localStorage.setItem('userDetail', JSON.stringify(res.data));
      setLoading(false);

      if (res.status === 201) {
        router.push('/company/job-post-second-page');
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    // e.preventDefault();
    // console.log('data----', data);
    localStorage.setItem('generalInfo', JSON.stringify(true));
    const compensationRange = {};
    // if (currency === '') {
    //   currency = 'USD';
    // }
    // if (cycle === '') {
    //   cycle = 'per year';
    // }
    // Object.assign(
    //   compensationRange,
    //   { currency },
    //   { cycle },
    //   { startRange },
    //   { endRange },
    // );

    // if (values) {
    //   Object.assign(data, { additionalCompensation });
    // }

    // Object.assign(
    //   data,
    //   { location },
    //   { employmentType },
    //   { compensationRange },
    // );
    // if (data.location === '') {
    //   setIsLocationValue(false);
    // } else {
    //   setIsLocationValue(true);
    // }
    // if (data.employmentType === '') {
    //   setIsEmployementTypeValue(false);
    // } else {
    //   setIsEmployementTypeValue(true);
    // }

    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        jobLocation: Yup.string().required(),
        jobTitle: Yup.string().required(),
        location: Yup.string().required(),
        employmentType: Yup.string().required(),
      });

      // await schema.validate(data, {
      //   abortEarly: false,
      // });

      // Validation passed
      // await Save(data);
    } catch (err) {
      console.log('@@@@@@@@@', err);
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
  async function handleEmployementError(e) {
    if (e?.value === 'Employment type') {
      setValEmployementError('Employement Type is required');
    } else {
      setValEmployementError('');
    }
  }
  async function handleLocationError(e) {
    if (e?.value === 'Location') {
      setValLocationError('Location is required');
    } else {
      setValLocationError('');
    }
  }
  async function handleWhyJoinUs(e) {
    if (e?.length === 0) {
      setValWhyJoinUsError('Why Join Us is required');
    } else {
      setValWhyJoinUsError('');
    }
  }

  function goBack() {
    router.back();
  }

  const rightContent = () => (
    <BoxFormSection>
      {/* About Company */}
      <Link href="/company/dashboard">
        <Logo>
          <img src={cdn('/static/img/sizigi-full-logo.svg')} alt="logo" />
        </Logo>
      </Link>
      <div className="container">
        <BoxFormWrap>
          <Form handleSubmit={handleSubmit} ref={formRef}>
            <BoxFormTitle>
              <a
                href="javascrip:void(0)"
                onClick={goBack}
                className="head-back-btn"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#1D242F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <h2>1 of 4: General Info</h2>
            </BoxFormTitle>

            <BoxFormBody className="pb-0">
              <h4 className="filled-title">1/6 Areas Filled</h4>
              <h3 className="form-group-title">Working at {companyName}</h3>

              <FormGroup className="border-form-group mb-0">
                <Label className="border-group-label">
                  Why join us <span className="req-star">*</span>
                </Label>
                <textarea
                  className="form-control"
                  name="Whyjoinus"
                  maxLength="500"
                  placeholder="This is a great place to tell people why your company would be a great fit and what your mission is."
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                    setCharaterCount(e.target.value.length);
                    handleWhyJoinUs(e.target.value);
                  }}
                />
                <Hint>{valWhyJoinUsError}</Hint>
                <TextCount>{characterCount}/500 </TextCount>
              </FormGroup>

              <UploadVideoWrap>
                <h4>Share Company/HR Video</h4>
                <UploadVideoBodyp>
                  Why should this candidate work here?
                </UploadVideoBodyp>
                <UploadVideoBodyp>
                  <span>80% of HR leaders</span> say sharing employer branding
                  has a significant impact on their ability to attract strong
                  talent!
                </UploadVideoBodyp>

                <UploadVideoBody>
                  {!videoLink && !videoSrc && (
                    <>
                      <div className="upload-drop-area">
                        <button
                          className="upload-popup-btn"
                          type="button"
                          onClick={setShowUploadModalvideo}
                        >
                          Upload file here
                        </button>
                        <svg
                          width="50"
                          height="48"
                          viewBox="0 0 50 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M34 32L26 24L18 32"
                            stroke="#485768"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M26 24V42"
                            stroke="#485768"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M42.7802 36.7799C46.7929 34.5923 48.8119 29.9624 47.6846 25.5333C46.5572 21.1042 42.5705 18.0029 38.0002 17.9999H35.4802C33.8223 11.5876 28.385 6.85948 21.8046 6.10813C15.2241 5.35678 8.86095 8.73749 5.80031 14.6111C2.73967 20.4847 3.61431 27.6369 8.00015 32.5999"
                            stroke="#485768"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M34 32L26 24L18 32"
                            stroke="#485768"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="box-note">
                          Video should be in .mp4 format only and max size 15 MB
                        </div>
                      </div>
                    </>
                  )}

                  {showUploadModalvideo && (
                    <FileUploadModal
                      closeModal={e => setShowUploadModalvideo(e)}
                      onSuccess={onUploadVideo}
                      isVideo={setShowUploadModalvideo}
                    />
                  )}

                  {videoSrc && (
                    <div className="video-preview-box">
                      <video controls>
                        <source src={videoSrc} type="video/mp4" />
                        <track
                          src="captions_en.vtt"
                          kind="captions"
                          srcLang="en"
                          label="english_captions"
                        />
                      </video>
                      <button
                        className="delete"
                        type="button"
                        onClick={e => setVideoSrc('')}
                      >
                        <img
                          src={cdn('/static/img/delet-white.png')}
                          alt="trash-icon"
                        />
                      </button>
                    </div>
                  )}

                  {previewVideo && (
                    <Wrapper
                      className="embed-video-box"
                      dangerouslySetInnerHTML={createNoembedMarkup()}
                    />
                  )}

                  {!videoLink && !videoSrc && (
                    <div className="or">
                      <span>OR</span>
                    </div>
                  )}

                  {!videoSrc && (
                    <>
                      <FormGroup className="mb-0">
                        <Label>Link</Label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Copy-paste link here!"
                          value={videoLink}
                          onChange={onChangeLinkURL}
                        />
                      </FormGroup>
                    </>
                  )}
                </UploadVideoBody>
              </UploadVideoWrap>

              <FormGroup>
                <Label>
                  Job Title of Role You&#39;re Posting{' '}
                  <span className="req-star">*</span>
                </Label>
                <input
                  type="text"
                  name="jobTitle"
                  className="form-control"
                  placeholder="Job Title"
                  value={jobTitles}
                  onChange={e => setJobTitle(e.target.value)}
                />
                <Hint>{valJobTitleError}</Hint>
              </FormGroup>

              <FormGroup>
                <Label>
                  Company <span className="req-star">*</span>
                </Label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search company"
                  value={companyName}
                />
              </FormGroup>

              <Row>
                <CustomSelect>
                  <FormBlock
                    className="reqlabel"
                    label={modalT('general_info.fields.location.label')}
                  >
                    {countrySelected && (
                      <ReactSelect
                        className="countryAbout"
                        value={countrySelected}
                        onOptionSelected={value => {
                          setCountrySelected(value);
                          handleLocationError(value);
                        }}
                        name="cityId"
                        options={options}
                      />
                    )}

                    {!countrySelected && (
                      <ReactSelect
                        className="countryAbout"
                        value={countrySelected}
                        onOptionSelected={value => {
                          setCountrySelected(value);
                          handleLocationError(value);
                        }}
                        name="cityId"
                        options={options}
                      />
                    )}
                  </FormBlock>
                  <Hint>{valLocationError}</Hint>
                </CustomSelect>
              </Row>
              <FormGroup>
                <Label>
                  Company location/headquarter
                  <span className="req-star">*</span>
                </Label>
                <input
                  type="text"
                  name="jobLocation"
                  className="form-control"
                  placeholder="San Diego, CA"
                  value={jobLocation}
                  onChange={e => setJobLocation(e.target.value)}
                />
                <Hint>{valJobLocationError}</Hint>
              </FormGroup>

              <Row>
                <CustomSelect>
                  <FormBlock
                    className="reqlabel"
                    label={modalT('general_info.fields.employment.label')}
                  >
                    <ReactSelect
                      className="countryAbout"
                      value={stateSelected}
                      onOptionSelected={value => {
                        setStateSelected(value);
                        handleEmployementError(value);
                      }}
                      name="employmentType"
                      options={optionsEmp}
                    />
                  </FormBlock>
                  <Hint>{valEmployementError}</Hint>
                </CustomSelect>
              </Row>
              <CompensationRangeGroup className="mb-16">
                <RangeToolTip>
                  <RangeToolInner>
                    <Label>Compensation range</Label>
                    <RangeToolTipBody>
                      <p>
                        Job postings that include a salary range attract over
                        30% more applicants!
                      </p>
                    </RangeToolTipBody>
                  </RangeToolInner>
                </RangeToolTip>

                <div className="range-group">
                  <select
                    className="form-control"
                    name="currency"
                    value={currencyType}
                    onChange={e => setCurrencyType(e.target.value)}
                  >
                    <option value="USD" name="USD">
                      USD
                    </option>
                    <option value="EUR" name="EUR">
                      EUR
                    </option>
                    <option value="ASD" name="ASD">
                      ASD
                    </option>
                    <option value="JPY" name="JPY">
                      JPY
                    </option>
                    <option value="GBP" name="GBP">
                      GBP
                    </option>
                    <option value="CAD" name="CAD">
                      CAD
                    </option>
                    <option value="CHF" name="CHF">
                      CHF
                    </option>
                    <option value="INR" name="INR">
                      INR
                    </option>
                  </select>
                  <NumberFormat
                    type="text"
                    value={compStartRange}
                    thousandSeparator=","
                    onValueChange={valuesNew => {
                      setCompStartRange(valuesNew.value);
                    }}
                    name="startRange"
                    className="form-control text-right"
                    placeholder="$"
                  />
                </div>
                <div className="range-group">
                  <NumberFormat
                    type="text"
                    value={compEndRange}
                    thousandSeparator=","
                    onValueChange={valuesNewd => {
                      setCompEndRange(valuesNewd.value);
                    }}
                    name="endRange"
                    className="form-control"
                    placeholder="$"
                    // onChange={e => setCompEndRange(e.target.value)}
                  />
                  <select
                    className="form-control"
                    name="cycle"
                    value={compCycle}
                    onChange={e => setCompCycle(e.target.value)}
                  >
                    <option value="per year">Per Year</option>
                    <option value="per month">Per Month</option>
                    <option value="per hour">Per Hour</option>
                  </select>
                </div>
              </CompensationRangeGroup>

              <CheckboxField>
                <div className="checkbox-inner">
                  <input
                    type="checkbox"
                    checked={additionalCompShow}
                    className="checkbox"
                    onChange={handleAdditional}
                  />
                  <Label>Additional compensation</Label>
                </div>
              </CheckboxField>

              {additionalCompShow && (
                <CompensationRangeGroup>
                  <CompensationLabel>Additional Compensation</CompensationLabel>
                  <div className="range-group">
                    <select
                      className="form-control"
                      name="currency1"
                      value={addCurrencyType}
                      onChange={e => setAddCurrencyType(e.target.value)}
                    >
                      <option name="USD">USD</option>
                      <option name="EUR">EUR</option>
                      <option name="ASD">ASD</option>
                      <option name="JPY">JPY</option>
                      <option name="GBP">GBP</option>
                      <option name="CAD">CAD</option>
                      <option name="CHF">CHF</option>
                      <option name="INR">INR</option>
                    </select>
                    <NumberFormat
                      type="text"
                      value={addCompStartRange}
                      thousandSeparator=","
                      onValueChange={valuesNewwt => {
                        setAddCompStartRange(valuesNewwt.value);
                      }}
                      name="startRange1"
                      className="form-control text-right"
                      placeholder="$"
                    />
                    {/* <input
                      type="text"
                      className="form-control text-right"
                      placeholder="$"
                      value={addCompStartRange}
                      name="startRange1"
                      onChange={e => setAddCompStartRange(e.target.value)}
                    /> */}
                  </div>
                  <div className="range-group">
                    <NumberFormat
                      type="text"
                      value={addCompEndRange}
                      thousandSeparator=","
                      onValueChange={valuesNeww => {
                        setAddCompEndRange(valuesNeww.value);
                      }}
                      name="endRange1"
                      className="form-control"
                      placeholder="$"
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="$"
                      value={addCompEndRange}
                      name="endRange1"
                      onChange={e => setAddCompEndRange(e.target.value)}
                    /> */}
                    <select
                      className="form-control"
                      name="cycle1"
                      value={addCompCycle}
                      onChange={e => setAddCompCycle(e.target.value)}
                    >
                      <option value="per year">Per Year</option>
                      <option value="per month">Per Month</option>
                      <option value="per hour">Per Hour</option>
                    </select>
                  </div>
                </CompensationRangeGroup>
              )}

              {/* {!additionalCompShow && ({ setAddCurrencyType('USD')})} */}
            </BoxFormBody>

            <BoxFormAction>
              {/* <Link href="/company/job-post-second-page"> */}
              <Btn
                label="Get started"
                type="submit"
                // variant="outlinePrimary"
                handleClick={onSubmitForm}
                loading={loading}
                className="btn"
                rounded="lg"
              />
              {/* <button type="submit" className="btn">
                  Get started 
              {/* </Link> */}
            </BoxFormAction>
          </Form>
        </BoxFormWrap>
      </div>
    </BoxFormSection>
  );

  const content = rightContent();
  return (
    <Page
      title="General Info"
      description="General Info Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(generalInfo);

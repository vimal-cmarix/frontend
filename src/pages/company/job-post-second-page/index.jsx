import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Link from 'next/link';
import FileUploadModal from '@components/molecules/FileUploadModal';
// import CreateIcon from '@src/assets/images/createicon.svg';
// import UploadIconBlue from '@src/assets/images/upload-blue.svg';
import Page from '@components/templates/Page';
import { withAuthSync } from '@src/utils/auth';
import TextInput from '@components/molecules/TextInput';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import AboutCompanyService from '@src/api/services/about-company';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { cdn } from '@utils/general';
import AssetService from '@api/services/asset';
import cookie from 'js-cookie';
import FormBlock from '@components/organisms/FormBlock';
import Btn from '@components/molecules/Btn';
import DashboardNew from '@src/api/services/dashboard-new';
import {
  Label,
  BoxFormSection,
  BoxFormWrap,
  BoxFormTitle,
  BoxFormBody,
  BoxFormAction,
  PasswordNote,
  FormGroup,
  UploadVideoWrap,
  UploadVideoBody,
  UploadDropArea,
  TextCount,
  Logo,
  Wrapper,
  Hint,
  Row,
} from './style';

const JobDetails = () => {
  const formRef = useRef(null);
  const [showUploadModalvideo, setShowUploadModalvideo] = useState(false);
  const [previewVideo, setPreviewVideo] = useState('');
  const [qualificharacterCount, setQualifiCharaterCount] = useState(0);
  const [characterCount, setCharaterCount] = useState(0);
  const router = useRouter();
  const [positionInformation, setPositionInformation] = useState('');
  const [qualification, setQualification] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPossible, setIsPossible] = useState(false);
  const toast = useToast();
  const { t: modalT } = useTranslation('modals');
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [profilesId, setProfileId] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const { t: errorMessage } = useTranslation('errorMessages');
  const [resp, setResp] = useState('');
  const [pid, setpid] = useState('');
  const [valPositionError, setValPositionError] = useState('');
  const [valQualificationError, setValQualificationError] = useState('');

  const onChangeLinkURL = e => {
    setVideoLink(e.target.value);
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
    const accessToken = cookie.get('sizigi-token');
    if (e.target.value.match(regex)) {
      const response = AssetService.parserLink({
        url: e.target.value.trim(),
        // width: width > 0 ? width : screenPart,
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

  const loadData = res => {
    if (res) {
      const { data } = res;
      console.log(data, 'response');
      if (data?.job_detail !== null) {
        onLinkVideoPreview(data.job_detail.link);
      }
      setResp(data);
      setpid(data?.id);
      setPositionInformation(data?.job_detail?.positionInformation);
      setCharaterCount(data?.job_detail?.positionInformation.length);
      setQualification(data?.job_detail?.qualification);
      setQualifiCharaterCount(data?.job_detail?.qualification.length);
      setVideoSrc(data?.job_detail?.videoUrl);
      setVideoLink(data?.job_detail?.link);
      setIsPossible(true);
    } else {
      router.push('/company/general-info');
    }
  };
  useEffect(() => {
    const getResponse = async () => {
      const generalInfo =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('profileuserInformation'))
          : null;
      if (generalInfo) {
        loadData(generalInfo);
      }
    };
    getResponse();
  }, []);

  const onUploadVideo = async res => {
    setShowUploadModalvideo(false);
    setVideoSrc(res);
  };

  function createNoembedMarkup() {
    return { __html: previewVideo };
  }

  async function handlePositionInformation(e) {
    setPositionInformation(e.target.value);
    if (qualification !== '' && positionInformation !== '') {
      setIsPossible(true);
    } else {
      setIsPossible(false);
    }
  }

  async function handleQualification(e) {
    setQualification(e.target.value);
    if (positionInformation !== '' && qualification !== '') {
      setIsPossible(true);
    } else {
      setIsPossible(false);
    }
  }

  const onFormDataSave = async () => {
    setLoading(true);
    try {
      const newData = {
        jobTitle: resp.jobTitle,
        location: resp.location,
        jobLocation: resp.jobLocation,
        employmentType: resp.employmentType,
        compensationRange: {
          currency: resp.compensationRange.currency,
          cycle: resp.compensationRange.cycle,
          startRange: resp.compensationRange.startRange,
          endRange: resp.compensationRange.endRange,
        },
        additionalCompensation: {
          currency: resp.additionalCompensation.currency,
          cycle: resp.additionalCompensation.cycle,
          startRange: resp.additionalCompensation.startRange,
          endRange: resp.additionalCompensation.endRange,
        },
        job_detail: {
          positionInformation,
          qualification,
          link: videoLink || '',
          videoUrl: videoSrc || '',
        },
        type: 'private',
      };
      if (
        newData.job_detail.positionInformation === undefined ||
        newData.job_detail.positionInformation === ''
      ) {
        setValPositionError('Position Informaton is required');
      } else {
        setValPositionError('');
      }
      if (
        newData.job_detail.qualification === undefined ||
        newData.job_detail.qualification === ''
      ) {
        setValQualificationError('Qualification/Requirements is required.');
      } else {
        setValQualificationError('');
      }
      if (
        newData.job_detail.positionInformation !== '' &&
        newData.job_detail.qualification !== ''
      ) {
        if (pid) {
          const res = await AboutCompanyService.updateJobDetail(pid, newData);
          localStorage.removeItem('profileuserInformation');
          setLoading(false);
          if (res.status === 200) {
            const ResponseData = await DashboardNew.getJobInfo(pid);
            const { data } = ResponseData;
            localStorage.setItem(
              'profileuserInformation',
              JSON.stringify(data),
            );
            // localStorage.setItem('jobDetails', JSON.stringify(res));
            router.push('/company/candidate-screening');
          }
        }
      } else {
        setLoading(false);
      }
    } catch (e) {
      //showToast(errorHandle(e));
      setLoading(false);
    }
  };

  async function Save(data) {
    setLoading(true);
    const newData = {
      jobTitle: resp.jobTitle,
      location: resp.location,
      jobLocation: resp.jobLocation,
      employmentType: resp.employmentType,
      compensationRange: {
        currency: resp.compensationRange.currency,
        cycle: resp.compensationRange.cycle,
        startRange: resp.compensationRange.startRange,
        endRange: resp.compensationRange.endRange,
      },
      additionalCompensation: {
        currency: resp.additionalCompensation.currency,
        cycle: resp.additionalCompensation.cycle,
        startRange: resp.additionalCompensation.startRange,
        endRange: resp.additionalCompensation.endRange,
      },
      job_detail: {
        positionInformation: data.jobDetail.positionInformation,
        qualification: data.jobDetail.qualification,
        link: data.jobDetail.link,
        videoId: data.jobDetail.videoId,
      },
      type: 'private',
    };

    try {
      if (pid) {
        console.log('newData', newData);
        const res = await AboutCompanyService.updateJobDetail(pid, newData);
        console.log(res, 'response');
        setLoading(false);
        if (res.status === 200) {
          router.push('/candidate-screening');
        }
      } else {
        console.log('newElse');
        const profileId = JSON.parse(localStorage.getItem('userDetail'));
        const res = await AboutCompanyService.updateJobDetail(
          profileId.data.id,
          newData,
        );
        setLoading(false);
        if (res.status === 200) {
          router.push('/candidate-screening');
        }
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    // e.preventDefault();
    const data = {};
    const jobDetail = {};
    if (qualification !== '' && positionInformation !== '') {
      setIsPossible(true);
    } else {
      setIsPossible(false);
    }
    if (isPossible) {
      try {
        // Remove all previous errors
        formRef.current.setErrors({});
        Object.assign(
          jobDetail,
          { positionInformation },
          { qualification },
          { link: videoLink },
          { videoId: videoSrc },
        );
        Object.assign(data, { job_detail: jobDetail });
        //console.log('job_details', data);
        // Validation passed
        // await Save(data);
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
  const rightContent = () => (
    <BoxFormSection>
      {/* 2 of 3: Job Details */}
      <Link href="/company/dashboard">
        <Logo>
          <img src={cdn('/static/img/sizigi-full-logo.svg')} alt="logo" />
        </Logo>
      </Link>
      <div className="container">
        <BoxFormWrap>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <BoxFormTitle>
              <Link href="/company/general-info">
                <a href="/company/general-info" className="head-back-btn">
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
              </Link>
              <h2>2 of 4: Job Details</h2>
            </BoxFormTitle>

            <BoxFormBody className="pb-0">
              <h3 className="form-group-title mb-24">Position Information</h3>
              {/* <Row>
                <FormBlock
                  label={modalT('Job_Details.fields.JobDetails.label')}
                >
                  <TextInput
                    className="aboutBlurb"
                    name="personalIntroduction"
                    placeholder={modalT(
                      'Job_Details.fields.JobDetails.placeholder',
                    )}
                    size="medium"
                    multiline
                    maxLength="130"
                    onChange={handlePositionInformation}
                  />
                </FormBlock>
                <TextCount>XXX/XXX</TextCount>
              </Row> */}

              <FormGroup className="border-form-group mb-0">
                <Label className="border-group-label">
                  What you will do / The impact you will make{' '}
                  <span className="req-star">*</span>
                </Label>
                <textarea
                  value={positionInformation}
                  className="form-control"
                  maxLength="1000"
                  name="positionInformation"
                  onChange={e => {
                    handlePositionInformation(e);
                    setCharaterCount(e.target.value.length);
                  }}
                  placeholder="What does the day-to-day life of someone in this position/department look like?"
                />
                <TextCount>{characterCount}/1000</TextCount>
                <Hint>{valPositionError}</Hint>
              </FormGroup>

              <UploadVideoWrap>
                <h4>Share a Video Introduction</h4>
                <p>
                  Candidate application rate goes{' '}
                  <span className="btb-text">up by 34%</span> when a job posting
                  includes a video. Include a personal video/message from the
                  manager or team!
                </p>

                <UploadVideoBody>
                  {!videoLink && !videoSrc && (
                    <UploadDropArea>
                      <>
                        <button
                          className="upload-popup-btn"
                          type="button"
                          onClick={e => setShowUploadModalvideo(true)}
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
                      </>
                    </UploadDropArea>
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
                          name="link"
                          value={videoLink}
                          onChange={onChangeLinkURL}
                          className="form-control"
                          placeholder="Copy-paste link here!"
                        />
                      </FormGroup>
                    </>
                  )}
                </UploadVideoBody>
              </UploadVideoWrap>

              <h3 className="form-group-title mb-24">
                Qualifications/Requirements
              </h3>

              <FormGroup className="border-form-group mb-24">
                <Label className="border-group-label">
                  What you will bring to the table{' '}
                  <span className="req-star">*</span>
                </Label>
                <textarea
                  value={qualification}
                  name="qualification"
                  className="form-control"
                  maxLength="1000"
                  onChange={e => {
                    handleQualification(e);
                    setQualifiCharaterCount(e.target.value.length);
                  }}
                  placeholder="What skills should someone in this position have to offer?"
                />
                <TextCount>{qualificharacterCount}/1000</TextCount>
                <Hint>{valQualificationError}</Hint>
              </FormGroup>
            </BoxFormBody>

            <BoxFormAction>
              {/* <Link href="/candidate-screening"> */}
              <>
                <Btn
                  label="Continue"
                  type="submit"
                  // variant="outlinePrimary"
                  handleClick={onFormDataSave}
                  loading={loading}
                  className="btn"
                  rounded="lg"
                />
                {/* <button
                  type="button"
                  onClick={onFormDataSave}
                  className="btn"
                  disabled={!isPossible}
                >
                  Continue
                </button> */}
              </>
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
      title="Job Detail"
      description="Job Detail Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(JobDetails);

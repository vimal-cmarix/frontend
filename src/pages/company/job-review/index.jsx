import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Page from '@components/templates/Page';
import cookie from 'js-cookie';
import DashboardNew from '@src/api/services/dashboard-new';
// import Airplane from '@src/assets/images/airplane-b2b.svg';
// import Frown from '@src/assets/images/frown.png';
// import VideoUpload from '@src/assets/images/Video-Upload.png';
// import SizigiLogo from '@src/assets/images/sizigi-logo.svg';
// import spotifyLogo from '@src/assets/images/spotify-logo.png';
// import ReviewVideoUpload from '@src/assets/images/review-video-upload.png';
import Link from 'next/link';
import { withAuthSync } from '@src/utils/auth';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import AboutCompanyService from '@api/services/about-company';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { cdn } from '@utils/general';
import AssetService from '@api/services/asset';
import {
  BoxFormSection,
  SizigiLogoWrap,
  BoxFormWrapOuter,
  BoxFormWrap,
  BoxFormTitle,
  ReviewTabsWrap,
  Label,
  BoxFormAction,
  BoxFormBody,
  ReviewVideoBox,
  UserReviewValue,
  BoxSeprator,
  FormGroup,
  SelectBtn,
  HeadBackBtn,
  Wrapper,
} from './style';

const ReviewPage = () => {
  // const componentDidMount = fun => useEffect(fun, []);
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [recieveApplicantBy, setRecieveApplicantBy] = useState('');
  const [locationType, setJobLocationType] = useState('');
  const [employmentType, setEmployementType] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [responseType, setResponseType] = useState('');
  const [questionList, setQuestionList] = useState('');
  const [questionListArray, setQuestionListArray] = useState([]);
  const [positionInformation, setPositionInformation] = useState('');
  const [qualification, setQualification] = useState('');
  const [companyContent, setCompanyContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoLink, setVideoLink] = useState(false);
  const [jobLink, setJobLink] = useState('');
  const [previewVideo, setPreviewVideo] = useState('');
  const [previewVideo2, setPreviewVideo2] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [reviewDetails, setReviewDetails] = useState('');
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [profilesId, setProfileId] = useState('');
  const { t: errorMessage } = useTranslation('errorMessages');
  const [previewURL, setPreviewURL] = useState('');
  const [html, setHTML] = useState('');
  const [showHtml, setShowHTML] = useState(false);
  const numberFormate = new Intl.NumberFormat('en-US');
  async function getReviewDetail() {
    //const questionList = reviewDetails.job_candidate.questionList;
    //console.log('que', questionList, array);
    setLoading(true);
    try {
      const profileId = '12aa7182-395a-454d-a279-17d17cc59a9c';
      console.log('id', profileId);
      console.log(
        'jobTitle',
        jobTitle,
        jobLocation,
        recieveApplicantBy,
        locationType,
      );

      // if (res.status === 201) {
      //   console.log('success');
      //   //router.push('/company/job-post-second-page');
      // }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function changeStep(value) {
    console.log('step', value);
    if (value === 'stepone') {
      setStep(1);
    }
    if (value === 'steptwo') {
      setStep(2);
    }
    // if (value === 'stepthree') {
    //   setStep(3);
    // }
    if (value === 'finish') {
      router.push('submit-page');
    }
  }

  function createNoembedMarkup() {
    console.log('First Funcation Call', previewURL);
    return { __html: previewVideo };
  }

  function createNoembedMarkup1() {
    console.log('Second Time call');
    return { __html: previewVideo2 };
  }

  const onLinkJobPreview = url => {
    setJobLink(url);
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
          setPreviewVideo2(data.media ? data.media : null);
        } else {
          setPreviewVideo2(false);
        }
      });
    } else {
      setPreviewVideo2(false);
    }
  };

  const loadHTML = async data => {
    console.log('Data', data);
    const dataHTML = (
      <>
        <Wrapper
          className="embed-video-box"
          dangerouslySetInnerHTML={createNoembedMarkup()}
        />
      </>
    );
    setHTML(dataHTML);
    setShowHTML(true);
  };

  const onLinkVideoPreview = async url => {
    // console.log('URL', url);
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
    const accessToken = cookie.get('sizigi-token');
    if (url.match(regex)) {
      const response = await AssetService.parserLink({
        url: url.trim(),
        width: 0,
        accessToken,
      });
      const { data } = response;
      console.log('accessToken', data.title.includes('React'));
      if (data.url.includes('youtube.com')) {
        if (data.title.includes('JavaScript')) {
          data.title = 'Description not available.';
        }
      }
      if (data.title || data.description) {
        if (data.media !== null) {
          await loadHTML(data.media);
        }
        setPreviewVideo(data.media ? data.media : null);
        console.log('FirstLink', data.media);
      } else {
        console.log('False');
        setPreviewVideo(false);
      }
    } else {
      console.log('Else');
      setPreviewVideo(false);
    }
  };

  const getNewReponse = () => {
    const reviewData = JSON.parse(
      localStorage.getItem('profileuserInformation'),
    );
    const { data } = reviewData;
    console.log('ReviewData', data);
    const companyData = JSON.parse(localStorage.getItem('companyProfile'));
    console.log('companyData', companyData);
    if (data !== null || data !== undefined || data !== '') {
      setReviewDetails(data);
      setJobTitle(data?.jobTitle);
      setJobLocation(data?.jobLocation);
      setRecieveApplicantBy(data?.job_candidate?.recieveApplicantBy);
      setJobLocationType(data?.location);
      setEmployementType(data?.employmentType);
      setCompanyName(companyData?.companyName);
      setLogoUrl(companyData?.logoUrl);
      setCompanyContent(companyData?.content);
      setVideoUrl(companyData?.videoUrl);
      if (companyData.videoLink !== null) {
        console.log('GeneralInfoURL', companyData.videoLink);
        onLinkVideoPreview(companyData.videoLink);
      }
      // setVideoLink(companyData?.videoLink);
      setJobLink(data?.job_detail?.link);
      if (data?.job_detail !== null) {
        if (data.job_detail?.link !== '') {
          onLinkJobPreview(data.job_detail.link);
        }
      }
      setCustomQuestion(data?.job_candidate?.customQuestion);
      setResponseType(data?.job_candidate?.responseType);
      // setQuestionList(data.job_candidate.questionList);
      setQualification(data?.job_detail?.qualification);
      setPositionInformation(data?.job_detail?.positionInformation);
    }
  };
  useEffect(() => {
    getNewReponse();
  }, []);

  function goBack() {
    router.back();
  }
  async function submitPost() {
    // console.log(reviewDetails, 'value');
    const jobid = reviewDetails.id;
    const data = {
      status: 'published',
    };
    await DashboardNew.changeJobStatus(jobid, data);
    router.push('/company/submit');
  }

  const stepOne = () => (
    <>
      <BoxFormSection>
        {/* 4 of 4: Review Page */}
        <div className="container">
          <SizigiLogoWrap>
            <Link href="/company/dashboard">
              <span>
                <img src={cdn('/static/img/logo-black.svg')} alt="logo" />
              </span>
            </Link>
          </SizigiLogoWrap>
          <BoxFormWrapOuter>
            <BoxFormWrap>
              <form>
                <BoxFormTitle>
                  <HeadBackBtn onClick={goBack}>
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
                  </HeadBackBtn>
                  <h2>4 of 4: Review Page</h2>
                  <SelectBtn
                    onClick={e => changeStep('steptwo')}
                    className="next-step-btn"
                  >
                    Next
                  </SelectBtn>
                </BoxFormTitle>

                <ReviewTabsWrap>
                  <SelectBtn className="active">General Info</SelectBtn>
                  <SelectBtn onClick={e => changeStep('steptwo')}>
                    Job Details
                  </SelectBtn>
                  {/* <SelectBtn onClick={e => changeStep('stepthree')}>
                    Candidate Screening
                  </SelectBtn> */}
                </ReviewTabsWrap>

                <BoxFormBody>
                  <h3>Working at {companyName}</h3>
                  <h4>Why join us</h4>
                  <p>{companyContent}</p>

                  <ReviewVideoBox>
                    {/* <img src={videoUrl} alt="videoupload" /> */}
                    {previewVideo && (
                      <Wrapper
                        className="embed-video-box"
                        dangerouslySetInnerHTML={createNoembedMarkup()}
                      />
                    )}
                    {videoUrl !== null && !previewVideo && (
                      <video controls>
                        <source src={videoUrl} type="video/mp4" />
                        <track
                          src="captions_en.vtt"
                          kind="captions"
                          srcLang="en"
                          label="english_captions"
                        />
                      </video>
                    )}

                    {/* {showHtml && html} */}
                    {/* {previewURL && (
                      <>
                        <Wrapper
                          className="embed-video-box"
                          dangerouslySetInnerHTML={createNoembedMarkup()}
                        />
                      </>
                    )} */}
                  </ReviewVideoBox>

                  <div className="row">
                    <div className="col-md-12">
                      <BoxSeprator>
                        <Label>
                          Job Title <span className="req-star">*</span>
                        </Label>
                        <UserReviewValue>{jobTitle}</UserReviewValue>
                      </BoxSeprator>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label>Company</Label>
                        <UserReviewValue>
                          <img src={logoUrl} alt="" />
                          {companyName}
                        </UserReviewValue>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label>
                          Job Location Type <span className="req-star">*</span>
                        </Label>
                        <UserReviewValue>{locationType}</UserReviewValue>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label>
                          Job Location <span className="req-star">*</span>
                        </Label>
                        <UserReviewValue>{jobLocation}</UserReviewValue>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label>
                          Employment Type <span className="req-star">*</span>
                        </Label>
                        <UserReviewValue>{employmentType}</UserReviewValue>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label>Compensation Range</Label>
                        {reviewDetails?.compensationRange?.startRange && (
                          <>
                            <UserReviewValue>
                              $
                              {numberFormate.format(
                                reviewDetails?.compensationRange?.startRange,
                              )}{' '}
                              to{' '}
                              {numberFormate.format(
                                reviewDetails?.compensationRange?.endRange,
                              )}{' '}
                              {reviewDetails?.compensationRange?.cycle}
                            </UserReviewValue>
                          </>
                        )}
                        {!reviewDetails?.compensationRange?.startRange && (
                          <>
                            <UserReviewValue>--</UserReviewValue>
                          </>
                        )}
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label>Advanced Compensation Range</Label>
                        {reviewDetails?.additionalCompensation?.startRange && (
                          <UserReviewValue>
                            ${' '}
                            {reviewDetails?.additionalCompensation?.startRange}{' '}
                            to {reviewDetails?.additionalCompensation?.endRange}{' '}
                            {reviewDetails?.additionalCompensation?.cycle}
                          </UserReviewValue>
                        )}
                        {!reviewDetails?.additionalCompensation?.startRange && (
                          <UserReviewValue>--</UserReviewValue>
                        )}
                      </FormGroup>
                    </div>
                  </div>
                </BoxFormBody>

                <BoxFormAction>
                  {/* <Link to="/submittedpage-b2b"> */}
                  <button type="button" className="btn" onClick={submitPost}>
                    Submit
                  </button>
                  {/* </Link> */}
                  <button
                    type="button"
                    className="btn"
                    onClick={e => router.push('/company/general-info')}
                  >
                    Update
                  </button>
                </BoxFormAction>
              </form>
            </BoxFormWrap>
          </BoxFormWrapOuter>
        </div>
      </BoxFormSection>
    </>
  );

  const stepTwo = () => (
    <>
      <BoxFormSection>
        {/* 4 of 4: Review Page */}
        <div className="container">
          <SizigiLogoWrap>
            <Link href="/company/dashboard">
              <span>
                <img src={cdn('/static/img/logo-black.svg')} alt="logo" />
              </span>
            </Link>
          </SizigiLogoWrap>
          <BoxFormWrapOuter>
            <BoxFormWrap>
              <form>
                <BoxFormTitle>
                  <HeadBackBtn onClick={e => changeStep('stepone')}>
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
                  </HeadBackBtn>
                  <h2>4 of 4: Review Page</h2>
                  {/* <SelectBtn
                    onClick={e => changeStep('stepthree')}
                    className="next-step-btn"
                  >
                    Next
                  </SelectBtn> */}
                </BoxFormTitle>

                <ReviewTabsWrap>
                  <SelectBtn onClick={e => changeStep('stepone')}>
                    General Info
                  </SelectBtn>
                  <SelectBtn className="active">Job Details</SelectBtn>
                  {/* <SelectBtn onClick={e => changeStep('stepthree')}>
                    Candidate Screening
                  </SelectBtn> */}
                </ReviewTabsWrap>

                <BoxFormBody>
                  <h3>Position Info: {reviewDetails.jobTitle}</h3>
                  <h4>The impact you will make</h4>
                  <p>{reviewDetails?.job_detail?.positionInformation} </p>

                  <ReviewVideoBox>
                    {reviewDetails.job_detail?.videoUrl !== null &&
                      !previewVideo2 && (
                        <>
                          <video controls>
                            <source
                              src={reviewDetails?.job_detail?.videoUrl}
                              type="video/mp4"
                            />
                            <track
                              src="captions_en.vtt"
                              kind="captions"
                              srcLang="en"
                              label="english_captions"
                            />
                          </video>
                        </>
                      )}

                    {previewVideo2 && previewVideo !== '' && jobLink && (
                      <Wrapper
                        className="embed-video-box"
                        dangerouslySetInnerHTML={createNoembedMarkup1()}
                      />
                    )}
                  </ReviewVideoBox>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <h4>Qualifications/Requirements</h4>
                        <p>{reviewDetails.job_detail.qualification}</p>
                      </FormGroup>
                    </div>
                  </div>
                </BoxFormBody>

                <BoxFormAction>
                  {/* <Link to="/submittedpage-b2b"> */}
                  <button type="button" className="btn" onClick={submitPost}>
                    Submit
                  </button>
                  {/* </Link> */}
                  <button
                    type="button"
                    className="btn"
                    onClick={e => router.push('/company/general-info')}
                  >
                    Update
                  </button>
                </BoxFormAction>
              </form>
            </BoxFormWrap>
          </BoxFormWrapOuter>
        </div>
      </BoxFormSection>
    </>
  );

  // const stepThree = () => (
  //   <>
  //     <BoxFormSection>
  //       {/* 4 of 4: Review Page */}
  //       <div className="container">
  //         <SizigiLogoWrap>
  //           <Link href="/company/dashboard">
  //             <span>
  //               <img src={cdn('/static/img/logo-black.svg')} alt="logo" />
  //             </span>
  //           </Link>
  //         </SizigiLogoWrap>
  //         <BoxFormWrapOuter>
  //           <BoxFormWrap>
  //             <form>
  //               <BoxFormTitle>
  //                 <a href="/review-step-2" className="head-back-btn">
  //                   <svg
  //                     width="24"
  //                     height="24"
  //                     viewBox="0 0 24 24"
  //                     fill="none"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <path
  //                       d="M15 18L9 12L15 6"
  //                       stroke="#1D242F"
  //                       strokeWidth="2"
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                     />
  //                   </svg>
  //                 </a>
  //                 <h2>4 of 4: Review Page</h2>
  //               </BoxFormTitle>

  //               <ReviewTabsWrap>
  //                 <SelectBtn onClick={e => changeStep('stepone')}>
  //                   General Info
  //                 </SelectBtn>
  //                 <SelectBtn onClick={e => changeStep('steptwo')}>
  //                   Job Details
  //                 </SelectBtn>
  //                 {/* <SelectBtn className="active">Candidate Screening</SelectBtn> */}
  //               </ReviewTabsWrap>

  //               <BoxFormBody>
  //                 <FormGroup className="mb-0">
  //                   <Label>Recieve applicants by</Label>
  //                   <UserReviewValue>{recieveApplicantBy}</UserReviewValue>
  //                 </FormGroup>

  //                 <AddScreeningWrap>
  //                   <h4 className="AddScreeningTitle">Screening questions</h4>
  //                   <AddQueList>
  //                     <AddQueHead>
  //                       <h4 className="add-que-head-title">
  //                         We need to fill this position urgently. Can you start
  //                         immediately?
  //                       </h4>
  //                     </AddQueHead>

  //                     <AddQueBody>
  //                       <IdalAnsWrap>
  //                         <span className="que-right-label">Yes</span>
  //                       </IdalAnsWrap>
  //                       <ul>
  //                         <li>
  //                           <QueInner>
  //                             <div className="checkbox-field blue-text-label">
  //                               <QueLabel>Must-have qualification</QueLabel>
  //                             </div>
  //                           </QueInner>
  //                         </li>
  //                       </ul>
  //                     </AddQueBody>
  //                   </AddQueList>

  //                   <AddQueList>
  //                     <AddQueHead>
  //                       <h4 className="add-que-head-title">
  //                         Custom screening questions
  //                       </h4>
  //                     </AddQueHead>

  //                     <AddQueBody>
  //                       <FormGroup className="mb-10">
  //                         <Label>Customer Screening Question</Label>
  //                         <UserReviewValue className="fwBold">
  //                           {customQuestion}
  //                         </UserReviewValue>
  //                       </FormGroup>
  //                       <FormGroup className="mb-10">
  //                         <Label>Response Type</Label>
  //                         <UserReviewValue className="fwBold">
  //                           {responseType}
  //                         </UserReviewValue>
  //                       </FormGroup>

  //                       <ul>
  //                         <li>
  //                           <QueInner>
  //                             <div className="checkbox-field blue-text-label">
  //                               <QueLabel>Must-have qualification</QueLabel>
  //                             </div>
  //                           </QueInner>
  //                         </li>
  //                         <li>
  //                           <QueInner>
  //                             <div className="checkbox-field">
  //                               <QueLabel>Request content</QueLabel>
  //                             </div>
  //                           </QueInner>
  //                         </li>
  //                       </ul>
  //                     </AddQueBody>
  //                   </AddQueList>
  //                 </AddScreeningWrap>

  //                 <ScreenQuestionWrap>
  //                   <h4 className="screenQuestionTitle">
  //                     Screen question list
  //                   </h4>
  //                   <ScreenQuestionList>
  //                     {questionListArray.map(function(item, i) {
  //                       return (
  //                         <a href="/" className="selected">
  //                           {item}
  //                         </a>
  //                       );
  //                     })}
  //                   </ScreenQuestionList>
  //                 </ScreenQuestionWrap>
  //               </BoxFormBody>

  //               <BoxFormAction>
  //                 <Link href="/submit-page">
  //                   <button type="submit" className="btn">
  //                     Submit
  //                   </button>
  //                 </Link>
  //                 <button type="submit" className="btn">
  //                   Update
  //                 </button>
  //               </BoxFormAction>
  //             </form>
  //           </BoxFormWrap>
  //         </BoxFormWrapOuter>
  //       </div>
  //     </BoxFormSection>
  //   </>
  // );

  if (step === 1) {
    setTimeout(() => {
      const content = stepOne();
      setStep(content);
    }, 10);
  }

  if (step === 2) {
    const content = stepTwo();
    setStep(content);
  }

  // if (step === 3) {
  //   const content = stepThree();
  //   setStep(content);
  // }

  const content = step;
  //const content = step === 2 ? StepThree() : stepOne();
  return (
    <Page
      title="Review Page"
      description="Review Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(ReviewPage);

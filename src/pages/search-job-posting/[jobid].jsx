import React, { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';
import jwtDecode from 'jwt-decode';
import VerificationModal from '@components/templates/Modals/VerificateAccount';
import { cdn } from '@utils/general';
import AssetService from '@api/services/asset';
import cookie from 'js-cookie';

import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import errorHandle from '@src/utils/error';
import SignService from '@api/services/sign';
import { login, withoutAuth, loginVerification } from '@src/utils/auth';
import { sizes } from '@assets/styles/medias';
import JobExperienceService from '@api/services/jobExperience';
import { Accordion, Carousel, Modal } from 'react-bootstrap';
import Page from '@components/templates/Page';
import Brand from '@components/atoms/Brand';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import { useToast, Action } from '@components/molecules/Notification';
import Storage from '@utils/storage';
import moment from 'moment';
import Btn from '@components/molecules/Btn';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

// import { PageWrapper } from './style';
import {
  PageWrapper,
  JobPostingMain,
  JobPostingTop,
  JobPostingHead,
  JobPostContainer,
  BackToList,
  JobPostHeadInfo,
  JobPostLeftPanel,
  WhyWorkBox,
  WorkBoxVideo,
  JobPostGrayBbox,
  JobCompanyBox,
  FeatureArticle,
  FeatureArticleInner,
  ArticleImgBox,
  ArticleInfo,
  LearnMoreLink,
  SocialFeedWrap,
  SocialFeedImg,
  SocialFeedBox,
  PerksBenefits,
  PerksTop,
  ModalStyle,
  companyProfile,
  CompanyBenefitList,
  ToggleAccordion,
  MeetEmployees,
  HiringOuterWrapper,
  ZigZagWrap,
  CompnayPreviewWrapper,
  JobPostingPerksnBenefits,
  PostReadMore,
  AddedList,
  Wrapper,
  FeatureArticleone,
  FeatureArticleInnertwo,
} from './style';

const SearchJobPosting = () => {
  // let index = 0;
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t } = useTranslation('signup');
  const { t: homeT } = useTranslation('home');
  const { dispatch: profileDispatch } = useContext(ProfileContext);

  const { state: appState, dispatch } = useContext(AppContext);
  const formRef = useRef(null);
  const { query } = useRouter();
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(null);
  const [showAction, setShowAction] = useState({ show: false, text: '' });
  const [response, setResponse] = useState({});

  const [videoSrcBlog, setVideoSrcBlog] = useState('');
  const [videoLinkBlog, setVideoLinkBlog] = useState('');
  const [previewVideo, setPreviewVideo] = useState('');

  const [videoUrl, setVideoUrl] = useState('');
  const [videolink, setVideoLink] = useState('');
  const [previewVideo1, setPreviewVideo1] = useState('');

  const [companyvideoUrl, setCompanyVideoUrl] = useState('');
  const [companyvideoLink, setCompanyVideoLink] = useState('');
  const [previewVideo2, setPreviewVideo2] = useState('');

  const [count, setCount] = useState(0);
  const [healthAndWellness, setHealthAndWellness] = useState([]);
  const [vacation, setVacation] = useState([]);
  const [financial, setFinancial] = useState([]);
  const [professional, setProfessional] = useState([]);
  const [office, setOffice] = useState([]);
  const [jobList, setJobListResponse] = useState('');
  const [companyProfileId, setcompanyProfileId] = useState('');
  const [searchJob, setSearchJob] = useState('');
  const [getBackButtonSearch, setGetButtonSearch] = useState('');
  const [getBackButtonDetailSearch, setGetButtonDetailSearch] = useState('');
  const [companyEmployee, setCompanyEmployee] = useState([]);
  const [companyCulture, setCompanyCulture] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowIndex, setModalShowIndex] = React.useState(0);

  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShowIndex1, setModalShowIndex1] = React.useState(0);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function createNoembedMarkup1() {
    return { __html: previewVideo1 };
  }

  function createNoembedMarkup2() {
    return { __html: previewVideo2 };
  }

  function createNoembedMarkup() {
    return { __html: previewVideo };
  }

  const onLinkVideoPreview1 = url => {
    setVideoLink(url);
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
    const accessToken = cookie.get('sizigi-token');
    if (url.match(regex)) {
      const resps = AssetService.parserLink({
        url: url.trim(),
        width: 0,
        accessToken,
      });
      resps.then(res => {
        const { data } = res;
        if (data.url.includes('twitter.com')) {
          if (data.title.includes('JavaScript')) {
            data.title = 'Description not available.';
          }
        }
        if (data.title || data.description) {
          setPreviewVideo1(data.media ? data.media : null);
        } else {
          setPreviewVideo1(false);
        }
      });
    } else {
      setPreviewVideo1(false);
    }
  };

  const onLinkVideoPreview2 = url => {
    setCompanyVideoLink(url);
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
    const accessToken = cookie.get('sizigi-token');
    if (url.match(regex)) {
      const resps = AssetService.parserLink({
        url: url.trim(),
        width: 0,
        accessToken,
      });
      resps.then(res => {
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

  const onLinkVideoPreview = url => {
    // setVideoLink(url);
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
    const accessToken = cookie.get('sizigi-token');
    if (url.match(regex)) {
      const resps = AssetService.parserLink({
        url: url.trim(),
        width: 0,
        accessToken,
      });
      resps.then(res => {
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

  async function handleGetJobDetails() {
    if (!query.jobid) return;
    try {
      const res = await JobExperienceService.getJobDetails(query.jobid);
      if (res.status === 200) {
        const { data } = res.data;
        console.log('Response', data);

        const health = JSON.parse(
          data.company_profile.company_about.healthAndWellness,
        );
        const vacations = JSON.parse(
          data.company_profile.company_about.vacationAndTimeOffice,
        );
        const finicial = JSON.parse(
          data.company_profile.company_about.financialAndRetirement,
        );
        const professionals = JSON.parse(
          data.company_profile.company_about.professionalDevelopment,
        );
        const offices = JSON.parse(
          data.company_profile?.company_about.officeLifeAndPerks,
        );

        console.log(
          health,
          vacations,
          finicial,
          professionals,
          offices,
          'Health=======================================',
        );

        const countHealth = health !== null ? health.length : 0;
        const countVaction = vacations !== null ? vacations.length : 0;
        const countFinicial = finicial !== null ? finicial.length : 0;
        const countProfessional =
          professionals !== null ? professionals.length : 0;
        const countOffice = offices !== null ? offices.length : 0;

        const total =
          countHealth +
          countVaction +
          countFinicial +
          countProfessional +
          countOffice;
        setCount(total);
        setHealthAndWellness(health);
        setVacation(vacations);
        setFinancial(finicial);
        setProfessional(professionals);
        setOffice(offices);

        setResponse(data);
        setVideoUrl(data?.company_profile?.videoUrl);
        setVideoLink(data?.company_profile?.videoLink);
        if (data.company_profile.videoLink !== null) {
          onLinkVideoPreview1(data.company_profile.videoLink);
        }
        setcompanyProfileId(data.companyProfileId);
        setCompanyEmployee(data?.company_profile?.company_employees);

        setCompanyVideoUrl(data?.job_detail?.videoUrl);
        setCompanyVideoLink(data?.job_detail?.link);
        if (data.job_detail.link !== null) {
          onLinkVideoPreview2(data.job_detail.link);
        }

        setCompanyCulture(data?.company_profile?.company_culture);
        setVideoLinkBlog(data?.company_profile?.company_blog[0]?.link);
        if (data?.company_profile?.company_blog[0]?.link !== null) {
          onLinkVideoPreview(data?.company_profile?.company_blog[0]?.link);
        }
        setVideoSrcBlog(data?.company_profile?.company_blog[0]?.coverUrl);

        // Get Job list start
        const limit = 50;
        const skip = 0;
        const jobTitle = '';
        const jobDetail = await JobExperienceService.getCompanyJobList(
          data.companyProfileId,
          limit,
          skip,
          jobTitle,
        );
        if (jobDetail.status === 200) {
          const { rows } = jobDetail.data.data;
          if (rows.length > 0) {
            // console.log('Length', rows.length);
            setJobListResponse(rows);
          }
        }
      }
    } catch (e) {
      //   showError(errorHandle(e));
    }
  }

  useEffect(() => {
    setGetButtonSearch(Storage.get('showBackButton'));
    setGetButtonDetailSearch(Storage.get('backButton'));
    handleGetJobDetails();
  }, [query]);

  function handleDateFormat(value) {
    let date = moment(value);

    date = moment(value).format('DD/MM/YYYY');
    const time = moment(value, 'HH:mm A').format('HH:mm A');
    return `${date} at ${time}`;
  }

  const onCompanyJobsearch = async e => {
    setSearchJob(e.target.value);
    const limit = 50;
    const skip = 0;
    const jobTitle = e.target.value;
    const filterList = await JobExperienceService.getCompanyJobList(
      companyProfileId,
      limit,
      skip,
      jobTitle,
    );
    if (filterList.status === 200) {
      const { rows } = filterList.data.data;
      if (rows.length > 0) {
        console.log('JobList', rows);
        setJobListResponse(rows);
      }
    }
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        className="video-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <style>
          {`
            .video-modal .modal-dialog {
              max-width: 100%;
              width: 684px;
              letter-spacing: 0;
            }
            .video-modal .modal-content {
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
            {companyEmployee &&
              companyEmployee.map((item, index) => {
                return index === modalShowIndex ? (
                  <video controls>
                    <source src={item.videoUrl} type="video/mp4" />
                    <track
                      src="captions_en.vtt"
                      kind="captions"
                      srcLang="en"
                      label="english_captions"
                    />
                  </video>
                ) : (
                  ''
                );
              })}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer> */}
        </ModalStyle>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal1(props) {
    return (
      <Modal
        {...props}
        size="lg"
        className="content-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <style>
          {`
            .content-modal .modal-dialog {
              max-width: 100%;
              width: 652px;
              letter-spacing: 0;
            }
            .content-modal .modal-content {
              background: #fff;
              border: 1px solid #e8ecf1;
              box-sizing: border-box;
              box-shadow: 0 0 8px #cfd8e2;
              border-radius: 10px;
            }
          `}
        </style>
        <ModalStyle className="content-modal-wrap">
          <Modal.Body>
            {companyCulture &&
              companyCulture.map((item, index) => {
                return index === modalShowIndex1 ? (
                  <>
                    {item.coverUrl.split('.').pop() === 'mp4' ? (
                      <div className="explore-media-box">
                        <video controls>
                          <source src={item.coverUrl} type="video/mp4" />
                          <track
                            src="captions_en.vtt"
                            kind="captions"
                            srcLang="en"
                            label="english_captions"
                          />
                        </video>
                      </div>
                    ) : (
                      <div className="explore-media-box">
                        {item.coverUrl !== '' ? (
                          <img src={item.coverUrl} alt="" />
                        ) : (
                          ''
                        )}
                      </div>
                    )}

                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </>
                ) : (
                  ''
                );
              })}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer> */}
        </ModalStyle>
      </Modal>
    );
  }

  // const getCarouselList = () => {
  //   let index = 0;
  //   for (let i = 0; i <= jobList.length; i += 1) {
  //     if (index % i === 0) {
  //       const newIndex = index + 3;
  //       const sliceArray = jobList.slice(index, newIndex);
  //       if (sliceArray.length > 0) {
  //         setJobCarlous(sliceArray);
  //       }
  //       index += 3;
  //     }
  //   }
  // };

  //   function handleDateFormat(value) {
  //     let date = moment(value);
  //     const today = moment().endOf('day');

  //     date = moment(value).format('DD/MM/YYYY');
  //     const time = moment(value, 'HH:mm A').format('HH:mm A');
  //     return `${date} at ${time}`;
  //   }

  //   useEffect(() => {
  //     const getJobDetail = async () => {
  //     //   const urlSearchParams = new URLSearchParams(window.location.search);
  //     //   const params = Object.fromEntries(urlSearchParams.entries());
  //       //   const jobId = Storage.get('jobDetailId');
  //       if (query.jobid) {
  //         const res = await JobExperienceService.getJobDetails(query.jobid);
  //         if (res.status === 200) {
  //           const { data } = res.data;
  //           setResponse(data);
  //           console.log('Response', data);
  //         }
  //       }
  //     };
  //     getJobDetail();
  //   }, []);

  const onBackSearchJob = () => {
    const backButton = Storage.get('backButton');
    if (backButton === 'true') {
      router.push('/search-jobs-detail');
    } else {
      router.push('/search-jobs');
    }
  };

  const leftCellDisplay =
    screenWidth >= parseInt(sizes.laptop, 10) ? 'block' : 'none';
  const rightCellWidth = screenWidth >= parseInt(sizes.laptop, 10) ? 8 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 12 : 1;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '40px';

  const SearchJobPostingContent = () => (
    <>
      <PageWrapper>
        <JobPostingHead>
          <JobPostContainer>
            {getBackButtonSearch === 'true' ||
            getBackButtonDetailSearch === 'true' ? (
              <>
                <JobPostingTop onClick={onBackSearchJob}>
                  <BackToList>
                    <Link href="/search-jobs-detail">
                      <>
                        <svg
                          width="8"
                          height="14"
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 13L1 7L7 1"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Back
                      </>
                    </Link>
                  </BackToList>
                </JobPostingTop>{' '}
              </>
            ) : (
              ''
            )}

            <JobPostHeadInfo className="job-posting-list">
              <h3>{response?.jobTitle || ''}</h3>
              <div className="job-post-company">
                <p>{response?.company_profile?.companyName || ''}</p>
              </div>
              <div className="bookmark-btn">
                <Link href="/">
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.0202 22.3125L9.99935 16.5833L1.97852 22.3125V3.97917C1.97852 2.71351 3.00453 1.6875 4.27018 1.6875H15.7285C16.9942 1.6875 18.0202 2.71351 18.0202 3.97917V22.3125Z"
                      stroke="#485768"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              <ul>
                <li>
                  <img src={cdn('/static/img/map-pin.png')} alt="map-pin" />
                  {response?.jobLocation || ''} ({response?.location || ''})
                </li>
                <li>
                  <img src={cdn('/static/img/images/clock.svg')} alt="clock" />
                  Posted: {handleDateFormat(response?.createdAt)}
                </li>
              </ul>
            </JobPostHeadInfo>
          </JobPostContainer>
        </JobPostingHead>
        <JobPostingMain>
          <JobPostLeftPanel>
            <WhyWorkBox>
              <h2>Why work for us?</h2>
              <WorkBoxVideo>
                {previewVideo1 && (
                  <Wrapper
                    className="embed-video-box"
                    dangerouslySetInnerHTML={createNoembedMarkup1()}
                  />
                )}

                {videoUrl && !previewVideo1 && (
                  <>
                    {/* <div className="com-pre-video"> */}
                    <video controls style={{ height: '100%', width: '100%' }}>
                      <source src={videoUrl} type="video/mp4" />
                      <track
                        src="captions_en.vtt"
                        kind="captions"
                        srcLang="en"
                        label="english_captions"
                      />
                    </video>
                    {/* </div> */}
                  </>
                )}

                {!videoUrl && !previewVideo1 && (
                  <>
                    <video controls style={{ height: '100%', width: '100%' }}>
                      <source src={!videoUrl} type="video/mp4" />
                      <track
                        src="captions_en.vtt"
                        kind="captions"
                        srcLang="en"
                        label="english_captions"
                      />
                    </video>
                  </>
                )}
              </WorkBoxVideo>
              <p>{response?.job_detail?.positionInformation || ''}</p>

              <a
                href={response?.job_candidate?.externalWebsiteLink || ''}
                target="_blank"
                rel="noreferrer"
                className="apply-now-btn"
              >
                Apply now
                <svg
                  width="9"
                  height="14"
                  viewBox="0 0 9 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 13L7.5 7L1.5 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </WhyWorkBox>

            <JobPostGrayBbox>
              <h2>The impact you’ll make</h2>
              <WorkBoxVideo>
                {previewVideo2 && (
                  <Wrapper
                    className="embed-video-box"
                    dangerouslySetInnerHTML={createNoembedMarkup2()}
                  />
                )}

                {companyvideoUrl && !previewVideo2 && (
                  // <div className="com-pre-video">
                  <video controls style={{ height: '100%', width: '100%' }}>
                    <source src={companyvideoUrl} type="video/mp4" />
                    <track
                      src="captions_en.vtt"
                      kind="captions"
                      srcLang="en"
                      label="english_captions"
                    />
                  </video>
                  // </div>
                )}

                {!companyvideoUrl && !previewVideo2 && (
                  // <div className="com-pre-video">
                  <video controls style={{ height: '100%', width: '100%' }}>
                    <source src={!companyvideoUrl} type="video/mp4" />
                    <track
                      src="captions_en.vtt"
                      kind="captions"
                      srcLang="en"
                      label="english_captions"
                    />
                  </video>
                  // </div>
                )}

                {/* {(companyvideoUrl || companyvideoLink) && (
                  <div className="com-pre-video">
                    <video controls>
                      <source
                        src={companyvideoUrl || companyvideoLink}
                        type="video/mp4"
                      />
                      <track
                        src="captions_en.vtt"
                        kind="captions"
                        srcLang="en"
                        label="english_captions"
                      />
                    </video>
                  </div>
                )} */}
                {/* {companyvideoUrl}
                {companyvideoLink} */}
                {/* {companyvideoLink !== '' && companyvideoUrl === '' && (
                  <div className="com-pre-video">
                    <video controls>
                      <source src={companyvideoLink} type="video/mp4" />
                      <track
                        src="captions_en.vtt"
                        kind="captions"
                        srcLang="en"
                        label="english_captions"
                      />
                    </video>
                  </div>
                )} */}
              </WorkBoxVideo>
              <p>
                {response?.company_profile?.content || ''}
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nascetur in ultricies sit id nunc fringilla. Mattis ut facilisis
                nisl vulputate hendrerit nulla. Massa, rutrum in faucibus
                facilisi cursus mattis eleifend elementum vitae. Interdum cras
                non vulputate quisque suspendisse sed sit pellentesque.{' '} */}
              </p>
            </JobPostGrayBbox>

            <JobPostingPerksnBenefits>
              <PerksBenefits>
                <PerksTop>
                  <h3 className="com-name">
                    Perks & Benefits at{' '}
                    {response?.company_profile?.companyName || ''}
                  </h3>
                </PerksTop>
                <CompanyBenefitList
                  id="accordion"
                  className="company-benefits-list"
                >
                  <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <svg
                          width="30"
                          height="27"
                          viewBox="0 0 30 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="a"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.306 9.94398C18.8619 9.49964 18.2594 9.25 17.6311 9.25C17.0029 9.25 16.4004 9.49964 15.9563 9.94398L15.4999 10.4004L15.0435 9.94398C14.1185 9.01898 12.6188 9.01898 11.6938 9.94398C10.7687 10.869 10.7687 12.3687 11.6938 13.2937L12.1501 13.7501L15.4999 17.0999L18.8496 13.7501L19.306 13.2937C19.7504 12.8496 20 12.2471 20 11.6189C20 10.9906 19.7504 10.3881 19.306 9.94398Z"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            className="b"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.6709 0.683772C11.5348 0.27543 11.1527 0 10.7222 0C10.2918 0 9.90965 0.27543 9.77354 0.683772L5.8348 12.5H1C0.447715 12.5 0 12.9477 0 13.5C0 14.0523 0.447715 14.5 1 14.5H6.55556C6.98599 14.5 7.36812 14.2246 7.50424 13.8162L10.7222 4.16228L11.7978 7.38889H13.9059L11.6709 0.683772ZM17.7948 19.0556H15.6866L18.1069 26.3162C18.243 26.7246 18.6251 27 19.0556 27C19.486 27 19.8681 26.7246 20.0042 26.3162L23.943 14.5H28.7778C29.3301 14.5 29.7778 14.0523 29.7778 13.5C29.7778 12.9477 29.3301 12.5 28.7778 12.5H23.2222C22.7918 12.5 22.4097 12.7754 22.2735 13.1838L19.0556 22.8377L17.7948 19.0556Z"
                            fill="#1D242F"
                          />
                        </svg>
                        Health and Wellness
                        <span className="toggle-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ToggleAccordion
                          type="button"
                          className="add-benefits-btn"
                          style={{ display: 'none' }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Add Health and Wellness Benefits
                        </ToggleAccordion>
                        <AddedList>
                          <ul>
                            {healthAndWellness &&
                              healthAndWellness.map(item => {
                                return (
                                  <li>
                                    <h4>{item}</h4>
                                  </li>
                                );
                              })}
                          </ul>
                        </AddedList>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.75 7.5C3.75 6.11929 4.86929 5 6.25 5H23.75C25.1307 5 26.25 6.11929 26.25 7.5V25C26.25 26.3807 25.1307 27.5 23.75 27.5H6.25C4.86929 27.5 3.75 26.3807 3.75 25V7.5Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20 2.5V7.5"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 2.5V7.5"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.75 12.5H26.25"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22.5 19L17.5 24"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.5 19L22.5 24"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Vacation and Time Office
                        <span className="toggle-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ToggleAccordion
                          type="button"
                          className="add-benefits-btn"
                          style={{ display: 'none' }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Add Vacation and Time Office Benefits
                        </ToggleAccordion>
                        <AddedList>
                          <ul>
                            {vacation &&
                              vacation.map(item => {
                                return (
                                  <li>
                                    <h4>{item}</h4>
                                  </li>
                                );
                              })}
                          </ul>
                        </AddedList>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <svg
                          width={30}
                          height={30}
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <g clipPath="url(#clip0)">
                            <path
                              d="M15 7.6665V22.3332"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.3333 10.3335H13.3333C12.7145 10.3335 12.121 10.5793 11.6834 11.0169C11.2458 11.4545 11 12.048 11 12.6668C11 13.2857 11.2458 13.8792 11.6834 14.3167C12.121 14.7543 12.7145 15.0002 13.3333 15.0002H16.6667C17.2855 15.0002 17.879 15.246 18.3166 15.6836C18.7542 16.1212 19 16.7147 19 17.3335C19 17.9523 18.7542 18.5458 18.3166 18.9834C17.879 19.421 17.2855 19.6668 16.6667 19.6668H11"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width={16}
                                height={16}
                                fill="white"
                                transform="translate(7 7)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Financial &amp; Retirement
                        <span className="toggle-icon">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ToggleAccordion
                          type="button"
                          className="add-benefits-btn"
                          style={{ display: 'none' }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Add Financial &amp; Retirement Benefits
                        </ToggleAccordion>
                        <AddedList>
                          <ul>
                            {financial &&
                              financial.map(item => {
                                return (
                                  <li>
                                    <h4>{item}</h4>
                                  </li>
                                );
                              })}
                          </ul>
                        </AddedList>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        <svg
                          width={31}
                          height={29}
                          viewBox="0 0 31 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.5 27C22.4036 27 28 21.4036 28 14.5C28 7.59644 22.4036 2 15.5 2C8.59644 2 3 7.59644 3 14.5C3 21.4036 8.59644 27 15.5 27Z"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.5 22L15.5 12"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.5 16L12.5 14.5"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.5 14.5L18.5 13"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.7803 17.8267C16.2392 18.133 16.7566 18.341 17.2998 18.4377C17.843 18.5345 18.4003 18.5177 18.9368 18.3886C19.4732 18.2595 19.9771 18.0208 20.4169 17.6875C20.8566 17.3542 21.2226 16.9336 21.4919 16.452C21.7612 15.9704 21.9279 15.4383 21.9816 14.8892C22.0353 14.34 21.9748 13.7857 21.8039 13.2611C21.633 12.7365 21.3554 12.2529 20.9885 11.8407C20.6217 11.4286 20.1736 11.0968 19.6723 10.8662C19.5588 10.8139 19.4691 10.721 19.4208 10.6058C19.0966 9.83367 18.5516 9.17446 17.8542 8.71088C17.1568 8.2473 16.338 8 15.5006 8C14.6631 8 13.8443 8.2473 13.1469 8.71088C12.4495 9.17446 11.9045 9.83367 11.5803 10.6058C11.532 10.721 11.4423 10.8139 11.3288 10.8662C10.8275 11.0967 10.3793 11.4285 10.0123 11.8407C9.64541 12.2528 9.36774 12.7364 9.19679 13.2611C9.02583 13.7858 8.96529 14.3401 9.01897 14.8893C9.07265 15.4385 9.23938 15.9707 9.50869 16.4523C9.778 16.9339 10.1441 17.3546 10.5838 17.6879C11.0236 18.0212 11.5276 18.2599 12.0641 18.389C12.6006 18.5181 13.158 18.5348 13.7013 18.438C14.2445 18.3412 14.7619 18.1331 15.2208 17.8267C15.3035 17.7711 15.4009 17.7415 15.5006 17.7415C15.6002 17.7415 15.6976 17.7711 15.7803 17.8267Z"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Professional Development
                        <span className="toggle-icon">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ToggleAccordion
                          type="button"
                          className="add-benefits-btn"
                          style={{ display: 'none' }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Add Professional Development Benefits
                        </ToggleAccordion>
                        <AddedList>
                          <ul>
                            {professional &&
                              professional.map(item => {
                                return (
                                  <li>
                                    <h4>{item}</h4>
                                  </li>
                                );
                              })}
                          </ul>
                        </AddedList>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        <svg
                          width={30}
                          height={30}
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 12H22C23.0609 12 24.0783 12.4214 24.8284 13.1716C25.5786 13.9217 26 14.9391 26 16C26 17.0609 25.5786 18.0783 24.8284 18.8284C24.0783 19.5786 23.0609 20 22 20H21"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 12H21V21C21 22.0609 20.5786 23.0783 19.8284 23.8284C19.0783 24.5786 18.0609 25 17 25H9C7.93913 25 6.92172 24.5786 6.17157 23.8284C5.42143 23.0783 5 22.0609 5 21V12Z"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 5V8"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13 5V8"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 5V8"
                            stroke="#1D242F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Office Life and Perks
                        <span className="toggle-icon">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D242F"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ToggleAccordion
                          type="button"
                          className="add-benefits-btn"
                          style={{ display: 'none' }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Add Office Life and Perks Benefits
                        </ToggleAccordion>
                        <AddedList>
                          <ul>
                            {office &&
                              office.map(item => {
                                return (
                                  <li>
                                    <h4>{item}</h4>
                                  </li>
                                );
                              })}
                          </ul>
                        </AddedList>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </CompanyBenefitList>
              </PerksBenefits>
            </JobPostingPerksnBenefits>

            <JobPostGrayBbox>
              <h2>What you’ll bring to the table</h2>
              <p>{response?.job_detail?.qualification || ''}</p>
              {/* <p>
                Your typical daily tasks/responsibilities
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nascetur in ultricies sit id nunc fringilla. Mattis ut facilisis
                nisl vulputate hendrerit nulla. Massa, rutrum in faucibus
                facilisi cursus mattis eleifend elementum vitae.
              </p> */}
            </JobPostGrayBbox>

            <MeetEmployees>
              <div className="meet-employees-container">
                <div className="meet-employees-top">
                  <h3 className="com-name">
                    Meet {response?.company_profile?.companyName || ''}{' '}
                    Employees
                  </h3>
                </div>
                <div className="meet-employees_main">
                  {companyEmployee &&
                    companyEmployee.map((item, index) => {
                      return (
                        <div className="employee_one">
                          <div className="employee_one_inner">
                            <div className="employee_img">
                              <img
                                src={
                                  item.pictureUrl
                                    ? item.pictureUrl
                                    : cdn('/static/img/default-profile.png')
                                }
                                alt="Employee"
                              />
                              <button
                                type="button"
                                className="video-icon"
                                data-toggle="modal"
                                data-target="#sendInvite"
                                onClick={() => {
                                  setModalShow(true);
                                  setModalShowIndex(index);
                                }}
                              >
                                <img
                                  src={cdn('/static/img/images/play-white.svg')}
                                  alt="play-white"
                                />
                              </button>
                            </div>
                            <div className="employee_details">
                              <h3 className="employee-name">{item.fullName}</h3>
                              <span className="designation">
                                {item.position}
                              </span>
                              <p>{item.content}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  {/* <div className="employee_one">
                    <div className="employee_one_inner">
                      <div className="employee_img">
                        <img
                          src={cdn('/static/img/images/employee2.png')}
                          alt="Employee"
                        />
                        <button
                          type="button"
                          className="video-icon"
                          data-toggle="modal"
                          data-target="#sendInvite"
                          // onClick={() => {
                          //   setModalShow(true);
                          //   setModalShowIndex(index);
                          // }}
                        >
                          <img
                            src={cdn('/static/img/images/play-white.svg')}
                            alt="play-white"
                          />
                        </button>
                      </div>
                      <div className="employee_details">
                        <h3 className="employee-name">Julia Claire</h3>
                        <span className="designation">Position</span>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ac, sed quisque proin fringilla. Ridiculus
                          lacinia quis erat diam fermentum enim quisque
                          interdum. Donec id eget turpis.
                        </p>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="employee_one">
                    <div className="employee_one_inner">
                      <div className="employee_img">
                        <img
                          src={cdn('/static/img/images/employee3.png')}
                          alt="Employee"
                        />
                        <button
                          type="button"
                          className="video-icon"
                          data-toggle="modal"
                          data-target="#sendInvite"
                          // onClick={() => {
                          //   setModalShow(true);
                          //   setModalShowIndex(index);
                          // }}
                        >
                          <img
                            src={cdn('/static/img/images/play-white.svg')}
                            alt="play-white"
                          />
                        </button>
                      </div>
                      <div className="employee_details">
                        <h3 className="employee-name">Kaithy Smith</h3>
                        <span className="designation">Position</span>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Habitasse metus varius.
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
                {companyEmployee.length > 3 && (
                  <div className="show_more-employees">
                    <a href="/" className="showmore">
                      Show more
                    </a>
                  </div>
                )}
              </div>
            </MeetEmployees>
          </JobPostLeftPanel>

          <JobCompanyBox>
            <div className="job-company-header">
              <h3>Working at {response?.company_profile?.companyName || ''}</h3>
              <a href="/">
                <img
                  src={
                    response?.company_profile?.logoUrl
                      ? response?.company_profile?.logoUrl
                      : cdn('/static/img/default-profile.png')
                  }
                  //   src={cdn('/static/img/images/spotify-logo.svg')}
                  alt="spotify-logo"
                />
              </a>
            </div>
            <div className="job-com-info">
              <ul>
                <li>
                  <h4>
                    <img
                      src={cdn('/static/img/company-icon.svg')}
                      alt="company-icon"
                      className="company-icon"
                    />
                    Company name
                  </h4>
                  <p>{response?.company_profile?.companyName || ''}</p>
                </li>
                <li>
                  <h4>
                    <img src={cdn('/static/img/industry.png')} alt="industry" />
                    Industry
                  </h4>
                  <p>
                    {response?.company_profile?.company_about?.industry || ''}
                  </p>
                </li>
                <li>
                  <h4>
                    <img src={cdn('/static/img/map-pin.png')} alt="map-pin" />
                    Location
                  </h4>
                  <p>
                    {response?.company_profile?.company_about.headquarters ||
                      ''}
                  </p>
                </li>
                <li>
                  <h4>
                    <img
                      src={cdn('/static/img/company-size.png')}
                      alt="company-size"
                    />
                    Company size
                  </h4>
                  <p>
                    {response?.company_profile?.company_about?.companySize ||
                      ''}
                  </p>
                </li>
                <li>
                  <h4>
                    <img
                      src={cdn('/static/img/perks.png')}
                      alt="company-size"
                    />
                    Perks &amp; Benefits
                  </h4>
                  <p>{count}</p>
                </li>
              </ul>
            </div>
            <div className="job-company-body">
              <p>{response?.company_profile?.content}</p>
              <div className="view-com-link">
                <Link href="/company/signin">
                  <a href="/company/signin">
                    visit company page
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 12.9995L7 6.99951L0.999999 0.999512"
                        stroke="#1ED760"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </JobCompanyBox>
        </JobPostingMain>

        {jobList.length > 1 && (
          <HiringOuterWrapper>
            <CompnayPreviewWrapper>
              <div className="now_hiring">
                <h3 className="com-name">
                  Now hiring at {response?.company_profile?.companyName || ''}
                </h3>
                <div className="search-form">
                  <input
                    type="search"
                    value={searchJob}
                    placeholder="Search by keywords"
                    name="search"
                    onChange={onCompanyJobsearch}
                    // onChange={e => setSearchJob(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={e => router.push('/company/signin')}
                  >
                    Get Hired
                  </button>
                </div>

                <Carousel>
                  {jobList &&
                    jobList.map(item => (
                      <Carousel.Item>
                        <div className="job_one">
                          <h3 className="job-name">{item.jobTitle}</h3>
                          <span className="company-name">
                            {response?.company_profile?.companyName || ''}
                          </span>
                          <div className="d-flex align-items-center">
                            <img
                              src={cdn('/static/img/map-pin.png')}
                              alt="MapPin"
                            />
                            {item.jobLocation}
                          </div>
                          <div className="job-posting d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <img
                                src={cdn('/static/img/industry.png')}
                                alt="Industry"
                              />
                              {item.employmentType}
                            </div>

                            <PostReadMore
                              onClick={e => {
                                Storage.add('backButton', true);
                                router.push(`/search-job-posting/${item.id}`);
                              }}
                            >
                              view full posting
                            </PostReadMore>

                            {/* <a href="/">view job posting </a> */}
                          </div>
                          {/* <a href="/" className="save-the-job">
                          <img
                            src={cdn('/static/img/save-job.png')}
                            alt="save-job"
                          />
                        </a> */}
                        </div>
                      </Carousel.Item>
                    ))}
                </Carousel>

                {/* <Carousel>
                <Carousel.Item>
                  <div className="job_one">
                    <h3 className="job-name">Job Posting Name</h3>
                    <span className="company-name">
                      {response?.company_profile?.companyName || ''}
                    </span>
                    <div className="d-flex align-items-center">
                      <img src={cdn('/static/img/map-pin.png')} alt="MapPin" />
                      Location
                    </div>
                    <div className="job-posting d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <img
                          src={cdn('/static/img/industry.png')}
                          alt="Industry"
                        />
                        Full Time
                      </div>
                      <a href="/">view job posting </a>
                    </div>
                    <a href="/" className="save-the-job">
                      <img
                        src={cdn('/static/img/save-job.png')}
                        alt="save-job"
                      />
                    </a>
                  </div>
                 
                </Carousel.Item>
                <Carousel.Item>
                  <div className="job_one">
                    <h3 className="job-name">Job Posting Name</h3>
                    <span className="company-name">
                      {response?.company_profile?.companyName || ''}
                    </span>
                    <div className="d-flex align-items-center">
                      <img src={cdn('/static/img/map-pin.png')} alt="MapPin" />
                      Location
                    </div>
                    <div className="job-posting d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <img
                          src={cdn('/static/img/industry.png')}
                          alt="Industry"
                        />
                        Full Time
                      </div>
                      <a href="/">view job posting </a>
                    </div>
                    <a href="/" className="save-the-job">
                      <img
                        src={cdn('/static/img/save-job.png')}
                        alt="save-job"
                      />
                    </a>
                  </div>
                </Carousel.Item>

                <Carousel.Item>
                  <div className="job_one">
                    <h3 className="job-name">Job Posting Name</h3>
                    <span className="company-name">
                      {response?.company_profile?.companyName || ''}
                    </span>
                    <div className="d-flex align-items-center">
                      <img src={cdn('/static/img/map-pin.png')} alt="MapPin" />
                      Location
                    </div>
                    <div className="job-posting d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <img
                          src={cdn('/static/img/industry.png')}
                          alt="Industry"
                        />
                        Full Time
                      </div>
                      <a href="/">view job posting </a>
                    </div>
                    <a href="/" className="save-the-job">
                      <img
                        src={cdn('/static/img/save-job.png')}
                        alt="save-job"
                      />
                    </a>
                  </div>
                </Carousel.Item>
              </Carousel> */}

                {/* <div className="slider-footer">
                    <button
                      type="button"
                      onClick={PrevJobList}
                      className="prev nav-buttons"
                      disabled={prevList}
                    >
                      Prev
                    </button>
                    <div className="nav-dots">
                      <span className="active nav-dot"> </span>
                      <span className="nav-dot"> </span>
                      <span className="nav-dot"> </span>
                    </div>
                    <button
                      type="button"
                      className="next nav-buttons"
                      onClick={NextJobList}
                      disabled={nextList}
                    >
                      Next
                    </button>
                  </div> */}
              </div>
            </CompnayPreviewWrapper>
            {/* <CompnayPreviewWrapper>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={cdn('/static/img/loggedinuser.svg')}
                      alt="loggedinuser"
                    />
                  </Carousel.Item>
                </Carousel>
              </CompnayPreviewWrapper> */}
          </HiringOuterWrapper>
        )}

        <ZigZagWrap>
          <div className="zig-zag-inner">
            {companyCulture &&
              companyCulture.map((item, index) => {
                return (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="img">
                        {item.coverUrl.split('.').pop() === 'mp4' ? (
                          // <div className="img">
                          <video controls>
                            <source src={item.coverUrl} type="video/mp4" />
                            <track
                              src="captions_en.vtt"
                              kind="captions"
                              srcLang="en"
                              label="english_captions"
                            />
                          </video>
                        ) : (
                          // </div>
                          <>
                            {item.coverUrl !== '' ? (
                              <img src={item.coverUrl} alt="" />
                            ) : (
                              <div className="img" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info">
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        <button
                          type="button"
                          className="explore-link"
                          data-toggle="modal"
                          data-target="#exploreModal"
                          onClick={() => {
                            setModalShow1(true);
                            setModalShowIndex1(index);
                          }}
                        >
                          Explore further
                          <svg
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 13L7 7L1 1"
                              stroke="#009DE9"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* <div className="row">
              <div className="col-md-6">
                <div className="img">
                  <img src={cdn('/static/img/images/toggle-1.png')} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="info">
                  <h3>Title 1</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
                    commodo egestas nunc elit. Imperdiet mollis accumsan, id
                    amet adipiscing eget proin laoreet risus. Aliquam auctor
                    nibh nibh id.
                  </p>
                  <a
                    href="/"
                    className="explore-link"
                    data-toggle="modal"
                    data-target="#exploreModal"
                  >
                    Explore further
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 13L7 7L1 1"
                        stroke="#009DE9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div> */}
            {/* <div className="row">
              <div className="col-md-6">
                <div className="img">
                  <img src={cdn('/static/img/images/toggle-1.png')} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="info">
                  <h3>Title 1</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
                    commodo egestas nunc elit. Imperdiet mollis accumsan, id
                    amet adipiscing eget proin laoreet risus. Aliquam auctor
                    nibh nibh id.
                  </p>
                  <a
                    href="/"
                    className="explore-link"
                    data-toggle="modal"
                    data-target="#exploreModal"
                  >
                    Explore further
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 13L7 7L1 1"
                        stroke="#009DE9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </ZigZagWrap>

        {/* <FeatureArticleone>
          <FeatureArticleInnertwo>
            <div className="toggle_sections">
              <div className="row">
                <div className="col-md-6">
                  <div className="img">
                    <video controls style={{ height: '100%', width: '100%' }}>
                      <source type="video/mp4" />
                      <track
                        src="captions_en.vtt"
                        kind="captions"
                        srcLang="en"
                        label="english_captions"
                      />
                    </video>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info">
                    <h3>itle</h3>
                    <p>ntent</p>
                  </div>
                </div>
              </div>
            </div>
          </FeatureArticleInnertwo>
        </FeatureArticleone> */}

        <FeatureArticle>
          <FeatureArticleInner>
            <h3>Featured Article</h3>
            <ArticleImgBox>
              {previewVideo && (
                <Wrapper
                  className="embed-video-box"
                  dangerouslySetInnerHTML={createNoembedMarkup()}
                />
              )}

              {videoSrcBlog !== '' && !previewVideo && (
                <>
                  {/* <div className="com-pre-video"> */}
                  <video controls>
                    <source src={videoSrcBlog} type="video/mp4" />
                    <track
                      src="captions_en.vtt"
                      kind="captions"
                      srcLang="en"
                      label="english_captions"
                    />
                  </video>
                  {/* </div> */}
                </>
              )}

              {!videoSrcBlog && !previewVideo && (
                <>
                  <video controls>
                    <source src={!videoSrcBlog} type="video/mp4" />
                    <track
                      src="captions_en.vtt"
                      kind="captions"
                      srcLang="en"
                      label="english_captions"
                    />
                  </video>
                </>
              )}

              {/* <img
                src={cdn('/static/img/images/feature-article-img.png')}
                alt="feature-article-img"
              /> */}
            </ArticleImgBox>
            <ArticleInfo>
              <h4>
                {response?.company_profile?.company_blog[0]?.content || ''}
              </h4>
              <p>{response?.company_profile?.company_blog[0]?.content || ''}</p>
              <LearnMoreLink href="/">Learn more</LearnMoreLink>
            </ArticleInfo>
          </FeatureArticleInner>
        </FeatureArticle>

        <SocialFeedWrap>
          <JobPostContainer className="social-feed-container">
            <div className="row">
              {response?.company_profile?.company_about?.socialfeedlinkone !==
                '' && (
                <div className="col-md-6">
                  <SocialFeedImg>
                    <img
                      src={cdn('/static/img/images/loggedinuser.svg')}
                      alt="Social Feed "
                    />
                  </SocialFeedImg>
                  <LinkPreview
                    url={
                      response?.company_profile?.company_about
                        ?.socialfeedlinkone || ''
                    }
                  />
                </div>
              )}

              {response?.company_profile?.company_about
                ?.socialfeedlinksecond !== '' && (
                <div className="col-md-6">
                  <SocialFeedImg className="social-feed-img">
                    <img
                      src={cdn('/static/img/images/loggedinuser.svg')}
                      alt="Social Feed"
                    />
                  </SocialFeedImg>
                  <LinkPreview
                    url={
                      response?.company_profile?.company_about
                        ?.socialfeedlinksecond || ''
                    }
                  />
                </div>
              )}
            </div>
          </JobPostContainer>
        </SocialFeedWrap>
      </PageWrapper>
    </>
  );

  const content = SearchJobPostingContent();

  return (
    <>
      <Page
        title="Search Jobs"
        description="Search Jobs Page"
        nav={{ show: false }}
        topbar={{ show: false }}
        isVerified
      >
        {content}
      </Page>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <MyVerticallyCenteredModal1
        show={modalShow1}
        onHide={() => setModalShow1(false)}
      />
    </>
  );
};

export default SearchJobPosting;

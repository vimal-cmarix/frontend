import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Page from '@components/templates/Page';
// import Perk from '@src/assets/images/perks.png';
// import CompanySize from '@src/assets/images/company-size.png';
// import featureimg from '@src/assets/images/feature-article-img.png';
// import MapPin from '@src/assets/images/map-pin.png';
// import Industry from '@src/assets/images/industry.png';
// import loggedinuser from '@src/assets/images/loggedinuser.svg';
// import toggle3 from '@src/assets/images/toggle-3.png';
// import toggle2 from '@src/assets/images/toggle-2.png';
// import toggle1 from '@src/assets/images/toggle-1.png';
// import spotifyLogo from '@src/assets/images/spotify-logo.png';
// import playWhite from '@src/assets/images/play-white.svg';
// import employee3 from '@src/assets/images/employee3.png';
// import employee2 from '@src/assets/images/employee2.png';
// import employee1 from '@src/assets/images/employee1.png';
// import VideoUpload from '@src/assets/images/Video-Upload.png';
// import SaveJob from '@src/assets/images/save-job.png';
// import clock from '@src/assets/images/clock.svg';
import Link from 'next/link';
import { withAuthSync } from '@src/utils/auth';
import { cdn } from '@utils/general';
import { Dropdown, Modal, Accordion } from 'react-bootstrap';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import AtsDetails from '@src/api/services/ats';
import HeaderB2B from '@components/organisms/headerB2B';

import {
  OuterWrapper,
  PerksBenefits,
  PerksTop,
  CompanyBenefitList,
  ToggleAccordion,
  JobPostMain,
  SearchHeader,
  BackToList,
  JObPostingList,
  JObPostItem,
  JobPostCompany,
  BookmarkBtn,
  JobPostingWrap,
  JobPostingLeftPanel,
  WhyWorkBox,
  WorkBoxVideo,
  PerksBenefitsWrap,
  EmployeeOne,
  EmployeeDetail,
  EmployeeImg,
  ShowMoreEmployees,
  MeetEmployeeOne,
  MeetEmployeesSection,
  MeetEmployeesTop,
  MeetEmployeesWrap,
  JobCompanyBox,
  JobCompanyHeader,
  JobComInfo,
  JobCompanyBody,
  NowHiring,
  NowHiringWrap,
  SearchForm,
  JobOne,
  SliderFooter,
  ZigZagWrap,
  ZigZagWrapRow,
  Info,
  SocialFeedWrapRow,
  FeatureArticleWrap,
  FeatureArticleImg,
  FeatureArticleInner,
  ArticleInfo,
  SocialFeedImg,
  SocialFeedWrap,
  SocialFeedBox,
  ModalStyle,
  ApplyNowButton,
} from './style';

const JobPosting = () => {
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [companyName, settCompanyName] = useState('');
  const [jobList, setJoblist] = useState([]);
  const [jobListNext, SetJobListNext] = useState();
  const [jobListPrev, SetJobListPrev] = useState();
  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const [ExploreFurthermodalShow, setExploreFurtherModalShow] = React.useState(
    false,
  );

  const toast = useToast();
  //let getAtsDetail;
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  async function getDetails() {
    const jonInfoId = '51209304-b397-4426-bb94-224cca1582b9';
    try {
      const res = await AtsDetails.getJobDetails(jonInfoId);
      console.log('response', res.data.data);
      //getAtsDetail = res.dat.data;
      //console.log('job', jobTitle, getAtsDetail);
      // setDashboard(res.data.data.job_swimlane);
      // setJobInfoId(res.data.data.id);
      // //setSwamLineId(res.data.data.)
      // setJobCard(res.data.data.job_swimlane.applyJobCards);
      setJobTitle(res.data.data.jobTitle);
      setJobLocation(res.data.data.jobLocation);
      setLocation(res.data.data.location);
      settCompanyName(res.data.data.company_profile.companyName);
      // console.log('job', res.data.data.job_swimlane[1].applyJobCards);
      setLoading(false);

      if (res.status === 201) {
        console.log('success');
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function getJobPost() {
    const jonInfoId = '9bff9e9f-4b2c-4b60-b763-8ef8703e61bb';
    console.log('limi', limit, skip, firstName);
    try {
      const res = await AtsDetails.getJobPostingDetail(
        jonInfoId,
        limit,
        skip,
        firstName,
      );
      console.log('response67', res.data.data);
      setJoblist(res.data.data.rows);
      SetJobListNext(res.data.data.links.next);
      SetJobListPrev(res.data.data.links.prev);
      const re = jobListNext;
      console.log('re', re);
      // setJobTitle(res.data.data.jobTitle);
      // setJobLocation(res.data.data.jobLocation);
      // setLocation(res.data.data.location);
      // settCompanyName(res.data.data.company_profile.companyName);
      // // console.log('job', res.data.data.job_swimlane[1].applyJobCards);
      setLoading(false);

      if (res.status === 201) {
        console.log('success');
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function NextJobList() {
    console.log('jobListNext', jobListNext);
    if (jobListNext !== null) {
      setSkip(3);
      getJobPost();
    }
    //const next = await AtsDetails.NextJob(jobListNext);
    //console.log('next', next);
  }

  async function PrevJobList() {
    console.log('jobListNext', jobListPrev);
    if (jobListPrev !== null) {
      setSkip(0);
      getJobPost();
    }
    //const next = await AtsDetails.NextJob(jobListNext);
    //console.log('next', next);
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        className="send-invite-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <style>
          {`
            .send-invite-modal .modal-dialog {
              max-width: 100%;
              width: 684px;
              letter-spacing: 0;
            }
            .send-invite-modal .modal-content {
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
            {/* <img src={VideoUpload} alt="" /> */}
            <img
              src={cdn('/static/img/images/Video-Upload.png')}
              alt="Video-Upload"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet,
              habitasse aliquet cras aliquet massa posuere semper lorem vitae.
              Fermentum consequat metus nibh mi et nec sit. Id risus,
              pellentesque ut erat fusce etiam mauris dignissim in. Eget orci,
              sollicitudin at ullamcorper. Nibh ultrices vestibulum non praesent
              justo. Vitae diam, sed in odio ullamcorper ultrices dictumst.
            </p>
            <Link href="/company/job-post-second-page">
              <ApplyNowButton>
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
              </ApplyNowButton>
            </Link>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer> */}
        </ModalStyle>
      </Modal>
    );
  }

  function MyExploreFurtherModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        className="send-invite-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <style>
          {`
            .send-invite-modal .modal-dialog {
              max-width: 100%;
              width: 684px;
              letter-spacing: 0;
            }
            .send-invite-modal .modal-content {
              background: #FFFFFF;
              border-radius: 10px;
              border: none;
            }
            h3{
              font-family: Mulish;
              font-style: normal;
              font-weight: 700;
              font-size: 24px;
              line-height: 28px;
              color: #1d242f;
              margin-bottom: 6px;
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
            {/* <img src={VideoUpload} alt="" /> */}
            <img
              src={cdn('/static/img/images/Video-Upload.png')}
              alt="Video-Upload"
            />
            <h3>Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
              commodo egestas nunc elit. Imperdiet mollis accumsan, id amet
              adipiscing eget proin laoreet risus. Aliquam auctor nibh nibh id.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
              commodo egestas nunc elit. Imperdiet mollis accumsan, id amet
              adipiscing eget proin laoreet risus. Aliquam auctor nibh nibh id.{' '}
            </p>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer> */}
        </ModalStyle>
      </Modal>
    );
  }

  useEffect(() => {
    console.log(firstName);
    getJobPost();
  }, [firstName]);

  const componentDidMount = fun => useEffect(fun, []);
  componentDidMount(() => {
    setLoading(true);
    getDetails();
    getJobPost();
  });

  const rightContent = () => (
    <OuterWrapper>
      <HeaderB2B />
      <JobPostMain>
        <SearchHeader>
          <BackToList>
            <a href="/ats-dashboard">
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
              Back to hiring journey
            </a>
          </BackToList>
        </SearchHeader>

        <JObPostingList>
          <JObPostItem>
            <h3>{jobTitle}</h3>
            <JobPostCompany>
              <p>{companyName}</p>
            </JobPostCompany>
            <BookmarkBtn>
              <a href="/">
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
              </a>
            </BookmarkBtn>
            <ul>
              <li>
                {/* <img src={MapPin} alt="mappin" /> */}
                <img
                  src={cdn('/static/img/images/map-pin.png')}
                  alt="map-pin"
                />
                {jobLocation} ({location})
              </li>
              <li>
                {/* <img src={clock} alt="" /> */}
                <img src={cdn('/static/img/images/clock.svg')} alt="clock" />
                Posted: X days ago
              </li>
            </ul>
          </JObPostItem>
        </JObPostingList>

        <JobPostingWrap>
          <JobPostingLeftPanel>
            <WhyWorkBox>
              <h2>Why work for us?</h2>
              <WorkBoxVideo>
                <div>
                  <button
                    type="button"
                    className="btn action-btn"
                    data-toggle="modal"
                    data-target="#sendInvite"
                    onClick={() => setModalShow(true)}
                    // onClick={e => changeClassName()}
                  >
                    {/* <img src={VideoUpload} alt="" /> */}
                    <img
                      src={cdn('/static/img/images/Video-Upload.png')}
                      alt="Video-Upload"
                    />
                  </button>
                </div>
              </WorkBoxVideo>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet,
                habitasse aliquet cras aliquet massa posuere semper lorem vitae.
                Fermentum consequat metus nibh mi et nec sit. Id risus,
                pellentesque ut erat fusce etiam mauris dignissim in. Eget orci,
                sollicitudin at ullamcorper. Nibh ultrices vestibulum non
                praesent justo. Vitae diam, sed in odio ullamcorper ultrices
                dictumst.
              </p>

              <a href="/job-posting-new" className="apply-now-btn">
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

            <WhyWorkBox className="job-posting-gray-box">
              <h2>The impact you’ll make</h2>
              <WorkBoxVideo>
                <a
                  href="/job-posting-new"
                  data-toggle="modal"
                  data-target="#applyNowModal"
                >
                  {/* <img src={VideoUpload} alt="" /> */}
                  <img
                    src={cdn('/static/img/images/Video-Upload.png')}
                    alt="Video-Upload"
                  />
                </a>
              </WorkBoxVideo>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nascetur in ultricies sit id nunc fringilla. Mattis ut facilisis
                nisl vulputate hendrerit nulla. Massa, rutrum in faucibus
                facilisi cursus mattis eleifend elementum vitae. Interdum cras
                non vulputate quisque suspendisse sed sit pellentesque.{' '}
              </p>
            </WhyWorkBox>

            <PerksBenefitsWrap>
              <PerksBenefits>
                <PerksTop>
                  <h3 className="com-name">Perks &amp; Benefits at Spotify</h3>
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
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </CompanyBenefitList>

                {/* <CompanyBenefitList
                  id="accordion"
                  className="company-benefits-list"
                >
                  <Card>
                    <CardHeader id="headingOne">
                      <h3>
                        <button
                          type="button"
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
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
                        </button>
                      </h3>
                    </CardHeader>

                    <div
                      id="collapseOne"
                      className="company-benefits-body collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <a
                        href="/health-and-wellness"
                        className="add-benefits-btn"
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
                      </a>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader id="headingTwo">
                      <h3>
                        <button
                          type="button"
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
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
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17.5 19L22.5 24"
                              stroke="black"
                              strokeWidth="1.75"
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
                        </button>
                      </h3>
                    </CardHeader>
                    <div
                      id="collapseTwo"
                      className="company-benefits-body collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <a
                        href="/health-and-wellness"
                        className="add-benefits-btn"
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
                      </a>
                    </div>
                  </Card>
                  <Card>
                    <CardHeader id="headingThree">
                      <h3>
                        <button
                          type="button"
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
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
                              d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <g clipPath="url(#clip0)">
                              <path
                                d="M15 7.6665V22.3332"
                                stroke="#1D242F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18.3333 10.3335H13.3333C12.7145 10.3335 12.121 10.5793 11.6834 11.0169C11.2458 11.4545 11 12.048 11 12.6668C11 13.2857 11.2458 13.8792 11.6834 14.3167C12.121 14.7543 12.7145 15.0002 13.3333 15.0002H16.6667C17.2855 15.0002 17.879 15.246 18.3166 15.6836C18.7542 16.1212 19 16.7147 19 17.3335C19 17.9523 18.7542 18.5458 18.3166 18.9834C17.879 19.421 17.2855 19.6668 16.6667 19.6668H11"
                                stroke="#1D242F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0">
                                <rect
                                  width="16"
                                  height="16"
                                  fill="white"
                                  transform="translate(7 7)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          Financial &amp; Retirement
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
                        </button>
                      </h3>
                    </CardHeader>
                    <div
                      id="collapseThree"
                      className="company-benefits-body collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <a
                        href="/health-and-wellness"
                        className="add-benefits-btn"
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
                      </a>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader id="headingFour">
                      <h3>
                        <button
                          type="button"
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          <svg
                            width="31"
                            height="29"
                            viewBox="0 0 31 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.5 27C22.4036 27 28 21.4036 28 14.5C28 7.59644 22.4036 2 15.5 2C8.59644 2 3 7.59644 3 14.5C3 21.4036 8.59644 27 15.5 27Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.5 22L15.5 12"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.5 16L12.5 14.5"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.5 14.5L18.5 13"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.7803 17.8267C16.2392 18.133 16.7566 18.341 17.2998 18.4377C17.843 18.5345 18.4003 18.5177 18.9368 18.3886C19.4732 18.2595 19.9771 18.0208 20.4169 17.6875C20.8566 17.3542 21.2226 16.9336 21.4919 16.452C21.7612 15.9704 21.9279 15.4383 21.9816 14.8892C22.0353 14.34 21.9748 13.7857 21.8039 13.2611C21.633 12.7365 21.3554 12.2529 20.9885 11.8407C20.6217 11.4286 20.1736 11.0968 19.6723 10.8662C19.5588 10.8139 19.4691 10.721 19.4208 10.6058C19.0966 9.83367 18.5516 9.17446 17.8542 8.71088C17.1568 8.2473 16.338 8 15.5006 8C14.6631 8 13.8443 8.2473 13.1469 8.71088C12.4495 9.17446 11.9045 9.83367 11.5803 10.6058C11.532 10.721 11.4423 10.8139 11.3288 10.8662C10.8275 11.0967 10.3793 11.4285 10.0123 11.8407C9.64541 12.2528 9.36774 12.7364 9.19679 13.2611C9.02583 13.7858 8.96529 14.3401 9.01897 14.8893C9.07265 15.4385 9.23938 15.9707 9.50869 16.4523C9.778 16.9339 10.1441 17.3546 10.5838 17.6879C11.0236 18.0212 11.5276 18.2599 12.0641 18.389C12.6006 18.5181 13.158 18.5348 13.7013 18.438C14.2445 18.3412 14.7619 18.1331 15.2208 17.8267C15.3035 17.7711 15.4009 17.7415 15.5006 17.7415C15.6002 17.7415 15.6976 17.7711 15.7803 17.8267Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Professional Development
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
                        </button>
                      </h3>
                    </CardHeader>
                    <div
                      id="collapseFour"
                      className="company-benefits-body collapse"
                      aria-labelledby="headingFour"
                      data-parent="#accordion"
                    >
                      <a
                        href="/health-and-wellness"
                        className="add-benefits-btn"
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
                      </a>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader id="headingFive">
                      <h3>
                        <button
                          type="button"
                          className="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 12H22C23.0609 12 24.0783 12.4214 24.8284 13.1716C25.5786 13.9217 26 14.9391 26 16C26 17.0609 25.5786 18.0783 24.8284 18.8284C24.0783 19.5786 23.0609 20 22 20H21"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5 12H21V21C21 22.0609 20.5786 23.0783 19.8284 23.8284C19.0783 24.5786 18.0609 25 17 25H9C7.93913 25 6.92172 24.5786 6.17157 23.8284C5.42143 23.0783 5 22.0609 5 21V12Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 5V8"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13 5V8"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17 5V8"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Office Life and Perks
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
                        </button>
                      </h3>
                    </CardHeader>
                    <div
                      id="collapseFive"
                      className="company-benefits-body collapse"
                      aria-labelledby="headingFive"
                      data-parent="#accordion"
                    >
                      <a
                        href="/health-and-wellness"
                        className="add-benefits-btn"
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
                      </a>
                    </div>
                  </Card>
                </CompanyBenefitList>
               */}
              </PerksBenefits>
            </PerksBenefitsWrap>

            <WhyWorkBox className="job-posting-gray-box">
              <h2>What you’ll bring to the table</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nascetur in ultricies sit id nunc fringilla. Mattis ut facilisis
                nisl vulputate hendrerit nulla. Massa, rutrum in faucibus
                facilisi cursus mattis eleifend elementum vitae. Interdum cras
                non vulputate quisque suspendisse sed sit pellentesque.
              </p>
              <p>
                Your typical daily tasks/responsibilities
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nascetur in ultricies sit id nunc fringilla. Mattis ut facilisis
                nisl vulputate hendrerit nulla. Massa, rutrum in faucibus
                facilisi cursus mattis eleifend elementum vitae.
              </p>
            </WhyWorkBox>

            <MeetEmployeesSection>
              <MeetEmployeesWrap>
                <MeetEmployeesTop>
                  <h3 className="com-name">Meet Spotify Employees</h3>
                </MeetEmployeesTop>
                <MeetEmployeeOne>
                  <EmployeeOne>
                    <EmployeeImg>
                      <a
                        href="/"
                        data-toggle="modal"
                        data-target="#applyNowModal"
                      >
                        {/* <img src={employee1} alt="" /> */}
                        <img
                          src={cdn('/static/img/images/employee1.png')}
                          alt="employee"
                        />
                        <span className="video-icon">
                          {/* <img src={playWhite} alt="" /> */}
                          <img
                            src={cdn('/static/img/images/play-white.svg')}
                            alt="play-white"
                          />
                        </span>
                      </a>
                    </EmployeeImg>
                    <EmployeeDetail>
                      <h3 className="employee-name">Chris Yang</h3>
                      <span className="designation">Position</span>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Habitasse metus varius tortor nec nunc facilisis et.
                        Auctor fames semper sed nisl, sapien.
                      </p>
                    </EmployeeDetail>
                  </EmployeeOne>
                  <EmployeeOne>
                    <EmployeeImg>
                      <a
                        href="/"
                        data-toggle="modal"
                        data-target="#applyNowModal"
                      >
                        {/* <img src={employee3} alt="" /> */}
                        <img
                          src={cdn('/static/img/images/employee3.png')}
                          alt="employee"
                        />
                        <span className="video-icon">
                          {/* <img src={playWhite} alt="" /> */}
                          <img
                            src={cdn('/static/img/images/play-white.svg')}
                            alt="play-white"
                          />
                        </span>
                      </a>
                    </EmployeeImg>
                    <EmployeeDetail>
                      <h3 className="employee-name">Julia Claire</h3>
                      <span className="designation">Position</span>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ac, sed quisque proin fringilla. Ridiculus lacinia quis
                        erat diam fermentum enim quisque interdum. Donec id eget
                        turpis.
                      </p>
                    </EmployeeDetail>
                  </EmployeeOne>
                  <EmployeeOne>
                    <EmployeeImg>
                      <a
                        href="/"
                        data-toggle="modal"
                        data-target="#applyNowModal"
                      >
                        {/* <img src={employee3} alt="" /> */}
                        <img
                          src={cdn('/static/img/images/employee3.png')}
                          alt="employee"
                        />
                        <span className="video-icon">
                          {/* <img src={playWhite} alt="" /> */}
                          <img
                            src={cdn('/static/img/images/play-white.svg')}
                            alt="play-white"
                          />
                        </span>
                      </a>
                    </EmployeeImg>
                    <EmployeeDetail>
                      <h3 className="employee-name">Kaithy Smith</h3>
                      <span className="designation">Position</span>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Habitasse metus varius.
                      </p>
                    </EmployeeDetail>
                  </EmployeeOne>
                </MeetEmployeeOne>
                <ShowMoreEmployees>
                  <a href="/" className="showmore">
                    Show more
                  </a>
                </ShowMoreEmployees>
              </MeetEmployeesWrap>
            </MeetEmployeesSection>
          </JobPostingLeftPanel>

          <JobCompanyBox>
            <JobCompanyHeader>
              <h3>Working at</h3>
              <a href="/">
                {/* <img src={spotifyLogo} alt="" /> */}
                <img
                  src={cdn('/static/img/images/spotify-logo.png')}
                  alt="spotify-logo"
                />
              </a>
            </JobCompanyHeader>
            <JobComInfo>
              <ul>
                <li>
                  <h4>
                    {/* <img src={Industry} alt="industry" /> */}
                    <img
                      src={cdn('/static/img/images/industry.png')}
                      alt="industry"
                    />
                    Industry
                  </h4>
                  <p>{companyName}</p>
                </li>
                <li>
                  <h4>
                    {/* <img src={MapPin} alt="mappin" /> */}
                    <img
                      src={cdn('/static/img/images/map-pin.png')}
                      alt="map-pin"
                    />
                    Location
                  </h4>
                  <p>
                    {jobLocation}({location})
                  </p>
                </li>
                <li>
                  <h4>
                    {/* <img src={CompanySize} alt="companySize" /> */}
                    <img
                      src={cdn('/static/img/images/company-size.png')}
                      alt="Company Size"
                    />
                    Company size
                  </h4>
                  <p>XX - XXX</p>
                </li>
                <li>
                  <h4>
                    {/* <img src={Perk} alt="perk" /> */}
                    <img src={cdn('/static/img/images/perks.png')} alt="perk" />
                    Perks &amp; Benefits
                  </h4>
                  <p>XX+</p>
                </li>
              </ul>
            </JobComInfo>
            <JobCompanyBody>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
                lectus posuere nec sed etiam pellentesque. Mus vitae blandit
                sapien risus, volutpat. Id lacus etiam massa gravida cras. Etiam
                nec fermentum fermentum, suspendisse convallis morbi dui eget
                justo. Tristique pulvinar nunc, in ut purus integer hac.
                <br />
                Amet eget morbi sed imperdiet enim magnis vitae.
              </p>
              <div className="view-com-link">
                <a href="/job-posting-new">
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
              </div>
            </JobCompanyBody>
          </JobCompanyBox>

          <NowHiringWrap>
            <NowHiring>
              <h3 className="com-name">Now hiring at Spotify</h3>
              <SearchForm>
                <input
                  type="search"
                  placeholder="Search by keywords"
                  name="name"
                  onChange={e => setFirstName(e.target.value)}
                />
                <button type="submit">Get Hired</button>
              </SearchForm>
              {jobList.map(function(item, i) {
                return (
                  <>
                    <JobOne>
                      <h3 className="job-name">{item.jobTitle}</h3>
                      <span className="company-name">{item.jobTitle}</span>
                      <div className="d-flex align-items-center">
                        {/* <img src={MapPin} alt="mappin" /> */}
                        <img
                          src={cdn('/static/img/images/map-pin.png')}
                          alt="map-pin"
                        />
                        {item.jobLocation}
                      </div>
                      <div className="job-posting d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          {/* <img src={Industry} alt="industry" /> */}
                          <img
                            src={cdn('/static/img/images/industry.png')}
                            alt="industry"
                          />
                          Full Time
                        </div>
                        <a href="/">view full posting</a>
                      </div>
                      <a href="/" className="save-the-job">
                        {/* <img src={SaveJob} alt="savejob" /> */}
                        <img
                          src={cdn('/static/img/images/save-job.png')}
                          alt="save-job"
                        />
                      </a>
                    </JobOne>
                  </>
                );
              })}
              <SliderFooter>
                <button
                  type="button"
                  onClick={PrevJobList}
                  className="prev nav-buttons"
                >
                  Prev
                </button>
                <div className="nav-dots">
                  <span className="active nav-dot" />
                  <span className="nav-dot" />
                  <span className="nav-dot" />
                </div>
                <button
                  type="button"
                  className="next nav-buttons"
                  onClick={NextJobList}
                >
                  Next
                </button>
              </SliderFooter>
            </NowHiring>
          </NowHiringWrap>

          <ZigZagWrap>
            <ZigZagWrapRow>
              <div className="col-md-6">
                <div className="img">
                  {/* <img src={toggle1} alt="toggle1" /> */}

                  <img
                    src={cdn('/static/img/images/toggle-1.png')}
                    alt="toggle"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <Info>
                  <h3>Title 1</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
                    commodo egestas nunc elit. Imperdiet mollis accumsan, id
                    amet adipiscing eget proin laoreet risus. Aliquam auctor
                    nibh nibh id.
                  </p>
                  <button
                    type="button"
                    className="btn action-btn explore-link"
                    data-toggle="modal"
                    data-target="#sendInvite"
                    onClick={() => setExploreFurtherModalShow(true)}
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
                </Info>
              </div>
            </ZigZagWrapRow>
            <ZigZagWrapRow>
              <div className="col-md-6">
                <Info>
                  <h3>Title 2</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
                    commodo egestas nunc elit. Imperdiet mollis accumsan, id
                    amet adipiscing eget proin laoreet risus. Aliquam auctor
                    nibh nibh id. Ut vitae sit viverra sit mattis tristique.
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
                </Info>
              </div>
              <div className="col-md-6">
                <div className="img">
                  {/* <img src={toggle2} alt="toggle2" /> */}
                  <img
                    src={cdn('/static/img/images/toggle-2.png')}
                    alt="toggle"
                  />
                </div>
              </div>
            </ZigZagWrapRow>
            <ZigZagWrapRow>
              <div className="col-md-6">
                <div className="img">
                  {/* <img src={toggle3} alt="toggle3" /> */}
                  <img
                    src={cdn('/static/img/images/toggle-3.png')}
                    alt="toggle"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <Info>
                  <h3>Title 3</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
                    commodo egestas nunc elit. Imperdiet mollis accumsan, id
                    amet adipiscing eget proin laoreet risus.
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
                </Info>
              </div>
            </ZigZagWrapRow>
          </ZigZagWrap>

          <FeatureArticleWrap>
            <FeatureArticleInner>
              <h3>Featured Article</h3>
              <FeatureArticleImg>
                {/* <img src={featureimg} alt={FeatureArticleImg} /> */}
                <img
                  src={cdn('/static/img/images/feature-article-img.png')}
                  alt="feature-article"
                />
              </FeatureArticleImg>
              <ArticleInfo>
                <h4>Blog/Article Title</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
                  commodo egestas nunc elit.
                </p>
                <a className="learn-more" href="/">
                  Learn more
                </a>
              </ArticleInfo>
            </FeatureArticleInner>
          </FeatureArticleWrap>

          <SocialFeedWrap>
            <SocialFeedWrapRow>
              <div className="col-md-6">
                <SocialFeedImg>
                  {/* <img src={loggedinuser} alt="loggeduser" /> */}
                  <img
                    src={cdn('/static/img/images/loggedinuser.svg')}
                    alt="loggedinuser"
                  />
                </SocialFeedImg>
                <h4>Social Feed 1</h4>
                <SocialFeedBox />
              </div>
              <div className="col-md-6">
                <SocialFeedImg>
                  {/* <img src={loggedinuser} alt="loggeduser" /> */}
                  <img
                    src={cdn('/static/img/images/loggedinuser.svg')}
                    alt="loggedinuser"
                  />
                </SocialFeedImg>
                <h4>Social Feed 2</h4>
                <SocialFeedBox />
              </div>
            </SocialFeedWrapRow>
          </SocialFeedWrap>
        </JobPostingWrap>
        {/* Apply Now Modal*/}
        <Modal
          className="modal fade explore-modal"
          id="applyNowModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              {/* <div className="modal-header">
                                <h2>Title here</h2>
                            </div> */}
              <div className="modal-body">
                <div className="explore-media-box">
                  {/* <img src={VideoUpload} alt="" /> */}
                  <img
                    src={cdn('/static/img/images/Video-Upload.png')}
                    alt="Video-Upload"
                  />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet,
                  habitasse aliquet cras aliquet massa posuere semper lorem
                  vitae. Fermentum consequat metus nibh mi et nec sit. Id risus,
                  pellentesque ut erat fusce etiam mauris dignissim in. Eget
                  orci, sollicitudin at ullamcorper. Nibh ultrices vestibulum
                  non praesent justo. Vitae diam, sed in odio ullamcorper
                  ultrices dictumst.
                </p>
                <a href="/" className="apply-now-btn">
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
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          className="modal fade explore-modal"
          id="exploreModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              {/* <div className="modal-header">
                                <h2>Title here</h2>
                            </div> */}
              <div className="modal-body">
                <div className="explore-media-box">
                  {/* <img src={toggle3} alt="" /> */}
                  <img
                    src={cdn('/static/img/images/toggle-3.png')}
                    alt="toggle"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </JobPostMain>
    </OuterWrapper>
  );

  const content = rightContent();
  return (
    <>
      <Page
        title="Job Posting"
        description="Job Posting Page"
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

      <MyExploreFurtherModal
        show={ExploreFurthermodalShow}
        onHide={() => setExploreFurtherModalShow(false)}
      />
    </>
  );
};

export default withAuthSync(JobPosting);

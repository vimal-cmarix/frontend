import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Page from '@components/templates/Page';
// import downIcon from '@src/assets/images/color-down-icon.svg';
// import notificationBell from '@src/assets/images/notification.png';
// import JobNotFound from '@src/assets/images/job-not-found.svg';
// import recentClock from '@src/assets/images/recent-clock.png';
// import LinkAttach from '@src/assets/images/link-attach.png';
// import BlankCheck from '@src/assets/images/blank_check.png';
// import PlayBlack from '@src/assets/images/play-black.png';
// import CheckedGreen from '@src/assets/images/checked-green.png';
// import PlayBlackBig from '@src/assets/images/play-black-big.png';
import { cdn } from '@utils/general';
import Link from 'next/link';
import { withAuthSync } from '@src/utils/auth';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import AtsDetails from '@api/services/ats';
import moment from 'moment';
import RejectionOrOffer from '@api/services/rejection-offer';
import HeaderB2B from '@components/organisms/headerB2B';
import ComingSoon from '../coming-soon';
import {
  Label,
  AtsDetailMain,
  JobBreifing,
  JobName,
  Briefing,
  FlexTab,
  RightBar,
  Selections,
  AtsActionStrip,
  Row,
  //AtsLeftPanel,
  DetailWrapper,
  AtsLeftPanel,
  LeftPanleTop,
  LeftApplicantOne,
  AppImg,
  RightContent,
  AppName,
  Dflex,
  Card,
  AppAction,
  ActionRow,
  ApplicantDtls,
  AtsImg,
  AtsDetailed,
  CoverVideoMain,
  InsideSection,
  ApplicantOverview,
  StenDT,
  InsideSectionOne,
  InsideDtls,
  ScreeningResults,
  QualiOneMatched,
  QualiOneUnMatched,
  MatchedQuali,
  Reveived,
  CardBordered1,
  CardBorderedRejectOffer,
  TabsFlexTabs,
  TabContent,
  ButtonSave,
  BlueButtonSave,
  QualiQuest,
  QuestAns,
  QualiContent,
  RightCont,
  BlueTextViewMore,
  AattchLink,
  RecordNotFoundWrap,
} from './style';
//import { setWeekWithOptions } from 'date-fns/fp';

const AtsDetailWithLeftPanel = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [userDetail, setUserDetail] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [screeningReport, setScreeningReport] = useState([]);
  const [pageValue, setPageValue] = useState('reject');
  const [rejectClassName, setRejectClassName] = useState('tabs active');
  const [offerClassName, setOfferClassName] = useState('tabs');
  const [letterOffer, setLetterOffer] = useState('');
  const [letterReject, setLetterReject] = useState('');
  const [checkedOffer, setCheckedOffer] = useState(false);
  const [companyProfileId, setCompanyProfileId] = useState(
    '482c9c68-f1b3-4858-ad12-c74b83990f28',
  );
  const [jobId, setjobId] = useState('');
  const [jobSwimLa, setJobSwimLa] = useState('');
  const [applyJob, setapplyJobCard] = useState('');
  const [getVal, setGetVal] = useState('');
  const [letter, setLetter] = useState('');
  const [locationOption, setLocationOption] = useState('');
  const [experienceYear, setExperienceYear] = useState('');
  const [searchName, setSearchName] = useState('');
  const [fits, setFits] = useState('');
  async function getOneUser(applyJobCard, jobInfoId, jobSwimLane) {
    // console.log('one');
    try {
      // console.log('gert......DDF');
      // const jobInfoId = '1f36b9ed-2a14-473e-bfb3-5b842eee24af';
      // const jobSwimLane = 'fa96ad1b-49dc-4499-9b54-a7853456b3b5';
      // const applyJobCard = 'b721ead6-4d38-475f-b65c-dv95c97a3fb2';
      const res = await AtsDetails.getOverView(
        jobInfoId,
        jobSwimLane,
        applyJobCard,
      );
      // console.log('response', res.data.data);
      setJobTitle(res.data.data.job_info.jobTitle);
      //setCompanyProfileId(res.data.data.job_info.companyProfileId);
      setJobLocation(res.data.data.job_info.jobLocation);
      setLocation(res.data.data.job_info.location);
      setName(res.data.data.profile.personalInfo.firstName);
      setExperience(res.data.data.profile.experiences);
      setEducation(res.data.data.profile.education);
      setScreeningReport(res.data.data.job_screening_response);
      setLoading(false);

      if (res.status === 201) {
        // console.log('success');
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  function onChangeRejection(value) {
    // console.log('value', value);
    setPageValue(value);
    if (value === 'reject') {
      setRejectClassName('tabs active');
      setOfferClassName('tabs');
    }
    if (value === 'offer') {
      setRejectClassName('tabs');
      setOfferClassName('tabs active');
    }
  }

  async function onSubmitRejectionLetter() {
    const data = {
      applyJobCardId: 'b721ead6-4d38-475f-b65c-dv95c97a3fb2',
      letterType: 'reject',
      message: 'text message',
      mediaUrl:
        'https://sizigi.s3.us-east-2.amazonaws.com/sample-pdf-file-1631014453980.pdf',
    };
    try {
      const res = await AtsDetails.sendEmail(data);
      setLoading(false);

      if (res.status === 201) {
        // console.log('success');
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function getTemplate(value) {
    // console.log('get templeted');
    try {
      const res = await RejectionOrOffer.getRejectOffer(companyProfileId);
      // console.log('res', res.data.data);
      setGetVal(res.data.data);
      getVal.forEach(function(item) {
        // console.log('item', item);
        if (value === 'reject') {
          if (item.isReject) {
            setLetterReject(item.letter);
          }
        }
        if (value === 'offer') {
          if (item.isOffer) {
            setLetterOffer(item.letter);
          }
        }
      });

      if (res.status === 201) {
        console.log('success');
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function getAtsDetails() {
    try {
      // console.log('gert1');
      const jobInfoId = '1f36b9ed-2a14-473e-bfb3-5b842eee24af';
      const data = {
        jobListFilterBy: {
          name: searchName,
          fit: fits,
          experience: experienceYear,
          location: locationOption,
        },
      };
      console.log('data', data);
      const res = await AtsDetails.getJobDetailFilter(jobInfoId, data);
      // console.log('responses', res.data.data.rows.length);
      setUserDetail(res.data.data.rows);
      if (res.data.data.rows.length !== 0) {
        // console.log('ress');
        // setjobId(res.data.data.rows[0].job_info.id);
        // setapplyJobCard(res.data.data.rows[0].id);
        // setJobSwimLa(res.data.data.rows[0].job_swimlane.id);
        // console.log('respons', applyJob, jobId, jobSwimLa);
        getOneUser(
          res.data.data.rows[0].id,
          res.data.data.rows[0].job_info.id,
          res.data.data.rows[0].job_swimlane.id,
        );
      } else {
        const jobid = '';
        const applyjob = '';
        const jobswimlan = '';
        //getOneUser(jobid, applyjob, jobswimlan);
      }
      // setjobId(res.data.data.rows[0].job_info.id);
      // setapplyJobCard(res.data.data.rows[0].id);
      // setJobSwimLa(res.data.data.rows[0].job_swimlane.id);
      setLoading(false);

      // console.log('respons', applyJob, jobId, jobSwimLa);
      // if (applyJob !== '') {
      //   getOneUser(applyJob, jobId, jobSwimLa);
      // }

      if (res.status === 201) {
        //getOneUser(applyJob, jobId, jobSwimLa);
        console.log('success');
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }
  useEffect(() => {
    console.log(locationOption);
    getAtsDetails();
  }, [locationOption, experienceYear, fits, searchName]);
  function setOptions(e) {
    //setLocationOption(e.target.value);
    if (e.target.name === 'location') {
      // console.log(e.target.value);
      setLocationOption(e.target.value);
    }
    if (e.target.name === 'year') {
      setExperienceYear(e.target.value);
      // getAtsDetails();
    }
    if (e.target.name === 'name') {
      setSearchName(e.target.value);
      // getAtsDetails();
    }
    if (e.target.name === 'fit') {
      setFits(e.target.value);
      // getAtsDetails();
    }
  }

  function convertDate(date) {
    const dateFormat = moment(date)
      .utc()
      .format('YYYY-MM-DD');
    return dateFormat;
  }
  const componentDidMount = fun => useEffect(fun, []);
  componentDidMount(() => {
    setLoading(true);
    getAtsDetails();
  });

  const rightContent = () => (
    <AtsDetailMain className=" has-left-panel">
      <HeaderB2B />
      <JobBreifing className="job-briefing d-flex align-items-center justify-content-between">
        <div>
          <JobName>{jobTitle}</JobName>
          <Briefing>
            <span className="location">{jobLocation}</span>
            <span className="jobtype">Remote</span>
            <span className="jobduration">3 Days</span>
          </Briefing>
        </div>
        <FlexTab className="tabs flex_tabs mt-0">
          <Link href="/company/ats-dashboard">Hiring Journey</Link>
          <Link href="/company/ats-list-view" className="active">
            Applicant
          </Link>
        </FlexTab>
      </JobBreifing>

      <AtsActionStrip className="ats-action_strip">
        <Row>
          <div className="col-md-3">
            <input
              type="search"
              className="searchBox"
              placeholder="Search name"
              name="name"
              onChange={e => setSearchName(e.target.value)}
            />
          </div>
          <div className="col-md-9">
            <RightBar>
              <Selections>
                <select name="fit" onChange={e => setFits(e.target.value)}>
                  <option value="">Select Fit</option>
                  <option value="Good Fit">Good Fit</option>
                  <option value="Average Fit">Average Fit</option>
                  <option value="Not Bad Fit">Not Bad Fit</option>
                </select>
              </Selections>
              <Selections>
                <select
                  name="year"
                  onChange={e => setExperienceYear(e.target.value)}
                >
                  <option value="">Years of Experience</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                </select>
              </Selections>
              <Selections>
                <select
                  name="location"
                  onChange={e => setLocationOption(e.target.value)}
                >
                  <option value="">Location</option>
                  <option value="ahmedabad">Ahmedabad</option>
                  <option value="baroda">Baroda</option>
                </select>
              </Selections>
            </RightBar>
          </div>
        </Row>
      </AtsActionStrip>

      {userDetail.length !== 0 && (
        <DetailWrapper>
          <Row>
            <div className="col-md-3">
              <AtsLeftPanel>
                <LeftPanleTop>
                  <h4>{userDetail.length} Applicant</h4>
                  <span>
                    <img
                      src={cdn('/static/img/images/recent-clock.png')}
                      alt="recentclock"
                    />
                    {/* <img src={recentClock} alt="recentclock" /> */}
                    most recent
                  </span>
                </LeftPanleTop>
                {userDetail.map(function(item) {
                  // console.log('index', i);
                  return (
                    <>
                      <LeftApplicantOne
                        className="left_applicant_one active"
                        onClick={e =>
                          getOneUser(
                            item.id,
                            item.job_info.id,
                            item.job_swimlane.id,
                          )
                        }
                      >
                        <AppImg />
                        <RightContent>
                          <AppName>
                            {item.profile.personalInfo.firstName}
                          </AppName>
                          <span className="designation">{item.jobTitle}</span>
                          <p>
                            In praesent orci nibh amet aliquam nun In praesent
                            orci nibh amet aliquam nun
                          </p>
                          <p>
                            Arcu nulla auctor blandit risus diam ips nun In
                            praesent orci nibh amet aliquam nun
                          </p>
                          <Dflex>
                            <span className="fitornot fit">Good fit</span>
                            <span className="applied-time">Applied 1h ago</span>
                          </Dflex>
                        </RightContent>
                      </LeftApplicantOne>
                    </>
                  );
                })}
              </AtsLeftPanel>
            </div>
            <div className="col-md-9">
              <AtsDetailed>
                <Card className="card card-bordered job-applicant">
                  <Dflex>
                    <AtsImg />
                    <ApplicantDtls className="applicant-dtls">
                      <h4 className="card_ttl">{name}</h4>
                      <span className="designation">{jobTitle}</span>
                      <span className="appliedAgo">Applied 1h ago</span>
                      <AppAction className="app-action d-flex align-items-center">
                        <h2 className="fitOrNot">Good Fit</h2>
                        <ActionRow>
                          <a href="/" className="action-btn blue-bg-btn">
                            Message
                          </a>
                          <a href="/" className="action-btn white-bg-btn">
                            Schedule an interview
                          </a>
                        </ActionRow>
                      </AppAction>
                      <a href="/" className="blue-text view_more">
                        View Profile
                      </a>
                    </ApplicantDtls>
                  </Dflex>
                </Card>

                <Card className="card card-bordered">
                  <h4 className="card_ttl">Cover Video</h4>
                  <CoverVideoMain>
                    <a href="/" className="play_button">
                      <img
                        src={cdn('/static/img/images/play-black-big.png')}
                        alt="PlayBlackBig"
                      />
                      {/* <img src={PlayBlackBig} alt="PlayBlackBig" /> */}
                    </a>
                  </CoverVideoMain>
                </Card>
                <ApplicantOverview id="ApplicantOverview">
                  <h4 className="card_ttl">Applicant Overview</h4>
                  <InsideSection>
                    <h5 className="sect_ttl">Experience</h5>
                    {experience.map(function(item, i) {
                      return (
                        <>
                          <InsideSectionOne>
                            <div className="ats_img" />
                            <InsideDtls>
                              <h5>{item.occupation}</h5>
                              <p>{item.company}</p>
                              <ul>
                                <li>Description</li>
                                <li>Description</li>
                                <li>Description</li>
                              </ul>
                              <StenDT>
                                {convertDate(item.periodFrom)} -{' '}
                                {convertDate(item.periodTo)}
                              </StenDT>
                            </InsideDtls>
                          </InsideSectionOne>
                        </>
                      );
                    })}
                  </InsideSection>
                  <InsideSection>
                    <h5 className="sect_ttl">Education</h5>
                    {education.map(function(item, i) {
                      return (
                        <>
                          <InsideSectionOne>
                            <div className="ats_img" />
                            <InsideDtls>
                              <h5>{item.institution}</h5>
                              <p>
                                {item.fieldOfStudy} / {item.degree}
                              </p>
                              <ul>
                                <li>Description</li>
                                <li>Description</li>
                                <li>Description</li>
                              </ul>
                              <StenDT>
                                {' '}
                                {convertDate(item.periodFrom)} -{' '}
                                {convertDate(item.periodTo)}
                              </StenDT>
                            </InsideDtls>
                          </InsideSectionOne>
                        </>
                      );
                    })}
                  </InsideSection>
                </ApplicantOverview>
                {/* screening */}
                <ScreeningResults id="screening_results">
                  <h4 className="card_ttl">Screening results</h4>
                  <MatchedQuali>
                    <p>
                      Must-have qualifications: <span> 4/5 met </span>
                    </p>
                  </MatchedQuali>
                  {screeningReport.map(function(item, i) {
                    return (
                      <>
                        {item.mustHaveQualification === 1 && (
                          <QualiOneMatched>
                            <QualiQuest>
                              {item.job_screening.question}
                            </QualiQuest>
                            <QuestAns>
                              <Dflex>
                                <span className="ideal">Ideal Answer :</span>
                                <span className="answer">
                                  {item.job_screening.idealAnswer}
                                </span>
                              </Dflex>
                              <Dflex>
                                <span className="ideal">Response :</span>
                                <span className="answer">{item.response}</span>
                              </Dflex>
                              <Reveived>
                                <p className="mb-0">
                                  Content received{' '}
                                  <img
                                    src={cdn(
                                      '/static/img/images/checked-green.png',
                                    )}
                                    alt="Checkedgreen"
                                  />
                                  {/* <img src={CheckedGreen} alt="Checkedgreen" /> */}
                                </p>
                              </Reveived>
                              <QualiContent>
                                <div className="left_img">
                                  <img
                                    src={cdn(
                                      '/static/img/images/play-black.png',
                                    )}
                                    alt="PlayBlack"
                                  />
                                  {/* <img
                                      className="play_button"
                                      src={PlayBlack}
                                      alt="PlayBlack"
                                    /> */}
                                </div>
                                <RightCont>
                                  <h3>Lorem Ipsum Content Title</h3>
                                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate id aliquet fermentum, mauris id ornare augue. Purus velit, adipiscing eget dolor viverra elementum amet facilisi. A facilisi in eget sodales pretium turpis ut.</p> */}
                                  <BlueTextViewMore>
                                    View more content
                                  </BlueTextViewMore>
                                </RightCont>
                              </QualiContent>
                            </QuestAns>
                          </QualiOneMatched>
                        )}
                        {item.mustHaveQualification === 0 && (
                          <QualiOneUnMatched>
                            <div className="quali_quest">
                              {item.job_screening.question}
                            </div>
                            <QuestAns>
                              <Dflex>
                                <span className="ideal">Ideal Answer :</span>
                                <span className="answer">
                                  {item.job_screening.idealAnswer}
                                </span>
                              </Dflex>
                              <Dflex>
                                <span className="ideal">Response :</span>
                                <span className="answer">{item.response}</span>
                              </Dflex>
                              <Reveived>
                                <p className="mb-0">
                                  Content received{' '}
                                  <img
                                    src={cdn(
                                      '/static/img/images/checked-green.png',
                                    )}
                                    alt="Checkedgreen"
                                  />
                                  {/* <img src={CheckedGreen} alt="Checkedgreen" /> */}
                                </p>
                              </Reveived>
                              <QualiContent>
                                <div className="left_img">
                                  <img
                                    src={cdn(
                                      '/static/img/images/play-black.png',
                                    )}
                                    alt="PlayBlack"
                                  />
                                  {/* <img
                                      className="play_button"
                                      src={PlayBlack}
                                      alt="Playblack"
                                    /> */}
                                </div>
                                <RightCont>
                                  <h3>Lorem Ipsum Content Title</h3>
                                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate id aliquet fermentum, mauris id ornare augue. Purus velit, adipiscing eget dolor viverra elementum amet facilisi. A facilisi in eget sodales pretium turpis ut.</p> */}
                                  <BlueTextViewMore>
                                    View more content
                                  </BlueTextViewMore>
                                </RightCont>
                              </QualiContent>
                            </QuestAns>
                          </QualiOneUnMatched>
                        )}
                      </>
                    );
                  })}
                </ScreeningResults>
                <CardBordered1>
                  <h4 className="card_ttl">Resume</h4>
                  <div className="resume_main" />
                </CardBordered1>
                <CardBorderedRejectOffer id="OffersOrReject">
                  <h4 className="card_ttl">Rejection/Offer Email</h4>
                  <TabsFlexTabs>
                    <button
                      className={rejectClassName}
                      type="button"
                      onClick={e => onChangeRejection('reject')}
                    >
                      Reject applicant
                    </button>
                    <button
                      className={offerClassName}
                      type="button"
                      onClick={e => onChangeRejection('offer')}
                    >
                      Offer position
                    </button>
                  </TabsFlexTabs>
                  {pageValue === 'offer' && (
                    <TabContent>
                      <div className="textarea">
                        <Label>Offer Letter</Label>
                        <textarea
                          placeholder="Start typing offer letter here!"
                          value={letterOffer}
                          key={letterOffer}
                        />
                        <AattchLink>
                          <img
                            src={cdn('/static/img/images/link-attach.png')}
                            alt="linkattach"
                          />
                          {/* <img src={LinkAttach} alt="linkattach" /> */}
                        </AattchLink>
                        <p className="note">xxx/xxx</p>
                      </div>
                      <ButtonSave
                        className="white-bg-btn"
                        onClick={e => getTemplate('offer')}
                      >
                        Use a template
                      </ButtonSave>
                      <BlueButtonSave
                        className="blue-bg-btn"
                        onClick={e => onSubmitRejectionLetter()}
                      >
                        Send
                      </BlueButtonSave>
                    </TabContent>
                  )}
                  {pageValue === 'reject' && (
                    <TabContent>
                      <div className="textarea">
                        <Label>Rejection</Label>
                        <textarea
                          placeholder="Start typing offer letter here!"
                          value={letterReject}
                          key={letterReject}
                          onChange={e => setLetterOffer(e.target.value)}
                        />
                        <AattchLink>
                          <img
                            src={cdn('/static/img/images/link-attach.png')}
                            alt="linkattach"
                          />
                          {/* <img src={LinkAttach} alt="linkattach" /> */}
                        </AattchLink>
                        <p className="note">xxx/xxx</p>
                      </div>
                      <ButtonSave
                        className="white-bg-btn"
                        onClick={e => getTemplate('reject')}
                      >
                        Use a template
                      </ButtonSave>
                      <BlueButtonSave
                        className="blue-bg-btn"
                        onClick={e => onSubmitRejectionLetter()}
                      >
                        Send
                      </BlueButtonSave>
                    </TabContent>
                  )}
                </CardBorderedRejectOffer>
              </AtsDetailed>
            </div>
            <div className="col-md-2" />
          </Row>
        </DetailWrapper>
      )}
      {/* Data Not found */}
      {userDetail.length === 0 && (
        <RecordNotFoundWrap>
          <img
            src={cdn('/static/img/images/job-not-found.svg')}
            alt="linkattach"
          />
          {/* <img src={JobNotFound} alt="job-not-found" /> */}
          <p>No applicants...yet!</p>
        </RecordNotFoundWrap>
      )}
    </AtsDetailMain>
  );

  const content = rightContent();
  return (
    // <ComingSoon />
    <Page
      title="ATS Detail With Left Panel"
      description="ATS Detail With Left Panel Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(AtsDetailWithLeftPanel);

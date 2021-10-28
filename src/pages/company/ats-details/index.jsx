import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Page from '@components/templates/Page';
// import Blankcheck from '@src/assets/images/blank_check.png';
// import Playblack from '@src/assets/images/play-black.png';
// import LinkAttach from '@src/assets/images/linkattach';
// import Checkedgreen from '@src/assets/images/checked-green.png';
// import PlayBlackBig from '@src/assets/images/play-black-big.png';
import NextLink from 'next/link';
import { cdn } from '@utils/general';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import AtsDetails from '@api/services/ats';
import moment from 'moment';
import { withAuthSync } from '@src/utils/auth';
import RejectionOrOffer from '@api/services/rejection-offer';
import HeaderB2B from '@components/organisms/headerB2B';
import { useRouter } from 'next/router';
import {
  OuterMostWrapper,
  BacktoList,
  Label,
  AtsDetailMain,
  DetailWrapper,
  JobBriefing,
  Briefing,
  JobApplicant,
  Dflex,
  ApplicantDtls,
  AtsDetailed,
  AppAction,
  ActionRow,
  CardBordered,
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
  LeftCardBordered,
  QualiQuest,
  QuestAns,
  QualiContent,
  RightCont,
  BlueTextViewMore,
  AattchLink,
  SecondaryHeader,
  SecondaryWrapper,
} from './style';
import ComingSoonPage from '../coming-soon';
//import { TextAreaWrapper } from '@components/molecules/TextInput/style';

const AtsDetail = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [characterCount, setCharaterCount] = useState(0);
  const [characterCountRej, setCharaterCountRej] = useState(0);
  const { t: toastT } = useTranslation('');
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [screeningReport, setScreeningReport] = useState([]);
  const [pageValue, setPageValue] = useState('offer');
  const [rejectClassName, setRejectClassName] = useState('tabs');
  const [offerClassName, setOfferClassName] = useState('tabs active');
  const [letterOffer, setLetterOffer] = useState('');
  const [letterReject, setLetterReject] = useState('');
  const [checkedOffer, setCheckedOffer] = useState(false);
  const [companyProfileId, setCompanyProfileId] = useState(
    '482c9c68-f1b3-4858-ad12-c74b83990f28',
  );
  const [getVal, setGetVal] = useState('');
  const [letter, setLetter] = useState('');
  const [letterTypes, setLetterType] = useState('offer');
  const [swimLaneId, setSwimLaneId] = useState('');
  const [jobInfoId, setJobInfoId] = useState('');
  const [jobCard, setJobCard] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [resume, SetResume] = useState('');

  const router = useRouter();

  let params = '';
  let valueId = [];
  function onChangeRejection(value) {
    console.log('value', value);
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
  async function getAtsDetails() {
    try {
      console.log('gert1');
      // const jobInfo = jobInfoId;
      // const jobSwimLane = swimLaneId;
      // const applyJobCard = jobCard;
      const res = await AtsDetails.getOverView(
        valueId[2],
        valueId[1],
        valueId[0],
      );
      console.log('response', res.data.data);
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
        console.log('success');
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function onSubmitRejectionLetter() {
    const data = {
      applyJobCardId: 'b721ead6-4d38-475f-b65c-dv95c97a3fb2',
      letterType: letterTypes,
      message: letterOffer,
      mediaUrl:
        'https://sizigi.s3.us-east-2.amazonaws.com/sample-pdf-file-1631014453980.pdf',
    };
    try {
      const res = await AtsDetails.sendEmail(data);
      setLoading(false);

      if (res.status === 201) {
        console.log('success');
        //toast.showSuccess('send email');
        showSuccess(toastT('success'));
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function getTemplate(value) {
    console.log('get templeted');
    setLetterType(value);
    try {
      const res = await RejectionOrOffer.getRejectOffer(companyProfileId);
      console.log('res', res.data.data);
      setGetVal(res.data.data);
      getVal.forEach(function(item) {
        console.log('item', item);
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

  function convertDate(date) {
    const dateFormat = moment(date)
      .utc()
      .format('YYYY-MM-DD');
    return dateFormat;
  }
  const componentDidMount = fun => useEffect(fun, []);
  componentDidMount(() => {
    params = router.query;
    console.log('id', params.id);
    valueId = params.id.split('/');
    console.log('val', valueId);
    // setJobInfoId(value[2]);
    // setSwimLaneId(value[1]);
    //setJobCard(value[0]);
    console.log('id', jobInfoId, swimLaneId, jobCard);
    setLoading(true);
    getAtsDetails();
  }, [router.query]);

  const rightContent = () => (
    <OuterMostWrapper>
      <HeaderB2B />

      <AtsDetailMain>
        <BacktoList>
          <NextLink href="/">Back to hiring journey</NextLink>
        </BacktoList>
        <DetailWrapper>
          <div className="row">
            <div className="col-md-2">
              <LeftCardBordered>
                <ul>
                  <li>
                    <Link
                      to="ApplicantOverview"
                      spy
                      smooth
                      offset={-30}
                      duration={500}
                    >
                      Applicant Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="screening_results"
                      spy
                      smooth
                      offset={-30}
                      duration={500}
                    >
                      Screening results
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="OffersOrReject"
                      spy
                      smooth
                      offset={-30}
                      duration={500}
                    >
                      Rejection/Offer Email
                    </Link>
                  </li>
                </ul>
              </LeftCardBordered>
            </div>

            <div className="col-md-8">
              <AtsDetailed>
                <JobBriefing>
                  <h3 className="job_name">{jobTitle}</h3>
                  <Briefing>
                    <span className="location">{jobLocation}</span>
                    <span className="jobtype">Remote</span>
                    <span className="jobduration">3 Days</span>
                  </Briefing>
                </JobBriefing>
                <JobApplicant>
                  <Dflex>
                    <div className="ats_img" />
                    <ApplicantDtls>
                      <h4 className="card_ttl">{name}</h4>
                      <span className="designation">{jobTitle}</span>
                      <span className="appliedAgo">Applied 1h ago</span>
                      <AppAction>
                        <h2 className="fitOrNot">Good Fit</h2>
                        <ActionRow>
                          <NextLink href="/" className="action-btn blue-bg-btn">
                            Message
                          </NextLink>
                          <NextLink
                            href="/"
                            className="action-btn white-bg-btn"
                          >
                            Schedule an interview
                          </NextLink>
                        </ActionRow>
                      </AppAction>
                      <BlueTextViewMore>View Profile</BlueTextViewMore>
                    </ApplicantDtls>
                  </Dflex>
                </JobApplicant>
                {coverUrl !== '' && (
                  <CardBordered>
                    <h4 className="card_ttl">Cover Video</h4>
                    <CoverVideoMain>
                      <NextLink href="/" className="play_button">
                        <img
                          src={cdn('/static/img/images/play-black-big.png')}
                          alt="PlayBlackBig"
                        />
                        {/* <img src={PlayBlackBig} alt="PlayBlackBig" /> */}
                      </NextLink>
                    </CoverVideoMain>
                  </CardBordered>
                )}
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
                      Must-have qualifications:{' '}
                      <span> {screeningReport.length}/5 met </span>
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
                                  {/* <img src={Checkedgreen} alt="Checkedgreen" /> */}
                                </p>
                              </Reveived>
                              <QualiContent>
                                <div className="left_img">
                                  <img
                                    src={cdn(
                                      '/static/img/images/play-black.png',
                                    )}
                                    alt="Playblack"
                                    className="play_button"
                                  />
                                  {/* <img
                                    className="play_button"
                                    src={Playblack}
                                    alt="Playblack"
                                  /> */}
                                </div>
                                <RightCont>
                                  <h3>Lorem Ipsum Content Title</h3>
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Vulputate id aliquet
                                    fermentum, mauris id ornare augue. Purus
                                    velit, adipiscing eget dolor viverra
                                    elementum amet facilisi. A facilisi in eget
                                    sodales pretium turpis ut.
                                  </p>
                                  <BlueTextViewMore className="view-more-text">
                                    View more content
                                  </BlueTextViewMore>
                                </RightCont>
                              </QualiContent>
                            </QuestAns>
                          </QualiOneMatched>
                        )}
                        {item.mustHaveQualification === 0 && (
                          <QualiOneUnMatched className="unmatched">
                            <QualiQuest className="unmatched-que">
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
                                      '/static/img/images/blank_check.png',
                                    )}
                                    alt="Blankcheck"
                                  />
                                  {/* <img src={Blankcheck} alt="Blankcheck" /> */}
                                </p>
                              </Reveived>
                              <QualiContent className="has-video">
                                <div className="left_img">
                                  <img
                                    src={cdn(
                                      '/static/img/images/play-black.png',
                                    )}
                                    alt="Playblack"
                                    className="play_button"
                                  />
                                  {/* <img
                                    className="play_button"
                                    src={Playblack}
                                    alt="Playblack"
                                  /> */}
                                </div>
                                <RightCont className="has-video-right">
                                  <h3>Lorem Ipsum Content Title</h3>
                                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate id aliquet fermentum, mauris id ornare augue. Purus velit, adipiscing eget dolor viverra elementum amet facilisi. A facilisi in eget sodales pretium turpis ut.</p> */}
                                  <BlueTextViewMore className="view-more-text">
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
                {resume !== '' && (
                  <CardBordered1>
                    <h4 className="card_ttl">Resume</h4>
                    <div className="resume_main" />
                  </CardBordered1>
                )}
                <CardBorderedRejectOffer id="OffersOrReject">
                  <h4 className="card_ttl">Rejection/Offer Email</h4>
                  <TabsFlexTabs>
                    <button
                      className={offerClassName}
                      type="button"
                      onClick={e => onChangeRejection('offer')}
                    >
                      Offer position
                    </button>
                    <button
                      className={rejectClassName}
                      type="button"
                      onClick={e => onChangeRejection('reject')}
                    >
                      Reject applicant
                    </button>
                  </TabsFlexTabs>
                  {pageValue === 'offer' && (
                    <TabContent>
                      <div className="textarea">
                        <Label>Offer Letter</Label>
                        <textarea
                          placeholder="Start typing offer letter here!"
                          name="letterOffer"
                          value={letterOffer}
                          maxLength="1000"
                          //key={letterOffer}
                          onChange={e => {
                            setLetterOffer(e.target.value);
                            setCharaterCount(e.target.value.length);
                          }}
                        />
                        <AattchLink>
                          <input type="file" />
                          <img
                            src={cdn('/static/img/images/link-attach.png')}
                            alt="linkattach"
                          />
                          {/* <img src={LinkAttach} alt="linkattach" /> */}
                        </AattchLink>
                        <div className="note">{characterCount}/1000</div>
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
                          name="letterReject"
                          value={letterReject}
                          maxLength="1000"
                          //key={letterReject}
                          onChange={e => {
                            setLetterReject(e.target.value);
                            setCharaterCountRej(e.target.value.length);
                          }}
                        />
                        <AattchLink>
                          <input type="file" />
                          <img
                            src={cdn('/static/img/images/link-attach.png')}
                            alt="linkattach"
                          />
                          {/* <img src={LinkAttach} alt="linkattach" /> */}
                        </AattchLink>

                        <div className="note">{characterCountRej}/1000</div>
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
          </div>
        </DetailWrapper>
      </AtsDetailMain>
    </OuterMostWrapper>
  );

  const content = rightContent();
  return (
    // <ComingSoonPage />
    <Page
      title="ATS Details"
      description="ATS Details Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(AtsDetail);

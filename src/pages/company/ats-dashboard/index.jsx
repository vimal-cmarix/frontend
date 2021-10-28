import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Page from '@components/templates/Page';
import downIcon from '@src/assets/images/color-down-icon.svg';
import JobNotFound from '@src/assets/images/job-not-found.svg';
import Link from 'next/link';
import { cdn } from '@utils/general';
import Slider from 'react-input-slider';
import paperClip from '@src/assets/images/paperclip.svg';
import { SketchPicker } from 'react-color';
import Btn from '@components/molecules/Btn';
import { useTranslation } from 'react-i18next';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import AtsDetails from '@src/api/services/ats';
import { withAuthSync } from '@src/utils/auth';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import HeaderB2B from '@components/organisms/headerB2B';
import ComingSoonPage from '../coming-soon';
import {
  AtsWrap,
  AtsHead,
  AtsTitle,
  AtsHeadTabs,
  AtsDashboards,
  AtsDashboardInner,
  AtsDashboardItem,
  AtsColorStrip,
  AtsItemHead,
  AtsDashboardItemHeader,
  AtsItemHeadIcon,
  AtsDashboardColorBox,
  AtsItemBox,
  AtsItemBoxWrap,
  AtsUserImg,
  RecordNotFoundWrap,
  ModelDialog,
  ModelContent,
  ModalHeader,
  ModelFade,
  ModalBody,
  RejectionLetterLink,
  ModalFadeRejectionLetter,
  Label,
  RejectionModelDialog,
  RejectionModelHeader,
  BoxFormWrap,
  //BoxFormWrapOuter,
  FormGroup,
  FileAttBtn,
  CheckboxField,
  CheckBoxInner,
  BoxProgrssBar,
  ProgressBar,
  ProfileBoxAction,
  TextCount,
  ColorPopover,
  PopoverAction,
  AtsItemAction,
  ModalBox,
  ModalStyle,
  ModalAction,
} from './style';
//import { AtsDetail } from '../ats-details/style';

const AtsDashboard = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  //let getAtsDetail;
  const router = useRouter();
  let params = '';
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [location, setLocation] = useState('');
  const [dashboard, setDashboard] = useState([]);
  const [jobCard, setJobCard] = useState([]);
  const [jobInfoId, setJobInfoId] = useState('');
  const [jobInfoIds, setJobInfoIds] = useState('');
  //const [swamLineId, setSwamLineId] = useEffect('');
  const [displayColorPicker, setDisplayColorPicker] = useState('');
  const [displayColorName, setDisplayColorName] = useState('');
  const [modalShow, setModalShow] = React.useState(false);

  function setDisplayColor(id, value) {
    setDisplayColorPicker(id);
    if (displayColorName !== value) {
      //console.log('value', value);
      setDisplayColorName(value);
      setDisplayColorPicker(id);
    } else {
      //console.log('value1', value);
      setDisplayColorName('');
      setDisplayColorPicker('');
    }
  }
  async function getAtsDetails() {
    const jonInfoId = params.id;
    console.log('jobinfo id ', jobInfoIds);
    try {
      const res = await AtsDetails.getAtsDetails(jonInfoId);
      console.log('response1', res.data.data);
      //getAtsDetail = res.dat.data;
      console.log('job', res.data.data.job_swimlane);
      setDashboard(res.data.data.job_swimlane);
      console.log('res', dashboard.length);
      setJobInfoId(res.data.data.id);
      //setSwamLineId(res.data.data.)
      setJobCard(res.data.data.job_swimlane.applyJobCards);
      setJobTitle(res.data.data.jobTitle);
      setJobLocation(res.data.data.jobLocation);
      setLocation(res.data.data.location);
      console.log('job', res.data.data.job_swimlane[1].applyJobCards);
      setLoading(false);

      if (res.status === 201) {
        console.log('success');
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        className="send-rejection"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <style>
          {`
              .send-rejection .modal-dialog {
                max-width: 100%;
                width: 933px;
              }
              .send-rejection .modal-content {
                background: #FFFFFF;
                border-radius: 10px;
                border: none;
                background: #fff;
                box-shadow: 0 0 30px rgba(207,216,226,0.3);
              }
            `}
        </style>
        <ModalStyle>
          <Modal.Header>
            <Modal.Title>Rejection Letter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BoxFormWrap>
              <h4 className="mb-14">Applicant rejection letter</h4>
              <FormGroup className="border-form-group mb-0">
                <Label className="border-group-label">
                  Rejection Letter <span className="req-star">*</span>
                </Label>
                <FileAttBtn className="file-att-btn">
                  <input type="file" />
                  <img
                    src={cdn('/static/img/images/paperclip.svg')}
                    alt="paperclip"
                  />
                  {/* <img src={paperClip} alt="paperclip" /> */}
                </FileAttBtn>
                <textarea
                  className="form-control"
                  placeholder="Rejection letter"
                />
                <TextCount className="text-count">XXX/XXX</TextCount>
              </FormGroup>

              <h4 className="mb-24">Rejection letter delivery delay</h4>

              <CheckboxField>
                <CheckBoxInner>
                  <input type="checkbox" className="checkbox" checked />
                  <Label>Set delay time after sending</Label>
                </CheckBoxInner>
              </CheckboxField>

              <BoxProgrssBar>
                <ProgressBar>
                  <Slider
                    //step={10}
                    styles={{
                      thumb: {
                        width: 24,
                        height: 24,
                        backgroundColor: '#005E8B',
                      },
                    }}
                    axis="x"
                    x={10}
                    min={1}
                    max={100}
                    value={10}
                    // onChange={newValue => setValue(newValue)}
                  />
                  <span className="progress-bar-value">{10} days</span>
                </ProgressBar>
              </BoxProgrssBar>

              <ProfileBoxAction>
                <button type="submit" className="btn action-btn">
                  Update
                </button>
              </ProfileBoxAction>
            </BoxFormWrap>
          </Modal.Body>
        </ModalStyle>
      </Modal>
    );
  }

  function calcDate(date) {
    //const date1 = '2021-09-24T10:30:00.000Z';
    //const date2 = '2021-09-27T00:37:28.839Z';
    const currentDate = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
    //const diff = Math.floor(date2.getTime() - date1.getTime());
    //console.log('current date', currentDate, date);
    let duration = 0;
    const d = new Date(currentDate) - new Date(date);
    const weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7);
    const days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7);
    const hours = Math.floor(
      d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24,
    );
    const minutes = Math.floor(
      d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60,
    );
    const seconds = Math.floor(
      d / 1000 -
        weekdays * 7 * 24 * 60 * 60 -
        days * 24 * 60 * 60 -
        hours * 60 * 60 -
        minutes * 60,
    );

    // console.log(
    //   'mmmmm',
    //   seconds,
    //   'second',
    //   hours,
    //   'hours',
    //   minutes,
    //   'min',
    //   days,
    //   'days',
    //   weekdays,
    // );
    if (days !== 0) {
      duration = days;
    }
    // if(hours !== 0) {
    //   duration = hours;
    // }
    // if(min !== 0){
    //   duration = min;
    // }
    // if(seconds !== 0){
    //   duration = seconds;
    // }
    return duration;
  }

  const componentDidMount = fun => useEffect(fun, []);
  componentDidMount(() => {
    params = router.query;
    setJobInfoIds(params.id);
    console.log('params', params.id);
    setLoading(true);
    getAtsDetails();
    calcDate();
  }, [router.query]);

  const [background, setBackground] = useState('');
  const { t: buttonsT } = useTranslation('buttons');
  async function handleSaveColor() {
    console.log('sell');
  }

  async function onChangePosition(applyJobCardId, jobSwimLaneId) {
    console.log('position', applyJobCardId, jobSwimLaneId);
    try {
      const res = await AtsDetails.setMove(
        jobInfoId,
        jobSwimLaneId,
        applyJobCardId,
      );
      console.log('response', res);
      setLoading(false);
      if (res.status === 200) {
        console.log('success', jobCard);
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function onsetPosition(jobSwimLaneId) {
    console.log('dragend', jobSwimLaneId);
    const respo = await AtsDetails.setPosition(jobInfoId, jobSwimLaneId, {
      data: dashboard.map((dest, position) => ({
        id: dest.id,
        position,
      })),
    });
  }

  const onDragEnd = useCallback(
    async ({ source, destination }) => {
      console.log('dcs', source, destination);
      //if (!destination) return;
      // const sourceColumn = board.swimlanes.filter(
      //   swim => swim.id === source.droppableId,
      // )[0];
      // const destinationColumn = board.swimlanes.filter(
      //   swim => swim.id === destination.droppableId,
      // )[0];
      // const [item] = sourceColumn.jobCards.splice(source.index, 1);
      // validGoToOutcome(sourceColumn, destinationColumn, item);
      // await destinationColumn.jobCards.splice(destination.index, 0, item);
      // const swimlanes = board.swimlanes.map((swim, position) => {
      //   let element = swim;
      //   if (element.id === destinationColumn.id) element = destinationColumn;
      //   if (element.id === sourceColumn.id) element = sourceColumn;
      //   element.position = position;
      //   return element;
      // });
      // if (source.droppableId !== destination.droppableId)
      //   await handleMoveJobCard(item.id, destinationColumn.id);
      // await handleSetPositionJobCards(
      //   destination.droppableId,
      //   destinationColumn.jobCards,
      // );
      // setBoard({
      //   ...board,
      //   swimlanes,
      // });
    },
    //[board],
  );

  const rightContent = () => (
    <div className="outermost_wrapper">
      <HeaderB2B />
      <AtsWrap>
        <AtsHead>
          <AtsTitle>
            {/* <a href="/job-posting" className="ats-title-link" /> */}
            <h2>{jobTitle}</h2>
            <ul>
              <li>{jobLocation}</li>
              <li>{location}</li>
              <li>3 days</li>
            </ul>
          </AtsTitle>

          <AtsHeadTabs>
            <Link href="/company/ats-dashboard" className="active">
              Hiring Journey
            </Link>
            <Link href="/company/ats-list-view">Applicant</Link>
          </AtsHeadTabs>
        </AtsHead>

        <AtsDashboards>
          <AtsDashboardInner>
            {dashboard.map(function(item, i) {
              // console.log('index', i);
              return (
                <>
                  <AtsDashboardItem>
                    <AtsDashboardItemHeader>
                      <AtsColorStrip
                        style={{ background: `${item.colorCode}` }}
                      />
                      <AtsItemHead>
                        <AtsItemHeadIcon>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 21V19C16 16.7909 14.2091 15 12 15H5C2.79086 15 1 16.7909 1 19V21"
                              stroke={item.colorCode}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                              stroke={item.colorCode}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18 8L23 13"
                              stroke={item.colorCode}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M23 8L18 13"
                              stroke={item.colorCode}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </AtsItemHeadIcon>

                        <h3>{item.name}</h3>

                        <AtsDashboardColorBox>
                          <button
                            style={{ background: `${item.colorCode}` }}
                            type="button"
                            onClick={e => setDisplayColor(item.id, item.name)}
                            className="colorbox-btn"
                          >
                            <img
                              src={cdn(
                                '/static/img/images/color-down-icon.svg',
                              )}
                              alt="downIcon"
                            />
                            {/* <img src={downIcon} alt="" /> */}
                          </button>
                          {displayColorPicker === item.id && (
                            <>
                              <ColorPopover>
                                {/* <ColorPopover ref={wrapperRef}> */}
                                <SketchPicker
                                  disableAlpha
                                  styles={{
                                    width: '100%',
                                    height: '8px',
                                    background: `${item.colorCode}`,
                                  }}
                                  color={item.colorCode}
                                  onChange={color => {
                                    // console.log('color__', color);
                                    setBackground(color.hex);
                                  }}
                                />
                                <PopoverAction>
                                  <Btn
                                    type="button"
                                    label={buttonsT('cancel')}
                                    handleClick={e => {
                                      setDisplayColorPicker(false);
                                    }}
                                    size="md"
                                    variant="outlineSecondary"
                                  />
                                  <Btn
                                    type="button"
                                    label={buttonsT('save')}
                                    handleClick={handleSaveColor}
                                    size="md"
                                    variant="outlinePrimary"
                                  />
                                </PopoverAction>
                              </ColorPopover>
                            </>
                          )}
                        </AtsDashboardColorBox>
                        <h4>{item.applyJobCards.length} Applicants</h4>
                      </AtsItemHead>
                    </AtsDashboardItemHeader>

                    <AtsItemAction>
                      <button
                        type="button"
                        className="btn action-btn"
                        data-toggle="modal"
                        data-target="#SendRejection"
                        onClick={() => setModalShow(true)}
                      >
                        Send rejection letter
                      </button>
                    </AtsItemAction>
                    <AtsItemBoxWrap>
                      {item.applyJobCards.map(function(applyJob) {
                        return (
                          <>
                            <Link
                              href={`/company/ats-details?id=${applyJob.id}/${item.id}/${item.jobInfoId}`}
                            >
                              {/* <a href="/company/ats-details"> */}
                              <DragDropContext onDragEnd={onDragEnd}>
                                <Link href="/company/ats-details">
                                  <AtsItemBox>
                                    <AtsUserImg />

                                    <h3>
                                      {applyJob.profile.personalInfo.firstName}
                                    </h3>
                                    <p>{applyJob.jobTitle}</p>
                                    <ul>
                                      <li>
                                        <h4 className="red-text">Poor fit</h4>
                                      </li>
                                      <li>
                                        Applied {calcDate(applyJob.applyDate)}{' '}
                                        days ago
                                      </li>
                                    </ul>
                                  </AtsItemBox>
                                </Link>
                              </DragDropContext>
                              {/* </a> */}
                            </Link>
                          </>
                        );
                      })}
                    </AtsItemBoxWrap>
                  </AtsDashboardItem>
                </>
              );
            })}
          </AtsDashboardInner>

          {/* Data Not found */}
          {dashboard.length === 0 && (
            <RecordNotFoundWrap>
              <img
                src={cdn('/static/img/images/job-not-found.svg')}
                alt="job-not-found"
              />
              {/* <img src={JobNotFound} alt="job-not-found" /> */}
              <p>No applicants...yet!</p>
            </RecordNotFoundWrap>
          )}
        </AtsDashboards>
      </AtsWrap>

      <ModelFade
        className="modal fade automated-rejection-letter-modal"
        id="rejectionLetterModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ display: 'none' }}
      >
        <ModelDialog
          className="modal-dialog modal-dialog-centered"
          role="document"
        >
          <ModelContent>
            <ModalHeader>
              <h2>
                Looks like you don’t have an automated rejection letter yet!{' '}
              </h2>
            </ModalHeader>
            <ModalBody>
              <RejectionLetterLink>
                <a href="/">Cancel</a>
                <a href="/" className="blue-link">
                  Set now
                </a>
              </RejectionLetterLink>
            </ModalBody>
          </ModelContent>
        </ModelDialog>
      </ModelFade>
      {/* Rejection Letter Modal Popup */}
      <ModalFadeRejectionLetter
        className="modal fade rejection-letter-modal"
        id="rejectionLetter"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ display: 'none' }}
      >
        <RejectionModelDialog
          className="modal-dialog modal-dialog-centered"
          role="document"
        >
          <ModelContent>
            <RejectionModelHeader>
              <h2>Rejection Letter</h2>
            </RejectionModelHeader>
            <ModalBody>
              {/* <BoxFormWrapOuter className="box-form-wrap_outer"> */}
              <BoxFormWrap className="box-form-wrap configure-job-posting">
                <h4 className="mb-14">Applicant rejection letter</h4>
                <FormGroup className="form-group border-form-group">
                  <Label>
                    Rejection Letter <span className="req-star">*</span>
                  </Label>
                  <FileAttBtn className="file-att-btn">
                    <input type="file" />
                    <img
                      src={cdn('/static/img/images/paperclip.svg')}
                      alt="paperclip"
                    />
                    {/* <img src={paperClip} alt="paperclip" /> */}
                  </FileAttBtn>
                  <textarea
                    className="form-control"
                    placeholder="Rejection letter"
                  />
                  <TextCount className="text-count">XXX/XXX</TextCount>
                </FormGroup>

                <h4 className="mb-24">Rejection letter delivery delay</h4>

                <CheckboxField>
                  <CheckBoxInner>
                    <input type="checkbox" className="checkbox" checked />
                    <Label>Set delay time after sending</Label>
                  </CheckBoxInner>
                </CheckboxField>

                <div className="box-progrss-bar">
                  <div className="box-progress" style={{ width: '25%' }}>
                    <span>3 days</span>
                  </div>
                </div>

                <ProfileBoxAction>
                  <button type="submit" className="btn action-btn">
                    Update
                  </button>
                </ProfileBoxAction>
              </BoxFormWrap>
              {/* </BoxFormWrapOuter> */}
            </ModalBody>
          </ModelContent>
        </RejectionModelDialog>
      </ModalFadeRejectionLetter>
    </div>
  );

  const content = rightContent();
  return (
    // <ComingSoonPage />
    <>
      <Page
        title="ATS Dashboard"
        description="ATS Dashboard Page"
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
    </>
  );
};

export default withAuthSync(AtsDashboard);

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import chewronDown from '@src/assets/images/chevron-down.svg';
import Page from '@components/templates/Page';
import moment from 'moment';
import DashboardNew from '@src/api/services/dashboard-new';
import { Accordion, Dropdown, DropdownButton } from 'react-bootstrap';
import { cdn } from '@utils/general';
import { useToast, Action } from '@components/molecules/Notification';
import Storage from '@utils/storage';
import HeaderB2B from '@components/organisms/headerB2B';
import { withAuthSync } from '@src/utils/auth';

import {
  OuterMostWrapper,
  DashboardWrap,
  DashboardProfile,
  DashboardInner,
  DashboardSection,
  DashboardCalendar,
} from './style';

const Dashboard = () => {
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [actionVisible, setActionVisible] = useState(false);
  const [JobDeleteId, setJobDeleteId] = useState('');
  const router = useRouter();
  const [filtertext, setFilterText] = useState('');
  const [filtertextForClose, setFilterTextForClose] = useState('');
  const [response, SetResponse] = useState(null);
  const [responseClosedJob, setResponseClosedJob] = useState([]);
  const [responseOpenJob, setResponseOpenJob] = useState([]);
  const [todayDate, setTodayDate] = useState(undefined);
  const [companyInfo, setCompanyInfo] = useState('');
  const [companyUser, setCompanyUser] = useState('');
  const [profilePer, setProfilePer] = useState(1);
  const [progressBar, setProgressBar] = useState('profile-progress-bar');
  const [profileId, setProfileId] = useState('');
  let profileIds = '';
  const getProfilePercentage = async e => {
    //const id = '4befbfeb-804a-4762-b6f4-18b897749be0';
    console.log('id', profileIds);
    const res = await DashboardNew.getProfilePercentages(profileIds);
    console.log('res......', res);
    setProfilePer(res.data.data.profilePercentage);
    if (res.data.data.profilePercentage === 1) {
      setProgressBar('profile-progress-bar');
    }
    if (res.data.data.profilePercentage === 25) {
      setProgressBar('profile-progress-bar progress-25');
    }
    if (res.data.data.profilePercentage === 50) {
      setProgressBar('profile-progress-bar progress-50');
    }
    if (res.data.data.profilePercentage === 75) {
      setProgressBar('profile-progress-bar progress-75');
    }
    if (res.data.data.profilePercentage === 100) {
      setProgressBar('profile-progress-bar progress-100');
    }
  };

  const getNewReponse = async () => {
    const checkout =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    Storage.rm('profileId');
    const companyProfile =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('companyProfile'))
        : null;
    const res = await DashboardNew.listContent(companyProfile.id);
    const { data } = res.data;
    const momentDate = moment(new Date(), 'YYYY-MM-DD');
    setCompanyInfo(companyProfile);
    setCompanyUser(checkout);
    setTodayDate(momentDate);
    SetResponse(data.rows);
    //getProfilePercentage();
  };
  useEffect(() => {
    const onFilterJob = async () => {
      const checkout =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('userDetail'))
          : null;

      const { companyProfileId } = checkout;
      const res = await DashboardNew.listContentFilter(
        companyProfileId,
        filtertext,
      );
      setResponseOpenJob(res.data.data.rows);
    };
    onFilterJob();
  }, [filtertext]);

  useEffect(() => {
    const onFilterClosedJob = async () => {
      const checkout =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('userDetail'))
          : null;
      const { companyProfileId } = checkout;
      const res = await DashboardNew.listContentFilter(
        companyProfileId,
        filtertextForClose,
      );
      setResponseClosedJob(res.data.data.rows);
    };
    onFilterClosedJob();
  }, [filtertextForClose]);

  useEffect(() => {
    const forClosedJob = () => {
      const closeJob = [];
      response
        .filter(res => res.status === 'closed')
        .map(val => closeJob.push(val));
      setResponseClosedJob(closeJob);
    };
    const forOpenJob = () => {
      const openJob = [];
      response
        .filter(res => res.status === 'published')
        .map(val => openJob.push(val));
      setResponseOpenJob(openJob);
    };
    if (response !== null) {
      forClosedJob();
      forOpenJob();
    }
  }, [response]);
  const onDeleteAvatar = e => {
    setJobDeleteId(e.target.value);
    setActionVisible(true);
  };

  const onUpdateJob = e => {
    localStorage.removeItem('profileuserInformation');
    Storage.add('profileId', e.target.value);
    router.push('/company/general-info');
  };

  const onChnageDeleteJobStatus = async jobid => {
    // const jobid = e.target.value;
    const apidata = {
      status: 'deleted',
    };
    const res = await DashboardNew.changeJobStatus(jobid, apidata);
    console.log('Response', res);
    const { data } = res?.data;
    if (res.status === 200 && data?.status === 'deleted') {
      showSuccess('Job deleted successfully..');
    } else if (res.status === 200 && data?.status === 'closed') {
      showSuccess('Job closed successfully..');
    } else if (res.status === 200 && data?.status === 'published') {
      showSuccess('Job published successfully..');
    } else {
      console.log('...Reject');
    }
    setJobDeleteId('');
    setActionVisible(false);
    getNewReponse();
  };

  const onChnageJobStatus = async e => {
    console.log('++++++++++++++', e.target.value);
    const jobid = e.target.value;
    const apidata = {
      status: e.target.name,
    };
    const res = await DashboardNew.changeJobStatus(jobid, apidata);
    console.log('Response', res);
    const { data } = res?.data;
    if (res.status === 200 && data?.status === 'deleted') {
      showSuccess('Job deleted successfully..');
    } else if (res.status === 200 && data?.status === 'closed') {
      showSuccess('Job closed successfully..');
    } else if (res.status === 200 && data?.status === 'published') {
      showSuccess('Job published successfully..');
    } else {
      console.log('...Reject');
    }
    getNewReponse();
  };

  useEffect(() => {
    const getResponse = async () => {
      localStorage.removeItem('profileuserInformation');
      const companyPro = JSON.parse(localStorage.getItem('companyProfile'));
      setProfileId(companyPro.id);
      profileIds = companyPro.id;
      getNewReponse();
      getProfilePercentage();
    };
    getResponse();
  }, []);

  const rightContent = () => (
    <OuterMostWrapper>
      <HeaderB2B />
      {actionVisible && (
        <Action
          title="Delete Job"
          description="Are you sure you want to delete this job?"
          type="warning"
          onConfirm={() => onChnageDeleteJobStatus(JobDeleteId)}
          onCancel={() => setActionVisible(false)}
          //loading={deletePhotoLoading}
        />
      )}
      <DashboardWrap>
        <DashboardInner>
          <DashboardProfile>
            <p>
              Profile <span>{profilePer}%</span> Complete
            </p>
            <div className="profile-img">
              <div className={progressBar}> </div>
              <img
                src={
                  companyInfo && companyInfo.logoUrl
                    ? companyInfo.logoUrl
                    : cdn('/static/img/default-profile.png')
                }
                alt="userlog-img"
              />
            </div>
            <h3>{companyInfo.companyName}</h3>
            {/* <h4>Basic plan • 5 job slot(s) available on your plan</h4> */}
          </DashboardProfile>
          <Accordion defaultActiveKey="0" flush>
            <DashboardSection>
              <h2>
                Job postings
                <Link href="/company/general-info" className>
                  <a
                    href="/company/general-info"
                    onClick={e => {
                      Storage.rm('profileId');
                      localStorage.removeItem('profileuserInformation');
                      localStorage.removeItem('candidate');
                    }}
                    className
                  >
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.5 24.75C19.7132 24.75 24.75 19.7132 24.75 13.5C24.75 7.2868 19.7132 2.25 13.5 2.25C7.2868 2.25 2.25 7.2868 2.25 13.5C2.25 19.7132 7.2868 24.75 13.5 24.75Z"
                        stroke="#485768"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5 9V18"
                        stroke="#485768"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 13.5H18"
                        stroke="#485768"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Add new job posting
                  </a>
                </Link>
              </h2>

              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {/* <h3>
                    <button
                      type="button"
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseMyOpenJobs"
                      aria-expanded="false"
                      aria-controls="collapseMyOpenJobs"
                    > */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  My open jobs
                  <span className="toggle-icon">
                    <img
                      src={cdn('/static/img/images/chevron-down.svg')}
                      alt="chevron-down"
                    />
                    {/* <img src={chewronDown} alt="chevron-down" /> */}
                  </span>
                  {/* </button>
                  </h3> */}
                </Accordion.Header>
                <Accordion.Body>
                  <>
                    <div className="table-responsive">
                      <table className="table">
                        {response &&
                          response.find(key => key.status === 'published') && (
                            <thead>
                              <tr>
                                <th colSpan="2">
                                  <div className="tbl-search">
                                    <img
                                      src={cdn('/static/img/search-icon.svg')}
                                      alt="Link (URL)"
                                    />
                                    <input
                                      type="text"
                                      value={filtertext}
                                      onChange={e =>
                                        setFilterText(e.target.value)
                                      }
                                      placeholder="Start typing to filter jobs..."
                                    />
                                  </div>
                                </th>
                                {/* <th>Total</th>
                              <th>New</th>
                              <th>Interviewed</th>
                              <th>Hired</th> 
                              <th>-</th>*/}
                              </tr>
                            </thead>
                          )}
                        {responseOpenJob &&
                        responseOpenJob.find(
                          key => key.status === 'published',
                        ) ? (
                          <tbody>
                            {responseOpenJob &&
                              responseOpenJob
                                .filter(res => res.status === 'published')
                                .map(val => (
                                  <>
                                    <tr>
                                      <td>
                                        <h3>{val.jobTitle}</h3>
                                        <ul>
                                          <li>{val.jobLocation}</li>
                                          <li>{val.location}</li>
                                          <li>
                                            {typeof todayDate &&
                                              todayDate?.diff(
                                                moment(
                                                  val.createdAt,
                                                  'YYYY-MM-DD',
                                                ),
                                                'days',
                                              )}
                                            &nbsp;days ago
                                          </li>
                                        </ul>
                                      </td>
                                      {/* <td>27</td>
                                      <td>8</td>
                                      <td>5</td>
                                      <td>0</td> */}
                                      <td>
                                        <Dropdown>
                                          <DropdownButton
                                            variant="success"
                                            id="dropdown-basic"
                                            title="Dropdown button"
                                          >
                                            {/* <svg
                                              width={24}
                                              height={24}
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg> */}

                                            <Dropdown.Item
                                              as="button"
                                              value={val.id}
                                              onClick={e => onUpdateJob(e)}
                                            >
                                              Edit
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
                                                  d="M16 3L21 8L8 21H3V16L16 3Z"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                              as="button"
                                              value={val.id}
                                              name="closed"
                                              onClick={e =>
                                                onChnageJobStatus(e)
                                              }
                                            >
                                              Close job
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M11 7H20C21.1046 7 22 7.89543 22 9V18M16 21H20H21M16 21H4C2.89543 21 2 20.1046 2 19V9C2 7.89543 2.89543 7 4 7H6H6.5M16 21V17"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M16.0002 11.5V5C16.0002 4.46957 15.7894 3.96086 15.4144 3.58579C15.0393 3.21071 14.5306 3 14.0002 3H10.0002C9.46972 3 8.96101 3.21071 8.58594 3.58579M8.58594 21V9.5"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M1 1L23 23"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                              className="delete-item"
                                              as="button"
                                              name="deleted"
                                              value={val.id}
                                              onClick={e => onDeleteAvatar(e)}
                                            >
                                              Delete
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M3 6H5H21"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6H20ZM6 6C6 5.44772 5.55228 5 5 5C4.44772 5 4 5.44772 4 6H6ZM7 6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6H7ZM15 6C15 6.55228 15.4477 7 16 7C16.5523 7 17 6.55228 17 6H15ZM18 6V20H20V6H18ZM18 20C18 20.5523 17.5523 21 17 21V23C18.6569 23 20 21.6569 20 20H18ZM17 21H7V23H17V21ZM7 21C6.44772 21 6 20.5523 6 20H4C4 21.6569 5.34315 23 7 23V21ZM6 20V6H4V20H6ZM9 6V4H7V6H9ZM9 4C9 3.44772 9.44772 3 10 3V1C8.34315 1 7 2.34315 7 4H9ZM10 3H14V1H10V3ZM14 3C14.5523 3 15 3.44772 15 4H17C17 2.34315 15.6569 1 14 1V3ZM15 4V6H17V4H15Z"
                                                  fill="#D92F0E"
                                                />
                                                <path
                                                  d="M10 11V17"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M14 11V17"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </Dropdown.Item>
                                          </DropdownButton>

                                          {/* <Dropdown.Menu>
                                            <button
                                              type="button"
                                              className="dropdown-item"
                                              value={val.id}
                                              onClick={e => onUpdateJob(e)}
                                            >
                                              Edit
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
                                                  d="M16 3L21 8L8 21H3V16L16 3Z"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                            <button
                                              type="button"
                                              className="dropdown-item"
                                              value={val.id}
                                              name="closed"
                                              onClick={e =>
                                                onChnageJobStatus(e)
                                              }
                                            >
                                              Close job
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M11 7H20C21.1046 7 22 7.89543 22 9V18M16 21H20H21M16 21H4C2.89543 21 2 20.1046 2 19V9C2 7.89543 2.89543 7 4 7H6H6.5M16 21V17"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M16.0002 11.5V5C16.0002 4.46957 15.7894 3.96086 15.4144 3.58579C15.0393 3.21071 14.5306 3 14.0002 3H10.0002C9.46972 3 8.96101 3.21071 8.58594 3.58579M8.58594 21V9.5"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M1 1L23 23"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                            <button
                                              className="dropdown-item delete-item"
                                              type="button"
                                              name="deleted"
                                              value={val.id}
                                              onClick={e =>
                                                onChnageJobStatus(e)
                                              }
                                            >
                                              Delete
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M3 6H5H21"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6H20ZM6 6C6 5.44772 5.55228 5 5 5C4.44772 5 4 5.44772 4 6H6ZM7 6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6H7ZM15 6C15 6.55228 15.4477 7 16 7C16.5523 7 17 6.55228 17 6H15ZM18 6V20H20V6H18ZM18 20C18 20.5523 17.5523 21 17 21V23C18.6569 23 20 21.6569 20 20H18ZM17 21H7V23H17V21ZM7 21C6.44772 21 6 20.5523 6 20H4C4 21.6569 5.34315 23 7 23V21ZM6 20V6H4V20H6ZM9 6V4H7V6H9ZM9 4C9 3.44772 9.44772 3 10 3V1C8.34315 1 7 2.34315 7 4H9ZM10 3H14V1H10V3ZM14 3C14.5523 3 15 3.44772 15 4H17C17 2.34315 15.6569 1 14 1V3ZM15 4V6H17V4H15Z"
                                                  fill="#D92F0E"
                                                />
                                                <path
                                                  d="M10 11V17"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M14 11V17"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                          </Dropdown.Menu>
                                         */}
                                        </Dropdown>
                                      </td>
                                    </tr>
                                  </>
                                ))}
                          </tbody>
                        ) : (
                          <>
                            <div className="record-not-found-wrap">
                              <img
                                src={cdn('/static/img/job-not-found.svg')}
                                alt="job-not-found"
                              />
                              <p>No job postings yet!</p>
                              <Link
                                href="/company/general-info"
                                className="action-btn"
                              >
                                <a
                                  href="/company/general-info"
                                  className="action-btn"
                                  onClick={e => {
                                    localStorage.removeItem(
                                      'profileuserInformation',
                                    );
                                  }}
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.9996 1.30469V6.9996M6.9996 6.9996H12.6945M6.9996 6.9996H1.30469M6.9996 6.9996V12.6945"
                                      stroke="#1D242F"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  Add new job posting
                                </a>
                              </Link>
                            </div>
                          </>
                        )}
                      </table>
                    </div>
                  </>

                  {response &&
                    response.find(res => res.status === 'unpublished') && (
                      <>
                        {' '}
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              {response &&
                                response
                                  .filter(res => res.status === 'unpublished')
                                  .map(val => (
                                    <>
                                      <tr>
                                        <td>
                                          <h3>
                                            <svg
                                              width={24}
                                              height={24}
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M21 13.66V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H10.34"
                                                stroke="#FBA72A"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M18 2L22 6L12 16H8V12L18 2V2Z"
                                                stroke="#FBA72A"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            {val.jobTitle} - <span>DRAFT</span>
                                          </h3>
                                          <ul>
                                            <li>{val.jobLocation}</li>
                                            <li>{val.location}</li>
                                            <li>
                                              {typeof todayDate &&
                                                todayDate?.diff(
                                                  moment(
                                                    val.createdAt,
                                                    'YYYY-MM-DD',
                                                  ),
                                                  'days',
                                                )}
                                              &nbsp;days ago
                                            </li>
                                          </ul>
                                        </td>
                                        {/* <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td> */}
                                        <td>
                                          <Dropdown>
                                            <DropdownButton
                                              variant="success"
                                              id="dropdown-basic"
                                              title="Dropdown button"
                                            >
                                              {/* <svg
                                              width={24}
                                              height={24}
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg> */}

                                              <Dropdown.Item
                                                as="button"
                                                value={val.id}
                                                onClick={e => onUpdateJob(e)}
                                              >
                                                Edit
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
                                                    d="M16 3L21 8L8 21H3V16L16 3Z"
                                                    stroke="#485768"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                as="button"
                                                value={val.id}
                                                name="closed"
                                                onClick={e =>
                                                  onChnageJobStatus(e)
                                                }
                                              >
                                                Close job
                                                <svg
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M11 7H20C21.1046 7 22 7.89543 22 9V18M16 21H20H21M16 21H4C2.89543 21 2 20.1046 2 19V9C2 7.89543 2.89543 7 4 7H6H6.5M16 21V17"
                                                    stroke="#485768"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <path
                                                    d="M16.0002 11.5V5C16.0002 4.46957 15.7894 3.96086 15.4144 3.58579C15.0393 3.21071 14.5306 3 14.0002 3H10.0002C9.46972 3 8.96101 3.21071 8.58594 3.58579M8.58594 21V9.5"
                                                    stroke="#485768"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <path
                                                    d="M1 1L23 23"
                                                    stroke="#485768"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                className="delete-item"
                                                as="button"
                                                name="deleted"
                                                value={val.id}
                                                onClick={e => onDeleteAvatar(e)}
                                              >
                                                Delete
                                                <svg
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M3 6H5H21"
                                                    stroke="#D92F0E"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <path
                                                    d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6H20ZM6 6C6 5.44772 5.55228 5 5 5C4.44772 5 4 5.44772 4 6H6ZM7 6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6H7ZM15 6C15 6.55228 15.4477 7 16 7C16.5523 7 17 6.55228 17 6H15ZM18 6V20H20V6H18ZM18 20C18 20.5523 17.5523 21 17 21V23C18.6569 23 20 21.6569 20 20H18ZM17 21H7V23H17V21ZM7 21C6.44772 21 6 20.5523 6 20H4C4 21.6569 5.34315 23 7 23V21ZM6 20V6H4V20H6ZM9 6V4H7V6H9ZM9 4C9 3.44772 9.44772 3 10 3V1C8.34315 1 7 2.34315 7 4H9ZM10 3H14V1H10V3ZM14 3C14.5523 3 15 3.44772 15 4H17C17 2.34315 15.6569 1 14 1V3ZM15 4V6H17V4H15Z"
                                                    fill="#D92F0E"
                                                  />
                                                  <path
                                                    d="M10 11V17"
                                                    stroke="#D92F0E"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <path
                                                    d="M14 11V17"
                                                    stroke="#D92F0E"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              </Dropdown.Item>
                                            </DropdownButton>
                                            {/* <Dropdown.Toggle
                                              variant="success"
                                              id="dropdown-basic"
                                            >
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
                                                  d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                                                  fill="#485768"
                                                  stroke="#485768"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z"
                                                  fill="#485768"
                                                  stroke="#485768"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z"
                                                  fill="#485768"
                                                  stroke="#485768"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                              <button
                                                className="dropdown-item"
                                                type="button"
                                                value={val.id}
                                                onClick={e => onUpdateJob(e)}
                                              >
                                                Edit
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
                                                    d="M16 3L21 8L8 21H3V16L16 3Z"
                                                    stroke="#485768"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              </button>
                                              <button
                                                type="button"
                                                value={val.id}
                                                name="closed"
                                                onClick={e =>
                                                  onChnageJobStatus(e)
                                                }
                                                className="dropdown-item"
                                              >
                                                Close job
                                                <svg
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M11 7H20C21.1046 7 22 7.89543 22 9V18M16 21H20H21M16 21H4C2.89543 21 2 20.1046 2 19V9C2 7.89543 2.89543 7 4 7H6H6.5M16 21V17"
                                                    stroke="#485768"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <path
                                                    d="M16.0002 11.5V5C16.0002 4.46957 15.7894 3.96086 15.4144 3.58579C15.0393 3.21071 14.5306 3 14.0002 3H10.0002C9.46972 3 8.96101 3.21071 8.58594 3.58579M8.58594 21V9.5"
                                                    stroke="#485768"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <path
                                                    d="M1 1L23 23"
                                                    stroke="#485768"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              </button>
                                              <button
                                                className="dropdown-item delete-item"
                                                type="button"
                                                name="deleted"
                                                value={val.id}
                                                onClick={e =>
                                                  onChnageJobStatus(e)
                                                }
                                              >
                                                Delete
                                                <svg
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M3 6H5H21"
                                                    stroke="#D92F0E"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <path
                                                    d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6H20ZM6 6C6 5.44772 5.55228 5 5 5C4.44772 5 4 5.44772 4 6H6ZM7 6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6H7ZM15 6C15 6.55228 15.4477 7 16 7C16.5523 7 17 6.55228 17 6H15ZM18 6V20H20V6H18ZM18 20C18 20.5523 17.5523 21 17 21V23C18.6569 23 20 21.6569 20 20H18ZM17 21H7V23H17V21ZM7 21C6.44772 21 6 20.5523 6 20H4C4 21.6569 5.34315 23 7 23V21ZM6 20V6H4V20H6ZM9 6V4H7V6H9ZM9 4C9 3.44772 9.44772 3 10 3V1C8.34315 1 7 2.34315 7 4H9ZM10 3H14V1H10V3ZM14 3C14.5523 3 15 3.44772 15 4H17C17 2.34315 15.6569 1 14 1V3ZM15 4V6H17V4H15Z"
                                                    fill="#D92F0E"
                                                  />
                                                  <path
                                                    d="M10 11V17"
                                                    stroke="#D92F0E"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <path
                                                    d="M14 11V17"
                                                    stroke="#D92F0E"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              </button>
                                            </Dropdown.Menu>
                                           */}
                                          </Dropdown>
                                        </td>
                                      </tr>
                                    </>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  {/* <h3>
                    <button
                      type="button"
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseMyClosedJobs"
                      aria-expanded="false"
                      aria-controls="collapseMyClosedJobs"
                    > */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 7H20C21.1046 7 22 7.89543 22 9V18M16 21H20H21M16 21H4C2.89543 21 2 20.1046 2 19V9C2 7.89543 2.89543 7 4 7H6H6.5M16 21V17"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 11.5V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0392 3.21071 14.5305 3 14 3H10C9.4696 3 8.96089 3.21071 8.58582 3.58579M8.58582 21V9.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 1L23 23"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  My closed jobs
                  <span className="toggle-icon">
                    <img
                      src={cdn('/static/img/images/chevron-down.svg')}
                      alt="chevron-down"
                    />
                    {/* <img src={chewronDown} alt="chevron-down" /> */}
                  </span>
                  {/* </button>
                  </h3> */}
                </Accordion.Header>
                <Accordion.Body>
                  <>
                    <div className="table-responsive">
                      <table className="table">
                        {response &&
                          response.find(key => key.status === 'closed') && (
                            <thead>
                              <tr>
                                <th colSpan="2">
                                  <div className="tbl-search">
                                    <img
                                      src={cdn('/static/img/search-icon.svg')}
                                      alt="Link (URL)"
                                    />
                                    <input
                                      type="text"
                                      value={filtertextForClose}
                                      onChange={e =>
                                        setFilterTextForClose(e.target.value)
                                      }
                                      placeholder="Start typing to filter jobs..."
                                    />
                                  </div>
                                </th>
                                {/* <th>Total</th>
                              <th>New</th>
                              <th>Interviewed</th>
                              <th>Hired</th> 
                              <th>-</th>*/}
                              </tr>
                            </thead>
                          )}
                        {responseClosedJob &&
                        responseClosedJob.find(
                          res => res.status === 'closed',
                        ) ? (
                          <tbody>
                            {responseClosedJob &&
                              responseClosedJob
                                .filter(res => res.status === 'closed')
                                .map(val => (
                                  <>
                                    <tr>
                                      <td>
                                        <h3>{val.jobTitle}</h3>
                                        <ul>
                                          <li>{val.jobLocation}</li>
                                          <li>{val.location}</li>
                                          <li>
                                            {typeof todayDate &&
                                              todayDate?.diff(
                                                moment(
                                                  val.createdAt,
                                                  'YYYY-MM-DD',
                                                ),
                                                'days',
                                              )}
                                            &nbsp;days ago
                                          </li>
                                        </ul>
                                      </td>
                                      {/* <td>0</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>0</td> */}
                                      <td>
                                        <Dropdown>
                                          <DropdownButton
                                            variant="success"
                                            id="dropdown-basic"
                                            title="Dropdown button"
                                          >
                                            {/* <svg
                                              width={24}
                                              height={24}
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg> */}

                                            <Dropdown.Item
                                              as="button"
                                              value={val.id}
                                              name="published"
                                              onClick={e =>
                                                onChnageJobStatus(e)
                                              }
                                            >
                                              Undo
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M2 4V10H8"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M4.51 15.0006C5.84201 18.7814 9.51384 21.2254 13.5157 20.9951C17.5176 20.7648 20.8848 17.9156 21.7742 14.007C22.6637 10.0984 20.861 6.07275 17.3528 4.13341C13.8447 2.19408 9.47683 2.80861 6.64 5.64065L2 10.0006"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                              as="button"
                                              value={val.id}
                                              name="published"
                                              onClick={e =>
                                                onChnageJobStatus(e)
                                              }
                                            >
                                              Reopen Job
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M3 17V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V17"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M16 6L12 2L8 6"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M12 2V16"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                              className="delete-item"
                                              as="button"
                                              value={val.id}
                                              name="deleted"
                                              onClick={e => onDeleteAvatar(e)}
                                            >
                                              Delete
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M3 6H5H21"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6H20ZM6 6C6 5.44772 5.55228 5 5 5C4.44772 5 4 5.44772 4 6H6ZM7 6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6H7ZM15 6C15 6.55228 15.4477 7 16 7C16.5523 7 17 6.55228 17 6H15ZM18 6V20H20V6H18ZM18 20C18 20.5523 17.5523 21 17 21V23C18.6569 23 20 21.6569 20 20H18ZM17 21H7V23H17V21ZM7 21C6.44772 21 6 20.5523 6 20H4C4 21.6569 5.34315 23 7 23V21ZM6 20V6H4V20H6ZM9 6V4H7V6H9ZM9 4C9 3.44772 9.44772 3 10 3V1C8.34315 1 7 2.34315 7 4H9ZM10 3H14V1H10V3ZM14 3C14.5523 3 15 3.44772 15 4H17C17 2.34315 15.6569 1 14 1V3ZM15 4V6H17V4H15Z"
                                                  fill="#D92F0E"
                                                />
                                                <path
                                                  d="M10 11V17"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M14 11V17"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </Dropdown.Item>
                                          </DropdownButton>
                                          {/* <Dropdown.Toggle
                                            variant="success"
                                            id="dropdown-basic"
                                          >
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
                                                d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z"
                                                fill="#485768"
                                                stroke="#485768"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <button
                                              className="dropdown-item"
                                              type="button"
                                              value={val.id}
                                              name="published"
                                              onClick={e =>
                                                onChnageJobStatus(e)
                                              }
                                            >
                                              Undo
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M2 4V10H8"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M4.51 15.0006C5.84201 18.7814 9.51384 21.2254 13.5157 20.9951C17.5176 20.7648 20.8848 17.9156 21.7742 14.007C22.6637 10.0984 20.861 6.07275 17.3528 4.13341C13.8447 2.19408 9.47683 2.80861 6.64 5.64065L2 10.0006"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                            <button
                                              className="dropdown-item"
                                              type="button"
                                              value={val.id}
                                              name="published"
                                              onClick={e =>
                                                onChnageJobStatus(e)
                                              }
                                            >
                                              Reopen Job
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M3 17V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V17"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M16 6L12 2L8 6"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M12 2V16"
                                                  stroke="#485768"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                            <button
                                              className="dropdown-item delete-item"
                                              type="button"
                                              value={val.id}
                                              name="deleted"
                                              onClick={e =>
                                                onChnageJobStatus(e)
                                              }
                                            >
                                              Delete
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M3 6H5H21"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6H20ZM6 6C6 5.44772 5.55228 5 5 5C4.44772 5 4 5.44772 4 6H6ZM7 6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6H7ZM15 6C15 6.55228 15.4477 7 16 7C16.5523 7 17 6.55228 17 6H15ZM18 6V20H20V6H18ZM18 20C18 20.5523 17.5523 21 17 21V23C18.6569 23 20 21.6569 20 20H18ZM17 21H7V23H17V21ZM7 21C6.44772 21 6 20.5523 6 20H4C4 21.6569 5.34315 23 7 23V21ZM6 20V6H4V20H6ZM9 6V4H7V6H9ZM9 4C9 3.44772 9.44772 3 10 3V1C8.34315 1 7 2.34315 7 4H9ZM10 3H14V1H10V3ZM14 3C14.5523 3 15 3.44772 15 4H17C17 2.34315 15.6569 1 14 1V3ZM15 4V6H17V4H15Z"
                                                  fill="#D92F0E"
                                                />
                                                <path
                                                  d="M10 11V17"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M14 11V17"
                                                  stroke="#D92F0E"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                          </Dropdown.Menu>
                                         */}
                                        </Dropdown>
                                      </td>
                                    </tr>
                                  </>
                                ))}
                          </tbody>
                        ) : (
                          <>
                            <div className="record-not-found-wrap">
                              <img
                                src={cdn('/static/img/job-not-found.svg')}
                                alt="job-not-found"
                              />
                              <p>No closed jobs yet!</p>
                            </div>
                            {/* <Link
     href="/company/general-info"
     className="action-btn"
   >
     <a
       href="/company/general-info"
       className="action-btn"
     >
       <svg
         width="14"
         height="14"
         viewBox="0 0 14 14"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           d="M6.9996 1.30469V6.9996M6.9996 6.9996H12.6945M6.9996 6.9996H1.30469M6.9996 6.9996V12.6945"
           stroke="#1D242F"
           strokeWidth="2"
           strokeLinecap="round"
         />
       </svg>
       Add new job posting
     </a>
   </Link> */}
                          </>
                        )}
                      </table>
                    </div>{' '}
                  </>
                </Accordion.Body>
              </Accordion.Item>
            </DashboardSection>

            <DashboardSection>
              <h2>Upcoming interviews</h2>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  {/* <h3>
                    <button
                      type="button"
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseUpNext"
                      aria-expanded="false"
                      aria-controls="collapseUpNext"
                    > */}
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
                      d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 2V6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 2V6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 10H21"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Up next: no interviews scheduled yet
                  {/* Up next: With [full name] for [job position] on [Sep 21,
                      2021] at XX:XX PM */}
                  <span className="toggle-icon">
                    <img
                      src={cdn('/static/img/images/chevron-down.svg')}
                      alt="chevron-down"
                    />
                    {/* <img src={chewronDown} alt="chevron-down" /> */}
                  </span>
                  {/* </button>
                  </h3> */}
                </Accordion.Header>
                <Accordion.Body>
                  <DashboardCalendar>
                    <div className="calendar-head">
                      <h3>Today</h3>
                      <div className="head-btn-grp">
                        <button type="button" aria-label="prev">
                          <svg
                            width="8"
                            height="12"
                            viewBox="0 0 8 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.5 1L1.5 6L6.5 11"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button type="button" aria-label="next">
                          <svg
                            width="8"
                            height="12"
                            viewBox="0 0 8 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.5 11L6.5 6L1.5 1"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="dashboard-calendar-body">
                      <ul>
                        <li>
                          <div className="time-label">11 AM</div>
                        </li>
                        <li>
                          <div className="time-label">12 PM</div>
                        </li>
                        <li>
                          <div className="time-label">1 PM</div>
                          {/* <div
                            className="calendar-time-detail light-purple-bg"
                            style={{ height: '50%' }}
                          >
                            <p>Standard dummy text- 30min</p>
                          </div> */}
                        </li>
                        <li>
                          <div className="time-label">2 PM</div>
                        </li>
                        <li>
                          <div className="time-label">3 PM</div>
                        </li>
                        <li>
                          <div className="time-label">4 PM</div>
                          {/* <div
                            className="calendar-time-detail  light-blue-bg"
                            style={{ height: '100%' }}
                          >
                            <p>Standard dummy text- 1hr</p>
                          </div> */}
                        </li>
                        <li>
                          <div className="time-label">5 PM</div>
                        </li>
                        <li>
                          <div className="time-label">6 PM</div>
                        </li>
                        <li>
                          <div className="time-label">7 PM</div>
                        </li>
                        <li>
                          <div className="time-label">8 PM</div>
                        </li>
                        <li>
                          <div className="time-label">9 PM</div>
                        </li>
                        <li>
                          <div className="time-label">10 PM</div>
                        </li>
                        <li>
                          <div className="time-label">11 PM</div>
                        </li>
                      </ul>
                    </div>
                  </DashboardCalendar>
                </Accordion.Body>
              </Accordion.Item>
            </DashboardSection>
          </Accordion>
        </DashboardInner>
      </DashboardWrap>
    </OuterMostWrapper>
  );

  const content = rightContent();
  return (
    <Page
      title="Dashboard"
      description="Dashboard Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(Dashboard);

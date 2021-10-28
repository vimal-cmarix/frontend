import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import chewronDown from '@src/assets/images/chevron-down.svg';
import Page from '@components/templates/Page';
import moment from 'moment';
import DashboardNew from '@src/api/services/dashboard-new';
import { Accordion, Dropdown } from 'react-bootstrap';
import { cdn } from '@utils/general';
import Storage from '@utils/storage';
import HeaderB2B from '@components/organisms/headerB2B';
import { withAuthSync } from '@src/utils/auth';
import AccessSetting from '@api/services/access-setting';
import {
  OuterMostWrapper,
  DashboardWrap,
  DashboardProfile,
  DashboardInner,
  DashboardSection,
  DashboardCalendar,
  BoxFormTitle,
} from './style';

const Dashboard = () => {
  const router = useRouter();
  const [filtertext, setFilterText] = useState('');
  const [response, SetResponse] = useState('');
  const [todayDate, setTodayDate] = useState(undefined);
  const [companyInfo, setCompanyInfo] = useState('');
  const [companyUser, setCompanyUser] = useState('');
  const [userDetail, setUserDetail] = useState('');
  const [jobDetail, setJobDetail] = useState([]);
  const [opened, setOpened] = useState([]);
  const [closed, setClosed] = useState([]);
  const [firstName, setFirstName] = useState('');
  ///const params = useParams();
  let params = '';

  const jobStatus = async () => {
    // const getResponse = async () => {
    //   getNewReponse();
    // };
    //getResponse();
    const checkout =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    setUserDetail(checkout);
    //jobStatus(checkout);
    const { companyProfileId } = checkout;
    //jobStatus(checkout);
    console.log('id', companyProfileId, checkout, userDetail);
    const companyId = companyProfileId;
    //console.log('id', companyId);
    const res = await AccessSetting.onGetJobStatus(companyId);
    let open = [];
    let close = [];
    //console.log('res gte', params.id, res.data.data);
    setJobDetail(res.data.data);
    const datas = res.data.data;
    console.log('job dewtra', datas);
    //let jobId = [];
    if (datas !== '' && datas !== undefined) {
      datas.forEach(element => {
        console.log('e', element.id);
        if (element.id === params.id) {
          setFirstName(element.firstName);
          console.log(element);
          if (element.job_info !== '' && element.job_info !== undefined) {
            console.log('ele', element);
            open = element.job_info.filter(
              items => items.status === 'published',
            );
            setOpened(open);
          }

          //let close = [];
          if (element.job_info !== '' && element.job_info !== undefined) {
            //console.log('99999999999999999999999');
            close = element.job_info.filter(items => items.status === 'closed');
            setClosed(close);
          }
        }
      });

      console.log('count', closed, opened);
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
    // console.log('companyInfo', companyProfile);
    const res = await DashboardNew.listContent(companyProfile.id);
    const { data } = res.data;
    const momentDate = moment(new Date(), 'YYYY-MM-DD');
    setCompanyInfo(companyProfile);
    setCompanyUser(checkout);
    setTodayDate(momentDate);
    SetResponse(data.rows);
  };

  const onFilterJob = async e => {
    setFilterText(e.target.value);
    const checkout =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    const { companyProfileId } = checkout.data;
    const res = await DashboardNew.listContentFilter(
      companyProfileId,
      filtertext,
    );
  };

  const onUpdateJob = e => {
    localStorage.removeItem('profileuserInformation');
    Storage.add('profileId', e.target.value);
    router.push('/company/general-info');
  };

  function onChnageJobStatus(key, name) {
    console.log('e', key, name);

    const jobid = key;
    const data = {
      status: name,
    };
    DashboardNew.changeJobStatus(jobid, data);
    getNewReponse();
    jobStatus();
  }

  function goBack() {
    router.back();
  }

  useEffect(() => {
    params = router.query;
    console.log(params);
    jobStatus();
  }, [router.query]);

  const rightContent = () => (
    <OuterMostWrapper>
      <HeaderB2B />

      <DashboardWrap>
        <DashboardInner>
          {/* <DashboardProfile /> */}
          <Accordion defaultActiveKey="0" flush>
            <DashboardSection>
              <a href="javascrip:void(0)" onClick={goBack} className="back-btn">
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
                Back to Access Settings
              </a>
              {/* <h2>Back to Access Settings</h2> */}

              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3>
                    <button
                      type="button"
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseMyOpenJobs"
                      aria-expanded="false"
                      aria-controls="collapseMyOpenJobs"
                    >
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
                      {firstName} open jobs
                      <span className="toggle-icon">
                        {/* <img src={chewronDown} alt="chevron-down" /> */}
                        <img
                          src={cdn('/static/img/images/chevron-down.svg')}
                          alt="chevron-down"
                        />
                      </span>
                    </button>
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  {opened.length !== 0 ? (
                    <>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>
                                <div className="tbl-search">
                                  <img
                                    src={cdn('/static/img/search-icon.svg')}
                                    alt="Link (URL)"
                                  />
                                  <input
                                    type="text"
                                    value={filtertext}
                                    onChange={onFilterJob}
                                    placeholder="Start typing to filter jobs..."
                                  />
                                </div>
                              </th>
                              {/* <th>Total</th>
                              <th>New</th>
                              <th>Interviewed</th>
                              <th>Hired</th> */}
                              <th>-</th>
                            </tr>
                          </thead>
                          <tbody>
                            {opened.map(val => (
                              <>
                                <tr>
                                  <td>
                                    <h3>{val.jobTitle}</h3>
                                    <ul>
                                      <li>{val.jobLocation}</li>
                                      <li>{val.location}</li>
                                      {/* <li>
                                        {typeof todayDate &&
                                          todayDate.diff(
                                            moment(val.createdAt, 'YYYY-MM-DD'),
                                            'days',
                                          )}
                                        &nbsp;days ago
                                      </li> */}
                                    </ul>
                                  </td>
                                  {/* <td>27</td>
                                      <td>8</td>
                                      <td>5</td>
                                      <td>0</td> */}
                                  <td>
                                    <Dropdown>
                                      <Dropdown.Toggle
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
                                          name="close"
                                          onClick={e =>
                                            onChnageJobStatus(
                                              val.id,
                                              'unpublished',
                                            )
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
                                            onChnageJobStatus(val.id, 'deleted')
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
                                    </Dropdown>
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="record-not-found-wrap">
                        <img
                          src={cdn('/static/img/job-not-found.svg')}
                          alt="job-not-found"
                        />
                        <p>No job postings yet!</p>
                        {/* <Link
                          href="/company/general-info"
                          className="action-btn"
                        >
                          <a
                            href="/company/general-info"
                            className="action-btn"
                            onClick={e => {
                              localStorage.removeItem('profileuserInformation');
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
                       */}
                      </div>
                    </>
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <h3>
                    <button
                      type="button"
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseMyClosedJobs"
                      aria-expanded="false"
                      aria-controls="collapseMyClosedJobs"
                    >
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
                      {firstName} closed jobs
                      <span className="toggle-icon">
                        {/* <img src={chewronDown} alt="chevron-down" /> */}
                        <img
                          src={cdn('/static/img/images/chevron-down.svg')}
                          alt="chevron-down"
                        />
                      </span>
                    </button>
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  {closed.length !== 0 ? (
                    <>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>
                                <div className="tbl-search">
                                  <img
                                    src={cdn('/static/img/search-icon.svg')}
                                    alt="Link (URL)"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Start typing to filter jobs..."
                                  />
                                </div>
                              </th>
                              {/* <th>Total</th>
                              <th>New</th>
                              <th>Interviewed</th>
                              <th>Hired</th> */}
                              <th>-</th>
                            </tr>
                          </thead>
                          <tbody>
                            {closed.map(val => (
                              <>
                                <tr>
                                  <td>
                                    <h3>{val.jobTitle}</h3>
                                    <ul>
                                      <li>{val.jobLocation}</li>
                                      <li>{val.location}</li>
                                      {/* <li>
                                        {typeof todayDate &&
                                          todayDate.diff(
                                            moment(val.createdAt, 'YYYY-MM-DD'),
                                            'days',
                                          )}
                                        &nbsp;days ago
                                      </li> */}
                                    </ul>
                                  </td>
                                  {/* <td>0</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>0</td> */}
                                  <td>
                                    <Dropdown>
                                      <Dropdown.Toggle
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
                                            onChnageJobStatus(
                                              val.id,
                                              'published',
                                            )
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
                                            onChnageJobStatus(
                                              val.id,
                                              'published',
                                            )
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
                                            onChnageJobStatus(val.id, 'deleted')
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
                                    </Dropdown>
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>{' '}
                    </>
                  ) : (
                    <>
                      <div className="record-not-found-wrap">
                        <img
                          src={cdn('/static/img/job-not-found.svg')}
                          alt="job-not-found"
                        />
                        <p>No closed jobs yet!</p>
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
                      </div>
                    </>
                  )}
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

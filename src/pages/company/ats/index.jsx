import React, {
  // useRef,
  useState,
  // useContext,
  useEffect,
  // useCallback,
} from 'react';
import Page from '@components/templates/Page';
import { useRouter } from 'next/router';
import logoMain from '@src/assets/images/logo-black.svg';
import notificationBell from '@src/assets/images/notification.png';
// import loggedinuser from '@src/assets/images/loggedinuser.svg';
import configure from '@src/assets/images/configure-2.png';
import PlusiCon from '@src/assets/images/plus-circle.svg';
import JobNotFound from '@src/assets/images/job-not-found.svg';
import Storage from '@utils/storage';
import Link from 'next/link';
import { withAuthSync } from '@src/utils/auth';
import { cdn } from '@utils/general';
import Slider from 'react-input-slider';
import moment from 'moment';
import { Dropdown } from 'react-bootstrap';
import DashboardNew from '@src/api/services/dashboard-new';
import HeaderB2B from '@components/organisms/headerB2B';
import {
  AtsWrap,
  AtsTableBox,
  TableResponsive,
  TblSearch,
  // DropdownTableAction,
  // DropdownItem,
} from './style';
import ComingSoonPage from '../coming-soon';

const AtsBoard = () => {
  const [response, SetResponse] = useState('');
  const [todayDate, setTodayDate] = useState(undefined);
  // const [className, setClassName] = useState('dropdown table-action');
  const router = useRouter();

  // const onChangeClass = e => {
  //   if (className === 'dropdown table-action') {
  //     setClassName('dropdown table-action show');
  //   } else {
  //     setClassName('dropdown table-action');
  //   }
  // };

  const getNewReponse = async () => {
    const checkout =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    const { companyProfileId } = checkout;
    const res = await DashboardNew.atsListContent(companyProfileId);
    const { data } = res.data;
    const momentDate = moment(new Date(), 'YYYY-MM-DD');
    setTodayDate(momentDate);
    console.log(data.rows);
    SetResponse(data.rows);
  };

  useEffect(() => {
    const getResponse = async () => {
      getNewReponse();
    };
    getResponse();
  }, []);

  const onUpdateJob = e => {
    Storage.add('profileId', e.target.value);
    router.push('/company/general-info');
  };

  const onChnageJobStatus = async e => {
    const jobid = e.target.value;
    const data = {
      status: e.target.name,
    };
    await DashboardNew.changeJobStatus(jobid, data);
    getNewReponse();
  };

  const rightContent = () => (
    <>
      <HeaderB2B />
      <AtsWrap>
        <AtsTableBox>
          <TableResponsive>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <TblSearch>
                      <i className="tbl-search-icon" />
                      <input
                        type="text"
                        placeholder="Start typing to filter jobs..."
                      />
                    </TblSearch>
                  </th>
                  <th>Total</th>
                  <th>New</th>
                  <th className="text-right">Interviewed</th>
                  <th className="text-right">Hired</th>
                  <th> </th>
                </tr>
              </thead>

              <tbody>
                {response.length > 0 &&
                  response
                    .filter(
                      val =>
                        val.status === 'published' ||
                        val.status === 'unpublished',
                    )
                    .map(res => (
                      <>
                        <tr className="tr-link">
                          <Link href={`/company/ats-dashboard?id=${res.id}`}>
                            <td>
                              <h3>
                                {res.jobTitle}
                                {res.status === 'unpublished' && (
                                  <span>DRAFT</span>
                                )}
                              </h3>
                              <ul>
                                <li>{res.jobLocation}</li>
                                <li>{res.location}</li>
                                <li>
                                  {typeof todayDate &&
                                    todayDate.diff(
                                      moment(res.createdAt, 'YYYY-MM-DD'),
                                      'days',
                                    )}
                                  &nbsp;days ago
                                </li>
                              </ul>
                            </td>
                          </Link>
                          <td>0</td>
                          <td className="text-right">0</td>
                          <td className="text-right">0</td>
                          <td>0</td>

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
                                  value={res.id}
                                  onClick={onUpdateJob}
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
                                  name="closed"
                                  value={res.id}
                                  onClick={e => onChnageJobStatus(e)}
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
                                  value={res.id}
                                  onClick={e => onChnageJobStatus(e)}
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
                {response <= 0 && (
                  <>
                    <tr className="bg-white">
                      <td colSpan="6" bgcolor="#fff">
                        {/* Data Not found */}
                        <div className="record-not-found-wrap">
                          <img
                            src={cdn('/static/img/images/job-not-found.svg')}
                            alt="job-not-found"
                          />
                          {/* <img src={JobNotFound} alt="job-not-found" /> */}
                          <p>No job postings yet!</p>
                          <Link
                            href="/company/general-info"
                            className="action-btn"
                          >
                            <a
                              href="/company/general-info"
                              className="action-btn"
                              onClick={e => {
                                Storage.rm('profileId');
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
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </TableResponsive>
        </AtsTableBox>

        {/* Data Not found */}
        <div className="ats-table-box" style={{ display: 'none' }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <div className="tbl-search">
                      <i className="tbl-search-icon" />
                      <input
                        type="text"
                        placeholder="Start typing to filter jobs..."
                      />
                    </div>
                  </th>
                  <th>Total</th>
                  <th>New</th>
                  <th className="text-right">Interviewed</th>
                  <th>Hired</th>
                  <th> </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="6" bgcolor="#fff">
                    {/* Data Not found */}
                    <div className="record-not-found-wrap">
                      <img
                        src={cdn('/static/img/images/job-not-found.svg')}
                        alt="job-not-found"
                      />
                      {/* <img src={JobNotFound} alt="job-not-found" /> */}
                      <p>No job postings yet!</p>
                      <a href="/" className="action-btn">
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
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AtsWrap>
    </>
  );

  const content = rightContent();
  return (
    // <ComingSoonPage />
    <Page
      title="ATS Board"
      description="ATS Board Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(AtsBoard);

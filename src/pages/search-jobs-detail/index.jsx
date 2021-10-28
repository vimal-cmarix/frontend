import React, { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';
import jwtDecode from 'jwt-decode';
import VerificationModal from '@components/templates/Modals/VerificateAccount';

import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import errorHandle from '@src/utils/error';
import SignService from '@api/services/sign';
import { login, withoutAuth, loginVerification } from '@src/utils/auth';
import { sizes } from '@assets/styles/medias';
import JobExperienceService from '@api/services/jobExperience';
import Page from '@components/templates/Page';
import Brand from '@components/atoms/Brand';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import { useToast, Action } from '@components/molecules/Notification';
import Storage from '@utils/storage';
import Btn from '@components/molecules/Btn';
import { cdn } from '@utils/general';

import {
  PageWrapper,
  JobListIcon,
  JobCompanyLogo,
  JobComInfoIcon,
  SearchJobsWrap,
  SearchJobHeader,
  JobCompanyBody,
  JobComInfoTitle,
  JobComInfoOne,
  JobComInfoListing,
  JobComInfo,
  ComapanyHeaderTitle,
  JobComapanyHeader,
  JobCompanyBox,
  PostReadMore,
  JobInfoListOne,
  BtnLink,
  JobInfoList,
  BookmarkBtn,
  Text,
  JobPostCompany,
  PostingItemTitle,
  JobPostingItem,
  JobPostingList,
  JobPostingWrap,
  BackToList,
  ViewComLink,
  CheckBookmark,
  NavLink,
} from './style';

const SearchJobsDetail = () => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t } = useTranslation('signup');
  const { t: homeT } = useTranslation('home');
  const { dispatch: profileDispatch } = useContext(ProfileContext);

  const { state: appState, dispatch } = useContext(AppContext);
  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(null);
  const [showAction, setShowAction] = useState({ show: false, text: '' });
  const [response, setResponse] = useState([]);
  const [companyProfile, setCompanyProfile] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getJobList = async () => {
      Storage.rm('backButton');
      const companyId = Storage.get('companyProfileId');
      if (companyId) {
        const limit = 50;
        const skip = 0;
        const jobTitle = '';
        const res = await JobExperienceService.getCompanyJobList(
          companyId,
          limit,
          skip,
          jobTitle,
        );
        if (res.status === 200) {
          const { rows } = res.data.data;
          if (rows.length > 0) {
            const jobId = rows[0].id;
            const respon = await JobExperienceService.getJobDetails(jobId);
            const { data } = respon.data;
            console.log('Rows', data);
            const cmpProfile =
              typeof window !== 'undefined'
                ? JSON.parse(localStorage.getItem('companyJobDetails_obj'))
                : null;
            console.log('ComapnyInfo', cmpProfile);
            setCompanyProfile(data);

            setResponse(rows);
            // console.log(cmpProfile, '-----');
            const health = JSON.parse(
              data.company_profile.company_about.healthAndWellness,
            );
            const vacation = JSON.parse(
              data.company_profile.company_about.vacationAndTimeOffice,
            );
            const finicial = JSON.parse(
              data.company_profile.company_about.financialAndRetirement,
            );
            const professional = JSON.parse(
              data.company_profile.company_about.professionalDevelopment,
            );
            const office = JSON.parse(
              data.company_profile.company_about.officeLifeAndPerks,
            );

            const countHealth = health !== null ? health.length : 0;
            const countVaction = vacation !== null ? vacation.length : 0;
            const countFinicial = finicial !== null ? finicial.length : 0;
            const countProfessional =
              professional !== null ? professional.length : 0;
            const countOffice = office !== null ? office.length : 0;

            const total =
              countHealth +
              countVaction +
              countFinicial +
              countProfessional +
              countOffice;
            setCount(total);
          }
        } else {
          router.push('/search-jobs');
        }
      } else {
        router.push('/search-jobs');
      }
    };
    getJobList();
  }, []);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  // async function signIn(data) {
  //   localStorage.removeItem('called');
  //   setLoading(true);

  //   try {
  //     const res = await SignService.getApplicant(data);
  //     const { accessToken, profileId, userId } = res.data.data;

  //     profileDispatch({
  //       type: 'CLEAR_PROFILE',
  //     });
  //     const info = jwtDecode(accessToken);
  //     // console.log('info---', info);
  //     if (info.isVerified) {
  //       login(accessToken, profileId, () => {
  //         Storage.rm('university');
  //         router.push('/profile');
  //       });
  //       localStorage.setItem('isCompanyUser', false);
  //       setLoading(false);
  //     } else {
  //       loginVerification(profileId, userId, () => {
  //         setShowAction({
  //           show: true,
  //           text: homeT('account_verification_action.text', {
  //             type: 'Login',
  //           }),
  //         });
  //       });
  //       setLoading(false);
  //     }
  //   } catch (e) {
  //     showToast(errorHandle(e));
  //     setLoading(false);
  //   }
  // }

  // function showVerificationModal() {
  //   setShowAction({ show: false, text: '' });
  //   dispatch({ type: 'SET_MODAL_OPENED', component: VerificationModal });
  // }

  // async function handleSubmit(data) {
  //   console.log('data', data);
  //   try {
  //     // Remove all previous errors
  //     formRef.current.setErrors({});

  //     const schema = Yup.object().shape({
  //       email: Yup.string()
  //         .email()
  //         .required(),
  //       password: Yup.string().required(),
  //     });

  //     await schema.validate(data, {
  //       abortEarly: false,
  //     });

  //     // Validation passed
  //     await signIn(data);
  //   } catch (err) {
  //     const validationErrors = {};
  //     if (err instanceof Yup.ValidationError) {
  //       err.inner.forEach(error => {
  //         validationErrors[error.path] = errorMessage(
  //           `${error.path}.${error.type}`,
  //         );
  //       });
  //       formRef.current.setErrors(validationErrors);
  //     }
  //   }
  // }

  // function verifyRedirect() {
  //   const { redirect } = router.query;
  //   if (redirect) Storage.add('redirect', redirect);
  // }

  // useEffect(() => {
  //   verifyRedirect();
  // }, []);

  const leftCellDisplay =
    screenWidth >= parseInt(sizes.laptop, 10) ? 'block' : 'none';
  const rightCellWidth = screenWidth >= parseInt(sizes.laptop, 10) ? 8 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 12 : 1;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '40px';

  const SearchJobsDetailContent = () => (
    <>
      <PageWrapper>
        <SearchJobsWrap>
          <SearchJobHeader>
            <BackToList>
              <button
                type="button"
                onClick={e => {
                  Storage.rm('companyProfileId');
                  router.push('/search-jobs');
                }}
              >
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
              </button>
            </BackToList>
          </SearchJobHeader>
          <JobPostingWrap>
            <JobPostingList>
              {response &&
                response.map(res => (
                  <>
                    <JobPostingItem>
                      <PostingItemTitle>
                        <NavLink
                          onClick={() => {
                            Storage.add('backButton', true);
                            router.push(`/search-job-posting/${res.id}`);
                          }}
                        >
                          {res?.jobTitle}
                        </NavLink>
                      </PostingItemTitle>
                      <JobPostCompany>
                        <Text>
                          {companyProfile?.company_profile?.companyName}
                        </Text>
                      </JobPostCompany>
                      {/* <BookmarkBtn>
                        <CheckBookmark
                          type="checkbox"
                          className="bookmark-check"
                        />
                        <BtnLink>
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
                        </BtnLink>
                      </BookmarkBtn> */}
                      <JobInfoList>
                        <JobInfoListOne>
                          <JobListIcon
                            alt="demo-img"
                            src={cdn('/static/img/images/map-pin.png')}
                          />
                          {res.jobLocation}
                        </JobInfoListOne>
                        <JobInfoListOne>
                          <JobListIcon
                            alt="demo-img"
                            src={cdn('/static/img/images/industry.png')}
                          />
                          {res.employmentType}
                        </JobInfoListOne>
                      </JobInfoList>
                      <PostReadMore
                        onClick={e => {
                          Storage.add('backButton', true);
                          router.push(`/search-job-posting/${res.id}`);
                        }}
                      >
                        view full posting
                        <svg
                          width="8"
                          height="14"
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 12.9993L7 6.99927L0.999999 0.999268"
                            stroke="#A873FA"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </PostReadMore>
                    </JobPostingItem>{' '}
                  </>
                ))}

              {/* <JobPostingItem>
                <PostingItemTitle>
                  <NavLink href="/">Job Posting Name</NavLink>
                </PostingItemTitle>
                <JobPostCompany>
                  <Text>Company name</Text>
                </JobPostCompany>
                <BookmarkBtn>
                  <CheckBookmark type="checkbox" className="bookmark-check" />
                  <BtnLink>
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
                  </BtnLink>
                </BookmarkBtn>
                <JobInfoList>
                  <JobInfoListOne>
                    <JobListIcon
                      alt="demo-img"
                      src={cdn('/static/img/images/map-pin.png')}
                    />
                    Location
                  </JobInfoListOne>
                  <JobInfoListOne>
                    <JobListIcon
                      alt="demo-img"
                      src={cdn('/static/img/images/industry.png')}
                    />
                    Full-time
                  </JobInfoListOne>
                </JobInfoList>
                <PostReadMore href="/">
                  view full posting
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12.9993L7 6.99927L0.999999 0.999268"
                      stroke="#A873FA"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </PostReadMore>
              </JobPostingItem> */}

              {/* <JobPostingItem>
                <PostingItemTitle>
                  <NavLink href="/">Job Posting Name</NavLink>
                </PostingItemTitle>
                <JobPostCompany>
                  <Text>Company name</Text>
                </JobPostCompany>
                <BookmarkBtn>
                  <CheckBookmark type="checkbox" className="bookmark-check" />
                  <BtnLink>
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
                  </BtnLink>
                </BookmarkBtn>
                <JobInfoList>
                  <JobInfoListOne>
                    <JobListIcon
                      alt="demo-img"
                      src={cdn('/static/img/images/map-pin.png')}
                    />
                    Location
                  </JobInfoListOne>
                  <JobInfoListOne>
                    <JobListIcon
                      alt="demo-img"
                      src={cdn('/static/img/images/industry.png')}
                    />
                    Full-time
                  </JobInfoListOne>
                </JobInfoList>
                <PostReadMore href="/">
                  view full posting
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12.9993L7 6.99927L0.999999 0.999268"
                      stroke="#A873FA"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </PostReadMore>
              </JobPostingItem> */}
            </JobPostingList>
            <JobCompanyBox>
              <JobComapanyHeader>
                <ComapanyHeaderTitle>
                  {companyProfile?.company_profile?.companyName}
                </ComapanyHeaderTitle>
                <NavLink href="/">
                  <JobCompanyLogo
                    alt="demo-img"
                    src={
                      companyProfile?.company_profile?.logoUrl
                        ? companyProfile?.company_profile?.logoUrl
                        : cdn('/static/img/default-profile.png')
                    }
                  />
                </NavLink>
              </JobComapanyHeader>
              <JobComInfo>
                <JobComInfoListing>
                  {/* <JobComInfoOne>
                    <JobComInfoTitle>
                      <JobComInfoIcon
                        src={cdn('/static/img/company-icon.svg')}
                        alt="company-icon"
                        className="company-icon"
                      />
                      Company name
                    </JobComInfoTitle>
                    <Text>{companyProfile.companyName}</Text>
                  </JobComInfoOne> */}
                  <JobComInfoOne>
                    <JobComInfoTitle>
                      <JobComInfoIcon
                        alt="demo-img"
                        src={cdn('/static/img/images/industry.png')}
                      />
                      Industry
                    </JobComInfoTitle>
                    <Text>
                      {companyProfile?.company_profile?.company_about?.industry}
                    </Text>
                  </JobComInfoOne>
                  <JobComInfoOne>
                    <JobComInfoTitle>
                      <JobComInfoIcon
                        alt="demo-img"
                        src={cdn('/static/img/images/map-pin.png')}
                      />
                      Location
                    </JobComInfoTitle>
                    <Text>
                      {
                        companyProfile?.company_profile?.company_about
                          ?.headquarters
                      }
                    </Text>
                  </JobComInfoOne>
                  <JobComInfoOne>
                    <JobComInfoTitle>
                      <JobComInfoIcon
                        alt="demo-img"
                        src={cdn('/static/img/images/company-size.png')}
                      />
                      Company Size
                    </JobComInfoTitle>
                    <Text>
                      {
                        companyProfile?.company_profile?.company_about
                          ?.companySize
                      }
                    </Text>
                  </JobComInfoOne>
                  <JobComInfoOne>
                    <JobComInfoTitle>
                      <JobComInfoIcon
                        alt="demo-img"
                        src={cdn('/static/img/images/perks.png')}
                      />
                      Perks &amp; Benefits
                    </JobComInfoTitle>
                    <Text>{count}</Text>
                  </JobComInfoOne>
                </JobComInfoListing>
              </JobComInfo>
              <JobCompanyBody>
                <Text>{companyProfile.content}</Text>
                <ViewComLink>
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
                </ViewComLink>
              </JobCompanyBody>
            </JobCompanyBox>
          </JobPostingWrap>
        </SearchJobsWrap>
      </PageWrapper>
    </>
  );

  const content = SearchJobsDetailContent();

  return (
    <Page
      title="Search Jobs"
      description="Search Jobs Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default SearchJobsDetail;

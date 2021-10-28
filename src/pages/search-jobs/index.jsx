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
import JobExperienceService from '@api/services/jobExperience';
import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import errorHandle from '@src/utils/error';
import SignService from '@api/services/sign';
import { login, withoutAuth, loginVerification } from '@src/utils/auth';
import { sizes } from '@assets/styles/medias';
import { Button } from '@components/molecules/Button';
import Page from '@components/templates/Page';
import Brand from '@components/atoms/Brand';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import { useToast, Action } from '@components/molecules/Notification';
import Storage from '@utils/storage';

import Btn from '@components/molecules/Btn';

import {
  PageWrapper,
  Searchjobswrap,
  Searchjobheader,
  Jobsearchbar,
  Jobslistwrap,
  Jobsitem,
  Jobsitemimg,
  Jobsitemimgh,
  ImageGrid,
  ButtonLoadMoreWrapper,
  NoDataFound,
  NoDataFoundWrap,
  NoDataFoundWrapp,
  NoDataFoundWrapimg,
} from './style';

const searchJobs = () => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t } = useTranslation('signup');
  const { t: homeT } = useTranslation('home');
  const { t: portfolioT } = useTranslation('portfolio');
  const { dispatch: profileDispatch } = useContext(ProfileContext);

  const { state: appState, dispatch } = useContext(AppContext);
  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(null);
  const [showAction, setShowAction] = useState({ show: false, text: '' });
  const [listResponse, setResponse] = useState([]);
  const [serachJob, setSearchJob] = useState('');
  const [loadingPortfolioList, setLoadingPortfolioList] = useState(false);
  const [imageObjects, setImageObjects] = useState([]);
  const [portfolioNext, setPortfolioNext] = useState(0);
  const [searchTitleNew, setSearchTitle] = useState('');

  const { query } = useRouter();
  let setLimit = 10;
  const fetchImages = async searchTitle => {
    Storage.rm('jobDetailId');
    Storage.rm('companyProfileId');
    Storage.rm('backButton');
    localStorage.removeItem('companyJobDetails');
    // const skip = resLength === 10 ? 0 : resLength;
    const limit = 10;
    const res = await JobExperienceService.onserchJob(setLimit, 0, searchTitle);
    if (res.status === 200) {
      const { rows } = res?.data?.data;
      setResponse(rows);
      setLimit += 5;
    }
  };

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  const handleScroll = () => {
    const userScrollHeight = window.innerHeight + window.scrollY;
    const windowBottomHeight = document.documentElement.offsetHeight;
    // console.log('userScrollHeight', windowBottomHeight);
    if (userScrollHeight >= windowBottomHeight) {
      // console.log('123', document.getElementById('searchInput').value);
      const inputVal = document.getElementById('searchInput')?.value;
      fetchImages(inputVal || '');
      //   if (inputVal) {
      //     fetchImages(inputVal);
      //   } else {
      //     fetchImages('');
      //   }
    }
  };

  useEffect(() => {
    fetchImages(searchTitleNew);
    window.addEventListener('scroll', handleScroll); // attaching scroll event listener
  }, []);

  const onSearchJob = e => {
    setSearchTitle(e.target.value);
    fetchImages(e.target.value);
    // setSearchJob(e.target.value);
    // const skip = 10;
    // const searchTitle = e.target.value;
    // const res = await JobExperienceService.onserchJob(
    //   searchresLength,
    //   skip,
    //   searchTitle,
    // );
    // setSearchTitle(searchTitle);
    // if (res.status === 200) {
    //   const { rows } = res?.data?.data;
    //   setResponse(rows);
    //   searchresLength += 5;
    // }
  };

  const onGetCompanyJobsList = (companyId, companyProfile) => {
    Storage.add('companyProfileId', companyId);
    localStorage.setItem(
      'companyJobDetails_obj',
      JSON.stringify(companyProfile),
    );
    router.push('/search-jobs-detail');
  };

  async function signIn(data) {
    localStorage.removeItem('called');
    setLoading(true);

    try {
      const res = await SignService.getApplicant(data);
      const { accessToken, profileId, userId } = res.data.data;

      profileDispatch({
        type: 'CLEAR_PROFILE',
      });
      const info = jwtDecode(accessToken);
      // console.log('info---', info);
      if (info.isVerified) {
        login(accessToken, profileId, () => {
          Storage.rm('university');
          router.push('/profile');
        });
        localStorage.setItem('isCompanyUser', false);
        setLoading(false);
      } else {
        loginVerification(profileId, userId, () => {
          setShowAction({
            show: true,
            text: homeT('account_verification_action.text', {
              type: 'Login',
            }),
          });
        });
        setLoading(false);
      }
    } catch (e) {
      // showToast(errorHandle(e));
      setLoading(false);
    }
  }

  function showVerificationModal() {
    setShowAction({ show: false, text: '' });
    dispatch({ type: 'SET_MODAL_OPENED', component: VerificationModal });
  }

  async function handleSubmit(data) {
    console.log('data', data);
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      await signIn(data);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  async function handleGetBoard() {
    if (!query.id) return;

    const { data } = await JobExperienceService.getJobDetails(query.id);
    console.log('sdfsdfasfsdaf', data);
  }

  function verifyRedirect() {
    const { redirect } = router.query;
    if (redirect) Storage.add('redirect', redirect);
  }

  useEffect(() => {
    verifyRedirect();
  }, []);

  // const getLoadMore = async () => {
  //   setLoadingPortfolioList(true);
  //   try {
  //     const response = await PortfolioService.getLibraryLink(
  //       portfolioNext,
  //       token,
  //     );
  //     const { data } = response.data;
  //     const { links } = data;

  //     setPortfolioList(portfolioList.concat(data.rows));
  //     setPortfolioNext(links.next);
  //   } catch (e) {
  //     showToast(errorHandle(e));
  //   } finally {
  //     setLoadingPortfolioList(false);
  //   }
  // };

  const leftCellDisplay =
    screenWidth >= parseInt(sizes.laptop, 10) ? 'block' : 'none';
  const rightCellWidth = screenWidth >= parseInt(sizes.laptop, 10) ? 8 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 12 : 1;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '40px';

  const searchJobsContent = () => (
    <>
      <PageWrapper>
        {/* <div className="outermost_wrapper "> */}
        <Searchjobswrap>
          <Searchjobheader>
            <Jobsearchbar>
              <i className="job-search-icon" />
              <input
                id="searchInput"
                type="text"
                value={searchTitleNew}
                placeholder="Search Jobs"
                onChange={onSearchJob}
              />
            </Jobsearchbar>
          </Searchjobheader>
          <Jobslistwrap>
            {listResponse.length > 0 &&
              listResponse.map(val => (
                <>
                  <Jobsitem>
                    <Jobsitemimg
                      onClick={e =>
                        onGetCompanyJobsList(
                          val.companyProfileId,
                          val.company_profile,
                        )
                      }
                    >
                      <img
                        //  src={
                        //   companyInfo && companyInfo.logoUrl
                        //     ? companyInfo.logoUrl
                        //     : cdn('/static/img/default-profile.png')
                        // }
                        src={
                          val?.company_profile?.logoUrl
                            ? val?.company_profile?.logoUrl
                            : cdn('/static/img/default-profile.png')
                        }
                        alt="Company Logo"
                      />
                    </Jobsitemimg>

                    <Jobsitemimgh>
                      <button
                        type="button"
                        // href={`/search-job-posting/${val.id}`}
                        // href="/search-job-posting"
                        onClick={e => {
                          Storage.add('showBackButton', true);
                          router.push(`/search-job-posting/${val.id}`);
                          // handleGetBoard(val.id);
                        }}
                      >
                        {val?.jobTitle || ''}
                      </button>
                    </Jobsitemimgh>
                  </Jobsitem>

                  {imageObjects.length ? (
                    <ImageGrid imageObjects={imageObjects} />
                  ) : null}
                </>
              ))}
            {listResponse.length === 0 && (
              <>
                <NoDataFound>
                  <NoDataFoundWrap>
                    <NoDataFoundWrapimg
                      src={cdn('/static/img/job-not-found.svg')}
                      alt="job-not-found"
                    />
                    <NoDataFoundWrapp>No Jobs Found</NoDataFoundWrapp>
                  </NoDataFoundWrap>
                </NoDataFound>
              </>
            )}
            {/* <Jobsitem>
              <Jobsitemimg>
                <Link href="/search-jobs-detail">
                  <img
                    src={cdn('/static/img/images/shopify-logo.svg')}
                    alt="spotifyLogo"
                  />
                </Link>
              </Jobsitemimg>
              <Jobsitemimgh>
                <Link href="/search-jobs-detail">Shopify</Link>
              </Jobsitemimgh>
            </Jobsitem> */}

            {/* <Jobsitem>
              <Jobsitemimg>
                <Link href="/search-jobs-detail">
                  <img
                    src={cdn('/static/img/images/chipotle-logo.svg')}
                    alt="spotifyLogo"
                  />
                </Link>
              </Jobsitemimg>
              <Jobsitemimgh>
                <Link href="/search-jobs-detail">Chipotle Mexican Grill</Link>
              </Jobsitemimgh>
            </Jobsitem> */}

            {/* <Jobsitem>
              <Jobsitemimg>
                <Link href="/search-jobs-detail">
                  <img
                    src={cdn('/static/img/images/spotify-logo.svg')}
                    alt="spotifyLogo"
                  />
                </Link>
              </Jobsitemimg>
              <Jobsitemimgh>
                <Link href="/search-jobs-detail">Spotify</Link>
              </Jobsitemimgh>
            </Jobsitem>

            <Jobsitem>
              <Jobsitemimg>
                <Link href="/search-jobs-detail">
                  <img
                    src={cdn('/static/img/images/shopify-logo.svg')}
                    alt="spotifyLogo"
                  />
                </Link>
              </Jobsitemimg>
              <Jobsitemimgh>
                <Link href="/search-jobs-detail">Shopify</Link>
              </Jobsitemimgh>
            </Jobsitem>

            <Jobsitem>
              <Jobsitemimg>
                <Link href="/search-jobs-detail">
                  <img
                    src={cdn('/static/img/images/chipotle-logo.svg')}
                    alt="spotifyLogo"
                  />
                </Link>
              </Jobsitemimg>
              <Jobsitemimgh>
                <Link href="/search-jobs-detail">Chipotle Mexican Grill</Link>
              </Jobsitemimgh>
            </Jobsitem>

            <Jobsitem>
              <Jobsitemimg>
                <Link href="/search-jobs-detail">
                  <img
                    src={cdn('/static/img/images/spotify-logo.svg')}
                    alt="spotifyLogo"
                  />
                </Link>
              </Jobsitemimg>
              <Jobsitemimgh>
                <Link href="/search-jobs-detail">Spotify</Link>
              </Jobsitemimgh>
            </Jobsitem>

            <Jobsitem>
              <Jobsitemimg>
                <Link href="/search-jobs-detail">
                  <img
                    src={cdn('/static/img/images/shopify-logo.svg')}
                    alt="spotifyLogo"
                  />
                </Link>
              </Jobsitemimg>
              <Jobsitemimgh>
                <Link href="/search-jobs-detail">Shopify</Link>
              </Jobsitemimgh>
            </Jobsitem>

            <Jobsitem>
              <Jobsitemimg>
                <Link href="/search-jobs-detail">
                  <img
                    src={cdn('/static/img/images/chipotle-logo.svg')}
                    alt="spotifyLogo"
                  />
                </Link>
              </Jobsitemimg>
              <Jobsitemimgh>
                <Link href="/search-jobs-detail">Chipotle Mexican Grill</Link>
              </Jobsitemimgh>
            </Jobsitem> */}
          </Jobslistwrap>
        </Searchjobswrap>
        {/* </div> */}
      </PageWrapper>
    </>
  );

  const content = searchJobsContent();

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

export default searchJobs;

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Grid, Cell } from 'styled-css-grid';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import PaymentContext from '@context/paymentContext';

import PortfolioService from '@api/services/portfolio';

import Loader from '@components/atoms/Loader';
import Icon from '@components/atoms/Icon';

import PostCard from '@components/molecules/PostCard';
import Btn from '@components/molecules/Btn';
import { Button } from '@components/molecules/Button';
import { useToast, Action } from '@components/molecules/Notification';

import Insights from '@components/organisms/Insights';
import TopBanner from '@components/organisms/TopBanner';
import ResponsiveGrid from '@components/organisms/ResponsiveGrid';

import Page from '@components/templates/Page';
import SideBar from '@components/templates/SideBar/Home';
import VerificationModal from '@components/templates/Modals/VerificateAccount';
import SuccessPaymentModal from '@components/templates/Modals/SuccessPayment';
import MediaFrame from '@components/templates/Modals/MediaFrame';

import errorHandle from '@src/utils/error';
import { withAuthSync } from '@src/utils/auth';
import { sample, serverRedirect } from '@utils/general';

import { sizes } from '@assets/styles/medias';
import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';

import { PUBLISHED, FREE, TUTORIALS } from '@modules/consts';

import { GridWrapper } from '@src/pages/learning-center/style';

import AdminService from '@api/services/admin';

import {
  SectionTitle,
  Section,
  PostsCardWrapper,
  InsertBoxWrapper,
  LoaderWrapper,
  InsertBox,
  InsertTitle,
  PortifolioButtonWrapper,
  MobilePortifolioButtonWrapper,
  WrapperEmptyState,
} from './style';

const jwtDecode = require('jwt-decode');

const Home = ({ isVerified }) => {
  const { state: appState, dispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);
  const { state: paymentState } = useContext(PaymentContext);

  // const formRef = useRef(null);

  // const { t: modalT } = useTranslation('modals');
  // const filters = [
  //   {
  //     label: modalT('analytics.filters.seven'),
  //     value: 'sevenDaysAgo',
  //   },
  //   {
  //     label: modalT('analytics.filters.month'),
  //     value: 'oneMonthAgo',
  //   },
  //   {
  //     label: modalT('analytics.filters.3month'),
  //     value: 'threeMonthAgo',
  //   },
  //   {
  //     label: modalT('analytics.filters.6month'),
  //     value: 'sixMonthAgo',
  //   },
  // ];

  const { t: homeT } = useTranslation('home');
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  const [showAction, setShowAction] = useState({ show: false, text: '' });
  const [screenWidth, setScreenWidth] = useState(null);
  const [about, setAbout] = useState({});
  const [user, setUser] = useState({});
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [resume, setResume] = useState([]);
  const [summary, setSummary] = useState({});

  // const [filter, setFilter] = useState(filters[0]);

  const [portfolioList, setPortfolioList] = useState([]);
  const [slicePortfolio, setSlicePortifolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInsertBox, setShowInsertBox] = useState(false);
  const [bigLoading, setBigLoading] = useState(true);
  const { PROJECT_NAME } = process.env;

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  const getPortfolioData = async status => {
    const { id } = profileState;
    try {
      setLoading(true);
      const response = await PortfolioService.getAll(id, {
        status,
        limit: 8,
        skip: 0,
      });
      setPortfolioList(response.data.data.rows);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    } catch (e) {
      if (e.data.error === 'Forbidden' && !isVerified) {
        setPortfolioList([]);
        setLoading(false);
      } else {
        showToast(errorHandle(e));
      }
    } finally {
      setTimeout(() => {
        setBigLoading(false);
      }, 700);
    }
  };

  function showPaymentSuccessAlert() {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: SuccessPaymentModal,
    });
  }

  function handleData() {
    const data = profileState;

    const { personalInfo, photo } = data;

    setUser({
      name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      position: data.about.occupation,
      photo,
    });

    setEducation(data.education);
    setExperiences(data.experiences);
    setCertificates(data.certificates);
    setSkills(data.skills);
    setInterests(data.interests);
    setAbout(data.about);
    setResume(data.resume);
    setSummary(data.summary);
  }

  function removeUniversityFromLocal() {
    localStorage.removeItem(`${PROJECT_NAME}-university`);
  }

  useEffect(() => {
    removeUniversityFromLocal();
  }, []);

  useEffect(() => {
    setBigLoading(true);

    if (profileState.id) {
      handleData();
      if (isVerified) {
        getPortfolioData(PUBLISHED);
      } else {
        setLoading(false);
        setBigLoading(false);
      }
    }

    if (appState.paymentSuccessAlert.show && appState.paymentSuccessAlert) {
      showPaymentSuccessAlert();
    }
  }, [profileState.id]);

  function hasData() {
    if (!profileState.id) return false;

    const conditions = [
      profileState.skills?.length,
      profileState.interests?.length,
      profileState.experiences?.length,
      profileState.resume,
      profileState.summary.video,
      profileState.about.occupation,
      profileState.education?.length,
      profileState.certificates?.length,
    ];

    return conditions.find(condition => condition);
  }

  useEffect(() => {
    setShowInsertBox(portfolioList?.length === 0);

    setSlicePortifolio(
      screenWidth >= parseInt(sizes.desktop, 10)
        ? portfolioList.slice(0, 8)
        : portfolioList.slice(0, 6),
    );
  }, [portfolioList]);

  function insertNew(type) {
    if (isVerified) {
      Router.push(`/library/post/create/${type}`);
    } else {
      setShowAction({
        show: true,
        text: homeT('account_verification_action.text', {
          type: homeT(`account_verification_action.${type}`),
        }),
      });
    }
  }

  function showVerificationModal() {
    setShowAction({ show: false, text: '' });
    dispatch({ type: 'SET_MODAL_OPENED', component: VerificationModal });
  }

  function isAccountVerify(e, type) {
    if (!isVerified) {
      e.preventDefault();
      e.stopPropagation();
      setShowAction({
        show: true,
        text: `You must validate your account to enable your ${type}.`.replace(
          'job-tracker',
          'aplication tracker',
        ),
      });
    }
  }

  const isAnalyticsEnabled = useMemo(() => {
    return (
      paymentState?.userPlan !== FREE && typeof profileState.slug === 'string'
    );
  }, [paymentState, profileState]);

  const insightsCols = useMemo(() => {
    if (screenWidth > parseInt(sizes.tablet, 10)) return 3;
    return 1;
  }, [screenWidth]);

  const postPerLine = useMemo(() => {
    if (screenWidth >= parseInt(sizes.desktop, 10)) return 4;
    if (screenWidth > parseInt(sizes.desktosmall, 10)) return 3;
    if (screenWidth > parseInt(sizes.tablet, 10)) return 2;
    return 1;
  }, [screenWidth]);

  const contentW = useMemo(() => {
    if (screenWidth > parseInt(sizes.laptop, 10)) return 9;
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 12;
    return 8;
  }, [screenWidth]);

  const sidebarW = useMemo(() => {
    if (screenWidth > parseInt(sizes.laptop, 10)) return 3;
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 12;
    return 4;
  }, [screenWidth]);

  const [list, setList] = useState([]);

  const getVideos = async () => {
    try {
      setLoading(true);
      const content = `learning-center-${TUTORIALS}`;
      const response = await AdminService.listContent(content);
      setList(sample(response.data || [], 3));
    } catch (e) {
      console.error(e);
      toast.add(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const isMobile = useMemo(
    () => appState.screenWidth <= parseInt(sizes.tablet, 10),
    [appState.screenWidth],
  );

  function openModal(item) {
    if (isMobile) {
      window.open(item.value);
    } else {
      const { html } = item.meta;
      dispatch({
        type: 'SET_MODAL_OPENED',
        component: MediaFrame,
        props: {
          html,
        },
      });
    }
  }

  return (
    <Page
      title={homeT('title')}
      description={homeT('title')}
      isAccountVerify={isAccountVerify}
      pageLoader={bigLoading}
      isVerified={isVerified}
    >
      {bigLoading ? null : (
        <SafeArea disableScroll={appState.modal.isOpened}>
          {showAction.show && (
            <Action
              type="warning"
              title="Oops!"
              description={showAction.text}
              onCancel={() => setShowAction({ show: false, text: '' })}
              onConfirm={() => showVerificationModal()}
            />
          )}
          <Grid columns={12} gap="24px">
            <Cell width={sidebarW}>
              <SideBar
                profile={user}
                education={education}
                experiences={experiences}
                certificates={certificates}
                skills={skills}
                interests={interests}
                resume={resume}
                about={about}
                summary={summary}
                hasData={hasData}
              />
            </Cell>
            <Cell width={contentW}>
              <ContentWrapper>
                {isAnalyticsEnabled && (
                  <Section style={{ marginBottom: '50px' }}>
                    <SectionTitle>{homeT('intelligence')}</SectionTitle>
                    <Insights
                      profileSlug={profileState.slug}
                      columns={insightsCols}
                    />
                  </Section>
                )}

                {!isAnalyticsEnabled && (
                  <Section style={{ marginBottom: '50px' }}>
                    <TopBanner profileSlug={profileState.slug} />
                  </Section>
                )}

                <Section>
                  <SectionTitle largeMargin>{homeT('tutorials')}</SectionTitle>
                  <PortifolioButtonWrapper>
                    <Btn
                      variant="outlinePrimary"
                      label={homeT('view_all')}
                      handleClick={() =>
                        Router.push('/learning-center/tutorials')
                      }
                    />
                  </PortifolioButtonWrapper>
                  {loading ? (
                    <InsertBoxWrapper>
                      <LoaderWrapper>
                        <Loader size="large" />
                      </LoaderWrapper>
                    </InsertBoxWrapper>
                  ) : (
                    <>
                      {list?.length > 0 ? (
                        <>
                          <PostsCardWrapper>
                            <GridWrapper>
                              <ResponsiveGrid
                                options={{
                                  widthOffset: 200,
                                  margin:
                                    screenWidth <=
                                    parseInt(sizes.tabletPortrait, 10)
                                      ? 'auto'
                                      : '0',
                                }}
                              >
                                {/* {list &&
                                  list.map(item => {
                                    if (item) {
                                      // return (
                                      <Cell
                                        key={item.value}
                                        onClick={() => {
                                          openModal(item);
                                        }}
                                      >
                                        <PostCard
                                          image={item.meta.thumbnail_url}
                                          title={item.meta.title}
                                          desc={item.meta.description}
                                          tags={[]}
                                          titleOnly
                                          type={item.meta.type}
                                          data={item.meta}
                                          thumbCover
                                        />
                                      </Cell>;
                                      // );
                                    }
                                  })} */}
                              </ResponsiveGrid>
                            </GridWrapper>
                          </PostsCardWrapper>
                          {/* <SZGLink label={homeT('view_all')} href="/library" size="medium" /> */}
                          <MobilePortifolioButtonWrapper>
                            <Button
                              label={homeT('edit_portfolio')}
                              size="small"
                              colorSchema="primary"
                              handleClick={() => Router.push('/library')}
                            />
                          </MobilePortifolioButtonWrapper>
                        </>
                      ) : (
                        <InsertBoxWrapper>
                          <WrapperEmptyState>
                            <span>{homeT('tutorials_empty')}</span>
                          </WrapperEmptyState>
                          {showInsertBox && (
                            <Grid columns={4} gap="24px">
                              <Cell
                                width={
                                  screenWidth <= parseInt(sizes.tablet, 10)
                                    ? 4
                                    : 1
                                }
                                onClick={() => insertNew('blog')}
                              >
                                <InsertBox>
                                  <Icon name="blog" />
                                  <InsertTitle>
                                    {homeT('insert_box.blog')}
                                  </InsertTitle>
                                </InsertBox>
                              </Cell>
                              <Cell
                                width={
                                  screenWidth <= parseInt(sizes.tablet, 10)
                                    ? 4
                                    : 1
                                }
                                onClick={() => insertNew('link')}
                              >
                                <InsertBox>
                                  <Icon name="external-link" />
                                  <InsertTitle>
                                    {homeT('insert_box.external-link')}
                                  </InsertTitle>
                                </InsertBox>
                              </Cell>
                              <Cell
                                width={
                                  screenWidth <= parseInt(sizes.tablet, 10)
                                    ? 4
                                    : 1
                                }
                                onClick={() => insertNew('video')}
                              >
                                <InsertBox>
                                  <Icon name="video" />
                                  <InsertTitle>
                                    {homeT('insert_box.video')}
                                  </InsertTitle>
                                </InsertBox>
                              </Cell>
                              <Cell
                                width={
                                  screenWidth <= parseInt(sizes.tablet, 10)
                                    ? 4
                                    : 1
                                }
                                onClick={() => insertNew('document')}
                              >
                                <InsertBox>
                                  <Icon name="document" />
                                  <InsertTitle>
                                    {homeT('insert_box.document')}
                                  </InsertTitle>
                                </InsertBox>
                              </Cell>
                            </Grid>
                          )}
                        </InsertBoxWrapper>
                      )}
                    </>
                  )}
                </Section>
              </ContentWrapper>
            </Cell>
          </Grid>
        </SafeArea>
      )}
    </Page>
  );
};

Home.getInitialProps = async ctx => {
  const nameToken = `${process.env.PROJECT_NAME}-token`;
  const nameProfile = `${process.env.PROJECT_NAME}-profileId`;
  const response = nextCookie(ctx);
  const profileId = response[nameProfile];
  const token = response[nameToken];
  const info = token && jwtDecode(token);

  if (!info || !profileId) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/signin');
    } else {
      Router.push('/signin');
    }
  }

  return info;
};

Home.propTypes = {
  isVerified: PropTypes.bool.isRequired,
};

export default withAuthSync(Home);

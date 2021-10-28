import React, { useEffect, useState, useContext } from 'react';
import Router, { useRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';
import { useTranslation } from 'react-i18next';

import { sizes } from '@assets/styles/medias';
import Storage from '@utils/storage';
import ProfileContext from '@context/profileContext';
import ShareService from '@api/services/share';
import PortfolioService from '@api/services/portfolio';
import AppContext from '@context/appContext';

import { useToast } from '@components/molecules/Notification';
import errorHandle from '@src/utils/error';

import { Button } from '@components/molecules/Button';
import Page from '@components/templates/Page';
import Sidebar from '@components/templates/SideBar/View';

import UnorderedList from '@components/molecules/UnorderedList';
import SummaryCard from '@components/molecules/SummaryCard';
import PostCard from '@components/molecules/PostCard';

import { monthYearToString, useQueryTab } from '@src/utils/general';
import getThumbPortfolio from '@src/utils/portfolio';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import { Tab, Tabs } from '@components/molecules/Tab/style';
import { PUBLISHED } from '@modules/consts';

import {
  // LoaderWrapper,
  Section,
  SectionTitle,
  SectionDescription,
  SectionWrapper,
  VideoTitle,
  VideoWrapper,
  TabContent,
  ResumeWrapper,
  ButtonLoadMoreWrapper,
  FitContentButtonWrapper,
} from './style';

const SUMMARY = 'SUMMARY';
const RESUME = 'RESUME';
const PORTFOLIO = 'LIBRARY';

const View = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { t: profileT } = useTranslation('profile');
  const { t: modalsT } = useTranslation('modals');
  const { t: monthsT } = useTranslation('months');
  const { dispatch, state: profileState } = useContext(ProfileContext);
  const { state: appState } = useContext(AppContext);

  const [tab, setTab] = useQueryTab(router.query.tab || SUMMARY);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  const [userCode, setUserCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSidebar, setloadingSidebar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);

  const [summaryTitle, setSummaryTitle] = useState(false);
  const [summaryDescription, setSummaryDescription] = useState(false);
  const [summaryVideoThumb, setSummaryVideoThumb] = useState(false);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [resume, setResume] = useState(false);

  const [portfolioList, setPortfolioList] = useState([]);
  const [loadingPorfolio, setLoadingPorfolio] = useState(true);
  const [portfolioNext, setPortfolioNext] = useState(0);

  if (process.browser) {
    window.onpopstate = () => {
      const tabSel = window.location.search.replace('?tab=', '');
      setTab(tabSel);
    };
  }

  const getPortfolioData = async () => {
    const { id, accessToken } = profileState;

    try {
      setLoadingPorfolio(true);
      const response = await PortfolioService.getAll(id, {
        status: PUBLISHED,
        limit: 6,
        skip: 0,
        access_token: accessToken,
      });
      const { data } = response.data;
      const { links } = data;
      const list = data.rows;
      setPortfolioList(list);
      setPortfolioNext(links.next);
      setTimeout(() => {
        setLoadingPorfolio(false);
        setLoading(false);
      }, 200);
    } catch (e) {
      setPortfolioList([]);
      setLoadingPorfolio(false);
      setLoading(false);
      showToast(errorHandle(e));
    }
  };

  const getLoadMore = async () => {
    const { accessToken } = profileState;

    try {
      setLoadingPorfolio(true);
      const response = await PortfolioService.getLibraryLink(
        portfolioNext,
        accessToken,
      );
      const { data } = response.data;
      const { links } = data;
      setPortfolioList(portfolioList.concat(data.rows));
      setPortfolioNext(links.next);
      setLoadingPorfolio(false);
    } catch (e) {
      showToast(errorHandle(e));
    }
  };

  function handleData() {
    const data = profileState;
    const { summary } = data;
    const { asset, title, description, link } = summary;
    setSummaryTitle(title);
    setSummaryDescription(description);
    setSummaryVideoThumb(asset ? asset.thumbnail : link && link.imageUrl);
    setSkills(data.skills);
    setEducation(data.education);
    setCertificates(data.certificates);
    setExperiences(data.experiences);
    setResume(data.resume && data.resume.path && data.resume.path.preview);

    getPortfolioData();
  }

  async function getProfile() {
    try {
      const res = await ShareService.getShare(
        slug,
        encodeURIComponent(userCode),
      );
      const { data } = res.data;
      const { content } = data;

      dispatch({
        type: 'SET_PROFILE_DATA',
        data: { ...content, accessToken: data.accessToken },
      });
      setLoading(false);
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function fetchData() {
    await getProfile();
  }

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  if (process.browser) {
    useEffect(() => setUserCode(Storage.get('userCode')), [window]);
  }

  useEffect(() => {
    if (userCode) {
      fetchData();
    }
  }, [userCode]);

  useEffect(() => {
    if (profileState && profileState.id) handleData();
  }, [profileState]);

  function getSidebarW() {
    if (screenWidth > parseInt(sizes.laptop, 10)) return 3;
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 12;
    return 3;
  }

  function getSidebarGap() {
    if (screenWidth > parseInt(sizes.laptop, 10)) return 2;
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 0;
    return 2;
  }

  function getContentW() {
    if (screenWidth > parseInt(sizes.laptop, 10)) return 7;
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 12;
    return 7;
  }

  function getPostPerLine() {
    if (screenWidth >= parseInt(sizes.desktop, 10)) return 3;
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 1;
    return 2;
  }

  const goToSummary = () => {
    Router.push(`/view/${slug}/summary`);
  };

  const sidebarW = getSidebarW();
  const contentW = getContentW();
  const postPerLine = getPostPerLine();
  const sidebarGap = getSidebarGap();

  return (
    <>
      <Page
        title="View profile"
        description="View profile"
        nav={{ show: true, component: [] }}
        className="view-profile"
        topbar={{ show: true }}
        pageLoader={!userCode || loading || !loadingSidebar}
        loadProfile={false}
        isPrivateView
        isVerified
      >
        <SafeArea>
          <Grid columns={12} gap="24px">
            <Cell width={sidebarW} left={sidebarGap}>
              <Sidebar setLoading={setloadingSidebar} isExternalAccess />
            </Cell>
            <Cell width={contentW}>
              <ContentWrapper>
                <Tabs>
                  <Tab
                    active={tab === SUMMARY}
                    onClick={() => {
                      setTab(SUMMARY);
                    }}
                  >
                    {profileT('summary')}
                  </Tab>
                  {portfolioList?.length > 0 && (
                    <Tab
                      active={tab === PORTFOLIO}
                      onClick={() => {
                        setTab(PORTFOLIO);
                      }}
                    >
                      {profileT('portfolio')}
                    </Tab>
                  )}
                  {resume && (
                    <Tab
                      active={tab === RESUME}
                      onClick={() => {
                        setTab(RESUME);
                      }}
                    >
                      {profileT('resume')}
                    </Tab>
                  )}
                </Tabs>
                <TabContent show={tab === SUMMARY}>
                  {/* SUMMARY */}
                  {summaryVideoThumb && summaryTitle && (
                    <Section>
                      <SectionWrapper>
                        <>
                          <VideoWrapper>
                            <img src={summaryVideoThumb} alt={summaryTitle} />
                          </VideoWrapper>
                          <VideoTitle>{summaryTitle}</VideoTitle>
                          <SectionDescription>
                            {summaryDescription}
                          </SectionDescription>
                          <FitContentButtonWrapper
                            center
                            style={{ width: '232px' }}
                          >
                            <Button
                              colorSchema="secondary"
                              size="small"
                              label={profileT('view_summary')}
                              handleClick={goToSummary}
                            />
                          </FitContentButtonWrapper>
                        </>
                      </SectionWrapper>
                    </Section>
                  )}

                  {/* EDUCATION */}
                  {experiences?.length > 0 && (
                    <Section>
                      <SectionTitle largeMobile>
                        {profileT('job_experience')}
                      </SectionTitle>
                      <SectionWrapper>
                        {experiences.map((item, index) => (
                          <div key={item.id}>
                            <SummaryCard
                              title={item.company}
                              lines={[
                                item.occupation,
                                `${monthYearToString(
                                  item.periodFrom,
                                  monthsT,
                                )} - ${
                                  item.periodTo
                                    ? monthYearToString(item.periodTo, monthsT)
                                    : modalsT('job_experience.current_job')
                                }`,
                              ]}
                              hasBorder={false}
                              last={experiences?.length === index + 1}
                            />
                          </div>
                        ))}
                      </SectionWrapper>
                    </Section>
                  )}

                  {/* EDUCATION */}
                  {education?.length > 0 && (
                    <Section>
                      <SectionTitle largeMobile>
                        {profileT('education')}
                      </SectionTitle>
                      <SectionWrapper>
                        {education.map((item, index) => (
                          <div key={item.id}>
                            <SummaryCard
                              title={item.degree}
                              lines={[
                                item.fieldOfStudy,
                                item.institution,
                                item.periodFrom === item.periodTo
                                  ? `${monthYearToString(
                                      item.periodFrom,
                                      monthsT,
                                    )}`
                                  : `${monthYearToString(
                                      item.periodFrom,
                                      monthsT,
                                    )} - ${
                                      item.periodTo
                                        ? monthYearToString(
                                            item.periodTo,
                                            monthsT,
                                          )
                                        : modalsT('education.current_education')
                                    }`,
                              ]}
                              hasBorder={false}
                              last={education?.length === index + 1}
                            />
                          </div>
                        ))}
                      </SectionWrapper>
                    </Section>
                  )}

                  {/* CERTIFICATES */}
                  {certificates?.length > 0 && (
                    <Section>
                      <SectionTitle largeMobile>
                        {profileT('certificates')}
                      </SectionTitle>
                      <SectionWrapper>
                        {certificates.map((item, index) => (
                          <div key={item.id}>
                            <SummaryCard
                              title={item.title}
                              lines={[
                                item.institution,
                                monthYearToString(item.date, monthsT),
                              ]}
                              hasBorder={false}
                              last={certificates?.length === index + 1}
                            />
                          </div>
                        ))}
                      </SectionWrapper>
                    </Section>
                  )}

                  {skills?.length > 0 && (
                    <Section>
                      <SectionTitle largeMobile>
                        {profileT('skills')}
                      </SectionTitle>
                      <SectionWrapper>
                        <UnorderedList list={skills} />
                      </SectionWrapper>
                    </Section>
                  )}
                </TabContent>

                <TabContent show={tab === PORTFOLIO}>
                  <Grid columns={postPerLine} gap="24px">
                    {portfolioList.map(item => (
                      <Cell
                        key={item.id}
                        onClick={() => {
                          Router.push(`/view/${slug}/library/${item.id}`);
                        }}
                      >
                        <PostCard
                          image={getThumbPortfolio(item)}
                          title={item.title}
                          desc={item.description}
                          created={item.createdAt}
                          tags={item.tags !== null ? item.tags : []}
                          type={item.type}
                          data={item}
                          noAnalytics
                        />
                      </Cell>
                    ))}
                  </Grid>
                  {portfolioNext && (
                    <ButtonLoadMoreWrapper>
                      <Button
                        label={profileT('load_more')}
                        loading={loadingPorfolio}
                        size="small"
                        colorSchema="secondary"
                        handleClick={getLoadMore}
                      />
                    </ButtonLoadMoreWrapper>
                  )}
                </TabContent>

                <TabContent show={tab === RESUME}>
                  <ResumeWrapper>
                    <iframe
                      width="100%"
                      height="100%"
                      title="Preview Resume"
                      src={resume}
                      frameBorder="0"
                    />
                  </ResumeWrapper>
                </TabContent>
              </ContentWrapper>
            </Cell>
          </Grid>
        </SafeArea>
      </Page>
    </>
  );
};

export default View;

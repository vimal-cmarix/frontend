import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';
import { useTranslation } from 'react-i18next';

import { sizes } from '@assets/styles/medias';
import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';

import Sidebar from '@components/templates/SideBar/View';
import Loader from '@components/atoms/Loader';
import Video from '@components/molecules/Video';
import UnorderedList from '@components/molecules/UnorderedList';
import SummaryCard from '@components/molecules/SummaryCard';
import PostCard from '@components/molecules/PostCard';

import { monthYearToString, useQueryTab } from '@src/utils/general';
import getThumbPortfolio from '@src/utils/portfolio';

import { ContentWrapper } from '@assets/styles/wrapper';
import { Tab, Tabs } from '@components/molecules/Tab/style';

import ResponsiveGrid from '@components/organisms/ResponsiveGrid';
import {
  LoaderWrapper,
  Section,
  SectionTitle,
  SectionWrapper,
  VideoWrapper,
  TabContent,
  ResumeWrapper,
  HiringName,
  PresentationTitle,
  PresentationDescription,
} from './style';

const HOME = 'HOME';
// const SUMMARY = 'SUMMARY';
const RESUME = 'RESUME';
const PORTFOLIO = 'LIBRARY';

const View = ({ presentation }) => {
  const router = useRouter();
  const { slug } = router.query;
  const isExternalAccess = slug !== undefined;

  const { t: profileT } = useTranslation('profile');
  const { t: modalsT } = useTranslation('modals');
  const { t: monthsT } = useTranslation('months');
  // const { t: dateFormatesT } = useTranslation('dateFormates');

  const { state: profileState } = useContext(ProfileContext);
  const { state: appState } = useContext(AppContext);

  const [tab, setTab] = useQueryTab(router.query.tab || 'HOME');

  const [loading, setLoading] = useState(false);
  const [loadingSidebar, setloadingSidebar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);

  // PRESENTATION DATA
  const [presentationTitle, setPresentationTitle] = useState(false);
  const [presentationDescription, setPresentationDescription] = useState(false);
  const [hiringName, setHiringName] = useState(false);
  const [portfolio, setPortfolio] = useState(false);

  // PROFILE DATA
  // const [summaryTitle, setSummaryTitle] = useState(false);
  // const [summaryDescription, setSummaryDescription] = useState(false);
  // const [summaryVideoUrl, setSummaryVideoUrl] = useState(false);
  // const [summaryContent, setSummaryContent] = useState(false);
  // const [summaryUpdated, setSummaryUpdated] = useState(false);
  // const [summaryCreated, setSummaryCreated] = useState(false);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [resume, setResume] = useState(false);

  // useEffect(() => {
  //   const { id, p } = router.query;
  //   const path = window.location.pathname;
  //   const pageUrl = `${path}${id ? `?id=${id}&` : '?'}tab=${tab}${p ? `&p=${p}` : ''}`;
  //   window.history.pushState('', '', pageUrl);
  // }, [tab]);

  if (process.browser) {
    window.onpopstate = () => {
      const params = () => {
        const { search } = window.location;
        return JSON.parse(
          `{"${decodeURI(search)
            .replace(/\?/g, '')
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')}"}`,
        );
      };
      const tabSel = params().tab;
      if (tabSel) setTab(tabSel);
    };
  }

  function handleDataPresentation() {
    setLoading(false);
    setPresentationTitle(presentation.cover && presentation.cover.title);
    setPresentationDescription(
      presentation.cover && presentation.cover.description,
    );
    setHiringName(presentation && presentation.hiringName);
    setPortfolio(presentation.portfolio);
  }

  // function fillContent(summary) {
  //   if (summary && summary.text) {
  //     const isValid = summary.text.blocks ? summary.text.blocks.filter(line => !!line.text) : [];
  //     if (isValid?.length) setSummaryContent(summary.text);
  //     else setSummaryContent('');
  //   }
  // }

  function handleData() {
    const data = profileState;
    // const { summary } = data;
    // const { asset, title, description, updatedAt, createdAt } = summary;

    // setSummaryTitle(title);
    // setSummaryDescription(description);
    // setSummaryVideoUrl(asset && asset.url);
    // setSummaryCreated(createdAt);
    // setSummaryUpdated(updatedAt);

    setSkills(data.skills);
    setEducation(data.education);
    setCertificates(data.certificates);
    setExperiences(data.experiences);
    setResume(data.resume && data.resume.path && data.resume.path.preview);

    // fillContent(summary);
  }

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => {
    if (profileState && profileState.id) handleData();
  }, [profileState]);

  useEffect(() => {
    if (presentation && presentation.id) handleDataPresentation();
  }, [presentation]);

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

  const sidebarW = getSidebarW();
  const contentW = getContentW();
  const sidebarGap = getSidebarGap();

  if (!loadingSidebar && loading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  return (
    <Grid columns={12} gap="24px">
      <Cell width={sidebarW} left={sidebarGap}>
        <Sidebar
          setLoading={setloadingSidebar}
          isExternalAccess={isExternalAccess}
        />
      </Cell>
      <Cell width={contentW}>
        <ContentWrapper>
          <Tabs>
            <Tab active={tab === HOME} onClick={() => setTab(HOME)}>
              {profileT('summary')}
            </Tab>
            {/* {summaryVideoUrl && summaryTitle && (
              <Tab active={tab === SUMMARY} onClick={() => setTab(SUMMARY)}>
                {profileT('summary')}
              </Tab>
            )} */}
            {portfolio?.length > 0 && (
              <Tab active={tab === PORTFOLIO} onClick={() => setTab(PORTFOLIO)}>
                {profileT('portfolio')}
              </Tab>
            )}
            {resume && (
              <Tab active={tab === RESUME} onClick={() => setTab(RESUME)}>
                {profileT('resume')}
              </Tab>
            )}
          </Tabs>
          <TabContent show={tab === HOME}>
            {/* SUMMARY */}
            {presentation && presentation.cover && (
              <Section>
                <SectionWrapper>
                  <>
                    {hiringName && (
                      <HiringName>{`Hello ${hiringName}, `}</HiringName>
                    )}
                    <PresentationTitle>{presentationTitle}</PresentationTitle>
                    <PresentationDescription>
                      {presentationDescription}
                    </PresentationDescription>
                    <VideoWrapper aspectRatio16x9>
                      <Video
                        data={presentation && presentation.cover.video}
                        thumb={
                          presentation &&
                          presentation.cover &&
                          presentation.cover.video &&
                          presentation.cover.video.thumbnail
                        }
                        className="video-box"
                      >
                        <source
                          src={
                            presentation &&
                            presentation.cover &&
                            presentation.cover.video &&
                            presentation.cover.video.url
                          }
                        />
                        <span>{profileT('video_support')}</span>
                      </Video>
                    </VideoWrapper>
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
                          `${monthYearToString(item.periodFrom, monthsT)} - ${
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
                <SectionTitle largeMobile>{profileT('education')}</SectionTitle>
                <SectionWrapper>
                  {education.map((item, index) => (
                    <div key={item.id}>
                      <SummaryCard
                        title={item.degree}
                        lines={[
                          item.fieldOfStudy,
                          item.institution,
                          item.periodFrom === item.periodTo
                            ? `${monthYearToString(item.periodFrom, monthsT)}`
                            : `${monthYearToString(
                                item.periodFrom,
                                monthsT,
                              )} - ${
                                item.periodTo
                                  ? monthYearToString(item.periodTo, monthsT)
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
                <SectionTitle largeMobile>{profileT('skills')}</SectionTitle>
                <SectionWrapper>
                  <UnorderedList list={skills} />
                </SectionWrapper>
              </Section>
            )}
          </TabContent>

          {/* <TabContent show={tab === SUMMARY}>
            <Section>
              <SectionWrapper>
                {presentation?.cover?.video?.id && (
                  <VideoWrapper>
                    <Video
                      data={presentation?.cover?.video}
                      thumb={presentation?.cover?.video?.thumbnail}
                    >
                      <source src={presentation?.cover?.video?.url} />
                      <span>{profileT('video_support')}</span>
                    </Video>
                  </VideoWrapper>
                )}
                <SummaryTitle>{summaryTitle}</SummaryTitle>
                <SummaryDescription>{summaryDescription}</SummaryDescription>
                <UpdateDate>
                  {`Created at ${formatDate(summaryCreated, monthsT, dateFormatesT('simple'))}`}
                  {summaryCreated !== summaryUpdated && (
                    <>
                      <br />
                      {`Updated at ${formatDate(summaryUpdated, monthsT, dateFormatesT('simple'))}`}
                    </>
                  )}
                </UpdateDate>

                {summaryContent && (
                  <NdEditor onChange={() => {}} content={summaryContent} readOnly />
                )}
              </SectionWrapper>
            </Section>
          </TabContent> */}

          {portfolio?.length > 0 && (
            <TabContent show={tab === PORTFOLIO}>
              <ResponsiveGrid options={{ postOffset: 1 }}>
                {portfolio.map(item => (
                  <Cell
                    key={item.id}
                    onClick={() => {
                      let url = `/presentation/library/${item.id}`;
                      if (isExternalAccess) {
                        url = `/view/${slug}/presentation/${presentation.id}/library/${item.id}`;
                      }
                      Router.push(url);
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
              </ResponsiveGrid>
            </TabContent>
          )}

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
  );
};

View.propTypes = {
  presentation: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default View;

/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import { IMAGECOMING } from '@modules/consts';
import { sizes } from '@assets/styles/medias';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import Storage from '@utils/storage';
import { withAuthSync } from '@src/utils/auth';

import Icon from '@components/atoms/Icon';

import EditableCertificates from '@components/templates/Editables/Certificates';
import EditableResume from '@components/templates/Editables/Resume';
import EditableEducation from '@components/templates/Editables/Education';
import EditableExperience from '@components/templates/Editables/Experience';
import Page from '@components/templates/Page';
import SideBar from '@components/templates/SideBar/Profile';

// MODALS
import ModalSkills from '@components/templates/Modals/Skills';
import ModalTour from '@components/templates/Modals/Tour';

import LinkBack from '@components/molecules/Link';
import UnorderedList from '@components/molecules/UnorderedList';

import {
  TextHelp,
  SectionTitle,
  Section,
  SectionWrapper,
  VideoWrapper,
  VideoTitle,
  AddButton,
  EditArea,
  EditIconWrapper,
  LinkContainer,
} from './style';

const Profile = ({ jwt }) => {
  const { t: profileT } = useTranslation('profile');

  const { state: appState, dispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const [bigLoading, setBigLoading] = useState(true);
  const [summaryData, setSummary] = useState({});
  const [skills, setSkills] = useState([]);
  const [tourIsInitialize, settourIsInitialize] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);
  const [navBottom, setNavBottom] = useState(true);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  // Tour
  const TourInialize = () => {
    if (tourIsInitialize) return;

    settourIsInitialize(true);
    const tourShow = Storage.get(`tourShow_${profileState.id}`) === 'true';

    if (tourShow) {
      Storage.add(`tourEnable`, 'true');
      dispatch({
        type: 'SET_MODAL_OPENED',
        component: ModalTour,
      });
    }
  };

  function handleData() {
    const data = profileState;
    const { summary } = data;
    const { description, video, title, asset, link } = summary;

    setSummary({
      title,
      description,
      video,
      asset,
      link,
    });
    setSkills(data.skills);

    TourInialize();

    setTimeout(() => {
      setBigLoading(false);
    }, 700);
  }

  useEffect(() => {
    if (profileState.id) handleData();
  }, [profileState]);

  const { isOpened } = appState.tour;

  useEffect(() => {
    return isOpened ? setNavBottom(false) : setNavBottom(true);
  }, [isOpened]);

  const editSummary = () => {
    Router.push('/profile/summary/edit');
  };

  function getSidebarW() {
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 12;
    return 4;
  }

  function getContentW() {
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 12;
    return 6;
  }

  function getSidebarLeft() {
    if (screenWidth <= parseInt(sizes.tablet, 10)) return 0;
    return 2;
  }

  const sidebarW = getSidebarW();
  const contentW = getContentW();
  const sidebarLeft = getSidebarLeft();

  const summaryThumbnail =
    (summaryData.link && summaryData.link.imageUrl) ||
    (summaryData.asset && summaryData.asset.thumbnail) ||
    IMAGECOMING;

  return (
    <Page
      title={profileT('title')}
      description={profileT('description')}
      nav={{ show: navBottom }}
      pageLoader={bigLoading}
      isVerified={jwt.isVerified}
    >
      {!bigLoading && (
        <SafeArea disableScroll={appState.modal.isOpened}>
          <Grid columns={12} gap="24px">
            <Cell width={sidebarW} left={sidebarLeft}>
              <SideBar />
            </Cell>
            <Cell width={contentW}>
              <ContentWrapper>
                <LinkContainer>
                  <LinkBack
                    label={profileT('link_back')}
                    handleClick={() => {
                      // Router.push('/home');
                      Router.push('/profile');
                    }}
                    size="medium"
                    arrow="left"
                  />
                </LinkContainer>
                <Section>
                  <SectionTitle largeMobile>{profileT('summary')}</SectionTitle>
                  <SectionWrapper>
                    {summaryData.asset || summaryData.title ? (
                      <>
                        <VideoWrapper>
                          <img src={summaryThumbnail} alt={summaryData.title} />
                        </VideoWrapper>
                        <VideoTitle>{summaryData.title}</VideoTitle>
                      </>
                    ) : (
                      <TextHelp>
                        It can be changed at any time, but it&apos;s sort of the
                        first window into who you are that people get to see.
                      </TextHelp>
                    )}
                  </SectionWrapper>
                  <EditArea className="summary-edit">
                    {summaryData.title || summaryData.video ? (
                      <EditIconWrapper onClick={editSummary}>
                        <Icon name="edit_outline" />
                      </EditIconWrapper>
                    ) : (
                      <AddButton onClick={editSummary}>
                        {profileT('add')}
                      </AddButton>
                    )}
                  </EditArea>
                </Section>

                <Section data-tut="reactour__job_experience">
                  <SectionTitle largeMobile>
                    {profileT('job_experience')}
                  </SectionTitle>
                  <SectionWrapper>
                    <EditableExperience />
                  </SectionWrapper>
                </Section>

                <Section data-tut="reactour__education">
                  <SectionTitle largeMobile>
                    {profileT('education')}
                  </SectionTitle>
                  <SectionWrapper>
                    <EditableEducation />
                  </SectionWrapper>
                </Section>

                <Section data-tut="reactour__certificates">
                  <SectionTitle largeMobile>
                    {profileT('certificates')}
                  </SectionTitle>
                  <SectionWrapper>
                    <EditableCertificates />
                  </SectionWrapper>
                </Section>

                <Section data-tut="reactour__skills">
                  <SectionTitle largeMobile>{profileT('skills')}</SectionTitle>
                  <SectionWrapper>
                    {skills?.length ? (
                      <UnorderedList list={skills} />
                    ) : (
                      <TextHelp>
                        Adding your skills is a list, this is a guide that lets
                        people know a bit about you to begin.
                      </TextHelp>
                    )}
                    <EditArea>
                      {skills?.length ? (
                        <EditIconWrapper
                          onClick={() => {
                            dispatch({
                              type: 'SET_MODAL_OPENED',
                              component: ModalSkills,
                              props: { skillsList: skills },
                            });
                          }}
                        >
                          <Icon name="edit_outline" />
                        </EditIconWrapper>
                      ) : (
                        <AddButton
                          onClick={() => {
                            dispatch({
                              type: 'SET_MODAL_OPENED',
                              component: ModalSkills,
                              props: { skillsList: skills },
                            });
                          }}
                        >
                          {profileT('add')}
                        </AddButton>
                      )}
                    </EditArea>
                  </SectionWrapper>
                </Section>

                <Section>
                  <SectionTitle largeMobile>{profileT('resume')}</SectionTitle>
                  <SectionWrapper>
                    <EditableResume />
                  </SectionWrapper>
                </Section>
              </ContentWrapper>
            </Cell>
          </Grid>
        </SafeArea>
      )}
    </Page>
  );
};

export default withAuthSync(Profile);

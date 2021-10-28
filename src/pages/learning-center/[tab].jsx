/* eslint-disable no-restricted-globals */
import React, { useContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Cell } from 'styled-css-grid';

import AppContext from '@context/appContext';
import AdminService from '@api/services/admin';

import { useToast } from '@components/molecules/Notification';
import Page from '@components/templates/Page';
import Loader from '@components/atoms/Loader';
import PostCard from '@components/molecules/PostCard';
import { withAuthSync } from '@src/utils/auth';
import { TUTORIALS, INSPIRATIONAL } from '@modules/consts';
import { sizes } from '@assets/styles/medias';
import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';

import {
  Section,
  SectionWrapper,
  GridWrapper,
  TabsWrapper,
  BannerWrapper,
  MessageWrapper,
  BannerTitle,
  BannerSubTitle,
  BannerDescription,
  BannerImage,
  StyledTab,
  StyledTabs,
} from '@src/pages/learning-center/style';
import { useLoading } from '@utils/general';
import MediaFrame from '@components/templates/Modals/MediaFrame';
import ResponsiveGrid from '@components/organisms/ResponsiveGrid';

const LearningCenter = ({ query, token, jwt }) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const { t: learningCenterT } = useTranslation('learning_center');

  const toast = useToast();
  const [tab, setTab] = useState(query.tab);

  const [screenWidth, setScreenWidth] = useState(null);
  const [loading, addLoading, rmLoading] = useLoading('learning-center');
  const [list, setList] = useState([]);

  useEffect(() => {
    const page = `Sizigi - Learning Center - ${tab}`;
    const url = `${process.env.BASE_PATH}/learning-center/${tab}`;
    if (typeof history.pushState !== 'undefined') {
      history.pushState({ page }, page, url);
    } else {
      window.location.assign(url);
    }
  }, [tab]);

  const isMobile = useMemo(
    () => appState.screenWidth <= parseInt(sizes.tablet, 10),
    [appState.screenWidth],
  );

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => setTab(query.tab), [query.tab]);

  function openModal(item) {
    if (isMobile) {
      window.open(item.value);
    } else {
      const { html } = item.meta;
      appDispatch({
        type: 'SET_MODAL_OPENED',
        component: MediaFrame,
        props: {
          html,
        },
      });
    }
  }

  const getVideos = async () => {
    try {
      addLoading(`content`);
      const content = `learning-center-${tab}`;
      const response = await AdminService.listContent(content);
      setList(response.data || []);
    } catch (e) {
      console.error(e);
      toast.add(e.message, 'error');
    } finally {
      rmLoading(`content`);
    }
  };

  useEffect(() => {
    getVideos();
  }, [tab]);

  return (
    <Page
      title={learningCenterT('title')}
      description={learningCenterT('description')}
      isVerified={jwt.isVerified}
      style={{ background: 'red' }}
    >
      <Section>
        <SectionWrapper>
          <BannerWrapper>
            <MessageWrapper>
              <BannerTitle>
                learn how to authenticate your skills to hiring teams
              </BannerTitle>
              <BannerSubTitle>
                Because let’s be real. They couldn’t care less about your{' '}
                <strong>ooo la la</strong> keywords.
              </BannerSubTitle>
              <BannerDescription>
                Well what are you waiting for? Check out these tutorial videos
                and get to proving yourself!
              </BannerDescription>
            </MessageWrapper>
            <BannerImage />
          </BannerWrapper>
        </SectionWrapper>
      </Section>

      <SafeArea style={{ background: '#F9FAFB' }}>
        <ContentWrapper>
          <Section>
            <TabsWrapper>
              <StyledTabs>
                <StyledTab
                  active={tab === TUTORIALS}
                  onClick={() => {
                    setTab(TUTORIALS);
                  }}
                >
                  {learningCenterT('tutorials')}
                </StyledTab>
                <StyledTab
                  active={tab === INSPIRATIONAL}
                  onClick={() => {
                    setTab(INSPIRATIONAL);
                  }}
                >
                  {learningCenterT('inspirational')}
                </StyledTab>
              </StyledTabs>
            </TabsWrapper>

            <GridWrapper>
              {!loading ? (
                <ResponsiveGrid>
                  {list.map(item => (
                    <Cell
                      key={item.url}
                      onClick={() => {
                        openModal(item);
                      }}
                    >
                      <PostCard
                        image={item.meta.thumbnail_url}
                        title={item.meta.title}
                        desc={item.meta.description}
                        tags={[]}
                        noFooter
                        type={item.meta.type}
                        data={item.meta}
                        thumbCover
                      />
                    </Cell>
                  ))}
                </ResponsiveGrid>
              ) : (
                <div
                  style={{
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100vh',
                  }}
                >
                  <Loader size="large" />
                </div>
              )}
            </GridWrapper>
          </Section>
        </ContentWrapper>
      </SafeArea>
    </Page>
  );
};

LearningCenter.propTypes = {
  query: PropTypes.objectOf(PropTypes.string),
  token: PropTypes.string,
};

LearningCenter.defaultProps = {
  query: {},
  token: '',
};

LearningCenter.getInitialProps = ({ query, res }) => {
  if (![TUTORIALS, INSPIRATIONAL].includes(query.tab)) {
    res.writeHead(301, {
      Location: `/learning-center/${TUTORIALS}`,
    });
    res.end();
  }
  return { query };
};

export default withAuthSync(LearningCenter, true);

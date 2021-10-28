import React, { useContext, useEffect, useState, useRef } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';

import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import Storage from '@utils/storage';

import DeleteDialog from '@components/molecules/DeleteDialog';
import { useToast } from '@components/molecules/Notification';
import errorHandle from '@src/utils/error';
import { Button } from '@components/molecules/Button';
import PopOver from '@components/molecules/PopOver';
import Page from '@components/templates/Page';
import Loader from '@components/atoms/Loader';
import PostCard from '@components/molecules/PostCard';
import { withAuthSync } from '@src/utils/auth';
import getThumbPortfolio from '@src/utils/portfolio';
import { PUBLISHED, UNPUBLISHED, YOUTUBE_REGEX } from '@modules/consts';
import { sizes } from '@assets/styles/medias';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';

import { Tab, Tabs } from '@components/molecules/Tab/style';

import Icon from '@components/atoms/Icon';
import {
  InsertBox,
  InsertBoxWrapper,
} from '@components/templates/Modals/style';
import { InsertTitle } from '@components/templates/Presentation/style';

import PortfolioLinkModal from '@components/templates/Modals/PortfolioLink';

import PortfolioService from '@api/services/portfolio';
import ShareService from '@api/services/share';

import {
  Center,
  SectionTitle,
  Section,
  SectionWrapper,
  ActionButton,
  MsgErro,
  ButtonLoadMoreWrapper,
  GridWrapper,
  TabsWrapper,
  PopOverWrapper,
} from '@src/pages/library/style';
import ResponsiveGrid from '@components/organisms/ResponsiveGrid';
import { useQueryTab } from '@utils/general';
import Btn from '@components/molecules/Btn';

const Portfolio = ({ query, token, jwt }) => {
  const { state: profileState } = useContext(ProfileContext);
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const { t: homeT } = useTranslation('home');
  const { t: portfolioT } = useTranslation('portfolio');
  const { t: postsT } = useTranslation('post');

  const [firstLoad, setFirstLoad] = useState(false);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  const [tab, setTab] = useQueryTab(query.tab || PUBLISHED);

  const [screenWidth, setScreenWidth] = useState(null);
  const limitPerPage = () => {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 10;
    if (screenWidth > parseInt(sizes.laptop, 10)) return 8;
    return 6;
  };
  const [loading, setLoading] = useState(0);

  const [actionVisibility, setActionVisibility] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [portfolioList, setPortfolioList] = useState([]);
  const [loadingPortfolioList, setLoadingPortfolioList] = useState(false);
  const [portfolioNext, setPortfolioNext] = useState(0);

  const [draftList, setDraftList] = useState([]);
  const [draftCount, setDraftCount] = useState(null);

  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const btnNewRef = useRef(null);

  const [privateData, setPrivateData] = useState(null);

  const popOverItems = [
    {
      label: portfolioT('options.blog'),
      href: '/library/post/create/blog',
      'data-tut': 'reactour__create_blog',
    },
    {
      label: portfolioT('options.link'),
      href: '/library/post/create/link',
      'data-tut': 'reactour__create_link',
    },
    {
      label: portfolioT('options.video'),
      href: '/library/post/create/video',
      'data-tut': 'reactour__video_button',
    },
    {
      label: portfolioT('options.doc'),
      href: '/library/post/create/document',
      'data-tut': 'reactour__create_doc',
    },
  ];

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function togglePopOver() {
    console.log('test');
    setPopOverVisibility(!popOverVisibility);
  }

  function openEditPage(type, id) {
    Router.push(
      `/library/post/edit/${type === 'media' ? 'video' : type}/${id}`,
    );
  }

  const [tourIsInitialize, settourIsInitialize] = useState(false);
  const TourInitialize = () => {
    if (tourIsInitialize) return;

    settourIsInitialize(true);

    const currentStep = Storage.get(`ePortfolioTourStep`);
    const enable =
      Storage.get(`ePortfolioTourShow_${profileState.id}`) === 'true';

    if (enable) {
      const next = parseInt(currentStep, 10);
      appDispatch({
        type: 'CHANGE_EPORTFOLIO_TOUR_STEP',
        currentStep: next,
      });
      appDispatch({ type: 'SHOW_EPORTFOLIO_TOUR' });
    }
  };

  const getPortfolioData = async (status, refresh) => {
    const { id } = profileState;
    if (status === PUBLISHED) {
      try {
        const response = await PortfolioService.getAll(id, {
          status,
          limit: limitPerPage(),
          skip: 0,
        });
        const { data } = response.data;
        const { links } = data;
        const list = refresh ? data.rows : portfolioList.concat(data.rows);
        setPortfolioList(list);
        setPortfolioNext(links.next);
        TourInitialize();
      } catch (e) {
        if (e.data.error === 'Forbidden') {
          // Router.push('/home');
          Router.push('/profile');
        } else {
          showToast(errorHandle(e));
        }
      } finally {
        setTimeout(() => {
          setLoading(loading + 1);
          setLoadingPortfolioList(false);
        }, 700);
      }
    } else {
      try {
        const response = await PortfolioService.getAll(id, {
          status,
          limit: 1000,
          skip: 0,
        });
        const { data } = response.data;
        setDraftList(data.rows);
        setDraftCount(data.rows?.length);
        TourInitialize();
      } catch (e) {
        if (e.data.error === 'Forbidden') {
          Router.push('/home');
        } else {
          showToast(errorHandle(e));
        }
      } finally {
        setTimeout(() => {
          setLoading(loading + 1);
          setLoadingPortfolioList(false);
        }, 700);
      }
    }
  };

  const getLoadMore = async () => {
    setLoadingPortfolioList(true);
    try {
      const response = await PortfolioService.getLibraryLink(
        portfolioNext,
        token,
      );
      const { data } = response.data;
      const { links } = data;

      setPortfolioList(portfolioList.concat(data.rows));
      setPortfolioNext(links.next);
    } catch (e) {
      showToast(errorHandle(e));
    } finally {
      setLoadingPortfolioList(false);
    }
  };

  async function getPrivateLink() {
    try {
      const privateResponse = await ShareService.createShare(profileState.id);
      const { data: privData } = privateResponse.data;
      setPrivateData(privData);
    } catch (e) {
      showToast(errorHandle(e));
    }
  }

  useEffect(() => {
    if (screenWidth === null) return;
    if (firstLoad === true) return;

    const { id } = profileState;
    setLoadingPortfolioList(true);

    if (id) {
      setFirstLoad(true);
      getPortfolioData(PUBLISHED);
      getPortfolioData(UNPUBLISHED);
      getPrivateLink();
      TourInitialize();
    }
  }, [profileState, screenWidth]);

  function reloadList(status) {
    const hasDrafts = draftList?.length - 1 > 0;

    if (!hasDrafts) {
      setTab(PUBLISHED);
    }

    setLoading(0);
    setLoadingPortfolioList(true);
    getPortfolioData(status, true);
  }

  async function publishDraft(id) {
    try {
      const response = await PortfolioService.publish(id);
      if (response.status === 200) {
        toast.add(postsT('success.publish.draft'), 'success');
        reloadList(UNPUBLISHED);
        reloadList(PUBLISHED);
      }
    } catch (e) {
      showToast(errorHandle(e));
    }
  }

  function showDeleteAction(id, type) {
    setSelectedPost({ id, type });
    setActionVisibility(true);
  }

  async function deleteSelectedPost() {
    if (!selectedPost) return;
    const { id, type } = selectedPost;
    setSelectedPost(null);
    try {
      const response = await PortfolioService.deletePost(id);
      setActionVisibility(false);
      if (response.status === 200) {
        toast.add(postsT('success.delete.published'), 'success');
        reloadList(type);
      }
    } catch (e) {
      setActionVisibility(false);
      showToast(errorHandle(e));
    }
  }

  function goToContentCreation(type) {
    Router.push(`/library/post/create/${type}`);
  }

  function onShareLink(data) {
    const newData = data;
    newData.description = data.description || data.defaultDescription;
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: PortfolioLinkModal,
      props: {
        data: newData,
        privateData: profileState.share || privateData,
        showClose: true,
      },
    });
  }

  return (
    <Page
      title={portfolioT('title')}
      description={portfolioT('description')}
      isVerified={jwt.isVerified}
    >
      <SafeArea>
        {actionVisibility && (
          <DeleteDialog
            type="warning"
            title="Oops?"
            description="Are you sure you want to delete this content?"
            warnDescription="Once you delete, it will be lost forever"
            onCancel={() => setActionVisibility(false)}
            onConfirm={() => deleteSelectedPost()}
            isLoading={false}
          />
        )}
        <ContentWrapper>
          <Section>
            <SectionWrapper>
              <SectionTitle>{portfolioT('title')}</SectionTitle>
              <ActionButton ref={btnNewRef} data-tut="reactour__add_content">
                <Btn
                  variant="solidPrimary"
                  label={portfolioT('btn_new')}
                  handleClick={togglePopOver}
                  full
                />
                <PopOverWrapper data-tut="reactour__button_wrapper">
                  <PopOver
                    isVisible={
                      popOverVisibility || appState.eportfolio_tour.isOpened
                    }
                    btnRef={btnNewRef}
                    onClickOutside={() => setPopOverVisibility(false)}
                    items={popOverItems}
                  />
                </PopOverWrapper>
              </ActionButton>
            </SectionWrapper>
            <TabsWrapper>
              <Tabs>
                <Tab
                  active={tab === PUBLISHED}
                  onClick={() => {
                    setTab(PUBLISHED);
                  }}
                >
                  {portfolioT('published')}
                </Tab>
                {draftCount > 0 && (
                  <Tab
                    active={tab === UNPUBLISHED}
                    onClick={() => {
                      setTab(UNPUBLISHED);
                    }}
                  >
                    {`${portfolioT('drafts')} (${draftCount})`}
                  </Tab>
                )}
              </Tabs>
            </TabsWrapper>

            {loading > 0 ? (
              <>
                {tab === PUBLISHED && (
                  <GridWrapper>
                    {portfolioList?.length > 0 ? (
                      <>
                        <ResponsiveGrid>
                          {portfolioList.map(item => (
                            <Cell
                              key={item.id}
                              onClick={() => {
                                Router.push(`/library/post/${item.id}`);
                              }}
                            >
                              <PostCard
                                image={getThumbPortfolio(item)}
                                title={item.title}
                                desc={
                                  item.description || item.defaultDescription
                                }
                                created={item.createdAt}
                                tags={item.tags !== null ? item.tags : []}
                                showOptions
                                onDelete={() =>
                                  showDeleteAction(item.id, PUBLISHED)
                                }
                                onEdit={() => openEditPage(item.type, item.id)}
                                onShare={() => onShareLink(item)}
                                type={item.type}
                                data={item}
                                thumbCover={
                                  item.type === 'link' &&
                                  YOUTUBE_REGEX.test(item.link.url)
                                }
                              />
                            </Cell>
                          ))}
                        </ResponsiveGrid>
                      </>
                    ) : (
                      <Center>
                        <MsgErro>{portfolioT('not_posts')}</MsgErro>
                        <InsertBoxWrapper noBackground newContentStyle>
                          <Grid columns={4} gap="24px">
                            <Cell
                              width={
                                screenWidth <= parseInt(sizes.tablet, 10)
                                  ? 4
                                  : 1
                              }
                              onClick={() => goToContentCreation('blog')}
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
                              onClick={() => goToContentCreation('link')}
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
                              onClick={() => goToContentCreation('video')}
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
                              onClick={() => 'document'}
                            >
                              <InsertBox>
                                <Icon name="document" />
                                <InsertTitle>
                                  {homeT('insert_box.document')}
                                </InsertTitle>
                              </InsertBox>
                            </Cell>
                          </Grid>
                        </InsertBoxWrapper>
                      </Center>
                    )}
                    {portfolioNext ? (
                      <ButtonLoadMoreWrapper>
                        <Button
                          label={portfolioT('load_more')}
                          loading={loadingPortfolioList}
                          size="small"
                          colorSchema="secondary"
                          handleClick={getLoadMore}
                        />
                      </ButtonLoadMoreWrapper>
                    ) : (
                      <div />
                    )}
                  </GridWrapper>
                )}

                {tab === UNPUBLISHED && (
                  <GridWrapper>
                    {draftList?.length > 0 ? (
                      <>
                        <ResponsiveGrid>
                          {draftList.map(item => (
                            <Cell
                              key={item.id}
                              onClick={() => {
                                Router.push(`/library/post/${item.id}`);
                              }}
                            >
                              <PostCard
                                image={getThumbPortfolio(item)}
                                title={item.title}
                                desc={item.description}
                                created={item.createdAt}
                                tags={item.tags !== null ? item.tags : []}
                                showOptions
                                onDelete={() =>
                                  showDeleteAction(item.id, UNPUBLISHED)
                                }
                                onEdit={() => openEditPage(item.type, item.id)}
                                isDraft
                                onPublish={() => publishDraft(item.id)}
                                type={item.type}
                                data={item}
                              />
                            </Cell>
                          ))}
                        </ResponsiveGrid>
                      </>
                    ) : (
                      <MsgErro>you don&apos;t have any drafts</MsgErro>
                    )}
                  </GridWrapper>
                )}
              </>
            ) : (
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Loader size="large" />
              </div>
            )}
          </Section>
        </ContentWrapper>
      </SafeArea>
    </Page>
  );
};

Portfolio.propTypes = {
  query: PropTypes.objectOf(PropTypes.string),
  token: PropTypes.string,
};

Portfolio.defaultProps = {
  query: {},
  token: '',
};

Portfolio.getInitialProps = ({ query }) => {
  return { query };
};

export default withAuthSync(Portfolio, true);

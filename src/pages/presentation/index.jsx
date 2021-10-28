/* eslint-disable react/jsx-curly-newline */
import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';
import { Form } from '@unform/web';

import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import PresentationService from '@api/services/presentation';
import SignService from '@api/services/sign';
import ShareService from '@api/services/share';
import PaymentContext from '@context/paymentContext';
import DeleteDialog from '@components/molecules/DeleteDialog';

import { useToast, Action } from '@components/molecules/Notification';
import errorHandle from '@src/utils/error';

import { Button } from '@components/molecules/Button';
import Page from '@components/templates/Page';
import Loader from '@components/atoms/Loader';
import PresentationCard from '@components/molecules/PresentationCard';
import CustomSelect from '@components/molecules/CustomSelect';
import Icon from '@components/atoms/Icon';
import PresentationLinkModal from '@components/templates/Modals/PresentationLink';
import OverPresentations from '@components/templates/Modals/OverPresentations';

import { withAuthSync } from '@src/utils/auth';
import { getCoverImage } from '@src/utils/presentation';

import {
  PUBLISHED,
  UNPUBLISHED,
  DRAFTS,
  AVAILABLE,
  PRESENTATION,
  PREMIUM,
  // PROFILE,
  // IMAGECOMING,
} from '@modules/consts';
import SuccessPaymentModal from '@components/templates/Modals/SuccessPayment';
// import PrivateLinkModal from '@components/templates/Modals/PrivateLink';
import { sizes } from '@assets/styles/medias';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';

import { Tab, Tabs } from '@components/molecules/Tab/style';

import { Center } from '@src/pages/library/style';
import ResponsiveGrid from '@components/organisms/ResponsiveGrid';
import { useQueryTab } from '@utils/general';
import Btn from '@components/molecules/Btn';
import {
  SectionTitle,
  Section,
  SectionWrapper,
  ActionButton,
  MsgErro,
  ButtonLoadMoreWrapper,
  GridWrapper,
  TabsWrapper,
  SelectBlock,
  FormWrapper,
  TitleAvailable,
  ContainerAvailable,
  IconWrapper,
} from './style';

const Presentation = ({ query, token, jwt }) => {
  const { state: profileState } = useContext(ProfileContext);
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: paymentState } = useContext(PaymentContext);

  const router = useRouter();

  const { t: presentationT } = useTranslation('presentation');
  const { t: buttonsT } = useTranslation('buttons');

  const toast = useToast();
  const formRef = useRef(null);
  const btnNewRef = useRef(null);
  const showToast = msg => toast.add(msg, 'error');

  const [tab, setTab] = useQueryTab(query.tab || 'published');

  const [screenWidth, setScreenWidth] = useState(null);
  const limitPerPage = () => {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 10;
    if (screenWidth > parseInt(sizes.laptop, 10)) return 8;
    return 6;
  };
  const [loading, setLoading] = useState(0);
  const [firstLoad, setFirstLoad] = useState(false);

  const [actionVisibility, setActionVisibility] = useState(false);
  const [editActionVisibility, setEditActionVisibility] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [presentationList, setPresentationList] = useState([]);
  const [privateData, setPrivateData] = useState(null);
  const [loadingPresentationList, setLoadingPresentationList] = useState(false);
  const [presentationNext, setPresentationNext] = useState(0);

  const [draftList, setDraftList] = useState([]);
  const [draftCount, setDraftCount] = useState(null);

  const [orderFilter, setOrderFilter] = useState({
    label: presentationT('order.newest'),
    value: 'newest',
  });

  const orderOptions = [
    {
      label: presentationT('order.newest'),
      value: 'newest',
    },
    {
      label: presentationT('order.oldest'),
      value: 'oldest',
    },
    {
      label: presentationT('order.most_viewed'),
      value: 'views',
    },
  ];

  function getOrderFilter() {
    const schema = {
      views: {
        sort: 'views',
        order: 'DESC',
      },
      oldest: {
        sort: 'createdAt',
        order: 'ASC',
      },
      newest: {
        sort: 'createdAt',
        order: 'DESC',
      },
    };
    return schema[orderFilter.value] || {};
  }

  function selectOrder(val) {
    return setOrderFilter(val);
  }

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function openEditPage(id) {
    Router.push(`/presentation/edit/step-1?id=${id}`);
  }

  // const showPrivateModal = () => {
  //   appDispatch({
  //     type: 'SET_MODAL_OPENED',
  //     component: PrivateLinkModal,
  //   });
  // };

  async function getPrivateLink() {
    try {
      const privateResponse = await ShareService.createShare(profileState.id);
      const { data: privData } = privateResponse.data;
      setPrivateData(privData);
    } catch (error) {
      showToast(errorHandle(error));
    }
  }

  const getPresentationData = async (status, refresh) => {
    const { id } = profileState;
    if (!id) return;

    try {
      if (status === PUBLISHED) {
        setLoadingPresentationList(true);
        const response = await PresentationService.getAll(id, {
          status,
          limit: limitPerPage(),
          skip: 0,
          ...getOrderFilter(),
        });
        const { data } = response.data;
        const { links } = data;
        const list = refresh ? data.rows : presentationList.concat(data.rows);
        setPresentationList(list);
        setPresentationNext(links.next);
        setLoadingPresentationList(false);

        if (profileState && profileState.id) getPrivateLink();
      } else {
        const response = await PresentationService.getAll(id, {
          status,
          limit: 1000,
          skip: 0,
          ...getOrderFilter(),
        });
        const { data } = response.data;
        setDraftList(data.rows);
        setDraftCount(data.rows?.length);
      }

      setLoading(loading + 1);
    } catch (e) {
      if (e.data.error === 'Forbidden') {
        Router.push('/profile');
        // Router.push('/home');
      } else {
        showToast(errorHandle(e));
      }
    }
  };

  const getLoadMore = async () => {
    try {
      setLoadingPresentationList(true);
      const response = await PresentationService.getPresentationLink(
        presentationNext,
        token,
      );
      const { data } = response.data;
      const { links } = data;
      setPresentationList(presentationList.concat(data.rows));
      setPresentationNext(links.next);
      setLoadingPresentationList(false);
    } catch (e) {
      showToast(errorHandle(e));
    }
  };

  function showPaymentSuccessAlert() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: SuccessPaymentModal,
    });
  }

  useEffect(() => {
    if (screenWidth === null) return;
    if (firstLoad === true) return;

    const { id } = profileState;
    setLoadingPresentationList(true);

    if (id) {
      setFirstLoad(true);
      getPresentationData(PUBLISHED);
      getPresentationData(UNPUBLISHED);
    }

    if (
      appState.paymentSuccessAlert.show &&
      appState.paymentSuccessAlert.type === PRESENTATION
    ) {
      showPaymentSuccessAlert();
    }
  }, [profileState, screenWidth]);

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

  function reloadList(status) {
    const hasDrafts = draftList?.length - 1 > 0;

    if (!hasDrafts) {
      setTab(PUBLISHED);
      Router.push('/presentation');
    }

    setLoading(0);
    setLoadingPresentationList(true);
    getPresentationData(status, true);
  }

  function showDeleteAction(id, type) {
    setSelectedPost({ id, type });
    setActionVisibility(true);
  }

  function showEditAction(id, type) {
    setSelectedPost({ id, type });
    setEditActionVisibility(true);
  }

  async function deleteSelectedPost() {
    if (!selectedPost) return;

    const { id, type } = selectedPost;
    setSelectedPost(null);

    try {
      const response = await PresentationService.deletePresentation(id);
      setActionVisibility(false);

      if (response.status === 200) {
        toast.add(presentationT('delete_action.success'), 'success');
        reloadList(type);
      }
    } catch (e) {
      setActionVisibility(false);
      showToast(errorHandle(e));
    }
  }

  function handleCreatePresentation() {
    Router.push(`/presentation/create/step-1`);
  }

  useEffect(() => {
    setLoading(0);
    setLoadingPresentationList(true);
    getPresentationData(PUBLISHED, true);
    getPresentationData(UNPUBLISHED, true);
  }, [orderFilter]);

  const gapPerLine = () => {
    if (screenWidth > parseInt(sizes.laptop, 10)) return '24px';
    return '40px';
  };

  // const getProfileCardImage = () => {
  //   if (profileState?.summary?.title && profileState?.summary?.asset?.thumbnail) {
  //     return profileState?.summary?.asset?.thumbnail;
  //   }
  //   return IMAGECOMING;
  // };

  const isMobile = useMemo(
    () => appState.screenWidth <= parseInt(sizes.tablet, 10),
    [appState.screenWidth],
  );

  return (
    <Page
      title={presentationT('title')}
      description={presentationT('description')}
      isVerified={jwt.isVerified}
    >
      <SafeArea>
        {actionVisibility && (
          <DeleteDialog
            type="warning"
            title="Oops?"
            description="Are you sure you want to delete this pitch?"
            warnDescription="Once you delete, it will be lost forever"
            onCancel={() => setActionVisibility(false)}
            onConfirm={() => deleteSelectedPost()}
            isLoading={false}
          />
        )}
        {editActionVisibility && (
          <Action
            type="warning"
            title={presentationT('edit_action.title')}
            description={presentationT('edit_action.description')}
            onCancel={() => setEditActionVisibility(false)}
            onConfirm={() => openEditPage(selectedPost.id)}
            labelConfirm={buttonsT('yes_i_am')}
          />
        )}
        <ContentWrapper>
          <Section>
            <SectionWrapper>
              <SectionTitle>{presentationT('title')}</SectionTitle>
              <FormWrapper>
                <SelectBlock>
                  <Form onSubmit={() => {}} ref={formRef}>
                    <CustomSelect
                      options={orderOptions}
                      name="order"
                      size="medium"
                      value={orderFilter}
                      onOptionSelected={selectOrder}
                    />
                  </Form>
                </SelectBlock>
                <ActionButton ref={btnNewRef}>
                  <Btn
                    label="Create pitch"
                    variant="solidPrimary"
                    handleClick={handleCreatePresentation}
                    full
                  />
                </ActionButton>
              </FormWrapper>
            </SectionWrapper>
            <TabsWrapper>
              <Tabs>
                <Tab
                  active={tab === PUBLISHED}
                  onClick={() => setTab(PUBLISHED)}
                >
                  {presentationT('tabs.saved')}
                </Tab>
                {draftCount > 0 && (
                  <Tab active={tab === DRAFTS} onClick={() => setTab(DRAFTS)}>
                    {`${presentationT('tabs.drafts')} (${draftCount})`}
                  </Tab>
                )}
              </Tabs>
            </TabsWrapper>

            {loading > 0 ? (
              <>
                {tab === PUBLISHED && presentationList?.length > 0 && (
                  <GridWrapper>
                    <ResponsiveGrid>
                      {presentationList.map(item => (
                        <Cell
                          key={item.id}
                          onClick={() => {
                            Router.push(`/presentation/view/${item.id}`);
                          }}
                        >
                          <PresentationCard
                            image={getCoverImage(item)}
                            title={item.title}
                            created={item.createdAt}
                            type={item.type}
                            recipient={item.hiringName}
                            views={item.views}
                            showOptions
                            onDelete={() =>
                              showDeleteAction(item.id, PUBLISHED)
                            }
                            onEdit={() => showEditAction(item.id, PUBLISHED)}
                            data={item}
                          />
                        </Cell>
                      ))}
                    </ResponsiveGrid>
                    {presentationNext && (
                      <ButtonLoadMoreWrapper>
                        <Button
                          label={presentationT('load_more')}
                          loading={loadingPresentationList}
                          size="small"
                          colorSchema="secondary"
                          handleClick={getLoadMore}
                        />
                      </ButtonLoadMoreWrapper>
                    )}
                  </GridWrapper>
                )}

                {tab === PUBLISHED && presentationList?.length === 0 && (
                  <Center>
                    <MsgErro>{presentationT('not_posts')}</MsgErro>
                    <GridWrapper>
                      <Grid columns="1" gap="0">
                        <Cell
                          onClick={() =>
                            router.push('/presentation/create/step-1')
                          }
                        >
                          <ContainerAvailable>
                            <IconWrapper>
                              <Icon name="add-circle_solid" />
                            </IconWrapper>
                            <TitleAvailable>
                              {presentationT('create_pitch')}
                            </TitleAvailable>
                          </ContainerAvailable>
                        </Cell>
                      </Grid>
                    </GridWrapper>
                  </Center>
                )}

                {tab === DRAFTS && (
                  <GridWrapper>
                    {draftList?.length > 0 ? (
                      <>
                        <ResponsiveGrid>
                          {draftList.map(item => (
                            <Cell
                              key={item.id}
                              onClick={() => {
                                Router.push(`/presentation/view/${item.id}`);
                              }}
                            >
                              <PresentationCard
                                image={getCoverImage(item)}
                                title={item.title}
                                created={item.createdAt}
                                type={item.type}
                                recipient={item.hiringName}
                                views={item.views}
                                showOptions
                                onDelete={() =>
                                  showDeleteAction(item.id, UNPUBLISHED)
                                }
                                onEdit={() => openEditPage(item.id)}
                                isDraft
                                data={item}
                              />
                            </Cell>
                          ))}
                        </ResponsiveGrid>
                      </>
                    ) : (
                      <MsgErro>{presentationT('not_draft')}</MsgErro>
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

Presentation.propTypes = {
  query: PropTypes.objectOf(PropTypes.string),
  token: PropTypes.string,
};

Presentation.defaultProps = {
  query: {},
  token: '',
};

Presentation.getInitialProps = ({ query }) => {
  return { query };
};

export default withAuthSync(Presentation, true);

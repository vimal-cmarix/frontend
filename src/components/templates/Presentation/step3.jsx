import React, { useState, useRef, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import PresentationService from '@api/services/presentation';
import PortfolioService from '@api/services/portfolio';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import Page from '@components/templates/Page';
import ModalPresentation from '@components/templates/Modals/Presentation';
import NewPostModal from '@components/templates/Modals/NewPost';
import LinkBack from '@components/molecules/Link';
import PopOver from '@components/molecules/PopOver';
import Steps from '@components/molecules/Steps';
import { useToast, Action } from '@components/molecules/Notification';
import { sizes } from '@assets/styles/medias';

import errorHandle from '@src/utils/error';
import getThumbPortfolio from '@src/utils/portfolio';
import { PUBLISHED } from '@src/modules/consts';
import Brand from '@components/atoms/Brand';
import Icon from '@components/atoms/Icon';
import PostCard from '@components/molecules/PostCard';
import { ReactSortable } from 'react-sortablejs';

import { SafeArea, ContentWrapper } from '@assets/styles/wrapper';
import Btn from '@components/molecules/Btn';
import {
  ButtonsWrapper,
  ButtonWrapper,
  NavButtonWrapper,
  ButtonWrapperWithSpace,
  ButtonWrapperWithSpaceLarge,
  StepTitle,
  PopOverWrapper,
  StepDescription,
  InsertBoxWrapper,
  InsertBox,
  InsertTitle,
  NavPresentation,
  Handle,
  HoverMessage,
  Hint,
} from './style';

const Step3 = ({ action, presentationId }) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);
  let submitType = 'NEXT';

  const router = useRouter();

  const [bigLoading, setBigLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [presentationData, setPresentationData] = useState(null);
  const [slicePortfolio, setSlicePortfolio] = useState([]);
  const [organizeStatus, setOrganizeStatus] = useState(false);
  const [errorPortfolio, setErrorPortfolio] = useState(false);

  const [portfolioList, setPortfolioList] = useState([]);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const { t: presentationT } = useTranslation('pitch_steps');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: errorT } = useTranslation('errorMessages');

  const [actionVisibility, setActionVisibility] = useState(false);
  const [actionPopOverVisibility, setActionPopOverVisibility] = useState(false);
  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const btnNewRef = useRef(null);
  const btnActionRef = useRef(null);

  async function verifyPortifolio() {
    const { id } = profileState;
    try {
      const response = await PortfolioService.getAll(id, {
        PUBLISHED,
        limit: 1000,
        skip: 0,
      });
      const filteredList = response.data.data.rows.filter(
        e => e.status !== 'unpublished',
      );
      setPortfolioList(filteredList);
    } catch (e) {
      showError(errorHandle(e));
      setPortfolioList([]);
    }
  }

  async function handleData() {
    try {
      const response = await PresentationService.getById(presentationId);
      const { data } = response.data;
      setPresentationData(data);
      if (data.portfolio?.length) {
        setSlicePortfolio(data.portfolio);
        appDispatch({
          type: 'SET_POSTS_FROM_LIBRARY',
          saved: data.portfolio,
        });
      }
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setTimeout(() => {
        setBigLoading(false);
      }, 700);
    }
  }

  async function handleNewContent(hasContent) {
    const { created: postId } = router.query;
    const existInContent = appState.presentation.saved.filter(
      e => e.id === postId,
    );

    if (existInContent?.length) return false;

    try {
      const response = await PortfolioService.getById(postId);
      const { data } = response.data;
      let newArr = [];

      if (!hasContent) {
        newArr.push(data);

        // setSlicePortfolio(newArr);
        return appDispatch({
          type: 'SET_POSTS_FROM_LIBRARY',
          saved: newArr,
        });
      }

      if (hasContent) {
        newArr = appState.presentation.saved;
        newArr.push(data);
      }

      // setSlicePortfolio(newArr);
      return appDispatch({
        type: 'SET_POSTS_FROM_LIBRARY',
        saved: newArr,
      });
    } catch (error) {
      return showError(errorHandle(error));
    }
  }

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => {
    if (profileState.id) {
      verifyPortifolio();
    }
  }, [profileState]);

  useEffect(() => {
    if (presentationId) handleData();
  }, [presentationId]);

  useEffect(() => {
    const { presentation } = profileState;
    if (presentation) {
      setSlicePortfolio(presentation);
      if (presentation?.length) {
        setErrorPortfolio(false);
      }
    }
  }, [portfolioList]);

  useEffect(() => {
    if (router.query.created) {
      handleNewContent(appState.presentation.saved?.length);
    }
  }, [router.query, appState.presentation.saved]);

  useEffect(() => {
    setSlicePortfolio(appState.presentation.saved);
  }, [appState.presentation.saved]);

  function togglePopOver() {
    setPopOverVisibility(!popOverVisibility);
  }

  function toggleActionPopOver() {
    setActionPopOverVisibility(!actionPopOverVisibility);
  }

  function goBack() {
    router.push(`/presentation/${action}/step-2?id=${presentationId}`);
  }

  async function edit() {
    try {
      setLoading(true);

      if (presentationId) {
        const response = await PresentationService.edit(presentationId, {
          portfolioIds: slicePortfolio.map(e => e.id),
          cover: {
            title: presentationData.cover.title || '',
            description: presentationData.cover.description || '',
            videoId:
              (presentationData.cover.video &&
                presentationData.cover.video.id) ||
              null,
          },
          type: presentationData.type,
          title: presentationData.title,
          description: presentationData.description,
          job: presentationData.job,
          hiringName: presentationData.hiringName,
        });

        if (response) {
          showSuccess(presentationT(`success.save`));
          setTimeout(() => {
            if (submitType === 'NEXT') {
              router.push(
                `/presentation/${action}/step-4?id=${response.data.data.id}`,
              );
            } else {
              router.push(`/presentation?tab=drafts`);
            }
          }, process.env.TIMEOUT_GONEXT);
        }
      }

      setLoading(false);
    } catch (e) {
      showError(errorHandle(e));
      setLoading(false);
    }
  }

  function handleSubmit(isDraft) {
    if (!slicePortfolio?.length && !isDraft) {
      return setErrorPortfolio(true);
    }
    return edit();
  }

  function draft() {
    submitType = 'DRAFT';
    return handleSubmit(true);
  }

  function save() {
    submitType = 'NEXT';
    return handleSubmit();
  }

  function insertFromLibraryModal() {
    if (!portfolioList?.length) return false;
    if (organizeStatus) setOrganizeStatus(false);
    return appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalPresentation,
      props: {
        title: presentationT(`step3.modal.titleLibrary`),
        fullScreen: true,
        ids: slicePortfolio,
      },
    });
  }

  function handleOrganize() {
    setOrganizeStatus(!organizeStatus);
  }

  function addNewPostModal() {
    return appDispatch({
      type: 'SET_MODAL_OPENED',
      component: NewPostModal,
      props: {
        title: presentationT(`step3.modal.titleAdd`),
        fullScreen: true,
        ids: slicePortfolio,
        data: presentationData,
      },
    });
  }

  const autoScrollEdge = 120;
  const autoScrollVelocity = 2;

  function onHandleDrag(event) {
    const position = event.pageY - window.scrollY;
    const topEdge = autoScrollEdge;
    const bottomEdge = window.innerHeight - autoScrollEdge;

    if (position > bottomEdge) {
      window.scrollTo(window.scrollX, window.scrollY + autoScrollVelocity);
    } else if (position < topEdge) {
      window.scrollTo(window.scrollX, window.scrollY - autoScrollVelocity);
    }
  }

  const [counter, setCounter] = useState(0);

  function handleCardDelete(ctx) {
    const index = slicePortfolio.findIndex(el => el.id === ctx.id);
    slicePortfolio.splice(index, 1);

    setSlicePortfolio(slicePortfolio);
    setCounter(counter + 1);
  }

  function handleCardMove(ctx, direction) {
    const index = slicePortfolio.findIndex(el => el.id === ctx.id);

    slicePortfolio.splice(
      direction === 'down' ? index + 1 : index - 1,
      0,
      slicePortfolio.splice(index, 1)[0],
    );

    setSlicePortfolio(slicePortfolio);
    setCounter(counter + 1);
  }

  const popOverItems = [
    {
      label:
        presentationData && presentationData.status === PUBLISHED
          ? buttonsT('save_continue')
          : buttonsT('next'),
      onClick: save,
    },
    { label: buttonsT('save_draft'), onClick: () => setActionVisibility(true) },
  ];

  const actionPopOverItems = [
    {
      label: presentationT('step3.portfolio_options.library'),
      onClick: insertFromLibraryModal,
    },
    {
      label: presentationT('step3.portfolio_options.create'),
      onClick: addNewPostModal,
    },
  ];

  const BtnsWrapper = (
    <ButtonsWrapper>
      {(presentationData && presentationData.status !== PUBLISHED) ||
      action === 'create' ? (
        <ButtonWrapperWithSpaceLarge>
          <Btn
            label={buttonsT('save_draft')}
            loading={loading}
            handleClick={() => setActionVisibility(true)}
            full
          />
        </ButtonWrapperWithSpaceLarge>
      ) : (
        ''
      )}
      <ButtonWrapperWithSpace>
        <Btn
          label={buttonsT('back')}
          variant={
            screenWidth >= parseInt(sizes.laptop, 10)
              ? 'outlineSecondary'
              : 'text'
          }
          handleClick={goBack}
          full
        />
      </ButtonWrapperWithSpace>
      {screenWidth <= parseInt(sizes.laptop, 10) && (
        <Link href="/home">
          <a href="/home">
            <Brand size="small" />
          </a>
        </Link>
      )}
      {screenWidth >= parseInt(sizes.laptop, 10) ? (
        <ButtonWrapper
          larger={presentationData && presentationData.status === PUBLISHED}
        >
          <Btn
            label={
              presentationData && presentationData.status === PUBLISHED
                ? buttonsT('save_continue')
                : buttonsT('next')
            }
            type="button"
            variant="solidPrimary"
            loading={loading}
            handleClick={save}
            full
          />
        </ButtonWrapper>
      ) : (
        <ButtonWrapper ref={btnNewRef}>
          <LinkBack
            label={buttonsT('options')}
            handleClick={togglePopOver}
            size="medium"
            arrow="right"
            arrowDirection="down"
          />
          <PopOverWrapper>
            <PopOver
              isVisible={popOverVisibility}
              btnRef={btnNewRef}
              onClickOutside={() => setPopOverVisibility(false)}
              items={popOverItems}
            />
          </PopOverWrapper>
        </ButtonWrapper>
      )}
    </ButtonsWrapper>
  );

  function getCellSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 6;
    if (screenWidth > parseInt(sizes.laptop, 10)) return 8;
    return 0;
  }

  function getGridSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 10;
    if (screenWidth > parseInt(sizes.laptop, 10)) return 12;
    return 1;
  }

  function getLeftSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 3;
    if (screenWidth > parseInt(sizes.laptop, 10)) return 3;
    return 0;
  }

  function getGapSize() {
    if (screenWidth > parseInt(sizes.laptop, 10)) return '24px';
    return '0';
  }

  const cellSize = getCellSize();
  const gridSize = getGridSize();
  const leftSize = getLeftSize();
  const gapSize = getGapSize();

  const cardsCellWidth = useMemo(() => {
    if (screenWidth >= parseInt(sizes.desktopmedium, 10)) return 4;
    if (screenWidth >= parseInt(sizes.laptop, 10)) return 6;
    if (screenWidth >= parseInt(sizes.tabletsmall, 10)) return 4;
    if (screenWidth >= parseInt(sizes.tabletPortrait, 10)) return 6;
    return 12;
  }, [screenWidth]);

  return (
    <Page
      title={presentationT(`step3.title`)}
      description={presentationT(`step3.description`)}
      className="blog-navbar"
      pageLoader={bigLoading}
      nav={{
        show: true,
        colorSchema: 'light',
        component: BtnsWrapper,
      }}
      isVerified
    >
      <SafeArea>
        {actionVisibility && (
          <Action
            type="warning"
            title={presentationT('draft_action.title')}
            description={presentationT('draft_action.description')}
            onCancel={() => setActionVisibility(false)}
            onConfirm={() => draft()}
            labelCancel={presentationT('draft_action.cancel')}
            labelConfirm={presentationT('draft_action.confirm')}
          />
        )}
        <Steps
          active="step-3"
          list={presentationT('steps.list', { returnObjects: true })}
        />
        <Grid columns={gridSize} gap={gapSize}>
          <Cell left={leftSize} width={cellSize}>
            <ContentWrapper className="blog-wrapper">
              <StepTitle>{presentationT(`step3.title`)}</StepTitle>
              <StepDescription>
                {presentationT(`step3.description`)}
              </StepDescription>
            </ContentWrapper>
            {slicePortfolio?.length ? (
              <>
                <NavPresentation>
                  <NavButtonWrapper ref={btnActionRef}>
                    <Btn
                      label={presentationT(`step3.nav.add`)}
                      variant="grey"
                      handleClick={toggleActionPopOver}
                      disabled={organizeStatus}
                    />
                    <PopOver
                      isVisible={actionPopOverVisibility}
                      btnRef={btnActionRef}
                      onClickOutside={() => setActionPopOverVisibility(false)}
                      items={actionPopOverItems}
                    />
                  </NavButtonWrapper>
                  <NavButtonWrapper>
                    <Btn
                      label={
                        organizeStatus
                          ? presentationT(`step3.nav.done`)
                          : presentationT(`step3.nav.organize`)
                      }
                      variant="grey"
                      handleClick={handleOrganize}
                    />
                  </NavButtonWrapper>
                </NavPresentation>
                <ReactSortable
                  disabled={organizeStatus}
                  handle=".handle"
                  chosenClass="ghost"
                  tag={Grid}
                  animation={150}
                  list={slicePortfolio}
                  setList={setSlicePortfolio}
                >
                  {slicePortfolio.map(item => (
                    <Cell
                      width={cardsCellWidth}
                      style={{ position: 'relative' }}
                      key={item.id}
                      onDrag={onHandleDrag}
                    >
                      {organizeStatus && (
                        <Handle className="handle">
                          <Icon name="draggable" />
                        </Handle>
                      )}
                      <PostCard
                        image={getThumbPortfolio(item)}
                        title={item.title}
                        desc={item.description}
                        created={item.createdAt}
                        tags={item.tags !== null ? item.tags : []}
                        type={item.type}
                        data={item}
                        showOptions={screenWidth < parseInt(sizes.tablet, 10)}
                        disableHover
                        isFull
                        popOverList={[
                          {
                            disabled:
                              slicePortfolio.findIndex(
                                e => e.id === item.id,
                              ) === 0,
                            label: presentationT(`step3.popOver.up`),
                            onClick: () => handleCardMove(item, 'up'),
                          },
                          {
                            disabled:
                              slicePortfolio.findIndex(
                                e => e.id === item.id,
                              ) ===
                              slicePortfolio?.length - 1,
                            label: presentationT(`step3.popOver.down`),
                            onClick: () => handleCardMove(item, 'down'),
                          },
                          {
                            label: presentationT(`step3.popOver.remove`),
                            onClick: () => handleCardDelete(item),
                          },
                        ]}
                      />
                    </Cell>
                  ))}
                </ReactSortable>
              </>
            ) : (
              <>
                <InsertBoxWrapper error={errorPortfolio}>
                  <Grid columns={2} gap="24px">
                    <Cell
                      width={screenWidth <= parseInt(sizes.tablet, 10) ? 3 : 1}
                      onClick={insertFromLibraryModal}
                    >
                      <InsertBox disabled={!portfolioList?.length}>
                        <HoverMessage>
                          {presentationT('step3.emptyWarn')}
                        </HoverMessage>
                        <Icon name="add-circle_solid" />
                        <InsertTitle>
                          {presentationT('step3.portfolio_options.library')}
                        </InsertTitle>
                      </InsertBox>
                    </Cell>
                    <Cell
                      width={screenWidth <= parseInt(sizes.tablet, 10) ? 3 : 1}
                      onClick={addNewPostModal}
                    >
                      <InsertBox>
                        <Icon name="add-circle_solid" />
                        <InsertTitle>
                          {presentationT('step3.portfolio_options.create')}
                        </InsertTitle>
                      </InsertBox>
                    </Cell>
                  </Grid>
                </InsertBoxWrapper>
                {errorPortfolio && (
                  <Hint>{errorT('configPortfolio.required')}</Hint>
                )}
              </>
            )}
          </Cell>
        </Grid>
      </SafeArea>
    </Page>
  );
};

Step3.propTypes = {
  action: PropTypes.string.isRequired,
  presentationId: PropTypes.string,
};

Step3.defaultProps = {
  presentationId: undefined,
};

export default Step3;

import React, { useState, useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Cell } from 'styled-css-grid';
import { Form } from '@unform/web';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import PostCard from '@components/molecules/PostCard';
import getThumbPortfolio from '@utils/portfolio';
import PortfolioService from '@api/services/portfolio';
import { PUBLISHED } from '@modules/consts';
import { sizes } from '@assets/styles/medias';
import Loader from '@components/atoms/Loader';
import CustomCheckbox from '@components/molecules/CustomCheckbox';
import { Button } from '@components/molecules/Button';
import Icon from '@components/atoms/Icon';

import ResponsiveGrid from '@components/organisms/ResponsiveGrid';
import Btn from '@components/molecules/Btn';
import {
  DefaultModalContent,
  Title,
  TitleCounter,
  Body,
  LoaderWrapper,
  CheckboxWrapper,
  ButtonWrapper,
  WrapperFullScreen,
  CopyButtonWrapper,
  TitleWrapper,
  CloseButton,
} from './style';

/**
 * Presentation Modal
 */
const Presentation = ({ title, fullScreen, ids }) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const [loading, setLoading] = useState(true);
  const [allMarked, setAllMarked] = useState(false);
  const [portfolioList, setPortfolioList] = useState([]);
  const [checkboxList, setCheckboxList] = useState({});
  const [checkedCounter, setCheckedCounter] = useState(0);

  const { t: presentationT } = useTranslation('pitch_steps');

  const formRef = useRef(null);

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => {
    setCheckedCounter(
      Object.keys(checkboxList).filter(e => checkboxList[e])?.length,
    );
  }, [checkboxList]);

  useEffect(() => {
    if (
      checkedCounter === Object.keys(checkboxList)?.length &&
      checkedCounter !== 0
    ) {
      return setAllMarked(true);
    }
    return setAllMarked(false);
  }, [checkedCounter]);

  const [update, setUpdate] = useState(0);

  function markOnlySavedPosts(currList = []) {
    const newCheckboxList = currList.map(e => {
      const isMarked = ids.filter(ev => ev.id === e.id)?.length;
      return { [e.id]: !!isMarked || false };
    });

    if (newCheckboxList?.length) {
      setCheckboxList(newCheckboxList && Object.assign(...newCheckboxList));
      setUpdate(() => update + 1);
    }
  }

  useEffect(() => {
    if (ids?.length) markOnlySavedPosts(portfolioList);
  }, [ids]);

  function closeModal(clickCancel) {
    if (clickCancel) markOnlySavedPosts(portfolioList);
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  async function getPortfolioData(status) {
    const { id } = profileState;
    setLoading(true);
    try {
      const response = await PortfolioService.getAll(id, {
        status,
        limit: 1000,
        skip: 0,
      });
      markOnlySavedPosts(response.data.data.rows);
      setPortfolioList(response.data.data.rows);
    } catch (e) {
      setPortfolioList([]);
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }

  function handleSelectAll(isAllMarked) {
    const newCheckboxList = isAllMarked
      ? Object.keys(checkboxList).map(e => ({ [e]: false }))
      : Object.keys(checkboxList).map(e => ({ [e]: true }));
    setCheckboxList(Object.assign(...newCheckboxList));
  }

  function handleCheckbox(tg, ctx) {
    setCheckboxList({ ...checkboxList, [ctx.id]: tg.checked });
  }

  function handleClickOutsideCheckbox(evt, ctx) {
    if (evt.target.closest('[class*="CheckboxWrapper"')) return false;
    const container = evt.target.closest('.post-element');
    const value = !container.querySelector('input').checked;

    return setCheckboxList({ ...checkboxList, [ctx.id]: value });
  }

  function handleSubmit(data) {
    const filteredIds = Object.keys(data).filter(e => data[e]);
    const arrOfPosts = filteredIds.map(
      e => portfolioList.filter(ev => e === ev.id)[0],
    );
    appDispatch({
      type: 'SET_POSTS_FROM_LIBRARY',
      saved: arrOfPosts,
    });
    closeModal();
  }

  function renderList() {
    return portfolioList.map(item => (
      <Cell
        width={1}
        key={item.id}
        style={{ position: 'relative', cursor: 'default' }}
        onClick={e => handleClickOutsideCheckbox(e, item)}
        className="post-element"
      >
        <CheckboxWrapper>
          <CustomCheckbox
            name={item.id}
            checked={checkboxList[item.id]}
            onChange={({ target }) => handleCheckbox(target, item)}
          />
        </CheckboxWrapper>
        <PostCard
          image={getThumbPortfolio(item)}
          title={item.title}
          desc={item.description}
          created={item.createdAt}
          tags={item.tags !== null ? item.tags : []}
          type={item.type}
          data={item}
        />
      </Cell>
    ));
  }

  useEffect(() => {
    if (profileState.id) {
      getPortfolioData(PUBLISHED);
    }
  }, []);

  const styleBody = {
    height: '75vh',
    padding: screenWidth >= parseInt(sizes.tablet, 10) ? '0 0 32px' : '0',
    boxSizing: 'border-box',
    // TODO: hide scollbar when postfolioList < 3 in desktop
    overflowY: 'auto',
  };

  return (
    <DefaultModalContent
      isOpened={appState.modal.isOpened}
      fullScreen={fullScreen}
    >
      <WrapperFullScreen>
        <CloseButton onClick={() => closeModal(true)} hideDesktop>
          <Icon name="close" />
        </CloseButton>
        <TitleWrapper>
          <Title smallMarginBottomMobile>{title}</Title>
          <TitleCounter>
            <span>&#x2022;</span>
            {` ${checkedCounter} selected`}
          </TitleCounter>
        </TitleWrapper>
        <Body style={styleBody} className="cardListBody">
          <Form onSubmit={handleSubmit} ref={formRef}>
            {loading ? (
              <LoaderWrapper>
                <Loader size="large" />
              </LoaderWrapper>
            ) : (
              <ResponsiveGrid>{renderList()}</ResponsiveGrid>
            )}
            <ButtonWrapper>
              <CopyButtonWrapper fullWidth>
                <Btn
                  label={
                    allMarked
                      ? presentationT(`step3.modal.buttons.unselect`)
                      : presentationT(`step3.modal.buttons.all`)
                  }
                  type="button"
                  handleClick={() => handleSelectAll(allMarked)}
                  full
                />
              </CopyButtonWrapper>
              <CopyButtonWrapper fullWidth hideMobile>
                <Btn
                  label={presentationT(`step3.modal.buttons.cancel`)}
                  type="button"
                  handleClick={closeModal}
                  variant="outlineSecondary"
                  full
                />
              </CopyButtonWrapper>
              <CopyButtonWrapper fullWidth>
                <Btn
                  label={presentationT(`step3.modal.buttons.add`)}
                  type="submit"
                  variant="solidPrimary"
                  full
                />
              </CopyButtonWrapper>
            </ButtonWrapper>
          </Form>
        </Body>
      </WrapperFullScreen>
    </DefaultModalContent>
  );
};

Presentation.propTypes = {
  title: PropTypes.string,
  fullScreen: PropTypes.bool,
  ids: PropTypes.oneOfType([PropTypes.array]),
};

Presentation.defaultProps = {
  title: '',
  fullScreen: false,
  ids: [],
};

export default Presentation;

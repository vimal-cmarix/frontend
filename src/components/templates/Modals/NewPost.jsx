import React, { useContext, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';
import { Form } from '@unform/web';

import AppContext from '@context/appContext';
// import ProfileContext from '@context/profileContext';
import PresentationService from '@api/services/presentation';
import { sizes } from '@assets/styles/medias';
import { Button } from '@components/molecules/Button';
import Icon from '@components/atoms/Icon';

import {
  DefaultModalContent,
  Title,
  Body,
  ButtonWrapper,
  WrapperFullScreen,
  CopyButtonWrapper,
  TitleWrapper,
  CloseButton,
  InsertBox,
  InsertTitle,
  InsertBoxWrapper,
} from './style';

/**
 * Add Content Modal
 */
const NewPost = ({ title, fullScreen, ids, data }) => {
  const { t: homeT } = useTranslation('home');
  const router = useRouter();
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  // const { state: profileState } = useContext(ProfileContext);

  const formRef = useRef(null);

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function handleSubmit() {
    closeModal();
  }

  async function getLink(type) {
    if (ids?.length) {
      await PresentationService.edit(data.id, {
        portfolioIds: ids.map(e => e.id),
        cover: {
          title: data.cover.title,
          description: data.cover.description,
          videoId: data.cover.video.id,
        },
        type: data.type,
        title: data.title,
        description: data.description,
        job: data.job,
        hiringName: data.hiringName,
      });
    }

    router.push(
      `/library/post/create/${type}?from=presentation&id=${router.query.id}`,
    );
    closeModal();
  }

  const styleBody = {
    height: '75vh',
    padding: '0 0 32px',
    boxSizing: 'border-box',
  };

  return (
    <DefaultModalContent
      isOpened={appState.modal.isOpened}
      fullScreen={fullScreen}
    >
      <WrapperFullScreen>
        <CloseButton onClick={closeModal} hideDesktop>
          <Icon name="close" />
        </CloseButton>
        <TitleWrapper>
          <Title smallMarginBottomMobile>{title}</Title>
        </TitleWrapper>
        <Body style={styleBody}>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <InsertBoxWrapper newContentStyle>
              <Grid columns={4} gap="24px">
                <Cell
                  width={screenWidth <= parseInt(sizes.tablet, 10) ? 4 : 1}
                  onClick={() => getLink('blog')}
                >
                  <InsertBox>
                    <Icon name="blog" />
                    <InsertTitle>{homeT('insert_box.blog')}</InsertTitle>
                  </InsertBox>
                </Cell>
                <Cell
                  width={screenWidth <= parseInt(sizes.tablet, 10) ? 4 : 1}
                  onClick={() => getLink('link')}
                >
                  <InsertBox>
                    <Icon name="external-link" />
                    <InsertTitle>
                      {homeT('insert_box.external-link')}
                    </InsertTitle>
                  </InsertBox>
                </Cell>
                <Cell
                  width={screenWidth <= parseInt(sizes.tablet, 10) ? 4 : 1}
                  onClick={() => getLink('video')}
                >
                  <InsertBox>
                    <Icon name="video" />
                    <InsertTitle>{homeT('insert_box.video')}</InsertTitle>
                  </InsertBox>
                </Cell>
                <Cell
                  width={screenWidth <= parseInt(sizes.tablet, 10) ? 4 : 1}
                  onClick={() => getLink('document')}
                >
                  <InsertBox>
                    <Icon name="document" />
                    <InsertTitle>{homeT('insert_box.document')}</InsertTitle>
                  </InsertBox>
                </Cell>
              </Grid>
            </InsertBoxWrapper>
            <ButtonWrapper hideMobile>
              <CopyButtonWrapper fullWidth hideMobile>
                <Button
                  label="Cancel"
                  type="button"
                  size="medium"
                  handleClick={closeModal}
                  colorSchema="secondary"
                />
              </CopyButtonWrapper>
            </ButtonWrapper>
          </Form>
        </Body>
      </WrapperFullScreen>
    </DefaultModalContent>
  );
};

NewPost.propTypes = {
  title: PropTypes.string,
  fullScreen: PropTypes.bool,
  ids: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

NewPost.defaultProps = {
  title: '',
  fullScreen: false,
  ids: [],
  data: [],
};

export default NewPost;

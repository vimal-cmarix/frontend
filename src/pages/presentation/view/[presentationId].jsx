import React, { useState, useRef, useEffect, useContext } from 'react';
import Router, { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';

import PresentationService from '@api/services/presentation';
import ShareService from '@api/services/share';
import DeleteDialog from '@components/molecules/DeleteDialog';
import Page from '@components/templates/Page';
import LinkBack from '@components/molecules/Link';
import PopOver from '@components/molecules/PopOver';
import View from '@components/templates/Presentation/view';
import { Button } from '@components/molecules/Button';
import { useToast, Action } from '@components/molecules/Notification';
import PresentationLinkModal from '@components/templates/Modals/PresentationLink';
import errorHandle from '@src/utils/error';
import { PUBLISHED } from '@modules/consts';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import { SafeArea } from '@assets/styles/wrapper';
import { serverRedirect } from '@utils/general';
import {
  ButtonsWrapper,
  ButtonWrapper,
  ButtonWrapperWithSpace,
  PopOverWrapper,
} from './style';

const Presentation = () => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const router = useRouter();
  const { presentationId } = router.query;

  const [loading, setLoading] = useState(true);
  const [presentationData, setPresentationData] = useState(null);
  const [actionVisibility, setActionVisibility] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [privateData, setPrivateData] = useState(null);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');

  const { t: buttonsT } = useTranslation('buttons');
  const { t: presentationT } = useTranslation('presentation');

  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const btnNewRef = useRef(null);

  async function getPrivateLink(id) {
    try {
      const response = await ShareService.createShare(id);
      const { data: privData } = response.data;
      setPrivateData(privData);
    } catch (error) {
      showError(errorHandle(error));
    }
  }

  async function handleData() {
    try {
      const response = await PresentationService.getById(presentationId);
      const { data } = response.data;
      setPresentationData(data);
      setLoading(false);
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }

  function togglePopOver() {
    setPopOverVisibility(!popOverVisibility);
  }

  function goBack() {
    Router.push('/presentation');
  }

  async function deleteSelectedPost() {
    if (!selectedPost) return;

    const { id } = selectedPost;
    setSelectedPost(null);

    try {
      const response = await PresentationService.deletePresentation(id);
      setActionVisibility(false);

      if (response.status === 200) {
        toast.add(presentationT('delete_action.success'), 'success');
        router.push('/presentation');
      }
    } catch (e) {
      setActionVisibility(false);
      showError(errorHandle(e));
    }
  }

  function showDeleteAction() {
    setSelectedPost({
      id: presentationData.id,
      type: PUBLISHED,
    });
    setActionVisibility(true);
  }

  // function onShareLink() {
  //   appDispatch({
  //     type: 'SET_MODAL_OPENED',
  //     component: PresentationLinkModal,
  //     props: {
  //       data: presentationData,
  //       privateData: profileState.share || privateData,
  //       showClose: true,
  //     },
  //   });
  // }

  function openEditPage() {
    router.push(`/presentation/edit/step-1?id=${presentationData.id}`);
  }

  const popOverItems = [
    { label: presentationT('card_options.edit'), onClick: openEditPage },
    { label: presentationT('card_options.delete'), onClick: showDeleteAction },
  ];

  // if (presentationData && presentationData.status === PUBLISHED) {
  //   popOverItems.push({
  //     label: presentationT('card_options.share'),
  //     onClick: onShareLink,
  //   });
  // }

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    const { id } = profileState;

    if (id) {
      getPrivateLink(id);
    }
  }, [profileState]);

  return (
    <Page
      title={
        presentationData &&
        presentationData.cover &&
        presentationData.cover.title
      }
      description={
        presentationData &&
        presentationData.cover &&
        presentationData.cover.description
      }
      pageLoader={loading}
      isVerified
    >
      <SafeArea>
        {actionVisibility && (
          <DeleteDialog
            type="warning"
            title="oops?"
            description="Are you sure you want to delete this pitch?"
            warnDescription="Once you delete, it will be lost forever"
            onCancel={() => setActionVisibility(false)}
            onConfirm={() => deleteSelectedPost()}
          />
        )}
        <ButtonsWrapper>
          <ButtonWrapperWithSpace>
            <LinkBack
              label={buttonsT('back')}
              size="medium"
              arrow="left"
              arrowDirection="left"
              handleClick={goBack}
            />
          </ButtonWrapperWithSpace>
          <ButtonWrapper ref={btnNewRef}>
            <Button
              label={buttonsT('options')}
              handleClick={togglePopOver}
              size="small"
              colorSchema="primary"
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
        </ButtonsWrapper>
        <View presentation={presentationData} />
      </SafeArea>
    </Page>
  );
};

Presentation.getInitialProps = async ctx => {
  const { query } = ctx;
  const { presentationId } = query;

  if (!presentationId) {
    if (typeof window === 'undefined') {
      serverRedirect(ctx, '/');
    } else {
      Router.push('/');
    }
  }

  return {
    presentationId,
  };
};

export default Presentation;

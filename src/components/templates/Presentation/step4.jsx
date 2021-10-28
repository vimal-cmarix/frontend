import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';

import PresentationService from '@api/services/presentation';
import ShareService from '@api/services/share';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import Page from '@components/templates/Page';
import LinkBack from '@components/molecules/Link';
import PopOver from '@components/molecules/PopOver';
import Steps from '@components/molecules/Steps';
import View from '@components/templates/Presentation/view';
import PresentationLinkModal from '@components/templates/Modals/PresentationLink';
import { useToast, Action } from '@components/molecules/Notification';
import { sizes } from '@assets/styles/medias';

import errorHandle from '@src/utils/error';
import Brand from '@components/atoms/Brand';
import Link from 'next/link';
import {
  IS_ADDING_PITCH_TO_JOBCARD,
  PUBLISHED,
  UNPUBLISHED,
} from '@modules/consts';

import Storage from '@utils/storage';

import BoardService from '@api/services/board';

import { SafeArea } from '@assets/styles/wrapper';
import Btn from '@components/molecules/Btn';
import {
  ButtonsWrapper,
  ButtonWrapper,
  ButtonWrapperWithSpace,
  ButtonWrapperWithSpaceLarge,
  PopOverWrapper,
  ButtonWrapperPublish,
  // ButtonWrapperLarge,
} from './style';

const Step4 = ({ action, presentationId }) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const [screenWidth, setScreenWidth] = useState(null);

  const [bigLoading, setBigLoading] = useState(true);
  const [presentationData, setPresentationData] = useState(null);
  const [privateData, setPrivateData] = useState(null);
  const [actionVisibility, setActionVisibility] = useState(false);
  const [actionDraftVisibility, setActionDraftVisibility] = useState(false);
  const [jobTrackerData, setJobTrackerData] = useState({});

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');

  const router = useRouter();

  const { t: presentationT } = useTranslation('pitch_steps');
  const { t: buttonsT } = useTranslation('buttons');

  const [popOverMobileVisibility, setPopOverMobileVisibility] = useState(false);
  const btnPopOverMobile = useRef(null);

  // const [popOverPublishVisibility, setPopOverPublishVisibility] = useState(false);
  const btnPublishRef = useRef(null);

  useEffect(() => {
    const storagedJobTrackerData = Storage.get(IS_ADDING_PITCH_TO_JOBCARD);

    if (storagedJobTrackerData) {
      setJobTrackerData(JSON.parse(storagedJobTrackerData));
    }
  }, []);

  function togglePopOverMobile() {
    setPopOverMobileVisibility(!popOverMobileVisibility);
  }

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
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setTimeout(() => {
        setBigLoading(false);
      }, 700);
    }
  }

  function goBack() {
    router.push(`/presentation/${action}/step-3?id=${presentationId}`);
  }

  async function setPitchInTheJobCard(pitchId, jobCardId) {
    try {
      await BoardService.updateApplication(jobCardId, {
        presentationId: pitchId,
      });
    } catch (err) {
      showError(errorHandle(err));
    }
  }

  async function publish(cbSuccess) {
    try {
      const response = await PresentationService.publish(presentationId);
      const { data } = response.data;

      if (cbSuccess) {
        cbSuccess(data);
      }

      if (Object.keys(jobTrackerData).length) {
        const { boardId, jobCardId } = jobTrackerData;

        console.log(boardId, jobCardId);

        await setPitchInTheJobCard(presentationId, jobCardId);

        router.push(`/job-tracker/${boardId}?jobcard=${jobCardId}`);

        return;
      }

      Router.push('/presentation');
    } catch (e) {
      showError(errorHandle(e));
    } finally {
      setTimeout(() => {
        setBigLoading(false);
      }, 700);
    }
  }

  function publishOnly() {
    Router.push('/presentation');
  }

  // async function alertPublish() {
  //   await publish(() => setActionVisibility(true));
  // }

  // function openPresentationLinkModal(data) {
  //   return appDispatch({
  //     type: 'SET_MODAL_OPENED',
  //     component: PresentationLinkModal,
  //     props: {
  //       data: data || presentationData,
  //       privateData: profileState.share || privateData,
  //       goPresentation: true,
  //     },
  //   });
  // }

  async function publishShare() {
    await publish();
  }

  const popOverPublishItems = [
    { label: buttonsT('publish'), onClick: publishShare },
    // { label: buttonsT('publish_only'), onClick: alertPublish },
  ];

  const popOverPublisedhItems = [
    {
      label: buttonsT('finish_editing'),
      onClick: () => publishShare(),
    },
    {
      label: buttonsT('back'),
      onClick: () => goBack(),
    },
  ];

  if (action === 'create' && !(screenWidth >= parseInt(sizes.laptop, 10))) {
    popOverPublishItems.push({
      label: buttonsT('save_draft'),
      onClick: () => {
        setActionDraftVisibility(true);
      },
    });
  }

  const BtnsWrapper = (
    <ButtonsWrapper>
      {(presentationData && presentationData.status !== PUBLISHED) ||
      action === 'create' ? (
        <ButtonWrapperWithSpaceLarge>
          <Btn
            label={buttonsT('save_draft')}
            handleClick={() => setActionDraftVisibility(true)}
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
        <ButtonWrapperPublish ref={btnPublishRef}>
          <Btn
            label={
              presentationData && presentationData.status === UNPUBLISHED
                ? buttonsT('publish')
                : buttonsT('finish_editing')
            }
            variant="solidPrimary"
            handleClick={() => publishShare()}
            full
          />
          {/* <PopOverWrapper>
            <PopOver
              isVisible={popOverPublishVisibility}
              btnRef={btnPublishRef}
              onClickOutside={() => setPopOverPublishVisibility(false)}
              items={
                presentationData && presentationData.status === UNPUBLISHED
                  ? popOverPublishItems
                  : popOverPublisedhItems
              }
            />
          </PopOverWrapper> */}
        </ButtonWrapperPublish>
      ) : (
        <ButtonWrapper ref={btnPopOverMobile}>
          <LinkBack
            label={buttonsT('options')}
            handleClick={() => togglePopOverMobile()}
            size="medium"
            arrow="right"
            arrowDirection="down"
          />
          <PopOverWrapper>
            <PopOver
              isVisible={popOverMobileVisibility}
              btnRef={btnPopOverMobile}
              onClickOutside={() => setPopOverMobileVisibility(false)}
              items={
                presentationData && presentationData.status === UNPUBLISHED
                  ? popOverPublishItems
                  : popOverPublisedhItems
              }
            />
          </PopOverWrapper>
        </ButtonWrapper>
      )}
    </ButtonsWrapper>
  );

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  useEffect(() => {
    if (presentationId) handleData();
  }, [presentationId]);

  useEffect(() => {
    const { id } = profileState;

    if (id) {
      getPrivateLink(id);
    }
  }, [profileState]);

  return (
    <Page
      title={presentationT(`step4.title`)}
      description={presentationT(`step4.description`)}
      className="blog-navbar"
      pageLoader={bigLoading}
      nav={{
        show: true,
        colorSchema: 'light',
        component: BtnsWrapper,
      }}
      isVerified
    >
      {actionVisibility && (
        <Action
          type="success"
          title={presentationT(`publish_action.${action}.title`)}
          description={presentationT(`publish_action.${action}.description`)}
          onCancel={() => setActionVisibility(false)}
          onConfirm={() => publishOnly()}
          labelConfirm={action === 'create' && buttonsT('go_presentation')}
          hideCancel
        />
      )}
      {actionDraftVisibility && (
        <Action
          type="warning"
          title={presentationT(`draft_action.title`)}
          description={presentationT(`draft_action.description`)}
          onCancel={() => setActionDraftVisibility(false)}
          onConfirm={() => router.push('/presentation')}
          labelCancel={presentationT('draft_action.cancel')}
          labelConfirm={presentationT('draft_action.confirm')}
        />
      )}
      <SafeArea>
        <Steps
          active="step-4"
          list={presentationT('steps.list', { returnObjects: true })}
        />
        <View presentation={presentationData} />
      </SafeArea>
    </Page>
  );
};

Step4.propTypes = {
  action: PropTypes.string.isRequired,
  presentationId: PropTypes.string,
};

Step4.defaultProps = {
  presentationId: undefined,
};

export default Step4;

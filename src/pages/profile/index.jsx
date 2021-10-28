/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentWrapper } from '@assets/styles/wrapper';
import ProfileTab from '@components/molecules/ProfileTab';
import ProfileContent from '@components/organisms/ProfileContent';
import ProfileCultureFit from '@components/organisms/ProfileCultureFit';
import ProfileExtraData from '@components/organisms/ProfileExtraData';
import ProfileHeader from '@components/organisms/ProfileHeader';
import ProfileOverview from '@components/organisms/ProfileOverview';
import ProfileResume from '@components/organisms/ProfileResume';
import ProfileTabs from '@components/organisms/ProfileTabs';
import MenuMobile from '@components/molecules/MenuMobile';
import ModalTour from '@components/templates/Modals/Tour';
import Page from '@components/templates/Page';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import { withAuthSync } from '@src/utils/auth';
import Storage from '@utils/storage';
import { useRouter } from 'next/router';
import ShareService from '@api/services/share';
import { useToast } from '@components/molecules/Notification';
import errorHandle from '@utils/error';
import { useQueryTab } from '@utils/general';
import CultureFitService from '@api/services/cultureFit';
import ScrollDownProfile from '@components/organisms/ScrollDownProfile';

const Profile = ({ jwt, previewMode = false }) => {
  const { t: profileT } = useTranslation('profile');

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  const { state: appState, dispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const { id, resume, contents, cultureFit } = profileState;

  const { isOpened } = appState.tour;

  const router = useRouter();

  const [bigLoading, setBigLoading] = useState(true);
  const [tourIsInitialize, settourIsInitialize] = useState(false);
  const [navBottom, setNavBottom] = useState(true);

  const tabs = [
    {
      label: 'Overview',
      component: <ProfileOverview />,
    },
    {
      label: 'Culture Fit',
      component: <ProfileCultureFit />,
      hide:
        previewMode &&
        !cultureFit?.socialCauses?.length &&
        !cultureFit?.nonProfit?.length &&
        !cultureFit?.volunteerExperience?.length &&
        !cultureFit?.profissionalBuckets?.length &&
        !Object.values(cultureFit?.whatInspire || {}).find(
          item => item?.length > 0,
        ),
    },
    {
      label: 'Content',
      component: <ProfileContent />,
      hide: previewMode && !contents?.length,
    },
    {
      label: 'Resume',
      component: <ProfileResume />,
      hide: previewMode && !resume,
    },
  ];

  const [tabSlug, setTabSlug] = useQueryTab(router.query.tab || tabs[0].label);
  const activeTab = tabs.find(tab => tab.label === tabSlug);

  useEffect(() => {
    if (isOpened) {
      setTabSlug(tabs[0].label);
    }
  }, [isOpened]);

  // Tour
  const TourInialize = () => {
    if (tourIsInitialize) return;

    settourIsInitialize(true);
    const tourShow = Storage.get(`tourShow_${id}`) === 'true';

    if (tourShow) {
      Storage.add(`tourEnable`, 'true');
      dispatch({
        type: 'SET_MODAL_OPENED',
        component: ModalTour,
      });
    }
  };

  const getSharedProfile = async () => {
    try {
      const res = await ShareService.getShare(router.query.slug, null);
      const { data } = res.data;

      const cultureFitResp = await CultureFitService.getCultureFit(
        data.content.id,
      );
      const { data: cultureFitData } = cultureFitResp.data;

      profileDispatch({
        type: 'SET_PROFILE_DATA',
        data: {
          ...data.content,
          accessToken: data.accessToken,
          cultureFit: cultureFitData,
        },
      });
      setBigLoading(false);
    } catch (e) {
      showToast(errorHandle(e));
      setBigLoading(false);
    }
  };

  function handleData() {
    TourInialize();

    setTimeout(() => {
      setBigLoading(false);
    }, 700);
  }

  useEffect(() => {
    if (id) handleData();
  }, [profileState]);

  useEffect(() => {
    if (previewMode) {
      getSharedProfile();
    }

    profileDispatch({
      type: 'SET_PREVIEW_MODE',
      previewMode,
    });
  }, [previewMode]);

  useEffect(() => {
    return isOpened ? setNavBottom(false) : setNavBottom(true);
  }, [isOpened]);

  return (
    <Page
      title={profileT('title')}
      description={profileT('description')}
      topbar={{
        show: previewMode,
        component: <MenuMobile />,
        colorSchema: 'light',
      }}
      nav={{
        show: navBottom,
        component: previewMode ? <ScrollDownProfile /> : undefined,
      }}
      isViewerMode
      pageLoader={bigLoading}
      isVerified={previewMode || jwt.isVerified}
      isPrivateView={previewMode}
      loadProfile={!previewMode}
      includePageHead={!previewMode}
    >
      <>
        {!bigLoading && profileState && (
          <ContentWrapper isVanity>
            <div data-tut="reactour__summary">
              <ProfileHeader />

              <ProfileTabs>
                {tabs
                  .filter(tab => !tab.hide)
                  .map(tab => (
                    <ProfileTab
                      key={tab.label}
                      text={tab.label}
                      isActive={tab.label === tabSlug}
                      onClick={() => setTabSlug(tab.label)}
                    />
                  ))}
              </ProfileTabs>

              {activeTab?.component}
            </div>

            {/* Next release, this will be replaced by a timeline */}
            {activeTab.label === 'Overview' && <ProfileExtraData />}
          </ContentWrapper>
        )}
      </>
    </Page>
  );
};

export default withAuthSync(Profile);

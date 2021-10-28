import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import CultureFitService from '@api/services/cultureFit';

import { Typography, TypographyPre } from '@assets/styles/typo';
import IconSVG from '@components/atoms/IconSVG';
import TitleAction from '@components/molecules/TitleAction';
import Tag from '@components/atoms/Tag';
import SocialCauses from '@components/templates/Modals/SocialCauses';
import NonProfits from '@components/templates/Modals/NonProfits';
import VolunteerExperience from '@components/templates/Modals/VolunteerExperience';
import WhatInspiresMe from '@components/templates/Modals/WhatInspiresMe';
import ProfessionalBucketList from '@components/templates/Modals/ProfessionalBucketList';
import Btn from '@components/molecules/Btn';
import ExternalLink from '@components/atoms/ExternalLink';
import { formatZonedTimeToUtc } from '@utils/general';

import Loader from '@components/atoms/Loader';
import {
  LoaderContainer,
  Container,
  Header,
  TagsWrapper,
  TagItem,
  SectionContentWrapper,
  NonProfitOrgsWrapper,
  ListContentItem,
  AddMoreButtonWrapper,
  SectionContainer,
  InspiresMeItemWrapper,
  InspiresMeHeader,
  InspiresMeItemList,
} from './style';

function ProfileCultureFit() {
  const { t: profileT } = useTranslation('profile');

  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const { id, previewMode } = profileState;

  const [cultureFitData, setCultureFitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [whatInspiresKeys, setWhatInspiresKeys] = useState([]);

  useEffect(() => {
    if (!id) return;
    const init = async () => {
      setLoading(true);
      const response = await CultureFitService.getCultureFit(id);

      setCultureFitData(response.data?.data);
      setWhatInspiresKeys(Object.keys(response.data?.data?.whatInspire || {}));
      setLoading(false);
    };

    init();
  }, [profileState]);

  const parseHeaderTitle = text => {
    if (text === 'tiktok') return 'TikTok';

    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleOpenNonProfitsModal = () => {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: NonProfits,
      props: {
        nonProfitsList: cultureFitData?.nonProfit || [],
        cultureFitId: cultureFitData?.id,
      },
    });
  };

  const handleOpenVolunteerExperienceModal = index => {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: VolunteerExperience,
      props: {
        volunteerExperienceData: cultureFitData?.volunteerExperience || [],
        cultureFitId: cultureFitData?.id,
        selectedItemIndex: index,
      },
    });
  };

  const handleOpenSocialCausesModal = () => {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: SocialCauses,
      props: {
        socialCausesList: cultureFitData?.socialCauses,
        cultureFitId: cultureFitData?.id,
      },
    });
  };

  const handleOpenBucketList = index => {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ProfessionalBucketList,
      props: {
        bucketListData: cultureFitData?.profissionalBuckets || [],
        cultureFitId: cultureFitData?.id,
        selectedItemIndex: index,
      },
    });
  };

  const handleOpenWhatInspiresMe = () => {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: WhatInspiresMe,
      props: {
        cultureFitId: cultureFitData?.id,
        list: cultureFitData.whatInspire,
      },
    });
  };

  const parseVolunteerDate = date => {
    const dateWithoutTZ = formatZonedTimeToUtc(date);

    return format(new Date(dateWithoutTZ), 'MMM yyyy');
  };

  const hideStandFor =
    previewMode &&
    !cultureFitData?.socialCauses?.length &&
    !cultureFitData?.nonProfit?.length &&
    !cultureFitData?.volunteerExperience?.length;

  return (
    <Container data-tut="reactour__culture_fit">
      {loading ? (
        <LoaderContainer>
          <Loader size="large" />
        </LoaderContainer>
      ) : (
        <>
          {!hideStandFor && (
            <SectionContainer>
              <Header>
                <IconSVG name="love" size={20} color="#313134" />
                <Typography
                  size="headline1"
                  color="grey31"
                  style={{ marginLeft: 10 }}
                  fontWeight={600}
                >
                  {profileT('cultureFit.what_i_stand_for')}
                </Typography>
              </Header>

              {!previewMode || cultureFitData?.socialCauses?.length ? (
                <SectionContentWrapper>
                  <TitleAction
                    iconName="edit"
                    onClick={handleOpenSocialCausesModal}
                    iconSize={10}
                    hideActionButton={
                      previewMode || cultureFitData?.socialCauses?.length === 0
                    }
                  >
                    <Typography size="base" color="Grey61" fontWeight={600}>
                      {profileT('cultureFit.social_causes')}
                    </Typography>
                  </TitleAction>
                  <TagsWrapper>
                    {!previewMode &&
                    cultureFitData?.socialCauses?.length === 0 ? (
                      <Btn
                        label="Add"
                        size="md"
                        handleClick={handleOpenSocialCausesModal}
                        variant="textPrimary"
                        startIcon="plusRounded"
                        iconSize={15}
                      />
                    ) : (
                      cultureFitData?.socialCauses?.map(eachCause => (
                        <TagItem key={eachCause}>
                          <Tag type="solid" label={eachCause} />
                        </TagItem>
                      ))
                    )}
                  </TagsWrapper>
                </SectionContentWrapper>
              ) : null}

              {!previewMode || cultureFitData?.nonProfit?.length ? (
                <SectionContentWrapper>
                  <TitleAction
                    iconName="edit"
                    onClick={handleOpenNonProfitsModal}
                    iconSize={10}
                    hideActionButton={
                      previewMode || cultureFitData?.nonProfit?.length === 0
                    }
                  >
                    <Typography size="base" color="Grey61" fontWeight={600}>
                      {profileT('cultureFit.non_profits')}
                    </Typography>
                  </TitleAction>

                  <NonProfitOrgsWrapper>
                    {!previewMode && cultureFitData?.nonProfit?.length === 0 ? (
                      <div>
                        <Btn
                          label="Add"
                          size="md"
                          handleClick={handleOpenNonProfitsModal}
                          variant="textPrimary"
                          startIcon="plusRounded"
                          iconSize={15}
                        />
                      </div>
                    ) : (
                      cultureFitData?.nonProfit.map(eachNonProfit => (
                        <ExternalLink url={eachNonProfit?.url}>
                          <Typography
                            key={eachNonProfit}
                            size="base"
                            color="grey31"
                            fontWeight={900}
                            style={{ marginBottom: 6 }}
                          >
                            {eachNonProfit?.name}
                          </Typography>
                        </ExternalLink>
                      ))
                    )}
                  </NonProfitOrgsWrapper>
                </SectionContentWrapper>
              ) : null}

              {!previewMode || cultureFitData?.volunteerExperience?.length ? (
                <SectionContentWrapper>
                  <Typography size="base" color="Grey61" fontWeight={600}>
                    {profileT('cultureFit.volunteer_experience')}
                  </Typography>

                  {cultureFitData?.volunteerExperience.map(
                    (eachExperience, index) => (
                      <ListContentItem key={eachExperience.id}>
                        <TitleAction
                          iconName="edit"
                          onClick={() =>
                            handleOpenVolunteerExperienceModal(index)
                          }
                          hideActionButton={previewMode}
                          iconSize={10}
                        >
                          <ExternalLink url={eachExperience?.url}>
                            <Typography
                              size="base"
                              color="grey31"
                              fontWeight={900}
                            >
                              {eachExperience.name}
                            </Typography>
                          </ExternalLink>
                        </TitleAction>
                        <Typography
                          size="caption"
                          color="grey31"
                          fontWeight={400}
                        >
                          {`${parseVolunteerDate(eachExperience.startDate)} - ${
                            eachExperience.endDate &&
                            !eachExperience.currentVolunteering
                              ? parseVolunteerDate(eachExperience.endDate)
                              : 'Currently'
                          }`}
                        </Typography>

                        <Typography
                          size="body1"
                          color="grey31"
                          fontWeight={400}
                          style={{ marginTop: 3 }}
                        >
                          {eachExperience.description}
                        </Typography>
                      </ListContentItem>
                    ),
                  )}

                  {!previewMode && (
                    <AddMoreButtonWrapper>
                      <Btn
                        label={`Add ${
                          cultureFitData?.volunteerExperience?.length > 0
                            ? 'more'
                            : ''
                        }`}
                        size="md"
                        handleClick={() =>
                          handleOpenVolunteerExperienceModal(null)
                        }
                        variant="textPrimary"
                        startIcon="plusRounded"
                        iconSize={15}
                      />
                    </AddMoreButtonWrapper>
                  )}
                </SectionContentWrapper>
              ) : null}
            </SectionContainer>
          )}

          {!previewMode ||
          Object.values(cultureFitData?.whatInspire || {}).find(
            item => item?.length > 0,
          ) ? (
            <SectionContainer mt={40}>
              <Header>
                <IconSVG name="lamp" size={20} color="#313134" />
                <TitleAction
                  iconName="edit"
                  onClick={handleOpenWhatInspiresMe}
                  hideActionButton={
                    previewMode ||
                    !Object.values(cultureFitData?.whatInspire || {}).find(
                      item => item?.length > 0,
                    )
                  }
                  iconSize={10}
                >
                  <Typography
                    size="headline1"
                    color="grey31"
                    style={{ marginLeft: 10 }}
                    fontWeight={700}
                  >
                    {profileT('cultureFit.what_inspires_me')}
                  </Typography>
                </TitleAction>
              </Header>

              {whatInspiresKeys.map(eachItem => {
                if (cultureFitData.whatInspire[eachItem][0]?.name) {
                  return (
                    <InspiresMeItemWrapper>
                      <InspiresMeHeader>
                        <IconSVG
                          name={eachItem === 'other' ? 'link' : eachItem}
                          size={18}
                        />
                        <Typography
                          size="base"
                          color="grey61"
                          style={{ marginLeft: 10 }}
                          fontWeight={700}
                        >
                          {parseHeaderTitle(eachItem)}
                        </Typography>
                      </InspiresMeHeader>

                      <InspiresMeItemList>
                        {cultureFitData.whatInspire[eachItem].map(item => (
                          <Typography
                            size="base"
                            color="primaryLight"
                            fontWeight={900}
                          >
                            <ExternalLink url={item?.link}>
                              {item.name}
                            </ExternalLink>
                          </Typography>
                        ))}
                      </InspiresMeItemList>
                    </InspiresMeItemWrapper>
                  );
                }

                return <></>;
              })}

              {!previewMode &&
                !Object.values(cultureFitData?.whatInspire || {}).find(
                  item => item?.length > 0,
                ) && (
                  <AddMoreButtonWrapper style={{ marginLeft: 30 }}>
                    <Btn
                      label="Add"
                      size="md"
                      handleClick={handleOpenWhatInspiresMe}
                      variant="textPrimary"
                      startIcon="plusRounded"
                      iconSize={15}
                    />
                  </AddMoreButtonWrapper>
                )}
            </SectionContainer>
          ) : null}

          {!previewMode || cultureFitData?.profissionalBuckets?.length ? (
            <SectionContainer mt={40}>
              <Header>
                <IconSVG name="bucket" size={20} color="#313134" />
                <Typography
                  size="headline1"
                  color="grey31"
                  style={{ marginLeft: 10 }}
                  fontWeight={600}
                >
                  {profileT('cultureFit.professional_bucket_list')}
                </Typography>
              </Header>

              {cultureFitData?.profissionalBuckets.map((eachBucket, index) => (
                <ListContentItem pl={30} key={eachBucket.id}>
                  <TitleAction
                    iconName="edit"
                    onClick={() => handleOpenBucketList(index)}
                    hideActionButton={previewMode}
                    iconSize={10}
                  >
                    <Typography size="base" color="grey31" fontWeight={900}>
                      {eachBucket.name}
                    </Typography>
                  </TitleAction>

                  <TypographyPre
                    className="proBucketListDes"
                    size="body1"
                    color="grey31"
                    fontWeight={400}
                  >
                    {eachBucket.description}
                  </TypographyPre>
                </ListContentItem>
              ))}

              {(!previewMode ||
                cultureFitData?.profissionalBuckets?.length === 0) && (
                <AddMoreButtonWrapper style={{ marginLeft: 30 }}>
                  <Btn
                    label={`Add ${
                      cultureFitData?.profissionalBuckets?.length > 0
                        ? 'more'
                        : ''
                    }`}
                    size="md"
                    handleClick={() => handleOpenBucketList(null)}
                    variant="textPrimary"
                    startIcon="plusRounded"
                    iconSize={15}
                  />
                </AddMoreButtonWrapper>
              )}
            </SectionContainer>
          ) : null}
        </>
      )}
    </Container>
  );
}

export default ProfileCultureFit;

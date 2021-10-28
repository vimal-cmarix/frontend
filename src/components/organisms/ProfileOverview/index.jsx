import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Truncate from 'react-truncate';
import { useRouter } from 'next/router';
import { Typography } from '@assets/styles/typo';
import { PrimaryLight } from '@assets/styles/colors';

import IconSVG from '@components/atoms/IconSVG';
import Tag from '@components/atoms/Tag';

import TitleAction from '@components/molecules/TitleAction';
import TextIconInfo from '@components/molecules/TextIconInfo';
import SocialSlider from '@components/molecules/SocialSlider';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import OverviewNotCover from '@components/templates/ViewerMode/OverviewNotCover';

// MODALS
import ContactsModal from '@components/templates/Modals/Contact';
import ModalSkills from '@components/templates/Modals/Skills';
import ModalMyDigitalPresence from '@components/templates/Modals/MyDigitalPresence';
import PreviewSummaryModal from '@components/templates/Modals/PreviewSummary';

import { cdn, intlFormatDate } from '@utils/general';
import Btn from '@components/molecules/Btn';
import {
  Container,
  ContainerTitle,
  ContainerGroup,
  LeftCol,
  RightCol,
  ContainerCols,
  VideoBox,
  VideoBoxEditButton,
  VideoTitle,
  VideoDescriptionBox,
  ShowMoreButton,
  ShowMoreArrow,
  DescriptionContainer,
  VideoBoxIconUpload,
  VideoBoxIconEdit,
  SkillTags,
  VideoBoxOverlay,
  ReadOnlyField,
  ReadoblyBtn,
} from './style';

import socials from './socials';

const LIMIT_SKILLS = 3;

function ProfileOverview() {
  const { t: profileT } = useTranslation('profile');

  const router = useRouter();
  const { slug } = router.query;

  const [isViewContact, setViewContact] = useState(false);

  const [viewPhoneType, setViewPhoneType] = useState('password');

  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const {
    skills,
    contactInfo,
    summary,
    previewMode,
    digitalPresences,
  } = profileState;

  const [limitSkills, setLimitSkills] = useState(LIMIT_SKILLS);
  const [descriptionIsExpanded, setDescriptionIsExpanded] = useState(false);
  const [digitalPresenceLinks, setDigitalPresenceLinks] = useState([]);

  const skillsIsExpanded = limitSkills === skills?.length;

  useEffect(() => {
    if (!Array.isArray(digitalPresences)) return;

    const newDigitalPresenceData = digitalPresences.map(
      ({ url, domain, id }) => ({
        id,
        link: url,
        image: socials[domain]?.image || socials.other.image,
        label: domain,
      }),
    );

    setDigitalPresenceLinks(newDigitalPresenceData);
  }, [digitalPresences]);

  function viewPhone(type) {
    setViewPhoneType(type);
    if (type === 'password') {
      setViewContact(false);
    } else {
      setViewContact(true);
    }
  }

  function handleShowAllSkills() {
    if (!skillsIsExpanded) {
      setLimitSkills(skills?.length);

      return;
    }

    setLimitSkills(LIMIT_SKILLS);
  }

  function toggleLines() {
    setDescriptionIsExpanded(!descriptionIsExpanded);
  }

  const handleEditSummary = () => {
    router.push(
      previewMode ? `/view/${slug}/summary` : '/profile/summary/edit',
    );
  };

  const summaryThumbnail =
    (summary.link && summary.link.imageUrl) ||
    (summary.asset && summary.asset.thumbnail) ||
    null;

  useEffect(() => {
    handleShowAllSkills();
  }, [skills]);

  return (
    <Container>
      {!summaryThumbnail && previewMode ? (
        <OverviewNotCover
          contactInfo={contactInfo}
          digitalPresenceLinks={digitalPresenceLinks}
          skills={skills}
        />
      ) : (
        <ContainerCols>
          <LeftCol>
            <ContainerGroup data-tut="reactour__contact">
              <ContainerTitle>
                <TitleAction
                  iconName="edit"
                  hideActionButton={previewMode}
                  onClick={() => {
                    appDispatch({
                      type: 'SET_MODAL_OPENED',
                      component: ContactsModal,
                    });
                  }}
                >
                  <Typography size="headline1" color="grey61">
                    {profileT('sidebar.contact')}
                  </Typography>
                </TitleAction>
              </ContainerTitle>
              {contactInfo && (
                <div>
                  {contactInfo.phone && (
                    <TextIconInfo>
                      <IconSVG name="phone" color={PrimaryLight} size={20} />
                      <Typography size="body1" color="grey29">
                        <ReadOnlyField
                          name="phone"
                          type={viewPhoneType}
                          size="medium"
                          maxLength="20"
                          readOnly
                          className="readonly_field"
                          value={contactInfo.phone}
                        />
                      </Typography>
                      {isViewContact ? (
                        <ReadoblyBtn onClick={() => viewPhone('password')}>
                          <IconSVG
                            name="unEye"
                            // onClick={() => viewPhone('password')}
                            size={20}
                          />
                        </ReadoblyBtn>
                      ) : (
                        <ReadoblyBtn onClick={() => viewPhone('text')}>
                          <IconSVG
                            name="eye"
                            // onClick={() => viewPhone('text')}
                            size={20}
                          />
                        </ReadoblyBtn>
                      )}
                    </TextIconInfo>
                  )}
                  {contactInfo.email && (
                    <TextIconInfo>
                      <IconSVG name="mail" color={PrimaryLight} size={20} />
                      <Typography size="body1" color="grey29">
                        {contactInfo.email}
                      </Typography>
                    </TextIconInfo>
                  )}
                </div>
              )}
            </ContainerGroup>

            {(!previewMode || digitalPresenceLinks?.length > 0) && (
              <ContainerGroup>
                <ContainerTitle>
                  <TitleAction
                    iconName="edit"
                    hideActionButton={previewMode}
                    onClick={() => {
                      appDispatch({
                        type: 'SET_MODAL_OPENED',
                        component: ModalMyDigitalPresence,
                      });
                    }}
                  >
                    <Typography size="headline1" color="grey61">
                      My Digital Presence
                    </Typography>
                  </TitleAction>
                </ContainerTitle>

                {!digitalPresenceLinks?.length && !previewMode && (
                  <Btn
                    label="Add"
                    variant="textPrimary"
                    startIcon="plusRounded"
                    handleClick={() => {
                      appDispatch({
                        type: 'SET_MODAL_OPENED',
                        component: ModalMyDigitalPresence,
                      });
                    }}
                  />
                )}
                {!!digitalPresenceLinks?.length && (
                  <SocialSlider socials={digitalPresenceLinks} />
                )}
              </ContainerGroup>
            )}

            {(!previewMode || skills?.length > 0) && (
              <ContainerGroup>
                <ContainerTitle>
                  <TitleAction
                    iconName="edit"
                    hideActionButton={previewMode}
                    onClick={() => {
                      appDispatch({
                        type: 'SET_MODAL_OPENED',
                        component: ModalSkills,
                        props: { skillsList: skills },
                      });
                    }}
                  >
                    <Typography size="headline1" color="grey61">
                      {profileT('skills')}
                    </Typography>
                  </TitleAction>
                </ContainerTitle>
                {!skills?.length && !previewMode && (
                  <Btn
                    label="Add"
                    variant="textPrimary"
                    startIcon="plusRounded"
                    handleClick={() => {
                      appDispatch({
                        type: 'SET_MODAL_OPENED',
                        component: ModalSkills,
                        props: { skillsList: skills },
                      });
                    }}
                  />
                )}

                {!!skills?.length && (
                  <div>
                    <SkillTags>
                      {skills.slice(0, limitSkills).map((skill, index) => (
                        <Tag key={String(index)} type="solid" label={skill} />
                      ))}
                    </SkillTags>

                    {skills?.length > LIMIT_SKILLS && (
                      <div>
                        <Typography display="block" size="body1" color="grey61">
                          {skillsIsExpanded ? skills?.length : LIMIT_SKILLS}
                          {` ${profileT('of')} `}
                          {skills?.length}
                        </Typography>
                        <ShowMoreButton
                          onClick={handleShowAllSkills}
                          showMoreActive={skillsIsExpanded}
                        >
                          <Typography size="body1">
                            {skillsIsExpanded
                              ? profileT('showLess')
                              : profileT('showAll')}
                          </Typography>
                          <ShowMoreArrow>
                            <IconSVG name="downArrow" size={16} />
                          </ShowMoreArrow>
                        </ShowMoreButton>
                      </div>
                    )}
                  </div>
                )}
              </ContainerGroup>
            )}
          </LeftCol>
          <RightCol>
            {summaryThumbnail || summary.title ? (
              <VideoBox>
                {!previewMode && (
                  <VideoBoxEditButton
                    variant="dark"
                    onClick={handleEditSummary}
                  >
                    <IconSVG name="edit" size={16} />
                  </VideoBoxEditButton>
                )}
                {summaryThumbnail && (
                  <img src={summaryThumbnail} alt={summary.title} />
                )}
                {!summaryThumbnail && (
                  <img
                    src={cdn('/static/img/thumb_temp.png')}
                    alt={summary.title}
                  />
                )}
                <VideoBoxOverlay
                  onClick={() => {
                    appDispatch({
                      type: 'SET_MODAL_OPENED',
                      component: PreviewSummaryModal,
                    });
                  }}
                >
                  <IconSVG name="videoPlay" size={58} />
                </VideoBoxOverlay>
              </VideoBox>
            ) : (
              !previewMode && (
                <VideoBox onClick={handleEditSummary}>
                  <VideoBoxIconEdit>
                    <IconSVG name="edit" />
                  </VideoBoxIconEdit>
                  <VideoBoxIconUpload>
                    <IconSVG name="upload" size={110} />
                  </VideoBoxIconUpload>
                </VideoBox>
              )
            )}
            {summary.title && (
              <VideoTitle>
                <Typography display="block" size="headline1" color="grey29">
                  {summary.title}
                </Typography>
                <Typography size="caption" color="grey61">
                  {intlFormatDate(Date.parse(summary.updatedAt))}
                </Typography>
              </VideoTitle>
            )}
            {summary.description && (
              <VideoDescriptionBox>
                <Typography size="body1" color="grey29">
                  <DescriptionContainer expanded={descriptionIsExpanded}>
                    <Truncate lines={!descriptionIsExpanded && 3}>
                      {summary.description}
                    </Truncate>
                  </DescriptionContainer>
                </Typography>
                <ShowMoreButton
                  onClick={toggleLines}
                  showMoreActive={descriptionIsExpanded}
                >
                  <Typography size="body1">
                    {descriptionIsExpanded
                      ? profileT('showLess')
                      : profileT('showMore')}
                  </Typography>
                  <ShowMoreArrow>
                    <IconSVG name="downArrow" size={16} />
                  </ShowMoreArrow>
                </ShowMoreButton>
              </VideoDescriptionBox>
            )}
          </RightCol>
        </ContainerCols>
      )}
    </Container>
  );
}

export default ProfileOverview;

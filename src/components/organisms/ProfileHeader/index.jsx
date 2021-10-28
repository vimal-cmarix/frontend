import { PrimaryLight } from '@assets/styles/colors';
import { SPACING } from '@assets/styles/theme';
import { sizes as breakpoint } from '@assets/styles/medias';
import { Typography } from '@assets/styles/typo';
import IconSVG from '@components/atoms/IconSVG';
import Btn from '@components/molecules/Btn';
import { ProfileCoverImage } from '@components/molecules/ProfileCoverImage';
import { ProfilePicture } from '@components/molecules/ProfilePicture';
import TextIconInfo from '@components/molecules/TextIconInfo';
import TitleAction from '@components/molecules/TitleAction';
import AboutModal from '@components/templates/Modals/About';
import PrivateLinkModal from '@components/templates/Modals/PrivateLink';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import useMedia from '@src/hooks/useMedia';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AboutWrapper, Container, HeaderWrapper, RightContent } from './style';

function ProfileHeader() {
  const { t: buttonsT } = useTranslation('buttons');
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  const data = profileState || {};
  const { personalInfo, about, previewMode } = data;
  const userName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  const locationInfo = {
    city: about.city?.name,
    state: about.state?.name,
    country: about.country?.name,
  };

  const location = Object.entries(locationInfo)
    .filter(([, value]) => value)
    .map(([, value]) => value)
    .join(', ');

  return (
    <Container>
      <ProfileCoverImage />
      <HeaderWrapper>
        <ProfilePicture />
        {!previewMode && (
          <RightContent>
            <Btn
              variant="outlinePrimary"
              label={buttonsT('share')}
              startIcon="share"
              size="md"
              rounded="lg"
              handleClick={() => {
                appDispatch({
                  type: 'SET_MODAL_OPENED',
                  component: PrivateLinkModal,
                });
              }}
            />
          </RightContent>
        )}

        <AboutWrapper data-tut="reactour__about">
          <TitleAction
            iconName="edit"
            hideActionButton={previewMode}
            onClick={() => {
              appDispatch({
                type: 'SET_MODAL_OPENED',
                component: AboutModal,
              });
            }}
          >
            <Typography size="headline2" color="grey31" as="h1">
              {userName}
            </Typography>
          </TitleAction>
          {location && (
            <TextIconInfo>
              <IconSVG
                name="location"
                color={PrimaryLight}
                size={20}
                style={{ flexShrink: 0 }}
              />
              <Typography color="primary" as="h2">
                {location}
              </Typography>
            </TextIconInfo>
          )}

          {about.personalIntroduction && (
            <Typography
              color="grey31"
              as="p"
              style={{ paddingTop: SPACING * 2 }}
              clamp={!isMobile ? 2 : null}
            >
              {about.personalIntroduction}
            </Typography>
          )}
        </AboutWrapper>
      </HeaderWrapper>
    </Container>
  );
}

export default ProfileHeader;

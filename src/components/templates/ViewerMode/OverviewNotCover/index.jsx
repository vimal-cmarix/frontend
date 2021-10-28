import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Typography } from '@assets/styles/typo';
import { PrimaryLight } from '@assets/styles/colors';
import { SPACING } from '@assets/styles/theme';

import TextIconInfo from '@components/molecules/TextIconInfo';
import IconSVG from '@components/atoms/IconSVG';
import SocialSlider from '@components/molecules/SocialSlider';
import SkillsSlider from '@components/molecules/SkillsSlider';

import { formatPhoneNumber } from '@utils/general';

import { Container, Card, TitleWrapper, SkillsSliderWrapper } from './style';

function OverviewNotCover({ contactInfo, digitalPresenceLinks, skills }) {
  const { t: profileT } = useTranslation('profile');

  return (
    <Container>
      {contactInfo && (
        <Card>
          <TitleWrapper>
            <Typography size="headline1" color="grey61">
              {profileT('sidebar.contact')}
            </Typography>
          </TitleWrapper>
          {contactInfo.phone && (
            <TextIconInfo spaceY={SPACING * 2}>
              <IconSVG name="phone" color={PrimaryLight} size={20} />
              <Typography size="body1" color="grey29">
                {contactInfo.phone}
              </Typography>
            </TextIconInfo>
          )}
          {contactInfo.email && (
            <TextIconInfo spaceY={SPACING * 2}>
              <IconSVG name="mail" color={PrimaryLight} size={20} />
              <Typography size="body1" color="grey29">
                {contactInfo.email}
              </Typography>
            </TextIconInfo>
          )}
        </Card>
      )}
      {!!digitalPresenceLinks.length && (
        <Card>
          <TitleWrapper>
            <Typography size="headline1" color="grey61">
              My Digital Presence
            </Typography>
          </TitleWrapper>
          <SocialSlider socials={digitalPresenceLinks} />
        </Card>
      )}
      {!!skills.length && (
        <Card>
          <TitleWrapper>
            <Typography size="headline1" color="grey61">
              {profileT('skills')}
            </Typography>
          </TitleWrapper>
          <SkillsSliderWrapper>
            <SkillsSlider skills={skills} />
          </SkillsSliderWrapper>
        </Card>
      )}
    </Container>
  );
}

OverviewNotCover.propTypes = {
  contactInfo: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
  digitalPresenceLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.string,
      link: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  skills: PropTypes.arrayOf(PropTypes.string),
};

OverviewNotCover.defaultProps = {
  contactInfo: null,
  digitalPresenceLinks: [],
  skills: [],
};

export default OverviewNotCover;

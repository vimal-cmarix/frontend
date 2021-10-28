import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import LocationService from '@api/services/location';
import ProfileContext from '@context/profileContext';
import getFormatedLocation from '@utils/location';
import { getGMT } from '@src/utils/general';
import { useTranslation } from 'react-i18next';

import { sizes as breakpoint } from '@assets/styles/medias';
import { PrimaryLight } from '@assets/styles/colors';
import { Typography } from '@assets/styles/typo';
import { SPACING } from '@assets/styles/theme';

import Avatar from '@components/molecules/Avatar';
import Tag from '@components/atoms/Tag';
import Icon from '@components/atoms/Icon';

import TextIconInfo from '@components/molecules/TextIconInfo';
import IconSVG from '@components/atoms/IconSVG';

import useMedia from '@src/hooks/useMedia';
import {
  HeaderWrapper,
  SideBarWrapper,
  Container,
  SectionTitle,
  SideBarBody,
  Section,
  RowIconPlusText,
  RowIconWrapper,
  RowText,
  InterestsWrapper,
  InterestWrapper,
} from './style';

/**
 * Sidebar is used to display all user informations
 */
const SideBar = ({ setLoading, isExternalAccess }) => {
  const { state: profileState } = useContext(ProfileContext);

  const [user, setUser] = useState({});
  const [about, setAbout] = useState({});
  const [contact, setContact] = useState({});
  const [interests, setInterests] = useState([]);
  const [timeZone, setTimeZone] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  const { t: profileT } = useTranslation('profile');

  const getGMTService = async dataAbout => {
    if (dataAbout && dataAbout.timezone) {
      const res = await LocationService.getTimezones({
        limit: 1000,
        query: dataAbout.timezone,
      });
      const { name } = res.data.data[0] || { name: `(${dataAbout.timezone})` };
      const options = {
        timeZone: dataAbout.timezone,
        hour: '2-digit',
        minute: '2-digit',
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const date = formatter.format(new Date());
      setTimeZone(`${date} (${getGMT(name)})`);
    } else setTimeZone(null);
  };

  const handleData = () => {
    const data = profileState;
    const { personalInfo, contactInfo, photo } = data;

    setUser({
      name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      occupation: data.about.occupation,
      photo,
    });
    setInterests(data.interests);
    setContact(contactInfo);
    setAbout(data.about);
    setAvatarUrl((photo && photo.url) || null);

    getGMTService(data.about);
  };

  useEffect(() => {
    if (profileState && profileState.id) handleData();
  }, [profileState]);

  useEffect(() => {
    if (user.name && contact.email) {
      setTimeout(() => {
        setLoading(true);
      }, 500);
    }
  }, [user, contact]);

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
      <HeaderWrapper>
        <SideBarWrapper>
          <Avatar image={avatarUrl} size="xxlarge" name={user.name} />
          <Typography size="headline2" color="grey31" as="h1">
            {user.name}
          </Typography>
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
        </SideBarWrapper>
      </HeaderWrapper>

      <SideBarBody>
        <SideBarWrapper>
          {about.occupation && (
            <Section>
              <SectionTitle>{profileT('sidebar.about')}</SectionTitle>
              {/* ROLE */}
              {about.occupation && (
                <RowIconPlusText>
                  <RowIconWrapper>
                    <Icon name="briefcase_outline" />
                  </RowIconWrapper>
                  <RowText>{about.occupation}</RowText>
                </RowIconPlusText>
              )}

              {/* LOCATION */}
              {about.state && about.city && (
                <RowIconPlusText>
                  <RowIconWrapper>
                    <Icon name="pin" />
                  </RowIconWrapper>
                  <RowText>
                    {getFormatedLocation(about.state, about.city)}
                  </RowText>
                </RowIconPlusText>
              )}

              {/* TIME ZONE */}
              {timeZone && (
                <RowIconPlusText>
                  <RowIconWrapper>
                    <Icon name="clock" />
                  </RowIconWrapper>
                  <RowText>{timeZone}</RowText>
                </RowIconPlusText>
              )}
            </Section>
          )}
          <Section>
            <SectionTitle>{profileT('sidebar.contact')}</SectionTitle>

            {/* PHONE */}
            {contact.phone && (
              <RowIconPlusText>
                <RowIconWrapper>
                  <Icon name="phone_outline" />
                </RowIconWrapper>
                <RowText>{contact.phone}</RowText>
              </RowIconPlusText>
            )}

            {/* EMAIL */}
            {contact.email && (
              <RowIconPlusText>
                <RowIconWrapper>
                  <Icon name="mail_outline" />
                </RowIconWrapper>
                {isExternalAccess ? (
                  <RowText as="a" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </RowText>
                ) : (
                  <RowText>{contact.email}</RowText>
                )}
              </RowIconPlusText>
            )}
          </Section>

          {interests?.length > 0 && (
            <Section>
              <SectionTitle>{profileT('sidebar.interests')}</SectionTitle>
              <InterestsWrapper>
                {interests.map(item => (
                  <InterestWrapper key={item}>
                    <Tag label={item} />
                  </InterestWrapper>
                ))}
              </InterestsWrapper>
            </Section>
          )}
        </SideBarWrapper>
      </SideBarBody>
    </Container>
  );
};

SideBar.propTypes = {
  setLoading: PropTypes.func.isRequired,
  isExternalAccess: PropTypes.bool,
};

SideBar.defaultProps = {
  isExternalAccess: false,
};

export default SideBar;

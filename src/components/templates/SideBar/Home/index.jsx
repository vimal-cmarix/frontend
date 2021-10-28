import React, { useContext } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import getFormatedLocation from '@utils/location';
import AppContext from '@context/appContext';

import MediaCard from '@components/molecules/MediaCard';
import SummaryCard from '@components/molecules/SummaryCard';
import Tag from '@components/atoms/Tag';
import Icon from '@components/atoms/Icon';
import InsertBox from '@components/molecules/InsertBox';
import Avatar from '@components/molecules/Avatar';
import PreviewPDF from '@components/templates/Modals/PreviewPDF';
import PreviewSummaryModal from '@components/templates/Modals/PreviewSummary';
import UnorderedList from '@components/molecules/UnorderedList';
import Btn from '@components/molecules/Btn';

import { monthYearToString, handleIconName } from '@src/utils/general';

import PrivateLinkModal from '@components/templates/Modals/PrivateLink';
import {
  HeaderWrapper,
  SideBarWrapper,
  HeaderFlexBox,
  UserInfos,
  UserName,
  UserDesc,
  HeaderButtonWrapper,
  Container,
  SectionTitle,
  SideBarBody,
  Section,
  InterestsWrapper,
  InterestWrapper,
  InsertBoxWrapper,
  DocumentWrapper,
  DocumentIcon,
  DocumentName,
  AvatarWrapper,
} from './style';

/**
 * Sidebar is used to display all user informations
 */
const SideBar = ({
  profile,
  education,
  experiences,
  certificates,
  skills,
  interests,
  resume,
  about,
  summary,
  hasData,
}) => {
  const { dispatch: appDispatch } = useContext(AppContext);

  const { t: monthsT } = useTranslation('months');
  const { t: modalsT } = useTranslation('modals');
  const { t: homeT } = useTranslation('home');

  function previewResume(path) {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: PreviewPDF,
      props: { path, title: 'Resume' },
    });
  }

  function previewSummary() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: PreviewSummaryModal,
    });
  }

  function showPrivateModal() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: PrivateLinkModal,
    });
  }

  const summaryThumbnail =
    (summary.link && summary.link.imageUrl) ||
    (summary.asset && summary.asset.thumbnail);

  return (
    <Container>
      <HeaderWrapper>
        <SideBarWrapper>
          <HeaderFlexBox>
            <AvatarWrapper>
              <UserInfos>
                <UserName>{profile.name}</UserName>
                <UserDesc>{profile.position}</UserDesc>
                {(about.state, about.city) && (
                  <UserDesc>
                    {getFormatedLocation(about.state, about.city)}
                  </UserDesc>
                )}
              </UserInfos>
              <Avatar
                name={profile.name}
                size="xxlarge"
                image={profile.photo && profile.photo.url}
              />
            </AvatarWrapper>
            <HeaderButtonWrapper>
              <Btn
                variant="outlinePrimary"
                label={homeT('sidebar.edit_profile')}
                handleClick={() => Router.push('/profile')}
                full
              />
              <Btn
                startIcon="share"
                variant="outlinePrimary"
                label={homeT('sidebar.share_profile')}
                handleClick={() => showPrivateModal()}
                full
              />
            </HeaderButtonWrapper>
          </HeaderFlexBox>
        </SideBarWrapper>
      </HeaderWrapper>

      <SideBarBody>
        <SideBarWrapper>
          {!hasData() && (
            <Section>
              <InsertBoxWrapper onClick={() => Router.push('/profile')}>
                <InsertBox label={homeT('sidebar.complete_your_profile')} />
              </InsertBoxWrapper>
            </Section>
          )}

          {summary.title && (
            <Section>
              <SectionTitle>{homeT('sidebar.summary')}</SectionTitle>
              <MediaCard
                thumb={summaryThumbnail}
                text={summary.title}
                handleClick={previewSummary}
              />
            </Section>
          )}
          {!!experiences?.length && (
            <Section>
              <SectionTitle>{homeT('sidebar.experience')}</SectionTitle>
              {experiences.map(item => (
                <SummaryCard
                  key={item.id}
                  title={item.company}
                  lines={[
                    item.occupation,
                    `${monthYearToString(item.periodFrom, monthsT)} - ${
                      item.periodTo
                        ? monthYearToString(item.periodTo, monthsT)
                        : modalsT('job_experience.current_job')
                    }`,
                  ]}
                  hasBorder={false}
                />
              ))}
            </Section>
          )}

          {!!education?.length && (
            <Section>
              <SectionTitle>{homeT('sidebar.education')}</SectionTitle>
              {education.map(item => (
                <SummaryCard
                  key={item.id}
                  title={item.degree}
                  lines={[
                    item.fieldOfStudy,
                    item.institution,
                    item.periodFrom === item.periodTo
                      ? `${monthYearToString(item.periodFrom, monthsT)}`
                      : `${monthYearToString(item.periodFrom, monthsT)} - ${
                          item.periodTo
                            ? monthYearToString(item.periodTo, monthsT)
                            : modalsT('education.current_education')
                        }`,
                  ]}
                  hasBorder={false}
                />
              ))}
            </Section>
          )}

          {!!certificates?.length && (
            <Section>
              <SectionTitle>{homeT('sidebar.certificates')}</SectionTitle>
              {certificates.map(item => (
                <SummaryCard
                  key={item.id}
                  title={item.title}
                  lines={[
                    item.institution,
                    monthYearToString(item.date, monthsT),
                  ]}
                  hasBorder={false}
                />
              ))}
            </Section>
          )}

          {!!skills?.length > 0 && (
            <Section>
              <SectionTitle>{homeT('sidebar.skills')}</SectionTitle>
              <UnorderedList list={skills} />
            </Section>
          )}

          {!!interests?.length && (
            <Section>
              <SectionTitle>{homeT('sidebar.interests')}</SectionTitle>
              <InterestsWrapper>
                {interests.map(item => (
                  <InterestWrapper key={item}>
                    <Tag label={item} />
                  </InterestWrapper>
                ))}
              </InterestsWrapper>
            </Section>
          )}

          {resume && (
            <Section>
              <SectionTitle>{homeT('sidebar.resume')}</SectionTitle>

              <DocumentWrapper
                onClick={() => {
                  previewResume(resume.path && resume.path.preview);
                }}
              >
                <DocumentIcon>
                  <Icon name={handleIconName(resume)} />
                </DocumentIcon>
                <DocumentName>{resume.filename}</DocumentName>
              </DocumentWrapper>
            </Section>
          )}
        </SideBarWrapper>
      </SideBarBody>
    </Container>
  );
};

SideBar.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.shape({
      url: PropTypes.string,
    }),
    position: PropTypes.string,
  }),
  education: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string,
      fieldOfStudy: PropTypes.string,
      institution: PropTypes.string,
      periodFrom: PropTypes.string,
      periodTo: PropTypes.string,
    }),
  ),
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      period: PropTypes.string,
      location: PropTypes.string,
    }),
  ),
  certificates: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      period: PropTypes.string,
      location: PropTypes.string,
    }),
  ),
  skills: PropTypes.arrayOf(PropTypes.string),
  interests: PropTypes.arrayOf(PropTypes.string),
  about: PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string,
    }),
    state: PropTypes.shape({
      name: PropTypes.string,
      iso2: PropTypes.string,
    }),
  }),
  summary: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
    asset: PropTypes.shape({
      url: PropTypes.string,
      thumbnail: PropTypes.string,
    }),
    link: PropTypes.shape({
      url: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
  }),
  hasData: PropTypes.func,
  resume: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.shape({
      subtype: PropTypes.string,
      filename: PropTypes.string,
      path: PropTypes.shape({
        preview: PropTypes.string,
      }),
    }),
  ]),
};

SideBar.defaultProps = {
  profile: {},
  education: [],
  experiences: [],
  certificates: [],
  skills: [],
  interests: [],
  resume: undefined,
  about: {},
  summary: {},
  hasData: undefined,
};

export default SideBar;

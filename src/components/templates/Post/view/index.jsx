import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell } from 'styled-css-grid';
import { useTranslation } from 'react-i18next';

import { sizes } from '@assets/styles/medias';
import ProfileContext from '@context/profileContext';
import { formatDate } from '@src/utils/general';
import AppContext from '@context/appContext';

import Video from '@components/molecules/Video';
import Tag from '@components/atoms/Tag';
import Noembed from '@components/atoms/Noembed';
import { Button } from '@components/molecules/Button';
import Avatar from '@components/molecules/Avatar';

import getThumbPortfolio from '@src/utils/portfolio';

import { ContentWrapper } from '@assets/styles/wrapper';

import NdEditor from '@components/organisms/NdEditor';
import {
  VideoWrapper,
  PostTitle,
  PostDescription,
  PostDate,
  PostTags,
  Cover,
  Image,
  ExternalLink,
  TopContainer,
  EmbeedWrapper,
  WrapperPdfButton,
  VideoIconsWrapper,
  DateUpdate,
  Dot,
  Name,
  PersonalInfoWrapper,
  Occupation,
  WrapperEditor,
} from './style';

const View = ({ post, profile }) => {
  const { t: monthsT } = useTranslation('months');
  const { t: dateFormatesT } = useTranslation('dateFormates');
  const { t: postT } = useTranslation('post');
  const { t: buttonsT } = useTranslation('buttons');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const [postData, setPostData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setPostData(post), [post]);
  useEffect(() => setProfileData(profile), [profile]);
  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  const cellSize = screenWidth >= parseInt(sizes.laptop, 10) ? 4 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 10 : 1;
  const leftSize = screenWidth >= parseInt(sizes.laptop, 10) ? 4 : 0;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '0';

  function downloadFile() {
    window.open(postData.asset.url);
  }

  function preview() {
    const { subtype, path } = postData.asset;

    if (subtype === 'csv') {
      return downloadFile();
    }

    return window.open(path.preview);
  }

  return (
    <ContentWrapper className="post-wrapper">
      <Grid columns={gridSize} gap={gapSize}>
        <Cell left={leftSize} width={cellSize}>
          <>
            <TopContainer>
              <Avatar
                size="medium"
                name={
                  profileData.personalInfo
                    ? `${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}`
                    : ''
                }
                image={profileData.photo && profileData.photo.url}
              />
              <PersonalInfoWrapper>
                <Name>
                  {profileData.personalInfo
                    ? `${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}`
                    : ''}
                </Name>
                <Occupation>
                  {profileData.about ? profileData.about.occupation : ''}
                </Occupation>
              </PersonalInfoWrapper>
            </TopContainer>
            {postData.type === 'media' && (
              <VideoWrapper>
                <Video
                  data={postData && postData.asset}
                  thumb={getThumbPortfolio(postData)}
                  className="full-width"
                >
                  <source src={postData.asset && postData.asset.url} />
                  <span>{postT('video_support')}</span>
                </Video>
              </VideoWrapper>
            )}
            {postData.type === 'blog' && (
              <Cover
                size={
                  screenWidth >= parseInt(sizes.laptop, 10)
                    ? cellSize / gridSize
                    : gridSize
                }
              >
                <Image src={postData.asset && postData.asset.url} alt="Cover" />
              </Cover>
            )}
            {postData.type === 'document' && (
              <Cover
                size={
                  screenWidth >= parseInt(sizes.laptop, 10)
                    ? cellSize / gridSize
                    : gridSize
                }
              >
                {postData.asset.type === 'image' ? (
                  <WrapperPdfButton overlay>
                    <Image
                      src={postData.asset.path.thumbnail}
                      alt={postData.type}
                    />
                    <VideoIconsWrapper viewDocument>
                      <Button
                        colorSchema="secondary"
                        handleClick={preview}
                        label={buttonsT('click_view')}
                        size="medium"
                      />
                    </VideoIconsWrapper>
                  </WrapperPdfButton>
                ) : (
                  <WrapperPdfButton overlay>
                    <VideoIconsWrapper viewDocument>
                      <Button
                        colorSchema="secondary"
                        handleClick={preview}
                        label={buttonsT('click_view')}
                        size="medium"
                      />
                    </VideoIconsWrapper>
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a href={postData.asset.path.preview} target="_blank">
                      <Image
                        src={postData.asset.path.thumbnail}
                        alt={postData.type}
                      />
                    </a>
                  </WrapperPdfButton>
                )}
              </Cover>
            )}
            <PostTitle>{postData.title}</PostTitle>
            <PostDescription>{postData.description}</PostDescription>
            <PostDate>
              {`Created on ${formatDate(
                postData.createdAt,
                monthsT,
                dateFormatesT('simple'),
              )}`}
              {postData.createdAt !== postData.updatedAt && (
                <>
                  <Dot />
                  <DateUpdate>
                    {`Updated on ${formatDate(
                      postData.updatedAt,
                      monthsT,
                      dateFormatesT('simple'),
                    )}`}
                  </DateUpdate>
                </>
              )}
            </PostDate>

            <PostTags>
              {postData.tags && postData.tags.map(tab => <Tag label={tab} />)}
            </PostTags>

            {postData.type === 'blog' && (
              <WrapperEditor>
                <NdEditor
                  onChange={() => {}}
                  content={postData.text}
                  readOnly
                />
              </WrapperEditor>
            )}

            {postData.type === 'link' && (
              <>
                <EmbeedWrapper>
                  <Noembed
                    url={postData.link.url}
                    accessToken={
                      profileState.accessToken ? profileState.accessToken : null
                    }
                  />
                </EmbeedWrapper>
                <ExternalLink href={postData.link.url} target="_blank">
                  {postData.link.url}
                </ExternalLink>
              </>
            )}
          </>
        </Cell>
      </Grid>
    </ContentWrapper>
  );
};

View.propTypes = {
  post: PropTypes.oneOfType([PropTypes.object]).isRequired,
  profile: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default View;

import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@assets/styles/typo';

import IconSVG from '@components/atoms/IconSVG';
import Tag from '@components/atoms/Tag';

import { intlFormatDate } from '@utils/general';

import {
  Container,
  ThumbnailWrapper,
  ThumbnailPlayButton,
  AuthorAvatar,
  ContentWrapper,
  CardDescription,
  TagsWrapper,
  CardCreatedDate,
  CardBody,
  ThumbnailImage,
  TagItem,
} from './styles';

const ContentCard = ({
  title,
  thumbnail,
  description,
  tags,
  authorAvatar,
  createdAt,
  handleClick,
}) => {
  return (
    <Container>
      <ThumbnailWrapper onClick={handleClick}>
        <ThumbnailImage src={thumbnail} />
        <ThumbnailPlayButton>
          <IconSVG name="play" color="#ffffff" size={34} />
        </ThumbnailPlayButton>
        <AuthorAvatar src={authorAvatar} />
      </ThumbnailWrapper>
      <CardBody>
        <ContentWrapper>
          <Typography display="block" size="headline1" color="black111" as="h2">
            {title}
          </Typography>
          <CardDescription>
            <Typography
              display="block"
              size="body2"
              color="grey87"
              fontWeight={300}
              as="p"
            >
              {description}
            </Typography>
          </CardDescription>
          <TagsWrapper>
            {tags.map(eachTag => (
              <TagItem>
                <Tag label={eachTag} type="thin" />
              </TagItem>
            ))}
          </TagsWrapper>
        </ContentWrapper>
        <CardCreatedDate>{intlFormatDate(createdAt)}</CardCreatedDate>
      </CardBody>
    </Container>
  );
};

ContentCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  createdAt: PropTypes.string.isRequired,
};

ContentCard.defaultProps = {
  description: '',
  tags: [],
};

export default ContentCard;

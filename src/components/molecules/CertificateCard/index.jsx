import React from 'react';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';

import {
  Container,
  HeaderWrapper,
  Avatar,
  HeaderContent,
  CardTitle,
  CardDescription,
  CardContentWrapper,
  CardText,
  IconWrapper,
} from './styles';

const CertificateCard = ({ cardAvatar, title, description, body }) => {
  return (
    <Container>
      <HeaderWrapper>
        <Avatar src={cardAvatar} />
        <HeaderContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </HeaderContent>
        <IconWrapper>
          <IconSVG name="eye" />
        </IconWrapper>
      </HeaderWrapper>

      <CardContentWrapper>
        <CardText>{body}</CardText>
      </CardContentWrapper>
    </Container>
  );
};

CertificateCard.propTypes = {
  cardAvatar: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  body: PropTypes.string,
};

CertificateCard.defaultProps = {
  cardAvatar: '',
  body: '',
};

export default CertificateCard;

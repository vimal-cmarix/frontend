import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';

const InfoCard = ({ title, subTitle, date }) => {
  return (
    <Container>
      <h2>{title}</h2>
      {subTitle && <span>{subTitle}</span>}
      {date && <time>{date}</time>}
    </Container>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  date: PropTypes.string,
};

InfoCard.defaultProps = {
  subTitle: null,
  date: null,
};

export default InfoCard;

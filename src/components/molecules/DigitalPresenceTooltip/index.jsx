import React from 'react';
import PropTypes from 'prop-types';

import { cdn } from '@utils/general';

import { Container, SocialIcons, AbsoluteContainer } from './styles';

const DigitalPresenceTooltip = ({ shown }) => {
  return (
    <AbsoluteContainer>
      <Container showTooltip={shown}>
        <SocialIcons src={cdn('/static/img/social/linkedin.svg')} />
        <SocialIcons src={cdn('/static/img/social/instagram.svg')} />
        <SocialIcons src={cdn('/static/img/social/twitter.svg')} />
        <SocialIcons src={cdn('/static/img/social/tiktok.svg')} />
        <SocialIcons src={cdn('/static/img/social/youtube.svg')} />
        <SocialIcons src={cdn('/static/img/social/custom-url.svg')} />

        <svg
          width="43"
          height="49"
          viewBox="0 0 43 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.75 27.183C-0.249999 26.0283 -0.250001 23.1416 1.75 21.9869L38.5 0.769262C40.5 -0.385435 43 1.05794 43 3.36734L43 45.8026C43 48.112 40.5 49.5554 38.5 48.4007L1.75 27.183Z"
            fill="#ffffff"
          />
        </svg>
      </Container>
    </AbsoluteContainer>
  );
};

DigitalPresenceTooltip.propTypes = {
  shown: PropTypes.bool,
};

DigitalPresenceTooltip.defaultProps = {
  shown: false,
};

export default DigitalPresenceTooltip;

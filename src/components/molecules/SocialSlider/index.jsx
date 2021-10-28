import React from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Container, CarouselWrapper, Image, LinkItem } from './style';

SwiperCore.use([Navigation, Pagination]);

function SocialSlider({ socials, limitToShow, imageSize, spaceBetween }) {
  const renderItem = social => (
    <SwiperSlide key={social.id}>
      <LinkItem href={social.link} target="_blank" rel="noopener noreferrer">
        <Image imageSize={imageSize} src={social.image} alt={social.label} />
      </LinkItem>
    </SwiperSlide>
  );

  return (
    <CarouselWrapper
      hideNavigation={socials?.length <= limitToShow}
      limitToShow={limitToShow}
      imageSize={imageSize}
      spaceBetween={spaceBetween}
    >
      <Container>
        <Swiper
          spaceBetween={spaceBetween}
          slidesPerView={limitToShow}
          navigation
          pagination={{ clickable: true }}
        >
          {socials.map(renderItem)}
        </Swiper>
      </Container>
    </CarouselWrapper>
  );
}

SocialSlider.propTypes = {
  limitToShow: PropTypes.number,
  imageSize: PropTypes.number,
  spaceBetween: PropTypes.number,
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.string,
      link: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

SocialSlider.defaultProps = {
  limitToShow: 4,
  imageSize: 30,
  spaceBetween: 10,
  socials: [],
};

export default SocialSlider;

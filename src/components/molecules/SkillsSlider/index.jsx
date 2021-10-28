import React from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Tag from '@components/atoms/Tag';

import { Container, CarouselWrapper, TagWrapper } from './style';

SwiperCore.use([Navigation, Pagination]);

function SkillsSlider({ skills, limitToShow, spaceBetween }) {
  const renderItem = (skill, index) => (
    <SwiperSlide key={String(index)}>
      <TagWrapper title={skill}>
        <Tag type="solid" label={skill} />
      </TagWrapper>
    </SwiperSlide>
  );

  return (
    <CarouselWrapper
      hideNavigation={skills.length <= limitToShow}
      limitToShow={limitToShow}
      spaceBetween={spaceBetween}
    >
      <Container>
        <Swiper
          spaceBetween={spaceBetween}
          slidesPerView={limitToShow}
          navigation
          pagination={{ clickable: true }}
        >
          {skills.map(renderItem)}
        </Swiper>
      </Container>
    </CarouselWrapper>
  );
}

SkillsSlider.propTypes = {
  limitToShow: PropTypes.number,
  spaceBetween: PropTypes.number,
  skills: PropTypes.arrayOf(PropTypes.string),
};

SkillsSlider.defaultProps = {
  limitToShow: 2,
  spaceBetween: 30,
  skills: [],
};

export default SkillsSlider;

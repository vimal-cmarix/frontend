import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import AppContext from '@context/appContext';
import FormBlock from '@components/organisms/FormBlock';
import Icon from '@components/atoms/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import FileUpload from '@components/molecules/FileUpload';
import { Hint } from '@components/molecules/TextInput/style';
import AssetService from '@api/services/asset';
import { cdn, convertToMb } from '@utils/general';
import { useTranslation } from 'react-i18next';
import ThumbItem from '@components/molecules/ThumbItem';
import { sizes } from '@assets/styles/medias';
import {
  CarrouselWrapper,
  FileUploadWrapper,
  FormBlockWrapper,
  ThumbnailWrapper,
  UploadThumb,
} from './style';

const uploadImageOptions = {
  fromSources: [
    'local_file_system',
    'facebook',
    'instagram',
    'googledrive',
    'dropbox',
    'video',
  ],
  accept: 'image/*',
  maxFiles: 1,
  maxSize: convertToMb(10),
  transformations: {
    crop: {
      aspectRatio: 16 / 9,
      force: true,
    },
  },
};

export default function ThumbUploadAndPreviewMocked({ onPreviewChanged }) {
  const { state: appState } = useContext(AppContext);
  const { isOpened } = appState.eportfolio_tour;
  const [swiperRef, setSwiperRef] = useState({});
  const [position, setPosition] = useState(0);
  const [errorImage, setErrorImage] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const { t: postT } = useTranslation('post');
  const { t: errorMessage } = useTranslation('errorMessages');

  useEffect(() => {
    if (imageData) {
      setSelected(imageData.url);
    }
  }, [imageData]);

  useEffect(() => {
    if (selected) {
      onPreviewChanged(selected);
    }
  }, [selected]);

  const onInit = ref => {
    setSwiperRef(ref);
  };

  const prev = () => {
    swiperRef.slidePrev();
  };

  const next = () => {
    swiperRef.slideNext();
  };

  const onChange = () => {
    setPosition(swiperRef.realIndex);
  };

  async function imageUploadSuccess(res) {
    const { filesUploaded } = res;
    setErrorImage(false);

    if (filesUploaded?.length) {
      setImageLoading(true);

      const { url } = filesUploaded[0];
      const response = await AssetService.createAsset(url);
      const { data } = response;

      setImageData(data.data);
      setImageLoading(false);
    } else {
      setImageData(null);
    }
  }

  function getImgWrapper() {
    // if (!profileState.id) return null; TODO - verify
    return (
      <>
        <FileUpload
          options={uploadImageOptions}
          description={postT('create.image.upload_description')}
          onSuccess={imageUploadSuccess}
          loading={imageLoading}
          error={errorImage}
        />
        {errorImage && <Hint error>{errorMessage('image.required')}</Hint>}
      </>
    );
  }

  const carrouselRef = useRef(null);

  const [slidesPerView, setSlidesPerView] = useState(1);
  useEffect(() => {
    if (carrouselRef && carrouselRef.current) {
      setTimeout(() => {
        setSlidesPerView(carrouselRef.current.clientWidth / 185);
      }, 1000);
    }
    setSlidesPerView(1);
  }, [appState.screenWidth]);

  const isMobile = useMemo(
    () => appState.screenWidth <= parseInt(sizes.tabletPortrait, 10),
    [appState.screenWidth],
  );

  const UploadThumbHelper = useMemo(() => {
    return (
      <UploadThumb>
        <Icon name="add-circle_solid" />
        Upload custom thumbnail.
        <FileUploadWrapper>{getImgWrapper()}</FileUploadWrapper>
      </UploadThumb>
    );
  });

  return (
    <FormBlockWrapper>
      <FormBlock label="Select a thumbnail:">
        <ThumbnailWrapper
          isMobile={isMobile}
          className={isOpened ? 'tour-opened' : ''}
        >
          {!isMobile && UploadThumbHelper}
          <CarrouselWrapper ref={carrouselRef}>
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={isMobile ? 120 : 80}
              onInit={ref => onInit(ref)}
              onTransitionStart={() => onChange()}
              navigation={{
                nextEl: '.swiper-button-prev',
                prevEl: 'swiper-button-next',
              }}
            >
              <SwiperSlide>
                <ThumbItem
                  imageUrl={cdn('/static/img/mock_video1.png')}
                  onClick={() =>
                    setSelected(cdn('/static/img/mock_video1.png'))
                  }
                  checked={selected === cdn('/static/img/mock_video1.png')}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ThumbItem
                  imageUrl={cdn('/static/img/mock_video2.png')}
                  onClick={() =>
                    setSelected(cdn('/static/img/mock_video2.png'))
                  }
                  checked={selected === cdn('/static/img/mock_video2.png')}
                />
              </SwiperSlide>
              {slidesPerView > 1 && <SwiperSlide />}
            </Swiper>

            {position !== 0 && (
              <button
                type="button"
                onKeyPress={() => prev()}
                onClick={() => prev()}
                className="swiper-button-prev"
              >
                <i className="icon-arrow-left" aria-hidden />
              </button>
            )}

            <button
              type="button"
              onKeyPress={() => next()}
              onClick={() => next()}
              className="swiper-button-next"
              id="slide-next"
            >
              <i className="icon-arrow-right" aria-hidden />
            </button>
          </CarrouselWrapper>
          {isMobile && UploadThumbHelper}
        </ThumbnailWrapper>
      </FormBlock>
    </FormBlockWrapper>
  );
}

ThumbUploadAndPreviewMocked.propTypes = {
  onPreviewChanged: PropTypes.func.isRequired,
};

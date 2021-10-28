/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/atoms/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import FileUpload from '@components/molecules/FileUpload';
import { Hint } from '@components/molecules/TextInput/style';
import AssetService from '@api/services/asset';
import { cdn, convertToMb } from '@utils/general';
import { useTranslation } from 'react-i18next';
import ThumbItem from '@components/molecules/ThumbItem';
import VideoThumbnailRenderer from '@components/molecules/VideoThumbnailRenderer';
import AppContext from '@context/appContext';
import { sizes } from '@assets/styles/medias';
import { Typography } from '@assets/styles/typo';
import IconSVG from '@components/atoms/IconSVG';
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

export default function ThumbUploadAndPreview({
  contentData,
  onChange,
  type,
  generatedThumb,
}) {
  const videoUrl = contentData && contentData.mediaUrl;
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { isOpened } = appState.eportfolio_tour;

  const [swiperRef, setSwiperRef] = useState({});
  const [position, setPosition] = useState(0);
  const [errorImage, setErrorImage] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const carrouselRef = useRef(null);

  const { t: postT } = useTranslation('post');
  const { t: errorMessage } = useTranslation('errorMessages');

  const customId = useMemo(() => {
    if (type === 'video') {
      let idx = 0;
      let key;
      do {
        idx += 1;
        key = `custom-${idx}`;
      } while (contentData && contentData.thumbCache[key]);
      return key;
    }
    return null;
  }, [contentData]);

  function getDefaultSelected() {
    if (type === 'video' && contentData) {
      return contentData.thumbnail && contentData.thumbId
        ? { url: contentData.thumbnail, id: contentData.thumbId }
        : null;
    }
    if (type === 'link' && contentData && contentData.asset) {
      return contentData.asset;
    }
    if (
      type === 'document' &&
      contentData &&
      contentData.asset &&
      contentData.asset.thumbnail
    ) {
      return {
        url: contentData.asset.thumbnail,
        id: contentData.asset.thumbId,
        handle: contentData.asset.thumbHandle,
      };
    }
    return generatedThumb;
  }

  function setDefaultImageData() {
    if (type === 'document' && contentData && contentData.asset) {
      return {
        url: contentData.asset.thumbnail,
        id: contentData.asset.thumbId,
        handle: contentData.asset.thumbHandle,
      };
    }

    return contentData ? contentData.asset : null;
  }

  const [selected, setSelected] = useState(getDefaultSelected());
  const [imageData, setImageData] = useState(setDefaultImageData());

  useEffect(() => {
    if (imageData && type === 'video') {
      setSelected({
        url: imageData.url,
        id: customId,
      });
    }
  }, [imageData]);

  useEffect(() => {
    if (selected) {
      onChange({
        ...contentData,
        thumbnail: selected.url,
        thumbId: selected.id,
        thumbHandle: selected.handle,
      });
    }
  }, [selected]);

  const slidesPerView = useMemo(() => {
    if (carrouselRef && carrouselRef.current) {
      return carrouselRef.current.clientWidth / 185;
    }
    return 1;
  }, [appState.screenWidth, carrouselRef.current]);

  const isMobile = useMemo(
    () => appState.screenWidth <= parseInt(sizes.tabletPortrait, 10),
    [appState.screenWidth],
  );

  const onInit = ref => {
    setSwiperRef(ref);
  };

  const prev = () => {
    swiperRef.slidePrev();
  };

  const next = () => {
    swiperRef.slideNext();
  };

  const onTransitionStart = () => {
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
      setSelected(data.data);
      // console.log('dataImg--', data.data);
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

  const UploadThumbHelper = useMemo(() => {
    return (
      <UploadThumb>
        <Icon name="add-circle_outline" />
        <Typography
          display="block"
          size="body1"
          as="p"
          align="center"
          color="primary"
        >
          Upload custom thumbnail.
        </Typography>
        <FileUploadWrapper>{getImgWrapper()}</FileUploadWrapper>
      </UploadThumb>
    );
  });

  return (
    <FormBlockWrapper>
      <Typography display="block" size="body1" color="grey31">
        Thumbnail:
      </Typography>
      <ThumbnailWrapper
        isMobile={isMobile}
        className={isOpened ? 'tour-opened' : ''}
      >
        {!isMobile && UploadThumbHelper}
        <CarrouselWrapper ref={carrouselRef}>
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={20}
            onInit={ref => onInit(ref)}
            onTransitionStart={() => onTransitionStart()}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            {isOpened ? (
              <>
                <SwiperSlide>
                  <ThumbItem
                    imageUrl={cdn('/static/img/mock_video1.png')}
                    onClick={() => {
                      setSelected({
                        url: cdn('/static/img/mock_video1.png'),
                        id: 'mock_video1',
                      });
                    }}
                    checked={
                      selected === cdn('/static/img/mock_video1.png') &&
                      selected.id === 'mock_video1'
                    }
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ThumbItem
                    imageUrl={cdn('/static/img/mock_video2.png')}
                    onClick={() => {
                      setSelected({
                        url: cdn('/static/img/mock_video2.png'),
                        id: 'mock_video2',
                      });
                    }}
                    checked={
                      selected === cdn('/static/img/mock_video2.png') &&
                      selected.id === 'mock_video2'
                    }
                  />
                </SwiperSlide>
              </>
            ) : (
              <>
                {type === 'video' && (
                  <>
                    {/* {console.log('data--img---', imageData, type)} */}
                    {imageData && imageData !== null && (
                      <SwiperSlide>
                        <ThumbItem
                          imageUrl={imageData.url}
                          onClick={() =>
                            setSelected({ url: imageData.url, id: customId })
                          }
                          checked={selected && selected.id === customId}
                        />
                      </SwiperSlide>
                    )}
                    {contentData &&
                      Object.keys(contentData.thumbCache)
                        .filter(id => id.startsWith('custom'))
                        .map(id => {
                          const thumbnailInCache =
                            contentData.thumbCache[id]?.handle?.url ||
                            contentData.thumbCache[id]?.url;
                          return (
                            <SwiperSlide key={id}>
                              <ThumbItem
                                imageUrl={thumbnailInCache}
                                onClick={() =>
                                  setSelected({ url: thumbnailInCache, id })
                                }
                                checked={selected && selected.id === id}
                              />
                            </SwiperSlide>
                          );
                        })}

                    {[0, 0.2, 0.5, 0.8, 0.9].map(time => {
                      const id = `frame-${Math.round(time * 100)}`;
                      const thumbnailInCache =
                        contentData?.thumbCache[id]?.handle?.url ||
                        contentData?.thumbCache[id]?.url;
                      if (thumbnailInCache) {
                        return (
                          <SwiperSlide key={id}>
                            <ThumbItem
                              imageUrl={thumbnailInCache}
                              onClick={() =>
                                setSelected({ url: thumbnailInCache, id })
                              }
                              checked={selected && selected.id === id}
                            />
                          </SwiperSlide>
                        );
                      }
                      return (
                        <SwiperSlide key={id}>
                          <VideoThumbnailRenderer
                            url={videoUrl}
                            time={time}
                            onClick={url =>
                              setSelected({ url, id }, console.log(contentData))
                            }
                            selected={selected && selected.id === id}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </>
                )}
                {type !== 'video' && (
                  <>
                    {imageData && imageData !== null && (
                      <SwiperSlide>
                        <ThumbItem
                          imageUrl={imageData.url}
                          onClick={() =>
                            setSelected({
                              url: imageData.url,
                              id: imageData.id,
                            })
                          }
                          checked={selected && selected.id === imageData.id}
                        />
                      </SwiperSlide>
                    )}
                    <SwiperSlide>
                      <ThumbItem
                        imageUrl={generatedThumb.url}
                        onClick={() =>
                          setSelected({
                            url: generatedThumb.url,
                            id: generatedThumb.id,
                          })
                        }
                        checked={selected && selected.id === generatedThumb.id}
                      />
                    </SwiperSlide>
                  </>
                )}

                {slidesPerView > 1 && <SwiperSlide />}
              </>
            )}
          </Swiper>
          <button
            type="button"
            onKeyPress={() => prev()}
            onClick={() => prev()}
            className="swiper-button-prev"
            id="slide-prev"
            style={{ outline: 'none' }}
          >
            <IconSVG name="leftArrow" size={14} />
          </button>
          <button
            type="button"
            onKeyPress={() => next()}
            onClick={() => next()}
            className="swiper-button-next"
            style={{ outline: 'none' }}
            id="slide-next"
          >
            <IconSVG name="rightArrow" size={14} />
          </button>
        </CarrouselWrapper>
        {isMobile && UploadThumbHelper}
      </ThumbnailWrapper>
    </FormBlockWrapper>
  );
}

ThumbUploadAndPreview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  contentData: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  generatedThumb: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

ThumbUploadAndPreview.defaultProps = {
  contentData: {},
  generatedThumb: {},
};

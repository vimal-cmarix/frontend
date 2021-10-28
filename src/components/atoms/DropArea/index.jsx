import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Icon from '@components/atoms/Icon';
import Loader from '@components/atoms/Loader';
import IconSVG from '@components/atoms/IconSVG';
import FileUploadModal from '@components/molecules/FileUploadModal';
import { converToBytes } from '@utils/general';
import { Container, FileOptions, LoaderWrapper, ContentBox } from './style';

/**
 * The Drop Area component is a custom generic drop area to be used with ReactFilestack.
 * It may display the maximum size of the file to be uploaded and a small description about what file is it.
 * It may also display a loader or the upload icon depending on the loading prop.
 * It also handles errors, displaying a red border and background.
 */
const DropArea = ({
  onPick,
  loading,
  description,
  maxSize,
  error,
  colorSchema,
  onVideoUpload,
  isVideo,
}) => {
  const { t } = useTranslation('file_upload');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const uploadVideoSuccess = res => {
    onVideoUpload(res);
    setShowUploadModal(false);
  };
  return (
    <>
      <Container
        type="button"
        error={error}
        onClick={setShowUploadModal}
        // onClick={onPick}
        colorSchema={colorSchema}
        isVideo={isVideo}
      >
        {loading ? (
          <ContentBox>
            <LoaderWrapper>
              <Loader size="medium" theme="dark" />
            </LoaderWrapper>
            <FileOptions>{t('uploading')}</FileOptions>
          </ContentBox>
        ) : (
          <>
            <ContentBox>
              {isVideo ? (
                <IconSVG name="upload" size={110} />
              ) : (
                <>
                  <Icon name="upload_solid" />
                  {description && <FileOptions>{description}</FileOptions>}
                  {maxSize && (
                    <FileOptions>
                      {`${t('maximumSize')} ${converToBytes(maxSize)}${t(
                        'byteUnity',
                      )}`}
                    </FileOptions>
                  )}
                </>
              )}
            </ContentBox>
          </>
        )}
      </Container>
      {showUploadModal && (
        <FileUploadModal
          closeModal={e => setShowUploadModal(e)}
          onSuccess={uploadVideoSuccess}
          isVideo={isVideo}
        />
      )}
    </>
  );
};

DropArea.propTypes = {
  onPick: PropTypes.func.isRequired,
  colorSchema: PropTypes.string,
  // onVideoUpload: PropTypes.func,
  description: PropTypes.string,
  maxSize: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  isVideo: PropTypes.bool,
};

DropArea.defaultProps = {
  colorSchema: 'primary',
  description: '',
  maxSize: null,
  // onVideoUpload: undefined,
  loading: false,
  error: false,
  isVideo: false,
};

export default DropArea;

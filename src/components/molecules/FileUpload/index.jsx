import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DropArea from '@components/atoms/DropArea';
import loadable from '@loadable/component';
import AssetService from '@api/services/asset';

import Icon from '@components/atoms/Icon';
import IconSVG from '@components/atoms/IconSVG';

import DropAreaContainer, { DropAreaContentBox } from './style';

const ReactFilestack = loadable(() => import('filestack-react'), {
  ssr: false,
});

const FileUpload = props => {
  const {
    onSuccess,
    options,
    description,
    loading,
    error,
    children,
    isVideo,
  } = props;
  const { maxSize } = options;

  const [FSKey, setFSKey] = useState(null);
  const [FSPolicy, setFSPolicy] = useState(null);
  const [FSSignature, setFSSignature] = useState(null);
  const [FSPath, setFSPath] = useState(null);

  const assetAuthData = async () => {
    const { data } = await AssetService.getAuth();

    const { key, policy, signature, path } = data.data.params;

    setFSKey(key);
    setFSPolicy(policy);
    setFSSignature(signature);
    setFSPath(path);
  };

  useEffect(() => {
    assetAuthData();
  }, []);

  const getActionContent = onPick => {
    if (children) {
      return children({ onPick });
    }

    return (
      <DropArea
        onPick={onPick}
        description={description}
        maxSize={maxSize}
        error={error}
        loading={loading}
        isVideo
      />
    );
  };

  return (
    <>
      {FSKey && FSPolicy && FSSignature && FSPath ? (
        <ReactFilestack
          apikey={FSKey}
          clientOptions={{
            security: {
              policy: FSPolicy,
              signature: FSSignature,
            },
            sessionCache: true,
          }}
          actionOptions={{ ...options, storeTo: { path: FSPath } }}
          componentDisplayMode={{
            type: 'immediate',
          }}
          customRender={({ onPick }) => getActionContent(onPick)}
          onSuccess={onSuccess}
        />
      ) : (
        <DropAreaContainer type="button" isVideo={isVideo}>
          {isVideo ? (
            <DropAreaContentBox>
              <IconSVG name="upload" size={110} />
            </DropAreaContentBox>
          ) : (
            <Icon name="upload_solid" />
          )}
        </DropAreaContainer>
      )}
    </>
  );
};

FileUpload.propTypes = {
  children: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
  options: PropTypes.objectOf(PropTypes.any).isRequired,
  description: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  isVideo: PropTypes.bool,
};

FileUpload.defaultProps = {
  children: null,
  loading: false,
  error: false,
  isVideo: false,
  description: '',
};

export default FileUpload;

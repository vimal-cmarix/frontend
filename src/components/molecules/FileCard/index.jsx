import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@components/atoms/Icon';

import { Container, FileIconCircle, FileIconWrapper, FileName } from './style';

/**
 * The file card is used to show documents or files
 */
const FileCard = ({ filename, mimetype }) => {
  return (
    <Container>
      <FileIconCircle>
        <FileIconWrapper>
          <Icon name={mimetype} />
        </FileIconWrapper>
      </FileIconCircle>
      <FileName>{filename}</FileName>
    </Container>
  );
};

FileCard.propTypes = {
  filename: PropTypes.string.isRequired,
  mimetype: PropTypes.string.isRequired,
};

export default FileCard;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import EditorUtils from 'draft-js-plugins-utils';

import DraftJS from 'draft-js';

import AssetService from '@api/services/asset';
import { convertToMb } from '@utils/general';
import FileUpload from '@components/molecules/FileUpload';

const uploadOptions = {
  accept: 'image/*',
  maxFiles: 1, // TODO: support more files
  maxSize: convertToMb(5),
};

export default class NdImageButton extends Component {
  onMouseDown = event => {
    event.preventDefault();
  };

  addImage = async src => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();

    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const newEditorState = DraftJS.AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' ',
    );
    const selection = DraftJS.EditorState.forceSelection(
      newEditorState,
      newEditorState.getCurrentContent().getSelectionAfter(),
    );

    await setEditorState(selection);
  };

  onUploadSuccess = async ({ filesUploaded }) => {
    if (!filesUploaded?.length) {
      return;
    }

    await Promise.all(
      filesUploaded.map(async ({ url }) => {
        const {
          data: { data },
        } = await AssetService.createAsset(url);
        this.addImage(data.url);
      }),
    );
  };

  render() {
    const { theme } = this.props;

    return (
      <div
        className={theme.buttonWrapper}
        onMouseDown={this.onMouseDown}
        role="button"
        tabIndex={0}
      >
        <FileUpload
          options={uploadOptions}
          onSuccess={this.onUploadSuccess}
          loading={false}
          error={false}
        >
          {({ onPick }) => {
            return (
              <button onClick={onPick} type="button">
                <svg
                  height="20"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fillRule="evenodd">
                    <path
                      d="M4.042 17.05V8.857c0-1.088.842-1.85 1.935-1.85H8.43C8.867 6.262 9.243 5 9.6 5.01L15.405
                      5c.303 0 .755 1.322 1.177 2 0 .077 2.493 0 2.493 0 1.094 0 1.967.763 1.967 1.85v8.194c-.002
                      1.09-.873 1.943-1.967 1.943H5.977c-1.093.007-1.935-.85-1.935-1.937zm2.173-9.046c-.626
                      0-1.173.547-1.173 1.173v7.686c0 .625.547 1.146 1.173 1.146h12.683c.625 0 1.144-.53
                      1.144-1.15V9.173c0-.626-.52-1.173-1.144-1.173h-3.025c-.24-.63-.73-1.92-.873-2 0 0-5.052.006-5
                      0-.212.106-.87 2-.87 2l-2.915.003z"
                    />
                    <path
                      d="M12.484 15.977a3.474 3.474 0 0 1-3.488-3.49A3.473 3.473 0 0 1 12.484 9a3.474 3.474
                      0 0 1 3.488 3.488c0 1.94-1.55 3.49-3.488 3.49zm0-6.08c-1.407 0-2.59 1.183-2.59 2.59 0
                      1.408 1.183 2.593 2.59 2.593 1.407 0 2.59-1.185 2.59-2.592 0-1.406-1.183-2.592-2.59-2.592z"
                    />
                  </g>
                </svg>
              </button>
            );
          }}
        </FileUpload>
      </div>
    );
  }
}

NdImageButton.propTypes = {
  // placeholder: PropTypes.string,
  setEditorState: PropTypes.func.isRequired,
  getEditorState: PropTypes.func.isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  // ownTheme: PropTypes.objectOf(PropTypes.any).isRequired,
  // onRemoveImageAtSelection: PropTypes.func.isRequired,
};

NdImageButton.defaultProps = {
  // placeholder: '',
};

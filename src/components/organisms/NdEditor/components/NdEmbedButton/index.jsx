import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';

import addEmbed from '../NdEmbed/modifiers/addEmbed';
import URLUtils from './utils/URLUtils';
import BlockUtils from './utils/BlockUtils';

import { NdEmbedButtonForm } from './style';

export default class NdEmbedButton extends Component {
  onMouseDown = event => {
    event.preventDefault();
  };

  addEmbed = async url => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();

    const newEditorState = addEmbed(editorState, url);

    await setEditorState(newEditorState);
  };

  addEmbedPlaceholder = () => {
    const { getEditorRef, getEditorState } = this.props;
    const editorRef = getEditorRef();
    const editorState = getEditorState();

    confirmAlert({
      customUI: ({ onClose }) => {
        const onSubmit = async () => {
          const { value } = this.urlRef;
          const url = URLUtils.normalizeUrl(value);

          if (!URLUtils.isUrl(url)) {
            this.urlRef.className = 'invalid';
            return;
          }

          await this.addEmbed(url);
        };

        const onKeyDown = e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
          }
        };

        const onBlur = () => {
          editorRef.focus();
          onClose();
        };

        const styles = BlockUtils.getStyles(editorState, editorRef);

        return (
          <NdEmbedButtonForm style={{ ...styles }}>
            <input
              type="input"
              id="embed-url"
              name="embedUrl"
              ref={ref => {
                this.urlRef = ref;
              }}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              placeholder="Paste a YouTube, TikTok, Loom, or other link, and press Enter"
            />
          </NdEmbedButtonForm>
        );
      },
    });

    setTimeout(() => {
      this.urlRef.focus();
    }, 1);
  };

  render() {
    return (
      <div
        onMouseDown={this.onMouseDown}
        role="button"
        style={{ position: 'relative' }}
        tabIndex={0}
      >
        <button type="button" onClick={this.addEmbedPlaceholder}>
          <svg
            height="20"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fillRule="evenodd">
              <path d="M9.826 7.698l-4.828 4.828 4.828 4.828.652-.7-4.08-4.128L10.53 8.4" />
              <path d="M14.514 8.4l4.177 4.126-4.17 4.127.7.7 4.83-4.827-4.83-4.828" />
            </g>
          </svg>
        </button>
      </div>
    );
  }
}

NdEmbedButton.propTypes = {
  // placeholder: PropTypes.string,
  setEditorState: PropTypes.func.isRequired,
  getEditorState: PropTypes.func.isRequired,
  getEditorRef: PropTypes.func.isRequired,
  // theme: PropTypes.objectOf(PropTypes.any).isRequired,
  // ownTheme: PropTypes.objectOf(PropTypes.any).isRequired,
  // onRemoveImageAtSelection: PropTypes.func.isRequired,
};

// NdEmbedButton.defaultProps = {
//   // placeholder: '',
// };

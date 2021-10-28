import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import Editor from 'draft-js-plugins-editor';

import createLinkifyPlugin from 'draft-js-linkify-plugin';

import { Typography } from '@assets/styles/typo';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import NdEditorContext from './context';
import NdInlineToolbar from './components/NdInlineToolbar';
import NdSideToolbar, {
  NdSideToolbarPlugins,
} from './components/NdSideToolbar';
import NdImage, { NdImagePlugins } from './components/NdImage';
import { NdEmbedPlugins } from './components/NdEmbed';

import { NdEditorWrapper, NdEditorContainer } from './style';

const NdEditor = ({
  onChange,
  content,
  readOnly,
  onFocus,
  onBlur,
  onlyInlineEditor,
  hidePlaceholder,
  maxLength,
  placeholder,
  minHeight,
  maxHeight,
  noBorder,
}) => {
  // This approach is needed to allow multiple InlineToolbars at the same page. Each NdEditor needs to instantiate its own plugins
  const [inlinePlugins, allPlugins] = useMemo(() => {
    const linkPlugin = createLinkPlugin();
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [
      {
        linkPlugin,
        inlineToolbarPlugin,
      },
      [
        linkPlugin,
        inlineToolbarPlugin,
        ...NdSideToolbarPlugins,
        ...NdImagePlugins,
        ...NdEmbedPlugins,
        createLinkifyPlugin({ target: '_blank' }),
      ],
    ];
  }, []);

  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw({
        blocks: (content && content.blocks) || [],
        entityMap: (content && content.entityMap) || {},
      }),
    ),
  );
  const [focus, setFocus] = useState(false);

  let onChangeTimeout = null;

  const editorFocus = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef]);

  useEffect(() => {
    clearTimeout(onChangeTimeout);
    onChangeTimeout = setTimeout(() => {
      const contentState = editorState.getCurrentContent();
      onChange(convertToRaw(contentState));
    }, 200);

    return function cleanup() {
      clearTimeout(onChangeTimeout);
    };
  }, [editorState]);

  useEffect(() => {
    if (content) {
      const newState = EditorState.createWithContent(
        convertFromRaw({
          blocks: (content && content.blocks) || [],
          entityMap: (content && content.entityMap) || {},
        }),
      );

      // if the content was reset outside, refresh the editor state
      if (
        editorState.getCurrentContent().getPlainText() !==
        newState.getCurrentContent().getPlainText()
      ) {
        setEditorState(newState);
      }
    }
  }, [content]);

  const handleBeforeInput = chars => {
    const totalLength =
      editorState.getCurrentContent().getPlainText().length + chars.length;
    // According to https://draftjs.org/docs/api-reference-editor/#handlebeforeinput we should return 'handled' to prevent default behaviour
    return maxLength && totalLength > maxLength ? 'handled' : false;
  };

  return (
    <NdEditorWrapper>
      <NdEditorContainer
        minHeight={minHeight}
        maxHeight={maxHeight}
        onlyInlineEditor={onlyInlineEditor}
        focus={focus}
        noBorder={noBorder}
      >
        <NdEditorContext.Provider value={editorState}>
          <div
            onClick={editorFocus}
            onKeyDown={() => {}}
            role="link"
            tabIndex={0}
            className="editor-wrapper create-blog-editor"
          >
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              handleBeforeInput={handleBeforeInput}
              handlePastedText={handleBeforeInput}
              onFocus={() => {
                setFocus(true);
                onFocus();
              }}
              onBlur={() => {
                setFocus(false);
                onBlur();
              }}
              placeholder={
                hidePlaceholder
                  ? ''
                  : placeholder || 'Click here to start typing in the editor...'
              }
              // blockRendererFn={renderBlock}
              ref={editorRef}
              plugins={allPlugins}
              readOnly={readOnly}
            />

            {!onlyInlineEditor && (
              <>
                <NdImage />
                <div className="editor-sidebar">
                  <NdSideToolbar readOnly={readOnly} />
                </div>
              </>
            )}

            <NdInlineToolbar plugins={inlinePlugins} />
          </div>
        </NdEditorContext.Provider>
      </NdEditorContainer>

      {maxLength && (
        <Typography size="body1">
          {editorState.getCurrentContent().getPlainText().length}/{maxLength}
        </Typography>
      )}
    </NdEditorWrapper>
  );
};

NdEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  readOnly: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onlyInlineEditor: PropTypes.bool,
  hidePlaceholder: PropTypes.bool,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  noBorder: PropTypes.bool,
};

NdEditor.defaultProps = {
  readOnly: false,
  onFocus: () => null,
  onBlur: () => null,
  onlyInlineEditor: false,
  hidePlaceholder: false,
  maxLength: undefined,
  minHeight: undefined,
  maxHeight: undefined,
  placeholder: '',
  noBorder: false,
};

export default NdEditor;

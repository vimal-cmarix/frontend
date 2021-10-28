import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';

export default {
  getStyles(editorState, editorRef) {
    const selection = editorState.getSelection();

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());

    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);

    const node = document.querySelectorAll(
      `[data-offset-key="${offsetKey}"]`,
    )[0];

    let editorRoot =
      editorRef.refs && editorRef.refs.editor
        ? editorRef.refs.editor
        : editorRef.editor;

    while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
      editorRoot = editorRoot.parentNode;
    }

    const { offsetParent } = editorRoot;

    return {
      top: node.offsetTop + offsetParent.offsetTop,
      left: offsetParent.offsetLeft,
      width: editorRoot.offsetWidth,
    };
  },
};

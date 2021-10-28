/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import AppContext from '@context/appContext';

import { HeadlineOneButton, HeadlineTwoButton } from 'draft-js-buttons';

import BlockTypeSelect from '../BlockTypeSelect';
import { Container } from './style';

const Toolbar = ({ store, children }) => {
  const initialVisible = store.getItem('open') === true;
  const { state, dispatch: appDispatch } = useContext(AppContext);
  const { isOpened, currentStep } = state.eportfolio_tour;

  const [top, setTop] = useState('auto');
  const [left, setLeft] = useState('auto');
  const [visible, setVisible] = useState(initialVisible);

  const onEditorStateChange = editorState => {
    const selection = editorState.getSelection();

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());

    const notAllowed =
      currentBlock.text !== '' || currentBlock.type !== 'unstyled';

    if (notAllowed || (!selection.getHasFocus() && !store.getItem('open'))) {
      setVisible(false);
      return;
    }

    // TODO verify that always a key-0-0 exists
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      const node = document.querySelectorAll(
        `[data-offset-key="${offsetKey}"]`,
      )[0];

      // The editor root should be two levels above the node from
      // `getEditorRef`. In case this changes in the future, we
      // attempt to find the node dynamically by traversing upwards.
      const editorRef = store.getItem('getEditorRef')();
      if (!editorRef) {
        return;
      }

      // this keeps backwards-compatibility with react 15
      let editorRoot =
        editorRef.refs && editorRef.refs.editor
          ? editorRef.refs.editor
          : editorRef.editor;
      while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
        editorRoot = editorRoot.parentNode;
      }

      store.updateItem('visible', true);
      setVisible(true);
      setTop(node.offsetTop + editorRoot.offsetTop - 4);
      setLeft(editorRoot.offsetLeft - 50);
    }, 0);
  };

  useEffect(() => {
    store.subscribeToItem('editorState', onEditorStateChange);

    return () => {
      store.unsubscribeFromItem('editorState', onEditorStateChange);
    };
  }, []);

  return (
    <Container
      top={top}
      left={left}
      visible={visible || (isOpened && currentStep >= 10)}
      data-tut="reactour__plus_button"
      className="blogEditorBtn"
    >
      <BlockTypeSelect store={store}>{children}</BlockTypeSelect>
    </Container>
  );
};

Toolbar.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.func,
};

Toolbar.defaultProps = {
  children: externalProps => (
    <>
      <HeadlineOneButton {...externalProps} />
      <HeadlineTwoButton {...externalProps} />
    </>
  ),
};

export default Toolbar;

/* eslint-disable react/no-array-index-key */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppContext from '@context/appContext';

import { Container } from './style';

const BlockTypeSelect = ({ children, store }) => {
  const [open, setOpen] = useState(false);
  const { state, dispatch: appDispatch } = useContext(AppContext);
  const { isOpened, currentStep } = state.eportfolio_tour;

  const toggleToolbar = () => {
    const newStatus = !open;

    setOpen(newStatus);
    store.updateItem('open', newStatus);
  };

  const onClickAction = () => {
    setTimeout(() => {
      setOpen(false);
      store.updateItem('open', false);
    }, 10);
  };

  return (
    <Container
      className={classNames('sidetoolbar-block', {
        'active-tour': isOpened || currentStep === 12,
      })}
      data-tut="reactour__plus_step"
    >
      <button
        className={classNames('sidetoolbar-menu', {
          'sidetoolbar-open': open || isOpened,
        })}
        type="button"
        onMouseDown={toggleToolbar}
      >
        <svg
          height="20"
          viewBox="0 0 24 24"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 12h-7V5h-1v7H5v1h7v7h1v-7h7" fillRule="evenodd" />
        </svg>
      </button>
      <div
        className={classNames('sidetoolbar-actions', {
          'sidetoolbar-open': open || isOpened,
        })}
        onMouseUp={onClickAction}
        role="button"
        tabIndex={0}
      >
        {children({
          getEditorState: store.getItem('getEditorState'),
          setEditorState: store.getItem('setEditorState'),
          getEditorRef: store.getItem('getEditorRef'),
          onClickAction,
          theme: {},
        })}
      </div>
    </Container>
  );
};

BlockTypeSelect.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.func.isRequired,
};

export default BlockTypeSelect;

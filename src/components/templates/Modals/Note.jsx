import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NewNote from '@components/molecules/NewNote';

import { sizes } from '@assets/styles/medias';
import useMedia from '@src/hooks/useMedia';
import ModalBody from './ModalBody';

/**
 * Edit Note Modal
 */
const Note = ({
  note,
  isCreating,
  handleClose,
  handleSubmit,
  handleDelete,
  handleChange,
  internalModalShow,
}) => {
  const formRef = useRef(null);
  const isMobile = useMedia(`(max-width: ${sizes.tablet})`);

  const [description, setDescription] = useState(note.content);

  useEffect(() => {
    formRef.current.setErrors({});

    let content = '';
    if (note.content) content = note.content;

    formRef.current.setData({
      content,
    });
    setDescription(content);
  }, [internalModalShow]);

  return (
    <ModalBody
      fitContent={isMobile}
      isMobileFull={false}
      isUnPadding
      onCancel={handleClose}
    >
      <NewNote
        note={note}
        isCreating={isCreating}
        formRef={formRef}
        handleCancel={handleClose}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleChange={handleChange}
        // hint={`${description ? description?.length : 0}/1000`}
      />
    </ModalBody>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    createdDate: PropTypes.string,
  }),
  isCreating: PropTypes.bool,
  internalModalShow: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func,
};

Note.defaultProps = {
  note: {},
  isCreating: true,
  internalModalShow: true,
  handleClose: () => {},
  handleSubmit: () => {},
  handleDelete: () => {},
  handleChange: () => {},
};

export default Note;

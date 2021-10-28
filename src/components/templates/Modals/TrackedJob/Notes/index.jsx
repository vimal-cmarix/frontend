import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import BoardService from '@api/services/board';

import { useTranslation } from 'react-i18next';
import { ReactSortable } from 'react-sortablejs';

import CardNote from '@components/molecules/CardNote';
import NewNote from '@components/molecules/NewNote';
import DeleteDialog from '@components/molecules/DeleteDialog';
import { useToast } from '@components/molecules/Notification';

import { Hint } from '@components/molecules/TextInput/style';
import { ContainerNotes, ContainerCards, ButtonAddNote } from './style';
import { HideMobile, ShowMobile } from '../../style';
import ModalNote from '../../Note';

const formatDate = date => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
  return formattedDate;
};

const Notes = ({
  isShowing,
  setInternalModal,
  toogleInternalModal,
  jobCardId,
  internalModalShow,
  setDisabledPage,
}) => {
  const { t: modalsT } = useTranslation('modals');
  const { t: errorMessage } = useTranslation('errorMessages');

  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);
  const [noteDialogDelete, setNoteDialogDelete] = useState(false);

  const formRef = useRef(null);

  const toast = useToast();
  const showSuccess = msg => toast.add(msg, 'success');

  async function handleGetNotes() {
    const { data } = await BoardService.getNotes(jobCardId);

    setNotes(
      data.data.map(a => ({
        ...a,
        createdDate: formatDate(new Date(a.createdAt)),
      })),
    );
  }

  useEffect(() => {
    handleGetNotes();
  }, [isShowing]);

  async function validSchema(formRefCurrent, values) {
    formRefCurrent.setErrors({});
    try {
      const schema = Yup.object().shape({ content: Yup.string().required() });

      await schema.validate(values, {
        abortEarly: false,
      });
      return true;
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });
        formRefCurrent.setErrors(validationErrors);
      }
      return false;
    }
  }

  async function handleDelete() {
    setNotes(notes.filter(item => item.id !== noteDialogDelete.id));
    setNoteDialogDelete(false);
    await BoardService.deleteNote(jobCardId, noteDialogDelete.id);
    showSuccess(modalsT('notes.delete_success'));
  }

  function handleChange(e) {
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
  }

  async function handleCreateNewNote(formRefCurrent) {
    const values = formRefCurrent.getData();
    if (await validSchema(formRefCurrent, values)) {
      await BoardService.setNote(jobCardId, { content: values.content });
      await handleGetNotes();
      showSuccess(modalsT('notes.success'));
      formRefCurrent.setFieldValue('content', '');
      setDescription('');
      toogleInternalModal(false);
    }
  }

  async function handleChangedNote(formRefCurrent, notePressed) {
    const values = formRefCurrent.getData();
    if (await validSchema(formRefCurrent, values)) {
      setNotes(
        notes.map(item => {
          const element = item;
          if (element.id === notePressed.id) element.content = values.content;
          return element;
        }),
      );
      await BoardService.editNote(jobCardId, notePressed.id, {
        content: values.content,
      });
      toogleInternalModal(false);
      showSuccess(modalsT('notes.success'));
    }
  }

  function handleEditNote(notePressed, isCreating) {
    setInternalModal(
      <ModalNote
        key={notePressed.id?.toString()}
        handleSubmit={formRefCurrent => {
          if (isCreating) handleCreateNewNote(formRefCurrent);
          else handleChangedNote(formRefCurrent, notePressed);
        }}
        handleClose={() => toogleInternalModal(false)}
        handleDelete={content => {
          toogleInternalModal(false);
          setNoteDialogDelete(content);
        }}
        handleChange={handleChange}
        note={notePressed}
        isCreating={isCreating}
        internalModalShow={internalModalShow}
      />,
    );
    toogleInternalModal(true);
  }

  async function handlePositionNote() {
    await BoardService.setPositionNote(jobCardId, {
      data: notes.map((note, position) => ({
        id: note.id,
        position,
      })),
    });
  }

  useEffect(() => {
    setDisabledPage(noteDialogDelete);
  }, [noteDialogDelete]);

  return (
    <ContainerNotes isShowing={isShowing}>
      {noteDialogDelete && (
        <DeleteDialog
          type="warning"
          title={modalsT('notes.delete.title')}
          description={modalsT('notes.delete.description')}
          warnDescription={modalsT('notes.delete.warnDescription')}
          onCancel={() => setNoteDialogDelete(false)}
          onConfirm={handleDelete}
        />
      )}
      <HideMobile>
        <NewNote
          formRef={formRef}
          handleSubmit={formRefCurrent => {
            handleCreateNewNote(formRefCurrent);
          }}
          handleDelete={setNoteDialogDelete}
          handleChange={handleChange}
        />
        {/* <Hint>{description ? description?.length : 0}/1000</Hint> */}
      </HideMobile>
      <ShowMobile>
        <ButtonAddNote
          label="Add Note"
          iconLeft="add"
          handleClick={() => handleEditNote({}, true)}
        />
      </ShowMobile>
      <ReactSortable
        handle=".handle"
        chosenClass="ghost"
        animation={150}
        tag={ContainerCards}
        list={notes}
        onEnd={handlePositionNote}
        setList={setNotes}
      >
        {notes.map(item => (
          <CardNote
            key={item.id}
            note={item}
            handleClick={() => handleEditNote(item, false)}
            handleDelete={setNoteDialogDelete}
          />
        ))}
      </ReactSortable>
    </ContainerNotes>
  );
};
Notes.propTypes = {
  isShowing: PropTypes.bool,
  internalModalShow: PropTypes.bool,
  setInternalModal: PropTypes.func,
  toogleInternalModal: PropTypes.func,
  jobCardId: PropTypes.string.isRequired,
};

Notes.defaultProps = {
  isShowing: false,
  internalModalShow: false,
  setInternalModal: () => null,
  toogleInternalModal: () => null,
};

export default Notes;

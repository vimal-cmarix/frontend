import React from 'react';
import PropTypes from 'prop-types';

import { HideMobile, ShowMobile } from '@components/templates/Modals/style';
import Icon from '@components/atoms/Icon';

import Btn from '../Btn';
import TextInput from '../TextInput';
import {
  FormNewNote,
  Footer,
  FooterLeft,
  FooterRight,
  HeaderMobile,
  ButtonSave,
  ButtonDel,
  TextAreaWrapper,
} from './style';
import { ButtonDelete, TextData } from '../CardNote/style';

const NewNote = ({
  formRef,
  handleSubmit,
  handleChange,
  handleCancel,
  handleDelete,
  isCreating,
  note,
  hint,
}) => {
  function handleDeleteNote(e) {
    e.stopPropagation();
    handleDelete(note);
  }
  return (
    <FormNewNote onSubmit={() => handleSubmit(formRef.current)} ref={formRef}>
      {!isCreating && (
        <HeaderMobile>
          <ButtonDelete type="button" onClick={handleDeleteNote}>
            <Icon name="delete_outline" size="13.33" />
          </ButtonDelete>
        </HeaderMobile>
      )}
      <TextAreaWrapper>
        <TextInput
          className="addNoteCard"
          multiline
          autosize
          placeholder="Add your note here!"
          name="content"
          rows="5"
          value={note.content}
          onChange={handleChange}
          hint={hint}
          // maxLength="1000"
          resize="vertical"
        />
      </TextAreaWrapper>
      <Footer className="addNoteFooter">
        <FooterLeft>
          {!isCreating && <TextData>Created: {note.createdDate}</TextData>}
          <ShowMobile>
            <Btn
              label="Cancel"
              type="button"
              size="md"
              handleClick={handleCancel}
              className="button_cancel"
              variant="outlineSecondary"
            />
          </ShowMobile>
          {!isCreating && (
            <HideMobile>
              <ButtonDel
                label="Delete"
                type="button"
                size="md"
                variant="outlineSecondary"
                className="button_cancel"
                handleClick={handleDeleteNote}
              />
              {/* <ButtonDelete type="button" onClick={handleDeleteNote}>
                <Icon name="delete_outline" size="20" />
              </ButtonDelete> */}
            </HideMobile>
          )}
        </FooterLeft>
        <FooterRight>
          {!isCreating && (
            <HideMobile>
              <ButtonDel
                label="Cancel"
                type="button"
                size="md"
                handleClick={handleCancel}
                className="button_cancel"
                variant="outlineSecondary"
              />
            </HideMobile>
          )}
        </FooterRight>
        <ButtonSave
          label="Save"
          type="submit"
          size="md"
          variant="outlinePrimary"
        />
      </Footer>
    </FormNewNote>
  );
};

NewNote.propTypes = {
  formRef: PropTypes.shape({
    /* eslint-disable react/forbid-prop-types */
    current: PropTypes.any,
  }).isRequired,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  handleDelete: PropTypes.func,
  isCreating: PropTypes.bool,
  note: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    createdDate: PropTypes.string,
  }),
  hint: PropTypes.string,
};

NewNote.defaultProps = {
  handleChange: () => null,
  handleSubmit: () => null,
  handleCancel: () => null,
  handleDelete: () => null,
  isCreating: true,
  note: {},
  hint: '',
};

export default NewNote;

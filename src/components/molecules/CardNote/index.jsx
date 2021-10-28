import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@components/atoms/Icon';
import IconSVG from '@components/atoms/IconSVG';

import {
  Container,
  Body,
  Footer,
  Handle,
  TextNote,
  TextData,
  ButtonDelete,
} from './style';

const CardNote = ({ note, handleClick, handleDelete }) => {
  return (
    <Container onClick={handleClick} className="noteCardBody">
      <Body>
        <TextNote>{note.content || 'Note'}</TextNote>
        <Handle className="handle">
          <IconSVG name="drag" />
        </Handle>
      </Body>
      <Footer>
        <TextData>Created: {note.createdDate}</TextData>
        <ButtonDelete
          onClick={e => {
            e.stopPropagation();
            handleDelete(note);
          }}
        >
          <Icon name="delete_outline" size="13" />
        </ButtonDelete>
      </Footer>
    </Container>
  );
};

CardNote.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

CardNote.defaultProps = {};

export default CardNote;

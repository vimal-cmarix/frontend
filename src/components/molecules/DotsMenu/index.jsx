import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';

import { Container, MenuItem } from './styles';

const DotsMenu = (
  { handleEditClick, handleDeleteClick, handleHideClick, shown },
  ref,
) => {
  return (
    <Container ref={ref} showMenu={shown}>
      <MenuItem onClick={handleEditClick}>
        <IconSVG name="edit" color="#A99DE0" />
        <span>Edit</span>
      </MenuItem>

      <MenuItem onClick={handleDeleteClick}>
        <IconSVG name="trash" color="#A99DE0" />
        <span>Delete</span>
      </MenuItem>

      <MenuItem onClick={handleHideClick}>
        <IconSVG name="eye" color="#A99DE0" />
        <span>Hide</span>
      </MenuItem>
    </Container>
  );
};

DotsMenu.propTypes = {
  shown: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleHideClick: PropTypes.func,
};

DotsMenu.defaultProps = {
  handleEditClick: () => null,
  handleDeleteClick: () => null,
  handleHideClick: () => null,
};

export default forwardRef(DotsMenu);

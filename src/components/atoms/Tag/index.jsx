import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@components/atoms/Icon';
import { Typography } from '@assets/styles/typo';

import { DefaultTag, RemoveButton } from './style';

/*
 * Default tag component
 * Can be solid or outline
 */

const Tag = ({ id, type, label, removeHandler }) => (
  <DefaultTag type={type} removeHandler={!!removeHandler}>
    <Typography
      display="inline-flex"
      size="body2"
      fontWeight={300}
      color="grey61"
    >
      {label}
    </Typography>
    {removeHandler && (
      <RemoveButton onClick={() => removeHandler(id)}>
        <Icon name="close" size="12" />
      </RemoveButton>
    )}
  </DefaultTag>
);

Tag.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['solid', 'outline', 'thin']),
  removeHandler: PropTypes.func,
};

Tag.defaultProps = {
  id: undefined,
  type: 'solid',
  removeHandler: undefined,
};

export default Tag;

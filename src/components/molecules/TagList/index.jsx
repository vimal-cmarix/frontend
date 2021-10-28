import React from 'react';
import PropTypes from 'prop-types';
import Tag from '@components/atoms/Tag';
import { FlexList, ListItem } from './style';

const TagList = ({ type, list, onRemove }) => {
  return (
    <FlexList>
      {(list || []).map(item => (
        <ListItem key={item.id}>
          <Tag
            id={item.id}
            label={item.label}
            type={type}
            removeHandler={() => onRemove(item.id)}
          />
        </ListItem>
      ))}
    </FlexList>
  );
};

TagList.propTypes = {
  type: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TagList.defaultProps = {
  type: 'solid',
};

export default TagList;

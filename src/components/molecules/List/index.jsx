import React from 'react';
import PropTypes from 'prop-types';
import { ReactSortable } from 'react-sortablejs';
import Icon from '@components/atoms/Icon';
import getThumbPortfolio from '@utils/portfolio';
import { IconButton } from '@components/molecules/Button';
import PostCard from '@components/molecules/PostCard';

import {
  IconWrapper,
  ListItem,
  ListWrapper,
  Handle,
  ListItemText,
  WrapperButtonIcon,
} from './style';

const List = ({ draggable, list, setList, remove, isThumbnail }) => {
  return (
    <ReactSortable
      handle={draggable ? '.handle' : false}
      chosenClass="ghost"
      tag={ListWrapper}
      animation={150}
      list={list}
      setList={setList}
    >
      {list.map(item => (
        <ListItem key={item.id} postCardStyle={isThumbnail}>
          {draggable && (
            <Handle className="handle">
              <span />
            </Handle>
          )}
          {isThumbnail ? (
            <>
              <IconWrapper>
                <Icon name="draggable" />
              </IconWrapper>
              <PostCard
                image={getThumbPortfolio(item)}
                title={item.title}
                desc={item.description}
                created={item.createdAt}
                tags={item.tags !== null ? item.tags : []}
                type={item.type}
                data={item}
              />
            </>
          ) : (
            <ListItemText>{item.text || item.id}</ListItemText>
          )}
          {remove && (
            <WrapperButtonIcon>
              <IconButton
                icon="delete_outline"
                colorSchema="secondary"
                handleClick={() => remove(item.id)}
              />
            </WrapperButtonIcon>
          )}
        </ListItem>
      ))}
    </ReactSortable>
  );
};

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  setList: PropTypes.func.isRequired,
  remove: PropTypes.func,
  draggable: PropTypes.bool,
  isThumbnail: PropTypes.bool,
};

List.defaultProps = {
  draggable: false,
  remove: undefined,
  isThumbnail: false,
};

export { List, ListWrapper };

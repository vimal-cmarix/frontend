import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/atoms/Icon';

import Checkbox from '@components/atoms/CheckBox';
import {
  CheckboxWrapper,
  ListItem,
  ListWrapper,
  ListItemText,
  VerticalBar,
  ListItemDate,
  ContainerList,
  WrapperButtonRemove,
  HorizontalBar,
} from './style';

const ListTasks = ({
  list,
  isColapsed,
  ColapsedComponent,
  handleRemove,
  handleColapsed,
  handleCompleted,
  itemColapsed,
  textVisibleColapsed,
  isCompleted,
  getTextFormated,
}) => {
  function renderList(pinned) {
    return list
      .filter(item => item.pinned === pinned && item.finished === isCompleted)
      .map((item, i) => {
        const isItemColapsed = itemColapsed && itemColapsed.id === item.id;
        return (
          <ContainerList key={item.id} isColapsed={isItemColapsed}>
            <ListItem
              isColapsed={isItemColapsed}
              onClick={() => isColapsed && handleColapsed(item)}
            >
              <Checkbox
                checked={item.finished}
                onChange={event => {
                  event.stopPropagation();
                  handleCompleted(item);
                }}
              />
              {!isItemColapsed && <VerticalBar />}
              {!textVisibleColapsed && !isItemColapsed && (
                <ListItemText isColapsed={isItemColapsed}>
                  {item.title || item.id}
                </ListItemText>
              )}
              {!isItemColapsed && (
                <ListItemDate>
                  {getTextFormated(item.targetDate, item.createdDate)}
                </ListItemDate>
              )}
              {handleRemove && isItemColapsed && (
                <WrapperButtonRemove
                  onClick={event => {
                    event.stopPropagation();
                    handleRemove(item);
                  }}
                >
                  <Icon name="delete_outline" size="20" />
                </WrapperButtonRemove>
              )}
            </ListItem>
            {ColapsedComponent && isItemColapsed ? ColapsedComponent : null}
          </ContainerList>
        );
      });
  }
  return (
    <>
      <ListWrapper>{renderList(true)}</ListWrapper>
      <HorizontalBar />
      <ListWrapper>{renderList(false)}</ListWrapper>
    </>
  );
};

ListTasks.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  isColapsed: PropTypes.bool,
  textVisibleColapsed: PropTypes.bool,
  ColapsedComponent: PropTypes.func,
  handleRemove: PropTypes.func,
  handleColapsed: PropTypes.func,
  handleCompleted: PropTypes.func,
  getTextFormated: PropTypes.func,
  itemColapsed: PropTypes.shape({
    id: PropTypes.string,
  }),
  isCompleted: PropTypes.bool,
};

ListTasks.defaultProps = {
  isColapsed: false,
  handleColapsed: false,
  handleCompleted: false,
  handleRemove: false,
  ColapsedComponent: false,
  itemColapsed: null,
  textVisibleColapsed: true,
  isCompleted: false,
  getTextFormated: false,
};

export default ListTasks;

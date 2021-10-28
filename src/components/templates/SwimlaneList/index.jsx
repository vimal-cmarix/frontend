import React from 'react';
import PropTypes from 'prop-types';

import SwimlaneColumn from '@components/organisms/SwimlaneColumn';
import { Body } from '@components/templates/JobTrackerDetail/style';

const SwimlaneList = ({ board, addButtonAction, onDelete, handleGetBoard }) => {
  const renderSwimlane = swimlane => {
    return (
      <SwimlaneColumn
        key={swimlane.id}
        swimlaneId={swimlane.id}
        data={swimlane}
        boardId={board.id}
        showAddButton={
          board.type === 'tracked' ? swimlane.position === 0 : true
        }
        addButtonAction={addButtonAction}
        onDelete={onDelete}
        handleGetBoard={handleGetBoard}
      />
    );
  };

  return <Body>{board.swimlanes?.map(renderSwimlane)}</Body>;
};

SwimlaneList.propTypes = {
  board: PropTypes.objectOf(PropTypes.any),
  addButtonAction: PropTypes.func,
  onDelete: PropTypes.func,
  handleGetBoard: PropTypes.func.isRequired,
};

SwimlaneList.defaultProps = {
  board: {},
  addButtonAction: () => {},
  onDelete: () => {},
};

export default SwimlaneList;

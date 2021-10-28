import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import BoardCard from '@components/molecules/BoardCard';

import Swimlane from '../Swimlane';

import { Content } from './style';

const SwimlaneColumn = ({
  showAddButton,
  addButtonAction,
  swimlaneId,
  boardId,
  data,
  onDelete,
  handleGetBoard,
}) => {
  const renderCard = (card, index) => (
    <BoardCard
      key={card.id}
      index={index}
      data={card}
      boardId={boardId}
      swimlaneId={swimlaneId}
      onDelete={jobCardId => onDelete(swimlaneId, jobCardId)}
      addButtonAction={addButtonAction}
      handleGetBoard={handleGetBoard}
    />
  );

  return (
    <Swimlane
      title={data.name}
      type={data.type}
      colorCode={data.colorCode}
      swimlaneId={swimlaneId}
      subTitle={
        data.jobCards.length > 1
          ? `${data.jobCards.length} Cards`
          : `${data.jobCards.length} Card`
      }
      showAddButton={showAddButton}
      onAdd={() => addButtonAction(data.name)}
    >
      <Droppable droppableId={swimlaneId} key={swimlaneId}>
        {(provided, snapshot) => (
          <Content
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data.jobCards.map(renderCard)}
            {provided.placeholder}
          </Content>
        )}
      </Droppable>
    </Swimlane>
  );
};

SwimlaneColumn.propTypes = {
  swimlaneId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    type: PropTypes.string,
    jobCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        jobTitle: PropTypes.string,
        companyName: PropTypes.string,
        createdAt: PropTypes.string,
      }),
    ),
  }).isRequired,
  addButtonAction: PropTypes.func,
  showAddButton: PropTypes.bool,
  onDelete: PropTypes.func,
  handleGetBoard: PropTypes.func.isRequired,
};

SwimlaneColumn.defaultProps = {
  onDelete: () => null,
  addButtonAction: () => null,
  showAddButton: false,
};

export default SwimlaneColumn;

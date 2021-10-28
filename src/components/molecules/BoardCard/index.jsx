import React, { useContext, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import JobCard from '@components/molecules/JobCard';

import TrackedJob from '@components/templates/Modals/TrackedJob';
import AppContext from '@context/appContext';

import { IS_ADDING_PITCH_TO_JOBCARD } from '@modules/consts';

import Storage from '@utils/storage';

import { Container } from './style';

const BoardCard = ({
  data,
  onDelete,
  boardId,
  swimlaneId,
  showDeleteButton,
  index,
  addButtonAction,
  handleGetBoard,
}) => {
  const { dispatch } = useContext(AppContext);

  const router = useRouter();
  const { query } = useRouter();

  const openTrackedJobModal = () => {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <TrackedJob
          jobCard={data}
          boardId={boardId}
          swimlaneId={swimlaneId}
          jobCardId={data.id}
          addButtonAction={addButtonAction}
          handleGetBoard={handleGetBoard}
        />
      ),
      props: {
        cancelBackClick: true,
      },
      activeEscapeButton: false,
    });

    router.replace(`/job-tracker/${boardId}`, undefined, { shallow: true });
  };

  function handleOnDelete(event) {
    event.stopPropagation();
    onDelete(data.id);
  }

  useEffect(() => {
    if (query.jobcard === data.id) {
      setTimeout(() => {
        openTrackedJobModal();
        Storage.rm(IS_ADDING_PITCH_TO_JOBCARD);
      }, 100);
    }
  }, [query]);

  const disabled = !!data.deletedAt;

  return (
    <Draggable
      draggableId={data.id}
      index={index}
      isDragDisabled={!!data.deletedAt}
    >
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...(!disabled && provided.dragHandleProps)}
          {...(!disabled && provided.draggableProps)}
        >
          <JobCard
            data={data}
            onGroupClick={openTrackedJobModal}
            onDelete={handleOnDelete}
            showDeleteButton={showDeleteButton}
            isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
          />
        </Container>
      )}
    </Draggable>
  );
};

BoardCard.propTypes = {
  index: PropTypes.number.isRequired,
  boardId: PropTypes.string.isRequired,
  swimlaneId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    jobTitle: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    deletedAt: PropTypes.string,
    tracked: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func,
  showDeleteButton: PropTypes.bool,
  addButtonAction: PropTypes.func,
  handleGetBoard: PropTypes.func.isRequired,
};

BoardCard.defaultProps = {
  showDeleteButton: true,
  onDelete: () => null,
  addButtonAction: () => null,
};

export default BoardCard;

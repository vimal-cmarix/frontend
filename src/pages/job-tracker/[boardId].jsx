import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import BoardService from '@api/services/board';

import Storage from '@utils/storage';
import { withAuthSync } from '@src/utils/auth';

import AppContext from '@context/appContext';

import JobTrackerDetailLayout from '@components/templates/JobTrackerDetail';
import SwimlaneList from '@components/templates/SwimlaneList';
// import ModalPreJobTracked from '@components/templates/Modals/NewPreJob';
import ModalNewJobTracker from '@components/templates/Modals/NewJobTracker';
import ModalBoardFirstAcess from '@components/templates/Modals/FirstAccess';
import DeleteDialog from '@components/molecules/DeleteDialog';
import { useToast } from '@components/molecules/Notification';
import ModalDoneTracking from '@components/templates/Modals/DoneTracking';
import FeedbackOnDelete from '@components/templates/Modals/FeedbackOnDelete';
import Page from '@components/templates/Page';

import errorHandle from '@utils/error';
import JobCardsSelectModal from '@components/templates/Modals/JobCardsSelect';
import { mockIconsNames } from './mocks';

const BoardDetail = ({ jwt }) => {
  const { t: toastT } = useTranslation('card');
  const { t: boardT } = useTranslation('board');
  const { t: modalsT } = useTranslation('modals');

  const { dispatch } = useContext(AppContext);
  // const { dispatch: appDispatch } = useContext(AppContext);
  const [board, setBoard] = useState({});
  const [boards, setBoards] = useState([]);
  const [cardDialogDelete, setCardDialogDelete] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(false);

  const { query } = useRouter();

  const toast = useToast();
  const showSuccess = msg => toast.add(msg, 'success');
  const showError = msg => toast.add(msg, 'error');

  useEffect(() => {
    const load = async () => {
      const { data } = await BoardService.getBoards();

      setBoards(data.data);

      const hasVisibleBoard = Storage.get('hasVisibleBoard');

      if (!hasVisibleBoard) {
        dispatch({
          type: 'SET_MODAL_OPENED',
          component: ModalBoardFirstAcess,
          props: {
            content: boardT('content_first_access'),
          },
        });
        Storage.add('hasVisibleBoard', 'true');
      }
    };
    load();
  }, []);

  function openModalJobCardPendency(cardsToInactivateAmount) {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: () => (
        <JobCardsSelectModal
          pendencyAmount={cardsToInactivateAmount}
          // eslint-disable-next-line no-use-before-define
          onConfirm={handleOnSaveJobCardToInactivate}
          supportText={modalsT('job_tracker_pendency.inactivate.support_text')}
          pendencyText={modalsT(
            'job_tracker_pendency.inactivate.pendency_text',
          ).replace('{AMOUNT}', String(cardsToInactivateAmount))}
          abortText={modalsT('job_tracker_pendency.inactivate.abort_text')}
          type="inactivate"
        />
      ),
    });
  }

  function getBoard(data) {
    setShowCreateButton(true);
    setBoard({
      ...data.data,
      swimlanes: data.data.swimlanes.map(swim => ({
        ...swim,
        iconName: mockIconsNames[swim.type],
      })),
    });
  }
  function flowPendencie(data) {
    if (data.data[0] && data.data[0].type === 'downgrade-jobcard')
      openModalJobCardPendency(data.data[0].pendencyAmount);
  }

  const callMethods = {
    pendencie: flowPendencie,
    board: getBoard,
  };

  async function handleGetBoard() {
    if (!query.boardId) return;
    try {
      const { data } = await BoardService.getBoard(query.boardId);
      callMethods[data.type](data);
    } catch (e) {
      showError(errorHandle(e));
    }
  }

  async function handleOnSaveJobCardToInactivate(jobCardIds) {
    try {
      await BoardService.batchDeleteJobCards(jobCardIds);
      await handleGetBoard();
    } catch (err) {
      showError(errorHandle(err));
    }
  }

  function handleMoveJobCard(jobCardId, swimlaneId) {
    return BoardService.moveJobCard(board.id, jobCardId, {
      swimlaneId,
    });
  }

  function handleSetPositionJobCards(swimlaneId, swimlanes) {
    return BoardService.setPositionJobCard(board.id, swimlaneId, {
      data: swimlanes.map((dest, position) => ({
        id: dest.id,
        position,
      })),
    });
  }

  useEffect(() => {
    handleGetBoard();
  }, [query]);

  function validGoToOutcome(sourceColumn, destinationColumn, item) {
    if (
      sourceColumn.id !== destinationColumn.id &&
      destinationColumn.id === board.swimlanes[board.swimlanes.length - 1].id
    ) {
      dispatch({
        type: 'SET_MODAL_OPENED',
        component: ModalDoneTracking,
        props: {
          jobCard: item,
        },
      });
    }
  }

  const onDragEnd = useCallback(
    async ({ source, destination }) => {
      if (!destination) return;
      const sourceColumn = board.swimlanes.filter(
        swim => swim.id === source.droppableId,
      )[0];
      const destinationColumn = board.swimlanes.filter(
        swim => swim.id === destination.droppableId,
      )[0];
      const [item] = sourceColumn.jobCards.splice(source.index, 1);
      validGoToOutcome(sourceColumn, destinationColumn, item);
      await destinationColumn.jobCards.splice(destination.index, 0, item);
      const swimlanes = board.swimlanes.map((swim, position) => {
        let element = swim;
        if (element.id === destinationColumn.id) element = destinationColumn;
        if (element.id === sourceColumn.id) element = sourceColumn;
        element.position = position;
        return element;
      });
      if (source.droppableId !== destination.droppableId)
        await handleMoveJobCard(item.id, destinationColumn.id);
      await handleSetPositionJobCards(
        destination.droppableId,
        destinationColumn.jobCards,
      );
      setBoard({
        ...board,
        swimlanes,
      });
    },
    [board],
  );

  function handleCreate(titleSwimline) {
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalNewJobTracker,
      props: {
        tracked: true,
        data: {
          titleSwimline,
          swimlanes: board.swimlanes.map(swim => ({
            value: swim.id,
            label: swim.name,
          })),
          handleGetBoard,
        },
        cancelBackClick: true,
      },
    });
    // dispatch({
    //   type: 'SET_MODAL_OPENED',
    //   component: ModalPreJobTracked,
    //   props: {
    //     data: {
    //       titleSwimline,
    //       swimlanes: board.swimlanes.map(swim => ({
    //         value: swim.id,
    //         label: swim.name,
    //       })),
    //       handleGetBoard,
    //     },
    //     cancelBackClick: true,
    //   },
    // });
  }

  async function handleDeleteJobCard() {
    const { swimlaneId, jobCardID } = cardDialogDelete;
    await BoardService.deleteJobCard(board.id, swimlaneId, jobCardID);
    await handleGetBoard();
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: FeedbackOnDelete,
    });
    setCardDialogDelete(false);
    showSuccess(toastT('delete_success'));
  }

  function handleChangeBoard() {
    console.log('change-board');
  }

  function handleDelete(swimlaneId, jobCardID) {
    setCardDialogDelete({ swimlaneId, jobCardID });
  }

  return (
    <Page
      title="Job tracker"
      description="Job tracker"
      isVerified={jwt.isVerified}
      nav={{ show: true }}
      topbar={{ show: false }}
      loadProfile
    >
      <JobTrackerDetailLayout
        handleCreate={handleCreate}
        mobileTitle="My Board"
        handleChangeBoard={handleChangeBoard}
        showCreateButton={showCreateButton}
        type={board.type}
        boards={boards}
      >
        {cardDialogDelete && (
          <DeleteDialog
            type="warning"
            title={toastT('delete.title')}
            description={toastT('delete.description')}
            warnDescription={toastT('delete.warnDescription')}
            onCancel={() => setCardDialogDelete(false)}
            onConfirm={handleDeleteJobCard}
          />
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <SwimlaneList
            addButtonAction={handleCreate}
            onDelete={handleDelete}
            board={board}
            handleGetBoard={handleGetBoard}
          />
        </DragDropContext>
      </JobTrackerDetailLayout>
    </Page>
  );
};
export default withAuthSync(BoardDetail, true);

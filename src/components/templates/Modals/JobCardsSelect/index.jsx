import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from '@context/appContext';

import BoardService from '@api/services/board';

import { Typography } from '@assets/styles/typo';
import { SPACING } from '@assets/styles/theme';
import { sizes as breakpoint } from '@assets/styles/medias';

import { useToast } from '@components/molecules/Notification';
import Swimlane from '@components/organisms/Swimlane';
import SwimlaneSkeleton from '@components/organisms/Swimlane/Skeleton';
import JobCardList from '@components/organisms/JobCardList';
import Btn from '@components/molecules/Btn';

import errorHandle from '@src/utils/error';

import useMedia from '@src/hooks/useMedia';

import {
  Container,
  Body,
  Header,
  HeaderLeft,
  HeaderRight,
  JobCardsContainer,
  FullButton,
  Footer,
} from './style';

import ModalBody from '../ModalBody';

function JobCardsSelect({
  pendencyText,
  supportText,
  abortText,
  pendencyAmount,
  onConfirm,
  type,
}) {
  const { dispatch: appDispatch } = useContext(AppContext);

  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJobCards, setSelectedJobCards] = useState({});

  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  const selectedCards = Object.values(selectedJobCards).filter(Boolean).length;

  const { swimlanes } = board;

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function handleSaveAndContinue() {
    const jobCardIds = Object.entries(selectedJobCards)
      .filter(([, value]) => value)
      .map(([id]) => ({ id }));

    onConfirm({ jobCardIds });
    closeModal();
  }

  function handleOnSelectItem(jobCardId) {
    setSelectedJobCards(prevState => {
      if (!prevState[jobCardId]) {
        return {
          ...prevState,
          [jobCardId]: true,
        };
      }

      return {
        ...prevState,
        [jobCardId]: !prevState[jobCardId],
      };
    });
  }

  const enableSelectionInactiveCards = boardData => {
    const finalBoardData = {
      ...boardData,
      swimlanes: boardData.swimlanes.map(swimlane => ({
        ...swimlane,
        jobCards: swimlane.jobCards.map(jobCardData => {
          if (!jobCardData.deletedAt) {
            return {
              ...jobCardData,
              canSelect: true,
            };
          }

          return jobCardData;
        }),
      })),
    };

    return finalBoardData;
  };

  const enableSelectionActiveCards = boardData => {
    const finalBoardData = {
      ...boardData,
      swimlanes: boardData.swimlanes.map(swimlane => ({
        ...swimlane,
        jobCards: swimlane.jobCards.map(jobCardData => {
          if (jobCardData.deletedAt) {
            return {
              ...jobCardData,
              canSelect: true,
            };
          }

          return jobCardData;
        }),
      })),
    };

    return finalBoardData;
  };

  const enableSelectableCards = {
    inactivate: enableSelectionInactiveCards,
    activate: enableSelectionActiveCards,
  };

  async function getBoard(boardId) {
    setLoading(true);

    try {
      const { data: response } = await BoardService.getBoard(boardId, 'yes');

      setBoard(enableSelectableCards[type](response.data));
    } catch (err) {
      showToast(errorHandle(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data: response } = await BoardService.getBoards();

        const [firstBoard] = response.data;

        await getBoard(firstBoard.id);
      } catch (err) {
        showToast(errorHandle(err));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderSwimlane = swimlane => (
    <Swimlane
      key={swimlane.id}
      type={swimlane.type}
      title={swimlane.name}
      subTitle={
        swimlane.jobCards?.length > 1
          ? `${swimlane.jobCards?.length} Cards`
          : `${swimlane.jobCards?.length} Card`
      }
      showAddButton={false}
    >
      <JobCardsContainer>
        <JobCardList
          list={swimlane.jobCards}
          onSelectItem={handleOnSelectItem}
          selectedItems={selectedJobCards}
          isSelectable
          type={type}
        />
      </JobCardsContainer>
    </Swimlane>
  );

  const SaveButton = () => (
    <Btn
      type="button"
      label="Save and continue"
      variant="outlinePrimary"
      disabled={selectedCards < pendencyAmount}
      handleClick={handleSaveAndContinue}
    />
  );

  return (
    <ModalBody fitContent isUnPadding onCancel={closeModal}>
      <Container>
        <Header>
          <HeaderLeft>
            <Typography display="block" size="headline1" color="grey31">
              {supportText}
            </Typography>
            <Typography
              style={{ paddingTop: SPACING * 2 }}
              display="block"
              size="headline1"
              color="mediumGrey"
              dangerouslySetInnerHTML={{ __html: pendencyText }}
            />
          </HeaderLeft>
          {!isMobile && (
            <HeaderRight>
              <SaveButton />
            </HeaderRight>
          )}
        </Header>
        <Body>
          {loading && (
            <>
              {[...Array(5).keys()].map((_, index) => (
                <SwimlaneSkeleton key={String(index)} />
              ))}
            </>
          )}
          {!!swimlanes?.length && <>{swimlanes.map(renderSwimlane)}</>}
        </Body>
        <Footer>
          {isMobile && <SaveButton />}
          <FullButton onClick={closeModal}>
            <Typography size="body1">{abortText}</Typography>
          </FullButton>
        </Footer>
      </Container>
    </ModalBody>
  );
}

JobCardsSelect.propTypes = {
  type: PropTypes.oneOfType(['activate', 'inactivate']),
  supportText: PropTypes.string.isRequired,
  pendencyText: PropTypes.string.isRequired,
  abortText: PropTypes.string.isRequired,
  pendencyAmount: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

JobCardsSelect.defaultProps = {
  type: 'inactivate',
};

export default JobCardsSelect;

import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Action, useToast } from '@components/molecules/Notification';
import ProgressBar from '@components/molecules/ProgressBar';
import ListTasks from '@components/molecules/ListTasks';
import ScrollbarCustom from '@components/molecules/ScrollbarCustom';

import NewTask from '@components/organisms/NewTask';
import { TextEmpty, WrapperEmpty } from '@components/molecules/ListTasks/style';
import errorHandle from '@src/utils/error';
import BoardService from '@api/services/board';

import useOnClickOutside from '@hooks/useOnClickOutside';

import {
  ListTaskWrapper,
  NavbarLink,
  TrackedJobNavbar,
  TextTitleList,
  ContainerPinned,
  NavbarItemTask,
} from './style';

const ListTaskJobCard = ({
  tasks,
  setTasks,
  getTextFormated,
  validSchema,
  jobCardId,
  handleChange,
}) => {
  const { t: modalsT } = useTranslation('modals');
  const [currentTab, setCurrentTab] = useState('todo');

  const [taskColapsed, setTaskColapsed] = useState(null);

  const formRef = useRef(null);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const wrapperTasksRef = useRef(null);

  const [showDeletAlert, setShowDelectAlert] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [taskValue, setTaskValue] = useState();

  useOnClickOutside(wrapperTasksRef, () => setTaskColapsed(null));

  function handleTabChanged(selectedTab) {
    setCurrentTab(selectedTab);
  }

  async function handleCompleted(item) {
    setTasks(
      tasks.map(task => {
        const element = task;
        if (element.id === item.id) element.finished = !element.finished;
        return element;
      }),
    );
    setTaskColapsed(null);
    if (item.finished) showSuccess(modalsT('tasks.finished'));

    await BoardService.finishedTask(jobCardId, item.id, {
      finished: item.finished,
    });
  }

  function handleColapsed(task) {
    if (formRef.current)
      formRef.current.setData({
        title: task?.title,
      });
    setTaskColapsed(task);
  }

  async function handleRemove(task) {
    let listColapsed = [...tasks];
    listColapsed = listColapsed.filter(item => item.id !== task.id);
    setTasks(listColapsed);
    await BoardService.deleteTask(jobCardId, task.id);
    showSuccess(modalsT('tasks.delete_success'));
  }

  async function handleDelete(e) {
    setTaskValue(e);
    setShowDelectAlert(true);
  }

  const deleteTodo = async () => {
    try {
      setDeleteLoading(true);
      handleRemove(taskValue);
      showSuccess('success');
      setDeleteLoading(false);
      setShowDelectAlert(false);
    } catch (err) {
      setDeleteLoading(false);
      showError(errorHandle(err));
    }
  };

  async function handleSave() {
    const values = formRef.current.getData();

    if (validSchema(formRef, values)) {
      await BoardService.editTask(jobCardId, taskColapsed.id, {
        ...values,
        ...taskColapsed,
      });
      setTasks(
        tasks.map(task => {
          let element = task;
          if (element.id === taskColapsed.id)
            element = {
              ...values,
              ...taskColapsed,
              dateText: getTextFormated(values.targetDate, values.createdDate),
            };
          return element;
        }),
      );
    }
    setTaskColapsed(null);
  }

  const handlePropsNewJob = (
    <NewTask
      createdDate={taskColapsed?.createdDate}
      targetDate={taskColapsed?.targetDate}
      description={taskColapsed?.description || {}}
      pinned={taskColapsed?.pinned}
      title={taskColapsed?.title}
      setPinned={pinned => setTaskColapsed(state => ({ ...state, pinned }))}
      setTargetDate={targetDate =>
        setTaskColapsed(state => ({ ...state, targetDate }))
      }
      setDescription={description => {
        if (
          JSON.stringify(description) !==
          JSON.stringify(taskColapsed?.description)
        )
          setTaskColapsed(state => ({ ...state, description }));
      }}
      editing
      handleCancel={() => handleColapsed(null)}
      handleSubmit={handleSave}
      handleChange={handleChange}
      formRef={formRef}
    />
  );

  const isCompleted = currentTab === 'completed';

  const isEmptyTodo = useMemo(
    () => !isCompleted && tasks.filter(a => !a.finished).length === 0,
    [tasks, isCompleted],
  );

  const isEmptyCompleted = useMemo(
    () => isCompleted && tasks.filter(a => a.finished).length === 0,
    [tasks, isCompleted],
  );

  return (
    <ListTaskWrapper>
      <TrackedJobNavbar>
        <NavbarItemTask
          onClick={() => handleTabChanged('todo')}
          isCurrentTab={currentTab === 'todo'}
        >
          <NavbarLink>To-do</NavbarLink>
        </NavbarItemTask>
        <NavbarItemTask
          onClick={() => handleTabChanged('completed')}
          isCurrentTab={isCompleted}
        >
          <NavbarLink>Completed</NavbarLink>
        </NavbarItemTask>
      </TrackedJobNavbar>
      <ProgressBar
        currentValue={tasks.filter(task => task.finished).length}
        totalValue={tasks.length}
      />
      <ContainerPinned>
        {showDeletAlert && (
          <Action
            type="warning"
            title={modalsT('tasks.delete.title')}
            description={modalsT('tasks.delete.description')}
            onCancel={() => setShowDelectAlert(false)}
            onConfirm={deleteTodo}
            loading={deleteLoading}
          />
        )}
        {((!isCompleted && !isEmptyTodo) ||
          (isCompleted && !isEmptyCompleted)) && (
          <ScrollbarCustom autoHeightMax="405px">
            <TextTitleList>Pinned</TextTitleList>
            <div ref={wrapperTasksRef}>
              <ListTasks
                isColapsed
                handleRemove={handleDelete}
                handleColapsed={handleColapsed}
                handleCompleted={handleCompleted}
                ColapsedComponent={handlePropsNewJob}
                list={tasks}
                itemColapsed={taskColapsed}
                textVisibleColapsed={false}
                isCompleted={isCompleted}
                getTextFormated={getTextFormated}
              />
            </div>
          </ScrollbarCustom>
        )}
        {isEmptyTodo && (
          <WrapperEmpty>
            <TextEmpty>Let’s start creating some tasks!</TextEmpty>
          </WrapperEmpty>
        )}
        {isEmptyCompleted && (
          <WrapperEmpty>
            <TextEmpty>
              Let’s start checking off some of these task items!
            </TextEmpty>
          </WrapperEmpty>
        )}
      </ContainerPinned>
    </ListTaskWrapper>
  );
};

ListTaskJobCard.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  setTasks: PropTypes.func,
  getTextFormated: PropTypes.func,
  handleChange: PropTypes.func,
  validSchema: PropTypes.func,
  jobCardId: PropTypes.string.isRequired,
};

ListTaskJobCard.defaultProps = {
  tasks: [],
  setTasks: () => null,
  getTextFormated: () => null,
  validSchema: () => null,
  handleChange: () => null,
};

export default ListTaskJobCard;

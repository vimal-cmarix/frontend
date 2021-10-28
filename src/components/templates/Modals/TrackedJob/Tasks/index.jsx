import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import BoardService from '@api/services/board';
import * as Yup from 'yup';

import ListTaskJobCard from '@components/organisms/ListTasksJobCard';
import NewTask from '@components/organisms/NewTask';

import useMedia from '@src/hooks/useMedia';
import { sizes } from '@assets/styles/medias';

import { useToast } from '@components/molecules/Notification';
import { useTranslation } from 'react-i18next';
import { ButtonAddTask, CreateTask } from './style';

const formatDate = date => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
  return formattedDate;
};

const getTextFormated = (target, created) => {
  return target
    ? `Target: ${formatDate(target)}`
    : `Created: ${formatDate(created)}`;
};

const Tasks = ({ isShowing, jobCardId }) => {
  const { t: modalsT } = useTranslation('modals');
  const { t: errorMessage } = useTranslation('errorMessages');

  const [tasks, setTasks] = useState([]);
  const [targetDate, setTargetDate] = useState('');
  const [description, setDescription] = useState({});
  const [pin, setPin] = useState(false);
  const [isShowNewTask, setIsShowNewTask] = useState(false);

  const formRef = useRef(null);

  const toast = useToast();
  const showSuccess = msg => toast.add(msg, 'success');

  const isMobile = useMedia(`(max-width: ${sizes.tablet})`);

  async function handleGetTasks() {
    const { data } = await BoardService.getTasks(jobCardId);
    setTasks(
      [...data.data.toDo, ...data.data.finished].map(task => ({
        ...task,
        targetDate: task.targetDate && new Date(task.targetDate),
        createdDate: task.createdDate && new Date(task.createdDate),
      })),
    );
  }

  async function validSchema(refForm, values) {
    refForm.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
      });
      await schema.validate(values, {
        abortEarly: false,
      });
      return true;
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });
        refForm.current.setErrors(validationErrors);
      }
      return false;
    }
  }

  function clearForm() {
    formRef.current.setData({
      title: '',
      pinned: false,
      targetDate: '',
    });
    setPin(false);
    setTargetDate('');
    setIsShowNewTask(false);
    setDescription({});
  }

  async function handleSave() {
    const values = formRef.current.getData();
    if (targetDate) values.targetDate = targetDate;
    if (Object.keys(description).length === 0) {
      description.blocks = [];
      values.description = description;
    } else {
      values.description = description;
    }
    if (validSchema(formRef, values)) {
      await BoardService.setTask(jobCardId, values);
      showSuccess(modalsT('tasks.success'));
      clearForm();
      handleGetTasks();
    }
  }

  function handleChange(e) {
    // console.log('***********', e.target.value);
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
  }

  useEffect(() => {
    if (isShowing) {
      handleGetTasks();
    }
  }, [isShowing]);

  return (
    <CreateTask isShowing={isShowing}>
      {isMobile && (
        <ButtonAddTask
          label="Add Task"
          iconLeft="add"
          handleClick={() => setIsShowNewTask(true)}
        />
      )}
      {(!isMobile || isShowNewTask) && (
        <NewTask
          targetDate={targetDate}
          setTargetDate={setTargetDate}
          pinned={pin}
          setPinned={setPin}
          handleSubmit={handleSave}
          description={description}
          setDescription={setDescription}
          handleCancel={clearForm}
          handleChange={handleChange}
          formRef={formRef}
        />
      )}
      <ListTaskJobCard
        tasks={tasks}
        setTasks={setTasks}
        getTextFormated={getTextFormated}
        handleChange={handleChange}
        validSchema={validSchema}
        jobCardId={jobCardId}
      />
    </CreateTask>
  );
};

Tasks.propTypes = {
  isShowing: PropTypes.bool,
  jobCardId: PropTypes.bool.isRequired,
};

Tasks.defaultProps = {
  isShowing: false,
};

export default Tasks;

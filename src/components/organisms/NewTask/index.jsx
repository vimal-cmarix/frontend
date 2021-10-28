import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import IconSVG from '@components/atoms/IconSVG';
import CustomCheckbox from '@components/molecules/CustomCheckbox';

import {
  CreateTaskFormWrapper,
  TasksFormTextInput,
  TasksFormTextareaInput,
  TasksTextareaWrapper,
  CreateTaskFormGroup,
  CreateTaskActions,
  CreateTaskFormTextInputWithIconWrapper,
  CreateTaskCustomDatePicker,
  CreateTaskFormTextInputIconWrapper,
  CreateTaskModalActionButton,
  CreateTaskFormCurrentDate,
  CreateTaskGroupText,
} from './style';

const NewTask = ({
  createdDate,
  targetDate,
  setTargetDate,
  pinned,
  editing,
  description,
  setDescription,
  formRef,
  handleCancel,
  handleSubmit,
  title,
  setPinned,
  handleChange,
}) => {
  function handleFocus(e) {
    // console.log('****', e.target.value);
    if (e.blocks[0].text && e.blocks[0].text.trim() === '') {
      e.blocks[0].text = '';
      setDescription({});
    }
  }
  return (
    <CreateTaskFormWrapper
      onSubmit={() => handleSubmit(formRef)}
      ref={formRef}
      editing={editing}
      as={Form}
    >
      <CreateTaskGroupText>
        <TasksFormTextInput
          editing={editing}
          className="tasksFormTextInput"
          placeholder="Title"
          value={
            formRef.current && formRef.current.getFieldValue('title')
              ? formRef.current.getFieldValue('title')
              : title
          }
          onChange={handleChange}
          name="title"
          maxLength="130"
        />
        <TasksTextareaWrapper>
          <TasksFormTextareaInput
            noBorder
            className="tasksFormTextInput"
            placeholder="Note"
            value={description}
            name="description"
            onChange={setDescription}
            editor
            maxLength="1000"
            minHeight="140px"
          />
        </TasksTextareaWrapper>
      </CreateTaskGroupText>

      <CreateTaskFormGroup>
        <CreateTaskFormTextInputWithIconWrapper className="targetDateCalendar">
          <CreateTaskFormTextInputIconWrapper>
            <IconSVG name="calendar" />
          </CreateTaskFormTextInputIconWrapper>
          <CreateTaskFormCurrentDate>
            <CreateTaskCustomDatePicker
              disabled
              calendarClassName="calendar"
              className="trackedJobFormTextInput"
              selected={createdDate}
              name="currentDate"
              placeholderText="MMMM/DD/YYYY"
              dateFormat="MMM dd, yyyy"
              defaultInput
            />
          </CreateTaskFormCurrentDate>
          <CreateTaskCustomDatePicker
            selected={targetDate}
            onChange={setTargetDate}
            editing={editing}
            calendarClassName="calendar"
            className="trackedJobFormTextInput"
            name="targetDate"
            placeholderText="Target Date"
            dateFormat="MMM dd, yyyy"
            popperProps={{
              positionFixed: true,
            }}
            popperPlacement="bottom"
            autoComplete="off"
            minDate={new Date()}
            defaultInput
          />
        </CreateTaskFormTextInputWithIconWrapper>

        <CustomCheckbox
          className="pinTaskLabel"
          color="#989e99"
          checked={pinned}
          onChange={e => setPinned(e.target.checked)}
          label={pinned ? 'Unpin this task' : 'Pin this task'}
          name="pinned"
        />
      </CreateTaskFormGroup>

      <CreateTaskActions>
        <CreateTaskModalActionButton
          className="trackedJobModalActionButton"
          label="Cancel"
          type="button"
          size="md"
          handleClick={handleCancel}
          variant="outlineSecondary"
        />
        <CreateTaskModalActionButton
          className="trackedJobModalActionButton"
          label="Save"
          type="submit"
          size="md"
          variant="outlinePrimary"
        />
      </CreateTaskActions>
    </CreateTaskFormWrapper>
  );
};

NewTask.propTypes = {
  createdDate: PropTypes.instanceOf(Date),
  targetDate: PropTypes.instanceOf(Date),
  setTargetDate: PropTypes.func,
  setPinned: PropTypes.func,
  setDescription: PropTypes.func,
  pinned: PropTypes.bool,
  editing: PropTypes.bool,
  description: PropTypes.string,
  title: PropTypes.string,
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  formRef: PropTypes.shape({
    /* eslint-disable react/forbid-prop-types */
    current: PropTypes.any,
  }),
};

NewTask.defaultProps = {
  handleCancel: () => null,
  handleSubmit: () => null,
  setPinned: () => null,
  setTargetDate: () => null,
  setDescription: () => null,
  handleChange: () => null,
  pinned: false,
  targetDate: null,
  editing: false,
  description: '',
  title: '',
  createdDate: new Date(),
  formRef: null,
};

export default NewTask;

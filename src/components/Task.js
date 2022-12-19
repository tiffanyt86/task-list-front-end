import PropTypes from 'prop-types';
import React from 'react';
import './Task.css';

const Task = (props) => {
  const completeTaskButtonClick = () => {
    const updatedTask = {
      key: props.id,
      id: props.id,
      title: props.title,
      isComplete: !props.isComplete,
    };
    props.onUpdateTask(updatedTask);
  };

  const deleteButtonClick = () => {
    console.log('in DELETE BUTTON CLICK!');
    const taskDelete = {
      key: props.id,
      id: props.id,
      title: props.title,
      isComplete: props.isComplete,
    };
    props.onDelete(taskDelete);
  };

  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => completeTaskButtonClick()}
      >
        {props.title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => deleteButtonClick()}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

export default Task;

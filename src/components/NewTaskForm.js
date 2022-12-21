import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = (props) => {
  const [formField, setformField] = useState({
    title: '',
    description: '',
  });

  const onTitleChange = (event) => {
    setformField({
      ...formField,
      title: event.target.value,
    });
  };

  const onDescriptionChange = (event) => {
    setformField({
      ...formField,
      description: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    props.onAddTask(formField.title, formField.description);
    setformField({
      title: '',
      description: '',
    });
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formField.title}
            onChange={onTitleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={formField.description}
            onChange={onDescriptionChange}
          ></input>
        </div>
        <input type="submit" value="Add New Task"></input>
      </form>
    </div>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;

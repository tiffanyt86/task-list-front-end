import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const kDefaultFormState = {
  title: '',
  description: '',
};

const NewTaskForm = (props) => {
  const [formField, setformField] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formField, [fieldName]: fieldValue };

    setformField(newFormData);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    props.onAddTask(formField);
    setformField(kDefaultFormState);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formField.title}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formField.description}
            onChange={handleChange}
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

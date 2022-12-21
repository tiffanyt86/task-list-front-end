import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm.js';

import './App.css';

// HELPER FUNCTIONS

// const kBaseUrl = 'https://task-list-api-c17.herokuapp.com';
const kBaseUrl = 'http://127.0.0.1:5000';

const convertTaskApi = (task) => {
  const { id, is_complete: isComplete, title, description } = task;
  return { id, isComplete, title, description };
};

const getAllTasksApi = () => {
  return axios
    .get(`${kBaseUrl}/tasks`)
    .then((response) => {
      return response.data.map(convertTaskApi);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
};

const updateTasksApi = (id, isComplete) => {
  const endpoint = isComplete ? 'mark_complete' : 'mark_incomplete';

  return axios
    .patch(`${kBaseUrl}/tasks/${id}/${endpoint}`)
    .then((response) => {
      return convertTaskApi(response.data.task);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
};

const deleteTaskApi = (id) => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`).catch((error) => {
    console.log(error.response.data.message);
  });
};

const addTaskApi = (title, description) => {
  const newTask = {
    title: title,
    description: description,
  };
  return axios
    .post(`${kBaseUrl}/tasks`, newTask)
    .then((response) => {
      return convertTaskApi(response.data.task);
    })
    .catch((error) => {
      console.log(error);
    });
};

// START OF APP COMPONENT

const App = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    // console.log('in useEffect!');
    updateTasks();
  }, []);

  const updateTasks = () => {
    return getAllTasksApi()
      .then((tasks) => {
        setTaskData(tasks);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const toggleCompleteTask = (id) => {
    const task = taskData.find((task) => task.id === id);
    if (!task) {
      return Promise.resolve();
    }
    return updateTasksApi(id, !task.isComplete)
      .then((newTask) => {
        setTaskData((oldTask) => {
          return oldTask.map((task) => {
            if (task.id === newTask.id) {
              return newTask;
            }
            return task;
          });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const deleteTask = (id) => {
    return deleteTaskApi(id)
      .then(() => {
        setTaskData((oldTasks) => {
          return oldTasks.filter((task) => task.id !== id);
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const addTask = (title, description) => {
    return addTaskApi(title, description)
      .then((newTask) => {
        setTaskData([...taskData, newTask]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={taskData}
              onCompleteTask={toggleCompleteTask}
              onDelete={deleteTask}
            />
          }
          <NewTaskForm onAddTask={addTask} />
        </div>
      </main>
    </div>
  );
};

export default App;

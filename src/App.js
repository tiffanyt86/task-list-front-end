import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

// HELPER FUNCTIONS

const baseURL = 'https://task-list-api-c17.herokuapp.com';

const convertTask = (task) => {
  const { id, is_complete: isComplete, title } = task;
  return { id, isComplete, title };
};

const getAllTasksAPI = () => {
  return axios
    .get(`${baseURL}/tasks`)
    .then((response) => {
      return response.data.map(convertTask);
    })
    .catch((error) => {
      console.error(error.response.data.message);
    });
};

const updateTasksAPI = (id, isComplete) => {
  const endpoint = isComplete ? 'mark_complete' : 'mark_incomplete';

  return axios
    .patch(`${baseURL}/tasks/${id}/${endpoint}`)
    .then((response) => {
      return convertTask(response.data.task);
    })
    .catch((error) => {
      console.error(error.response.data.message);
    });
};

const deleteTaskAPI = (id) => {
  return axios.delete(`${baseURL}/tasks/${id}`).catch((error) => {
    console.error(error.response.data.message);
  });
};

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
  {
    id: 3,
    title: 'Study React',
    isComplete: false,
  },
];

// START OF APP COMPONENT

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const updateTasks = () => {
    return getAllTasksAPI()
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
    return updateTasksAPI(id, !task.isComplete)
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
    return deleteTaskAPI(id)
      .then(() => {
        setTaskData((oldTasks) => {
          return oldTasks.filter((task) => task.id !== id);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    console.log('in useEffect!');
    updateTasks();
  }, []);

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
        </div>
      </main>
    </div>
  );
};

export default App;

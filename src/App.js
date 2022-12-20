import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

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

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const updateTaskData = (updatedTask) => {
    const tasks = taskData.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });
    setTaskData(tasks);
  };

  const completeTaskButtonClick = (id) => {
    const updatedTask = taskData.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    setTaskData(updatedTask);
  };

  const deleteTask = (id) => {
    const tasks = taskData.filter((task) => task.id !== id);
    setTaskData(tasks);
  };

  const getAllTasks = () => {
    axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  useEffect(() => {
    console.log('in useEffect!');
    getAllTasks();
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
              onUpdateTask={updateTaskData}
              onCompleteTaskButtonClick={completeTaskButtonClick}
              onDelete={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;

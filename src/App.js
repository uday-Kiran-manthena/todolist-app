import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  // Initialize tasks from localStorage with useState functional update
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    return storedTasks || [];
  });

  // Sync tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  function addTask(name) {
    if (name.trim() === "") {
      return; // Do not add a task if the name is an empty string
    }
    setTasks((prev) => [...prev, { name: name, done: false }]);
  }

  // Function to remove a task by index
  function removeTask(indexToRemove) {
    setTasks((prev) =>
      prev.filter((taskObject, index) => index !== indexToRemove)
    );
  }

  // Function to update the 'done' status of a task
  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  // Calculate the number of completed tasks
  const numberComplete = tasks.filter((t) => t.done).length;
  // Calculate the total number of tasks
  const numberTotal = tasks.length;

  // Function to get the message based on the completion percentage
  function getMessage() {
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) {
      return "Try to do at least one! 🙏";
    }
    if (percentage === 100) {
      return "Nice job for today! 🏝";
    }
    return "Keep it going 💪🏻";
  }

  // Function to rename a task by index
  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  return (
    <div className="todolist-container">
      <h1>
        {numberComplete}/{numberTotal} Complete
      </h1>
      <h2>{getMessage()}</h2>
      {/* Render the TaskInput component to allow adding new tasks */}
      <TaskInput onAdd={addTask} />
      {/* Render the list of tasks using the TaskList component */}
      {tasks.map((task, index) => (
        <TaskList
          key={index} // Ensure each child in a list has a unique key prop
          {...task} // Spread the task object properties as props
          onRename={(newName) => renameTask(index, newName)} // Pass rename function
          onTrash={() => removeTask(index)} // Pass remove function
          onToggle={(done) => updateTaskDone(index, done)} // Pass update done function
        />
      ))}
    </div>
  );
}

export default App;

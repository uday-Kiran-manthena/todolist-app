import { useState } from "react";
import "./index.css";

const TaskInput = (props) => {
  const { onAdd } = props; // Destructure onAdd function from props
  const [taskName, setTaskName] = useState(""); // State to hold the input value

  // Handle form submission
  function handleSubmit(ev) {
    ev.preventDefault(); // Prevent the default form submission behavior
    onAdd(taskName); // Call the onAdd function passed as a prop with the current task name
    setTaskName(""); // Reset the input field to an empty string
  }

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* Form submission handler */}
      <button type="submit">+</button> {/* Submit button */}
      <input
        type="text"
        value={taskName} // Bind the input value to taskName state
        onChange={(ev) => setTaskName(ev.target.value)} // Update the state on input change
        placeholder="Your next task..." // Placeholder text
      />
    </form>
  );
};

export default TaskInput;

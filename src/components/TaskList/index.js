import { useState } from "react";
import Checkbox from "../Checkbox/index"; // Importing Checkbox component
import "./index.css"; // Importing component-specific styles

export default function TaskList({ name, done, onToggle, onTrash, onRename }) {
  const [editMode, setEditMode] = useState(false); // State to manage edit mode

  return (
    <div className={"task " + (done ? "done" : "")}>
      {/* Checkbox component for task completion status */}
      <Checkbox checked={done} onClick={() => onToggle(!done)} />

      {/* Display task name when not in edit mode */}
      {!editMode && (
        <div className="task-name" onClick={() => setEditMode((prev) => !prev)}>
          <span>{name}</span>
        </div>
      )}

      {/* Form for editing task name when in edit mode */}
      {editMode && (
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            setEditMode(false); // Exit edit mode on form submission
          }}
        >
          <input
            type="text"
            value={name} // Display current task name in input field
            onChange={(ev) => onRename(ev.target.value)} // Handle name change
          />
        </form>
      )}

      {/* Button to delete task */}
      <button className="trash" onClick={onTrash}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </button>
    </div>
  );
}

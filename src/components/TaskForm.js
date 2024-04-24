// TaskForm.js
import React, { useState, useEffect, useRef } from "react";
import "./TaskForm.css";

const TaskForm = ({ onAddTask, editingTask, onClose, userObjectId }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [formOpen, setFormOpen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask.task);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        // Clicked outside of the form, close the form
        if (task || priority !== "low" || dueDate) {
          // If there are unsaved changes, show confirmation dialog
          setShowConfirmation(true);
        } else {
          // Otherwise, close the form directly
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [task, priority, dueDate, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // Prevent multiple submissions

    setSubmitting(true); // Set submitting state to true to prevent further submissions
    const token = window.localStorage.getItem("token");

    // Use the token to identify the user
    const result = await fetch("https://task-manager-backend-22av.onrender.com/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        task,
        priority,
        dueDate,
      }),
    });

    const data = await result.json();

    if (data.status === "ok") {
      // Task created successfully, you can now update the UI or take any other action
      onAddTask(data.data);
      const existingTasks =
        JSON.parse(window.localStorage.getItem("tasks")) || [];
      const updatedTasks = [...existingTasks, data.data];
      window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTask("");
      setPriority("low");
      setDueDate("");
      setSubmitting(false); // Reset submitting state after successful submission
      onClose(); // Close the form after successful submission
    } else {
      // Handle error case
      console.error("Error creating task:", data.data);
      setSubmitting(false); // Reset submitting state after unsuccessful submission
    }
  };

  const handleCloseForm = () => {
    if (task || priority !== "low" || dueDate) {
      // If there are unsaved changes, show confirmation dialog
      setShowConfirmation(true);
    } else {
      // Otherwise, close the form directly
      onClose();
    }
  };

  const handleConfirmation = (discard) => {
    if (discard) {
      // Discard changes and close the form
      setShowConfirmation(false);
      setTask("");
      setPriority("low");
      setDueDate("");
      onClose();
    } else {
      // Close the confirmation dialog
      setShowConfirmation(false);
    }
  };

  return formOpen ? (
    <div className="task-form-container">
      <div ref={formRef}>
        <form className="Task_form" onSubmit={handleSubmit}>
          <span
            className="close_icon"
            style={{ color: "#000", display: "flex", justifyContent: "right" }}
            onClick={handleCloseForm}
          >
            &#10006;
          </span>
          <label className="taskForm_label">
            Task:
            <input
              className="taskForm_input"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </label>
          <label className="taskForm_label">
            Priority:
            <select
              className="taskForm_select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label className="taskForm_label">
            Due Date:
            <input
              className="taskForm_input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min="2023-20-11"
            />
          </label>
          <button className="Addtask_button" type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Add Task'}
          </button>
        </form>
        {showConfirmation && (
          <div className="confirmation-dialog">
            <p>Discard unsaved changes?</p>
            <button onClick={() => handleConfirmation(true)}>Discard</button>
            <button onClick={() => handleConfirmation(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default TaskForm;

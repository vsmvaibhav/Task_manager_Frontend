import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./TaskList.css";

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fiveDates, setFiveDates] = useState([]);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

  useEffect(() => {
    generateFiveDates();
  }, [selectedDate]);

  useEffect(() => {
    filterTasksForSelectedDate();
  }, [selectedDate, tasks]);

  useEffect(() => {
    // Load completed tasks from local storage on component mount
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    // Mark tasks as completed based on completedTasks array
    const updatedTasks = tasksForSelectedDate.map(task => ({
      ...task,
      completed: completedTasks.includes(task._id)
    }));
    setTasksForSelectedDate(updatedTasks);
  }, [tasksForSelectedDate]); // Dependency on tasksForSelectedDate ensures it's updated only when tasksForSelectedDate changes

  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDifference = due.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysRemaining;
  };

  const generateFiveDates = () => {
    const dates = [];
    for (let i = -2; i <= 2; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    setFiveDates(dates);
  };

  const filterTasksForSelectedDate = () => {
    const selectedDateString = selectedDate.toDateString();
    const filteredTasks = tasks.filter(
      (task) => new Date(task.dueDate).toDateString() === selectedDateString
    );
    setTasksForSelectedDate(filteredTasks);
  };

  const handleDateChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + increment);
    setSelectedDate(newDate);
  };

  const handleTaskCompleted = (taskId) => {
    // Toggle completed state of the task
    const updatedTasks = tasksForSelectedDate.map(task => {
      if (task._id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasksForSelectedDate(updatedTasks);

    // Update completedTasks in local storage
    const completedTasks = updatedTasks.filter(task => task.completed).map(task => task._id);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  };

  return (
    <>
      <div className="task-list-container">
        <div className="date-navigation">
          <button onClick={() => handleDateChange(-1)}>{'<'}</button>
          {fiveDates.map((date, index) => (
            <div key={index} className={date.getTime() === selectedDate.getTime() ? 'selected-date' : ''} onClick={() => setSelectedDate(date)}>
              <div>{date.toDateString()}</div>
            </div>
          ))}
          <button onClick={() => handleDateChange(1)}>{'>'}</button>
        </div>
        <div className="task-list">
          {tasksForSelectedDate.length > 0 ? (
            tasksForSelectedDate.map((task, index) => (
              <div key={index} className={`task-box ${task.completed ? 'completed' : ''}`}>
                <div className={`priority-tag ${task.priority.toLowerCase()}-priority`}></div>
                <div className="task-info">
                  <div>Name: <b className="Task_List_Name">{task.task}</b> </div>
                  <div>Priority: {task.priority}</div>
                  <div>Due Date: {task.dueDate}</div>
                  <div>Days Remaining: {calculateDaysRemaining(task.dueDate)}</div>
                  <div>
                    <button className="edit_button" onClick={() => onEditTask(task)}>
                      <FaEdit />
                    </button>
                    <button className="delete_button" onClick={() => onDeleteTask(task._id)}>
                      <FaTrash />
                    </button>
                    {!task.completed && (
                      <button className="complete_button" onClick={() => handleTaskCompleted(task._id)}>
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks for selected date</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskList;

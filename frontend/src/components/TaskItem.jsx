import { useState } from "react";
import { updateTask, deleteTask } from "../services/taskService";

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Update task status
  const handleStatusChange = async (e) => {
    try {
      setUpdating(true);

      await updateTask(task._id, {
        status: e.target.value,
      });

      onTaskUpdated();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update task");
    } finally {
      setUpdating(false);
    }
  };

  // Delete task
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);

      await deleteTask(task._id);

      onTaskDeleted();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="task-item">
      <div className="task-header">
        <h3>{task.title}</h3>

        <span className={`priority ${task.priority}`}>{task.priority}</span>
      </div>

      <p>{task.description || "No description provided"}</p>

      <div className="task-details">
        <span>
          Due Date:{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "Not set"}
        </span>
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={handleStatusChange}
          disabled={updating || deleting}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={deleting || updating}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const taskData = {
        ...formData,
        title: formData.title.trim(),
        dueDate: formData.dueDate || undefined,
      };

      await createTask(taskData);

      // Reset form after successful creation
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
      });

      // Refresh task list
      await onTaskCreated();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create task",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form">
      <h2>Create New Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
        />

        <label>Priority</label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <label>Due Date</label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          disabled={loading}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

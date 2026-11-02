import { useEffect, useState } from "react";

import { getTasks } from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch tasks with filters and sorting
  const fetchTasks = async (
    status = statusFilter,
    sort = sortBy,
    order = sortOrder,
  ) => {
    try {
      setLoading(true);
      setError("");

      const filters = {};

      if (status !== "all") {
        filters.status = status;
      }

      if (sort) {
        filters.sortBy = sort;
        filters.order = order;
      }

      const response = await getTasks(filters);
      setTasks(response.data.tasks);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    fetchTasks(value, sortBy, sortOrder);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    fetchTasks(statusFilter, value, sortOrder);
  };

  const handleOrderChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    fetchTasks(statusFilter, sortBy, value);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div>
          <h1>Personal Task Manager</h1>
          <p>Organize your work and stay productive.</p>
        </div>

        <div className="task-count">Total Tasks: {tasks.length}</div>
      </header>

      {/* Centered form and filters */}
      <section className="controls-section">
        <div className="form-container">
          <TaskForm onTaskCreated={() => fetchTasks()} />
        </div>

        <div className="filters-container">
          <div className="filter-section">
            <h3>Filter & Sort</h3>

            <div>
              <label>Filter by Status</label>

              <select value={statusFilter} onChange={handleStatusChange}>
                <option value="all">All Tasks</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label>Sort By</label>

              <select value={sortBy} onChange={handleSortChange}>
                <option value="">Default</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div>
              <label>Sort Order</label>

              <select
                value={sortOrder}
                onChange={handleOrderChange}
                disabled={!sortBy}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Task board below the controls */}
      <section className="task-board">
        <div className="board-header">
          <h2>My Tasks</h2>
          <span>{tasks.length} tasks</span>
        </div>

        {loading && <p>Loading tasks...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <TaskList
            tasks={tasks}
            onTaskUpdated={() => fetchTasks()}
            onTaskDeleted={() => fetchTasks()}
          />
        )}
      </section>
    </div>
  );
}

export default App;

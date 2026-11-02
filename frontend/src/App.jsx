import { useEffect, useState } from "react";
import { getTasks } from "./services/taskService";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks when the component loads
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTasks();

      setTasks(response.data.tasks);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch tasks. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <h1>Personal Task Manager</h1>
      <p>Organize your work and stay productive.</p>

      {loading && <p>Loading tasks...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && <p>Total Tasks: {tasks.length}</p>}
    </div>
  );
}

export default App;

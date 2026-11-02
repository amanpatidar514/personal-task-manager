
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

// Get all tasks
export const getTasks = () => {
  return axios.get(API_URL);
};

// Create a task
export const createTask = (taskData) => {
  return axios.post(API_URL, taskData);
};

// Update a task
export const updateTask = (id, taskData) => {
  return axios.put(`${API_URL}/${id}`, taskData);
};

// Delete a task
export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

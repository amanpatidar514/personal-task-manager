
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

// Get tasks with optional filtering and sorting
export const getTasks = (filters = {}) => {
  return axios.get(API_URL, {
    params: filters
  });
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

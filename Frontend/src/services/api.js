import axios from "axios";

const API = "http://localhost:5000/api/tasks";

export const getTasks = () => axios.get(API);

export const addTask = (task) => axios.post(API, task);

export const deleteTask = (id) =>
  axios.delete(`${API}/${id}`);

export const completeTask = (id) =>
  axios.put(`${API}/${id}`);
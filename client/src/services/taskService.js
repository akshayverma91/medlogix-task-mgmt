import api from "../api/taskApi";

export const fetchTasks = async (status, assignee) => {
  const params = {};
  if(status) params.status = status;
  if(assignee) params.assignee = assignee;
  const res = await api.get("/api/tasks", { params });
  return res.data;
};

export const createTask = async (task) => {
  const res = await api.post("/api/tasks", task);
  return res.data;
};

export const updateTask = async (id, updated) => {
  const res = await api.put(`/api/tasks/${id}`, updated);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(`/api/tasks/${id}`);
  return res.data;
};

export const fetchUsers = async () => {
  const res = await api.get("/api/users");
  return res.data;
};

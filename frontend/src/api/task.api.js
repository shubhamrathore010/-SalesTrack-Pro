import axios  from "./axiosInstance";

export const createTask = (data) => 
    axios.post("/tasks", data);

export const getTasksByLead = (leadId) =>
       axios.get(`/tasks/lead/${leadId}`)


export const getMyTasks = () => 
    axios.get("/tasks");

export const updateTask = (id, data) =>
    axios.patch(`/tasks/${id}`, data);
 
export const completeTask = (id) =>
    axios.patch(`/tasks/${id}/complete`);



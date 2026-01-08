import axios from "./axiosInstance";

export const  createInteraction = (data) => 
    axios.post("/interactions", data);

export const getInteractionsByLead = (leadId) =>
    axios.get(`/interactions?lead=${leadId}`);

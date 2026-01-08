import axios from "./axiosInstance";

export const getLeads = () => axios.get("/leads");

export const getLeadById = (id) => 
    axios.get(`/leads/${id}`);

export const updateLead = (id, data) => 
    axios.put(`/leads/${id}`, data)

export const createLead = (data) => axios.post("/leads", data);

export const updateLeadStatus = (id, status) => 
    axios.patch(`/leads/${id}/status`, { status })

export const  deleteLead = (id) => 
    axios.delete(`/leads/${id}`)


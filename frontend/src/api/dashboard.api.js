import axios from "./axiosInstance";

export const getLeadsByStatus = () => 
    axios.get("/dashboard/leads/status");

export const getLeadsBySource = () => 
    axios.get("/dashboard/leads/source")


export const getLeadsPerSalesRep = () => 
    axios.get("/dashboard/leads/per-sales-rep")

export const getMonthlyRevenue = () =>
    axios.get("/dashboard/revenue/monthly")

export const getConversionRate = () =>
    axios.get("/dashboard/conversion-rate")


export const getOverdueTasks = () =>
    axios.get("/dashboard/tasks/overdue")


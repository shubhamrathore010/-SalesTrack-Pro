import axios from "./axiosInstance"

export const getUsers = () => axios.get("/users")

export const createUser = (data) => 
    axios.post("/users", data)

export const disableUser = (id) =>
    axios.patch(`/users/${id}/disable`);


export const updateUserStatus = (id, isActive) =>
    axios.patch(`/users/${id}/status`, { isActive })


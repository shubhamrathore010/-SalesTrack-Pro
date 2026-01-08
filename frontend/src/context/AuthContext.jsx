import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosInstance";
 
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    //  Load user on app refresh
    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token) {
            //  Promise.resolve().then(() =>
                 setLoading(false)
            return;
        }

        axios
        .get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {
            localStorage.removeItem("token")
            setUser(null)
        })
        .finally(() => setLoading(false))
    }, []);

//   Login


const login = async (email, password) => {
    try {
        const res = await axios.post("/auth/login", { email, password});
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        return res.data.user;
    } catch (err) {
        // Re-throw so callers (like the login page) can handle and stop loading state
        throw err;
    }
}

//   Logout

const logout = () => {
   localStorage.removeItem("token")
   setUser(null)
}

if(loading) {
    return <p>Checking authenctication...</p>
}

return (
    <AuthContext.Provider
    value={{
        user,
        isAuthenticated: !!user,
        // loading,
        login,
        logout
    }} >
       {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
};
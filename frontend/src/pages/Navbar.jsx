// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { isAdmin } from "../utils/permissions";


// const Navbar = () => {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//       logout();
//       navigate("/login")
//     };


//     return (
//         <nav style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
//           {isAdmin(user) && (
//             <>
//           <Link to={"/dashboard"}>Dashboard</Link> 
//             </>
//           )}
//           {" | "}

//           <Link to="/leads">Leads</Link> {" | "}

//           <button onClick={handleLogout}>Logout</button>
//         </nav>
//     )
// }

// export default Navbar;
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import CreateLead from "./pages/CreateLead";
import EditLead from "./pages/EditLead";
import LeadDetails from "./pages/LeadDetails"
import Unauthorized from "./pages/Unauthorized";
import Layout from "./Layout/Layout"
import NotFound from "./pages/NotFound";
import { Navigate } from "react-router-dom";
import AdminRoute from "./routes/AdminRoutes";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";


function App() {
  const { isAuthenticated } = useAuth();

  const { user } = useAuth();

  return (
    <Routes>

{/* ROOT  */}
      <Route
        path="/"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : user.role === "admin" ? (
            <Navigate to="/dashboard" replace />
          ) :
            <Navigate to="/leads" replace />
        }
      />

      {/* login */}
      <Route   path="/login" element={ <Login />} />

      {/* Admin protected */}
      <Route
        path="/dashboard"
        element={
        <ProtectedRoute>
          <AdminRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </AdminRoute>
        </ProtectedRoute>
        }
      />

       <Route
        path="/users"
        element={
        <ProtectedRoute>
          <AdminRoute>
            <Layout>
              <Users />
            </Layout>
          </AdminRoute>
        </ProtectedRoute>
        }
      />


      <Route
        path="/users/new"
        element={
        <ProtectedRoute>
          <AdminRoute>
            <Layout>
              <CreateUser />
            </Layout>
          </AdminRoute>
        </ProtectedRoute>
        }
      />

  {/* SHARED: ADMIN + SALES */}
      <Route 
      path="/leads"
        element={
        <ProtectedRoute>
            <Layout>
              <Leads />
            </Layout>
        </ProtectedRoute>
        }
      />


      <Route
        path="/leads/new"
        element={
       <ProtectedRoute>
            <Layout>
              <CreateLead />
            </Layout> 
       </ProtectedRoute>
        }
      />

      <Route
        path="/leads/:id"
        element={
         <ProtectedRoute>
            <Layout>
              <LeadDetails />
            </Layout>
         </ProtectedRoute>
        }
      />

      <Route
        path="/leads/:id/edit"
        element={
      <ProtectedRoute>
        <Layout>
           <EditLead />
        </Layout>
      </ProtectedRoute>  
      }
   />

      <Route
        path="/tasks"
        element={
         <ProtectedRoute>
            <Layout>
              <Tasks />
            </Layout>
        </ProtectedRoute>
        }
      />


{/* MISC */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default App;
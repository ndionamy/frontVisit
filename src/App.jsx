import {BrowserRouter,Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard"
import './App.css';
import AgentDashboard from "./pages/AgentDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import AgencesList from "./components/agences/AgencesList";
import List from "./components/agents/List";
import Add from "./components/agents/Add";
import VisiteursList from "./components/visiteurs/VisiteursList";
import AddAgence from "./components/agences/AddAgence";
import EditAgence from "./components/agences/EditAgence";
import  View  from "./components/agents/View";
import Edit from "./components/agents/Edit";


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/admin-dashboard" element={ 
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin"]}>
            <AdminDashboard />
          </RoleBaseRoutes>
      </PrivateRoutes>
        }>
          <Route index element = {<AdminSummary/>}></Route>

          <Route path="/admin-dashboard/agences" element = {<AgencesList/>}></Route>
          <Route path="/admin-dashboard/add-agence" element = {<AddAgence/>}></Route>
          <Route path="/admin-dashboard/agence/:id" element = {<EditAgence/>}></Route>

          <Route path="/admin-dashboard/agents" element = {<List/>}></Route>
          <Route path="/admin-dashboard/add-agent" element = {<Add/>}></Route>
          <Route path="/admin-dashboard/agent/:id" element = {<View/>}></Route>
          <Route path="/admin-dashboard/agent/edit/:id" element = {<Edit/>}></Route>

          <Route path="/admin-dashboard/visiteurs" element = {<VisiteursList/>}></Route>


        </Route>
      <Route path="/agent-dashboard" element={<AgentDashboard />}></Route>



    </Routes>
    </BrowserRouter>
  )
}

export default App

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { createTask } from "../api/task.api";
import { getLeadById } from "../api/lead.api";
import { createInteraction, getInteractionsByLead } from "../api/interaction.api";
import { getTasksByLead } from "../api/task.api";
import { getUsers } from "../api/user.api";


import LeadSummary from "../components/LeadSummary";
import InteractionForm from "../components/InteractionForm";
import InteractionList from "../components/InteractionList";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const LeadDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [lead, setLead] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreateInteraction = async (data) => {
    await createInteraction({
      ...data,
      lead: id,
      createdBy: user.id,
    });

    const res = await getInteractionsByLead(id);
    setInteractions(res.data || []);
  };

  const handleCreateTask = async (data) => {
  await createTask({ 
    lead: id,                // ✅ REQUIRED
    dueDate: data.dueDate,   // ✅ REQUIRED
    ...(data.assignedTo && { assignedTo: data.assignedTo }),
  });
  const res = await getTasksByLead(id);
  setTasks(res.data);
};


  const refreshTasks = async () => {
    const res = await getTasksByLead(id);
    setTasks(res.data || []);
  };

  useEffect(() => {
    Promise.all([
      getLeadById(id),
      getInteractionsByLead(id),
      getTasksByLead(id),
    ])
      .then(([leadRes, intRes, taskRes]) => {
        setLead(leadRes.data);
        setInteractions(intRes.data || []);
        setTasks(taskRes.data || []);
      })
      .finally(() => setLoading(false));
  }, [id]);

useEffect(() => {
  if (user.role === "admin") {
    getUsers().then((res) => setUsers(res.data || []));
  }
}, [user]);



  if (loading) return <p>Loading...</p>;
  if (!lead) return <p>Lead not found</p>;

  return (
    <>
      {/* LEAD SUMMARY (TOP) */}
      <LeadSummary lead={lead} />

      {/* INTERACTIONS */}
      <InteractionForm onSubmit={handleCreateInteraction} />
      <InteractionList interactions={interactions} />

      {/* TASKS */}
      <TaskList tasks={tasks} onRefresh={refreshTasks} />

<TaskForm
  leadId={id}
  users={users}               // fetched from /api/users
  isAdmin={user.role === "admin"}
  onSubmit={handleCreateTask}
/>
    </>
  );
};

export default LeadDetails;

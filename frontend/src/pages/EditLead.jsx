import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLeadById, updateLead } from "../api/lead.api";
import LeadForm  from "../components/LeadForm";

const EditLead = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getLeadById(id)
        .then(res => setLead(res.data))
        .finally(() => setLoading(false))
    }, [id])

    const handleUpdate = async (data) => {
        await updateLead(id, data);
        navigate("/leads")
    }

    if (loading) return <p>Loading...</p>
    
    if(!lead) return <p>Lead not found</p>

    return (
      <div style={{ padding: 24 }}>
      <h1>Edit Lead</h1>
      
      <LeadForm
      initialData={lead}
      onSubmit={handleUpdate}
      submitText="Update Lead"
      />
      </div>
    )
}

export default EditLead;


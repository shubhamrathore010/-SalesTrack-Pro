import { useState } from "react";

const LeadInfoCard = ({ lead, onStatusChange }) => {

  const [status , setStatus ] = useState(lead.status);
  const [saving, setSaving] = useState(false)

  const handleUpdate = async () => {
    setSaving(true)
    await onStatusChange(status);
    setSaving(false);
  };


    return (
        <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 24 }}>
          <h2>{lead.name}</h2>
         <label>Status</label>   

      <select 
         value={status}
         onChange={(e) => setStatus(e.target.value)}
         >
        <option value="new">New</option>
        <option value="qualified">Qualified</option>
        <option value="lost">Lost</option>
      </select>      
         
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Source:</strong> {lead.source}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p>
            <strong>Assigned To:</strong>{" "}
            {lead.assignedTo?.name || "Unassinged"} 
          </p>

          <button onClick={handleUpdate} disabled={saving}>
            {saving ? "Updating..." : "Update Status"}
          </button>
       </div>  
    )
}

export default LeadInfoCard;
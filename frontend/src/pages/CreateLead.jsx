import { useNavigate } from "react-router-dom";
import { createLead } from "../api/lead.api";
import LeadForm from "../components/LeadForm";

const CreateLead = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await createLead(data);
    navigate("/leads");
  };

  return (
    <>
      <div className="page-header">
        <h1>Create Lead</h1>
      </div>

      <LeadForm
        onSubmit={handleCreate}
        submitText="Create Lead"
      />
    </>
  );
};

export default CreateLead;

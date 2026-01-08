import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getLeads, deleteLead } from "../api/lead.api";
import LeadTable from "../components/LeadTable"



const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const loadLeads = async () => {
        try {
            setLoading(true);
            const res = await getLeads();
            setLeads(res.data || []);
        } catch (err) {
            setError("Failed to load leads")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadLeads();
    }, []);


    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure want to delete this lead?"
        );
        if (!confirmed) return;

        try {
            await deleteLead(id);
            setLeads((prev) => prev.filter((l) => l._id !== id))
        } catch {
            alert("Failed to delete lead")
        }
    };

    return (
        <>
            <div className="page-header">
                <h1>Leads</h1>

                <button style={{
                    padding: "10px", margin: "10px", "background-color": "#5783e2ff", border: "none",
                    color: "#ffffff",
                    "border-radius": "6px",
                    "font-weight": 500,
                    cursor: "pointer",
                    ".input": focus,
                    outline: "none",
                    "border-color": "#2563eb",

                }}
                    onClick={() => navigate("/leads/new")}
                >
                    Create Lead
                </button>
            </div>

            {loading && <p className="muted-text">Loading leads…</p>}

            {error && <p style={{ color: "#dc2626" }}>{error}</p>}

            {!loading && !error && (
                <LeadTable leads={leads} onDelete={handleDelete} />

            )}
        </>
    )
}

export default Leads;
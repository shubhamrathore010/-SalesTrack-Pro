
import { useState } from "react";
import Button from "./Button"
import styles from "./InteractionForm.module.css";

const InteractionForm = ({ onSubmit }) => {
    const [type, setType] = useState("call")
    const [notes, setNotes] = useState("")
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!onSubmit) {
            console.error("InteractionForm: onSubmit missing");
            return;
        }

        if (notes.trim().length < 3) {
            setError("Please add meaningful notes")
            return;
        }

        onSubmit({ type, notes })
        setNotes("");
        setNotes("")
    }

    return (
        <form onSubmit={handleSubmit} className={styles.card}>
<div className={styles.field}>
                <label className={styles.label}>Interaction Type</label>
                <select
                    className={styles.select}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="call">📞 Call</option>
                    <option value="email">📧 Email</option>
                    <option value="meeting">🤝 Meeting</option>
                </select>
            </div>

<div className={styles.field}>
                <label className={styles.label}>Notes</label>
                <textarea
                    className={styles.textarea}
                    placeholder="What happend?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.actions}>
                <Button type="submit">Add Interaction</Button>
            </div>
        </form>
    )
}

export default InteractionForm;
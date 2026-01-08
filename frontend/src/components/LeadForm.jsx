import { useState } from "react";
import Button from "./Button";
import styles from "./LeadForm.module.css";

const LeadForm = ({
  onSubmit,
  initialData = {},
  submitText = "Save",
}) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    source: initialData.source || "website",
    status: initialData.status || "new",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSubmit) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Source</label>
        <select
          className={styles.select}
          name="source"
          value={form.source}
          onChange={handleChange}
        >
          <option value="website">Website</option>
          <option value="referral">Referral</option>
          <option value="ads">Ads</option>
        </select>
      </div>

      <div className={styles.actions}>
        <Button type="submit">{submitText}</Button>
      </div>
    </form>
  );
};

export default LeadForm;

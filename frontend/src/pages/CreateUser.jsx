import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/user.api";
import Button from "../components/Button";
import styles from "./CreateUser.module.css";

const CreateUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUser(form);
      navigate("/users");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Create Sales User</h1>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className={styles.actions}>
            <Button type="submit">Create User</Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("/users")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;

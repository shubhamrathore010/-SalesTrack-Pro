
import { useEffect, useState } from "react";
import { getUsers } from "../api/user.api";
import styles from "./Users.module.css";
import { disableUser } from "../api/user.api";
import { updateUserStatus } from "../api/user.api";
import { useNavigate } from "react-router-dom";


const Users = () => {

    const navigate = useNavigate()

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers()
            .then(res => setUsers(res.data || []))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="muted-text">Loading users…</p>;


    const handleDisable = async (id) => {
        const confirmed = window.confirm(
            "Are you sure want to disable thid user?"
        )

        if (!confirmed) return;

        await disableUser(id)

        setUsers(users =>
            users.map(u =>
                u._id === id ? { ...u, isActive: false } : u
            )
        )
    }

    const handleToggleStatus = async (id, currentStatus) => {
        const confirmed = window.confirm(
            currentStatus
                ? "Disable this user?"
                : "Re-enable this user?"
        );

        if (!confirmed) return;

        const res = await updateUserStatus(id, !currentStatus);

        setUsers(users =>
            users.map(u =>
                u._id === id ? { ...u, isActive: res.data.isActive } : u
            )
        );
    };


    return (
        <>
            <div className="page-header">
                <h1>Users</h1>
                <button
                    className="primary-button"
                    onClick={() => navigate("/users/new")}
                >
                    + Add User
                </button>
                <br />
                <br />
                <span className="muted-text">
                    Manage system users and roles
                </span>

            </div>

            <div className={styles.card}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className={styles.userCell}>
                                    <div className={styles.avatar}>
                                        {user.name[0]}
                                    </div>
                                    <span>{user.name}</span>
                                </td>

                                <td>{user.email}</td>

                                <td>
                                    <span
                                        className={`${styles.badge} ${user.role === "admin"
                                            ? styles.admin
                                            : styles.sales
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`${styles.status} ${user.isActive
                                            ? styles.active
                                            : styles.inactive
                                            }`}
                                    >
                                        {user.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                {/* <td>
                                    {user.isActive && user.role !== "admin" && (
                                        <button
                                            className={styles.disableBtn}
                                            onClick={() => handleDisable(user._id)}
                                        >
                                            Disable
                                        </button>
                                    )}
                                </td> */}
                                <td>
                                    {user.role !== "admin" && (
                                        <button
                                            className={
                                                user.isActive ? styles.disableBtn : styles.enableBtn
                                            }
                                            onClick={() =>
                                                handleToggleStatus(user._id, user.isActive)
                                            }
                                        >
                                            {user.isActive ? "Disable" : "Enable"}
                                        </button>
                                    )}
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <p className="muted-text">No users found</p>
                )}
            </div>
        </>
    );
};

export default Users;

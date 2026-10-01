import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
import Button from "./components/Button";
import Input from "./components/Input";
import Modal from "./components/Modal";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Active");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      role: "Developer",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@gmail.com",
      role: "Designer",
      status: "Active",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Ananya Patel",
      email: "ananya@gmail.com",
      role: "Developer",
      status: "Active",
    },
  ]);

  // -----------------------------
  // Dashboard Statistics
  // -----------------------------

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const developers = users.filter(
    (user) => user.role === "Developer"
  ).length;

  // -----------------------------
  // Search
  // -----------------------------

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // -----------------------------
  // Add User
  // -----------------------------

  function handleAddUser() {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      role.trim() === ""
    ) {
      alert("Please fill all details");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
      status: status,
    };

    setUsers([...users, newUser]);

    resetForm();
    setShowAddUser(false);
  }

  // -----------------------------
  // Edit User
  // -----------------------------

  function handleEditUser(user) {
    setEditingUser(user);

    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);

    setShowEditUser(true);
  }

  // -----------------------------
  // Update User
  // -----------------------------

  function handleUpdateUser() {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      role.trim() === ""
    ) {
      alert("Please fill all details");
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.id === editingUser.id) {
        return {
          ...user,
          name: name.trim(),
          email: email.trim(),
          role: role.trim(),
          status: status,
        };
      }

      return user;
    });

    setUsers(updatedUsers);

    resetForm();
    setEditingUser(null);
    setShowEditUser(false);
  }

  // -----------------------------
  // Delete User
  // -----------------------------

  function handleDeleteUser(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);

    setSelectedUser(null);
  }

  // -----------------------------
  // Reset Form
  // -----------------------------

  function resetForm() {
    setName("");
    setEmail("");
    setRole("");
    setStatus("Active");
  }

  // -----------------------------
  // Close Add Modal
  // -----------------------------

  function handleCloseAddUser() {
    setShowAddUser(false);
    resetForm();
  }

  // -----------------------------
  // Close Edit Modal
  // -----------------------------

  function handleCloseEditUser() {
    setShowEditUser(false);
    setEditingUser(null);
    resetForm();
  }

  // -----------------------------
  // Dashboard
  // -----------------------------

  function renderDashboard() {
    return (
      <>
        <header className="header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin 👋</p>
          </div>

          <Button
            text="+ Add User"
            onClick={() => setShowAddUser(true)}
            type="primary"
          />
        </header>

        <section className="stats">
          <Card
            title="Total Users"
            value={totalUsers}
            icon="👥"
            change="All registered users"
          />

          <Card
            title="Active Users"
            value={activeUsers}
            icon="🟢"
            change="Currently active"
          />

          <Card
            title="Inactive Users"
            value={inactiveUsers}
            icon="🔴"
            change="Currently inactive"
          />

          <Card
            title="Developers"
            value={developers}
            icon="💻"
            change="Developer users"
          />
        </section>

        <section className="users-section">
          <div className="section-header">
            <div>
              <h2>Recent Users</h2>
              <p>Manage your registered users</p>
            </div>

            <Input
              placeholder="Search users..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <UserTable />
        </section>
      </>
    );
  }

  // -----------------------------
  // Users Page
  // -----------------------------

  function renderUsers() {
    return (
      <>
        <header className="header">
          <div>
            <h1>Users</h1>
            <p>Manage all registered users</p>
          </div>

          <Button
            text="+ Add User"
            onClick={() => setShowAddUser(true)}
            type="primary"
          />
        </header>

        <section className="users-section">
          <div className="section-header">
            <div>
              <h2>All Users</h2>
              <p>Total users: {users.length}</p>
            </div>

            <Input
              placeholder="Search users..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <UserTable />
        </section>
      </>
    );
  }

  // -----------------------------
  // User Table
  // -----------------------------

  function UserTable() {
    return (
      <div className="table-container">
        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <h3>No users found</h3>
            <p>Try searching with another name.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-name">
                      <div className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      {user.name}
                    </div>
                  </td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>
                    <span
                      className={
                        user.status === "Active"
                          ? "status active-status"
                          : "status inactive-status"
                      }
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <Button
                        text="View"
                        onClick={() =>
                          setSelectedUser(user)
                        }
                        type="secondary"
                      />

                      <Button
                        text="Edit"
                        onClick={() =>
                          handleEditUser(user)
                        }
                        type="secondary"
                      />

                      <Button
                        text="Delete"
                        onClick={() =>
                          handleDeleteUser(user.id)
                        }
                        type="danger"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  // -----------------------------
  // Settings
  // -----------------------------

  function renderSettings() {
    return (
      <>
        <header className="header">
          <div>
            <h1>Settings</h1>
            <p>Manage your account settings</p>
          </div>
        </header>

        <section className="users-section">
          <h2>Account Settings</h2>

          <div className="settings-box">
            <label>Admin Name</label>

            <input
              type="text"
              value="Admin"
              readOnly
            />

            <label>Email</label>

            <input
              type="email"
              value="admin@example.com"
              readOnly
            />

            <label>Role</label>

            <input
              type="text"
              value="Administrator"
              readOnly
            />
          </div>
        </section>
      </>
    );
  }

  // -----------------------------
  // Main UI
  // -----------------------------

  return (
    <div className="dashboard">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">

        {activePage === "Dashboard" &&
          renderDashboard()}

        {activePage === "Users" &&
          renderUsers()}

        {activePage === "Settings" &&
          renderSettings()}

      </main>

      {/* -----------------------------
          Add User Modal
      ----------------------------- */}

      {showAddUser && (
        <Modal
          title="Add New User"
          onClose={handleCloseAddUser}
        >
          <div className="add-user-form">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter user name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <label>Role</label>

            <input
              type="text"
              placeholder="Enter role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            />

            <label>Status</label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

            <button
              className="add-user-submit"
              onClick={handleAddUser}
            >
              Add User
            </button>

          </div>
        </Modal>
      )}

      {/* -----------------------------
          Edit User Modal
      ----------------------------- */}

      {showEditUser && (
        <Modal
          title="Edit User"
          onClose={handleCloseEditUser}
        >
          <div className="add-user-form">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter user name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <label>Role</label>

            <input
              type="text"
              placeholder="Enter role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            />

            <label>Status</label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

            <button
              className="add-user-submit"
              onClick={handleUpdateUser}
            >
              Update User
            </button>

          </div>
        </Modal>
      )}

      {/* -----------------------------
          View User Modal
      ----------------------------- */}

      {selectedUser && (
        <Modal
          title="User Details"
          onClose={() =>
            setSelectedUser(null)
          }
        >
          <div className="modal-user">

            <div className="large-avatar">
              {selectedUser.name
                .charAt(0)
                .toUpperCase()}
            </div>

            <h3>{selectedUser.name}</h3>

            <p>
              <strong>Email:</strong>{" "}
              {selectedUser.email}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {selectedUser.role}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedUser.status}
            </p>

          </div>
        </Modal>
      )}

    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; 
import UserDetail from "./components/UserDetail";
import UserForm from "./components/UserForm";
import ConfirmationModal from "./components/ConfirmationModal"; 
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [nextId, setNextId] = useState(11);
  const [showModal, setShowModal] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const [errror,setError] = useState(false);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setLoading(false)
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setError(true)
    }
  };

  const createUser = async (user) => {
    try {
      const newUser = { ...user, id: nextId };
      setUsers([...users, newUser]);
      setNextId(nextId + 1);
      await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUser = async (user) => {
    try {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      setEditingUser(null);

      if (user.id < 11) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user); // Set the user to be deleted
    setShowModal(true); // Show confirmation modal
  };

  const handleConfirmDelete = async () => {
    try {
      setUsers(users.filter((user) => user.id !== selectedUser.id));

      if (selectedUser.id < 11) {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`);
      }

      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Router>
      <div className="container">
        <h1>User Management</h1>
        
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loading={loading}
                users={users}
                errror={errror}
                setEditingUser={setEditingUser}
                deleteUser={handleDeleteClick} 
              />
            }
          />
          <Route path="/user/:id" element={<UserDetail users={users} />} />
          <Route path="/create" element={<UserForm createUser={createUser} />} />
          <Route
            path="/edit/:id"
            element={
              <UserForm createUser={createUser} updateUser={updateUser} editingUser={editingUser} />
            }
          />
        </Routes>

        {/* Confirmation Modal */}
        <ConfirmationModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </Router>
  );
};

export default App;

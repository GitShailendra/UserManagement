import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users. Please try again later.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  }

  return (
    <div className="container">
      <h2>User List</h2>
      <Link to="/users/new" className="btn create">Create New User</Link>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

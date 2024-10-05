import React from "react";
import { useParams } from "react-router-dom";
import '../App.css'; 

const UserDetail = ({ users }) => {
  const { id } = useParams();
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className="container">
      <h2>User Details</h2>
      <div className="user-card">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
      </div>
    </div>
  );
};

export default UserDetail;

import React from "react";
import { Link } from "react-router-dom";
import { Puff } from 'react-loader-spinner'
import '../App.css'; 

const Home = ({loading, users, error, setEditingUser, deleteUser }) => {
  if (error) {
    return <div className="error">API is not working fine</div>;
  }
  if (loading) {
    return <Puff
    visible={true}
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="puff-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />;
  }

  return (
    <div className="container">
      <h2>All Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link className="btn" to={`/user/${user.id}`}>View</Link>
                <Link className="btn edit" to={`/edit/${user.id}`} onClick={() => setEditingUser(user)}>Edit</Link>
                <button className="btn delete" onClick={() => deleteUser(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/create">
        <button className="btn create">Create New User</button>
      </Link>
    </div>
  );
};

export default Home;

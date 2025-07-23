// src/Dashboard.js
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/User Profiles/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Email</th>
              <th>Occupation</th>
              <th>Contact</th>
              <th>Experience</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>{user.email}</td>
                <td>{user.occupation}</td>
                <td>{user.contact_number}</td>
                <td>{user.experience}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;

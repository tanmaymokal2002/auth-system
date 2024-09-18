import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:8000/api/protected", {
          headers: { "x-auth-token": user.token },
        })
        .then((response) => setMessage(response.data.message))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>{message}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>You need to login</p>
      )}
    </div>
  );
};

export default Dashboard;

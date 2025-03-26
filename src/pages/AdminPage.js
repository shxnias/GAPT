import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // Checks if the user is authenticated
  useEffect(() => {
    axios.get("http://localhost:5001/api/check-auth")
      .then(() => setLoading(false))
      .catch(() => navigate("/adminlogin"));
  }, [navigate]);

  // Logs out only when the user refreshes or closes the tab
  useEffect(() => {
    const handleUnload = () => {
      navigator.sendBeacon("http://localhost:5001/api/logout");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {

      // Only run logout if user actually visited the admin page
      if (!loading) {
        axios.post("http://localhost:5001/api/logout").catch(console.error);
      }

      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [loading]);

  if (loading) return <p>Loading...</p>;
  

  return (
    <div className="main-content">
    <div className="contact-header">
      <div className="line"></div>
      <h1>Top Secret Admin Page!</h1>
      <div className="line"></div>
    </div>
    </div>
  );
}

export default AdminPage;

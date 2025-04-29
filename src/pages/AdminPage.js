import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ".//Admin.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
} from "recharts";

axios.defaults.withCredentials = true;

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("booking");
  const [stats, setStats] = useState(null);

  const [roomsStatusData, setRoomsStatusData] = useState([]);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check-auth")
      .then(() => setLoading(false))
      .catch(() => navigate("/adminlogin"));
  }, [navigate]);

  // Logout on tab close or refresh
  useEffect(() => {
    const handleUnload = () => {
      navigator.sendBeacon("http://localhost:5001/api/logout");
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      if (!loading) {
        axios.post("http://localhost:5001/api/logout").catch(console.error);
      }
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [loading]);
  useEffect(() => {
    fetch("http://localhost:5001/api/admin/room-status-data")
      .then((res) => res.json())
      .then(setRoomsStatusData)
      .catch((err) => console.error("Room chart fetch error", err));
  }, []);

  // Fetch stats + chart data
  useEffect(() => {
    fetch("http://localhost:5001/api/admin/dashboard-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats fetch error", err));

    fetch("http://localhost:5001/api/admin/room-status-data")
      .then((res) => res.json())
      .then((data) => setRoomsStatusData(data))
      .catch((err) => console.error("Room status fetch error", err));
  }, []);

  if (loading) return <p>Loading...</p>;

  const facilitiesData = [
    { name: "Gym", bookings: 10 },
    { name: "Spa", bookings: 18 },
    { name: "Parking", bookings: 8 },
    { name: "Tours", bookings: 14 },
  ];

  const trafficData = [
    { name: "Facebook", value: 42.4 },
    { name: "Instagram", value: 25.4 },
    { name: "Google Search", value: 23.7 },
    { name: "TikTok", value: 8.5 },
  ];

  const visitsData = [
    { day: "Monday", visits: 45 },
    { day: "Tuesday", visits: 60 },
    { day: "Wednesday", visits: 30 },
    { day: "Thursday", visits: 40 },
    { day: "Friday", visits: 75 },
    { day: "Saturday", visits: 65 },
    { day: "Sunday", visits: 50 },
  ];

  return (
    <div className="admin-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="tabs">
        <button
          onClick={() => setActiveTab("booking")}
          className={activeTab === "booking" ? "active-tab" : ""}
        >
          Booking Management
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={activeTab === "analytics" ? "active-tab" : ""}
        >
          Website Analytics
        </button>
      </div>

      {activeTab === "booking" && (
        <>
          <div className="stats-wrapper">
            <div className="stats-cards">
              <div className="card">
                Rooms Booked: <strong>{stats?.booked_rooms ?? "..."}</strong>
              </div>
              <div className="card">
                Room Types Available:{" "}
                <strong>{stats?.available_rooms ?? "..."}</strong>
              </div>
              <div className="card">
                Upcoming Check-ins:{" "}
                <strong>{stats?.upcoming_checkins ?? "..."}</strong>
              </div>
              <div className="card">
                Upcoming Check-outs:{" "}
                <strong>{stats?.upcoming_checkouts ?? "..."}</strong>
              </div>
            </div>
            {/* Room Status Chart */}
            <div className="charts">
              <div className="chart-placeholder">
                <div className="chart-box">
                  <h3>Rooms Status</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={roomsStatusData || []}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Booked" fill="#1E3A8A" />
                      <Bar dataKey="Available" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/*Facilities Chart*/}
              <div className="chart-placeholder">
                <div className="chart-box">
                  <h3>Facilities Booking This Past Week</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={facilitiesData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        label={{
                          value: "Facilities",
                          position: "bottom",
                          offset: 10,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "No. of Bookings",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#1E3A8A" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/*Web Analytics Tab*/}
      {activeTab === "analytics" && (
        <div className="stats-wrapper">
          <div className="stats-cards">
            <div className="card">
              Total Visits: <strong>300</strong>
            </div>
            <div className="card">
              New Users Today: <strong>35</strong>
            </div>
            <div className="card">
              Active Users: <strong>15</strong>
            </div>
            <div className="card">
              Returning Users: <strong>56</strong>
            </div>
          </div>

          <div className="charts">
            <div className="chart-placeholder">
              <div className="chart-box">
                <h3>Traffic Sources</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#1E3A8A"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/*Website Visits Chart*/}
            <div className="chart-placeholder">
              <div className="chart-box">
                <h3>Average Website Visits Per Day</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={visitsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visits" stroke="#1E3A8A" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;

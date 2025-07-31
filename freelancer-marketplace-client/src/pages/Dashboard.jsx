import React, { useEffect, useState } from "react";
import HireFreelancer from "./HireFreelancer";
import FreelancerDashboard from "./FreelancerDashboard";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setRole(user.role);
  }, []);

  if (role === "client") return <HireFreelancer />;
  if (role === "freelancer") return <FreelancerDashboard />;
  if (role === "admin") return <AdminDashboard />;

  return <h1 className="text-xl text-center mt-10">Loading dashboard...</h1>;
}

export default Dashboard;

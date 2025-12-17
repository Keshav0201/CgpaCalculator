import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Student Utilities</h1>
      <p className="home-subtitle">
        Choose a calculator to continue
      </p>

      <div className="home-card-container">
        <div
          className="home-card cgpa"
          onClick={() => navigate("/cgpa")}
        >
          <h2>CGPA Calculator</h2>
          <p>Calculate cumulative GPA easily</p>
        </div>

        <div
          className="home-card attendance"
          onClick={() => navigate("/attendence")}
        >
          <h2>Attendance Calculator</h2>
          <p>Track your attendance percentage</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import "./Attendence.css";
import { useNavigate } from "react-router-dom";

const Attendence = () => {
  const [atClass, setAtClass] = useState("");
  const [absent, setAbsent] = useState("");
  const [canAbs, setCanAbs] = useState(0);
  const [finalPercentage, setFinalPercentage] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);

  const navigate = useNavigate();

  const calculate = () => {
    let attended = Number(atClass);
    let abs = Number(absent) + 1;
    let canAbsent = 0;

    while (true) {
      let percent = (attended * 100) / (abs + attended);
      if (percent >= 75) {
        canAbsent++;
        abs++;
        setFinalPercentage(percent.toFixed(2));
      } else {
        break;
      }
    }
    setCanAbs(canAbsent);
    setHasCalculated(true);
  };

  const reset = () => {
    setAbsent("");
    setAtClass("");
    setCanAbs(0);
    setFinalPercentage(0);
    setHasCalculated(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      calculate();
    }
  };

  return (
    <div className="att-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h1 className="att-title">Attendance Calculator</h1>

      {hasCalculated && (
        <div className="att-result">
          <h2>
            You can miss <span>{canAbs}</span> more classes
          </h2>
          <p>
            Final Attendance: <strong>{finalPercentage}%</strong>
          </p>
        </div>
      )}

      <div className="att-inputs">
        <input
          type="text"
          placeholder="Classes attended"
          value={atClass}
          onChange={(e) => setAtClass(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          type="text"
          placeholder="Classes absent"
          value={absent}
          onChange={(e) => setAbsent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="att-buttons">
        <button
          className="primary"
          onClick={calculate}
          onKeyDown={handleKeyDown}
        >
          Calculate
        </button>
        <button className="danger" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Attendence;

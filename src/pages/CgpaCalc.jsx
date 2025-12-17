import React, { useState } from "react";
import "./CgpaCalc.css";
import { useNavigate } from "react-router-dom";

const CgpaCalc = () => {
  const [curText, setCurText] = useState("");
  const [curCredText, setCurCredText] = useState("");
  const [cgpa, setCgpa] = useState(0);
  const [rows, setRows] = useState([{ grade: "", credits: "" }]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const navigate = useNavigate();

  const calculateCgpa = () => {
    const curCgpa = Number(curText);
    const curCred = Number(curCredText);

    if (curCgpa > 10 || curCgpa < 0) {
      alert("Wrong CGPA");
      reset();
      return;
    }

    if (curCred < 0) {
      alert("Wrong Number of Credits");
      reset();
      return;
    }

    let gp = curCgpa * curCred;
    let cred = curCred;

    rows.forEach((row) => {
      if (row.grade && row.credits) {
        gp += Number(row.grade) * Number(row.credits);
        cred += Number(row.credits);
      }
    });

    setCgpa(cred ? (gp / cred).toFixed(2) : 0);
    setHasCalculated(true);
  };

  const gradeOptions = [
    { value: 10, label: "S" },
    { value: 9, label: "A" },
    { value: 8, label: "B" },
    { value: 7, label: "C" },
    { value: 6, label: "D" },
    { value: 5, label: "E" },
    { value: 0, label: "F" },
  ];

  const creditOptions = [
    { value: 4, label: "4" },
    { value: 3, label: "3" },
    { value: 2, label: "2" },
    { value: 1, label: "1" },
  ];

  const addRow = () => {
    setRows([...rows, { grade: "", credits: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const removeRow = (index) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const reset = () => {
    setCgpa(0);
    setRows([{ grade: "", credits: "" }]);
    setCurCredText("");
    setCurText("");
    setHasCalculated(false);
  };

  return (
    <div className="cgpa-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h1 className="title">CGPA Calculator</h1>

      <div className="input-group">
        <input
          type="text"
          value={curText}
          onChange={(e) => setCurText(e.target.value)}
          placeholder="Enter current CGPA"
        />
        <input
          type="text"
          value={curCredText}
          onChange={(e) => setCurCredText(e.target.value)}
          placeholder="Enter number of credits"
        />
      </div>

      <button className="primary-btn" onClick={calculateCgpa}>
        Calculate CGPA
      </button>

      <div className="rows">
        {rows.map((row, index) => (
          <div key={index} className="row">
            <span className="row-index">{index + 1}</span>

            <select
              value={row.credits}
              onChange={(e) => handleChange(index, "credits", e.target.value)}
            >
              <option value="">Credits</option>
              {creditOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={row.grade}
              onChange={(e) => handleChange(index, "grade", e.target.value)}
            >
              <option value="">Grade</option>
              {gradeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button className="remove-btn" onClick={() => removeRow(index)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      <button className="secondary-btn" onClick={addRow}>
        + Add Subject
      </button>

      {hasCalculated && <h2 className="result">CGPA: {cgpa}</h2>}

      <button className="danger-btn" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default CgpaCalc;

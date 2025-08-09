import React, { useState } from "react";
import "./PasswordGate.css";

const PasswordGate = ({ onSuccess }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === import.meta.env.VITE_CORRECT_PASSWORD) {
      setError("");
      onSuccess();
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="password-gate-container">
      <div className="password-gate">
        <h2>ادخل كلمة المرور لعرض شجرة العائلة</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="كلمة المرور"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
        <div className="d-grid">
          <small className="hint mb-2"> تلميح: كلمة المرور هي 123456</small>
                             <button type="submit">عرض</button>

        </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;

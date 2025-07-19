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
          <button type="submit">عرض</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;

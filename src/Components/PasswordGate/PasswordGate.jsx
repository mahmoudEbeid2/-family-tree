import React, { useState } from "react";
import "./PasswordGate.css";
import { correctPassword } from "../../data/family";

const PasswordGate = ({ onSuccess }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === correctPassword) {
      setError("");
      onSuccess(); 
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  return (
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
  );
};

export default PasswordGate;

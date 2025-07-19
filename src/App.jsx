import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { family } from "./data/family";

import TreeMode from "./pages/TreeMode";
import CardsPage from "./pages/cardsPage";
import FoucsMode from "./pages/FoucsMode";
import PasswordGate from "./Components/PasswordGate/PasswordGate";
import StatsCards from "./Components/StatsModal/StatsModal";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  function handlePasswordSubmit() {
    setShowLogin(false);
  }

  if (showLogin) {
    return <PasswordGate onSubmit={handlePasswordSubmit} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StatsCards family={family} />} />
        <Route path="/tree" element={<TreeMode family={family} />} />
        <Route path="/cards" element={<CardsPage family={family} />} />
        <Route path="/focus" element={<FoucsMode family={family} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

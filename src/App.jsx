import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { family, family_name } from "./data/family";

import TreeMode from "./pages/TreeMode";
import CardsPage from "./pages/cardsPage";
import FoucsMode from "./pages/FoucsMode";
import NavbarComponent from "./Components/Navbar/Navbar";
function App() {
  return (
    <Router>
      <NavbarComponent family={family_name.name} />
      <Routes>
        <Route path="/" element={<TreeMode family={family} />} />
        <Route path="/cards" element={<CardsPage family={family} />} />
        <Route path="/focus" element={<FoucsMode family={family} />} />
      </Routes>
    </Router>
  );
}

export default App;

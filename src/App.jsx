import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { family } from "./data/family";
import { family_name } from "./data/family";

import NavbarComponent from "./Components/Navbar/Navbar";
import TreeMode from "./pages/TreeMode";
import CardsPage from "./pages/CardsPage";
import FocusMode from "./pages/FoucsMode";

function App() {
  return (
    <Router>
      <NavbarComponent family={family_name.name} />
      <Routes>
  <Route path="/tree" element={<TreeMode family={family} />} />
  <Route path="/cards" element={<CardsPage family={family} />} />
  <Route path="/focus" element={<FocusMode family={family} />} />
</Routes>

    </Router>
  );
}

export default App;

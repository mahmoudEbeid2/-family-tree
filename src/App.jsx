import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { family, family_name } from "./data/family";
import { useState } from "react";
import TreeMode from "./pages/TreeMode";
import CardsPage from "./pages/CardsPage";
import FoucsMode from "./pages/FoucsMode";
import NavbarComponent from "./Components/Navbar/Navbar";
function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const toggleNavbar = () => setShowNavbar(!showNavbar);

  return (
    <Router>
      <NavbarComponent
        family={family_name.name}
        toggleNavbar={toggleNavbar}
        showNavbar={showNavbar}
      />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<TreeMode showNavbar={showNavbar} family={family} />}
          />
          <Route path="/cards" element={<CardsPage family={family} />} />
          <Route
            path="/focus"
            element={<FoucsMode showNavbar={showNavbar} family={family} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

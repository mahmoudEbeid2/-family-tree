import FamilyTree from "../Components/FamilyTree";
import PasswordGate from "../Components/PasswordGate/PasswordGate";
import { useState, useEffect } from "react";

function TreeMode({ family, showNavbar }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(isAuth);
  }, []);

  function handlePasswordSubmit() {
    sessionStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  }

  return (
    <div className="tree-mode-container">
      {!isAuthenticated && <PasswordGate onSuccess={handlePasswordSubmit} />}
      <FamilyTree family={family} showNavbar={showNavbar} />
    </div>
  );
}

export default TreeMode;

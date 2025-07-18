import React from "react";
import FamilyTree from "./Components/FamilyTree";
import { family } from "./data/family";
import StatsCards from "./Components/StatsModal/StatsModal"; // ✅
import PasswordGate from "./Components/PasswordGate/PasswordGate";

function App() {
  return (
    <div>
      {/* <PasswordGate family={correctPassword}/>
      <StatsCards family={family} />  */}
      <FamilyTree family={family} />  
    </div>
  );
}

export default App;

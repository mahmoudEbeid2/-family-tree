import React from "react";
import FamilyTree from "./Components/FamilyTree";
import { family } from "./data/family";
import TreePage from "./Components/treePage/TreePage";
import FamilyZoom from "./Components/FamilyZoom";

function App() {
<<<<<<< HEAD
  return <FamilyZoom family={family} />;
=======
  
  return (
    <div>
      {/* <PasswordGate family={correctPassword}/>
      <StatsCards family={family} />  */}
      <FamilyTree family={family} />  
    </div>
  );
>>>>>>> e78cc9bf4cf4ef187338f994c11b0219285e2324
}

export default App;

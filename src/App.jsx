import React from "react";
import FamilyTree from "./Components/FamilyTree";
import { family } from "./data/family";
import TreePage from './Components/treePage/TreePage';

function App() {
  
  return (
    <FamilyTree family={family} />

    
  );
}

export default App;

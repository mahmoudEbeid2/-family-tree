import React from "react";
import FamilyTree from "./Components/FamilyTree";
import { family } from "./data/family";
import TreePage from "./Components/treePage/TreePage";
import FamilyZoom from "./Components/FamilyZoom";

function App() {
  return <FamilyZoom family={family} />;
}

export default App;

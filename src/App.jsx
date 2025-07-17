import React from "react";
import FamilyTree from "./component/FamilyTree";
import { family } from "./data/family";

function App() {
  return <FamilyTree family={family} />;
}

export default App;

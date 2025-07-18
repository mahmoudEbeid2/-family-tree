import React from "react";
import { family } from "./data/family";
import TreeMode from "./pages/TreeMode";
import CardsPage from "./pages/cardsPage";
import FoucsMode from "./pages/FoucsMode";
function App() {
  return <FoucsMode family={family} />;
}

export default App;

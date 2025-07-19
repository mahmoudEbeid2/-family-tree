import FamilyTree from "../Components/FamilyTree";
import PasswordGate from "../Components/PasswordGate/PasswordGate";
import { useState } from "react";
function TreeMode({ family }) {
  const [showLogin, setShowLogin] = useState(true);

  function handlePasswordSubmit() {
    setShowLogin(false);
  }

  // if (showLogin) {
  //   return <PasswordGate onSubmit={handlePasswordSubmit} />;
  // }
  return (
    <>
      {showLogin && <PasswordGate onSuccess={handlePasswordSubmit} />}

      <FamilyTree family={family} />
    </>
  );
}

export default TreeMode;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PeopleList from "../Components/PeopleList/PeopleList";

function CardsPage({ family }) {
  const location = useLocation();
  const [filteredFamily, setFilteredFamily] = useState([]);

  useEffect(() => {
    if (!family || !Array.isArray(family)) {
      setFilteredFamily([]); // clear if invalid
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    const filtered = searchQuery
      ? family.filter(
          (person) =>
            typeof person.name === "string" &&
            person.name.toLowerCase().includes(searchQuery)
        )
      : family;
    setFilteredFamily(filtered);
  }, [location.search, family]);

  if (!family || !Array.isArray(family)) return null;

  return filteredFamily.length > 0 ? (
    <PeopleList family={filteredFamily} />
  ) : (
    <div style={{ textAlign: "center", marginTop: "50px" }}>لا يوجد نتائج</div>
  );
}

export default CardsPage;

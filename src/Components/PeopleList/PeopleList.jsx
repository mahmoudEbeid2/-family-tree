import React from "react";
import PersonCard from "../personCard/PersonCard";
import "./PeopleList.css";

const PeopleList = ({ family }) => {
  return (
    <div className=" people-container">
      <div className="people-grid">
        {family.map((person, index) => (
          <PersonCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
};

export default PeopleList;

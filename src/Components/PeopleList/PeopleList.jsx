import React from "react";
import PersonCard from "../personCard/PersonCard";
import family from "../../data/family"
import "./PeopleList.css";

const people = family;
console.log(people);


const PeopleList = () => {
  return (
    <div className="people-grid">
      {people.map((person, index) => (
        <PersonCard key={index} person={person} />
      ))}
    </div>
  );
};

export default PeopleList;

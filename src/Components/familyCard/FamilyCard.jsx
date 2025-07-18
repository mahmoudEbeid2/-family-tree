import React from "react";
import { Info } from "lucide-react";
import "./familyCard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const FamilyCard = ({ person, onShowDetails }) => {
  const displayYear = person.daiedDate ? `ت : ${person.daiedDate} م` : null;
  const handlePersonClick = () => {
    onShowDetails(person);
  };
  return (
    <div className="familyCard mx-auto my-3">
      <div className="imageFamilyCard">
        <img src={person.imageUrl} alt={person.name} />
        <button
          onClick={handlePersonClick}
          className="details-button"
          aria-label="عرض التفاصيل"
        >
          <Info size={16} className="text-secondary" />
        </button>
      </div>

      <div className="p-2 text-center" dir="rtl">
        <h5 className="mb-1 text-dark name">{person.name}</h5>
        {displayYear && <p className="date mb-0">{displayYear}</p>}
      </div>
    </div>
  );
};

export default FamilyCard;

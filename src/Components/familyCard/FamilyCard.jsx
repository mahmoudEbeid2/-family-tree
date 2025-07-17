import React from 'react';
import { Info } from 'lucide-react';
import "./familyCard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const FamilyCard = ({
  imageUrl ,
  name ,
  deathYear ,
  onShowDetails = () => {}
}) => {
  const displayYear = deathYear ? `ت : ${deathYear} م` : null;

  return (
    <div className="familyCard mx-auto my-3">
      <div className="imageFamilyCard">
        <img src={imageUrl} alt={name} />
        <button
          onClick={onShowDetails}
          className="details-button"
          aria-label="عرض التفاصيل"
        >
          <Info size={16} className="text-secondary" />
        </button>
      </div>

      <div className="p-2 text-center" dir="rtl">
        <h5 className="mb-1 text-dark name">{name}</h5>
        {displayYear && <p className="date mb-0">{displayYear}</p>}
      </div>
    </div>
  );
};

export default FamilyCard;

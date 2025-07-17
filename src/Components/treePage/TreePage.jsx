import React, { useState } from 'react';
import FamilyCard from '../familyCard/FamilyCard';
import PersonDetailsModal from '../personDetailsModal/personDetailsModal';
import './Tree.css';

const TreePage = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const familyMembers = [
    {
      id: 1,
      name: "أحمد علي محمد القحطاني",
      imageUrl: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      birthYear: 1950,
      deathYear: 2020,
      childrenCount: 5,
      region: "المنطقة الشرقية",
      city: "الدمام",
      job: "معلم",
      bio: "أحمد كان رجلاً محبوباً في مجتمعه...",
      photos: [
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
      ]
    },
    {
      id: 2,
      name: "فاطمة أحمد القحطاني",
      imageUrl: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      birthYear: 1960,
      deathYear: null,
      childrenCount: 3,
      region: "الرياض",
      city: "الرياض",
      job: "ربة منزل",
      bio: "فاطمة سيدة كريمة وعطوفة...",
      photos: []
    }
  ];

  return (
    <>
      <div className="container py-4 d-flex flex-wrap justify-content-center gap-3">
        {familyMembers.map(member => (
          <FamilyCard 
            key={member.id}
            name={member.name}
            imageUrl={member.imageUrl}
            deathYear={member.deathYear}
            onShowDetails={() => setSelectedPerson(member)}
          />
        ))}
      </div>

      {selectedPerson && (
        <>
          <div className="blur-layer"></div>
          <div className="person-modal-overlay">
            <PersonDetailsModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
          </div>
        </>
      )}
    </>
  );
};

export default TreePage;

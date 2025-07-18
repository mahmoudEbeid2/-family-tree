import React, { useRef, useState, useEffect } from "react";
import Tree from "react-d3-tree";
import FamilyCard from "./familyCard/FamilyCard";
import PersonDetailsModal from "./personDetailsModal/personDetailsModal";

// مكون مخصص لعرض كل نود (شخص)
const renderCustomNode = ({ nodeDatum }, handlePersonClick, handleDisplay) => {
  return (
    <foreignObject width="200" height="430" x="-100" y="-160">
      <FamilyCard
        person={nodeDatum}
        onShowDetails={() => handlePersonClick(nodeDatum)}
        onDisplayPerson={() => handleDisplay(nodeDatum)}
      />
    </foreignObject>
  );
};

export default function FamilyTree({ family }) {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});

  // الشخص الرئيسي في الشجرة (الجذر)
  const rootPerson = family.find((person) => person.id === 1);

  // بناء الشجرة بشكل ديناميكي حسب الأشخاص المفتوحة (expanded)
  function buildTree(person) {
    // لو الشخص مش موجود في expandedNodes والجذر مش id=1، متجبش أولاده
    const isExpanded = expandedNodes[person.id];

    const children = isExpanded
      ? (person.children || [])
          .map((childId) => {
            const child = family.find((p) => p.id === childId);
            if (!child) return null;
            return buildTree(child);
          })
          .filter(Boolean)
      : [];

    return { ...person, children };
  }

  const treeData = buildTree(rootPerson);

  // عند الضغط على زر التفاصيل
  function handlePersonClick(person) {
    setSelectedPerson(person);
  }

  // عند الضغط على الصورة لعرض أولاده
  //   function handleDisplay(person) {
  //     setExpandedNodes((prev) => ({
  //       ...prev,
  //       [person.id]: true,
  //     }));
  //   }

  function handleDisplay(person) {
    setExpandedNodes((prev) => ({
      ...prev,
      [person.id]: !prev[person.id],
    }));
  }

  // لحساب أبعاد العنصر الحاوي (الشجرة)
  useEffect(() => {
    if (treeContainer.current) {
      const { width, height } = treeContainer.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div
      ref={treeContainer}
      style={{ width: "100vw", height: "100vh", backgroundColor: "#F5E6CA" }}
    >
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="diagonal"
        pathClassFunc={() => "custom-link"}
        translate={{ x: dimensions.width / 2, y: 150 }}
        renderCustomNodeElement={(rd3tProps) =>
          renderCustomNode(rd3tProps, handlePersonClick, handleDisplay)
        }
        zoomable
        zoom={0.8}
        collapsible={false}
        scaleExtent={{ min: 0.5, max: 2 }}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        nodeSize={{ x: 140, y: 450 }}
      />

      {selectedPerson && (
        <>
          <div className="blur-layer"></div>
          <div className="person-modal-overlay">
            <PersonDetailsModal
              person={selectedPerson}
              onClose={() => setSelectedPerson(null)}
            />
          </div>
        </>
      )}
    </div>
  );
}

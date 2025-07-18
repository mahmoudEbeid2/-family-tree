import React, { useRef, useState, useEffect } from "react";
import Tree from "react-d3-tree";
import FamilyCard from "./familyCard/FamilyCard";
import PersonDetailsModal from "./personDetailsModal/personDetailsModal";

const renderCustomNode = ({ nodeDatum }, handlePersonClick, handleDisplay) => {
  return (
    <foreignObject width="200" height="430" x="-100" y="-100">
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
  const [activePersonId, setActivePersonId] = useState(null);

  const rootPerson = family.find((person) => person.id === 1);

  function isInPathToActive(currentId, targetId) {
    if (currentId === targetId) return true;

    const parent = family.find((p) => (p.children || []).includes(targetId));
    if (!parent) return false;

    if (parent.id === currentId) return true;

    return isInPathToActive(currentId, parent.id);
  }

  function buildTree(person) {
    if (!person) return null;

    const isExpanded = expandedNodes[person.id];

    // 👇 ده الشرط المعدل عشان يشتغل مظبوط
    if (
      activePersonId &&
      person.id !== activePersonId &&
      !isInPathToActive(person.id, activePersonId) &&
      !isInPathToActive(activePersonId, person.id)
    ) {
      return null;
    }

    const children = isExpanded
      ? (person.children || [])
          .map((childId) => {
            const child = family.find((p) => p.id === childId);
            return buildTree(child);
          })
          .filter(Boolean)
      : [];

    return { ...person, children };
  }

  const treeData = buildTree(rootPerson);

  function handlePersonClick(person) {
    setSelectedPerson(person);
  }

  function handleDisplay(person) {
    setActivePersonId(person.id); // تحديد الشخص النشط
    setExpandedNodes((prev) => ({
      ...prev,
      [person.id]: !prev[person.id], // فتح/غلق أبناؤه
    }));
  }

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
        nodeSize={{ x: 180, y: 320 }}
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

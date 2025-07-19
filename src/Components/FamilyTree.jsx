import React, { useRef, useState, useEffect } from "react";
import Tree from "react-d3-tree";
import FamilyCard from "./familyCard/FamilyCard";
import PersonDetailsModal from "./personDetailsModal/personDetailsModal";
import InfoCon from "../assets/Info.svg";

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const renderCustomNode = ({ nodeDatum }, handlePersonClick, handleDisplay) => {
  if (isIOS) {
    // fallback SVG node
    return (
      <g style={{ cursor: "pointer" }}>
        <rect
          x="-80"
          y="-30"
          width="150"
          height="180"
          rx="0"
          ry="0"
          fill="white"
          stroke="none"
        />
        <image
          onClick={() => handleDisplay(nodeDatum)}
          href={nodeDatum.imageUrl}
          x="-70"
          y="-23"
          width="130"
          height="130"
        />
        <circle
          onClick={() => handlePersonClick(nodeDatum)}
          cx="47"
          cy="-11"
          r="10"
          fill="white"
          stroke="none"
        />
        <image
          onClick={() => handlePersonClick(nodeDatum)}
          href={InfoCon}
          x="39"
          y="-19"
          width="16"
          height="16"
        />
        <text
          fill="#fff"
          x="-5"
          y="124"
          fontSize={11}
          fontFamily="cairo, sans-serif"
          fontWeight="100"
          textAnchor="middle"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            pointerEvents: "none",
            WebkitTapHighlightColor: "transparent",
            outline: "none",
            fontWeight: 100,
          }}
        >
          {nodeDatum.name}
        </text>
        <text
          fill="#888"
          x="-5"
          y="140"
          fontSize={8}
          fontFamily="cairo, sans-serif"
          fontWeight="100"
          textAnchor="middle"
          style={{
            fontWeight: 50,
            pointerEvents: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            WebkitTapHighlightColor: "transparent",
            outline: "none",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          {nodeDatum.daiedDate ? `ت : ${nodeDatum.daiedDate} م` : null}
        </text>
      </g>
    );
  }

  return (
    <foreignObject width="200" height="430" x="-100" y="-160">
      <div style={{ width: "200px", height: "430px" }}>
        <FamilyCard
          person={nodeDatum}
          onShowDetails={() => handlePersonClick(nodeDatum)}
          onDisplayPerson={() => handleDisplay(nodeDatum)}
        />
      </div>
    </foreignObject>
  );
};

export default function FamilyTree({ family, showNavbar }) {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});

  const rootPerson = family.find((person) => person.id === 1);

  function buildTree(person) {
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

  function handlePersonClick(person) {
    setSelectedPerson(person);
  }

  function handleDisplay(person) {
    setExpandedNodes((prev) => ({
      ...prev,
      [person.id]: !prev[person.id],
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
      style={{
        width: "100vw",
        height: showNavbar ? "89vh" : "100vh",
        backgroundColor: "#F5E6CA",
      }}
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

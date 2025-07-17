import React, { useRef, useState, useEffect } from "react";
import Tree from "react-d3-tree";
import FamilyCard from "./familyCard/FamilyCard";
import PersonDetailsModal from "../personDetailsModal/personDetailsModal";
import "./Tree.css";

function buildHierarchy(data) {
  const nodes = {};
  const rootCandidates = new Set(data.map((d) => d.id));

  data.forEach((item) => {
    nodes[item.id] = { ...item, children: [] };
  });

  data.forEach((item) => {
    if (item.children && item.children.length > 0) {
      item.children.forEach((childId) => {
        if (nodes[childId]) {
          nodes[item.id].children.push(nodes[childId]);
          rootCandidates.delete(childId);
        }
      });
    }
  });

  const rootId = [...rootCandidates][0];
  return nodes[rootId];
}

const renderCustomNode = ({ nodeDatum }) => {
  const { name, diedDate, image } = nodeDatum;

  return (
    <foreignObject width="200" height="430" x="-100" y="-100">
      <FamilyCard name={name} deathYear={diedDate} imageUrl={image} />
    </foreignObject>
  );
};

export default function FamilyTree({ family }) {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    if (treeContainer.current) {
      const { width, height } = treeContainer.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  const treeData = buildHierarchy(family);

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
        translate={{ x: dimensions.width / 2, y: 150 }} // زودنا المسافة من فوق
        renderCustomNodeElement={renderCustomNode}
        zoomable
        zoom={0.8}
        collapsible
        scaleExtent={{ min: 0.5, max: 2 }}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        nodeSize={{ x: 140, y: 300 }} // دي أهم حاجة: زودنا المسافة الرأسية بين الـ nodes
      />
    </div>
  );
}

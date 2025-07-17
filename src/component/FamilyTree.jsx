import React, { useRef, useState, useEffect } from "react";
import Tree from "react-d3-tree";

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
    <foreignObject width="200" height="100" x="-100" y="-50">
      <div
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={image}
          alt={name}
          width="50"
          height="50"
          style={{ borderRadius: "50%", marginBottom: "5px" }}
        />
        <h4 style={{ margin: "2px 0" }}>{name}</h4>
        {diedDate && (
          <p style={{ margin: 0, fontSize: "0.8em", color: "#888" }}>توفي:</p>
        )}
      </div>
    </foreignObject>
  );
};

export default function FamilyTree({ family }) {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

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
        translate={{ x: dimensions.width / 2, y: 100 }}
        renderCustomNodeElement={renderCustomNode}
        zoomable
        zoom={0.8}
        collapsible
        separation={{ siblings: 1.5, nonSiblings: 2 }}
      />
    </div>
  );
}

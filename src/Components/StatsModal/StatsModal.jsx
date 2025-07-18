import React from "react";
import { Users, Male, Female, Heart } from "lucide-react";  

const StatsCards = ({ family }) => {
  const total = family.length;
  const males = family.filter(p => p.gender === "ذكر").length;
  const females = family.filter(p => p.gender === "أنثى").length;
  const alive = family.filter(p => !p.daiedDate).length;

  const stats = [
    { label: "أفراد العائلة", value: total, icon: <Users size={24} /> },
    { label: "عدد الذكور", value: males, icon: <Male size={24} /> },
    { label: "عدد الإناث", value: females, icon: <Female size={24} /> },
    { label: "عدد الأحياء", value: alive, icon: <Heart size={24} /> },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, i) => (
        <div className="stat-card" key={i}>
          <div className="icon">{stat.icon}</div>
          <div className="value">{stat.value}</div>
          <div className="label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

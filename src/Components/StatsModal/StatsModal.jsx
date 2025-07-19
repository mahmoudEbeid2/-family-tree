import React from "react";
import { Users, User, UserRound, Heart } from "lucide-react";
import "./StatsModal.css";
const StatsCards = ({ family }) => {
  const total = family.length;
  const males = family.filter((p) => p.type === "male").length;
  const females = family.filter((p) => p.type === "female").length;
  const alive = family.filter((p) => !p.daiedDate).length;

  const stats = [
    { label: "أفراد العائلة", value: total, icon: <Users size={24} /> },
    { label: "عدد الذكور", value: males, icon: <User size={24} /> }, // بديل لـ Male
    { label: "عدد الإناث", value: females, icon: <UserRound size={24} /> }, // بديل لـ Female
    { label: "عدد الأحياء", value: alive, icon: <Heart size={24} /> },
  ];

  return (
    <div className="stats-container">
      <div className="stats-data">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <div className="icon">{stat.icon}</div>
            <div className="value">{stat.value}</div>
            <div className="label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;

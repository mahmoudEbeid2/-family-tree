import React from "react";
import { Users, User, UserRound, Heart, X } from "lucide-react";
import "./StatsModal.css";

const StatsModal = ({ family, onClose }) => {
  if (!family) return null;

  const total = family.length;
  const males = family.filter((p) => p.type === "male").length;
  const females = family.filter((p) => p.type === "female").length;
  const alive = family.filter((p) => !p.daiedDate).length;

  const stats = [
    { label: "أفراد العائلة", value: total, icon: <Users size={24} /> },
    { label: "عدد الذكور", value: males, icon: <User size={24} /> },
    { label: "عدد الإناث", value: females, icon: <UserRound size={24} /> },
    { label: "عدد الأحياء", value: alive, icon: <Heart size={24} /> },
  ];

  return (
    <div className="stats-modal-overlay" onClick={onClose}>
      <div className="stats-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="stats-modal-header">
          <h5>إحصائيات العائلة</h5>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="stats-container">
          {stats.map((stat, i) => (
            <div className="stat-card" key={i}>
              <div className="icon">{stat.icon}</div>
              <div className="value">{stat.value}</div>
              <div className="label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
  
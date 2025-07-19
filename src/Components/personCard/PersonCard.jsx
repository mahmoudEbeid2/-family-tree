import React from "react";
import { Facebook, Mail, Phone } from "lucide-react";
import "./person.css";

const PersonCard = ({ person }) => {
  return (
    <div className="person-card">
      <div className="right">
        <img
          src={person?.imageUrl || "https://via.placeholder.com/150"}
          alt={person?.name || "No Name"}
          className="circle-img"
        />
        <h3 className="name">{person?.name || "—"}</h3>
      </div>

      <div className="person-details">
        <div className="info">
          <p>
            <strong>تاريخ الميلاد:</strong> {person?.birthYear || "—"}
          </p>
          <p>
            <strong>تاريخ الوفاة:</strong> {person?.daiedDate || "—"}
          </p>
          <p>
            <strong>الحالة الاجتماعية:</strong> {person?.maritalStatus || "—"}
          </p>
          <p>
            <strong>المهنة:</strong> {person?.job || "—"}
          </p>
          <p>
            <strong>عدد الأبناء:</strong> {person?.children?.length || 0}
          </p>
        </div>

        <div className="icons-row">
          <a
            href={person?.contact?.facebook || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="icon facebook"
          >
            <Facebook size={16} />
          </a>
          <a
            href={`mailto:${person?.contact?.mail || ""}`}
            className="icon mail"
          >
            <Mail size={16} />
          </a>
          <a href={`tel:${person.contact.phone}`} className="icon phone">
            <Phone size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;

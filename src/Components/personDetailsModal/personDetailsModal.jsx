import React, { useState } from "react";
import {
  X,
  Facebook,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./PersonDetailsModal.css";

const PersonDetailsModal = ({ person, onClose }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [enlargedPhotoIndex, setEnlargedPhotoIndex] = useState(null);

  const age = person.deathYear
    ? person.deathYear - person.birthYear
    : new Date().getFullYear() - person.birthYear;

  const handleEnlarge = (index) => {
    setEnlargedPhotoIndex(index);
  };

  const closeEnlarged = () => {
    setEnlargedPhotoIndex(null);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setEnlargedPhotoIndex((prev) =>
      prev > 0 ? prev - 1 : person.photos.length - 1
    );
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setEnlargedPhotoIndex((prev) =>
      prev < person.photos.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="person-modal">
      <button className="close-btn" onClick={onClose}>
        <X size={20} />
      </button>

      <div className="right">
        <img src={person.imageUrl} alt={person.name} className="person-img" />
        <h4 className="person-name centered-name">{person.name}</h4>

        <div className="social-icons centered-icons">
          <a
            href={person.contact.facebook || "https://www.facebook.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="icon facebook"
          >
            <Facebook size={14} />
          </a>
          <a href={`mailto:${person.contact.mail}`} className="icon mail">
            <Mail size={14} />
          </a>
          <a href={`tel:${person.contact.phone}`} className="icon phone">
            <Phone size={14} />
          </a>
        </div>
      </div>

      <div className="person-info-area">
        <ul className="nav nav-tabs mb-2">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "info" ? "active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              عرض البيانات
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "bio" ? "active" : ""}`}
              onClick={() => setActiveTab("bio")}
            >
              السيرة الذاتية
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "photos" ? "active" : ""}`}
              onClick={() => setActiveTab("photos")}
            >
              الصور
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === "info" && (
            <div className="info-grid">
              <div className="info-column">
                <p>
                  <span className="data">المهنة:</span>{" "}
                  <span className="dataEntery">{person.job}</span>
                </p>
                <p>
                  <span className="data">عدد الأبناء:</span>{" "}
                  <span className="dataEntery">{person.children.length}</span>
                </p>
                <p>
                  <span className="data">المدينة:</span>{" "}
                  <span className="dataEntery">{person.city}</span>
                </p>
                <p>
                  <span className="data">المنطقة:</span>{" "}
                  <span className="dataEntery">{person.region}</span>
                </p>
              </div>
              <div className="info-column">
                <p>
                  <span className="data">تاريخ الميلاد:</span>{" "}
                  <span className="dataEntery">{person.birthYear}</span>
                </p>
                <p>
                  <span className="data">تاريخ الوفاة:</span>{" "}
                  <span className="dataEntery">
                    {person.daiedDate || "---"}
                  </span>
                </p>
                <p>
                  <span className="data">الحالة الاجتماعية:</span>{" "}
                  <span className="dataEntery">
                    {person.maritalStatus || "---"}
                  </span>
                </p>
                <p>
                  <span className="data">العمر:</span>{" "}
                  <span className="dataEntery">{age} سنة</span>
                </p>
              </div>
            </div>
          )}

          {activeTab === "bio" && <p>{person.bio}</p>}

          {activeTab === "photos" && (
            <div className="d-flex flex-wrap">
              {person.photos.length > 0 ? (
                person.photos.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`photo-${i}`}
                    className="photo-thumb"
                    onClick={() => handleEnlarge(i)}
                    style={{ cursor: "zoom-in" }}
                  />
                ))
              ) : (
                <p>لا توجد صور متاحة</p>
              )}
            </div>
          )}
        </div>
      </div>

      {enlargedPhotoIndex !== null && (
        <div className="photo-overlay" onClick={closeEnlarged}>
          <button className="close-enlarged" onClick={closeEnlarged}>
            <X size={24} />
          </button>

          {/* Prev */}
          <button
            className="nav-arrow left"
            onClick={prevPhoto}
            style={{
              position: "absolute",
              left: "20%",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            className="nav-arrow right"
            onClick={nextPhoto}
            style={{
              position: "absolute",
              right: "20%",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <ChevronRight size={22} />
          </button>

          <img
            src={person.photos[enlargedPhotoIndex]}
            alt="enlarged"
            className="enlarged-img"
          />
        </div>
      )}
    </div>
  );
};

export default PersonDetailsModal;

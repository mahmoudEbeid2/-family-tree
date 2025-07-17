import React, { useState } from 'react';
import { X, Facebook, Mail, Phone } from 'lucide-react';
import './PersonDetailsModal.css';

const PersonDetailsModal = ({ person, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');

  const age = person.deathYear 
    ? person.deathYear - person.birthYear 
    : new Date().getFullYear() - person.birthYear;

  return (
    <div className="person-modal">
      <button className="close-btn" onClick={onClose}>
        <X size={20} />
      </button>

    <div className="right">
          <img src={person.imageUrl} alt={person.name} className="person-img" />
      <h4 className="person-name centered-name">{person.name}</h4>

        <div className="social-icons centered-icons">
          <Facebook size={18} />
          <Mail size={18} />
          <Phone size={18} />
        </div>
    </div>
      <div className="person-info-area">
        

        <ul className="nav nav-tabs mb-2">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
              عرض البيانات
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'bio' ? 'active' : ''}`} onClick={() => setActiveTab('bio')}>
              السيرة الذاتية
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => setActiveTab('photos')}>
              الصور
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'info' && (
           <div className="info-grid">
  <div className="info-column">
    <p><strong>المهنة:</strong> {person.job}</p>
    <p><strong>عدد الأبناء:</strong> {person.childrenCount}</p>
    <p><strong>المدينة:</strong> {person.city}</p>
    <p><strong>المنطقة:</strong> {person.region}</p>
  </div>
  <div className="info-column">
    <p><strong>تاريخ الميلاد:</strong> {person.birthYear}</p>
    <p><strong>تاريخ الوفاة:</strong> {person.deathYear || '---'}</p>
    <p><strong>الحالة الاجتماعية:</strong> {person.maritalStatus || 'متزوج'}</p>
    <p><strong>العمر:</strong> {age} سنة</p>
  </div>
</div>

          )}
          {activeTab === 'bio' && <p>{person.bio}</p>}
          {activeTab === 'photos' && (
            <div className="d-flex flex-wrap">
              {person.photos.length > 0 ? person.photos.map((img, i) => (
                <img key={i} src={img} alt={`photo-${i}`} className="photo-thumb" />
              )) : <p>لا توجد صور متاحة</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsModal;

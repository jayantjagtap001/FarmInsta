import React from 'react';
import './UserCard.css';

const UserCard = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <img src={user.imageUrl} alt={user.name} className="profile-img" />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.description}</p>
      <p><strong>Languages:</strong> {user.languages}</p>
      <p><strong>Education:</strong> {user.education}</p>
      <p><strong>Specialization:</strong> {user.specialization}</p>
      <div className="social-links">
        {user.twitter && <a href={user.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
        {user.instagram && <a href={user.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
      </div>
      <button className="edit-btn" onClick={onEdit}>Edit</button>
    </div>
  );
};

export default UserCard;

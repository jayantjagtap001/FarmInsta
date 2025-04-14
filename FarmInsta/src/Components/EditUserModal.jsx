// components/EditUserModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/actions';
import axios from 'axios';
import './EditUserModal.css';

const EditUserModal = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(user || {});

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    await axios.put(`https://farminsta-b85ba-default-rtdb.firebaseio.com/users/${user.email.replace('.', '_')}.json`, formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field, index) => (
            <input
              key={index}
              type="text"
              name={field}
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
              required={field !== 'twitter' && field !== 'instagram'}
            />
          ))}
          <div className="modal-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions';
import axios from 'axios';
import './AddUserForm.css';


const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', description: '', languages: '',
    education: '', specialization: '', twitter: '', instagram: '', imageUrl: ''
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    await axios.post('https://farminsta-b85ba-default-rtdb.firebaseio.com/users.json', formData);
    setFormData({
      name: '', email: '', description: '', languages: '',
      education: '', specialization: '', twitter: '', instagram: '', imageUrl: ''
    });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {Object.keys(formData).map((field, index) => (
        <input
          key={index}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          required={field !== 'twitter' && field !== 'instagram'}
        />
      ))}
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;

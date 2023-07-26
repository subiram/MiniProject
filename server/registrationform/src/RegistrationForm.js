import React, { useState } from 'react';
import axios from 'axios';

const formStyles = {
  maxWidth: '400px',
  margin: '0 auto', // This will center the form horizontally
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#fff',
};

const labelStyles = {
  fontWeight: 'bold',
};

const inputStyles = {
  display: 'block',
  width: '100%',
  marginBottom: '10px',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyles = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      alert(response.data.message);
      // Clear the form after successful registration
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message); // Display the duplicate email error message
      } else {
        alert('Error registering user. Please try again.');
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <label  style={labelStyles}>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyles} required/>
      </label>
      <label style={labelStyles}>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyles} required/>
      </label>
      <label style={labelStyles}>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} style={inputStyles} required/>
      </label>
      <label style={labelStyles}>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={inputStyles}
          required
        />
      </label>
      <button type="submit" style={buttonStyles}>Register</button>
    </form>
  );
};

export default RegistrationForm;
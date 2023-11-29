import React, { useState } from 'react';
import './style_edit.css';


function ContactEditor() {
  const [callToText,  setCallToText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [phoneText, setPhoneText] = useState('');

  const handleSave= async (event: { preventDefault : () => void; }) => {
    event.preventDefault();
    const baseURL = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch (`${baseURL}/contact`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          callTo: callToText,
          email: emailText,
          phone: phoneText
        }),     
      });

      if(!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  return (
    <div>
      <h2>Edit Contact Page</h2>
      <form onSubmit={handleSave}>
        <div className="text-area-container">
          <label>Call to Action:</label>
          <textarea value={callToText} onChange={(e) => setCallToText(e.target.value)} />
        </div>
        <div className="text-area-container">
          <label>Email:</label>
          <textarea value={emailText} onChange={(e) => setEmailText(e.target.value)} />
        </div>
        <div className="text-area-container">
          <label>Phone Number:</label>
          <textarea value={phoneText} onChange={(e) => setPhoneText(e.target.value)} />
        </div>
        <div className="custom-button">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default ContactEditor;
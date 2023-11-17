import React, { useState } from 'react';
import './style_edit.css';


function AboutEditor() {
  const [aboutUsText, setAboutUsText] = useState('');
  const [ourMissionText, setOurMissionText] = useState('');
  const [ourValuesText, setOurValuesText] = useState('');
  const [meetText, setMeetText] = useState('');

  const handleSave = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aboutUs: aboutUsText,
          ourMission: ourMissionText,
          ourValues: ourValuesText,
          meet: meetText
        }),
      });

      if(!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Data updated succesfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <h2>Edit About Page</h2>
      <form onSubmit={handleSave}>
        <div className="text-area-container">
          <label>Our History</label>
          <textarea value={aboutUsText} onChange={(e) => setAboutUsText(e.target.value)} />
        </div>
        <div className="text-area-container">
          <label>Our Mission:</label>
          <textarea value={ourMissionText} onChange={(e) => setOurMissionText(e.target.value)} />
        </div>
        <div className="text-area-container">
          <label>Our Values:</label>
          <textarea value={ourValuesText} onChange={(e) => setOurValuesText(e.target.value)} />
        </div>
        <div className="text-area-container">
          <label>Meet Gail Tateyama:</label>
          <textarea value={meetText} onChange={(e) => setMeetText(e.target.value)} />
        </div>
        <div className="custom-button">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AboutEditor;
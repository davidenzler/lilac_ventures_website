import React, { useState } from 'react';
import './style_edit.css';

function HomepageEditor() {
  const [heroText, setHeroText] = useState('');
  const [infoText, setInfoText] = useState('');

  const handleSave = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hero: heroText,
          info: infoText,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <h2>Edit Homepage</h2>
      <form onSubmit={handleSave}>
        <div className="text-area-container">
          <label>Hero Section:</label>
          <textarea value={heroText} onChange={(e) => setHeroText(e.target.value)} />
        </div>
        <div className="text-area-container">
          <label>Info Section:</label>
          <textarea value={infoText} onChange={(e) => setInfoText(e.target.value)} />
        </div>
        <div className="custom-button">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default HomepageEditor;
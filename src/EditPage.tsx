import React, { useState } from 'react';
import HomepageView from './HomepageView';
import AboutView from './AboutView';
import ContactView from './ContactView';
import HomepageEditor from './Edit/HomepageEdit';
import AboutEditor from './Edit/AboutEdit';
import ContactEditor from './Edit/ContactEdit';

function EditPage() {
  const [selectedPage, setSelectedPage] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div>
      <h1>Editor</h1>
      <p>Select a page to view:</p>

      <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
        <option value="">-- Select a page --</option>
        <option value="homepage">Homepage</option>
        <option value="about">About</option>
        <option value="contact">Contact</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={isEditMode}
          onChange={() => setIsEditMode(!isEditMode)}
        />
        Edit Mode
      </label>

      {selectedPage === 'homepage' && (
        isEditMode ? (
          <HomepageEditor/>
        ) : (
          <HomepageView/>
        )
      )}

      {selectedPage === 'about' && (
        isEditMode ? (
          <AboutEditor/>
        ) : (
          <AboutView/>
        )
      )}

      {selectedPage === 'contact' && (
        isEditMode ? (
          <ContactEditor/>
        ) : (
          <ContactView/>
        )
      )}
      
    </div>
  );
}

export default EditPage;
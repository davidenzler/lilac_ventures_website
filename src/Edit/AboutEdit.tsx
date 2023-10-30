import React, { useState } from 'react';

interface AboutEditorProps {
  content: {
    aboutMe: string;
    ourMission: string;
    aboutLilacVentures: string;
  };
  onSave: (updatedContent: {
    aboutMe: string;
    ourMission: string;
    aboutLilacVentures: string;
  }) => void;
}

function AboutEditor() {

  return (
    <div>
      <h2>Edit About Page</h2>
      <form>
        <div>
          <label>About Me:</label>
          <textarea
          />
        </div>
        <div>
          <label>Our Mission:</label>
          <textarea
          />
        </div>
        <div>
          <label>About Lilac Ventures:</label>
          <textarea
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
}

export default AboutEditor;
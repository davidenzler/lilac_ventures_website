import React, { useState } from 'react';



function ContactEditor() {
 
  return (
    <div>
      <h2>Edit Contact Page</h2>
      <form>
        <div>
          <label>Call to Action:</label>
          <textarea
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
}

export default ContactEditor;
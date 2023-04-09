import React, { useState } from "react";
import PdfUpload from "../../PdfUpload";

export default function Step1() {
  // Set initial state for displaying and success of PdfUpload components A and B
  const [showPdfUploadA, setShowPdfUploadA] = useState(false);
  const [isUploadSuccessfulA, setIsUploadSuccessfulA] = useState(false);
  const [showPdfUploadB, setShowPdfUploadB] = useState(false);
  const [isUploadSuccessfulB, setIsUploadSuccessfulB] = useState(false);

  // Handle button click to display PdfUpload component A
  const handleClickA = () => {
    setShowPdfUploadA(true);
  };

  // Handle successful file upload for PdfUpload component A
  const handleUploadSuccessA = () => {
    setIsUploadSuccessfulA(true);
    setShowPdfUploadA(false);
  };

  // Handle button click to display PdfUpload component B
  const handleClickB = () => {
    setShowPdfUploadB(true);
  };

  // Handle successful file upload for PdfUpload component B
  const handleUploadSuccessB = () => {
    setIsUploadSuccessfulB(true);
    setShowPdfUploadB(false);
  };

  // Render Step1 component with buttons and PdfUpload components A and B
  return (
    <div>
      <div>Display Things to do for Step 1 Here</div>
      <br></br>
      <div style={{ display: "flex"}}>
        <div style={{ marginRight:'20px'}}>Upload your file for Form A: </div>
        <div>
          {!isUploadSuccessfulA && !showPdfUploadA && <button className="pdf-btn" onClick={handleClickA}>Upload File</button>}
          {isUploadSuccessfulA && !showPdfUploadA && <div style={{color:"#008000"}}> Successfully Uploaded!</div>}
        </div>       
      </div>    
      {showPdfUploadA && <PdfUpload text="Form A" onFileUploadSuccess={handleUploadSuccessA} />}
      <br></br>
      <div style={{ display: "flex"}}>
        <div style={{ marginRight:'20px'}}>Upload your file for Form B: </div>
        <div>
          {!isUploadSuccessfulB && !showPdfUploadB && <button className="pdf-btn" onClick={handleClickB}>Upload File</button>}
          {isUploadSuccessfulB && !showPdfUploadB && <div style={{color:"#008000"}}> Successfully Uploaded!</div>}
        </div>       
      </div>    
      {showPdfUploadB && <PdfUpload text="Form B" onFileUploadSuccess={handleUploadSuccessB} />}
    </div>
  );
}

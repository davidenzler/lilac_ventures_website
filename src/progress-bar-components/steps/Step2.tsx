import React, { useState } from "react";
import PdfUpload from "../../PdfUpload";
import "../../ProgressBar.css";

export default function Step2(){
  const [showPdfUploadA, setShowPdfUploadA] = useState(false);
  const [isUploadSuccessfulA, setIsUploadSuccessfulA] = useState(false);
  const [showPdfUploadB, setShowPdfUploadB] = useState(false);
  const [isUploadSuccessfulB, setIsUploadSuccessfulB] = useState(false);

  const handleClickA = () => {
    setShowPdfUploadA(true);
  };

  const handleUploadSuccessA = () => {
    setIsUploadSuccessfulA(true);
    setShowPdfUploadA(false);
  };

  const handleClickB = () => {
    setShowPdfUploadB(true);
  };

  const handleUploadSuccessB = () => {
    setIsUploadSuccessfulB(true);
    setShowPdfUploadB(false);
  };

  return (
    <div>
      <div>Display Things to do for Step 2 Here</div>
      <br></br>
      <div style={{ display: "flex"}}>
        <div style={{ marginRight:'20px'}}>Upload your file for Form C: </div>
        <div>
          {!isUploadSuccessfulA && !showPdfUploadA && <button className="pdf-btn" onClick={handleClickA}>Upload File</button>}
          {isUploadSuccessfulA && !showPdfUploadA && <div style={{color:"#008000"}}> Successfully Uploaded!</div>}
        </div>       
      </div>    
      {showPdfUploadA && <PdfUpload text="Form C" onFileUploadSuccess={handleUploadSuccessA} />}
      <br></br>
      <div style={{ display: "flex"}}>
        <div style={{ marginRight:'20px'}}>Upload your file for Form D: </div>
        <div>
          {!isUploadSuccessfulB && !showPdfUploadB && <button className="pdf-btn" onClick={handleClickB}>Upload File</button>}
          {isUploadSuccessfulB && !showPdfUploadB && <div style={{color:"#008000"}}> Successfully Uploaded!</div>}
        </div>       
      </div>    
      {showPdfUploadB && <PdfUpload text="Form D" onFileUploadSuccess={handleUploadSuccessB} />}
    </div>
  );
}
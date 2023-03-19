import React, { useState, useEffect } from 'react';

function ProgressBar(){
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 10;
          if (newProgress === 100) {
            clearInterval(interval);
          }
          return newProgress;
        });
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        <br></br>
        <h2>Very Basic Progress Bar Prototypes:</h2>
        <br></br>
        <p>Dynamic Progress Bar Test:</p>
        <progress value={progress} max="100" />
        <br></br>
        <p>Static 7 Step Progress Bar:</p>
        <div className="progress-wrapper">
          <div className="step step1"></div>
          <div className="step step2"></div>
          <div className="step step3"></div>
          <div className="step step4"></div>
          <div className="step step5"></div>
          <div className="step step6"></div>
          <div className="step step7"></div>
        </div>
      </div>
    );
}

export default ProgressBar;
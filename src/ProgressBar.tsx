import React, { useState, useEffect } from 'react';
import { UseContextProvider } from './progress-bar-components/contexts/StepperContext';
import Step from "./progress-bar-components/Step"
import StepControl from './progress-bar-components/StepControl';
import Step1 from './progress-bar-components/steps/Step1';
import Step2 from './progress-bar-components/steps/Step2';
import Step3 from './progress-bar-components/steps/Step3';
import Step4 from './progress-bar-components/steps/Step4';
import Step5 from './progress-bar-components/steps/Step5';
import Step6 from './progress-bar-components/steps/Step6';
import Step7 from './progress-bar-components/steps/Step7';

function ProgressBar(){
    const steps: string[] = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7"];

    const [currentStep, setCurrentStep] = useState(1)
    const displayStep = (step: any) => {
      switch (step) {
        case 1:
          return <Step1 />;
        case 2:
          return <Step2 />;
        case 3:
          return <Step3 />;
        case 4:
          return <Step4 />;
        case 5:
          return <Step5 />;
        case 6:
          return <Step6 />;
        case 7:
          return <Step7 />;          
        default:
      }
    };

    const handleClick = (direction: string) => {
      let newStep = currentStep;
  
      direction === "next" ? newStep++ : newStep--;
      // bounds checking
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };

    return (
      <div className="progress-bar">
        <div className='progress-bar-title'>7 Steps to Debt Freedom</div>
        <div className="horizontal">
          <Step steps = {steps} currentStep = {currentStep}/>
        </div>
        <div className="step-main-content">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>               
          <StepControl handleClick={handleClick} currentStep={currentStep} steps={steps}/>
          
      </div>
    );
}

export default ProgressBar;

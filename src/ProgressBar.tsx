import React, { useState, useEffect } from 'react';
import axios from './api/axios';
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
import Completed from './progress-bar-components/steps/Completed';
import "./ProgressBar.css";
import  useAuth  from './hooks/useAuth';


/*
The "ProgressBar" component defines a "steps" array containing the names of each step, as well as a "currentStep" 
state variable and a "displayStep" function that takes a step number and returns the appropriate step component. 
The "handleClick" function is used to update the "currentStep" state variable depending on whether the user clicks the "next" or "previous" button. 
It performs bounds checking to make sure that the user cannot navigate beyond the first or last step. 
Finally, the "ProgressBar" component renders a series of elements including the "Step" component, the "displayStep" function, and the "StepControl" component.
*/
function ProgressBar(){
    const { auth }:any = useAuth();

    const steps: string[] = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7"];
    const [currentStep, setCurrentStep] = useState(1);
    const [clientMaxProgress, setClientMaxProgress] = useState(7);
    console.log(auth.user);
    
    //TODO: the below value is hardcoded
    const [currentUser, setCurrentUser] = useState(auth.user); // This should be the username of the user. This is used for filename
    
    async function getClientIDByEmail(email: any) {
      try {
        const response = await axios.get(`/customerProgress/getID/${email}`);
        const id = response.data.id; // Assuming the response contains an "id" property
        console.log("USER ID: ", id);
        return id;
      } catch (error) {
        // Handle errors here
        console.error('Error fetching client ID:', error);
        // throw error; // Re-throw the error to be handled by the calling function
      }
    }
    
    const [clientId, setClientId] = useState(getClientIDByEmail(currentUser)); //John: 650e4656f712cc07f4a5f2a4 . Flabby: 650e53edf712cc07f4a5f2b3

    useEffect(() => {
        async function fetchProgress() {
            try {
                const id = await getClientIDByEmail(currentUser); // Wait for the promise to resolve
                console.log(id);
                console.log(currentUser);
                setClientId(id);
                console.log(clientId);
                const response = await axios.get(`/customerProgress/${clientId}`);
                if (response.data.progress && response.data.progress >= 1 && response.data.progress <= 7) {
                    setCurrentStep(response.data.progress);
                    setClientMaxProgress(response.data.progress);
                }
                else if (response.data.progress && response.data.progress > 7) {
                  setCurrentStep(8); //Represents the completed section
                }
                // If progress value is null or not between 1-7, it remains the default (Step 1)
            } catch (error) {
                console.error("Error fetching user progress:", error);
                // If there's an error, you can choose to set a default value, or show a message to the user
                setCurrentStep(1);  // Setting back to default
            }
        }

        fetchProgress();  // Invoking the function inside useEffect
    }, [clientId]);  // Empty dependency array means this useEffect runs once when the component mounts
    
    
    const commonProps = {
      currentUser: currentUser,
      currentID: clientId
  };
    const displayStep = (step: any) => {
      switch (step) {
        case 1:
          return <Step1 {...commonProps}/>;
        case 2:
          return <Step2 {...commonProps}/>;
        case 3:
          return <Step3 {...commonProps}/>;
        case 4:
          return <Step4 {...commonProps}/>;
        case 5:
          return <Step5 {...commonProps}/>;
        case 6:
          return <Step6 {...commonProps}/>;
        case 7:
          return <Step7 {...commonProps}/>;
        case 8:
            return <Completed />;          
        default:
      }
    };

    const handleClick = (direction: string) => {
      let newStep = currentStep;
  
      direction === "next" ? newStep++ : newStep--;
      // bounds checking
      newStep > 0 && (newStep <= (steps.length + 1)) && newStep <= clientMaxProgress && setCurrentStep(newStep);
    };

    return (
      <div className="progress-bar" id="progress-bar">
        <h1 className='progress-bar-title'>7 Steps to Debt Freedom</h1>
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

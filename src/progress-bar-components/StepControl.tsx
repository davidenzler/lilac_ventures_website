import React from "react";
import "../ProgressBar.css";
/*
This is a React functional component called StepControl that receives props named handleClick, currentStep and steps. 
This component is responsible for rendering the control buttons in the UI of the steps.
 */
const StepControl = ({ handleClick, currentStep, steps }: { handleClick:any, currentStep: number, steps: any }) => {
    /*
    The buttonName function determines the text displayed in the "Next" button based on the value of currentStep and steps.length. 
    If currentStep equals steps.length, then the button text is "Finish". 
    If currentStep equals steps.length + 1, then the button text is "You're Done!". Otherwise, the button text is "Next".
     */
    const buttonName = () => {
        if(currentStep === steps.length){
            return("Finish");
        }
        else if(currentStep === steps.length + 1){
            return("You're Done!");
        }
        else {
            return("Next");
        }
        
    }
    /*
    The component renders two buttons with "Back" and "Next" labels respectively, which have click event handlers attached to them. 
    When clicked, the handleClick function is called with the "next" or "back" argument based on the button clicked. 
    The className of each button is set based on the value of currentStep. 
    If currentStep is 1, then the "Back" button is disabled by applying the disabled-back-button class. 
    If currentStep is equal to steps.length + 1, then the "Next" button is disabled by applying the disabled-next-button class.
     */
    return (
        <div className="step-control">
            <button
                onClick={() => handleClick()}
                className={currentStep === 1 ? "disabled-back-button" : "back"}
            >
                Back
            </button>
            <button
                onClick={() => handleClick("next")}
                className={currentStep === steps.length + 1 ? "disabled-next-button" : "next"}
            >
                {buttonName()}
            </button>
        </div>
    );
}

export default StepControl;

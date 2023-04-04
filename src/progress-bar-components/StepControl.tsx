import React from "react";

const StepControl = ({ handleClick, currentStep, steps }: { handleClick:any, currentStep: number, steps: any }) => {
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
                className={"next"}
            >
                {currentStep === steps.length ? "Finish" : "Next"}
            </button>
        </div>
    );
}

export default StepControl;

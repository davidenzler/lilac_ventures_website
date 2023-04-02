import React,{useEffect, useState, useRef} from "react";

/* 
This code exports a React component named "Step". 
This component takes two props, "steps" and "currentStep", and renders a multi-step form with step descriptions, numbers, and status indicators.
The component initializes an empty array named "result" and creates a state variable "newStep" using the "useState" hook with "result" as the initial value. 
It also creates a reference object using the "useRef" hook named "stepRef".
*/
const Step = ({ steps, currentStep }: { steps: any, currentStep: number }) => {
    const result : any[] = [];
    const [newStep, setNewStep] = useState(result);
    const stepRef = useRef();

    /*
    The "updateStep" function takes the current step number and an array of steps and returns a new array of steps with updated properties 
    (highlighted, selected, and completed) based on the current step number. 
    This function is used to update the "newStep" state variable whenever "steps" or "currentStep" changes.
    */
    const updateStep = (stepNumber: number, steps: any) => {
        const newSteps = [...steps];
        // console.log(newSteps);
        let count = 0;
        while (count < newSteps.length) {
          //current step
          if (count === stepNumber) {
            newSteps[count] = {
              ...newSteps[count],
              highlighted: true,
              selected: true,
              completed: false,
            };
            count++;
          }
    
          //step completed
          else if (count < stepNumber) {
            newSteps[count] = {
              ...newSteps[count],
              highlighted: false,
              selected: true,
              completed: true,
            };
            count++;
          }
          //step pending
          else {
            newSteps[count] = {
              ...newSteps[count],
              highlighted: false,
              selected: false,
              completed: false,
            };
            count++;
          }
        }
    
        return newSteps;
    };

    /*
    The "useEffect" hook is used to initialize the "stepRef" object with an array of steps passed as the "steps" prop. 
    It then calls the "updateStep" function with the current step number passed as the "currentStep" prop and assigns 
    the result to the "newStep" state variable using the "setNewStep" function.
    */
    useEffect(() => {
        const stepsState = steps.map((step: any, index: number) =>
          Object.assign(
            {},
            {
              description: step,
              completed: false,
              highlighted: index === 0 ? true : false,
              selected: index === 0 ? true : false,
            }
          )
        );
    
        stepRef.current = stepsState;
        const current = updateStep(currentStep - 1, stepRef.current);
        setNewStep(current);
      }, [steps, currentStep]);

    /*
    The "displayStep" variable is created by mapping the "newStep" array to a list of "div" elements containing the step number, description, and status indicators. 
    If the step is completed, the step number is replaced with a checkmark. The "displayStep" variable is rendered as the content of the "Step" component.
     */
    const displayStep = newStep.map((step, index) => {
        let displayNumClass = step.selected ? `displayNumSelected-container` : `displayNum-container`;
        displayNumClass += step.selected ? ` displayNumSelected${index + 1}-container` : ``;
        return (
            <div key={index} className={index !== newStep.length - 1 ? "display-capsule" : "display-capsule2"}>
                <div className="display1-container">
                    {/*Number*/}
                    <div className={displayNumClass}>
                        {/*If the step is completed, it is replaced with a checkmark, otherwise it contains the next number in the index*/}
                        {step.completed ? (<span className="checkmark">&#10003;</span>) : (index + 1)}
                    </div>
                    {/*Description*/}
                    <div className={step.highlighted ? "displayDescriptionSelected-container" : "displayDescription-container"}>{step.description}</div>
                </div>
                {/*Line (The beginning part is used to remove extra line after the 7th step)*/}
                {(index + 1 !== 7) && <div className={step.completed ? "displayLineSelected-container" : "displayLine-container"}></div>}
            </div>
        );
    });

    return (
        <div className="step-container">
          {displayStep}
        </div>
      );
}

export default Step;

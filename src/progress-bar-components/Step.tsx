import React,{useEffect, useState, useRef} from "react";

const Step = ({ steps, currentStep }: { steps: any, currentStep: number }) => {
    const result : any[] = [];
    const [newStep, setNewStep] = useState(result);
    const stepRef = useRef();

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

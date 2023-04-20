import React,{useEffect, useState, useRef} from "react";
import step1Image from '../assets/img/penny.png';
import step2Image from '../assets/img/nickel.png';
import step3Image from '../assets/img/dime.png';
import step4Image from '../assets/img/quarter.png';
import step5Image from '../assets/img/half-dollar.png';
import step6Image from '../assets/img/dollar.png';
import step7Image from '../assets/img/cash.png';
import "../ProgressBar.css";


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


      const stepImage = (step: any, index:number) => {
        let cName = "step-image-default";
        if (step.completed) {
          cName="step-image-complete";
        } else if (step.highlighted) {
          cName="step-image-selected";
        } else {
          cName="step-image-default";
        }

        switch (index) {
          case 1:
            return <img src={step1Image} alt="Step 1" className={cName}/>;
          case 2:
            return <img src={step2Image} alt="Step 2" className={cName}/>;
          case 3:
            return <img src={step3Image} alt="Step 3" className={cName}/>;
          case 4:
            return <img src={step4Image} alt="Step 4" className={cName}/>;
          case 5:
            return <img src={step5Image} alt="Step 5" className={cName}/>;
          case 6:
            return <img src={step6Image} alt="Step 6" className={cName}/>;
          case 7:
            return <img src={step7Image} alt="Step 7" className={cName}/>;
          default:
              return
        }
      };

    /*
    The "displayStep" variable is created by mapping the "newStep" array to a list of "div" elements containing the step number, description, and status indicators. 
    If the step is completed, the step number is replaced with a checkmark. The "displayStep" variable is rendered as the content of the "Step" component.
     */
    const displayStep = newStep.map((step, index) => {
        let displayNumClass = step.selected ? `displayNumSelected-container` : `displayNum-container`;
        displayNumClass += step.selected ? ` displayNumSelected${index + 1}-container` : ``;

        // Define a variable to hold the image to be displayed based on the step's status
        // let imageToDisplay = null;
        // if (step.completed) {
        //   imageToDisplay = stepImageCompleted(index + 1);
        // } else if (step.highlighted) {
        //   imageToDisplay = stepImageSelected(index + 1);
        // } else {
        //   imageToDisplay = stepImage(index + 1);
        // }
        return (
            <div key={index} className={index !== newStep.length - 1 ? "display-capsule" : "display-capsule2"}>
                <div className="display1-container">
                    {/*Number*/}
                    <div className={displayNumClass}>
                        {/*If the step is completed, it is replaced with a checkmark, otherwise it contains the next number in the index*/}
                        {/* {step.completed ? (<span className="checkmark">&#10003;</span>) : (index + 1)} */}
                        {stepImage(step,index+1)}
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

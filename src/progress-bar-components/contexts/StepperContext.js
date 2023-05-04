import React, { createContext, useContext, useState } from "react";

const StepperContext = createContext({ userData: "", setUserData: null });

/*
The UseContextProvider component is defined that creates a state variable userData and a function setUserData to update it. 
This component sets the value of the StepperContext.Provider to an object containing userData and setUserData.
*/
export function UseContextProvider({ children }) {
  const [userData, setUserData] = useState("");

  return (
    <StepperContext.Provider value={{ userData, setUserData }}>
      {children}
    </StepperContext.Provider>
  );
}
/*
The useStepperContext hook is defined that returns an object containing userData and setUserData using the useContext hook to get the values set by the UseContextProvider.
 */
export function useStepperContext() {
  const { userData, setUserData } = useContext(StepperContext);

  return { userData, setUserData };
}



{/* This file uses the contexts API as a way to change the page depending on what step is currently displayed */}
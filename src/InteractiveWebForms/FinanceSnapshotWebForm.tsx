import * as React from "react";
import { useForm } from "react-hook-form";
import './FinanceSnapshotWebForm.css'; 
import  PersonalInformation  from "./FS_Subsections/PersonalInformation";
import  IncomeAndSavings  from "./FS_Subsections/IncomeAndSavings";
import HousingAndConsumerDebt from "./FS_Subsections/HousingAndConsumerDebt";
import SessionInformation from "./FS_Subsections/SessionInformation";

/*
This is a React component that renders a form using react-hook-form library. 
The form has sections, "Personal Information", "Income and Savings", "Housing and Consumer Debt",
"Session Information", which contain various input fields and radio button groups. 
The form fields have validation rules, which are enforced by react-hook-form and displayed in the errors object.
The FormData type defines the shape of the form data that will be submitted.
The onSubmit function is called when the form is submitted, and it logs the form data to the console and 
sets the formSubmitted state to true. The formSubmitted state is initially set to false.
The component returns a div containing the form. 
If formSubmitted is true, it displays a success message; otherwise, it displays the form. 
Each input field and radio button group is rendered using the register function provided by react-hook-form. 
The handleSubmit function is called when the form is submitted, and it calls the onSubmit function. 
The validation rules for each input field and radio button group are specified in the register function's second argument.
*/
type FormData = {
  firstName: string;
  lastName: string;
};

export default function FinanceSnapshotWebForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    setFormSubmitted(true);
  };
  console.log(errors);

  const [formSubmitted, setFormSubmitted] = React.useState(false);

  
  return (
    <div className="webFormBody">
      {formSubmitted ? (<h1>Success! Form submitted.</h1>) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInformation register={register}/>
          <IncomeAndSavings register={register}/>
          <HousingAndConsumerDebt register={register}/>
          <SessionInformation register={register}/>
          <input type="submit" />
        </form>
    
      )}
    </div>
  );
}
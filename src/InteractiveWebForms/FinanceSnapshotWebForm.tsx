import * as React from "react";
import { useForm } from "react-hook-form";
import './FinanceSnapshotWebForm.css'; 

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
            <div className='section-snapshot'>
              <h1><u>Personal Information</u></h1>
              <label> Your Name:
                <input type="text" placeholder="Name" {...register("Your Name", {required: true})} />
              </label>
              <label>Age: <input type="number" placeholder="Age" {...register("Age", {required: true, min: 1})} /></label>
              <label>Type of Work: <input type="text" placeholder="Type of Work" {...register("Type of Work", {required: true})} /></label>
              <label>Spouse Name: <input type="text" placeholder="Spouse Name" {...register("Spouse Name", {required: true})} /></label>
              <label>Spouse Age: <input type="number" placeholder="Spouse Age" {...register("Spouse Age", {required: true, min: 1})} /></label>
              <label>Spouse Type of Work: <input type="text" placeholder="Spouse Type of Work" {...register("Spouse Type of Work", {required: true})} /></label>
              
              <div className='radioQuestion-snapshot'>
                <div>Have you been through FPU?</div>
                <label>Yes:
                  <input {...register("Have you been through FPU?", { required: true })} type="radio" value="Yes" />
                </label>
                <label>No:
                  <input {...register("Have you been through FPU?", { required: true })} type="radio" value=" No" />
                </label>
                <label>What's FPU?:
                  <input {...register("Have you been through FPU?", { required: true })} type="radio" value=" What's FPU?" />
                </label>
              </div>
    
              <label>Number of Children or other dependents: <input type="number" placeholder="Number of Children" {...register("Number of Children or Other Dependents", {required: true, min: 0})} /></label>
              <label>Mailing Address: <input type="text" placeholder="Mailing Address" {...register("Mailing Address", {required: true})} /></label>
              <label>City: <input type="text" placeholder="City" {...register("City", {required: true})} /></label>
              <label>State: <input type="text" placeholder="State" {...register("State", {required: true})} /></label>
              <label>ZIP: <input type="number" placeholder="ZIP" {...register("ZIP", {required: true})} /></label>
              <label>Phone: <input type="text" placeholder="Phone" {...register("Phone", {})} /></label>
              <label>Email:<input type="email" placeholder="Email" {...register("Email", {required: true})} /></label>
    
              <div className='radioQuestion-snapshot'>
                <div>Preferred method of contact for your session?</div>
                <label>In Person:
                  <input {...register("Preferred method of contact for your session?", { required: true })} type="radio" value="In Person" />
                </label>
                <label>Phone:
                  <input {...register("Preferred method of contact for your session?", { required: true })} type="radio" value=" Phone" />
                </label>
                <label>Video Conference:
                  <input {...register("Preferred method of contact for your session?", { required: true })} type="radio" value=" Video Conference" />
                </label>
              </div>
    
            </div>
    
            <div className='section-snapshot'>
              <h1><u>Income and Savings</u></h1>
              <div className='subSection-snapshot'>
                <h2>Income</h2>
                <label>What is your monthly net take-home pay?: <input type="text" placeholder="Monthly take-home pay" {...register("What is your monthly net take-home pay?", {required: true})} /></label>
    
                <div className='radioQuestion-snapshot'>
                  <div>Do you have an irregular income?</div>
                  <label>Yes:
                    <input {...register("Do you have an irregular income?", { required: true })} type="radio" value="Yes" />
                  </label>
                  <label>No:
                    <input {...register("Do you have an irregular income?", { required: true })} type="radio" value=" No" />
                  </label>
                </div>
    
                <div className='radioQuestion-snapshot'>
                  <div>Do you use a monthly budget?</div>
                  <label>Yes:
                    <input {...register("Do you use a monthly budget?")} type="radio" value="Yes" />
                  </label>
                  <label>No:
                    <input {...register("Do you use a monthly budget?")} type="radio" value="No" />
                  </label>
                </div>
    
    
              </div>
              <div className='subSection-snapshot'>
                <h2>Savings</h2>
                
                <div className='radioQuestion-snapshot'>
                  <div>Do you have an emergency fund?</div>
                  <label>Yes:
                    <input {...register("Do you have an emergency fund?", { required: true })} type="radio" value="Yes" />
                  </label>
                  <label>No:
                    <input {...register("Do you have an emergency fund?", { required: true })} type="radio" value="No" />
                  </label>
                </div>
    
                <label>If you have an emergency fund, how much is in the fund?: </label><input type="text" placeholder="Fund Value" {...register("If you have an emergency fund, how much is in the fund?", {})} />
                
                <div className='radioQuestion-snapshot'>
                  <div>Are you currently investing for retirement?</div>
                  <label>Yes:
                    <input {...register("Are you currently investing for retirement?", { required: true })} type="radio" value="Yes" />
                  </label>
                  <label>No:
                    <input {...register("Are you currently investing for retirement?", { required: true })} type="radio" value="No" />
                  </label>
                </div>
    
                <label>What is your balance?: <input type="text" placeholder="Balance" {...register("What is your balance?", {})} /></label>
                <label>What is your monthly contribution?: <input type="text" placeholder="Monthly contribution" {...register("What is your monthly contribution?", {})} /></label>
    
                <div className='radioQuestion-snapshot'>
                  <div> Do you contribute to non-retirement savings?</div>
                  <label>Yes:
                    <input {...register("Do you contribute to non-retirement savings?", { required: true })} type="radio" value="Yes" />
                  </label>
                  <label>No:
                    <input {...register("Do you contribute to non-retirement savings?", { required: true })} type="radio" value="No" />
                  </label>
                </div>
    
                <label>What is your balance (Non-retirement savings)?: <input type="text" placeholder="Balance " {...register("What is your balance? (Non-retirement savings)", {})} /></label>
                <label>What is your monthly contribution (Non-retirement savings)?: <input type="text" placeholder="Monthly contribution" {...register("What is your monthly contribution? (Non-retirement savings)", {})} /></label>
    
              </div>
    
            </div>
    
            <div className='section-snapshot'>
              <h1><u>Housing and Consumer Debt</u></h1>
              <div className='subSection-snapshot'>
                <h2>Housing</h2>
    
                <div className='radioQuestion-snapshot'>
                  <div>Do you rent or own?</div>
                  <label>Rent:
                    <input {...register("Do you rent or own?", { required: true })} type="radio" value="Rent" />
                  </label>
                  <label>Own:
                    <input {...register("Do you rent or own?", { required: true })} type="radio" value="Own" />
                  </label>
                </div>
    
                <div className='radioQuestion-snapshot'>
                  <div>Are you current on your payment?</div>
                  <label>Yes:
                    <input {...register("Are you current on your payment?")} type="radio" value="Yes" />
                  </label>
                  <label>No:
                    <input {...register("Are you current on your payment?")} type="radio" value="No" />
                  </label>
                </div>
    
                <label>What are the total monthly payments?: <input type="text" placeholder="Total monthly payments" {...register("What are the total monthly payments?", {})} /></label>
              </div>
    
              <div className='subSection-snapshot'>
                <h2>Consumer Debt</h2>
    
                <div className='radioQuestion-snapshot'>
                  <div>Do you have any vehicle loans?</div>
                  <label>Yes:
                    <input {...register("Do you have any vehicle loans?", { required: true })} type="radio" value="Yes" />
                  </label>
                  <label>No:
                    <input {...register("Do you have any vehicle loans?", { required: true })} type="radio" value="No" />
                  </label>
                </div>
    
                <div className='radioQuestion-snapshot'>
                  <div>Are you current on vehicle payments?</div>
                  <label>Yes:
                    <input {...register("Are you current on vehicle payments?")} type="radio" value="Yes" />
                  </label>
                  <label>No:
                    <input {...register("Are you current on vehicle payments?")} type="radio" value="No" />
                  </label>
                </div>
    
                <label>What are the total monthly payments?: <input type="text" placeholder="Total monthly payments" {...register("What are your total monthly payments?", {})} /> </label>
                
                <div>
                  <div>List any total balances due:</div>
                  <label>Credit Cards: <input type="text" placeholder="Credit Cards" {...register("Credit Cards", {})} /></label>
                  <label>Student Loans: <input type="text" placeholder="Student Loans" {...register("Student Loans", {})} /> </label>
                  <label>Taxes: <input type="text" placeholder="Taxes" {...register("Taxes", {})} /></label>
                  <label>Other: <input type="text" placeholder="Other" {...register("Other", {})} /></label>
                </div>
                
              </div>
    
              <div className='section-snapshot'>
                <h1><u>Session Information</u></h1>
                <div className='subSection-snapshot'>
                  <h2>What primary issue should we focus on during your coaching session?</h2>
                  
                  <div className='radioQuestion-snapshot'>
                    <label>Budgeting:
                      <input {...register("What primary issue should we focus on during your coaching session?", { required: true })} type="radio" value="Budgeting" />
                    </label>
                    <label>Real Estate:
                      <input {...register("What primary issue should we focus on during your coaching session?", { required: true })} type="radio" value="Real Estate" />
                    </label>
                    <label>Dealing With Collectors:
                      <input {...register("What primary issue should we focus on during your coaching session?", { required: true })} type="radio" value="Dealing With Collectors" />
                    </label>
                    <label>Wealth Building/Investing:
                      <input {...register("What primary issue should we focus on during your coaching session?", { required: true })} type="radio" value="Wealth Building/Investing" />
                    </label>
                    <label>Debt Elimination:
                      <input {...register("What primary issue should we focus on during your coaching session?", { required: true })} type="radio" value="Debt Elimination" />
                    </label>
                    <label>Other:
                      <input {...register("What primary issue should we focus on during your coaching session?", { required: true })} type="radio" value="Other" />
                    </label>
                  </div>
                  <label>If you selected Other please list here: <input type="text" placeholder="Other issues" {...register("If you selected Other please list here.", {})} /> </label>
                </div>
    
                <div className='subSection-snapshot'>
                  <h2>List the top three concerns/questions related to your above selection:</h2>
                  <input type="text" placeholder="Concerns" {...register("LIST THE TOP THREE CONCERNS/QUESTIONS RELATED TO YOUR ABOVE SELECTION:", {required: true})} />
                </div>
              </div>
            </div>
    
            <input type="submit" />
          </form>
    
      )}
    </div>
  );
}
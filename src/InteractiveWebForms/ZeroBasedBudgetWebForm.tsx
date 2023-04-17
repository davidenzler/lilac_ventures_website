import * as React from "react";
import { useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import "./FinanceSnapshotWebForm.css"; // import CSS file

/*
This is a React component that renders a  web form. 
It uses react-hook-form for form validation and react-currency-input-field to create currency input fields 
that allow users to enter financial amounts.
The component defines the structure of the form with sections for different budget categories such as Charity, Saving, 
Housing, Utilities, etc. Within each section, there are fields for "Spent" and "Budgeted" amounts. 
The component also has a section for "Other" expenses.
The component uses React's useState hook to manage the state of form data. For each budget category, 
it initializes a state variable to an empty object that will eventually contain the "Budgeted" amounts for that category. 
There are also state variables for the total budgeted amounts for each category.
The component defines two helper functions, createSection and createOtherSection, 
that generate the markup for each budget category section and the "Other" expenses section, respectively.
The component renders the form with the appropriate sections and fields. When the form is submitted, 
the onSubmit function is called, which logs the data to the console and sets the formSubmitted state variable to true.
*/


type FormData = {
  firstName: string;
  lastName: string;
};

export default function ZeroBasedBudgetWebForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const [monthlyTakeHomePay, setMonthlyTakeHomePay] = React.useState<number>();
  //Charity
  const [budgetedCharityInputs, setBudgetedCharityInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedCharity = Object.values(budgetedCharityInputs).reduce((acc, curr) => acc + curr, 0);
  //Saving
  const [budgetedSavingInputs, setBudgetedSavingInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedSaving = Object.values(budgetedSavingInputs).reduce((acc, curr) => acc + curr, 0);
  //Housing
  const [budgetedHousingInputs, setBudgetedHousingInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedHousing = Object.values(budgetedHousingInputs).reduce((acc, curr) => acc + curr, 0);
  //Utilities
  const [budgetedUtilitiesInputs, setBudgetedUtilitiesInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedUtilities = Object.values(budgetedUtilitiesInputs).reduce((acc, curr) => acc + curr, 0);
  //Food
  const [budgetedFoodInputs, setBudgetedFoodInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedFood = Object.values(budgetedFoodInputs).reduce((acc, curr) => acc + curr, 0);
  //Clothing
  const [budgetedClothingInputs, setBudgetedClothingInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedClothing = Object.values(budgetedClothingInputs).reduce((acc, curr) => acc + curr, 0);
  //Transportation
  const [budgetedTransportationInputs, setBudgetedTransportationInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedTransportation = Object.values(budgetedTransportationInputs).reduce((acc, curr) => acc + curr, 0);
  //Medical/Health
  const [budgetedHealthInputs, setBudgetedHealthInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedHealth = Object.values(budgetedHealthInputs).reduce((acc, curr) => acc + curr, 0);
  //Insurance
  const [budgetedInsuranceInputs, setBudgetedInsuranceInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedInsurance = Object.values(budgetedInsuranceInputs).reduce((acc, curr) => acc + curr, 0);
  //Personal
  const [budgetedPersonalInputs, setBudgetedPersonalInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedPersonal = Object.values(budgetedPersonalInputs).reduce((acc, curr) => acc + curr, 0);
  //Recreation
  const [budgetedRecreationInputs, setBudgetedRecreationInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedRecreation = Object.values(budgetedRecreationInputs).reduce((acc, curr) => acc + curr, 0);
  //Debts
  const [budgetedDebtsInputs, setBudgetedDebtsInputs] = React.useState<Record<string, number>>({});
  const totalBudgetedDebts = Object.values(budgetedDebtsInputs).reduce((acc, curr) => acc + curr, 0);

  const [categoryTotal, setCategoryTotal] = React.useState<number>(0);

  const onSubmit = (data: any) => {
    console.log(data);
    setFormSubmitted(true);
  };

  const createOtherSection = (index: number , mainSectionName: String) => {
    return(
        <label>
              <h5>Other:</h5>
              <label> Spent
              <CurrencyInput
                placeholder="Spent"
                prefix="$"
                {...register(`Other${index}-${mainSectionName}S`)}
              />
              </label>
              <label> Budgeted
                <CurrencyInput
                    placeholder="Budgeted"
                    prefix="$"
                    onValueChange={(value) => handleInputChange(value, `Other${index}-${mainSectionName}B`)}
                    {...register(`Other${index}-${mainSectionName}B`)}
                />
              </label>
              
        </label>
    );
  };
  const createSection = (sectionName: String) => {
    return(
        <label>
              <h5>{sectionName}:</h5>
              <label> Spent
              <CurrencyInput
                placeholder="Spent"
                prefix="$"
                {...register(`${sectionName}S`)}
              />
              </label>
              <label> Budgeted
                <CurrencyInput
                    placeholder="Budgeted"
                    prefix="$"
                    onValueChange={(value) => handleInputChange(value, `${sectionName}B`)}
                    {...register(`${sectionName}B`)}
                />
              </label>
              
        </label>
    );
  };


  const handleInputChange = (value: string | undefined, name: string) => {
    if(name === "TithesB" || name === "Charity & OfferingsB"){
      setBudgetedCharityInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 }));  
    }
    else if (name === "Emergency FundB" || name === "Retirement FundB" || name === "College FundB"){
      setBudgetedSavingInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    else if (name === "First Mortgage/RentB" || name === "Second MortgageB" || name === "Real Estate TaxesB"
    || name === "Repairs/Maint.B" || name === "Association DuesB"){
        setBudgetedHousingInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    else if (name === "ElectricityB" || name === "GasB" || name === "WaterB"
    || name === "TrashB" || name === "Phone/MobileB" || name === "InternetB" || name === "CableB"){
        setBudgetedUtilitiesInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    else if (name === "GroceriesB" || name === "RestaurantsB" ){
        setBudgetedFoodInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    else if (name === "AdultsB" || name === "ChildrenB" || name === "Cleaning/LaundryB" ){
        setBudgetedClothingInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    else if (name === "Gas & OilB" || name === "Repairs & TiresB" || name === "License & TaxesB"
    || name === "Car ReplacementB" || name === "Other1-TransportationB"){
        setBudgetedTransportationInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    else if (name === "MedicationsB" || name === "Doctor BillsB" || name === "DentistB"
    || name === "OptometristB" || name === "VitaminsB" || name === "Other1-Medical/HealthB" || name === "Other2-Medical/HealthB"){
        setBudgetedHealthInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    else if (name === "Life InsuranceB" || name === "Health InsuranceB" || name === "Homeowner/RenterB"
    || name === "Auto InsuranceB" || name === "Disability InsuranceB" || name === "Identity TheftB" || name === "Long-Term CareB"){
        setBudgetedInsuranceInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    else if (name === "Child Care/SitterB" || name === "ToiletriesB" || name === "Cosmetics/Hair CareB"
    || name === "Education/TuitionB" || name === "Books/SuppliesB" || name === "Child SupportB" || name === "AlimonyB"
    || name === "SubscriptionsB" || name === "Organization DuesB" || name === "Gifts (inc. Christmas)B" || name === "Replace FurnitureB"
    || name === "Pocket Money (His)B" || name === "Pocket Money (Hers)B" || name === "Baby SuppliesB" || name === "Pet SuppliesB"
    || name === "Music/TechnologyB" || name === "MiscellaneousB" || name === "Other1-PersonalB" || name === "Other2-PersonalB"){
        setBudgetedPersonalInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    else if (name === "EntertainmentB" || name === "VacationB" ){
        setBudgetedRecreationInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    else if (name === "Car Payment 1B" || name === "Car Payment 2B" || name === "Credit Card 1B"
    || name === "Credit Card 2B" || name === "Credit Card 3B" || name === "Credit Card 4B" || name === "Credit Card 5B"
    || name === "Student Loan 1B" || name === "Student Loan 2B" || name === "Student Loan 3B" || name === "Student Loan 4B"
    || name === "Other1-DebtsB" || name === "Other2-DebtsB" || name === "Other3-DebtsB" || name === "Other4-DebtsB"
    || name === "Other5-DebtsB"){
        setBudgetedDebtsInputs((prev) => ({ ...prev, [name]: value ? parseFloat(value) : 0 })); 
    }
    
    setCategoryTotal(totalBudgetedCharity + totalBudgetedSaving + totalBudgetedHousing + totalBudgetedUtilities
        + totalBudgetedFood + totalBudgetedClothing + totalBudgetedTransportation + totalBudgetedHealth
        + totalBudgetedInsurance + totalBudgetedPersonal + totalBudgetedRecreation + totalBudgetedDebts);
    
    };

  console.log(errors);

  return (
    <div className="webFormBody">
      {formSubmitted ? (
        <h1>Success! Form submitted.</h1>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section-snapshot">
            <h3><u>Monthly Take-Home Pay</u></h3>
            <label>
              <h5>Take-Home Pay:</h5>
              <CurrencyInput
                placeholder="Take-Home Pay"
                prefix="$"
                onValueChange={(value) => setMonthlyTakeHomePay(value ? parseFloat(value) : undefined)}
                {...register("Monthly Take-Home Pay", { required: true })}
              />
            </label>
          </div>
          {/* Charity */}
          <div className="section-snapshot">
            <h3><u>Charity</u></h3>
            {createSection("Tithes")}
            {createSection("Charity & Offerings")}
            <div>Total = ${totalBudgetedCharity.toFixed(2)}</div>
          </div>
          {/* Saving */}
          <div className="section-snapshot">
            <h3><u>Saving</u></h3>
            {createSection("Emergency Fund")}
            {createSection("Retirement Fund")}
            {createSection("College Fund")}
            <div>Total = ${totalBudgetedSaving.toFixed(2)}</div>
          </div>
          {/* End of Section */}

          {/* Housing */}
          <div className="section-snapshot">
            <h3><u>Housing</u></h3>
            {createSection("First Mortgage/Rent")}
            {createSection("Second Mortgage")}
            {createSection("Real Estate Taxes")}
            {createSection("Repairs/Maint.")}
            {createSection("Association Dues")}
            <div>Total = ${totalBudgetedHousing.toFixed(2)}</div>
          </div>
          {/* End of Section */}

        {/* Utilities */}
          <div className="section-snapshot">
            <h3><u>Utilities</u></h3>
            {createSection("Electricity")}
            {createSection("Gas")}
            {createSection("Water")}
            {createSection("Trash")}
            {createSection("Phone/Mobile")}
            {createSection("Internet")}
            {createSection("Cable")}
            <div>Total = ${totalBudgetedUtilities.toFixed(2)}</div>
          </div>
        {/* End of Section */}

        {/* Food */}
        <div className="section-snapshot">
            <h3><u>Food</u></h3>
            {createSection("Groceries")}
            {createSection("Restaurants")}
            <div>Total = ${totalBudgetedFood.toFixed(2)}</div>
          </div>
        {/* End of Section */}

        {/* Clothing */}
        <div className="section-snapshot">
            <h3><u>Clothing</u></h3>
            {createSection("Adults")}
            {createSection("Children")}
            {createSection("Cleaning/Laundry")}
            <div>Total = ${totalBudgetedClothing.toFixed(2)}</div>
          </div>
        {/* End of Section */}

        {/* Transportation */}
        <div className="section-snapshot">
            <h3><u>Transportation</u></h3>
            {createSection("Gas & Oil")}
            {createSection("Repairs & Tires")}
            {createSection("License & Taxes")}
            {createSection("Car Replacement")}
            {createOtherSection(1,"Transportation")}
            <div>Total = ${totalBudgetedTransportation.toFixed(2)}</div>
          </div>
        {/* End of Section */}

        {/* Medical/Health */}
        <div className="section-snapshot">
            <h3><u>Medical/Health</u></h3>
            {createSection("Medications")}
            {createSection("Doctor Bills")}
            {createSection("Dentist")}
            {createSection("Optometrist")}
            {createSection("Vitamins")}
            {createOtherSection(1,"Medical/Health")}
            {createOtherSection(2,"Medical/Health")}
            <div>Total = ${totalBudgetedHealth.toFixed(2)}</div>
          </div>
        {/* End of Section */}

        {/* Insurance */}
        <div className="section-snapshot">
            <h3><u>Insurance</u></h3>
            {createSection("Life Insurance")}
            {createSection("Health Insurance")}
            {createSection("Homeowner/Renter")}
            {createSection("Auto Insurance")}
            {createSection("Disability Insurance")}
            {createSection("Identity Theft")}
            {createSection("Long-Term Care")}
            <div>Total = ${totalBudgetedInsurance.toFixed(2)}</div>
          </div>
        {/* End of Section */}

        {/* Personal */}
        <div className="section-snapshot">
            <h3><u>Personal</u></h3>
            {createSection("Child Care/Sitter")}
            {createSection("Toiletries")}
            {createSection("Cosmetics/Hair Care")}
            {createSection("Education/Tuition")}
            {createSection("Books/Supplies")}
            {createSection("Child Support")}
            {createSection("Alimony")}
            {createSection("Subscriptions")}
            {createSection("Organization Dues")}
            {createSection("Gifts (inc. Christmas)")}
            {createSection("Replace Furniture")}
            {createSection("Pocket Money (His)")}
            {createSection("Pocket Money (Hers)")}
            {createSection("Baby Supplies")}
            {createSection("Pet Supplies")}
            {createSection("Music/Technology")}
            {createSection("Miscellaneous")}
            {createOtherSection(1,"Personal")}
            {createOtherSection(2,"Personal")}
            <div>Total = ${totalBudgetedPersonal.toFixed(2)}</div>
          </div>
        {/* End of Section */}

        {/* Recreation */}
        <div className="section-snapshot">
            <h3><u>Recreation</u></h3>
            {createSection("Entertainment")}
            {createSection("Vacation")}
            <div>Total = ${totalBudgetedRecreation.toFixed(2)}</div>
          </div>
        {/* End of Section */}

        {/* Debts */}
        <div className="section-snapshot">
            <h3><u>Debts</u></h3>
            {createSection("Car Payment 1")}
            {createSection("Car Payment 2")}
            {createSection("Credit Card 1")}
            {createSection("Credit Card 2")}
            {createSection("Credit Card 3")}
            {createSection("Credit Card 4")}
            {createSection("Credit Card 5")}
            {createSection("Student Loan 1")}
            {createSection("Student Loan 2")}
            {createSection("Student Loan 3")}
            {createSection("Student Loan 4")}           
            {createOtherSection(1,"Debts")}
            {createOtherSection(2,"Debts")}
            {createOtherSection(3,"Debts")}
            {createOtherSection(4,"Debts")}
            {createOtherSection(5,"Debts")}
            <div>Total = ${totalBudgetedDebts.toFixed(2)}</div>
          </div>
        {/* End of Section */}

        <div className="section-snapshot">
            <h3><u>Zero Balance</u></h3>
            <h6>Formula: Take-Home Pay - Category Total = Zero Balance</h6>
            <br></br>
            <h6>The goal of a zero-based budget is to get Zero Balance to zero</h6>
            <br></br>
            <h6>Your Zero Balance:</h6>
            {monthlyTakeHomePay !== undefined ?
                <h6>{monthlyTakeHomePay} - {categoryTotal} = {monthlyTakeHomePay - categoryTotal}</h6> :
                <p>(Enter a Monthly Take-Home Pay)</p>
            }
        </div>



          <input type="submit" />
        </form>
      )}
    </div>
  );
}

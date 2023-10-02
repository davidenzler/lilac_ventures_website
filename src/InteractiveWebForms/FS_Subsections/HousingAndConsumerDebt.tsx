import React from "react";
import {RadioGroup} from "./RadioGroup";

type HousingAndConsumerDebtProps = {
  register: any;
};

const HousingAndConsumerDebt: React.FC<HousingAndConsumerDebtProps> = ({ register }) => (
  <div className='section-snapshot'>
    <h1><u>Housing and Consumer Debt</u></h1>

    <div className='subSection-snapshot'>
      <h2>Housing</h2>

      <RadioGroup
        label="Do you rent or own?"
        register={register}
        name="Do you rent or own?"
        options={["Rent", "Own"]}
        required={true}
      />

      <RadioGroup
        label="Are you current on your payment?"
        register={register}
        name="Are you current on your payment?"
        options={["Yes", "No"]}
      />

      <label>What are the total monthly payments?: 
        <input type="text" placeholder="Total monthly payments" {...register("What are the total monthly payments?", {})} />
      </label>
    </div>

    <div className='subSection-snapshot'>
      <h2>Consumer Debt</h2>

      <RadioGroup
        label="Do you have any vehicle loans?"
        register={register}
        name="Do you have any vehicle loans?"
        options={["Yes", "No"]}
        required={true}
      />

      <RadioGroup
        label="Are you current on vehicle payments?"
        register={register}
        name="Are you current on vehicle payments?"
        options={["Yes", "No"]}
      />

      <label>What are the total monthly payments?: 
        <input type="text" placeholder="Total monthly payments" {...register("What are your total monthly payments?", {})} /> 
      </label>

      <div>
        <div>List any total balances due:</div>
        <label>Credit Cards: 
          <input type="text" placeholder="Credit Cards" {...register("Credit Cards", {})} />
        </label>
        <label>Student Loans: 
          <input type="text" placeholder="Student Loans" {...register("Student Loans", {})} /> 
        </label>
        <label>Taxes: 
          <input type="text" placeholder="Taxes" {...register("Taxes", {})} />
        </label>
        <label>Other: 
          <input type="text" placeholder="Other" {...register("Other", {})} />
        </label>
      </div>
    </div>
  </div>
);

export default HousingAndConsumerDebt;

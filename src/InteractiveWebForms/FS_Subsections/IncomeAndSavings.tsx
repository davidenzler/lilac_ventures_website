import React from "react";
import { RadioGroup } from "./RadioGroup";

type IncomeAndSavingsProps = {
  register: any;
};

const IncomeAndSavings: React.FC<IncomeAndSavingsProps> = ({ register }) => (
  <div className='section-snapshot'>
    <h1><u>Income and Savings</u></h1>

    <div className='subSection-snapshot'>
      <h2>Income</h2>
      <label>What is your monthly net take-home pay?: 
        <input type="text" placeholder="Monthly take-home pay" {...register("What is your monthly net take-home pay?", {required: true})} />
      </label>

      <RadioGroup
        label="Do you have an irregular income?"
        register={register}
        name="Do you have an irregular income?"
        options={["Yes", "No"]}
        required={true}
      />

      <RadioGroup
        label="Do you use a monthly budget?"
        register={register}
        name="Do you use a monthly budget?"
        options={["Yes", "No"]}
      />
    </div>

    <div className='subSection-snapshot'>
      <h2>Savings</h2>

      <RadioGroup
        label="Do you have an emergency fund?"
        register={register}
        name="Do you have an emergency fund?"
        options={["Yes", "No"]}
        required={true}
      />

      <label>If you have an emergency fund, how much is in the fund?: 
        <input type="text" placeholder="Fund Value" {...register("If you have an emergency fund, how much is in the fund?", {})} />
      </label>

      <RadioGroup
        label="Are you currently investing for retirement?"
        register={register}
        name="Are you currently investing for retirement?"
        options={["Yes", "No"]}
        required={true}
      />

      <label>What is your balance?: 
        <input type="text" placeholder="Balance" {...register("What is your balance?", {})} />
      </label>
      <label>What is your monthly contribution?: 
        <input type="text" placeholder="Monthly contribution" {...register("What is your monthly contribution?", {})} />
      </label>

      <RadioGroup
        label="Do you contribute to non-retirement savings?"
        register={register}
        name="Do you contribute to non-retirement savings?"
        options={["Yes", "No"]}
        required={true}
      />

      <label>What is your balance (Non-retirement savings)?: 
        <input type="text" placeholder="Balance " {...register("What is your balance? (Non-retirement savings)", {})} />
      </label>
      <label>What is your monthly contribution (Non-retirement savings)?: 
        <input type="text" placeholder="Monthly contribution" {...register("What is your monthly contribution? (Non-retirement savings)", {})} />
      </label>
    </div>
  </div>
);

export default IncomeAndSavings;

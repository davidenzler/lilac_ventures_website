import React from "react";
import {RadioGroup} from "./RadioGroup";

type SessionInformationProps = {
  register: any;
};

const SessionInformation: React.FC<SessionInformationProps> = ({ register }) => (
  <div className='section-snapshot'>
    <h1><u>Session Information</u></h1>

    <div className='subSection-snapshot'>
      <h2>What primary issue should we focus on during your coaching session?</h2>

      <RadioGroup
        label="Primary focus for coaching session"
        register={register}
        name="What primary issue should we focus on during your coaching session?"
        options={[
          "Budgeting", 
          "Real Estate", 
          "Dealing With Collectors", 
          "Wealth Building/Investing",
          "Debt Elimination",
          "Other"
        ]}
        required={true}
      />

      <label>If you selected Other please list here: 
        <input type="text" placeholder="Other issues" {...register("If you selected Other please list here.", {})} /> 
      </label>
    </div>

    <div className='subSection-snapshot'>
      <h2>List the top three concerns/questions related to your above selection:</h2>
      <input type="text" placeholder="Concerns" {...register("LIST THE TOP THREE CONCERNS/QUESTIONS RELATED TO YOUR ABOVE SELECTION:", {required: true})} />
    </div>
  </div>
);

export default SessionInformation;

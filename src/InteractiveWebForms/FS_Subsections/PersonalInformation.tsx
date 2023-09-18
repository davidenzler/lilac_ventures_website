import React from "react";
import { RadioGroup } from "./RadioGroup";

type PersonalInformationProps = {
  register: any;
};

const PersonalInformation: React.FC<PersonalInformationProps> = ({ register }) => (
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

    <RadioGroup
      label="Have you been through FPU?"
      register={register}
      name="Have you been through FPU?"
      options={["Yes", "No", "What's FPU?"]}
      required={true}
    />

    <label>Number of Children or other dependents: <input type="number" placeholder="Number of Children" {...register("Number of Children or Other Dependents", {required: true, min: 0})} /></label>
    <label>Mailing Address: <input type="text" placeholder="Mailing Address" {...register("Mailing Address", {required: true})} /></label>
    <label>City: <input type="text" placeholder="City" {...register("City", {required: true})} /></label>
    <label>State: <input type="text" placeholder="State" {...register("State", {required: true})} /></label>
    <label>ZIP: <input type="number" placeholder="ZIP" {...register("ZIP", {required: true})} /></label>
    <label>Phone: <input type="text" placeholder="Phone" {...register("Phone", {})} /></label>
    <label>Email:<input type="email" placeholder="Email" {...register("Email", {required: true})} /></label>
    
    <RadioGroup
      label="Preferred method of contact for your session?"
      register={register}
      name="Preferred method of contact for your session?"
      options={["In Person", "Phone", "Video Conference"]}
      required={true}
    />
    
  </div>
);

export default PersonalInformation;
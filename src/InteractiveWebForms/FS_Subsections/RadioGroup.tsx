import React from "react";

type RadioGroupProps = {
  label: string;
  register: any;
  name: string;
  options: string[];
  required?: boolean;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, register, name, options, required }) => (
  <div className='radioQuestion-snapshot'>
    <div>{label}</div>
    {options.map(option => (
      <label key={option}>
        {option}
        <input {...register(name, { required })} type="radio" value={option} />
      </label>
    ))}
  </div>
);

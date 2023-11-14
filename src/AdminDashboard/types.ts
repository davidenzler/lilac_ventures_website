// types.ts
export interface Client {
  firstName: string;
  lastName: string;
  address: string;
  mobileNumber: string;
  email: string;
  maritalStatus: string;
  employmentStatus: string;
  progressStep: string;
  accountLink: string; // might change this later
}

export interface User {
  name: string;
  image: string;
}

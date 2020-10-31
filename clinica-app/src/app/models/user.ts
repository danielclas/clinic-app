export interface User{
  uid: String,
  email: String,
  type: String
}

export enum UserType{
  Admin = 'Admin',
  Patient = 'Patient',
  Staff = 'Staff'
}
